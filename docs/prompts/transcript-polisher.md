---
name: transcript-polisher
description: Transform raw podcast transcripts into polished, readable documents. This skill removes filler words, fixes grammar, adds structure, and preserves authentic voice. Use when processing podcast transcripts, interview recordings, video captions, or any spoken content that needs cleanup while maintaining 100% fidelity to meaning.
---

# Transcript Polisher

Transform raw podcast or interview transcripts into polished, professional documents that maintain authentic voice while dramatically improving readability.

## Purpose

Raw transcripts from automated services are often unreadable - filled with filler words, incomplete sentences, and poor formatting. This skill cleans them up while preserving what was actually said.

**Core Philosophy:** Balance authenticity with clarity. Remove everything that doesn't add meaning while preserving what was actually said. Create the "ideal version" of what the speaker wanted to communicate - without changing their words or ideas.

**Target:** 25-35% length reduction while maintaining 100% fidelity to meaning.

## When to Use This Skill

- Processing raw transcripts from Rev, Otter, Descript, YouTube auto-captions
- Cleaning up interview recordings or video transcripts
- Preparing spoken content for publication as articles or show notes
- Converting conversational content into readable written format

**Not for:** Written content that wasn't originally spoken, pre-polished articles, or scripts that are already edited.

---

## Workflow

### Step 1: Add Document Structure

Create proper header with:

```markdown
# [Guest Name]: [Compelling Episode Title]

*[Podcast Name] Episode - [Host Names]*

---

## Timestamped Outline
[Add 10 chapters maximum - see guidelines below]

---

## [Time] Chapter Title
[Content starts here]
```

**Timestamped Outline Rules:**
- Format: `**MM:SS** - Descriptive Chapter Title`
- 10 chapters maximum for 45-60 minute episodes
- Focus on major topic changes, not minute-by-minute
- Use compelling, specific titles (not generic descriptions)

**Good Examples:**
- ✅ **12:25** - The Turnaround: From Struggling to Thriving
- ✅ **29:08** - Why Successful Strategies Don't Spread

**Poor Examples:**
- ❌ **12:25** - Guest talks about their experience
- ❌ **29:08** - Discussion about the industry

### Step 2: Identify and Label Speakers

Replace generic speaker markers (>>, Speaker 1, etc.) with actual names:
- **Bold all speaker names**: `**Isaac:** Content here`
- Use first names for casual podcasts, full names for professional interviews
- Be consistent throughout

### Step 3: Aggressive Editing Pass

Apply aggressive polishing while maintaining 100% fidelity.

**Remove ALL filler words:**
- "um," "uh," "ah," "er," "hmm"
- "you know," "I mean," "like" (when used as filler)
- "so," "well," "basically," "literally" (when empty)
- "kind of," "sort of" (when hedging unnecessarily)

**Consolidate restarts:**
- ❌ "I think that... well, what I think is... the main thing is..."
- ✅ "The main thing is..."

**Pick the clearest version when speakers repeat:**
- If they say the same thing 3 ways, keep only the best one
- Combine fragments into complete thoughts

**Fix awkward grammar:**
- Complete sentence fragments
- Fix subject-verb agreement
- Repair run-on sentences

**Keep only the strongest examples:**
- If speaker gives 5+ examples, keep 1-2 best ones
- Remove redundant illustrations of the same point

**Add clarity to vague pronouns:**
- Use minimal bracketed additions: "they [the teachers] decided..."
- Only when meaning would be unclear otherwise

### Step 4: Preserve What Matters

**Never edit:**
- Unique voice and natural rhythm
- Exact wording of powerful statements
- Emotional moments and authenticity
- Specialized terminology
- Cultural references that reveal personality
- Natural dialogue patterns
- Humor and personality
- Memorable phrases

**The 100% Fidelity Rule:**
- ❌ Never paraphrase or change meaning
- ❌ Never add ideas not present in original
- ❌ Never remove key insights or stories
- ✅ Only remove redundancy and inefficiency
- ✅ Preserve exact wording of powerful statements
- ✅ Keep all substantive content

### Step 5: Quality Check

