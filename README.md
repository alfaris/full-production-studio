<div align="center">

# 🎬 Full Production Studio
### استوديو إنتاج متكامل

**أفكار · محتوى · موشن · احترافي**

A single repo of open-source **Agent Skills** for video & content creators, covering every stage from the first idea to the final export.
It installs on Claude Code, Claude.ai, Codex, Cursor, Gemini CLI, ChatGPT and any agent that reads `SKILL.md`.

</div>

---

## 🇪🇬 بالعربي

السكيلز دي بتحوّل الـAI بتاعك لاستوديو إنتاج كامل: من تحليل المنافسين وكتابة الهوك والسكريبت، لحد الموشن جرافيك بالكود (Remotion / HTML)، والمونتاج، والكابشنز، والتصدير.
مش لازم تكون مبرمج: تقدر تنزّلها بأمر واحد على Claude Code، أو ترفعها على Claude.ai، أو تلصق ملف السكيل في تعليمات المشروع على أي AI.

**التقسيمة:**

| | القسم | بيعمل إيه |
|---|---|---|
| 💡 | **أفكار** | بحث، استراتيجية، تحليل منافسين، زوايا جديدة |
| 📄 | **محتوى** | سكريبتات، هوكات، عناوين، صوتك الخاص، كتابة لكل منصة |
| 🎥 | **موشن** | موشن جرافيك بالكود، Easing، Remotion، صوت، فيزياء |
| ✨ | **احترافي** | مونتاج، كابشنز، تلوين، Reframe، تقطيع كليبات |

---

## ⚡ Install / التركيب


