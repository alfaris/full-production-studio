# Changelog

All notable changes to Full Production Studio. Each release's notes on GitHub come from its section here.
To release: add a `## vX.Y.Z` section, set the same version in `.claude-plugin/plugin.json`, then push the tag `vX.Y.Z`.

## v1.6.0 — 2026-11-09

- **New original: `motion-designer`.** The studio's first department head. It reports to `studio-director` and owns stage 4 (motion graphics): it turns the Project Brief into a Motion Brief, sets a Motion Spec (palette, type, easing, durations, safe areas), storyboards every element against the script, picks the tool route (Remotion, HTML/GSAP, web sims, or a keyframe spec for the editor's own app), builds through the specialist motion skills, reviews frames with `review-loop`, and ends with a **Motion Handoff** report (files, formats, alpha, placement, gate check, escalations).
- `studio-director` gains a "Your team" section: it hands stage 4 to `motion-designer` and stage 5 to `editor-apprentice`, decides their escalations, and checks that handed-off files really exist before the edit.
- `motion-designer` added to the 🎥 Motion designer starter pack.
- **New original: `colorist`.** Owns the color pass. It checks for log/HDR footage and converts it, corrects exposure and white balance using rendered waveform/vectorscope images, matches shots, has the user pick a look from a contact sheet (`color-grade`), keeps skin tones on the skin-tone line, tags output as bt709, and hands back a reusable LUT and a graded still for the thumbnail.
- **New original: `sound-designer`.** Owns the sound pass. It runs a dialogue chain (high-pass, denoise, de-hum, de-ess, EQ, compression), asks before adding music (offering vocal-only, ambience or no-music options), checks music licences, syncs SFX to the motion timeline (`sound-design`), and does a two-pass loudness mix measured against platform targets (−14 LUFS / ≤ −1 dBTP for social). It delivers the mix and stems.
- **New original: `packaging-lead`.** Owns stage 6. It writes the title and thumbnail as one pair (10 titles → 3 pairs, scored, phone test at 168 px, hook in the first ~45 characters, nothing bottom-right) and checks that the video pays off the promise in the first 30 s. It also covers captions (SRT always, 5-line sync check), description (first 150 characters), chapters by YouTube's rules, tags, hashtags, pinned comment, end screen and a Test & Compare plan.
- **New original: `distribution-lead`.** Owns stage 7. It exports from the master per platform and verifies each file with ffprobe, makes 3–5 stand-alone cut-downs (`reframe-social`, `yt-shorts`), schedules from the creator's own audience data, and **never publishes without the user's yes**. Over the first 48 h it compares against the channel's own median and writes Lessons that feed the director's next-video suggestion.
- `studio-director` stage 5 is now "Edit & finish": picture lock first, then `colorist` and `sound-designer` in parallel. Stages 6 and 7 go to `packaging-lead` and `distribution-lead`. Every department returns a handoff report and saves a series spec.
- Starter packs: `sound-designer` added to 🎥 Motion designer; `colorist` and `sound-designer` added to ✂️ Video editor; `packaging-lead` and `distribution-lead` added to 🌍 Arabic creator, ▶️ YouTuber and 📱 Reels/TikTok/Shorts.

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