Before finishing:
- [ ] Length reduced by 25-35%
- [ ] All filler words removed
- [ ] Speakers properly identified and bolded
- [ ] Chapter breaks added with compelling titles
- [ ] Grammar fixed but voice preserved
- [ ] Key insights and stories intact
- [ ] No meaning changed or paraphrased
- [ ] Reads naturally when spoken aloud

---

## Editing Guidelines

### What TO Edit (Aggressively)

**1. Filler Words**
Remove ALL instances unless part of signature style:
- um, uh, ah, er, hmm
- you know, I mean, like
- so, well, basically, literally, actually
- kind of, sort of, I think, probably, maybe

**2. False Starts and Restarts**
```
Before: "I think that... well, what I was trying to say is... the main thing is that we need to focus"
After: "The main thing is that we need to focus"
```

**3. Redundant Explanations**
When the same point is made multiple ways, keep only the clearest version.

**4. Verbal Hedging (when excessive)**
```
Before: "I think it's probably maybe kind of important to sort of consider..."
After: "It's important to consider..."
```

**5. Conversational Detours**
Remove tangents that don't serve the narrative or provide insight.

**6. Grammar Issues**
- Incomplete sentences → complete
- Subject-verb disagreement → fix
- Run-on sentences → break up

**7. Excessive Examples**
If 5+ examples are given for one point, keep 1-2 strongest.

**8. Vague Pronouns (minimal intervention)**
Only add bracketed clarity when meaning is genuinely unclear:
```
"They [the board members] decided to..."
```

### What NOT to Edit

**1. Unique Voice and Natural Rhythm**
Keep the speaker's distinctive patterns, even if informal.

**2. Powerful Statements**
Preserve exact wording of quotable moments.

**3. Emotional Moments**
Don't sanitize authentic expressions:
- ✅ Keep: "That bugged the crap out of me"
- ❌ Don't change to: "That bothered me significantly"

**4. Specialized Terminology**
Keep industry/domain-specific language even if uncommon.

**5. Cultural References**
Preserve references that reveal personality and context.

**6. Natural Dialogue Patterns**
Keep the back-and-forth feel of conversation.

---

## Common Transcription Errors to Fix

### Auto-Caption Issues
- OCR errors (e.g., "quad code" → "Claude Code")
- Homophone mistakes ("their" vs "there")
- Missing punctuation
- Run-on sentences
- Mis-identified technical terms

### Audio Transcription Issues
- Speaker confusion
- Overlapping dialogue
- Background noise artifacts
- Timestamp errors

---

## Output Format

Final polished transcript should be:
- Markdown formatted
- Properly sectioned with timestamps
- Speaker names bold and consistent
- 25-35% shorter than original
- Grammar perfect but voice authentic
- Ready for publication or repurposing

---

## Before/After Examples

### Example 1: Filler Removal

**Before:**
> "So, um, I think that, you know, what we really need to focus on is, like, the fact that, you know, students are, um, actually learning better when, you know, they have more autonomy."

**After:**
> "Students learn better when they have more autonomy."

(15 words → 8 words = 47% reduction)

### Example 2: Consolidating Restarts

**Before:**
> "The thing about... what I'm trying to say is... the main point here is that we need to rethink how we approach this. We need to rethink our approach. What I mean is, the whole system needs to be reconsidered."

**After:**
> "The whole system needs to be reconsidered."

(Kept only the clearest expression of the idea)

### Example 3: Voice Preservation

**Before:**
> "Look, this bugged the crap out of me for years. Nobody wanted to talk about it. Like, everyone knew, but nobody would say anything."

**After:**
> "Look, this bugged the crap out of me for years. Nobody wanted to talk about it. Everyone knew, but nobody would say anything."

(Only removed the filler "like" - preserved the authentic voice and expression)

---

## Bundled Resources

- `references/editing-guidelines.md` - Detailed editing rules with examples
- `references/structure-template.md` - Header format and chapter guidelines

---

## Related Skills

- **anti-ai-writing** - Further humanize and polish the output
- **social-content-creation** - Repurpose transcript insights to social posts
- **hook-and-headline-writing** - Create compelling chapter titles

