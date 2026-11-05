---
name: seo-content-writer
description: "Write SEO-optimized content that ranks AND reads like a human wrote it. Use this skill AFTER completing research with `seo-research` skill."
---

# SEO Content Writer

Write SEO-optimized content that ranks AND reads like a human wrote it. Use this skill AFTER completing research with `seo-research` skill.

## When to Use This Skill

Use when:
- Writing hub pages, deep-dive articles, SEO blog posts
- Refreshing declining content
- Creating content from a research brief

DO NOT use for:
- Research/planning phase (use `seo-research` first)
- OpenEd Daily/Weekly newsletters (use newsletter skills)
- Social media content (use `social-content-creation`)
- Podcast assets (use `podcast-production`)

---

## The Writing Process

```
BRIEF → DRAFT → HUMANIZE → OPTIMIZE → PUBLISH
```

1. **Brief** - Review research brief from `seo-research`
2. **Draft** - Write following content type template
3. **Humanize** - Remove AI tells, inject voice
4. **Optimize** - SEO elements, internal links
5. **Publish** - Final review and publish

---

## Phase 1: Pre-Writing Setup

### Review Research Brief

Before writing, you should have from `seo-research`:
- Primary keyword and search volume
- Secondary keywords
- Competitive analysis (what's ranking, word counts)
- Content gaps to fill
- Proprietary sources (podcast quotes, community insights)
- Internal linking opportunities
- Proposed outline

### Gather Proprietary Sources

Use NotebookLM skill to query for topic insights from podcasts and newsletters.

Check `Studio/Open Education Hub/` and `Studio/SEO Article Factory/Content Map.md` for internal linking opportunities.

---

## Phase 2: Draft by Content Type

### Pillar Guide (2500-3500 words)

```
H1: [Primary Keyword]: Complete Guide for [Audience]

Introduction (150-200 words)
- Hook with story, stat, or pain point
- Primary keyword in first 100 words
- Preview what article covers
- Establish OpenEd credibility

H2: What Is [Topic]? (300-400 words)
- Clear definition (featured snippet opportunity)
- Context and background
- Why it matters for homeschool families

H2: [Core Concept 1] (400-500 words)
- H3 subsections as needed
- Include proprietary insight or podcast quote
- 1-2 internal links

H2: [Core Concept 2] (400-500 words)
- H3 subsections as needed
- Specific examples with details
- 1-2 internal links

H2: [Core Concept 3] (400-500 words)
- H3 subsections as needed
- Practical application

H2: How to Get Started (300-400 words)
- Step-by-step guidance
- Resources and tools
- Link to OpenEd if relevant

H2: Common Challenges (200-300 words)
- Real problems families face
- Solutions from community experience

H2: FAQ (200-300 words)
- 3-5 questions from "People Also Ask"
- 40-60 word answers (featured snippet length)

Conclusion (100-150 words)
- Key takeaways
- Encouragement
- Natural CTA to OpenEd
```

### How-To Tutorial (2000-2500 words)

```
H1: How to [Achieve Outcome]: [Benefit]

Introduction (100-150 words)
- What they'll achieve
- Time estimate
- Prerequisites

H2: Why This Approach Works (200-300 words)
- Context for the method
- Why it's effective

H2: Step 1: [Action] (250-350 words)
- Clear instruction
- Tips and warnings
- Example

H2: Step 2: [Action] (250-350 words)
...

H2: Step N: [Action] (250-350 words)

H2: Tips for Success (200-300 words)
- Pro tips from experience
- Common mistakes to avoid

H2: FAQ (150-200 words)

Conclusion (100-150 words)
```

### Comparison (2000-3000 words)

```
H1: [Option A] vs [Option B]: Which Is Right for Your Family?

Introduction (150-200 words)
- The decision they're facing
- Quick verdict preview

H2: Quick Comparison (use table)
| Aspect | Option A | Option B |
|--------|----------|----------|

H2: What Is [Option A]? (300-400 words)
- Definition and philosophy
- Key characteristics
- Best for...

H2: What Is [Option B]? (300-400 words)
- Definition and philosophy
- Key characteristics
- Best for...

H2: Key Differences (400-500 words)
- H3 for each major difference
- Specific examples

H2: How to Choose (200-300 words)
- Decision framework
- Questions to ask yourself

H2: Can You Combine Them? (150-200 words)
- Hybrid approaches

H2: FAQ (150-200 words)

Conclusion (100-150 words)
- Clear recommendation by scenario
```

### Listicle (1500-2500 words)

```
H1: [Number] Best [Things] for [Audience/Goal]

Introduction (100-150 words)
- Why this list matters
- How items were selected

H2: Quick Overview (table or bullet list)
- All items at a glance

H2: 1. [Item Name] (150-250 words)
- What it is
- Why it's included
- Best for...
- Honest limitations

H2: 2. [Item Name] (150-250 words)
...

H2: How to Choose (150-200 words)
- Decision criteria

H2: FAQ (100-150 words)

Conclusion (100 words)
```

---

## Phase 3: Humanize the Draft

This is the most critical phase. AI-generated content fails in predictable ways. Fix them ruthlessly.

**For systematic quality control:** Use the `quality-loop` skill, which provides 5 judge personas with full reference files:
- Human Detector (blocking) - AI tells
- Accuracy Checker (blocking) - Factual verification
- OpenEd Voice (blocking) - Brand alignment
- Reader Advocate (blocking) - Engagement
- SEO Advisor (advisory) - Search optimization

### AI-ism Detection: Word Level

**Kill these words immediately:**

| Kill | Replace With |
|------|--------------|
| delve, dive into, dig into | explore, examine, look at |
| comprehensive, robust | thorough, complete |
| utilize | use |
| leverage (as verb) | use, apply |
| crucial, vital, essential | important, key |
| unlock, unleash, supercharge | enable, improve |
| game-changer, revolutionary | significant, notable |
| landscape, navigate | environment, work through |
| tapestry, multifaceted, myriad | varied, many, diverse |
| foster, facilitate, enhance | support, help, improve |
| realm, paradigm, synergy | area, approach, combination |
| embark, journey (for processes) | start, begin, process |
| plethora, bevy | many, several |
| nuanced, intricate, seamless | subtle, complex, smooth |
| cutting-edge | modern, current |

### AI-ism Detection: Phrase Level

**These scream "AI wrote this" - remove or rewrite:**

- "In today's fast-paced world..."
- "In today's digital age..."
- "It's important to note that..."
- "When it comes to..."
- "In order to..." → just "to"
- "Whether you're a... or a..."
- "Let's dive in" / "Let's explore"
- "Without further ado"
- "At the end of the day"
- "It goes without saying"
- "In conclusion" (especially at the end)
- "This comprehensive guide will..."
- "Are you looking for..." (fake questions)
- "Look no further"
- "The best part? ..."
- "Here's the thing..."
- "Let's be honest..."
- "And here's the kicker"
- "Enter: [thing]"
- "X changed everything"
- "This symbolizes..." / "Which reflects..."

**Forbidden Short Hook Questions:**
- "Want access?"
- "Ready to level up?"
- "Sound familiar?"
- "Curious?"

**Empty Enthusiasm (especially in conversational content):**
- "Absolutely!"
- "Great question!"
- "You're absolutely right!"

**Authenticity Theater:**
- Overusing "real" ("real strategy from real experts getting real results")
- Forced relatability ("we've all been there")

**Negation Structure:**
- "No X. No Y. Just Z."
- "No fluff. No theory. Just actionable insights."

### AI-ism Detection: Structure Level

**Patterns that reveal AI authorship:**

| Pattern | Problem | Fix |
|---------|---------|-----|
| **Triple Threat Syndrome** | AI groups everything in threes | Vary - use 2, 4, 5 items |
| **Perfect Parallelism** | Every bullet same length/structure | Mix it up |
| **Hedge Stack** | "While X, it's important to consider Y, but also Z" | Commit to a position |
| **Fake Objectivity** | "Some experts say... others believe..." | Take a stance |
| **Summary Sandwich** | Intro summarizes, body covers, conclusion summarizes again | Add new value in conclusion |
| **Empty Transitions** | "Now that we've covered X, let's move on to Y" | Cut or make meaningful |

### AI-ism Detection: Voice Level

**The hardest to fix - but most important:**

| AI Tell | Human Version |
|---------|---------------|
| **No Opinions** | Real experts have takes. State yours. |
| **No Mistakes Mentioned** | Admit what you got wrong, what's hard |
| **Generic Examples** | Use specific names, numbers, stories |
| **Distance from Subject** | Write FROM experience, not ABOUT the topic |
| **Uniform Certainty** | Hedge where uncertain, commit where sure |

### Voice Injection Techniques

**Add these to make content sound human:**

**1. Personal experience with specifics:**
> "When we talked to homeschool mom Jennifer about this, she mentioned spending two years trying curriculum after curriculum before realizing her son just needed more hands-on projects."

**2. Opinion with reasoning:**
> "Honestly, most Charlotte Mason guides overcomplicate things. The core is simpler than people make it: living books, nature study, short lessons. That's it."

**3. Admission of limitations:**
> "This approach won't work for every family. If your kids thrive with structure and workbooks, Charlotte Mason's open-ended nature might frustrate everyone."

**4. Specific examples from real sources:**
> "As homeschool dad Mike Goldstein told us on the OpenEd podcast, 'The best curriculum is the one you'll actually use consistently.'"

**5. Uncertainty where honest:**
> "We're not 100% sure why nature study works so well for retention. Best guess: the multisensory experience creates stronger memory encoding. But we've seen it work across dozens of families."

**6. Tangents and asides:**
> "This is the part where most guides tell you to 'trust the process.' (Useless advice.) Here's what that actually means in practice..."

### Rhythm Variation

AI writes in monotonous rhythm. Fix it:

- **Vary sentence length.** Short punch. Then longer explanatory sentences that build out the context and nuance.
- **Use fragments.** For emphasis. Or drama.
- **Start with "And" or "But"** when natural.
- **Include parenthetical asides** (the kind you'd say to a friend).
- **Ask questions.** Then answer them. Or don't.
- **One-word paragraphs.**

Really.

### The Detection Checklist

Before moving on, verify:

- [ ] No AI words (delve, comprehensive, crucial, leverage, landscape)
- [ ] No AI phrases (in today's world, it's important to note, let's dive in)
- [ ] Not everything in threes
- [ ] At least one personal opinion stated directly
- [ ] At least one specific number from real experience
- [ ] At least one admission of limitation or uncertainty
- [ ] Sentence lengths vary (some under 5 words, some over 20)
- [ ] Would I say this out loud to a smart friend?
- [ ] Does it sound like a specific person, or a committee?

### The Read-Aloud Test

Read your draft out loud. If you stumble, readers will too. If it sounds like a textbook, rewrite it. If you'd be embarrassed to read it to a colleague, it's not ready.

---

## Phase 4: Optimize for SEO

### Keyword Placement Checklist

- [ ] Primary keyword in H1
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in 2-3 H2 headings (variations OK)
- [ ] Primary keyword in meta title
- [ ] Primary keyword in meta description
- [ ] Keyword density: 1-2% (roughly 1 mention per 100-200 words)

### Internal Linking (3-5+ minimum)

Check `Studio/Open Education Hub/` and `Studio/SEO Article Factory/Content Map.md` for related content.

**Linking priorities:**
1. Blog posts (highest value)
2. Podcast episodes
3. Hub pages

**Anchor text rules:**
- Use descriptive text, not "click here"
- Include keywords naturally
- Vary anchor text across links

### External Linking (2-3 minimum)

- Link to authoritative sources (.edu, .gov, established publications)
- Support claims with data sources
- Link to tools or resources mentioned

### Meta Elements

**Meta Title (50-60 characters):**
- Include primary keyword
- Make it compelling, not just keyword-stuffed
- Example: "Charlotte Mason Homeschool: A Complete Guide for Beginners"

**Meta Description (150-160 characters):**
- Include primary keyword
- Clear value proposition
- Include soft CTA
- Example: "Learn how Charlotte Mason's philosophy of living books, nature study, and short lessons can transform your homeschool. Practical guide with real family examples."

### Featured Snippet Optimization

**For definition snippets:**
- Put definition in first paragraph of relevant section
- Format: "[Topic] is [definition in 40-50 words]"

**For list snippets:**
- Use H2 for the question
- Follow immediately with numbered/bulleted list
- Keep items concise (one line each)

**For FAQ snippets:**
- H3 for each question (exact question format)
- Answer in 40-60 words
- Direct, complete answer first

---

## Phase 5: Final Review

### SEO Checklist

**Keyword Optimization:**
- [ ] Primary keyword in H1
- [ ] Primary keyword in first 100 words
- [ ] Primary keyword in 2-3 H2 headings
- [ ] Primary keyword in meta title and description
- [ ] Keyword density: 1-2%

**Internal Linking:**
- [ ] 3-5+ internal links to related OpenEd content
- [ ] Anchor text includes keywords naturally
- [ ] Links placed contextually

**External Linking:**
- [ ] 2-3+ links to authoritative sources
- [ ] Links support claims

**Meta Elements:**
- [ ] Meta title: 50-60 characters
- [ ] Meta description: 150-160 characters
- [ ] Both include primary keyword

**Content Quality:**
- [ ] No AI-isms (see kill lists above)
- [ ] Uses regular hyphens for breaks - like this - not em dashes
- [ ] Includes proprietary insights (podcast quotes, community stories)
- [ ] Natural, conversational voice
- [ ] Readability: 8th-10th grade level

**Structure:**
- [ ] Clear H1 > H2 > H3 hierarchy
- [ ] Sections are 300-500 words each
- [ ] FAQ section for featured snippets
- [ ] CTA at end

### Humanity Checklist

- [ ] At least 3 specific examples with names/numbers
- [ ] At least 1 opinion stated directly
- [ ] At least 1 limitation acknowledged
- [ ] Sentence lengths vary
- [ ] Passes read-aloud test
- [ ] Sounds like a person, not a committee

---

## Reference: E-E-A-T Examples

Study these writers for voice and quality benchmarks:

**Marketing/Business:**
- Paul Graham (essays)
- Wait But Why
- Stratechery (Ben Thompson)
- James Clear
- Backlinko (Brian Dean)
- Lenny's Newsletter
- Derek Sivers

**Finance/Economics:**
- Matt Levine (Money Stuff)
- Morgan Housel (Psychology of Money)

**Technical/Education:**
- Julia Evans (technical writing)
- Dan Luu
- First Round Review

**Healthcare/Science:**
- Dr. Peter Attia
- Dr. Siddhartha Mukherjee

The goal: content that reads like these writers - not like AI trained on generic web content.

---

## Before/After Examples

### Generic → Specific

**Before:**
> "Many homeschool families find Charlotte Mason's approach helpful for developing a love of learning."

**After:**
> "When Sarah started homeschooling her three kids in 2021, she burned through four different curricula in the first year. Nothing stuck. Then she discovered Charlotte Mason's approach - specifically, the idea of 'short lessons' (15-20 minutes max per subject). Her 8-year-old, who used to melt down during 45-minute math blocks, now finishes his work before lunch and asks for more."

### Robotic → Human

**Before:**
> "It's important to note that when it comes to nature study, consistency is crucial. Furthermore, the benefits of outdoor learning are well-documented. Additionally, children who engage regularly with nature demonstrate improved focus and creativity."

**After:**
> "Here's what nobody tells you about nature study: it feels weird at first. You're standing in your backyard, staring at a tree, wondering if this is actually 'educational.' Then your kid notices the woodpecker holes. Then they want to know what made them. Then you're both Googling pileated woodpeckers at the kitchen table. That's when you realize - this is working."

### Vague → Actionable

**Before:**
> "Consider incorporating living books into your curriculum for a more engaging educational experience."

**After:**
> "Replace one textbook this week. Just one. Instead of that dry science textbook about ecosystems, try 'The Burgess Bird Book for Children' (free on Project Gutenberg). Read one chapter together. Watch what happens when your kid starts noticing the birds in your yard and can name them."

---

## Common Pitfalls

1. **Keyword Stuffing** - Use variations and synonyms
2. **Generic Content** - Every article needs proprietary OpenEd insights
3. **Weak Internal Linking** - Link to specific pages, not just homepage
4. **Boring Meta Descriptions** - This is your SERP sales pitch
5. **Ignoring Search Intent** - Match content to what searchers want
6. **No CTA** - Guide readers toward OpenEd
7. **AI Voice Leakage** - Check kill lists carefully
8. **No Specifics** - Add names, numbers, concrete examples
9. **No Opinion** - Take a stance, don't hedge everything

---

## After Publishing

1. Update `Studio/SEO Article Factory/Content Map.md` with status
2. Add internal links from related existing content
3. Monitor rankings in 2 weeks
4. Check GA4 for traffic trends after 30 days


---

<!-- file: references/seo-checklist.md -->

# SEO Content Optimization Checklist

Quick reference for optimizing OpenEd hub pages and blog content before publishing.

## Keyword Optimization

### Primary Keyword Placement
- [ ] In H1 (exact match or close variation)
- [ ] In first 100 words of article
- [ ] In 2-3 H2 headings (use variations, not exact repetition)
- [ ] In meta title
- [ ] In meta description
- [ ] In URL slug (if possible)
- [ ] Density: 1-2% throughout article

### Secondary Keywords
- [ ] 3-5 secondary keywords identified
- [ ] Distributed naturally throughout article
- [ ] 0.5-1% density each
- [ ] Used in H2/H3 subheadings where relevant

### Keyword Quality Check
- [ ] Keywords used in context, not forced
- [ ] Natural synonyms and variations included
- [ ] Semantic keywords related to topic included
- [ ] No keyword stuffing (reads naturally when spoken aloud)

## Content Structure

### Headers
- [ ] Single H1 with primary keyword
- [ ] 4-7 H2 sections with keyword variations
- [ ] H3 subheadings break up long sections
- [ ] Logical hierarchy (H1 > H2 > H3)
- [ ] Headers preview section content

### Introduction
- [ ] 150-200 words
- [ ] Primary keyword in first 100 words
- [ ] Hook that captures attention (scenario, stat, pain point)
- [ ] Preview what article will cover
- [ ] Establishes credibility/authority

### Body Sections
- [ ] Each H2 section is 300-500 words
- [ ] Sections flow logically
- [ ] Transitions between sections are smooth
- [ ] Proprietary insights in each major section
- [ ] No section exceeds 600 words without subheadings

### FAQ Section
- [ ] 3-5 common questions included
- [ ] Each question is H3
- [ ] Answers are 40-60 words (featured snippet length)
- [ ] Questions target question-based keywords
- [ ] Answers are direct and actionable

### Call-to-Action
- [ ] CTA at end of article (required)
- [ ] Mid-article CTA for 2500+ word content
- [ ] Links to OpenEd info session or relevant feature
- [ ] Natural integration, not salesy
- [ ] Clear value proposition for clicking

## Internal Linking

### Link Quantity
- [ ] 3-5+ internal links minimum
- [ ] More for longer content (1 per 500 words is good target)
- [ ] Links distributed throughout article, not clustered

### Link Quality
- [ ] Sourced from `blog-index.csv`
- [ ] Links are contextually relevant
- [ ] Anchor text includes keywords naturally
- [ ] Links to hub pages and cornerstone content prioritized
- [ ] Mix of related topics (pedagogy links, practical guides, resources)

### Link Placement
- [ ] Links placed in first half of article when possible
- [ ] Links support the point being made
- [ ] No "click here" or generic anchor text
- [ ] Links add value (not just for SEO)

## External Linking

### Authority Links
- [ ] 2-3+ external links to authoritative sources
- [ ] Prefer .edu, .gov, established publications
- [ ] Links support claims and add credibility
- [ ] Links open in new tab (if applicable in CMS)

### Link Relevance
- [ ] External links directly support article content
- [ ] Links are current (not outdated resources)
- [ ] No broken links
- [ ] Links add value beyond what OpenEd content provides

## Meta Elements

### Meta Title
- [ ] 50-60 characters total
- [ ] Includes primary keyword
- [ ] Compelling and clickable
- [ ] Not just keyword-stuffed
- [ ] Accurately represents article content

### Meta Description
- [ ] 150-160 characters total
- [ ] Includes primary keyword
- [ ] Includes value proposition or hook
- [ ] Compelling call to action or benefit
- [ ] Not duplicated from other articles

### URL Slug
- [ ] Includes primary keyword if possible
- [ ] Short and descriptive
- [ ] Uses hyphens, not underscores
- [ ] No unnecessary words (remove "the", "a", "an")

## Content Quality

### OpenEd Voice
- [ ] No AI-isms (see CLAUDE.md forbidden list)
- [ ] Regular hyphens for breaks - like this - not em dashes
- [ ] Natural, conversational tone
- [ ] Sounds like a real person wrote it
- [ ] Confident but not preachy

### Proprietary Insights
- [ ] Includes podcast transcript quotes or insights
- [ ] References Slack #recommendations or community stories
- [ ] Real parent experiences or examples
- [ ] Not generic web advice anyone could write
- [ ] OpenEd perspective or unique angle present

### Accuracy
- [ ] OpenEd features mentioned are accurate (check features.md)
- [ ] Facts and statistics are sourced
- [ ] Claims are supported with evidence
- [ ] No outdated information

### Formatting
- [ ] Paragraphs are 3-5 sentences max
- [ ] No walls of text
- [ ] Bullet points used sparingly (when list format truly fits)
- [ ] Bold/italics used rarely and purposefully
- [ ] Scannable structure

## Readability

### Target Metrics
- [ ] Flesch-Kincaid grade level: 8-10
- [ ] Flesch Reading Ease: 60-70
- [ ] Average sentence length: 15-20 words
- [ ] No sentences longer than 30 words

### Sentence Structure
- [ ] Varied sentence length (mix of short and medium)
- [ ] Active voice preferred
- [ ] No run-on sentences
- [ ] Complex ideas broken into digestible chunks

### Word Choice
- [ ] Jargon defined or avoided
- [ ] Concrete language over abstract
- [ ] Simple words where possible (without dumbing down)
- [ ] No corporate buzzwords

## Technical SEO

### Image Optimization (if applicable)
- [ ] Alt text includes relevant keywords
- [ ] File names are descriptive
- [ ] Images compressed for fast loading
- [ ] Images add value to content

### Content Length
- [ ] Meets target word count for competition level
- [ ] Hub pages: 2500-3500+ words
- [ ] Deep dives: 2000-2500 words
- [ ] Standard posts: 1500-2000 words

### Mobile Optimization
- [ ] Short paragraphs (mobile-friendly)
- [ ] Subheadings frequently for skimming
- [ ] No overly wide tables or images

## Pre-Publish Tools

### Run Python Analysis
- [ ] Keyword density check (should be 1-2% for primary)
- [ ] Readability score (grade level 8-10 target)
- [ ] Content scrubber (removes AI watermarks and em dashes)

### Manual Review
- [ ] Read article aloud - does it sound natural?
- [ ] Click all internal links - do they work and add value?
- [ ] Click all external links - are they current and relevant?
- [ ] Check meta elements are filled in CMS
- [ ] Verify article delivers on H1/intro promise

## Post-Publish

### Tracking
- [ ] Article URL added to blog-index.csv
- [ ] Primary keyword and publish date logged
- [ ] Set calendar reminder to check rankings in 2 weeks

### Promotion
- [ ] Article shared in relevant OpenEd channels
- [ ] Consider repurposing into Daily newsletter segment
- [ ] Link from related hub pages if applicable

---

## Quick Reference: SEO Targets

| Element | Target |
|---------|--------|
| Primary keyword density | 1-2% |
| Secondary keyword density | 0.5-1% each |
| Word count (hub page) | 2500-3500+ |
| Word count (deep dive) | 2000-2500 |
| Word count (standard post) | 1500-2000 |
| Meta title length | 50-60 characters |
| Meta description length | 150-160 characters |
| Internal links | 3-5+ minimum |
| External links | 2-3+ minimum |
| Flesch-Kincaid grade | 8-10 |
| Flesch Reading Ease | 60-70 |
| Avg sentence length | 15-20 words |
| FAQ answers | 40-60 words each |
| Intro length | 150-200 words |

## Common Mistakes

1. **Keyword stuffing**: If you're forcing the keyword in, you've gone too far
2. **Weak hook**: First paragraph must grab attention immediately
3. **Generic content**: Every article needs proprietary OpenEd insights
4. **Poor internal linking**: Link to hub pages and cornerstone content, not just homepage
5. **Boring meta description**: This is your search result sales pitch
6. **Ignoring search intent**: Match content to what searchers actually want
7. **No CTA**: Every article should guide readers toward OpenEd
8. **AI voice**: Run scrubber and manually check for forbidden phrases
9. **Too academic**: 8th-10th grade reading level, not college dissertation
10. **No FAQ section**: Missing easy featured snippet opportunity


---
Source: https://github.com/cdeistopened/content-os (MIT). Packaged by Full Production Studio.
