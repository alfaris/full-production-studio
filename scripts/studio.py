#!/usr/bin/env python3
"""Full Production Studio — maintenance tool.

  python scripts/studio.py sync     # pull pinned upstream skills into skills/, regenerate catalog/README/AGENTS.md
  python scripts/studio.py build    # build dist/ (zip per skill + single-file prompts for chat AIs)
  python scripts/studio.py check    # validate every skills/*/SKILL.md

Needs only Python 3.9+ and git. Upstream refs are pinned in sources.json;
bump a "ref" there and re-run `sync` to update.
"""
from __future__ import annotations

import fnmatch
import json
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

for _s in (sys.stdout, sys.stderr):  # Windows consoles default to cp1252
    if hasattr(_s, "reconfigure"):
        _s.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "skills"
DIST = ROOT / "dist"
LICENSES = ROOT / "THIRD_PARTY_LICENSES"
SOURCES = json.loads((ROOT / "sources.json").read_text(encoding="utf-8"))
REPO_SLUG = "full-production-studio"

FM_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n?", re.S)
BEGIN, END = "<!-- BEGIN:CATALOG -->", "<!-- END:CATALOG -->"


# ---------------------------------------------------------------- helpers
def git(*args: str, cwd: Path) -> None:
    subprocess.run(["git", *args], cwd=cwd, check=True, stdout=subprocess.DEVNULL)


def fetch(src: dict, dest: Path) -> None:
    """Shallow-fetch exactly the pinned commit (optionally sparse)."""
    dest.mkdir(parents=True)
    git("init", "-q", cwd=dest)
    git("remote", "add", "origin", f"https://github.com/{src['repo']}.git", cwd=dest)
    if src.get("sparse"):
        git("sparse-checkout", "set", "--no-cone", *src["sparse"], cwd=dest)
        git("fetch", "-q", "--depth", "1", "--filter=blob:none", "origin", src["ref"], cwd=dest)
    else:
        git("fetch", "-q", "--depth", "1", "origin", src["ref"], cwd=dest)
    git("checkout", "-q", "FETCH_HEAD", cwd=dest)


def parse_frontmatter(text: str) -> tuple[dict, str]:
    m = FM_RE.match(text)
    if not m:
        return {}, text
    meta = {}
    lines = m.group(1).splitlines()
    for i, line in enumerate(lines):
        k, sep, v = line.partition(":")
        if sep and not line.startswith((" ", "\t")):
            v = v.strip()
            if v[:1] in (">", "|"):  # YAML block scalar: gather the indented lines that follow
                block = []
                for nxt in lines[i + 1:]:
                    if nxt.strip() and not nxt.startswith((" ", "\t")):
                        break
                    block.append(nxt.strip())
                v = (" " if v[0] == ">" else "\n").join(b for b in block if b).strip()
                meta[k.strip()] = v
                continue
            if len(v) >= 2 and v[0] == v[-1] == '"':
                try:
                    v = json.loads(v)
                except json.JSONDecodeError:
                    v = v[1:-1]
            elif len(v) >= 2 and v[0] == v[-1] == "'":
                v = v[1:-1].replace("''", "'")
            meta[k.strip()] = v
    return meta, text[m.end():]


def first_paragraph(body: str) -> str:
    para: list[str] = []
    for line in body.splitlines():
        s = line.strip()
        if not s or s.startswith(("#", "---", ">", "|", "```")):
            if para:
                break
            continue
        para.append(s)
    return re.sub(r"\s+", " ", " ".join(para))[:1000]


