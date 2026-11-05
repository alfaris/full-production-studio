---
name: arabic-script
description: Writes complete Arabic video scripts (YouTube long-form, explainers, tutorials, talking-head, faceless) that keep viewers watching, in the creator's dialect, with timing based on Arabic speech rate and a visual cue for every beat. Use when the user wants "سكريبت", "اكتبلي فيديو", "سيناريو يوتيوب", an Arabic YouTube script, or to turn an article/idea into an Arabic video.
---

# Arabic Script

Write scripts that are **spoken**, not read. Use the Voice Card from `arabic-voice` and the hook from `arabic-hooks` if they exist. The general retention method comes from `yt-script` / `youtube-script-writer`; this skill adapts it for Arabic.

## 1. Inputs (ask only for what's missing)

- Topic and **core message** («بعد ما يخلص الفيديو، المشاهد هيـ___»).
- Target length, dialect, and style (talking head, faceless, screen recording, motion).
- Any facts, numbers, or stories that must be included. Never invent statistics. If something needs a source, mark it `[مصدر؟]`.

## 2. Timing for Arabic

- Conversational Arabic runs about **120–140 words per minute** (≈ 2–2.3 words/sec). Calm or educational delivery is closer to 110.
- So: 60 s ≈ 120–135 words · 8 min ≈ 950–1,100 words · 12 min ≈ 1,450–1,650 words.
- Count dialect words as spoken. Attached pronouns don't add words («ما قلتلوش» = 2 words).

## 3. Structure (long-form)

```
0:00  HOOK         (from arabic-hooks, ≤ 15 s)
0:15  BRIDGE       why this matters to you + what you'll get (no channel intro yet)
0:30  CONTEXT      the minimum background, max 30 s
      VALUE BEAT 1 point → example/proof → mini-payoff
      RE-HOOK      open a loop for the next beat («بس الأهم جاي…»)
      VALUE BEAT 2 …
      VALUE BEAT 3 (strongest last, or strongest first if retention data says viewers drop early)
      PAYOFF       the promise from the hook, fully delivered
      CTA          ONE action, in the creator's voice, ≤ 10 s
```

Put a **re-hook every 60–90 seconds**. Arabic re-hook phrases (match the dialect):
- Egyptian: «بس استنى، دي مش أهم حاجة» · «والجزء الجاي ده هو اللي فرق معايا»
- Khaleeji: «بس انتظر، هذا مو أهم شي» · «والجاي هو اللي فرق معي»
- Levantine: «بس استنى، هاد مش أهم شي» · «والجاي هو اللي فرّق معي»

## 4. Script format

Use a two-column table so the editor knows exactly what to show:

| # | Time | Spoken (in dialect) | On screen / visual |
|---|---|---|---|
| 1 | 0:00 | «…» | Punch-in on face + text «…» |

Visual cues: `A-roll` (face), `B-roll: …`, `SCREEN: …` (screen recording plus zoom target), `MG: …` (motion graphic, which goes to `arabic-motion-typography` / Remotion skills), `PROOF: …` (screenshot/result).

## 5. Arabic writing rules

- One idea per sentence. If a sentence has «والذي» or «حيث», split it.
- **Mixed-language terms:** write them the way the creator says them («الـthumbnail»، «الثمنيل»), consistently through the script.
- **Numbers:** spoken form in the script, formatted digits on screen.
- **Avoid**: «في هذا الفيديو»، «دعونا»، «لا يخفى على أحد»، «وفي الختام»، stacked connectors.
- **Rhythm:** alternate short punches (3–5 words) with medium sentences. Read it aloud; if you run out of breath, cut.
- **Respect:** keep religious phrases natural and only when the creator uses them («إن شاء الله»، «الحمد لله»). Never add them for flavor.

## 6. Deliver

1. Core message + structure summary (one line per beat).
2. The full script table.
3. **Word count and estimated runtime.**
4. A list of `MG:` items and B-roll to gather.
5. 3 alternative CTAs.

## Self-check

- [ ] The hook's promise is paid off explicitly?
- [ ] A re-hook every 60–90 s?
- [ ] One dialect throughout, matching the Voice Card?
- [ ] No invented facts (unsourced numbers are marked `[مصدر؟]`)?


---
Source: https://github.com/alfaris/full-production-studio (MIT). Packaged by Full Production Studio.