---

*Remember: 100% fidelity to meaning, 25-35% reduction in length. Remove what doesn't add meaning. Preserve what makes it authentic.*


---

<!-- file: references/editing-guidelines.md -->

# Editing Guidelines for Transcript Polishing

## Aggressive Polishing Strategy

**Target Reduction**: 25-35% of original length while maintaining 100% fidelity to meaning.

## What TO Edit (Aggressively)

### 1. Filler Words

Remove ALL instances unless part of signature style or specific emphasis:
- "um," "uh," "you know," "like," "so," "well," "I mean," "you know what I mean"

**Before**: "So, um, I think that, you know, what we really need to, uh, focus on is, like, making sure that kids are, you know, getting what they need."

**After**: "What we really need to focus on is making sure that kids are getting what they need."

### 2. False Starts & Restarts

Consolidate aggressively to the final, clearest version:

**Before**: "The thing is, well, what I mean is, the problem with education today is that we're not, I mean, the real issue is standardization."

**After**: "The real issue with education today is standardization."

### 3. Redundant Explanations

If the speaker says the same thing multiple ways, pick the clearest version:

**Before**: "It was really big. Like, it was huge. I mean, it was massive. The impact was enormous."

**After**: "The impact was enormous."

### 4. Verbal Hedging

Remove unnecessary qualifiers when used excessively (keep when they add nuance):

Remove: "kind of," "sort of," "a little bit," "I think," "probably," "maybe"

**Before**: "I think we kind of need to probably focus more on this"

**After**: "We need to focus more on this"

### 5. Conversational Detours

Cut tangents that don't serve the main narrative:

**Before (120 words)**: "When I said I was going to join Teach for America—and my mom, she went to college herself, she's really into education, but she had different ideas about what I should do—as an example, when I told her, my mother was like, fricking, not, you're not going to go teach. We didn't send you to an Ivy League college—which was Brown, by the way, I went to Brown—to go teach in some public school. She had all these expectations about what I should be doing with my degree."

**After (35 words)**: "When I said I was going to join Teach for America, my mother was like, 'You're not going to go teach. We didn't send you to an Ivy League college to go teach public school.'"

### 6. Awkward Grammar

Fix:
- Subject-verb disagreement
- Run-on sentences
- Incomplete thoughts
- Unclear pronoun references

### 7. Repetitive Examples

If speaker gives 5 examples of the same point, keep the 1-2 strongest.

### 8. Unclear References

Add minimal clarity to pronouns and vague references:

**Before**: "And then he told them that it was important."

**After**: "And then [the principal] told them that it was important."

Use brackets sparingly—only when essential for clarity.

## What NOT TO Edit

### 1. Unique Voice

Preserve the speaker's natural rhythm and style.

**Keep**: "That really bugged the crap out of me. I wanted to do something that was going to fix that."

Don't sanitize authentic expressions that show personality.

### 2. Key Quotes

Maintain exact wording of powerful statements and memorable phrases.

### 3. Emotional Moments

Keep authentic vulnerability and passion—these are often the most compelling parts.

### 4. Specialized Language

Retain industry-specific terminology and technical language.

### 5. Cultural References

Preserve personality-revealing details and references.

### 6. Conversational Flow

Maintain natural dialogue patterns and back-and-forth exchanges.

## Aggressive vs. Moderate Polishing Examples

### Example 1: Filler Removal

**Raw (63 words)**:
"So, um, I think that, you know, what we really need to, uh, focus on is, like, making sure that kids are, you know, getting what they need. And I mean, it's really important that we, like, pay attention to, um, you know, their individual needs and stuff. Because, like, every kid is different, right?"

**Moderate Polish (42 words)**:
"I think what we really need to focus on is making sure that kids are getting what they need. And it's really important that we pay attention to their individual needs. Because every kid is different."

**Aggressive Polish (20 words)**:
"We need to focus on making sure kids get what they need. We must pay attention to their individual needs because every kid is different."

### Example 2: Consolidating Redundancy

