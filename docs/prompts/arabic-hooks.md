---
name: arabic-hooks
description: Writes scroll-stopping Arabic hooks and video openings (first 1–15 seconds) in the creator's own dialect, using formulas proven on Arabic Reels, TikTok, Shorts and YouTube. Use when the user asks for "هوك", "بداية الفيديو", "أول جملة", "مقدمة تشد", an Arabic hook, or wants hook options for an Arabic script.
---

# Arabic Hooks

The hook decides whether anyone watches the rest. An Arabic hook has to sound **spoken**, not like a headline. Use the creator's Voice Card from `arabic-voice` if it exists; if not, use the dialect the user writes in.

## Formulas (each with an Egyptian / Khaleeji example; adapt to the creator's dialect)

| # | Formula | Egyptian | Khaleeji |
|---|---|---|---|
| 1 | **Pain mirror**: name the exact frustration | «طلبت من الـAI سكريبت وطلعلك كلام ممل؟» | «طلبت من الذكاء الاصطناعي سكربت وطلع لك كلام ممل؟» |
| 2 | **Not X, it's Y** | «المشكلة مش في الكاميرا. المشكلة في أول تلات ثواني.» | «المشكلة مو بالكاميرا، المشكلة بأول ثلاث ثواني.» |
| 3 | **Result first** | «الريل ده جاب ٢ مليون مشاهدة، وهقولك عملته إزاي.» | «هالمقطع جاب مليونين مشاهدة، وبقولك كيف سويته.» |
| 4 | **Specific number** | «٨ أدوات مجانية هتوفرلك ٣ ساعات كل يوم.» | «٨ أدوات مجانية بتوفر لك ٣ ساعات يوميًا.» |
| 5 | **Callout** | «لو إنت مصمم وبتعمل الموشن بإيدك… استنى.» | «إذا أنت مصمم وتسوي الموشن يدوي… لحظة.» |
| 6 | **Myth bust** | «كل الناس بتقولك انشر كل يوم. ده غلط.» | «الكل يقول لك انشر كل يوم. هذا غلط.» |
| 7 | **Open loop / story** | «من سنة كنت هقفل القناة… لحد ما جربت حاجة واحدة.» | «قبل سنة كنت بقفل القناة… لين جربت شي واحد.» |
| 8 | **Stakes / loss** | «لو لسه بتعمل كده، إنت بتخسر نص المشاهدات.» | «إذا للحين تسوي كذا، قاعد تخسر نص المشاهدات.» |
| 9 | **Challenge / test** | «جربت أعمل فيديو كامل بالـAI في ساعة. النتيجة؟» | «جربت أسوي فيديو كامل بالذكاء الاصطناعي بساعة. النتيجة؟» |
| 10 | **Secret / insider** | «الحاجة اللي اليوتيوبرز الكبار مش بيقولوهالك.» | «الشي اللي اليوتيوبرز الكبار ما يقولونه لك.» |
| 11 | **Direct question** | «تعرف ليه فيديوهاتك بتقف عند ٢٠٠ مشاهدة؟» | «تدري ليش مقاطعك توقف عند ٢٠٠ مشاهدة؟» |
| 12 | **Before/After contrast** | «ده كان شكل الفيديو بتاعي… وده بقى شكله النهارده.» | «هذا كان شكل مقطعي… وهذا شكله اليوم.» |

## Arabic-specific rules

- **First sentence ≤ 8 words** spoken. Arabic words carry more meaning each, so short works.
- **Payoff by second 3.** Arabic speech runs about **2–2.3 words per second**, so 3 seconds ≈ 6–7 words.
- **No greetings first.** «السلام عليكم» and «أهلاً بيكم في قناة…» go *after* the hook, or get cut.
- **Dialect over فصحى** for social, unless the creator is an MSA channel (news, education, religious content).
- **On-screen text ≠ spoken text.** On screen: 2–5 words that add to what's spoken («٨ أدوات مجانية 👇»).
- **Numbers:** follow the Voice Card. Default to Eastern digits (٨) in Egyptian/Levantine casual content and Western (8) for Gulf tech audiences; say if unsure.
- **Religious/cultural sensitivity:** no hooks that mock religion, region, or dialect, and no fake urgency in Ramadan content.
- **Honest hooks only.** The video must deliver what the hook promises.

## Output format

Give **6 options**, each a different formula:

```
#n — [Formula]
Spoken: «…»
On-screen: «…»
First visual (0–2s): …
Why it works: …
```

Then pick a **recommended** option and write the full opening (hook + bridge + promise, 15–25 seconds spoken) in the creator's dialect.

## Self-check

- [ ] Every option is in ONE dialect, matching the creator?
- [ ] Each one could be said in a single breath?
- [ ] The viewer knows within 3 seconds why they should keep watching?


---
Source: https://github.com/alfaris/full-production-studio (MIT). Packaged by Full Production Studio.
