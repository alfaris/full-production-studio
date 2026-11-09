# Changelog

All notable changes to Full Production Studio. Each release's notes on GitHub come from its section here.
To release: add a `## vX.Y.Z` section, set the same version in `.claude-plugin/plugin.json`, then push the tag `vX.Y.Z`.

## v1.6.0 — 2026-11-09

- **New original: `motion-designer`.** The studio's first department head. It reports to `studio-director` and owns stage 4 (motion graphics): it turns the Project Brief into a Motion Brief, sets a Motion Spec (palette, type, easing, durations, safe areas), storyboards every element against the script, picks the tool route (Remotion, HTML/GSAP, web sims, or a keyframe spec for the editor's own app), builds through the specialist motion skills, reviews frames with `review-loop`, and ends with a **Motion Handoff** report (files, formats, alpha, placement, gate check, escalations).
- `studio-director` gains a "Your team" section: it hands stage 4 to `motion-designer` and stage 5 to `editor-apprentice`, decides their escalations, and checks that handed-off files really exist before the edit.
- `motion-designer` added to the 🎥 Motion designer starter pack.

## v1.5.0 — 2026-11-05

Fixes from a hands-on audit (installing the repo the way users do and validating it with strict parsers).

- **Two skills now install.** `editor` and `motion-design-html` had descriptions that strict YAML parsers reject, so `npx skills` and other loaders skipped them silently (70 of 72 were found). `sync` now validates every skill with PyYAML and auto-quotes broken descriptions; `check` is strict too and runs in CI.
- **Correct install folders.** Codex reads `~/.agents/skills`, not `~/.codex/skills` (`codex` is now an alias for `agents`). Added a `cursor` target (`~/.cursor/skills`).
- **Installers never delete your own skills.** A same-named folder that wasn't installed by the studio (e.g. your own `captions`) is kept and reported. Use `--force` / `-Force` to replace it. Installed skills carry a `.full-production-studio` marker.
- **No more task-hijacking descriptions.** `ai-tells`, `ghostwriter`, `writing-style` and `remotion-motion-graphics` asked to be used for ANY writing task or EVERY video request; their descriptions are now scoped to their own job (`description_overrides` in `sources.json`).
- **Brand-specific examples flagged.** 11 upstream skills contain the original authors' brands, people or folders (OpenEd, Skill Stack, Howseen, `~/Desktop/...`). Each now starts with a note to adapt them to the user's brand and voice.
- **Release hygiene.** Plugin version now tracks the release tag (CI fails if they differ) and release notes come from this file.

## v1.4.0 — 2026-11-05

- "See the difference" section on the site and in both READMEs: real ffmpeg caption renders and Remotion typography renders, plus an `arabic-hooks` example.
- **Fix in `arabic-motion-typography`:** consecutive English words were reversed in RTL rows («Code Claude»). Added `tokenize()` that keeps non-Arabic runs together, for both the Remotion and GSAP recipes.
- "Copy for ChatGPT" on every skill card. Skills up to 8,000 characters are copied for a GPT's Instructions; longer ones download as a file to upload as Knowledge.
- Arabic descriptions for the 11 originals and `editor-apprentice`; short EN/AR blurbs for every starter pack.

## v1.3.0 — 2026-11-05

- Added `editor-apprentice` by Hamza Sayed (MIT): an apprentice that learns how a video editor works, per client, inside Premiere, Resolve, After Effects, Final Cut and CapCut.
- `studio-director` routes the edit stage to it when the user edits in their own app; new "✂️ Video editor" starter pack.
- Website accessibility and hero improvements from the design audit (contrast, pause control, `lang` on mixed text, live region for copy feedback, install command above the fold).

## v1.2.0 — 2026-11-05

- Curated to 71 skills (removed 5 that aren't about video or content production).
- Website: three.js studio scene, founder section, bilingual UI, search and filters.
- Contribution guide, issue forms and PR template; social preview image.

## v1.1.0 — 2026-11-05

- `studio-director`, which runs a video from idea to export and picks the right skill at each stage.
- 10 Arabic-first skills: voice, hooks, script, shorts, titles and thumbnails, market research, YouTube SEO, transcript cleanup, captions, and motion typography.
- Starter packs.

## v1.0.0 — 2026-11-05

- First release: 65 skills from 8 MIT-licensed repos in one installable repo (Claude Code plugin, `npx skills`, install scripts, Claude.ai zips, single-file prompts for chat AIs).