**Raw (87 words)**:
"I was really frustrated. Like, I was super annoyed. I mean, it really bothered me. It bugged the crap out of me, you know? And I wanted to do something about it. I wanted to fix it. I mean, I really felt like I needed to change this situation. So I decided I was going to, you know, take action and do something that would address this problem."

**Moderate Polish (48 words)**:
"I was really frustrated. It bugged the crap out of me. And I wanted to do something about it. I wanted to fix it. I felt like I needed to change this situation. So I decided I was going to take action."

**Aggressive Polish (16 words)**:
"That really bugged the crap out of me. I wanted to do something that was going to fix that."

## Length Reduction Strategies

To achieve 25-35% reduction:

1. Remove ALL filler words (not just excessive ones)
2. Consolidate every redundant explanation to single clearest statement
3. Combine similar points made at different times into one place
4. Eliminate ALL tangents that don't serve main narrative
5. Condense verbose examples to their essential core
6. Remove verbal hedging aggressively
7. Tighten sentence structure while preserving voice

## Always Maintain (100% Fidelity)

Even with aggressive editing, always preserve:
- All major insights and takeaways
- Compelling stories and anecdotes (told more concisely)
- Emotional peaks and revelations
- Practical advice and frameworks
- Speaker's authentic voice and personality
- The actual words used (never paraphrase or change meaning)

## Quality Check Questions

Before finalizing:
1. Did I reduce length by 25-35%?
2. Are all filler words removed?
3. Did I preserve the speaker's unique voice?
4. Are key insights and stories intact?
5. Did I change any meanings or add ideas not in the original?
6. Would the speaker recognize and approve this as what they said?

If you answer "no" to #3-6, revise before completing.


---

<!-- file: references/README.md -->

# Transcript Polisher References

Detailed guidelines and templates for polishing podcast and interview transcripts.

## Available References

### [editing-guidelines.md](editing-guidelines.md)
Complete editing rules with before/after transformation examples.

**When to use:** When you need detailed guidance on what to edit aggressively vs. what to preserve, with concrete examples showing the polishing process.

**Contains:**
- 8 categories of aggressive editing (filler words, false starts, redundancy, etc.)
- 6 categories of what NOT to edit (voice, key quotes, emotional moments, etc.)
- Before/after examples at different polishing levels
- Length reduction strategies
- Quality check questions

### [structure-template.md](structure-template.md)
Document structure templates and formatting guidelines.

**When to use:** When setting up the header, timestamped outline, and chapter structure for a polished transcript.

**Contains:**
- Standard podcast transcript header template
- Chapter title guidelines (My First Million style)
- Good vs. poor chapter title examples
- Speaker name formatting rules
- Alternative formats (interview, panel discussion)
- Section break and formatting conventions

## Quick Start

1. Read SKILL.md in parent directory for workflow overview
2. Use structure-template.md to set up document structure
3. Refer to editing-guidelines.md during the editing pass
4. Check quality guidelines before finalizing

## Progressive Disclosure

These reference files are designed to be loaded **as needed** during the polishing process. You don't need to read everything at once—the main SKILL.md provides the essential workflow, and these references offer deeper detail when required.


---

<!-- file: references/structure-template.md -->

# Document Structure Templates

## Standard Podcast Transcript Header

```markdown
# [Guest Name]: [Compelling Episode Title]

*[Podcast Name] Episode - [Host Names]*

---

## Timestamped Outline

**00:00** - [Compelling Chapter Title]
**08:15** - [Compelling Chapter Title]
**15:30** - [Compelling Chapter Title]
**24:45** - [Compelling Chapter Title]
**32:10** - [Compelling Chapter Title]
**41:20** - [Compelling Chapter Title]
**52:35** - [Compelling Chapter Title]
**1:04:50** - [Compelling Chapter Title]
**1:16:25** - [Compelling Chapter Title]
**1:28:15** - [Compelling Chapter Title]

---

## 00:00 [First Chapter Title]

**[Speaker Name]:** Content starts here...

**[Speaker Name]:** Response...

---

## 08:15 [Second Chapter Title]

**[Speaker Name]:** Content continues...
```

## Chapter Title Guidelines

### My First Million Style Rules

**Format**: `**MM:SS** - Descriptive Chapter Title`

