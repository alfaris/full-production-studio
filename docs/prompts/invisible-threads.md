---
name: invisible-threads
description: "Discovers non-obvious thematic connections (\"invisible threads\") across a corpus of essays, articles, or transcripts."
---

# Invisible Threads Skill

Discovers non-obvious thematic connections ("invisible threads") across a corpus of essays, articles, or transcripts.

Adapted from [invisible-threads](https://github.com/baboonzero/invisible-threads).

## When to Use

- Editing an anthology and want to find thematic connections
- Analyzing a body of work for recurring ideas
- Finding quotes that support a theme across multiple sources
- Writing editorial commentary that weaves sources together

## Quick Start

```bash
# 1. Prepare your corpus as markdown files in a source directory

# 2. Chunk the corpus into a database
python chunk_corpus.py --source /path/to/markdown/files --output corpus.db

# 3. Extract insights using Gemini
python extract_insights.py --db corpus.db --backend gemini

# 4. Find threads
python find_threads.py --input data/insights_*.json

# 5. Review threads_*.json for editorial use
```

## Adapting for Your Project

The key file to modify is the **extraction prompt** in `extract_insights.py`.

### Default Prompt Categories
The default is set up for Catholic agrarian content (Cross & Plough):
- industrialism, land, family, property, craft, liturgy
- organic-farming, distributism, eugenics, totalitarianism
- natural-law, peasantry, economics, spirituality

### For Other Projects
Change the EXTRACTION_PROMPT in `extract_insights.py`:

1. **Context section**: Describe what the corpus is
2. **Examples section**: Give 3 examples of genuine insights from this domain
3. **Categories**: List 10-15 thematic categories relevant to your content

See `references/prompt-templates.md` for examples.

## Output

### insights_*.json
Each insight includes:
- `insight_text`: The extracted quote/idea
- `category`: Thematic category
- `novelty_score`: 1-10 how surprising
- `specificity_score`: 1-10 how quotable
- `source`: Which document it came from
- `raw_chunk`: Original context

### threads_*.json
Each thread includes:
- `thread_id`: Identifier
- `category`: Dominant theme
- `size`: Number of connected insights
- `num_sources`: How many different documents
- `years_spanned`: Timeline (if applicable)
- `insights`: All insights in this thread

## Editorial Applications

1. **Reorganize structure** around discovered threads
2. **Write headnotes** referencing how themes recur
3. **Add footnotes** pointing to related pieces
4. **Find unused quotes** that connect to themes
5. **Write bridge paragraphs** between sections

## Scripts

| Script | Purpose |
|--------|---------|
| `chunk_corpus.py` | Split markdown files into database |
| `extract_insights.py` | Extract insights using LLM (Gemini/Claude/Ollama) |
| `find_threads.py` | Cluster insights into thematic threads |

## Requirements

```
google-generativeai>=0.3.0  # For Gemini
sentence-transformers>=2.2.0
networkx>=3.0
python-louvain>=0.16
scikit-learn>=1.0
```

## Cost

| Backend | ~1000 chunks | Speed |
|---------|--------------|-------|
| Gemini Flash | Free tier | Fast |
| Gemini Pro | ~$1-2 | Fast |
| Claude Haiku | ~$0.50 | Fast |
| Ollama | Free | Slow |


---

<!-- file: references/prompt-templates.md -->

# Prompt Templates for Invisible Threads

The extraction prompt is the key to getting good results. Here are templates for different content types.

## Template Structure

Every prompt should have:
1. **Context** - What is this corpus? Who wrote it? When?
2. **Definition** - What counts as an insight? (SPECIFIC + NON-OBVIOUS + MEMORABLE)
3. **Examples** - 3 genuine insights from this domain
4. **Anti-examples** - What is NOT an insight
5. **Calibration** - The test question to ask
6. **Output format** - Structured fields to extract

---

## Catholic Agrarian (Cross & Plough)

```
You are an insight extractor analyzing essays from *The Cross & The Plough* (1936-1946), a Catholic agrarian magazine advocating Distributism and land reform.

Your job is to identify genuinely insightful passages — ideas that challenge industrial modernity, reveal forgotten wisdom about land/family/craft, or articulate Catholic social principles in memorable ways.

## What IS an insight (high bar):
An insight must be SPECIFIC + NON-OBVIOUS + MEMORABLE.

EXAMPLES:
- "The mechanisation of life is the Beelzebub of our demons, but nowhere is it suggested how he is to be destroyed"
- "Communism did not spring full-armed from Hell. It arose by way of reaction against the Hell of Industrial Capitalism"
- "The peasant owning his land, the fisherman owning his boat, though obliged to work hard, are nevertheless masters of themselves and of their time"

NOT INSIGHTS:
- "We should return to the land" — Too generic
- "Industrialism is bad" — Too obvious
- "Fr. McNabb wore boots" — Just a fact

CATEGORIES: industrialism, land, family, property, craft, liturgy, organic-farming, distributism, eugenics, totalitarianism, natural-law, peasantry, enclosure, urbanization, economics, spirituality, education, other
```

---

## Startup/Business (Paul Graham style)

```
You are an insight extractor analyzing essays about startups, technology, and building companies.

Your job is to identify genuinely novel, non-obvious insights — the kind that make a reader stop and think "I didn't know that" or "I never thought about it that way."

## What IS an insight (high bar):
An insight must be SPECIFIC + NON-OBVIOUS + ACTIONABLE.

EXAMPLES:
- "The best ideas have an element of surprise because they challenge our model of the world — which means they were initially filtered out by our common sense"
- "Startups die from indigestion, not starvation — too many initiatives kill more companies than too few"
- "Writing doesn't just communicate ideas, it generates them — the act of writing forces you to figure out what you actually think"

NOT INSIGHTS:
- "Work hard" — Everyone knows this
- "Focus on what matters" — Vague truism
- "Paul Graham started Y Combinator" — Just a fact

CATEGORIES: hiring, firing, product, growth, leadership, culture, strategy, pricing, customer, team, metrics, communication, decision-making, fundraising, other
```

---

## Philosophy/Theology

```
You are an insight extractor analyzing philosophical or theological texts.

Your job is to identify genuinely insightful passages — arguments, distinctions, or formulations that illuminate difficult concepts or challenge received wisdom.

## What IS an insight (high bar):
An insight must be SPECIFIC + NON-OBVIOUS + ILLUMINATING.

EXAMPLES:
- "Evil is not a thing but a privation — the absence of a good that should be present"
- "We do not see things as they are, we see things as we are"
- "The test of a first-rate intelligence is the ability to hold two opposed ideas in the mind at the same time"

NOT INSIGHTS:
- "God is good" — Too generic for this audience
- "Virtue is important" — Lacks specificity
- "Aristotle studied under Plato" — Just a fact

CATEGORIES: metaphysics, epistemology, ethics, aesthetics, logic, anthropology, theology, politics, psychology, phenomenology, hermeneutics, other
```

---

## Health/Nutrition

```
You are an insight extractor analyzing texts about health, nutrition, and physiology.

Your job is to identify genuinely insightful passages — mechanisms, counterintuitive findings, or practical principles that challenge mainstream assumptions.

## What IS an insight (high bar):
An insight must be SPECIFIC + NON-OBVIOUS + MECHANISTIC.

EXAMPLES:
- "Stress doesn't cause ulcers directly — it suppresses stomach acid, allowing H. pylori to thrive"
- "The body doesn't distinguish between running from a lion and running on a treadmill — both trigger the same stress cascade"
- "Seed oils are new to the human diet — before 1900, the average American consumed zero"

NOT INSIGHTS:
- "Eat more vegetables" — Standard advice
- "Sleep is important" — Everyone knows this
- "Dr. X published a study" — Just a citation

CATEGORIES: metabolism, hormones, digestion, immunity, sleep, exercise, nutrition, toxins, supplements, fasting, circadian, nervous-system, other
```

---

## Adapting for Your Project

1. **Replace context** with your corpus description
2. **Find 3 real examples** from your material that represent the best insights
3. **List 3 anti-examples** that might look like insights but aren't
4. **Define categories** specific to your domain (10-15 is ideal)
5. **Adjust calibration question** for your target reader

The prompt should be ~500-800 words. Too short = vague results. Too long = model ignores parts.


---
Source: https://github.com/cdeistopened/content-os (MIT). Packaged by Full Production Studio.
