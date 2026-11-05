---
name: arabic-voice
description: Captures an Arab creator's real speaking voice (dialect, rhythm, signature phrases, code-switching) into a reusable Voice Card, and rewrites stiff or AI-sounding Arabic into natural spoken Arabic. Use before writing any Arabic script, caption, or post; when the user says "اكتب بأسلوبي", "خليه بالمصري/بالخليجي", "الكلام ده شكله AI", "عايزه طبيعي", or shares past videos/captions as a voice reference.
---

# Arabic Voice

Most AI Arabic sounds like a translated press release: formal (فصحى), long sentences, and words nobody says out loud. Your job is to make text sound like **this specific creator talking to camera**.

## 1. Build the Voice Card

From 1–3 samples (transcripts, captions, posts, or a description), fill in:

```
VOICE CARD
Dialect: Egyptian | Saudi (Najdi/Hijazi) | Emirati/Khaleeji | Levantine | Iraqi | Maghrebi | MSA-light | mixed
Register: street-casual / friendly-smart / professional-casual / formal
Code-switching: none | English tech terms | heavy English (e.g. "الـworkflow ده")
Sentence length: punchy (3–8 words) | medium | flowing
Address: إنت/إنتي/انتو, يا جماعة, يا شباب, يا صاحبي, none
Signature phrases: (exact words they repeat)
Energy: calm teacher | hype | sarcastic | storyteller | big-brother
Numbers: Western 0-9 | Eastern ٠-٩ | written in words
Never says: (phrases that would sound wrong from them)
```

If there are no samples, ask for one. If the user wants to skip, default to **friendly-smart in the dialect they wrote to you in**, and say that it's a default.

## 2. Dialect cheat-sheet (use the creator's column only, never mix dialects)

| Meaning | Egyptian | Khaleeji (Saudi/Gulf) | Levantine | MSA-light |
|---|---|---|---|---|
| what | إيه | وش / ايش | شو | ماذا → ما |
| want | عايز | أبغى / ودي | بدي | أريد |
| now | دلوقتي | الحين | هلق | الآن |
| look/listen | بص / اسمع | شوف / اسمع | شوف / اسمع | انظر |
| very | أوي / جدًا | مرّة / وايد | كتير | جدًا |
| like this | كده | كذا | هيك | هكذا |
| why | ليه | ليش | ليش | لماذا |
| good/ok | تمام / ماشي | زين / تمام | منيح / تمام | جيد |

MSA-light means modern spoken فصحى: short sentences and no archaic connectors (إذ، حيث إن، ومن ثم، علاوة على ذلك).

## 3. De-AI rules for Arabic

Remove or replace these:
- **Formal openers:** «في هذا الفيديو سوف نتحدث عن»، «مرحبًا بكم أعزائي المشاهدين»، «دعونا نتعرف على».
- **Stacked connectors:** «بالإضافة إلى ذلك»، «علاوة على ذلك»، «من ناحية أخرى»، «وفي الختام». Cut them or use the dialect's spoken equivalent (و كمان / وفوق ده / بس).
- **Empty intensifiers:** «حقًا»، «بشكل كبير»، «لا يخفى على أحد»، «في عالمنا اليوم».
- **Translated English idioms:** «في نهاية اليوم» (at the end of the day), «يلعب دورًا محوريًا», «يأخذك إلى المستوى التالي».
- **Over-diacritized or over-punctuated text**, and the semicolon (؛) in spoken scripts.
- **Rule of three everywhere** (3 adjectives, 3 examples). Real people give one sharp example.

Add these:
- **Spoken fillers, used sparingly** (max 1 per 3 sentences) and in their dialect: «بص»، «يعني»، «بصراحة»، «خلّيني أقولك».
- **Direct questions** to the viewer: «جربت قبل كده…؟».
- **Concrete nouns and numbers** instead of abstractions.

## 4. Rewrite procedure

1. Read the input aloud in your head in the creator's dialect.
2. Mark every phrase that a person wouldn't say on camera.
3. Rewrite: shorter sentences, dialect words from the card, one idea per sentence.
4. Keep technical terms the way the creator says them (often English: «الـprompt»، «الـediting»).
5. Return **Before → After** for the first paragraph so the user can confirm the direction, then the full rewrite.

## 5. Self-check

- [ ] Could this creator say every sentence in one breath?
- [ ] Zero dialect mixing (no «عايز» next to «أبغى»)?
- [ ] No formal opener and no stacked connectors?
- [ ] Numbers formatted the way the card says?

Hand the Voice Card to every later skill (`arabic-hooks`, `arabic-script`, `arabic-captions`, `arabic-titles-thumbnails`) so the voice stays consistent.


---
Source: https://github.com/alfaris/full-production-studio (MIT). Packaged by Full Production Studio.