def normalize(skill_md: Path, name: str, src: dict, changes: list[str]) -> dict:
    text = skill_md.read_text(encoding="utf-8").lstrip("﻿")
    meta, body = parse_frontmatter(text)
    m = FM_RE.match(text)
    if not m:
        desc = first_paragraph(body) or f"{name} skill."
        text = f"---\nname: {name}\ndescription: {json.dumps(desc, ensure_ascii=False)}\n---\n\n" + body.lstrip("\n")
        changes.append("Added YAML frontmatter (`name`, `description` from the first paragraph) so all agents can load it.")
    else:
        fm = m.group(1)
        if meta.get("name") != name:
            if "name" in meta:
                fm = re.sub(r"(?m)^name:.*$", f"name: {name}", fm, count=1)
                changes.append(f"Renamed skill `{meta['name']}` → `{name}` to avoid a name clash.")
            else:
                fm = f"name: {name}\n" + fm
                changes.append("Added missing `name` to frontmatter.")
        if "description" not in meta:
            fm += f"\ndescription: {json.dumps(first_paragraph(body), ensure_ascii=False)}"
            changes.append("Added missing `description` to frontmatter.")
        text = f"---\n{fm}\n---\n" + text[m.end():]
    if name in src.get("toolkit", []):
        note = (f"\n> **Full Production Studio note:** this skill drives the toolkit in "
                f"[{src['repo']}](https://github.com/{src['repo']}). Clone that repo and run your agent "
                f"inside it for the scripts/paths below to work; the guidance itself is usable anywhere.\n")
        fm_end = FM_RE.match(text).end()
        text = text[:fm_end] + note + text[fm_end:]
        changes.append("Added a note that this skill needs its upstream toolkit repo.")
    skill_md.write_text(text, encoding="utf-8", newline="\n")
    return parse_frontmatter(text)[0]


# ---------------------------------------------------------------- sync
def sync() -> None:
    if SKILLS.exists():
        shutil.rmtree(SKILLS)
    if LICENSES.exists():
        shutil.rmtree(LICENSES)
    SKILLS.mkdir()
    LICENSES.mkdir()
    catalog: list[dict] = []
    seen: dict[str, str] = {}

    with tempfile.TemporaryDirectory() as tmp:
        for src in SOURCES["sources"]:
            print(f"→ {src['repo']} @ {src['ref'][:7]}")
            work = Path(tmp) / src["repo"].replace("/", "__")
            fetch(src, work)
            lic = work / "LICENSE"
            lic_text = lic.read_text(encoding="utf-8") if lic.exists() else ""
            if not lic_text:
                sys.exit(f"  ✗ {src['repo']} has no LICENSE — refusing to vendor it")
            (LICENSES / f"{src['repo'].replace('/', '__')}.txt").write_text(lic_text, encoding="utf-8")

            dirs = sorted(p for p in work.glob(src["skills_glob"]) if (p / "SKILL.md").is_file())
            for d in dirs:
                if not (d / "SKILL.md").read_text(encoding="utf-8").strip():
                    print(f"  - skipped {d.relative_to(work).as_posix()} (empty SKILL.md upstream)")
                    continue
                fm_name = parse_frontmatter((d / "SKILL.md").read_text(encoding="utf-8").lstrip("﻿"))[0].get("name")
                orig = fm_name or d.name  # the skill's declared name wins over its folder name
                name = src.get("rename", {}).get(orig, orig)
                if name in seen:
                    sys.exit(f"  ✗ name clash: `{name}` from {src['repo']} and {seen[name]} — add a rename in sources.json")
                cat = src["categories"].get(name)
                if not cat:
                    sys.exit(f"  ✗ `{name}` from {src['repo']} has no category in sources.json")
                seen[name] = src["repo"]
                out = SKILLS / name
                shutil.copytree(d, out, ignore=shutil.ignore_patterns(".git", "__pycache__", ".DS_Store"))
                changes: list[str] = []
                meta = normalize(out / "SKILL.md", name, src, changes)
                (out / "LICENSE.txt").write_text(lic_text, encoding="utf-8")
                rel = d.relative_to(work).as_posix()
                (out / "UPSTREAM.md").write_text(
                    f"# Upstream\n\n- Repo: https://github.com/{src['repo']}\n- Path: `{rel}`\n"
                    f"- Commit: `{src['ref']}`\n- License: MIT (see `LICENSE.txt`)\n\n## Changes in Full Production Studio\n\n"
                    + ("\n".join(f"- {c}" for c in changes) if changes else "- None (verbatim copy).") + "\n",
                    encoding="utf-8")
                catalog.append({
                    "name": name, "category": cat, "repo": src["repo"], "path": rel,
                    "description": meta.get("description", ""),
                    "toolkit": name in src.get("toolkit", []),
                    "note": src.get("notes", {}).get(name, ""),
                })
                print(f"  ✓ {name} [{cat}]")
            missing = set(src["categories"]) - {c["name"] for c in catalog if c["repo"] == src["repo"]}
            if missing:
                sys.exit(f"  ✗ listed in sources.json but not found upstream: {sorted(missing)}")

    # Skills written for this repo (originals/<name>/SKILL.md), category from sources.json → "originals"
    for name, cat in SOURCES.get("originals", {}).items():
        d = ROOT / "originals" / name
        meta, _ = parse_frontmatter((d / "SKILL.md").read_text(encoding="utf-8"))
        if meta.get("name") != name or not meta.get("description"):
            sys.exit(f"  ✗ originals/{name}/SKILL.md needs `name: {name}` and a description")
        if name in seen:
            sys.exit(f"  ✗ name clash: original `{name}` vs {seen[name]}")
        seen[name] = "originals"
        shutil.copytree(d, SKILLS / name)
        catalog.append({"name": name, "category": cat, "repo": "alfaris/full-production-studio",
                        "path": f"originals/{name}", "description": meta["description"],
                        "toolkit": False, "note": "", "original": True})
        print(f"  ✓ {name} [{cat}] (original)")

    order = list(SOURCES["categories"])
    catalog.sort(key=lambda c: (order.index(c["category"]), c["name"]))
    (ROOT / "catalog.json").write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    write_docs(catalog)
    print(f"\n{len(catalog)} skills synced.")


