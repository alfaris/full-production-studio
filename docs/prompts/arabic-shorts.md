---
name: arabic-shorts
description: Plans and writes Arabic short-form videos (Reels, TikTok, YouTube Shorts, Snapchat Spotlight) end-to-end in one pass, covering hook, 20–60 s script, shot list, on-screen text, caption and hashtags, tuned for Arab audiences and RTL screens. Use when the user asks for "ريل", "ريلز", "تيك توك", "شورتس", "فيديو قصير", or a quick vertical video in Arabic.
---

# Arabic Shorts

One reply, ready to shoot. Use the Voice Card from `arabic-voice` if it exists. The general method is in `short-form-video` / `yt-shorts`; this skill is the Arabic fast lane.

## 1. Pick the format (state which one and why)

| Format | Use when | Arabic example |
|---|---|---|
| **List** (N things) | tools, tips, mistakes | «٣ أخطاء بتبوّظ الريلز بتاعك» |
| **Myth → truth** | the niche has a common wrong belief | «النشر كل يوم مش هو السر» |
| **Before / after** | visual transformation | edit, design, room, product |
| **POV / skit** | relatable situations, humor | «لما العميل يقولك عايز اللوجو يكبر» |
| **Tutorial in 30 s** | one clear how-to | «إزاي تشيل الخلفية في ثانية» |
| **Story** | personal result or failure | «خسرت أول عميل بسبب جملة واحدة» |
| **Reaction / stitch** | responding to a trend or claim | on-screen clip + face |

## 2. Script timing

- Arabic speech ≈ **2–2.3 words/sec** → 30 s ≈ 60–70 words, 45 s ≈ 95–100, 60 s ≈ 125–135.
- **0–3 s:** hook (from `arabic-hooks` formulas) + strongest visual.
- **3–(end−5) s:** value beats, each 4–8 s, with **something changing on screen every 2–3 s**.
- **Last 3–5 s:** payoff + one CTA, or a **loop**: the last line leads back into the first so the replay feels seamless.

## 3. Screen layout for RTL vertical video

- Safe area on 1080×1920: keep text inside **y 250–1450 px** and **x 90–900 px**. The right side is covered by like/comment buttons on Reels/TikTok, so start Arabic text a bit *left* of where you'd put English.
- On-screen text: **2–5 words per card**, heavy Arabic font (Cairo, Tajawal, Almarai), never letter-spaced.
- Burned-in captions: use `arabic-captions`. Keep them in the middle third, not the bottom (platform UI covers it).

## 4. Output format

```
FORMAT: … (why)
LENGTH: xx s · xx words

| Time | Spoken («…» in dialect) | Shot / visual | On-screen text |
|------|-------------------------|---------------|----------------|

CAPTION (post text): 1–3 short lines in the creator's voice + a question to drive comments
HASHTAGS: 3–6 (mix Arabic + English, niche > generic). Example: #صناعة_المحتوى #مونتاج #ريلز #contentcreator
COVER TEXT: ≤ 4 words
AUDIO: original voice / trending sound idea (describe; don't claim a specific sound is trending)
```

## 5. Arabic-audience notes

- **Prime posting windows** are usually evenings local time; Ramadan shifts activity to after iftar and late night. Tell the user to confirm with their own analytics.
- **Dialect is reach:** Egyptian and Khaleeji travel across the region; very local slang limits reach outside the country. Say so if the script leans hard on local slang.
- **Comment bait** that works: ask the viewer to pick («١ ولا ٢؟») or to share their own experience. Don't ask for «لايك واشتراك» in the first 10 s.
- Avoid copyrighted music suggestions you can't verify, and imagery that may be culturally sensitive.

## Self-check

- [ ] Hook payoff by second 3?
- [ ] A visual change every 2–3 s noted in the shot list?
- [ ] Text inside the RTL safe area, ≤ 5 words per card?
- [ ] Word count matches the target length?


---
Source: https://github.com/alfaris/full-production-studio (MIT). Packaged by Full Production Studio.