### 1) Any agent (Claude Code, Codex, Cursor, Gemini CLI, Copilot …), one command
Uses the open [`skills`](https://github.com/vercel-labs/skills) CLI, which detects your installed agents:
```bash
npx skills add alfaris/full-production-studio
```
Install only some skills:
```bash
npx skills add alfaris/full-production-studio --skill yt-script --skill motion-design
```

### 2) Claude Code plugin
```bash
/plugin marketplace add alfaris/full-production-studio
/plugin install full-production-studio@full-production-studio
```

### 3) Manual install script (copies into your agents' skills folders)
```bash
git clone https://github.com/alfaris/full-production-studio && cd full-production-studio
./scripts/install.sh            # macOS / Linux / Git Bash, all detected agents
./scripts/install.sh claude     # just Claude Code  (~/.claude/skills)
```
```powershell
.\scripts\install.ps1           # Windows PowerShell
.\scripts\install.ps1 -Agent codex
```
Targets: `claude` → `~/.claude/skills`, `codex` → `~/.codex/skills`, `agents` → `~/.agents/skills` (shared standard folder), `gemini` → `~/.gemini/skills`.

### 4) Claude.ai (web / desktop app)
Download a skill zip from the [Releases](../../releases) page (or run `python scripts/studio.py build` → `dist/zips/`), then go to **Settings → Capabilities → Skills → Upload skill**.

### 5) ChatGPT, Gemini, Claude Projects, or any chat AI with no skill support
Open `dist/prompts/<skill>.md` (from Releases or `build`). Each one is a single file with the skill and its reference docs. Paste it into:
- **ChatGPT** → custom GPT → *Instructions* (or upload as *Knowledge*)
- **Gemini** → Gem → *Instructions*
- **Claude.ai Project** → *Project instructions* / *Project knowledge*

---

## 📚 Skills

<!-- BEGIN:CATALOG -->
### أفكار · Ideas (9)

_Research, strategy, competitor analysis, finding angles_

| Skill | What it does | Source |
|---|---|---|
| [`find-your-margin`](skills/find-your-margin/SKILL.md) | Help a knowledge worker find where their attention earns the fattest margin when combined with AI. Maps their skill stack against AI… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`invisible-threads`](skills/invisible-threads/SKILL.md) | Discovers non-obvious thematic connections ("invisible threads") across a corpus of essays, articles, or transcripts. | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`open-education-hub-deep-dives`](skills/open-education-hub-deep-dives/SKILL.md) | Create SEO-optimized deep dive articles for the Open Education Hub. This skill combines proprietary OpenEd insights (podcasts, Slack,… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`seo-research`](skills/seo-research/SKILL.md) | Strategic keyword research and content planning. Use this skill BEFORE writing to identify opportunities, validate topics, and create a… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`youtube`](skills/youtube/SKILL.md) | > _Optional Python scripts in execution/ need a YouTube Data API key._ | [AgriciDaniel](https://github.com/AgriciDaniel/claude-youtube) |
| [`yt-audit`](skills/yt-audit/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-plan`](skills/yt-plan/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-retention`](skills/yt-retention/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-viral`](skills/yt-viral/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |

### محتوى · Content (32)

_Scripts, hooks, titles, voice, writing for every platform_

| Skill | What it does | Source |
|---|---|---|
| [`ai-tells`](skills/ai-tells/SKILL.md) | Patterns that make writing sound AI-generated. Invoke this skill for ANY writing task - newsletters, social media, blog posts, emails.… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`anti-ai-writing`](skills/anti-ai-writing/SKILL.md) | Transform AI-assisted drafts into authentic, human-sounding content. This skill provides patterns to detect and eliminate AI tells,… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`cold-open-creator`](skills/cold-open-creator/SKILL.md) | Create 25-35 second cold opens that hook listeners by dropping them into a specific moment that encapsulates the episode's themes. Merge… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`day-in-the-life`](skills/day-in-the-life/SKILL.md) | Write Day-in-the-Life homeschool blog posts that show how specific families structure their learning, with enough detail that readers can… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`dude-with-sign-writer`](skills/dude-with-sign-writer/SKILL.md) | Creates punchy, conversational one-liners in "Dude With Sign" style - bold statements that challenge norms, validate feelings, or poke fun… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`email-writing`](skills/email-writing/SKILL.md) | Write authentic, human-sounding emails that build relationships and drive action. This skill should be used when drafting welcome emails,… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`ghostwriter`](skills/ghostwriter/SKILL.md) | Transform source material into authentic, human-written content. Use for ANY writing task - newsletters, articles, social posts, emails.… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`hook-and-headline-writing`](skills/hook-and-headline-writing/SKILL.md) | Create attention-grabbing hooks and headlines using 15 proven formulas, sticky techniques, and the 4 U's test. This skill provides… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`how-newsletters`](skills/how-newsletters/SKILL.md) | Writing style reference based on case studies of successful newsletters. This skill should be used when the user wants to write in the… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`human-writing`](skills/human-writing/SKILL.md) | Transform AI-assisted drafts into authentic, distinctive prose. Use this skill when (1) reviewing or humanizing AI-generated content, (2)… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`meta-ads-creative`](skills/meta-ads-creative/SKILL.md) | Create high-converting Meta (Facebook/Instagram) ad creative using the 6 Elements framework, proven ad formats, and research-driven… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`podcast-blog-post-creator`](skills/podcast-blog-post-creator/SKILL.md) | Transform podcast episodes into compelling, SEO-optimized blog posts in a conversational voice. Creates narrative-driven explainers… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`podcast-production`](skills/podcast-production/SKILL.md) | Complete workflow for producing podcast episodes from raw transcript to publishable YouTube and social media assets. Four-checkpoint… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`seo-content-writer`](skills/seo-content-writer/SKILL.md) | Write SEO-optimized content that ranks AND reads like a human wrote it. Use this skill AFTER completing research with `seo-research` skill. | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`short-form-video`](skills/short-form-video/SKILL.md) | Create short-form video content (Reels, TikTok, Shorts) using practitioner methodology. Covers production workflow from concept to… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`social-content-creation`](skills/social-content-creation/SKILL.md) | Transform newsletters, articles, and podcasts into platform-optimized social posts using 180+ proven templates. This skill uses the… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`text-content`](skills/text-content/SKILL.md) | Create high-performing text posts for social media using framework fitting method. 360+ proven templates across LinkedIn, X, Facebook, and… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`transcript-polisher`](skills/transcript-polisher/SKILL.md) | Transform raw podcast transcripts into polished, readable documents. This skill removes filler words, fixes grammar, adds structure, and… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`verified-review`](skills/verified-review/SKILL.md) | Write structured product/curriculum reviews from real OpenEd families. Reviews are practical, honest, and include enough detail that… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`video-caption-creation`](skills/video-caption-creation/SKILL.md) | Create on-screen text hooks and captions for short-form video clips. Built around the Complementarity Principle - on-screen text should… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`voice-pirate-wires`](skills/voice-pirate-wires/SKILL.md) | Write in the Pirate Wires style - authentic, conversational, contrarian. This voice is direct and confident with irreverent humor, takes… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`writing-style`](skills/writing-style/SKILL.md) | Core writing standards for all Skill Stack content. Invoke automatically for any writing task. Combines anti-AI patterns, voice… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`x-article-converter`](skills/x-article-converter/SKILL.md) | Convert blog posts or newsletters into X/Twitter articles with handles inserted and a posting strategy. Use when the user wants to turn an… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`x-posting`](skills/x-posting/SKILL.md) | Post and schedule content to X/Twitter. Use when batch processing social posts, promoting podcasts/blogs, or scheduling content. Handles… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`youtube-script-writer`](skills/youtube-script-writer/SKILL.md) | Write a high-retention YouTube script — explainer, tutorial, video essay, review, or talking head — on the packaging then cold-open then… | [mohitagw15856](https://github.com/mohitagw15856/pm-claude-skills) |
| [`youtube-title-creator`](skills/youtube-title-creator/SKILL.md) | Generate high-CTR YouTube titles and thumbnails using framework fitting method. Match content to 119 proven formulas from Creator Hooks,… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`yt-chapters`](skills/yt-chapters/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-comment`](skills/yt-comment/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-package`](skills/yt-package/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-script`](skills/yt-script/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-seo`](skills/yt-seo/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |
| [`yt-shorts`](skills/yt-shorts/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |

### موشن · Motion (10)

_Motion graphics, animation taste, Remotion, sound design, visuals_

| Skill | What it does | Source |
|---|---|---|
| [`motion-design`](skills/motion-design/SKILL.md) 🧰 | Taste rules for Remotion motion graphics — timing, easing, springs, typography, color, texture, and scene continuity, with concrete… | [whaleyxbt](https://github.com/whaleyxbt/claude-motion) |
| [`motion-design-html`](skills/motion-design-html/SKILL.md) | Code-only motion design pipeline (no After Effects) for Raphaël / Howseen: launch films, showreels, product promos, LinkedIn/X videos,… _Needs Node + Playwright + ffmpeg (and Python for the helper scripts)._ | [howseen-ai](https://github.com/howseen-ai/claude-motion-design) |
| [`nano-banana-image-generator`](skills/nano-banana-image-generator/SKILL.md) | Generate AI images using Nano Banana Pro (Gemini). Use this skill when the user needs images - thumbnails, social posts, blog headers, or… _Needs a Google Gemini API key._ | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`remotion-graphics`](skills/remotion-graphics/SKILL.md) 🧰 | Create ANIMATED motion graphics — kinetic word-by-word captions, animated lower-thirds/name tags, branded intro/outro title cards,… | [agamm](https://github.com/agamm/video-agent) |
| [`remotion-motion-graphics`](skills/remotion-motion-graphics/SKILL.md) | Create and edit professional motion graphics videos with Remotion (React-based video). Use this skill EVERY time the user wants to create… | [haidrrrry](https://github.com/haidrrrry/claude-remotion-skill) |
| [`review-loop`](skills/review-loop/SKILL.md) 🧰 | Visual self-review loop for motion graphics — render a draft, build contact sheets at every timeline beat, look at them, critique against… | [whaleyxbt](https://github.com/whaleyxbt/claude-motion) |
| [`sound-design`](skills/sound-design/SKILL.md) 🧰 | Procedural sound design with the sfx engine — writing a cue sheet against a video's timeline, which sound goes with which visual event,… | [whaleyxbt](https://github.com/whaleyxbt/claude-motion) |
| [`video-overlay`](skills/video-overlay/SKILL.md) 🧰 | Composite a graphic onto video — text, a logo/image, a static transparent PNG, or an animated effect — and place it accurately, including… | [agamm](https://github.com/agamm/video-agent) |
| [`video-transitions`](skills/video-transitions/SKILL.md) 🧰 | Join two clips with a visible transition effect (wipe, slide, dissolve, pixelize, circle open/close, fade-to-black, etc.) using ffmpeg… | [agamm](https://github.com/agamm/video-agent) |
| [`web-sims`](skills/web-sims/SKILL.md) 🧰 | Build a simulation-style video (agents, particles, 3D machines, fly-throughs) as one HTML page whose render(t) is a pure function of time,… | [whaleyxbt](https://github.com/whaleyxbt/claude-motion) |

### احترافي · Pro (14)

_Editing, captions, color, reframing, clips and post-production_

| Skill | What it does | Source |
|---|---|---|
| [`audio-edit`](skills/audio-edit/SKILL.md) | Clean up or mix a video's audio track — normalize loudness, reduce background noise/hiss, or add background music (optionally ducked under… | [agamm](https://github.com/agamm/video-agent) |
| [`captions`](skills/captions/SKILL.md) 🧰 | Add subtitles/captions to a video — burn them into the picture, or export an .srt/.vtt file (for YouTube etc.). Use whenever the user… | [agamm](https://github.com/agamm/video-agent) |
| [`color-grade`](skills/color-grade/SKILL.md) 🧰 | Color-grade a video — apply a cinematic look / LUT, or generate and compare candidate looks for the user to pick. Use whenever footage… | [agamm](https://github.com/agamm/video-agent) |
| [`cutting-rhythm`](skills/cutting-rhythm/SKILL.md) 🧰 | Make an edit feel flowing, natural and snappy rather than merely accurate — split edits (J/L cuts), where to place a cut relative to… | [agamm](https://github.com/agamm/video-agent) |
| [`editor`](skills/editor/SKILL.md) 🧰 | Turn raw footage into a finished edit in a specific genre/format — montage, documentary, tutorial, news, workshop, vlog, trailer,… | [agamm](https://github.com/agamm/video-agent) |
| [`edl-edit`](skills/edl-edit/SKILL.md) 🧰 | Build a multi-clip edit as an auditable JSON "edit decision list" (EDL) — a list of clips with source/in/out and a written rationale per… | [agamm](https://github.com/agamm/video-agent) |
| [`filler-removal`](skills/filler-removal/SKILL.md) 🧰 | Remove filler words and disfluencies (um, uh, like, you know, basically) from a talking-head video so it sounds like they were never said.… | [agamm](https://github.com/agamm/video-agent) |
| [`grok-video-edit`](skills/grok-video-edit/SKILL.md) 🧰 | Apply AI-generated visual edits to video using xAI / Grok — change object colors, add effects (smoke, fire, sparkles), restyle scenes, or… | [agamm](https://github.com/agamm/video-agent) |
| [`memo`](skills/memo/SKILL.md) | Manage Apple Notes from the terminal. _macOS only (Apple Notes)._ | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`reframe-social`](skills/reframe-social/SKILL.md) 🧰 | Reframe a video to a different aspect ratio for social platforms — vertical 9:16 (Reels/Shorts/TikTok), square 1:1, or 4:5 portrait — from… | [agamm](https://github.com/agamm/video-agent) |
| [`vellum-prep`](skills/vellum-prep/SKILL.md) | Convert markdown manuscripts to Vellum-ready Word documents. _Needs Python._ | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`youtube-clip-extractor`](skills/youtube-clip-extractor/SKILL.md) | Download YouTube videos, identify compelling clips from transcripts, cut clips with ffmpeg, and generate platform-optimized on-screen text… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`youtube-downloader`](skills/youtube-downloader/SKILL.md) | Download YouTube video transcripts when user provides a YouTube URL or asks to download/get/fetch a transcript from YouTube. Also use when… | [cdeistopened](https://github.com/cdeistopened/content-os) |
| [`yt-edit`](skills/yt-edit/SKILL.md) | >- | [Jakeschincariol](https://github.com/Jakeschincariol/youtube-agent-skill) |

🧰 = needs its upstream toolkit repo cloned (the guidance still works anywhere).
<!-- END:CATALOG -->

---

## 🔄 Updating from upstream

All skills are copied, unmodified except where noted, from the original MIT-licensed repos, each pinned to an exact commit in [`sources.json`](sources.json).
To pull newer versions: change a `ref` in `sources.json`, then run
```bash
python scripts/studio.py sync    # re-copy skills, regenerate this README + AGENTS.md + catalog.json
python scripts/studio.py check   # validate all SKILL.md files
```
Every skill folder includes `UPSTREAM.md` (source, commit, any changes) and `LICENSE.txt`.

## 🙏 Credits

This repo is a curated bundle. All credit goes to the original authors:

| Repo | Author | License |
|---|---|---|
| [youtube-agent-skill](https://github.com/Jakeschincariol/youtube-agent-skill) | Jake Schincariol | MIT |
| [claude-youtube](https://github.com/AgriciDaniel/claude-youtube) | Agrici Daniel | MIT |
| [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) (youtube-script-writer) | Mohit Aggarwal | MIT |
| [claude-motion](https://github.com/whaleyxbt/claude-motion) | whaleyxbt | MIT |
| [claude-motion-design](https://github.com/howseen-ai/claude-motion-design) | Howseen | MIT |
| [claude-remotion-skill](https://github.com/haidrrrry/claude-remotion-skill) | haidrrrry | MIT |
| [video-agent](https://github.com/agamm/video-agent) | agamm | MIT |
| [content-os](https://github.com/cdeistopened/content-os) | cdeistopened | MIT |

Full license texts: [`THIRD_PARTY_LICENSES/`](THIRD_PARTY_LICENSES). The packaging (scripts, README, installers) is MIT, see [`LICENSE`](LICENSE).
