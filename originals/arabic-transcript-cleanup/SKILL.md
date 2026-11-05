---
name: arabic-transcript-cleanup
description: Cleans Arabic speech transcripts from Whisper, YouTube auto-captions or other tools. It fixes dialect words the AI turned into فصحى, restores English terms written in Arabic letters, marks filler words (يعني، بص، إممم) with timestamps for cutting, and produces a clean transcript plus a cut list. Use when the user has an Arabic transcript, wants to remove fillers, "نضّف التفريغ", "شيل يعني وإممم", or prepares Arabic footage for editing or captions.
---

# Arabic Transcript Cleanup

Speech-to-text on Arabic dialect makes predictable mistakes. Fix them before captions, editing, or repurposing. The general filler-cutting method is in `filler-removal` / `transcript-polisher`; this skill handles the Arabic part.

## 1. Get a good transcript first (if the user doesn't have one)

```bash
# OpenAI Whisper (local). large-v3 is the most accurate for Arabic; medium is faster.
whisper input.mp4 --language ar --model large-v3 --word_timestamps True --output_format all
# faster-whisper (much faster, same models)
pip install faster-whisper   # then use WhisperModel("large-v3").transcribe(..., language="ar", word_timestamps=True)
```

Always force `--language ar`. Auto-detect sometimes picks Persian/Urdu for short clips.

If `editor-apprentice` is installed, its `transcribe.py` already produces word-level transcripts per speech island and flags islands where speech was heard but no words came out. Clean that output here (sections 2–3), then hand the corrected words back to the apprentice's stages.

## 2. Typical errors and fixes

| Problem | Example (heard → wrongly written → fix) |
|---|---|
| Dialect turned into فصحى | said «إيه» → «ماذا» → **«إيه»**; «دلوقتي» → «الآن» → **«دلوقتي»** |
| English terms in Arabic letters | «بروميت» → **«prompt»**; «إيديتنج» → **«editing»**; «ثمبنيل» → keep as the creator writes it |
| Brand names | «كلود» → **«Claude»**; «كاب كت» → **«CapCut»** |
| Word splits/merges | «ما عرفتش» ↔ «ماعرفتش»: pick one and stay consistent |
| Numbers | «تلاتة» vs «3»: words in the transcript, digits in captions (per the Voice Card) |
| Hamza / taa marbuta / alif maqsura | normalize to standard spelling (إ/أ, ة, ى) unless it's intentional slang |
| Hallucinated text in silences | e.g. «اشتركوا في القناة» or «ترجمة …» appearing over silence or music → **delete** |

Keep the **dialect as spoken**. Cleanup ≠ converting to فصحى.

## 3. Filler words by dialect (mark them, don't silently delete)

- Shared: «إممم»، «آآه»، «إيه» (as hesitation), «يعني» (when it's not part of the meaning), repeated words («أنا أنا»), false starts.
- Egyptian: «بص»، «طب»، «يا عم»، «بقى» (as filler), «الحاجة دي».
- Khaleeji: «يعني»، «شلون أقول»، «زين» (as filler), «والله» (as filler).
- Levantine: «يعني»، «هيك»، «إنو»، «شو اسمو».

⚠️ Words like «والله» or «إن شاء الله» are often meaningful. Only mark them when they're clearly a verbal tic, and never remove religious phrases the speaker means.

## 4. Output

1. **Clean transcript**: readable paragraphs, same dialect, corrected terms.
2. **Corrections log**: `original → fixed` for each change type (so the user can check them).
3. **Cut list** (when word timestamps exist), ready for `filler-removal` / `edl-edit`:

```
start      end        text        type
00:00:12.34 00:00:12.90 إممم        filler
00:00:31.02 00:00:32.10 أنا أنا     repeat
00:01:05.00 00:01:07.40 [silence]   dead-air > 0.8s
```

Leave ~80–120 ms of handle on each side of a cut so it doesn't clip the next word.

4. **Caption-ready version** (optional): short lines for `arabic-captions`.

## Rules

- Never change the meaning or "improve" the speaker's opinions.
- If a word is unclear, mark it `[؟]` with the timestamp. Don't guess.
- Keep the original timestamps intact; only edit text.
