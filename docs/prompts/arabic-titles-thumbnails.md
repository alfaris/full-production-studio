---
name: arabic-titles-thumbnails
description: Creates Arabic YouTube titles and thumbnail text as a matched pair, handling right-to-left layout, mixed Arabic/English, digit style, length limits, and readability at phone size. Use when the user asks for "عنوان", "عناوين يوتيوب", "نص الثمبنيل", "تصميم الصورة المصغرة", or Arabic titles/thumbnails for a video.
---

# Arabic Titles & Thumbnails

Title and thumbnail are **one unit**. The thumbnail makes people stop scrolling and the title makes them click. They should complement each other, not repeat the same words. The method comes from `yt-package` / `youtube-title-creator`; this skill adds what's specific to Arabic.

## 1. Title rules

- **Length:** ≤ 60 characters so it isn't cut off on mobile. The key promise goes in the **first 35 characters**, because in RTL the right side is read first and the end gets truncated.
- **Register:** usually *light MSA with dialect flavor* works best for search: it's searchable across all Arab countries. Use full dialect («إزاي»، «كيف») when the channel is clearly local.
- **Search words first:** put the term people actually type at the start («مونتاج»، «الذكاء الاصطناعي»، «ريلز»).
- **Spelling variants** matter for search: إ/ا, ة/ه, ى/ي (e.g. «الذكاء الاصطناعي» vs «الذكاء الإصطناعي»). Use the most-searched form in the title and others in tags/description (see `arabic-youtube-seo`).
- **Mixed language:** English brand/tool names stay in English («Claude»، «CapCut»). Don't start or end the title with an English word: it flips the visual order in some apps. Put it in the middle.
- **Digits:** Western digits (8) are more searchable and consistent across apps. Eastern (٨) only if the channel's brand uses them.
- **No clickbait the video doesn't deliver.** Arab audiences punish it in comments fast.

### Title formulas
- «كيف/إزاي + نتيجة + بدون ألم»: «إزاي تعمل موشن جرافيك بالـAI بدون After Effects»
- «رقم + أداة/طريقة + فائدة»: «8 أدوات مجانية تحوّل Claude لاستوديو إنتاج»
- «جربت + شيء + لمدة»: «جربت أعمل فيديوهاتي بالذكاء الاصطناعي 30 يوم»
- «ليه + مشكلة شائعة»: «ليه فيديوهاتك بتقف عند 200 مشاهدة؟»
- «الفرق بين + أ + ب»: «الفرق بين مونتير عادي ومونتير محترف»
- «أنت بتغلط في + شيء»: «أنت بتكتب الهوك غلط»

## 2. Thumbnail text rules

- **Max 3–4 words** (≈ 12–18 characters). Arabic letters are wider and more detailed, so fewer words than English.
- **Fonts:** heavy and simple: Cairo Black, Tajawal ExtraBold, Almarai ExtraBold, Readex Pro Bold, IBM Plex Sans Arabic Bold. Avoid calligraphic fonts (Diwani, Thuluth) and thin weights: unreadable at 120 px.
- **Never** add letter-spacing to Arabic: it breaks the joined letters. Use kashida (ـ) sparingly only for style.
- **Contrast:** white or yellow text, 6–10% black stroke or a soft shadow, on a darker area.
- **Placement:** the reading start is on the **right**. Put the text block on the right or top-right, and the face/subject left (or text over an empty side). Keep the bottom-right corner clear: YouTube's timestamp covers it.
- **Line breaks:** break at a meaning boundary; never leave a single word alone on a line.
- **Emojis/arrows:** an arrow pointing *from* the text *to* the subject guides the eye RTL→subject.

## 3. Output

Give **5 pairs**:

```
Pair n
Title: «…» (xx chars)
Thumbnail text: «…»
Visual: subject, expression, background, color accent
Layout: text right/top-right, subject left…
Why the pair works: …
```

Then pick a **recommended pair** and list 2 A/B test variants (change one thing only: text OR image).

## Self-check

- [ ] Title ≤ 60 chars, promise in the first 35?
- [ ] Thumbnail text ≤ 4 words and doesn't repeat the title?
- [ ] No English word at the start/end of the title?
- [ ] Bottom-right corner of the thumbnail is clear?


---
Source: https://github.com/alfaris/full-production-studio (MIT). Packaged by Full Production Studio.
