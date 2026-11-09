# Contributing to Full Production Studio

**English** · [العربية](#بالعربي)

Thanks for helping make this the best open skill library for video & content creators!

## Ways to help

| You want to… | Do this |
|---|---|
| Suggest an existing open-source skill | Open a **"Suggest a skill"** issue with the repo link and license |
| Report a skill that misbehaves | Open a **"Skill problem"** issue: which skill, which AI, what you asked, what happened |
| Improve an original skill (`studio-director`, `motion-designer`, `colorist`, `sound-designer`, `packaging-lead`, `distribution-lead`, `arabic-*`) | Edit it in `originals/<name>/SKILL.md` and open a PR |
| Fix an upstream skill | Send the fix to the **original repo** (linked in `skills/<name>/UPSTREAM.md`), then open an issue here asking to bump the pinned commit |
| Add another dialect or language | Open an issue first so we can agree on naming (e.g. `arabic-*` → `<language>-*`) |

## How the repo is built

- `skills/` is **generated**. Never edit it by hand; `python scripts/studio.py sync` rebuilds it.
- `sources.json` lists every upstream repo, pinned to an exact commit, with a category for every skill, plus renames, exclusions and starter packs.
- `originals/` holds the skills written for this repo.
- `sync` also regenerates the skill tables in `README.md` / `README.ar.md`, `AGENTS.md`, `catalog.json` and the website data in `docs/data.json`.

```bash
pip install pyyaml                # strict YAML, same as the tools that load skills
python scripts/studio.py sync    # needs git + Python 3.9+
python scripts/studio.py check   # validates every SKILL.md (CI runs this on every PR)
python scripts/studio.py build   # builds dist/ (zips + single-file prompts), same as the release workflow
```

## Adding an upstream skill (via `sources.json`)

1. The repo **must have a license that allows redistribution** (MIT, Apache-2.0, BSD…). No license = we can't include it.
2. Add an entry under `"sources"`: `repo`, the full commit SHA as `ref`, a `skills_glob` that matches the skill folders, and a category for **every** skill (`ideas`, `content`, `motion`, `pro`).
3. If a name clashes with an existing skill, add a `"rename"`. If a skill only works inside its own repo, list it under `"toolkit"`.
4. Run `sync` and `check`, then open a PR. In the PR, say why the skill belongs here (it has to be about video or content production).

## Writing a skill (for `originals/`)

- `SKILL.md` starts with YAML frontmatter: `name` (lowercase-kebab, same as the folder) and `description` (what it does **and when to use it**, including the words users actually type, in English and Arabic if relevant).
- Write instructions for the AI, not for humans: concrete steps, rules with numbers, an output format, and a self-check.
- Don't invent facts. Mark anything that needs verification.
- Test it on at least one real task with an AI before opening the PR, and say which AI you used.
- Add it to `"originals"` in `sources.json` with its category.

## Release

Maintainers tag `vX.Y.Z`; GitHub Actions builds and publishes the zips and prompt files.

The social preview image source is `assets/Social.tsx` (a Remotion composition).

---

<div dir="rtl">

## بالعربي

شكرًا إنك عايز تساعد! أسهل طرق المساهمة:

- **عندك سكيل حلوة مفتوحة المصدر؟** افتح Issue من نوع «Suggest a skill» وحط لينك الريبو ونوع الرخصة.
- **سكيل مش شغالة كويس؟** افتح Issue من نوع «Skill problem»: اكتب السكيل، والـAI اللي استخدمته، وطلبت منه إيه، وحصل إيه.
- **عايز تحسّن المخرج أو السكيلز العربي؟** عدّل في `originals/<name>/SKILL.md` وابعت Pull Request.
- **عايز تضيف لهجة أو لغة تانية؟** افتح Issue الأول عشان نتفق على الاسم.

مهم: فولدر `skills/` بيتعمل أوتوماتيك، فما تعدّلش فيه بإيدك. التعديل بيكون في `originals/` أو `sources.json`، وبعدها شغّل:

</div>

```bash
python scripts/studio.py sync
python scripts/studio.py check
```
