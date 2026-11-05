---
name: arabic-motion-typography
description: Animates Arabic text correctly and beautifully in Remotion, HTML/CSS/GSAP and After Effects-style workflows. Covers right-to-left layout, word-level (never letter-level) animation, Arabic fonts, mixed Arabic/English, digits, diacritics clipping, and kinetic typography synced to speech. Use when making Arabic titles, kinetic text, lower thirds, animated captions or any motion graphic with Arabic text, or when Arabic letters appear disconnected, reversed, or cut off in an animation.
---

# Arabic Motion Typography

Most motion tools and tutorials assume Latin text. Applied to Arabic, the usual tricks break letter joining and reading order. Follow these rules, and use `motion-design` / `remotion-motion-graphics` for general motion taste (easing, timing).

## 1. Hard rules (break these and the text breaks)

1. **Animate words, never letters.** Splitting Arabic into characters (`split('')`, GSAP SplitText `chars`) breaks the joined shapes. Split by spaces only.
2. **No `letter-spacing`** on Arabic. It disconnects letters. For stretching, use kashida (ـ) deliberately, or scale the word.
3. **Set direction.** Containers get `direction: rtl` (CSS) / `dir="rtl"` (HTML). In flex rows, `direction: rtl` makes word 1 sit on the right.
4. **Isolate mixed text.** English words and numbers inside Arabic: wrap in `<bdi>` or `unicode-bidi: isolate` so they don't reorder the line.
5. **Leave room for marks.** Arabic has tall ascenders and diacritics. Use `line-height ≥ 1.5`, and add vertical padding to any `overflow: hidden` / mask (≥ 0.25em) or dots and marks get clipped.
6. **Load the real font** before rendering. A fallback font produces wrong shapes and different widths.

## 2. Fonts that animate well

| Use | Fonts (Google Fonts, free) |
|---|---|
| Bold titles / kinetic | Cairo (Black/ExtraBold), Tajawal ExtraBold, Almarai ExtraBold, Readex Pro, Lalezar (display) |
| Clean UI / captions | IBM Plex Sans Arabic, Noto Kufi Arabic, Tajawal Medium |
| Elegant / editorial | El Messiri, Reem Kufi, Amiri (classical Naskh, avoid tiny sizes) |

Arabic needs about **10–15% larger** font size than Latin to read the same at a glance.

## 3. Remotion recipe: word-by-word reveal, RTL

```tsx
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';

const { fontFamily } = loadFont(); // waits for the font automatically during render

export const ArabicTitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' '); // WORDS, never characters

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ direction: 'rtl', display: 'flex', flexWrap: 'wrap', gap: '0.3em',
                    fontFamily, fontWeight: 800, fontSize: 110, lineHeight: 1.5,
                    color: 'white', maxWidth: '80%', justifyContent: 'center' }}>
        {words.map((w, i) => {
          const s = spring({ frame: frame - i * 4, fps, config: { damping: 14, stiffness: 160 } });
          return (
            <span key={i} style={{
              display: 'inline-block',
              opacity: interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateY(${(1 - s) * 40}px)`,
              filter: `blur(${(1 - s) * 6}px)`,
            }}>
              <bdi>{w}</bdi>
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
```

The stagger runs **right → left** automatically because of `direction: rtl`, which matches reading order.

### Mask reveal from the right (RTL wipe)
```tsx
const p = interpolate(frame, [0, 20], [100, 0], { extrapolateRight: 'clamp' }); // 100 → 0
<div style={{ clipPath: `inset(-0.3em 0 -0.3em ${p}%)` }}>…</div> // reveals starting at the right edge
```
The negative top/bottom inset keeps dots and diacritics from being clipped.

### Speech-synced (karaoke) highlight
Take word timestamps from Whisper (`arabic-transcript-cleanup`), convert to frames (`Math.round(t * fps)`), and change the active word's color/scale when `frame` is in its range. Same RTL container, same `<bdi>` per word.

## 4. HTML / GSAP

```js
// Split by words only
el.innerHTML = el.textContent.split(' ').map(w => `<span class="w"><bdi>${w}</bdi></span>`).join(' ');
gsap.from('.w', { y: 40, opacity: 0, filter: 'blur(6px)', stagger: 0.06, ease: 'expo.out', duration: 0.6 });
```
With GSAP SplitText use `type: "words"` (never `"chars"`), and set `dir="rtl"` on the parent.

## 5. Direction of motion

- Things **enter from the right** and exit to the left when they represent progress, because that's the reading direction.
- Progress bars, timelines and counters fill **right → left** for Arabic-first designs.
- Arrows and pointing gestures point the way the eye reads next (usually left).

## 6. Digits and mixed content

- Count-up numbers: decide Western (0–9) vs Eastern (٠–٩) once. Remotion: `n.toLocaleString('ar-EG')` gives Eastern digits; `'en-US'` gives Western.
- Percent signs and currencies move position in RTL. Test «٥٠٪» (Eastern digits, Arabic percent sign) vs «50%» and pick what the audience reads naturally; isolate with `<bdi>`.

## 7. Render check

Render stills (`npx remotion still … --frame=N`) at the start, the middle of the stagger, and the end. Check: letters joined, word order right-to-left, no clipped dots/marks, English and numbers not reversed, text inside the safe area.