def short(desc: str, n: int = 140) -> str:
    desc = desc.replace("|", "\\|")
    return desc if len(desc) <= n else desc[: n - 1].rsplit(" ", 1)[0] + "…"


README_LANGS = {
    "README.md": {
        "title": lambda c: c["en"], "about": "about",
        "head": "| Skill | What it does | Source |",
        "legend": "🧰 = needs its upstream toolkit repo cloned (the guidance itself works anywhere).",
    },
    "README.ar.md": {
        "title": lambda c: c["ar"], "about": "about_ar",
        "head": "| السكيل | بتعمل إيه | المصدر |",
        "legend": "🧰 = محتاجة تعمل clone للريبو الأصلي بتاعها عشان السكريبتات تشتغل (الإرشادات نفسها تنفع في أي مكان).",
    },
}


def write_docs(catalog: list[dict]) -> None:
    for fname, L in README_LANGS.items():
        lines = []
        for key, cat in SOURCES["categories"].items():
            items = [c for c in catalog if c["category"] == key]
            lines += [f"### {cat['icon']} {L['title'](cat)} ({len(items)})", "", f"_{cat[L['about']]}_", "",
                      L["head"], "|---|---|---|"]
            for c in items:
                flag = " 🧰" if c["toolkit"] else ""
                note = f" _{c['note']}_" if c["note"] else ""
                lines.append(f"| [`{c['name']}`](skills/{c['name']}/SKILL.md){flag} | {short(c['description'])}{note} "
                             f"| [{c['repo'].split('/')[0]}](https://github.com/{c['repo']}) |")
            lines.append("")
        lines.append(L["legend"])
        block = f"{BEGIN}\n" + "\n".join(lines) + f"\n{END}"
        readme = ROOT / fname
        txt = readme.read_text(encoding="utf-8")
        if BEGIN not in txt:
            sys.exit(f"✗ {fname} is missing the {BEGIN} marker")
        txt = re.sub(re.escape(BEGIN) + ".*?" + re.escape(END), lambda _: block, txt, flags=re.S)
        readme.write_text(txt, encoding="utf-8", newline="\n")

    agents = ["# Full Production Studio — skills index", "",
              "This repo is a library of Agent Skills for video & content production.",
              "Each skill lives in `skills/<name>/SKILL.md` (YAML frontmatter + instructions).",
              "", "**For any AI agent reading this file:** when a task matches a skill below, open its SKILL.md "
              "and follow it. Load files referenced inside a skill folder only when the skill asks for them.", "",
              "**Not sure which skill fits, or making a whole video?** Start with `skills/studio-director/SKILL.md`: "
              "it routes each production stage to the right skill. For Arabic-language content, prefer the `arabic-*` skills.", ""]
    for key, cat in SOURCES["categories"].items():
        agents += [f"## {cat['en']} ({cat['ar']})", ""]
        for c in (c for c in catalog if c["category"] == key):
            agents.append(f"- `skills/{c['name']}/SKILL.md` — {short(c['description'], 200)}")
        agents.append("")
    (ROOT / "AGENTS.md").write_text("\n".join(agents), encoding="utf-8", newline="\n")