**Length**: 10 chapters maximum for 45-60 minute episodes
- Focus on major topic changes
- Not minute-by-minute granularity
- Each chapter should represent a distinct section

**Characteristics of Good Titles**:
- Specific, not generic
- Action-oriented when possible
- Highlight transformation or insight
- Intrigue the reader
- Reference key names or concepts

### Good Chapter Title Examples

✅ **12:25** - The 13th Percentile to Grade Level Miracle
✅ **29:08** - Why Successful Reforms Don't Spread
✅ **32:48** - From Curmudgeon to Optimist: Entering Venture Capital
✅ **00:00** - The Accidental Paradigm Shift: How Claude Code Eliminated the Text Editor
✅ **15:30** - Ant-Fooding: Building for Yourself First
✅ **41:20** - Sub-Agents and Swarm Intelligence at Scale
✅ **1:04:50** - From CLI to Agent SDK: Beyond Coding Use Cases

### Poor Chapter Title Examples

❌ **12:25** - Michelle talks about her students
*Too generic and vague*

❌ **29:08** - Discussion about education reform
*Not specific or compelling*

❌ **32:48** - Career transition
*Too brief and uninteresting*

❌ **00:00** - Introduction
*Obvious and uninformative*

❌ **15:30** - Building products
*Lacks specificity*

## Speaker Name Formatting

### Consistency Rules

1. **Bold all speaker names**: `**Name:** Content`
2. Choose one format and stick with it throughout:
   - First names only (casual): `**Dan:** ...`, `**Cat:** ...`, `**Boris:** ...`
   - Full names (professional): `**Daniel Shipper:** ...`, `**Catherine Salgado:** ...`
   - First name + Last initial: `**Dan S.:** ...`, `**Cat S.:** ...`

3. For podcasts with 2-3 regular speakers, first names work best
4. For interviews or formal content, full names may be more appropriate
5. Never switch formats mid-transcript

### Host vs Guest Formatting

**Option 1: Same format for all**
```markdown
**Dan:** Question here?
**Boris:** Answer here.
```

**Option 2: Differentiate roles** (only when helpful)
```markdown
**Host (Dan):** Question here?
**Guest (Boris):** Answer here.
```

Use Option 1 for most cases. Use Option 2 only for:
- Panel discussions with many speakers
- Multi-host formats
- When speaker roles need clarification

## Alternative Formats

### Interview Format

For one-on-one interviews where context flows better without timestamps:

```markdown
# [Guest Name]: [Compelling Title]

*Interview with [Host Name]*

---

**[Host]:** Opening question...

**[Guest]:** Response...

**[Host]:** Follow-up...

**[Guest]:** Extended answer...
```

### Panel Discussion Format

For multiple guests:

```markdown
# [Topic]: [Panel Title]

*Panel Discussion - [Event Name]*

**Panelists:**
- [Name 1] - [Role/Company]
- [Name 2] - [Role/Company]
- [Name 3] - [Role/Company]

**Moderator:** [Name]

---

## Opening Remarks

**Moderator:** Welcome remarks...

**[Panelist 1]:** Response...

**[Panelist 2]:** Alternative view...
```

## Section Breaks

Use horizontal rules (`---`) to separate major sections or chapters:

```markdown
## 08:15 Chapter Title Here

Content of this chapter...

---

## 15:30 Next Chapter Title

Content of next chapter...
```

## Formatting Within Content

**Emphasis:**
- Use *italics* for thoughts, internal dialogue, or emphasis
- Use **bold** for key terms or phrases (sparingly)
- Use `code formatting` for technical terms, commands, or code

**Quotes:**
- Direct quotes within speech: "And I thought, 'This is amazing.'"
- Extended quotes: Use blockquotes if needed

**Lists:**
- Use when speaker lists items systematically
- Don't force lists where they don't naturally exist

**Paragraph breaks:**
- Break when speaker changes topics
- Break when there's a natural pause or shift
- Keep related thoughts together
- Don't over-break into tiny paragraphs


---
Source: https://github.com/cdeistopened/content-os (MIT). Packaged by Full Production Studio.
