---
name: nano-banana-image-generator
description: Generate AI images using Nano Banana Pro (Gemini). Use this skill when the user needs images - thumbnails, social posts, blog headers, or creative visuals. Follows an iterative workflow - brainstorm concepts, select direction, generate in multiple styles, then produce via API.
---

> **Full Production Studio note:** this skill comes from another creator's own setup. Brand names, people and folder paths in it (for example OpenEd, Skill Stack, Howseen, `~/Desktop/...`) are *their* examples. Replace them with the user's brand, voice and folders (use the `arabic-voice` Voice Card when available) and never write in that other brand's voice.

# Nano Banana Image Generator

Generate professional, non-generic images using Nano Banana Pro (Gemini API).

## Workflow Overview

1. **Brainstorm Concepts** - Generate 4-6 high-level visual ideas
2. **Select Direction** - User picks the concept they like
3. **Source Reference Photos** - Find high-res images of real people/places (if applicable)
4. **Optimize Prompt** - Refine into a strong, detailed prompt
5. **Style Variations** - Adapt to 2-3 different visual styles
6. **Generate Images** - Run via Gemini API

## Step 1: Brainstorm Concepts

### When to Ask Clarifying Questions

Before brainstorming, assess if you have enough information. Ask 2-4 focused questions if:
- **Subject** is unclear or too generic
- **Purpose/Context** is missing (what's this for?)
- **Style** preferences are unspecified
- **Text requirements** are ambiguous

**Skip questions if:** The user provides a detailed brief or says "just generate it." Don't create friction when the request is already clear.

**Example:**
> User: "Can you write me a prompt for a hero image for my landing page?"
>
> You: "A few quick questions:
> 1. What's the product/service?
> 2. Any specific mood - modern/minimal, bold/energetic, warm/approachable?
> 3. Should there be text in the image itself?"

### Generating Concepts

When the user provides a topic or use case, generate 4-6 high-level visual concepts. Each concept should be:

- **One sentence** describing the visual idea
- **Concrete and immediate** - you can picture it instantly
- **Conceptual but not abstract** - a clear object/scene with meaning
- **Non-generic** - avoid cliches (no lightbulbs for ideas, no books for education)

**Format:**

```
1. **[Short label]** - One sentence description of the visual concept and why it works.

2. **[Short label]** - One sentence description...
```

**Example for "newsletter about self-directed learning":**

```
1. **Compass with crayon needle** - A compass where the needle is a crayon, suggesting direction comes from the learner's own hand.

2. **Path that branches into many paths** - A single dirt path splitting into dozens of colorful trails, each heading somewhere different.

3. **Empty frame on an easel** - A blank canvas on an easel in a field, suggesting the learner creates their own picture.

4. **Backpack with roots** - A school backpack sitting on grass, but roots are growing out the bottom into the soil - learning that plants itself.
```

Wait for user to select before proceeding.

## Step 2: Source Reference Photos (Person-Based Images)

When generating images that depict a real person (tribute posters, portraits, editorial illustrations featuring someone's likeness), you **must** source a high-resolution reference photo before generating.

### Why This Matters

- Input photo resolution directly determines output quality. A 283px input produces a blurry, unusable output. A 1920px+ input produces sharp, detailed results.
- The model needs a clear, well-lit photo to capture likeness accurately.
- Photo era matters: a 1913 photo of someone will produce a young-looking result even if the prompt says "elderly."

### Process

1. **Search for the person** using WebSearch or WebFetch. Look for:
   - Official organization pages (foundations, universities, publishers)
   - Wikipedia/Wikimedia Commons (check actual resolution - thumbnails are too small)
   - Library of Congress, public domain archives
   - Professional photography sites, press kits

2. **Verify resolution before downloading.** Target minimum 1000px on the longest edge, ideally 1920px+. Check the actual image dimensions, not the page thumbnail.

3. **Verify the era/age.** If the content discusses someone in their later years, don't use a photo from their twenties. Match the photo to the narrative.

4. **Download and save** to the same output directory as the final images, with a descriptive name:
   - `{name}-reference-hires.jpg` - Primary reference photo
   - `{name}-reference-{year}.jpg` - If era-specific (e.g., `montessori-reference-1946.jpg`)

5. **Use with `--input` flag** when generating:
   ```bash
   python generate_image.py "prompt describing the style..." \
     --input path/to/reference-hires.jpg \
     --model pro --aspect 16:9
   ```

### Resolution Quick Reference

| Input Resolution | Output Quality |
|-----------------|---------------|
| < 500px | Unusable - blurry, distorted |
| 500-999px | Marginal - may work for stylized illustrations |
| 1000-1920px | Good - suitable for most uses |
| 1920px+ | Excellent - sharp detail, accurate likeness |

### Troubleshooting Likeness

- **Doesn't look like them?** Try a different reference photo with clearer facial features and better lighting.
- **Wrong age?** Find a photo from the correct era.
- **Wikimedia rate-limiting (429)?** Use alternative sources (LOC, official sites, press kits).

## Step 3: Optimize the Prompt

Once the user selects a concept, develop it into a full prompt. Structure:

```
Create a [style type] illustration of [subject].

CONCEPT: [Expand the one-sentence idea into a clear visual description]

STYLE: [Artistic approach - load from references/styles/ if brand-specific]

COMPOSITION: [Framing, focal point, negative space, balance]

COLORS: [Palette - describe by name, not hex codes which may render as text]

TEXTURE: [Surface qualities, analog/digital feel]

AVOID: [What should NOT appear - be specific]

FORMAT: [Aspect ratio]
```

**Key principles:**
- Natural language, full sentences - no tag soup
- Describe colors by name (burnt orange, sky blue, near-black) not hex codes
- Maximum 2-3 elements - if it feels busy, remove something
- Favor metaphor over literal depiction

## Step 3: Style Variations

Adapt the optimized prompt to 2-3 different styles from `references/styles/`:

- **watercolor-line.md** - Ink linework with watercolor washes, warm **(DEFAULT for thumbnails)**
- **opened-editorial.md** - Conceptual, brand colors, editorial wit
- **minimalist-ink.md** - High-contrast black and white, crosshatching
- **newyorker-cartoon.md** - Single-panel observational humor, crosshatching, italic serif caption **(for editorial commentary)**

**Default behavior:** For blog thumbnails and article headers, use watercolor-line style unless otherwise specified. This style provides warmth and approachability while maintaining editorial quality.

**New Yorker style:** When user asks for "New Yorker cartoon," "editorial cartoon," or observational humor illustrations, load `references/styles/newyorker-cartoon.md` for the full style guide including caption formulas, humor principles, and prompt template.

**For comic ideation:** Use the `single-panel-comic` skill first to generate concepts and captions using Elijah's formula library, then return here for image generation. The workflow is:
```
single-panel-comic (ideation + caption) → nano-banana-image-generator (visual)
```

Present all variations to user so they can choose which to generate, or generate all.

## Step 4: Generate via API

### Setup

The Gemini API key is stored in the vault root `.env` file. The script looks for `GEMINI_API_KEY` or `GOOGLE_API_KEY`.

**Requirements:** `pip install google-genai pillow`

### Running the Script

The script lives at `.claude/skills/nano-banana-image-generator/scripts/generate_image.py`.

```bash
# From the OpenEd Vault root directory:
cd "/Users/charliedeist/Library/Mobile Documents/com~apple~CloudDocs/Root Docs/OpenEd Vault"

# Set the API key and run
export GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2) && \
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Your prompt here" \
  --model pro \
  --aspect 16:9 \
  --output "Studio/Content Engine Deck" \
  --name "my-image"
```

**Options:**
- `--model pro` (higher quality, supports aspect ratio) or `--model flash` (faster, cheaper)
- `--aspect 16:9`, `1:1`, `9:16`, `3:4`, `4:3` (only works with pro model)
- `--variations N` - generate N versions
- `--output ./path` - save location (default: current directory)
- `--name prefix` - filename prefix (legacy, prefer `--seo-name`)
- `--input path/to/image.png` - use a reference image for rework/edit mode
- `--seo-name slug` - SEO-friendly filename (e.g. `john-taylor-gatto-education-reformer`). Output: `{slug}-gen.jpg`
- `--context "Article title or topic"` - generates alt text suggestion in the metadata sidecar

**Format detection:** The script detects the actual image format (JPEG vs PNG) from Gemini's response bytes and saves with the correct extension. No more `.png` files containing JPEG data.

**Metadata sidecar:** Every generated image gets a `.meta.json` file alongside it containing:
- `alt_text` - Auto-generated from prompt + context
- `keywords` - Extracted from context
- `original_format` - Detected format (jpeg/png)
- `dimensions` - Width and height in pixels
- `aspect_ratio` - The requested ratio
- `prompt_summary` - First 200 chars of the prompt
- `suggested_seo_name` - The seo-name if provided

**Note:** For flash model, aspect ratio config is ignored - include the ratio in your prompt text instead.

### SEO Workflow (Recommended for Blog Content)

For any blog article or SEO content, use the full SEO workflow:

```bash
# 1. Generate with SEO name and context
export GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2) && \
python3 ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "A watercolor illustration of a child building a treehouse" \
  --model pro --aspect 16:9 \
  --seo-name "project-based-learning-treehouse" \
  --context "How Project-Based Learning Transforms Homeschool Education" \
  --output "Studio/SEO Content Production/project-based-learning/"

# 2. Convert to WebP for web delivery
python3 ".claude/skills/nano-banana-image-generator/scripts/image_optimizer.py" \
  "Studio/SEO Content Production/project-based-learning/project-based-learning-treehouse-gen.jpg" \
  --use thumbnail

# Result: project-based-learning-treehouse-gen-thumbnail.webp (1200x675)
# Plus updated .meta.json with WebP path and dimensions
```

### Image Optimizer

The `image_optimizer.py` script converts images to WebP with target dimension presets. It keeps the original file intact (edit/rework needs the lossless source).

```bash
python3 ".claude/skills/nano-banana-image-generator/scripts/image_optimizer.py" \
  path/to/image.jpg --use thumbnail
```

**Presets:**

| Preset | Dimensions | Use Case |
|--------|-----------|----------|
| `thumbnail` | 1200x675 | Webflow blog thumbnails (16:9) |
| `social-square` | 1080x1080 | Instagram, LinkedIn square |
| `social-portrait` | 1080x1350 | Instagram portrait (4:5) |
| `inline` | max-width 800px | In-article images |

**Options:**
- `--quality N` - WebP quality 1-100 (default: 85)
- `--output ./path` - output directory (default: same as input)

The optimizer updates the `.meta.json` sidecar with `webp_path`, `webp_dimensions`, and `webp_preset`.

### Editing Existing Images

To modify an existing image, use the `--input` flag with a path to the source image:

```bash
export GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2) && \
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Add a striped shirt to the child. Remove the signature from the bottom right corner." \
  --input "Studio/Social Media/original-image.png" \
  --model pro \
  --aspect 1:1 \
  --output "Studio/Social Media" \
  --name "edited-image"
```

**Editing capabilities:**
- Add, remove, or modify visual elements
- Change clothing, backgrounds, or objects
- Remove unwanted text, signatures, or watermarks
- Adjust colors or style elements
- Keep specific elements while changing others

**Best practices for edit prompts:**
- Be explicit about what to change AND what to keep
- List changes as numbered items for clarity
- Say "Keep everything else exactly the same" to preserve other elements
- Use "Remove X" for deletions, "Change X to Y" for modifications

**Output location:** ALWAYS save images in the same folder as the content they belong to - not a generic images dump. This is critical for organization.

**Routing by content type:**

| Content Type | Output Location |
|--------------|-----------------|
| Newsletter | `Studio/OpenEd Daily Studio/[date-folder]/` |
| Podcast episode | `Studio/Podcast Studio/[episode-folder]/` |
| Blog article | `Studio/SEO Content Production/[article-folder]/` |
| Guest contributor | `Studio/SEO Content Production/Guest Contributors/[name]/` |
| Social media | `Studio/Social Media Transformation/[campaign]/` |
| Hub page | `Content/Open Education Hub/[topic]/` |

**Before generating:** Identify the content context and determine the correct output path. If a project folder exists, route there. If not, create the folder first.

**Naming convention:** Use descriptive prefixes that indicate purpose:
- `thumbnail-draft.png` - Working thumbnail
- `thumbnail-final.png` - Approved thumbnail  
- `header-[concept].png` - Article header
- `social-[platform].png` - Platform-specific social image

## Step 6: Iterate

After user reviews generated images:
- **80% good?** Use `--input` flag to make targeted changes to the existing image
- **Composition off?** Adjust framing or element placement in prompt
- **Wrong style?** Try a different style reference
- **Too busy?** Simplify to fewer elements
- **Colors wrong?** Be more explicit about palette

**When to regenerate vs. edit:**
- **Edit** when the image is mostly right but needs specific fixes (remove element, change clothing, fix text)
- **Regenerate** when the composition, style, or concept needs a complete rethink

## Prompting Principles

### Write Like a Creative Director

Brief the model like a human artist. Use proper grammar, full sentences, and descriptive adjectives.

| Don't | Do |
|-------|-----|
| "Cool car, neon, city, night, 8k" | "A cinematic wide shot of a futuristic sports car speeding through a rainy Tokyo street at night. The neon signs reflect off the wet pavement and the car's metallic chassis." |

**Be specific about:**
- **Subject:** Instead of "a woman," say "a sophisticated elderly woman wearing a vintage chanel-style suit"
- **Materiality:** Describe textures - "matte finish," "brushed steel," "soft velvet," "crumpled paper"
- **Setting:** Define location, time of day, weather
- **Lighting:** Specify mood and light source
- **Mood:** Emotional tone of the image

### Provide Context

Context helps the model make logical artistic decisions. Include the "why" or "for whom."

**Example:** "Create an image of a sandwich for a Brazilian high-end gourmet cookbook."
*(Model infers: professional plating, shallow depth of field, perfect lighting)*

### Keep It Simple

- One clear focal point
- Maximum 2-3 elements total
- Generous negative space
- If it feels busy, remove something

### Avoid the Generic

- No lightbulbs for "ideas"
- No stacks of books for "education"
- No happy children raising hands
- No glossy AI aesthetic

## Resources

### references/styles/
Brand and aesthetic style definitions:
- `opened-editorial.md` - OpenEd brand style
- `minimalist-ink.md` - Black and white ink illustration
- `watercolor-line.md` - Ink with watercolor washes
- `newyorker-cartoon.md` - New Yorker single-panel cartoon (crosshatching, understated humor, italic serif caption)

### references/concepts/
Saved prompts for reusable images:
- `paper-airplane-newsletter.md` - Newsletter header variations
- `ed-horse-error.md` - Ed mascot for error states
- `dual-exposure-tribute.md` - Photo-grid composite tribute posters (Instagram 1:1 + thumbnail 16:9)

### scripts/ (in this skill folder)
- `generate_image.py` - Gemini API image generation (Nano Banana / Nano Banana Pro)

## Prompt Modifiers Reference

| Category | Examples |
|----------|----------|
| **Lighting** | golden hour, dramatic shadows, soft diffused light, neon glow, overcast |
| **Style** | cinematic, editorial, technical diagram, hand-drawn, photorealistic |
| **Texture** | matte finish, brushed steel, soft velvet, crumpled paper, weathered wood |
| **Composition** | wide shot, close-up, bird's eye view, dutch angle, symmetrical |
| **Mood** | energetic, serene, dramatic, playful, sophisticated |
| **Quality** | 4K, high-fidelity, pixel-perfect, professional grade |

## Advanced Capabilities

### Text Rendering & Infographics

Put exact text in quotes. Specify style: "polished editorial," "technical diagram," or "hand-drawn whiteboard."

**Example prompts:**

```
Earnings Report Infographic:
"Generate a clean, modern infographic summarizing the key financial highlights from this earnings report. Include charts for 'Revenue Growth' and 'Net Income', and highlight the CEO's key quote in a stylized pull-quote box."
```

```
Whiteboard Summary:
"Summarize the concept of 'Transformer Neural Network Architecture' as a hand-drawn whiteboard diagram suitable for a university lecture. Use different colored markers for the Encoder and Decoder blocks, and include legible labels for 'Self-Attention' and 'Feed Forward'."
```

### Character Consistency & Thumbnails

Use reference images and state "Keep the person's facial features exactly the same as Image 1." Describe expression/action changes while maintaining identity.

**Example prompt:**

```
Viral Thumbnail:
"Design a viral video thumbnail using the person from Image 1.
Face Consistency: Keep the person's facial features exactly the same as Image 1, but change their expression to look excited and surprised.
Action: Pose the person on the left side, pointing their finger towards the right side of the frame.
Subject: On the right side, place a high-quality image of a delicious avocado toast.
Graphics: Add a bold yellow arrow connecting the person's finger to the toast.
Text: Overlay massive, pop-style text in the middle: 'Done in 3 mins!'. Use a thick white outline and drop shadow.
Background: A blurred, bright kitchen background. High saturation and contrast."
```

### Image Reworking (Edit Existing Images)

The `--input` flag enables "rework mode" - pass an existing image to Gemini and describe the changes you want.

**Key use cases:**
- **Small tweaks** - Adjust colors, add/remove elements, change lighting
- **Style transfer** - Keep composition but change artistic style
- **Object manipulation** - Remove, add, or modify specific objects
- **Seasonal/temporal changes** - Same scene, different time/season

**Running in rework mode:**

```bash
cd "/Users/charliedeist/Library/Mobile Documents/com~apple~CloudDocs/Root Docs/OpenEd Vault"

# Basic edit - add something
export GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2) && \
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Add snow to the roof and yard" \
  --input ./path/to/house.png \
  --model pro

# Color adjustment
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Change the accent color from red to teal, keep everything else identical" \
  --input ./path/to/thumbnail.png \
  --model pro

# Style transfer - keep composition, change aesthetic
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Convert this to watercolor style with soft washes and visible brushstrokes" \
  --input ./path/to/photo.png \
  --model pro

# Generate variations of an edit
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Make the lighting warmer, like golden hour" \
  --input ./path/to/portrait.png \
  --variations 3 \
  --model pro
```

**Prompting tips for rework mode:**

1. **Be specific about what to preserve:**
   - "Keep the person's facial features exactly the same"
   - "Maintain the composition and framing"
   - "Don't change the background"

2. **Be explicit about what to change:**
   - "Change ONLY the color of the shirt from blue to red"
   - "Add snow to the roof and nothing else"
   - "Remove the text overlay"

3. **Use comparative language:**
   - "Make the colors more vibrant"
   - "Increase the contrast slightly"
   - "Make the lighting softer and more diffused"

**Output naming:** Files from rework mode are named `{prefix}_{timestamp}_edit_{model}.png` to distinguish from generated images (`_gen_`).

### Advanced Editing Examples

**Object Removal:**
```bash
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Remove the tourists from the background and fill with matching cobblestones and storefronts" \
  --input ./street-photo.png \
  --model pro
```

**Seasonal Control:**
```bash
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Turn this into winter. Add snow to the roof and yard. Change lighting to cold, overcast afternoon. Keep architecture identical." \
  --input ./house-summer.png \
  --model pro
```

**Character Consistency (thumbnail series):**
```bash
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "Keep the person's face exactly the same. Change expression to surprised. Add a pointing gesture toward the right side of the frame." \
  --input ./person-reference.png \
  --model pro
```

### Dimensional Translation (2D to 3D)

```
Floor Plan to Interior Design:
"Based on the uploaded 2D floor plan, generate a professional interior design presentation board in a single image.
Layout: A collage with one large main image at the top (wide-angle perspective of the living area), and three smaller images below (Master Bedroom, Home Office, and a 3D top-down floor plan).
Style: Apply a Modern Minimalist style with warm oak wood flooring and off-white walls across ALL images.
Quality: Photorealistic rendering, soft natural lighting."
```

### Storyboarding & Sequential Art

```
Commercial Storyboard:
"Create an addictively intriguing 9-part story with 9 images featuring a woman and man in an award-winning luxury luggage commercial. The story should have emotional highs and lows, ending on an elegant shot of the woman with the logo. The identity of the woman and man and their attire must stay consistent throughout but they can and should be seen from different angles and distances. Please generate images one at a time. Make sure every image is in a 16:9 landscape format."
```

### Structural Control & Layout

Upload sketches to define text/object placement. Use wireframes for UI mockups.

```
Sketch to Ad:
"Create an ad for a [product] following this sketch."
```

```
Sprite Sheet:
"Sprite sheet of a woman doing a backflip on a drone, 3x3 grid, sequence, frame by frame animation, square aspect ratio. Follow the structure of the attached reference image exactly."
```

---

## OpenEd Content Playbooks

### Instagram Carousel Playbook

For OpenEd deep dives, blog posts, and educational content - use this workflow to create consistent, branded carousels.

**Specs:**
- **Dimensions:** 1080x1350 (4:5 portrait) - use `--aspect 3:4`
- **Style:** Watercolor-line (default for OpenEd)
- **Typical structure:** Intro → Numbered steps → CTA

**Workflow:**

1. **Generate Slide 1 first** - This establishes the visual style
   - Include step number, title, visual concept
   - Use watercolor-line style from `references/styles/watercolor-line.md`

2. **Use Slide 1 as reference for all subsequent slides**
   ```bash
   python3 generate_image.py "prompt" \
     --input path/to/slide1.png \
     --model pro --aspect 3:4
   ```
   - This ensures consistent style, colors, positioning across all slides

3. **Slide structure:**
   - **Intro slide:** Title + subtitle + OpenEd logo (see logo reference below)
   - **Step slides:** Large number (upper left), step title, visual that represents the concept
   - **CTA slide:** Can reuse/edit the intro or create distinct CTA

4. **Adding the OpenEd logo:**
   - Logo file: `references/assets/opened-logo.png`
   - Use rework mode to add logo to existing slide:
   ```bash
   python3 generate_image.py \
     "Replace the 'O' in 'OpenEd' with the OpenEd logo - two curved parentheses forming an O, left half burnt orange, right half sky blue. Keep watercolor style." \
     --input path/to/intro-slide.png \
     --model pro
   ```

5. **Common edits:**
   - Character appearance (race, age, etc.): Regenerate with explicit description
   - Adding CTA text: Use rework mode
   - Style consistency fixes: Reference slide 1 in prompt

**Example carousel structure (7-step method):**

| Slide | Type | Content |
|-------|------|---------|
| 0 | Intro | Title + "in 7 Steps" + logo |
| 1-7 | Steps | Number + title + visual |
| 8 | CTA | "Subscribe to OpenEd Daily" or similar |

**Naming convention:**
- `carousel-intro.png`
- `carousel-step1.png` through `carousel-step7.png`
- `carousel-cta.png`

### Infographic Playbook

For wide-format infographics (spectrum diagrams, comparisons, timelines):

**Specs:**
- **Dimensions:** 21:9 ultra-wide or 16:9 - use `--aspect 16:9` (closest supported)
- **Style:** Watercolor-line with Vox-style information hierarchy
- **Text:** Minimal - labels only, no explanatory paragraphs

**Key principles:**
- Visual hierarchy does the work, not text
- Icons should be hand-drawn style (not emoji)
- Generous white space
- Clear left-to-right or top-to-bottom flow

### Thumbnail Playbook

For blog posts and deep dives:

**Specs:**
- **Dimensions:** 16:9 - use `--aspect 16:9`
- **Style:** Watercolor-line (default)

**Concepts that work for education content:**
- Child engaged in hands-on activity
- The "before/after" or "wrong way/right way" tension
- Metaphorical objects (treehouse = building your own path)
- Avoid: Clipart children, raised hands, classroom settings

### New Yorker Cartoon Playbook

For editorial commentary, LinkedIn posts, newsletter illustrations:

**Specs:**
- **Dimensions:** 1:1 square - use `--aspect 1:1`
- **Style:** See `references/styles/newyorker-cartoon.md`

**Key principles:**
- Simple pen-and-ink, NOT heavily crosshatched
- Plain white background, NO texture
- Caption in italic serif below
- The humor is understated, observational
- 80% white space - restraint is everything

---

## References

### references/assets/
Brand assets for OpenEd content:
- `opened-logo.png` - OpenEd logo mark (orange/blue parentheses)

### references/styles/
(as listed above)


---

<!-- file: references/ai-image-prompting-guide.md -->

# AI Image Generation Prompting Guide

A condensed reference for professional asset production using modern AI image models.

---

## Golden Rules of Prompting

### 1. Edit, Don't Re-roll
If an image is 80% correct, don't regenerate from scratch. Request specific changes conversationally.

**Example:** "That's great, but change the lighting to sunset and make the text neon blue."

### 2. Use Natural Language & Full Sentences
Brief the model like a human artist. Use proper grammar and descriptive adjectives.

| ❌ Bad | ✅ Good |
|--------|---------|
| "Cool car, neon, city, night, 8k" | "A cinematic wide shot of a futuristic sports car speeding through a rainy Tokyo street at night. The neon signs reflect off the wet pavement and the car's metallic chassis." |

### 3. Be Specific and Descriptive

- **Subject:** Instead of "a woman," say "a sophisticated elderly woman wearing a vintage chanel-style suit"
- **Materiality:** Describe textures—"matte finish," "brushed steel," "soft velvet," "crumpled paper"
- **Setting:** Define location, time of day, weather
- **Lighting:** Specify mood and light source
- **Mood:** Emotional tone of the image

### 4. Provide Context (The "Why" or "For Whom")
Context helps the model make logical artistic decisions.

**Example:** "Create an image of a sandwich for a Brazilian high-end gourmet cookbook."
*(Model infers: professional plating, shallow depth of field, perfect lighting)*

---

## Capability Reference

### Text Rendering & Infographics

**Best Practices:**
- Use "compress" for dense text/PDFs into visual aids
- Specify style: "polished editorial," "technical diagram," or "hand-drawn whiteboard"
- Put exact text in quotes

**Example Prompts:**

```
Earnings Report Infographic:
"Generate a clean, modern infographic summarizing the key financial highlights from this earnings report. Include charts for 'Revenue Growth' and 'Net Income', and highlight the CEO's key quote in a stylized pull-quote box."
```

```
Retro Infographic:
"Make a retro, 1950s-style infographic about the history of the American diner. Include distinct sections for 'The Food,' 'The Jukebox,' and 'The Decor.' Ensure all text is legible and stylized to match the period."
```

```
Technical Diagram:
"Create an orthographic blueprint that describes this building in plan, elevation, and section. Label the 'North Elevation' and 'Main Entrance' clearly in technical architectural font. Format 16:9."
```

```
Whiteboard Summary:
"Summarize the concept of 'Transformer Neural Network Architecture' as a hand-drawn whiteboard diagram suitable for a university lecture. Use different colored markers for the Encoder and Decoder blocks, and include legible labels for 'Self-Attention' and 'Feed Forward'."
```

---

### Character Consistency & Thumbnails

**Best Practices:**
- **Identity Locking:** State "Keep the person's facial features exactly the same as Image 1"
- Describe expression/action changes while maintaining identity
- Combine subjects with bold graphics and text in a single pass

**Example Prompts:**

```
Viral Thumbnail:
"Design a viral video thumbnail using the person from Image 1. 
Face Consistency: Keep the person's facial features exactly the same as Image 1, but change their expression to look excited and surprised. 
Action: Pose the person on the left side, pointing their finger towards the right side of the frame. 
Subject: On the right side, place a high-quality image of a delicious avocado toast. 
Graphics: Add a bold yellow arrow connecting the person's finger to the toast. 
Text: Overlay massive, pop-style text in the middle: 'Done in 3 mins!'. Use a thick white outline and drop shadow. 
Background: A blurred, bright kitchen background. High saturation and contrast."
```

```
Group Character Story:
"Create a funny 10-part story with these 3 fluffy friends going on a tropical vacation. The story is thrilling throughout with emotional highs and lows and ends in a happy moment. Keep the attire and identity consistent for all 3 characters, but their expressions and angles should vary throughout all 10 images."
```

```
Brand Asset Generation:
"Create 9 stunning fashion shots as if they're from an award-winning fashion editorial. Use this reference as the brand style but add nuance and variety to the range so they convey a professional design touch. Please generate nine images, one at a time."
```

---

### Advanced Editing & Restoration

**Best Practices:**
- Use semantic instructions (no manual masking needed)
- Describe changes naturally
- Test physics understanding with complex requests

**Example Prompts:**

```
Object Removal:
"Remove the tourists from the background of this photo and fill the space with logical textures (cobblestones and storefronts) that match the surrounding environment."
```

```
Colorization:
"Colorize this manga panel. Use a vibrant anime style palette. Ensure the lighting effects on the energy beams are glowing neon blue and the character's outfit is consistent with their official colors."
```

```
Localization:
"Take this concept and localize it to a Tokyo setting, including translating the tagline into Japanese. Change the background to a bustling Shibuya street at night."
```

```
Seasonal Control:
"Turn this scene into winter time. Keep the house architecture exactly the same, but add snow to the roof and yard, and change the lighting to a cold, overcast afternoon."
```

---

### Dimensional Translation (2D ↔ 3D)

**Example Prompts:**

```
Floor Plan to Interior Design:
"Based on the uploaded 2D floor plan, generate a professional interior design presentation board in a single image. 
Layout: A collage with one large main image at the top (wide-angle perspective of the living area), and three smaller images below (Master Bedroom, Home Office, and a 3D top-down floor plan). 
Style: Apply a Modern Minimalist style with warm oak wood flooring and off-white walls across ALL images. 
Quality: Photorealistic rendering, soft natural lighting."
```

```
2D to 3D Meme:
"Turn the 'This is Fine' dog meme into a photorealistic 3D render. Keep the composition identical but make the dog look like a plush toy and the fire look like realistic flames."
```

---

### High-Resolution & Textures

**Best Practices:**
- Explicitly request resolution (2K or 4K)
- Describe high-fidelity details (imperfections, surface textures)

**Example Prompts:**

```
4K Texture:
"Harness native high-fidelity output to craft a breathtaking, atmospheric environment of a mossy forest floor. Command complex lighting effects and delicate textures, ensuring every strand of moss and beam of light is rendered in pixel-perfect resolution suitable for a 4K wallpaper."
```

```
Deconstructed Product:
"Create a hyper-realistic infographic of a gourmet cheeseburger, deconstructed to show the texture of the toasted brioche bun, the seared crust of the patty, and the glistening melt of the cheese. Label each layer with its flavor profile."
```

---

### Storyboarding & Sequential Art

**Example Prompt:**

```
Commercial Storyboard:
"Create an addictively intriguing 9-part story with 9 images featuring a woman and man in an award-winning luxury luggage commercial. The story should have emotional highs and lows, ending on an elegant shot of the woman with the logo. The identity of the woman and man and their attire must stay consistent throughout but they can and should be seen from different angles and distances. Please generate images one at a time. Make sure every image is in a 16:9 landscape format."
```

---

### Structural Control & Layout

**Best Practices:**
- Upload sketches to define text/object placement
- Use wireframes for UI mockups
- Use grids for tile-based or pixel art generation

**Example Prompts:**

```
Sketch to Ad:
"Create an ad for a [product] following this sketch."
```

```
Wireframe to UI:
"Create a mock-up for a [product] following these guidelines."
```

```
Pixel Art:
"Generate a pixel art sprite of a unicorn that fits perfectly into this 64x64 grid image. Use high contrast colors."
```

```
Sprite Sheet:
"Sprite sheet of a woman doing a backflip on a drone, 3x3 grid, sequence, frame by frame animation, square aspect ratio. Follow the structure of the attached reference image exactly."
```

---

## Prompt Structure Template

```
[SUBJECT]: Detailed description of main subject with specific attributes
[SETTING]: Location, environment, time of day
[LIGHTING]: Light source, mood, shadows
[STYLE]: Artistic style, medium, reference
[COMPOSITION]: Camera angle, framing, aspect ratio
[DETAILS]: Textures, materials, specific elements
[CONTEXT]: Purpose, audience, use case
[FORMAT]: Resolution, dimensions if needed
```

---

## Quick Reference: Prompt Modifiers

| Category | Examples |
|----------|----------|
| **Lighting** | golden hour, dramatic shadows, soft diffused light, neon glow, overcast |
| **Style** | cinematic, editorial, technical diagram, hand-drawn, photorealistic |
| **Texture** | matte finish, brushed steel, soft velvet, crumpled paper, weathered wood |
| **Composition** | wide shot, close-up, bird's eye view, dutch angle, symmetrical |
| **Mood** | energetic, serene, dramatic, playful, sophisticated |
| **Quality** | 4K, high-fidelity, pixel-perfect, professional grade |


---

<!-- file: references/concepts/dual-exposure-tribute.md -->

# Dual Exposure Photo-Grid Composite Tribute Poster

Conceptual tribute poster style combining a portrait silhouette with a photo mosaic grid of the subject's life and work. High-end, editorial, mixed-media aesthetic.

---

## Template Variables

Replace `[BRACKETS]` with subject-specific details.

---

## Instagram Version (1:1 Square)

```
Generate a dual exposure photo-grid composite tribute poster for [SUBJECT NAME]. Style: high-end conceptual tribute poster.

CENTRAL STRUCTURE (THE VESSEL):
The central focus is a large-scale, high-contrast black and white portrait silhouette of [SUBJECT NAME]. This main portrait acts as the container.

THE GRID FILL & TEXTURES (MIXED MEDIA):
The interior of the silhouette is populated by a dense "photo mosaic grid" of scenes from [SUBJECT]'s life and intellectual world — [LIST 6-8 SPECIFIC SCENES: e.g., lecture halls, handwritten manuscripts, specific locations, seminar rooms, stacks of books, crowds of students, relevant architecture, and landscapes].

CRITICAL TEXTURE INSTRUCTION: Do not just paste flat photos. Apply artistic textures to various grid cells to create a tactile, collage feel. Use effects like:
- Halftone Dots: Comic-book style raster patterns on some cells.
- Fabric/Embroidery: Subtle thread or canvas textures suggesting [RELEVANT TEXTILE: e.g., a clerical vestment, a wool sweater, classroom felt].
- Film Grain: Heavy noise on specific high-contrast documentary-style shots.

COLOR STRATEGY:
The base is Monochrome B&W. Use selective color overlays — muted earth tones ([LIST 3 COLORS: e.g., terracotta, olive, deep indigo]) — ONLY on specific grid cells to create a rhythm. These suggest [WHAT THE COLORS EVOKE: e.g., Mexico, the Church, and the printed page].

TYPOGRAPHY & BRANDING (STRICT MICRO-SCALING):
Do NOT include any text or typography on the image. No names, no labels, no captions.

COMPOSITION & BACKGROUND:
Background: Off-white or light grey with a visible high-quality paper or concrete texture. It should not be flat digital white.
Alignment: Center the figure perfectly. Maintain wide negative space around the object.
```

**Usage:**
```bash
export GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2) && \
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "YOUR PROMPT HERE" \
  --input path/to/reference-photo.jpg \
  --model pro \
  --aspect 1:1 \
  --output "path/to/content/folder" \
  --name "subject-tribute"
```

---

## Thumbnail Version (16:9 Landscape)

```
Generate a dual exposure photo-grid composite tribute image for [SUBJECT NAME]. Style: high-end conceptual tribute, landscape format.

CENTRAL STRUCTURE (THE VESSEL):
A large-scale, high-contrast black and white portrait silhouette of [SUBJECT NAME], positioned slightly left of center to create visual tension in the wide format. The silhouette acts as the container for the mosaic grid.

THE GRID FILL & TEXTURES (MIXED MEDIA):
The interior of the silhouette is populated by a dense "photo mosaic grid" of scenes from [SUBJECT]'s life and intellectual world — [LIST 6-8 SPECIFIC SCENES].

CRITICAL TEXTURE INSTRUCTION: Do not just paste flat photos. Apply artistic textures to various grid cells to create a tactile, collage feel. Use effects like:
- Halftone Dots: Comic-book style raster patterns on some cells.
- Fabric/Embroidery: Subtle thread or canvas textures suggesting [RELEVANT TEXTILE].
- Film Grain: Heavy noise on specific high-contrast documentary-style shots.

COLOR STRATEGY:
The base is Monochrome B&W. Use selective color overlays — muted earth tones ([LIST 3 COLORS]) — ONLY on specific grid cells to create a rhythm.

TYPOGRAPHY & BRANDING:
Do NOT include any text or typography on the image. No names, no labels, no captions.

COMPOSITION & BACKGROUND:
Background: Off-white or light grey with a visible high-quality paper or concrete texture. It should not be flat digital white.
Alignment: Position the figure slightly left of center. Use the extra horizontal space for generous negative space on the right, creating a cinematic, editorial feel.
```

**Usage:**
```bash
export GEMINI_API_KEY=$(grep GEMINI_API_KEY .env | cut -d'=' -f2) && \
python ".claude/skills/nano-banana-image-generator/scripts/generate_image.py" \
  "YOUR PROMPT HERE" \
  --input path/to/reference-photo.jpg \
  --model pro \
  --aspect 16:9 \
  --output "path/to/content/folder" \
  --name "subject-tribute-thumbnail"
```

---

## Examples

### Ivan Illich (Instagram 1:1)
- **Grid scenes:** Lecture halls, handwritten manuscripts, Mexican streetscapes of Cuernavaca, CIDOC seminar rooms, stacks of books, crowds of students, ecclesiastical architecture, Latin American landscapes
- **Textures:** Clerical vestment fabric, film grain on documentary shots
- **Colors:** Terracotta, olive, deep indigo (evoking Mexico, the Church, the printed page)

### John Taylor Gatto (Thumbnail 16:9)
- **Grid scenes:** NYC public school hallways, Wall Street Journal op-ed pages, classroom chalkboards, homeschool conference stages, taxi cabs, Madison Avenue offices, stacks of textbooks, state capitol buildings
- **Textures:** Chalk dust, newspaper halftone, worn classroom wood
- **Colors:** Slate blue, warm amber, brick red (evoking NYC schools, journalism, American institutions)

### Maria Montessori (Thumbnail 16:9)
- **Grid scenes:** Casa dei Bambini classroom, child-sized materials, Roman architecture, Indian landscapes, Amsterdam canals, children working with beads, medical instruments, handwritten letters
- **Textures:** Linen fabric, watercolor washes, aged paper
- **Colors:** Terracotta, sage green, warm gold (evoking Italy, natural materials, warmth)

---

## Key Learnings

1. **Always use a high-res reference photo** (1000px+ minimum, 1920px+ ideal) via the `--input` flag
2. **No text on the image** - typography renders unreliably; add text in post-production
3. **Photo era matters** - match the reference photo's age to the narrative context
4. **16:9 works better for thumbnails** - offset the silhouette slightly left of center for the landscape format
5. **Selective color overlays** should be thematic, not random - they tell a story about the subject's world


---

<!-- file: references/concepts/ed-horse-error.md -->

# Ed the Horse - Error/Frustration

OpenEd's mascot Ed (a horse with glasses) having tech difficulties. Good for: error pages, loading states, "something went wrong" messages, tech support content.

---

## Standard Version

```
Create an illustration of a cartoon horse wearing round glasses, looking frustrated at a laptop computer.

CONCEPT: A friendly horse character (named Ed) wearing round spectacles, sitting or standing at a laptop. Small frustration marks (like manga-style anger symbols or sweat drops) near his head. He's having a "tech difficulties" moment.

STYLE: Hand-drawn ink illustration with subtle watercolor wash. Friendly and approachable but not childish. Think editorial cartoon character - expressive, slightly exaggerated features. The horse should have personality.

COMPOSITION: Ed and the laptop as the clear focal point. Simple or no background. The frustration marks floating near his head. Medium shot - we see his upper body/head and the laptop clearly.

COLORS: Near-black linework. Warm cream background. Burnt orange on the glasses frames and frustration marks. Sky blue as a subtle accent on the laptop screen glow or a small element.

EXPRESSION: Furrowed brow, maybe one eye squinting. Clearly annoyed but in a relatable, comedic way - not angry. The "why isn't this working" face.

TEXTURE: Hand-drawn quality, visible ink strokes. Not too polished.

AVOID: Realistic horse anatomy, photorealistic rendering, scary or aggressive expression, busy backgrounds, text on screen.

FORMAT: 1:1 square
```

---

## Variations to Try

**Confused Ed** (for "page not found"):
- Change expression to puzzled rather than frustrated
- Maybe scratching head with hoof
- Question marks instead of frustration marks

**Apologetic Ed** (for "we're sorry"):
- Sheepish expression, slight smile
- Maybe a small shrug gesture
- Sweat drop rather than anger marks

**Working on it Ed** (for "loading" or "please wait"):
- Determined expression, focused
- Typing actively on keyboard
- No frustration marks - just concentration


---

<!-- file: references/concepts/paper-airplane-newsletter.md -->

# Paper Airplane - Newsletter Header

A paper airplane with dotted trajectory line. Good for: OpenEd Daily headers, newsletter imagery, content about direction/journey/delivery.

---

## OpenEd Editorial Version

```
Create a conceptual editorial illustration of a paper airplane in flight.

CONCEPT: A single paper airplane mid-flight, trailing a dotted line path behind it. The trajectory curves gently, suggesting journey and direction. Simple, confident, iconic.

STYLE: Hand-drawn editorial illustration with confident ink linework. Intentional imperfection - not polished or corporate. Subtle watercolor wash for depth.

COMPOSITION: Paper airplane in the upper portion of frame, dotted line trailing from lower left toward it. Generous negative space. Asymmetrical balance.

COLORS: Near-black linework. Warm cream background. Burnt orange wash on the paper airplane. Sky blue dotted line for the trajectory.

TEXTURE: Visible ink strokes, hand-drawn feel. Paper grain subtle but present.

AVOID: Text, gradients, glossy rendering, additional objects, busy backgrounds, realistic paper texture.

FORMAT: 16:9 landscape
```

---

## Minimalist Ink Version

```
Create a minimalist ink illustration of a paper airplane in flight.

CONCEPT: A paper airplane with a dotted line trajectory trailing behind it. The path curves upward. Clean, iconic, immediate.

STYLE: High-contrast black and white ink illustration. Hand-drawn quality with confident linework. Use crosshatching sparingly - maybe just to give the airplane some dimension. Think literary magazine or New Yorker editorial art.

COMPOSITION: Airplane positioned in upper right, trajectory line sweeping in from lower left. Generous white space. The dotted line should feel hand-drawn, not mechanical.

RENDERING: Pure black ink on white. Linework should feel human - slight variation in stroke weight. Dots in the trajectory line slightly irregular.

AVOID: Gray tones, gradients, color of any kind, photorealistic rendering, digital-looking lines, busy backgrounds.

FORMAT: 16:9 landscape
```

---

## Watercolor + Line Version

```
Create a watercolor and ink illustration of a paper airplane in flight.

CONCEPT: A paper airplane trailing a dotted line path behind it. The trajectory curves gracefully. Warm, optimistic, hand-crafted.

STYLE: Hand-drawn ink linework with loose watercolor washes. Confident, slightly sketchy lines provide structure. Watercolor bleeds naturally beyond the lines.

COMPOSITION: Paper airplane in upper portion, dotted trajectory sweeping up from lower left. Plenty of breathing room. Off-center, natural balance.

COLORS: Limited palette - burnt orange wash on the airplane, sky blue for the dotted trajectory line. Near-black ink linework. Warm off-white paper showing through generously.

TEXTURE: Visible brushstrokes in watercolor areas. Paper grain showing. Natural watercolor pooling on the airplane shape.

AVOID: Digitally perfect edges, too many colors, busy composition, text, overly saturated tones.

FORMAT: 16:9 landscape
```


---

<!-- file: references/styles/editorial-infographic.md -->

# Editorial Infographic (Vox-Inspired)

Bold, textured data visualization with editorial personality. Inspired by Vox explainers, risograph prints, and screen-printed posters. Information-dense but visually warm — not clinical, not corporate.

## When to Use

- Schedule/timeline visualizations ("Day in the Life")
- Comparison charts and spectrum diagrams
- Statistical breakdowns and data stories
- Any infographic that needs to feel hand-made, not PowerPoint

## Visual Approach

The key tension: **structured data + organic texture.** The information is clear and hierarchical, but the surface feels printed, not digital. Like a well-designed zine or an indie magazine data page.

**Key characteristics:**
- Bold, slightly imperfect color blocks (not gradient-smooth)
- Visible print texture — halftone dots, ink grain, paper fiber
- Hand-lettered or bold sans-serif typography (not thin/elegant)
- Organic shapes containing data (not perfect geometric containers)
- Layered depth — elements feel stacked/overlapping, not flat
- Subtle misregistration (colors don't line up perfectly, like screen printing)
- Warm background — kraft paper, cream, or off-white with visible grain

**The feel:** A poster you'd buy at a design bookshop. Something between a Vox explainer frame and a risograph art print.

## Color Application

For OpenEd brand consistency:
- **Deep navy or charcoal** (#1a1a2e or #2d2d2d) for primary text and containers
- **Burnt orange** (#d4622b) bold blocks for emphasis and key data
- **Sky blue** (#4a90d9) for secondary data segments
- **Cream/warm white** (#f5f0e8) textured background
- **Warm gray** (#8a8580) for supporting elements
- **Optional accent:** Mustard yellow (#d4a72c) sparingly for highlights

Palette should feel like a 3-color screen print — limited, intentional, bold.

## Typography Direction

- **Headlines/titles:** Heavy weight, all-caps or bold mixed case. Large. Confident.
- **Data labels:** Medium weight sans-serif. Clear but not precious.
- **Small text/annotations:** Light italic or handwritten feel.
- Hierarchy does the work — size contrast between levels should be dramatic.

## Texture & Surface

This is what separates editorial infographics from generic ones:
- **Paper grain:** Visible fiber texture in the background, like kraft or newsprint
- **Ink texture:** Colors should look printed, not digitally filled — slight variation in density
- **Halftone/dot patterns:** Subtle dot screens in lighter color areas
- **Edge quality:** Not razor-sharp — slightly soft or rough edges on color blocks
- **Overlay effects:** Where colors overlap, they mix like transparent inks

## Technical Direction

```
STYLE: Bold editorial infographic with risograph/screen-print texture. Think Vox explainer meets indie design poster. Information is clear and hierarchical, but the surface has warmth and grain — visible paper texture, ink variation, subtle halftone patterns. NOT flat digital. NOT corporate.

RENDERING: Bold color blocks with visible print texture. Colors feel like thick ink on textured paper — not digitally perfect. Slight misregistration where colors meet. Typography is confident and heavy, not thin or elegant.

TEXTURE: Kraft paper or cream background with visible grain. Halftone dot patterns in lighter areas. Ink density varies slightly across color blocks. Edges are slightly soft, like screen printing. Where colors overlap, they blend like transparent inks.

TYPOGRAPHY: Bold sans-serif for titles (heavy weight, large). Clear labels for data. Strong size hierarchy — title should dominate. Text rendered as integral part of the design, not floating on top.
```

## Example Prompt Structure

```
Create a bold editorial infographic showing [SUBJECT/DATA].

CONCEPT: [What data are we visualizing? What's the key insight?]

STYLE: Risograph/screen-print aesthetic with Vox-style information hierarchy. Bold color blocks on textured cream/kraft paper. Visible halftone dots, ink grain, and slight print misregistration. Think indie design poster, not corporate chart.

COMPOSITION: [Clock face / timeline / comparison / spectrum — describe layout]

DATA: [List the specific data points, segments, labels]

TYPOGRAPHY: Bold heavy sans-serif title at top. Clear labels on each segment. Strong size hierarchy — title dominates, labels support.

COLORS: Limited 3-color palette — deep navy, burnt orange, and sky blue on warm cream background. Colors feel like thick screen-print ink with visible texture.

TEXTURE: Paper grain throughout. Halftone dot patterns in lighter areas. Slightly rough edges on color blocks. Ink variation across fills — not perfectly uniform.

AVOID: Flat digital fills, perfect geometric shapes, corporate chart styling, thin/elegant typography, pure white background, gradient effects, 3D effects, clip art icons.

FORMAT: 1:1 square
```

## Good Subjects for This Style

- Daily schedules / "Day in the Life" clock diagrams
- Before/after comparisons
- Statistical breakdowns (time allocation, budget, demographics)
- Spectrum/scale visualizations
- Process flows and timelines
- Any data that tells a story


---

<!-- file: references/styles/hagreen-woodcut.md -->

# Philip Hagreen Woodcut / Catholic Distributist Illustration

Black-and-white satirical woodcut illustrations in the style of Philip Hagreen (1890-1988), artist of the Guild of St. Joseph and St. Dominic at Ditchling, Sussex. Hagreen illustrated the *Cross and the Plough* magazine (1936-1946) for the Catholic Land Movement, producing editorial woodcuts that combined social commentary with Catholic visual tradition.

## When to Use

- Illustrations for the Cross & Plough anthology ("The Last Chance")
- Catholic social teaching or distributist content
- Anti-industrial or agrarian themes
- Satirical commentary on capitalism, industrialism, or modernity
- Religious imagery in a devotional line-art tradition
- Any content connected to CLM Publishing projects

## Reference Image

**Composite of 4 cleaned Hagreen originals:**
`Cross & Plough/Anthology/Illustrations/cleaned/hagreen-style-reference-composite.jpg`

Always submit this composite as `--input` reference when generating in this style. The examples do the heavy lifting — keep prompts simple and let the visual reference guide the style.

## Visual Characteristics

**Line quality:**
- Bold, confident outlines with uniform weight — NOT scratchy or sketchy
- Clean, unbroken contour lines defining forms
- Minimal interior detail — bodies and objects are mostly outline with selective fills
- Solid black fills for clothing, hair, and shadow areas (not crosshatching)
- Flat, graphic quality — closer to linocut than pen-and-ink

**Figures:**
- Stylized, slightly rounded human forms — NOT realistic proportions
- Large heads, shortened bodies, simplified hands
- Figures often anthropomorphized animals (toads, pigs) or allegorical types (top-hat capitalist, laboring worker)
- Clothing rendered with bold black/white contrast — solid black suits, striped trousers
- Faces simplified to a few expressive lines

**Composition:**
- Single-scene satirical tableaux — one clear image, one clear point
- Figures dominate the frame with minimal or no background
- Strong horizontal or pyramidal arrangements
- Caption/title integrated below the illustration in letterpress typography
- Often includes a biblical or literary quote as part of the composition

**Themes & Motifs:**
- Industrial critique: machinery devouring nature, workers in harness, mechanical idols
- Biblical allegory: golden calves, Exodus references, Nativity scenes
- Distributist symbols: land, bread, family, craft, the Holy Family's workshop
- Animals as political metaphors: toads (gluttony), pigs (industry), calves (idolatry)

**What it is NOT:**
- NOT crosshatched or stippled (Hagreen uses solid fills, not texture)
- NOT sketchy or rough (lines are clean and deliberate)
- NOT photorealistic or anatomically precise
- NOT cluttered — compositions are spare and readable
- NOT colored — pure black on white only

## Technical Direction

```
STYLE: 1930s Catholic distributist woodcut illustration in the style of Philip Hagreen. Bold black outlines on white. Flat, graphic quality — solid black fills for clothing and shadows, no crosshatching or stippling. Clean linocut-like contours. Stylized, slightly rounded figures with simplified features.

RENDERING: Pure black ink on white paper. No gray tones, no gradients. Forms defined by bold unbroken contour lines. Shadows and dark areas are solid black fills. White areas are completely clean.

MOOD: Satirical but dignified. The humor is cerebral — visual metaphor and biblical allusion, not caricature. The overall feeling is of a serious magazine with a wry editorial eye.
```

## Example Prompt Structure

```
[Submit hagreen-style-reference-composite.jpg as --input]

Generate a new illustration in EXACTLY the style shown in this reference image — bold black outlines, flat solid fills, stylized rounded figures, clean white background. This is the Philip Hagreen woodcut style from 1930s Catholic magazines.

SUBJECT: [What to illustrate]

CAPTION: [Optional — text to appear below the illustration in serif letterpress style]

The illustration should look like it belongs alongside the four examples in the reference. Same line weight, same level of stylization, same graphic simplicity.
```

## Source Material

- Original magazine: *The Cross and the Plough* (1936-1946), organ of the Catholic Land Association of England and Wales
- Artist: Philip Hagreen (1890-1988), Guild of St. Joseph and St. Dominic, Ditchling
- Cleaned originals: `Cross & Plough/Anthology/Illustrations/cleaned/`
- Raw page scans: `Cross & Plough/Anthology/Illustrations/`
- PDFs: `Cross & Plough/Sources/PDFs/`

## Cleaning Scanned Originals

See `references/styles/line-art-cleanup.md` for the full two-step workflow:
1. PIL crop to isolate illustration from page scan
2. Gemini cleanup (whiten background, remove artifacts, preserve line work)

Batch crop script: `Cross & Plough/Anthology/Illustrations/crop_batch.py`

## Extracted Illustrations Catalog

### Cleaned Originals (8)
| Name | File | Source | Essay |
|---|---|---|---|
| Toad Eating the Cow | `hagreen-toad-cleaned_*` | Issue 35, p5 | "Industrialism at the Bar of Science" |
| As Aaron Said (Golden Calf) | `hagreen-golden-calf-cleaned_*` | Issue 39, p5 | Industrial idolatry / Part I |
| Madonna & Child | `madonna-hail-mary-cleaned_*` | Issue 45, p5 | "Towards Nazareth" / Prologue |
| Equal Opportunity For All | `hagreen-equal-opportunity-cleaned_*` | Issue 56, p6 | "Markets and Martyrs" (Rope) |
| Genesis Grape Vine Border | `genesis-grape-vine-cleaned_*` | Issue 40, p5 | Part II frontispiece |
| Standard of Living | `standard-of-living-cleaned_*` | Issue 46, p6 | Part I (Beveridge) |
| Saint with PAX Book | `saint-pax-book-cleaned_*` | Issue 37, p7 | Prologue / Epilogue |
| INDUSTRY Pig | `industry-pig-cleaned_*` | Issue 36, p5 | Part I motif |

### Novel Generations (6, Hagreen style via Gemini)
| Name | File | Essay |
|---|---|---|
| Towards Nazareth | `towards-nazareth-holy-family_*` | "Towards Nazareth" |
| Jesus the Carpenter | `jesus-the-carpenter_*` | "Jesus the Carpenter" |
| The Laxton Community | `laxton-community_*` | "The Laxton Community" |
| Behold a Great Priest | `mcnabb-great-priest_*` | "Behold a Great Priest" |
| The Birmingham Scheme | `birmingham-scheme_*` | "Prelude to Action" |
| Fragmentation of Knowledge | `fragmentation-knowledge_*` | "Fragmentation of Knowledge" |

### Batch 2 — Cleaned (10)
| Name | File | Source | Essay |
|---|---|---|---|
| Our Primary Industry | `our-primary-industry-cleaned.jpg` | Issue 34, p5 | Part I / imports (artist: Powys Evans) |
| Bureaucracy and Big Business | `bureaucracy-big-business-cleaned.jpg` | Issue 41, p4 | Part I / Beveridge |
| Goose That Laid Golden Eggs | `goose-golden-eggs-cleaned.jpg` | Issue 42, p4 | Part I / wartime |
| Satan & Co. | `satan-and-company-cleaned.jpg` | Issue 45, p3 | Part I / blackmail |
| Prayer for Fruits of Earth | `prayer-sun-moon-wheat-cleaned.jpg` | Issue 47, p7 | Interlude |
| Vocation in Work | `vocation-in-work-cleaned.jpg` | Issue 48, p4 | Part II / dignity |
| Social Security / Industrial Slavery | `social-security-industrial-slavery-cleaned.jpg` | Issue 50, p4 | Part I / Beveridge |
| Caesar's Master (Madonna) | `caesars-master-madonna-cleaned.jpg` | Issue 54, p5 | Part IV / Kenrick |
| Trying to Make Ends Meet | `trying-to-make-ends-meet-cleaned.jpg` | Issue 55, p5 | Part II / Kenrick |
| The Official Attitude | `official-attitude-cleaned.jpg` | Issue 57, p5 | Part I / critique |

### Batch 3 — Cleaned (4)
| Name | File | Source | Essay |
|---|---|---|---|
| Wings Over Home Land | `wings-over-homeland-cleaned.jpg` | Issue 37, p9 | Part I (John Hagreen) |
| Saints Peter and Paul | `saints-peter-paul-cleaned.jpg` | Issue 38, p4 | Prologue/Epilogue |
| Industrialism/Security | `industrialism-security-cleaned.jpg` | Issue 47, p3 | Part I |
| Centrifugal Force | `centrifugal-force-cleaned.jpg` | Issue 49, p7 | Part I |


---

<!-- file: references/styles/line-art-cleanup.md -->

# Line Art / Scanned Illustration Cleanup

Clean scanned line art, woodcuts, and black-and-white illustrations from magazine or book pages. Produces high-contrast black-on-white images suitable for print reproduction.

## When to Use

- Cleaning illustrations extracted from scanned PDFs or magazines
- Removing scan artifacts (yellowing, grey spots, foxing, bleed-through)
- Isolating an illustration from surrounding text on a page
- Preparing historical woodcuts or line art for modern publication

## Two-Step Workflow

### Step 1: PIL Crop (Isolate the Illustration)

Extract the page from the PDF at 300 DPI using pymupdf, then crop to just the illustration area using PIL. This is critical — sending a full page with surrounding text to Gemini causes reinterpretation rather than cleanup.

```python
import fitz  # pymupdf
from PIL import Image

# Extract page at 300 DPI
doc = fitz.open("source.pdf")
page = doc[page_number - 1]  # 0-indexed
mat = fitz.Matrix(300/72, 300/72)
pix = page.get_pixmap(matrix=mat)
pix.save("page_raw.jpg")

# Crop to illustration area
img = Image.open("page_raw.jpg")
w, h = img.size

# For two-page spread scans:
# Right side illustration: left=50%, top=5%, right=95%, bottom=70%
# Left side illustration: left=5%, top=5%, right=50%, bottom=70%
# Adjust percentages per page — view first, then crop

crop_box = (int(w * 0.50), int(h * 0.05), int(w * 0.95), int(h * 0.70))
cropped = img.crop(crop_box)
cropped.save("illustration_crop.jpg", quality=95)
```

**Key rule:** Always VIEW the extracted page first, then specify crop coordinates. Illustration positions vary per page.

### Step 2: Gemini Cleanup

Use the nano-banana image generator with `--input` flag (rework mode) to clean the cropped illustration.

```bash
source ~/.zshrc && python3 generate_image.py \
  --input illustration_crop.jpg \
  --prompt "CLEANUP PROMPT HERE" \
  --model pro \
  --aspect square
```

### Gemini Cleanup Prompt Template

```
Clean up this scanned line art illustration for print publication.

PRESERVE with absolute fidelity:
- All original line work exactly as drawn
- All text, captions, and lettering that are part of the illustration design
- The artist's original style, line weight, and composition
- All fine details in the drawing

REMOVE:
- Yellowed or grey background — make pure white
- Scan artifacts: spots, specks, dust marks
- Page bleed-through from the reverse side
- Any surrounding text that is NOT part of the illustration

DO NOT:
- Redraw, simplify, or reinterpret any part of the illustration
- Change line weights or add new lines
- Smooth out intentional texture or artistic marks
- Add shading, gradients, or grey tones that weren't in the original
- Crop the illustration differently

Output: High-contrast black line art on pure white background.
```

### Variations

**For illustrations with captions/titles (keep text):**
Add to prompt: "Keep all text/captions that appear to be part of the illustration design (titles, labels, speech bubbles, credits)."

**For illustrations extracted from colored pages:**
Add to prompt: "The original was printed on tinted paper. Convert all background areas to pure white while preserving black line work."

**For very damaged scans (heavy foxing/staining):**
Add to prompt: "This scan has significant damage. Focus on recovering the black line work — err on the side of preserving too much rather than losing fine details."

## Quality Checklist

After cleanup, verify:
- [ ] Background is pure white (no grey cast)
- [ ] All original lines are preserved (compare with scan)
- [ ] No new lines or details added by Gemini
- [ ] Text/captions legible and undistorted
- [ ] No scan artifacts remaining
- [ ] File is JPEG (Gemini outputs JPEG data even with .png extension — verify with `file` command)

## File Organization

```
Illustrations/
├── extracted/     ← Raw page extractions from PDFs (300 DPI)
├── cropped/       ← PIL crops of individual illustrations
└── cleaned/       ← Gemini-cleaned final versions
```

## Known Issues

- **Gemini may reinterpret:** If the crop includes too much surrounding text, Gemini will try to "improve" the illustration rather than clean it. Solution: tighter crop in Step 1.
- **JPEG/PNG mismatch:** Gemini saves as .png but the data is JPEG. Always verify with `file` command and rename to .jpg if needed.
- **Metadata sidecar bug:** `generate_image.py` line 262 throws an error on `image.size` but the image saves successfully. Ignore the exit code.


---

<!-- file: references/styles/minimalist-ink.md -->

# Minimalist Ink Illustration

High-contrast black and white illustrations with a hand-drawn, editorial quality. Great for portraits, still life, architectural scenes, and literary/thoughtful brand imagery.

## When to Use

- Blog headers that need sophistication without color
- Portraits or character-focused imagery
- When you want a "literary magazine" feel
- Architectural or object studies
- When color would distract from the concept

## Visual Approach

Think New Yorker illustrations, literary magazine artwork, or high-end editorial spreads. The style communicates "thoughtful" and "considered" without saying a word.

**Key characteristics:**
- Clean, high-contrast black and white
- Confident linework with visible hand-drawn quality
- Crosshatching for shading and depth
- Intentional imperfection - not vector-clean
- Strong silhouettes and clear forms

## Technical Direction

```
STYLE: Minimalist ink illustration. High-contrast black and white with hand-drawn quality. Confident linework using crosshatching for shading and texture. Think editorial illustration from a literary magazine - sophisticated but accessible.

RENDERING: Pure black ink on white paper. No gray tones except through crosshatching density. Lines should feel drawn by hand, not generated - slight variation in weight, occasional overlap.

TEXTURE: Visible pen strokes. Crosshatching should vary in density to create depth. Paper texture subtle but present.
```

## Composition Notes

- Strong focal point with clear silhouette
- Use negative space generously - white space is part of the composition
- Crosshatching concentrates in shadow areas, leaving highlights as pure white
- Frame subjects with intention - not centered unless deliberately so

## Example Prompt Structure

```
Create a minimalist ink illustration of [SUBJECT].

CONCEPT: [What are we looking at and what feeling should it evoke?]

STYLE: High-contrast black and white ink illustration. Hand-drawn quality with confident linework. Use crosshatching for shading - denser in shadows, sparse in midtones, pure white for highlights. Think literary magazine or New Yorker editorial art.

COMPOSITION: [Describe framing, focal point, use of negative space]

RENDERING: Pure black ink on white. No gray washes - all tone comes from line density. Linework should feel human - slight imperfections, natural variation in stroke weight.

AVOID: Gray tones, gradients, color of any kind, photorealistic rendering, digital-looking lines, busy backgrounds.

FORMAT: [16:9 / 1:1 / 9:16]
```

## Good Subjects for This Style

- Portraits (contemplative, not smiling)
- Hands holding objects
- Architectural details
- Still life arrangements
- Natural forms (plants, animals, landscapes)
- Objects with interesting silhouettes


---

<!-- file: references/styles/newyorker-cartoon.md -->

# New Yorker Cartoon Style Reference

Use this reference when the user asks for "New Yorker style" cartoons, single-panel editorial illustrations, or understated observational humor.

---

## Visual Style

**Line Work:**
- Simple pen-and-ink illustration - like it was sketched with a single pen
- Clean, confident lines - NOT heavily detailed or overly rendered
- Minimal to NO crosshatching - when used, very sparse and suggestive
- Organic, slightly loose linework - not rigid or digital
- NO vignette fade - clean edges that stop naturally

**CRITICAL - Keep It Simple:**
- The magic of New Yorker cartoons is restraint
- Think quick sketch, not detailed illustration
- Characters should be simple, almost schematic
- Backgrounds minimal or suggested with just a few lines
- The fewer lines, the better - every line must earn its place

**Format:**
- 1:1 square aspect ratio (ideal for social)
- Single panel only
- Plain white background - NO texture, NO cream, NO paper grain
- Pure black ink on clean white - high contrast

**Caption:**
- Italic serif font (Garamond, Times, or similar)
- Centered below illustration
- One sentence only
- Period at end (not exclamation)

---

## What Makes It Distinctly New Yorker

The New Yorker cartoon is NOT:
- Detailed illustration with lots of crosshatching
- Heavily rendered or shaded
- Cartoonish in a Pixar/animation way
- Textured or atmospheric

The New Yorker cartoon IS:
- Quick, confident pen strokes
- Almost like a napkin sketch elevated to art
- Sparse - 80% white space
- Characters that are simple but expressive
- Environments suggested with minimal lines

**Reference artists:** Roz Chast, Bruce Eric Kaplan, Liana Finck, Edward Koren

---

## Humor Elements

The New Yorker cartoon voice is:

1. **Understated** - The joke lands softly, not with a punchline
2. **Observational** - Notices absurdity in everyday life
3. **Detached irony** - Characters seem unaware of the absurdity
4. **Unexpected framing** - The caption does work the image doesn't

**What makes it funny:**
- Contrast between mundane setting and absurd detail
- Characters taking ridiculous things seriously
- Modern anxieties rendered in domestic scenes
- The reader feeling "seen" rather than laughing out loud

---

## Caption Formulas

**The Deadpan Observation:**
> "I liked learning better before we had to optimize it."

**The Overheard Conversation:**
> "He says he's not addicted - he just needs to maintain his streak."

**The Status Report:**
> "Good news - I've unlocked seventeen badges. Bad news - I still can't do long division."

**The Therapy Session:**
> "And when did you first realize the algorithm knew you better than you knew yourself?"

**The Domestic Scene:**
> "Dinner's ready, but first - have you completed your daily XP goal?"

---

## Subject Pairings That Work

| Setting | Absurd Element |
|---------|----------------|
| Parent-child homework scene | Gamification addiction |
| Office meeting | AI replacing human judgment |
| Therapy couch | Screen time / metrics anxiety |
| Kitchen table | Achievement culture run amok |
| School hallway | Algorithmic surveillance |

---

## Prompt Template

```
A New Yorker-style single panel cartoon. Simple pen-and-ink sketch, 1:1 square format.

Scene: [SETTING with CHARACTERS]

Visual detail: [THE ABSURD ELEMENT visible in the scene]

Caption in italic serif below: "[THE UNDERSTATED OBSERVATION]"

CRITICAL STYLE NOTES:
- Simple, quick pen strokes - like a confident napkin sketch
- NO detailed crosshatching - only sparse, suggestive lines if any shading
- Plain white background - NO texture, NO paper grain
- Characters should be simple and schematic, not detailed
- Minimal environment - suggest setting with just a few lines
- 80% white space - restraint is everything
- Think Roz Chast, Bruce Eric Kaplan - simple but expressive

AVOID: Heavy crosshatching, detailed rendering, textured backgrounds, cartoonish/animated style, busy compositions, too many lines.
```

---

## Examples from This Session

**Streak Addiction:**
> Scene: Living room, child on tablet, parent standing nearby
> Visual: Tablet shows "Day 47 streak!"
> Caption: "He says he's not addicted - he just needs to maintain his streak."

**Badge Collection:**
> Scene: Kitchen table, child surrounded by devices
> Visual: Screens showing various achievement badges
> Caption: "I've earned 47 badges, but I still can't do long division."

---

## When NOT to Use This Style

- Promotional thumbnails (too subtle)
- Explainer graphics (not informational)
- Anything requiring color
- Fast-scroll social formats (Instagram Stories, TikTok)

Best for: LinkedIn thought leadership, newsletter illustrations, Twitter engagement, editorial commentary.


---

<!-- file: references/styles/opened-editorial.md -->

# OpenEd Editorial Style

The default visual style for OpenEd content. Conceptual, editorial, and distinctly non-generic.

## Visual Approach

Think Every.to, The Economist covers, or smart magazine design - not illustration-heavy, not busy. Images should make the viewer pause and think.

**Two complementary directions:**

1. **Conceptual Editorial** - Visual wit with maximum 2-3 elements, unexpected juxtaposition, metaphor over literal. A compass needle pointing at a question mark. A key made of building blocks. A door opening into graph paper sky.

2. **Ink + Watercolor Illustration** - Hand-drawn editorial illustration style. New Yorker meets educational zine. Confident linework with intentional imperfection. Crosshatching for depth. Characters as thoughtful sketches, not rendered 3D figures.

## Color Palette (Strict)

Enforce these exact hex codes. No other colors.

- **Burnt Orange** `#f24915` - Primary accent, use sparingly for emphasis
- **Clear Blue** `#03a4ea` - Secondary accent
- **Near-Black** `#141a1f` - Linework and forms
- **Warm Off-White** `#fafaf6` - Background
- **Light Gray** `#e0e0e0` - Subtle tones, borders

No pastels. No rainbow palettes. No bright greens or purples.

## Texture and Materiality

- Graph paper as artistic element - not wallpaper, but integrated (emerging from an object, forming part of the composition, used as sky or ground)
- Hand-drawn quality in linework - confident but not precious
- Analog textures: pencil marks, eraser smudges, notebook edges, torn paper
- The "made by hand" feeling should be subtle, not crafty

## Composition

- Clean, uncluttered - if it feels busy, remove something
- Strong focal hierarchy - one thing dominates, other elements support
- Asymmetrical balance
- Room to breathe
- Leave text-safe zones on left or bottom third if needed for overlay

## Expressions (When Including Figures)

- Curious, contemplative, determined, or quietly confident
- No forced smiles or generic enthusiasm
- Figures should feel like thoughtful sketches, not stock photography

## Avoids (Enforce Strictly)

- Glossy, hyper-rendered AI aesthetic
- Generic "happy diverse children raising hands"
- Clipart style or corporate illustration
- Soft gradients or airbrushed effects
- Emojis or cartoonish faces
- Textbook covers or stock education imagery
- Lightbulbs, apples, graduation caps, stacks of books
- More than 3 distinct elements
- Busy compositions or quadrant layouts
- People/faces/hands (in conceptual editorial mode)
- Decorative complexity

## Format Specifications

### Thumbnail (16:9)
For blog headers, YouTube thumbnails, podcast artwork.
```
FORMAT: 16:9 landscape aspect ratio
```

### Social Square (1:1)
For Instagram feed, general social posts.
```
FORMAT: 1:1 square aspect ratio
```

### Vertical/Stories (9:16)
For Reels, TikTok, Instagram Stories.
```
FORMAT: 9:16 vertical aspect ratio
```

## Example Prompt Structure

```
Create a conceptual editorial image about [TOPIC].

CONCEPT: [One-sentence visual metaphor - what unexpected juxtaposition represents this idea?]

STYLE: Hand-drawn editorial illustration with confident ink linework. Intentional imperfection - not polished or corporate. Subtle watercolor wash for depth. Think New Yorker meets educational zine.

COMPOSITION: Asymmetrical, with [focal element] as the dominant element. Generous negative space. [Secondary element] should feel organic, not wallpapering the background.

COLOR PALETTE (strict - no other colors):
- Linework in near-black (#141a1f)
- Background warm off-white (#fafaf6)
- One accent of burnt orange (#f24915) on [specific element]
- Subtle gray tones (#e0e0e0) for depth

TEXTURE: Analog quality - visible ink texture, slight paper grain. Graph paper emerging from [location]. The hand-made feeling should be evident but not overdone.

AVOID: Glossy rendering, soft gradients, literal depictions of children or classrooms, generic education symbols (apples, lightbulbs, graduation caps), busy composition, more than 2-3 distinct elements.

FORMAT: [16:9 / 1:1 / 9:16]
```


---

<!-- file: references/styles/watercolor-line.md -->

# Watercolor + Line Art

Loose ink linework with watercolor washes. Warmer and more approachable than pure ink, but still editorial and hand-crafted. Good for emotional or narrative content.

## When to Use

- Stories with emotional resonance
- Content about growth, journey, transformation
- When you want warmth without being saccharine
- Seasonal or nature-related topics
- When pure black and white feels too stark

## Visual Approach

The line art provides structure and clarity. The watercolor adds warmth, mood, and depth. Neither dominates - they work together.

**Key characteristics:**
- Confident ink linework as the skeleton
- Watercolor washes that bleed slightly beyond the lines
- Colors pooling naturally, not perfectly contained
- Hand-painted feel - visible brushstrokes in the wash
- Imperfect edges where water met paper

## Color Application

For OpenEd brand consistency:
- **Burnt orange** watercolor wash for warmth and emphasis
- **Sky blue** wash for secondary areas, backgrounds, or contrast
- **Near-black** ink for all linework
- **Warm off-white** paper showing through
- **Light gray** wash for subtle shadows

Colors should feel like they came from a limited watercolor palette - not every hue available, just a few used with intention.

## Technical Direction

```
STYLE: Hand-drawn ink linework with loose watercolor washes. The lines are confident and slightly sketchy - not precious. Watercolor bleeds slightly beyond the linework, pooling naturally. Think illustrated children's book for adults, or editorial travel illustration.

RENDERING: Ink lines first, then watercolor laid over and around them. Colors should pool and blend where they meet. Leave some white paper showing through. Brushstrokes visible in the wash areas.

TEXTURE: Paper grain affecting how watercolor settles. Slight bleeding at edges. The "happy accidents" of real watercolor - blooms, pooling, uneven saturation.
```

## Example Prompt Structure

```
Create a watercolor and ink illustration of [SUBJECT].

CONCEPT: [What are we looking at and what mood should it convey?]

STYLE: Hand-drawn ink linework with loose watercolor washes. Confident, slightly sketchy lines provide structure. Watercolor bleeds naturally beyond the lines - not perfectly contained. Think editorial travel illustration or illustrated essay.

COMPOSITION: [Describe arrangement, focal point, balance]

COLORS: Limited palette - burnt orange and sky blue washes over near-black ink linework on warm off-white paper. Colors should pool and blend naturally. Leave some white paper breathing through.

TEXTURE: Visible brushstrokes in watercolor areas. Paper grain showing. Natural watercolor effects - slight bleeding, pooling, uneven saturation.

AVOID: Digitally perfect edges, gradients, photorealistic rendering, too many colors, overly saturated tones, busy compositions.

FORMAT: [16:9 / 1:1 / 9:16]
```

## Good Subjects for This Style

- Landscapes and environments
- Objects with emotional significance
- Seasonal scenes
- Journey or path imagery
- Natural forms (plants, weather, water)
- Cozy or domestic scenes
- Anything where warmth matters


---

<!-- file: references/styles/xkcd-editorial-comic.md -->

# XKCD-Inspired Editorial Comic Style

Generate comics in the spirit of XKCD - minimalist line art with dry, clever humor - without being a direct ripoff.

## Visual Style

- **Line art:** Simple black ink on pure white background
- **Characters:** Rounded simple figures (not pure stick figures, but close) - large circular heads, simple dot eyes, minimal features
- **Line quality:** Hand-drawn wobbly quality, variable weight, not perfectly straight
- **Color:** None. Black and white only.
- **Detail level:** Minimal. Only elements necessary for the joke. No shading, no hatching, no fills.
- **Format:** Horizontal landscape (16:9) for social, square (1:1) for Instagram

## What Makes It XKCD (Not Far Side, Not New Yorker)

| XKCD | Far Side / Existing Comic Skill |
|------|------|
| Multi-panel or diagrammatic | Single panel |
| Charts, flowcharts, graphs as humor vehicles | Scene-based |
| Dialogue in speech bubbles or labels | Caption below image |
| Nerdy/data-driven punchlines | Absurdist/dark humor |
| Minimal characters, maximum information | Character-driven |
| Dry, deadpan delivery | Setup-and-punch rhythm |

## Humor Patterns That Work

1. **The Flowchart** - Decision tree where every path leads to the same absurd conclusion. Comedy from the inevitability.
2. **The Graph** - Real data presented visually with one devastating observation. Let the numbers be the joke.
3. **The Side-by-Side** - Two scenes that should be similar but aren't. The contrast IS the punchline (e.g., career fair booths).
4. **The Label** - Ordinary scene made absurd by what the signs/labels say.
5. **The Scale** - Show the absurd difference in scale between two things (e.g., $234 vs $100,000 as physical objects).

## Prompt Template

```
XKCD-inspired editorial comic, simple minimal line art on pure white background.
[SCENE DESCRIPTION with specific text for all labels, signs, speech bubbles].
Simple black ink lines on white, hand-drawn wobbly quality, no color fills,
minimal detail, deadpan humor. Horizontal landscape format.
```

## Key Prompt Tips

- Spell out ALL text you want in the image - Gemini will try to render it
- Describe character emotions through simple visual cues (question marks, sweat drops, sunglasses for cool)
- Use props that communicate instantly (cobwebs = neglected, coffee = relaxed, briefcases = recruiters)
- Keep the text short - fewer words = better rendering accuracy
- If text comes out garbled, simplify to fewer words per element

## Proven Concepts (Feb 2026)

### College Flowchart
"SHOULD I GO TO COLLEGE?" decision tree. Paths: "What job?" → "Not sure" → "So you want to borrow $100K for...?" with options (experience, parents expect it, everyone else, find myself) all looping to absurd responses, converging on "Take out $100,000 loan anyway - MOST POPULAR PATH."

### Career Fair
Two booths side by side. Left: "COMPUTER SCIENCE - 7.5% UNEMPLOYMENT" with empty booth, cobwebs, wilting plant, confused person. Right: "ART HISTORY - 3.0% UNEMPLOYMENT" with recruiters lined up, person leaning back with sunglasses and coffee. "CLASS OF 2026" sign between them.

## OpenEd Application

Best for:
- Newsletter header images (data-driven humor)
- X/Twitter posts (high shareability, conversation starters)
- Instagram carousels (each panel = one slide)
- LinkedIn posts (professional enough, clever enough)

Pair with: Infographic data from newsletters, Rob Henderson-style data commentary, Isaac Morehouse contrarian takes.

Avoid:
- Don't use for formal brand content (website headers, ads)
- Don't copy XKCD's exact stick figure proportions - keep it inspired, not imitative
- Don't overload with text - if it needs more than 30 words total, simplify


---
Source: https://github.com/cdeistopened/content-os (MIT). Packaged by Full Production Studio.