# ---------------------------------------------------------------- build
TEXT_EXT = {".md", ".txt", ".ts", ".tsx", ".js", ".mjs", ".json", ".py", ".html", ".css", ".sh", ".yaml", ".yml"}


def build() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "zips").mkdir(parents=True)
    (DIST / "prompts").mkdir()
    catalog = json.loads((ROOT / "catalog.json").read_text(encoding="utf-8"))
    for c in catalog:
        d = SKILLS / c["name"]
        # 1) zip: upload in Claude.ai → Settings → Capabilities → Skills (folder at zip root)
        with zipfile.ZipFile(DIST / "zips" / f"{c['name']}.zip", "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(d.rglob("*")):
                if f.is_file():
                    z.write(f, f"{c['name']}/{f.relative_to(d).as_posix()}")
        # 2) single-file prompt: paste into ChatGPT GPT / Gemini Gem / Claude Project instructions
        parts = [(d / "SKILL.md").read_text(encoding="utf-8")]
        for f in sorted(d.rglob("*")):
            if (f.is_file() and f.suffix == ".md" and f.name not in {"SKILL.md", "UPSTREAM.md"}):
                parts.append(f"\n\n---\n\n<!-- file: {f.relative_to(d).as_posix()} -->\n\n"
                             + f.read_text(encoding="utf-8", errors="replace"))
        parts.append(f"\n\n---\nSource: https://github.com/{c['repo']} (MIT). Packaged by Full Production Studio.\n")
        (DIST / "prompts" / f"{c['name']}.md").write_text("".join(parts), encoding="utf-8")
    with zipfile.ZipFile(DIST / f"{REPO_SLUG}-all-skills.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(SKILLS.rglob("*")):
            if f.is_file():
                z.write(f, f"skills/{f.relative_to(SKILLS).as_posix()}")
    print(f"Built {len(catalog)} skills into {DIST.relative_to(ROOT)}/")


# ---------------------------------------------------------------- check
def check() -> None:
    bad = 0
    names = set()
    for md in sorted(SKILLS.glob("*/SKILL.md")):
        meta, _ = parse_frontmatter(md.read_text(encoding="utf-8"))
        folder = md.parent.name
        errs = []
        if meta.get("name") != folder:
            errs.append(f"name `{meta.get('name')}` ≠ folder")
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", folder) or len(folder) > 64:
            errs.append("name must be lowercase-kebab ≤64 chars")
        if not meta.get("description"):
            errs.append("missing description")
        elif len(meta["description"]) > 1024:
            errs.append(f"description {len(meta['description'])} chars (>1024)")
        if folder in names:
            errs.append("duplicate")
        names.add(folder)
        if errs:
            bad += 1
            print(f"✗ {folder}: {'; '.join(errs)}")
    print(f"{len(names)} skills checked, {bad} with problems.")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    {"sync": sync, "build": build, "check": check}.get(cmd, lambda: sys.exit(__doc__))()
