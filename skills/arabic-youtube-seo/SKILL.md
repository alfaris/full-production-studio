---
name: arabic-youtube-seo
description: Optimizes Arabic YouTube videos for search (keywords across dialects and فصحى, spelling variants, Arabizi, bilingual descriptions, tags, chapters, and hashtags) so videos are found from every Arab country. Use when the user asks for "سيو يوتيوب", "وصف الفيديو", "تاجات", "كلمات مفتاحية", "chapters بالعربي", or Arabic YouTube metadata.
---

# Arabic YouTube SEO

Arabic search is fragmented: the same idea is typed in فصحى, in several dialects, with different spellings, and sometimes in Arabizi or English. Good Arabic SEO covers the variants without stuffing. The general method is in `yt-seo` / `youtube`; this skill adds the Arabic layer.

## 1. Build the keyword map

For the main topic, list:

| Layer | Example (topic: video editing with AI) |
|---|---|
| فصحى | مونتاج الفيديو بالذكاء الاصطناعي |
| Egyptian | إزاي أعمل مونتاج بالـAI |
| Khaleeji | كيف أسوي مونتاج بالذكاء الاصطناعي |
| Spelling variants | الاصطناعي / الإصطناعي · مونتاج / مونتاچ · فيديو / فديو |
| English terms Arabs type | AI video editing, CapCut AI |
| Arabizi (if the niche is young) | montage bel AI |

Spelling normalization to check: **أ/إ/آ/ا**, **ة/ه**, **ى/ي**, **ؤ/و**, **ئ/ي**, and whether the word takes «ال». YouTube matches some of these but not reliably, so put the most-searched form in the title and the main alternative in the description.

If you have search tools, check autocomplete for each variant (YouTube search suggestions) and keep the ones that appear. Otherwise label them as **unverified**.

## 2. Title
Hand off to `arabic-titles-thumbnails`. The main keyword goes in the first 35 characters.

## 3. Description template

```
[Line 1–2: the promise in natural Arabic, with the main keyword. This shows above "more".]

[2–4 lines: what's in the video, using 2–3 keyword variants naturally]

⏱️ المحتوى
00:00 المقدمة
01:12 …
…

🔗 الروابط المذكورة
…

[Optional English summary line for bilingual reach: 1 sentence with the English keyword]

#hashtag1 #hashtag2 #hashtag3
```

- **Chapters:** the first must be `00:00`, there must be at least 3, each ≥ 10 s apart. Chapter titles are short Arabic phrases with keywords where natural («إزاي تكتب الهوك»). Write timestamps with Western digits; YouTube needs them.
- **Hashtags:** 3–5. Arabic hashtags use underscores between words (#صناعة_المحتوى). The first 3 show above the title.
- Keep the description natural. Listing every variant in a row looks like spam and can hurt.

## 4. Tags (lower impact, still useful for misspellings)
10–15 tags: main keyword, its variants, dialect forms, the English term, and the channel name. Total < 500 characters.

## 5. Other signals
- **Subtitles:** upload a correct Arabic `.srt` (see `arabic-captions`). Auto-captions for dialect are often wrong, and accurate captions help search and accessibility.
- **Video language** setting: Arabic. Add translated title/description (English) via YouTube's translations if the topic has international interest.
- **Pinned comment:** a question in the creator's dialect that uses the keyword naturally.

## Output

1. Keyword map table (marked verified/unverified).
2. Title (or title options from `arabic-titles-thumbnails`).
3. Full description with chapters (if a transcript or timestamps were given; otherwise a chapter template).
4. Hashtags and tags.
5. Pinned comment.
