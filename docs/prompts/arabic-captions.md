---
name: arabic-captions
description: Creates correct Arabic subtitles and burned-in captions. Covers SRT/ASS files, right-to-left punctuation fixes, Arabic font rendering in ffmpeg, line breaking, word-by-word highlight captions for Reels, and export for CapCut, Premiere, and YouTube. Use when the user wants "ترجمة", "كابشن", "سب تايتل", "حط الكلام على الفيديو", Arabic subtitles, or captions that show broken or reversed Arabic.
---

# Arabic Captions

Arabic captions break in three classic ways: **disconnected letters**, **punctuation on the wrong side**, and **reversed mixed Arabic/English**. This skill prevents all three. Start from a clean transcript (`arabic-transcript-cleanup`).

## 1. Line rules

- **Long-form (YouTube):** max 2 lines, ~35–42 characters per line, 1–6 s per caption.
- **Short-form (Reels/TikTok):** 2–4 words per caption, one line, changing with speech.
- Break at meaning boundaries. Never split: a number from its unit («٣ ثواني»), «ال» from its word, or a negation from its verb («مش هـ…»).
- Captions follow the speaker's dialect. Don't "correct" it to فصحى.
- Digits: follow the Voice Card (Western 0–9 is the safer default for burned-in text).

## 2. Fix RTL punctuation (the #1 bug)

When a line starts or ends with punctuation or English, many players put the «؟» or «.» on the wrong side. Fix it by adding the invisible **Right-to-Left Mark (U+200F)** at the start and end of every Arabic line:

```python
RLM = "‏"
def fix_line(line: str) -> str:
    return f"{RLM}{line.strip()}{RLM}"
```

For lines that mix in English («جربت Claude Code امبارح»), RLM at both ends is usually enough for players and editors. If one still reverses it, wrap the English part in LRI…PDI (`⁦Claude Code⁩`). For **burning in with ffmpeg**, RLM is not enough on its own; see `Encoding=-1` in section 3.

Use Arabic punctuation: «؟» «،» «؛». Save files as **UTF-8**. Premiere and some older tools want **UTF-8 with BOM**; add it if Arabic shows as gibberish there.

## 3. Burn captions with ffmpeg (correct Arabic shaping)

ffmpeg's `subtitles` filter uses libass, which shapes Arabic correctly when built with HarfBuzz + FriBidi (standard in current builds). Three things go wrong: **line direction**, **the font**, and **the position**.

```bash
# fonts/ contains e.g. Cairo-Bold.ttf, Tajawal-ExtraBold.ttf; subs.srt has U+200F at the start of each line
ffmpeg -i in.mp4 -vf "subtitles=subs.srt:fontsdir=./fonts:force_style='FontName=Cairo,Bold=1,FontSize=20,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Shadow=0,Alignment=2,MarginV=70,Encoding=-1'" -c:a copy out.mp4
```

- **`Encoding=-1` is required for mixed lines.** By default libass lays every line out left-to-right, so «Claude Code جربته امبارح؟» renders with the English at the *end* of the sentence, and the RLM alone doesn't change that. `Encoding=-1` makes libass take each line's direction from its first strong character, and the leading U+200F makes that RTL. (Tested with ffmpeg 8.1 / libass: only RLM + `Encoding=-1` renders correctly.) In your own `.ass` files, set the Style's `Encoding` field to `-1` the same way.
- **Position:** in `force_style` on an SRT, `Alignment` uses the legacy SSA numbering: `2` = bottom-center, `10` = middle-center, `6` = top-center. (`5` is top-*left*.) For vertical 9:16, use `Alignment=10` or `Alignment=2` with a large `MarginV` so captions sit above the platform UI.
- `FontName` must match the font's internal family name; check with `fc-scan font.ttf | grep family`.
- If letters appear disconnected, the font lacks Arabic glyphs or ffmpeg fell back to another font. Fix `fontsdir`/`FontName`.

## 4. Word-by-word highlight captions (Reels style)

Use the word timestamps from Whisper and generate **ASS** with karaoke tags, or use Remotion (see `arabic-motion-typography`).

ASS approach: one Dialogue line per 2–4-word group; each word gets `{\k<centiseconds>}` and a highlight color via `SecondaryColour`/`PrimaryColour`:
```
Dialogue: 0,0:00:01.20,0:00:02.40,Default,,0,0,0,,{\k35}جربت {\k40}أعمل {\k45}فيديو
```
Prefix the text with `‏` and set the style's `Encoding` to `-1` (see above). Arabic words must stay whole: never split a word into letters for animation.

## 5. Exports

| Target | Format | Notes |
|---|---|---|
| YouTube | `.srt` UTF-8 | upload as Arabic; improves search (see `arabic-youtube-seo`) |
| Premiere Pro | `.srt` UTF-8 **with BOM** | import → Captions track; set an Arabic font in the Essential Graphics panel |
| CapCut | `.srt` UTF-8 | Text → Captions → Import; choose an Arabic font |
| DaVinci Resolve | `.srt` | Subtitle track; set font per track |
| Burned-in | ffmpeg (above) or Remotion | for social |

## 6. QA (always)

- Extract 3 frames with captions (`ffmpeg -ss 00:00:05 -i out.mp4 -frames:v 1 check1.png`) and check: letters joined, «؟» on the left end (the end of an RTL line), English words in the right order, nothing hidden by platform UI.
- Spot-check sync at the start, middle and end.


---
Source: https://github.com/alfaris/full-production-studio (MIT). Packaged by Full Production Studio.
