---
name: youtube
description: >
  The ultimate YouTube creator skill. Covers channel audits, video SEO,
  retention-engineered scripts, hook writing, thumbnail briefs, content
  strategy, content calendars, Shorts optimisation, analytics interpretation,
  monetisation planning, competitor research, cross-platform repurposing,
  upload metadata packages, and data-driven video idea generation.
  Triggers on: "youtube", "channel", "video", "views", "subscribers",
  "watch time", "shorts", "thumbnail", "CTR", "retention", "monetize",
  "script", "hook", "upload", "youtube audit", "video ideas",
  "content calendar", "competitor analysis", "repurpose video",
  "youtube seo", "youtube strategy", "youtube analytics".
tools:
  - Read
  - Write
  - Bash
  - WebSearch
  - Edit
  - Grep
  - Glob
  - Agent
---

# Claude YouTube — YouTube Creator Skill

> Orchestrator for 14 sub-skills covering every aspect of YouTube channel growth,
> optimisation, and monetisation. You route, delegate, and quality-check — sub-skills
> and execution scripts do the work.

## Command Router

| Command | Sub-Skill | Trigger Phrases |
|---------|-----------|----------------|
| `/youtube audit` | `sub-skills/audit.md` | "audit my channel", "channel health", "what's wrong with my channel", "my channel isn't growing" |
| `/youtube seo` | `sub-skills/seo.md` | "video SEO", "rank higher", "keyword research", "improve search ranking" |
| `/youtube script` | `sub-skills/script.md` | "write a script", "script for my video", "help me script" |
| `/youtube hook` | `sub-skills/hook.md` | "write a hook", "improve my intro", "first 30 seconds", "opening" |
| `/youtube thumbnail` | `sub-skills/thumbnail.md` | "thumbnail brief", "improve CTR", "design thumbnail" |
| `/youtube strategy` | `sub-skills/strategy.md` | "channel strategy", "content plan", "positioning", "niche" |
| `/youtube calendar` | `sub-skills/calendar.md` | "content calendar", "upload schedule", "what should I post this month" |
| `/youtube shorts` | `sub-skills/shorts.md` | "Shorts", "short video", "vertical video", "Shorts strategy" |
| `/youtube analyze` | `sub-skills/analyze.md` | "analyze metrics", "why are views dropping", "interpret analytics" |
| `/youtube repurpose` | `sub-skills/repurpose.md` | "repurpose video", "turn into Shorts", "cross-platform", "extract clips" |
| `/youtube monetize` | `sub-skills/monetize.md` | "monetize", "make money", "revenue", "brand deals", "memberships" |
| `/youtube competitor` | `sub-skills/competitor.md` | "competitor analysis", "spy on channel", "what is [channel] doing" |
| `/youtube metadata` | `sub-skills/metadata.md` | "upload metadata", "title and description", "pre-publish checklist" |
| `/youtube ideate` | `sub-skills/ideate.md` | "video ideas", "what should I make next", "brainstorm", "content ideas" |

If the user's request doesn't clearly match one command, ask a clarifying question.
If the request spans multiple sub-skills (e.g., "help me plan and script my next video"),
run the relevant sub-skills sequentially, passing output from each as input to the next.

## Context-Gathering Protocol

Before invoking ANY sub-skill, you MUST collect these three inputs. If any are missing, ask:

1. **Channel niche/topic** — What is the channel about? Be specific (not "tech" — "budget Android phone reviews").
2. **Channel size tier:**
   - New: < 1K subscribers
   - Growing: 1K–10K subscribers
   - Established: 10K–100K subscribers
   - Authority: 100K+ subscribers
3. **Primary goal:** Growth / Monetisation / Brand Authority / Audience Engagement

For `audit`, `analyze`, and `competitor` sub-skills, also collect the channel URL or handle.

## Channel Type Detection

Based on niche and content description, classify into one of 9 types and load the
matching template from `templates/`:

| Type | Template | Signals |
|------|----------|---------|
| Education | `templates/education-channel.md` | How-to, explainers, courses |
| Entertainment | `templates/entertainment-channel.md` | Comedy, challenges, reactions |
| Tutorial | `templates/tutorial-channel.md` | Step-by-step, walkthroughs, demos |
| Vlog | `templates/vlog-channel.md` | Day-in-life, personal updates |
| Review | `templates/review-channel.md` | Product reviews, comparisons, unboxing |
| Commentary | `templates/commentary-channel.md` | News commentary, opinion, essays |
| Niche Authority | `templates/niche-authority-channel.md` | Deep-dive single topic, expert positioning |
| Personal Brand | `templates/personal-brand-channel.md` | Creator-as-brand, multi-format |
| Shorts-First | `templates/shorts-first-channel.md` | Primarily vertical content |

## Parallel Agent Rules

**`audit` sub-skill** — spawn 4 parallel agents:
- Agent A: Technical SEO audit (loads `references/seo-playbook.md`)
- Agent B: Performance audit (loads `references/analytics-guide.md`)
- Agent C: Content strategy audit (loads `references/algorithm-guide.md`)
- Agent D: Monetisation audit (loads `references/monetization-guide.md`)

**`competitor` sub-skill** — spawn 4 parallel agents:
- Agent A: Top video analysis
- Agent B: Keyword gap analysis
- Agent C: Format gap analysis
- Agent D: Audience gap analysis (comment mining)

All other sub-skills run inline (single-threaded). If Agent tool is unavailable,
fall back to sequential inline execution.

## Reference Files

Load on-demand when a sub-skill requests them. Never pre-load all at once.
Do not reload a reference file already in context for this session.

| File | Content |
|------|---------|
| `references/algorithm-guide.md` | 3-system architecture, testing cascade, CTR/AVD benchmarks, 2024-2025 changes |
| `references/seo-playbook.md` | Title/description/tags/chapters/hashtags rules, VideoObject schema |
| `references/retention-scripting-guide.md` | Hook frameworks, pattern interrupts, CTA placement, retention graphs |
| `references/thumbnail-ctr-guide.md` | CTR by niche, face psychology, A/B testing, title formulas |
| `references/shorts-playbook.md` | Shorts algorithm, format specs, monetisation, repurposing |
| `references/analytics-guide.md` | Metrics hierarchy, funnel ratios, RPM/CPM by niche |
| `references/monetization-guide.md` | YPP tiers, 7 revenue streams, brand deal rates |
| `references/repurposing-guide.md` | Hub/Hero/Help model, cross-platform workflows, platform specs |
| `references/dataforseo-integration.md` | DataForSEO MCP tool reference, YouTube SERP, keyword research, trends |

## DataForSEO MCP Integration (Optional)

When the DataForSEO MCP server is available (configured in `~/.claude/settings.json`),
youtube skills use live data for keyword research, YouTube SERP analysis, trend
intelligence, video metadata, and competitive research. Falls back to WebSearch +
execution scripts when unavailable.

**Reference:** Load `references/dataforseo-integration.md` for full tool reference,
parameters, and efficiency guidelines.

**Detection:** Attempt any DataForSEO tool call (e.g., `serp_youtube_organic_live_advanced`).
If it fails, fall back to WebSearch + execution scripts. Never block a workflow
because DataForSEO is unavailable.

**Default parameters:** location_code=2840 (US), language_code="en"

### Key YouTube DataForSEO Tools

| Tool | Purpose |
|------|---------|
| `serp_youtube_organic_live_advanced` | YouTube search results for a keyword — videos, channels, playlists with view counts |
| `serp_youtube_video_info_live_advanced` | Deep video analysis — views, likes, comments, tags, category, subtitles |
| `serp_youtube_video_comments_live_advanced` | Video comments with engagement data |
| `serp_youtube_video_subtitles_live_advanced` | Video transcript/subtitles extraction |
| `kw_data_google_ads_search_volume` | Search volume, CPC, competition for keyword arrays |
| `dataforseo_labs_google_keyword_ideas` | Keyword ideas from seed keywords |
| `dataforseo_labs_google_keyword_suggestions` | Autocomplete-style keyword suggestions |
| `dataforseo_labs_bulk_keyword_difficulty` | Keyword difficulty scores (0-100) |
| `dataforseo_labs_search_intent` | Intent classification (informational/commercial/transactional) |
| `kw_data_google_trends_explore` | Google Trends time series (supports YouTube-specific filtering) |

### Sub-Skill → DataForSEO Module Mapping

| Sub-Skill | DataForSEO Tools Used |
|-----------|----------------------|
| ideate | YouTube SERP + keyword ideas + trends + volume |
| seo | Volume + difficulty + intent + YouTube SERP competition |
| competitor | YouTube SERP × keywords + video info + comments |
| strategy | Trends + volume + YouTube SERP + keyword ideas |
| calendar | Google Trends for seasonal planning + volume for prioritisation |
| analyze | YouTube SERP position tracking + video info |
| audit | YouTube SERP + volume + video info + keyword difficulty |
| shorts | YouTube SERP (Shorts filter) + trends |
| hook | YouTube SERP top video titles for keyword |
| thumbnail | YouTube SERP competitor thumbnails |
| metadata | Volume + difficulty for tag optimisation |

### API Credit Awareness

DataForSEO charges per API call. Typical workflow costs $0.002-$0.04.
Rules:
- Batch keywords into single calls (volume, difficulty, intent tools accept arrays)
- Don't re-fetch data already retrieved in the same session
- Use `dataforseo_labs_google_keyword_overview` for single-keyword lookups
- Warn the user before running expensive operations

## NanoBanana MCP — Thumbnail Generation (Optional)

When the NanoBanana MCP server is configured, the `thumbnail` sub-skill can generate
actual thumbnail images using Gemini models instead of just producing text briefs.

**Tool:** `generate_image`

**Recommended thumbnail settings:**
- `aspect_ratio`: `"16:9"` (YouTube standard)
- `resolution`: `"4k"` (1280×720 minimum for YouTube)
- `model_tier`: `"nb2"` (fast, high-quality production assets)

**Detection:** Attempt `generate_image` tool call. If unavailable, deliver text-based
thumbnail briefs only — they are detailed enough for any designer to execute.

**Workflow:** Primary thumbnail + 3 A/B variants = 4 `generate_image` calls per brief.
See `sub-skills/thumbnail.md` for prompt engineering guidelines.

## Execution Scripts

Scripts require YouTube API credentials. Before calling any script:
1. Check if `YOUTUBE_API_KEY` environment variable exists
2. If missing, provide the user with setup instructions instead of failing silently
3. For Analytics API scripts, check OAuth token exists

If credentials are absent, fall back to asking the user to provide data manually
(e.g., paste YouTube Studio screenshots or describe their metrics).

| Script | Purpose | Quota Cost |
|--------|---------|-----------|
| `execution/fetch_channel_data.py` | Channel stats + last N videos via Data API v3 | ~16 units |
| `execution/fetch_video_analytics.py` | Private analytics (own channel, OAuth) | ~5 units |
| `execution/search_competitor_videos.py` | Search competitor videos (expensive) | 100 units/search |
| `execution/fetch_transcript.py` | Video transcript extraction | 1-2 units |
| `execution/utils/quota_tracker.py` | Tracks 10K unit/day quota | 0 units |
| `execution/utils/youtube_auth.py` | API key + OAuth handler | 0 units |

## Quality Gates

Every sub-skill output MUST pass these checks before delivery:

1. **Specificity** — Every recommendation must be actionable for THIS channel.
   No generic advice like "post consistently" without specifying cadence for their tier.
2. **Data grounding** — Every benchmark cited must come from a reference file.
   Never hallucinate statistics. If unsure, say "benchmark unavailable" and explain.
3. **Completeness** — All sections in the sub-skill's output template must be present.
   Missing sections = incomplete deliverable.

## Self-Anneal Loop

If a sub-skill output fails a quality gate:
1. Identify which gate failed and why
2. Re-read the relevant reference file for missing data
3. Re-generate only the failing sections
4. Re-check all three gates
5. If still failing after 2 attempts, deliver with explicit caveats noting the limitation

## Output Format

Default to markdown. For `metadata` sub-skill, produce copy-paste-ready plain text blocks.
For `calendar`, produce a markdown table. For `audit`, produce a structured report with
scores. Always end with a "Next Steps" section pointing the user to the logical next
sub-skill (e.g., after `audit` → suggest `strategy` or the lowest-scoring dimension's sub-skill).


---

<!-- file: references/algorithm-guide.md -->

# YouTube Algorithm Reference Guide

## Table of Contents

- [Three-System Architecture](#three-system-architecture)
- [Signal Hierarchy & Satisfaction Metrics](#signal-hierarchy--satisfaction-metrics)
- [CTR Benchmarks](#ctr-benchmarks)
- [Average View Duration (AVD)](#average-view-duration-avd)
- [Context-Adaptive Weighting](#context-adaptive-weighting)
- [Engagement Signals](#engagement-signals)
- [Upload Cadence & Growth](#upload-cadence--growth)
- [New Channel Promotion](#new-channel-promotion)
- [Algorithm Timeline 2024-2025](#algorithm-timeline-2024-2025)
- [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Three-System Architecture

YouTube operates three distinct recommendation systems, each with its own signal hierarchy:

| System | Primary Surface | Core Signals |
|--------|----------------|--------------|
| **Browse** | Home feed, Subscriptions | Personalization, satisfaction, freshness |
| **Search** | Search results | Query relevance, metadata, engagement |
| **Shorts** | Shorts feed | Completion rate, loops, freshness |

- Each system ranks and serves content independently
- A video can perform well in one system and poorly in another
- `[2025]` Beaupre (January 2025): YouTube is a "per-viewer prediction engine", satisfaction-weighted

---

## Signal Hierarchy & Satisfaction Metrics

### 4-Layer Testing Cascade

Videos are tested through progressively wider audiences:

1. **Core audience** -- Subscribers and frequent viewers
2. **Expanded** -- Similar interest profiles
3. **Broader** -- Wider demographic/topic match
4. **High authority** -- Trending/viral distribution

- Advancement to next layer depends on performance relative to predictions at each stage

### Satisfaction Signals (Ranked)

| Signal | Weight Notes |
|--------|-------------|
| **Shares** | Strongest per-action signal |
| **Repeat viewing** | Indicates high satisfaction |
| **Session continuation** | Viewer stays on platform |
| **Saves** | Bookmarking intent |
| **Surveys** | Direct satisfaction measurement |
| **Likes** | Standard positive signal |
| **Comments** | Weighted for time investment |

- **Quality Click Ratio**: Clicks that convert to satisfied viewing (not just any click)

---

## CTR Benchmarks

### CTR by Traffic Source `[2025]`

Source: Focus Digital (single-agency report), December 2025

| Traffic Source | Average CTR |
|---------------|-------------|
| Search | 12.5% |
| Suggested | 9.5% |
| Browse | 3.5% |
| External | 2.8% |

### CTR Performance Tiers

| CTR Range | Assessment |
|-----------|------------|
| Below 3% | Fix needed |
| 4-6% | Average |
| 7-10% | Good |
| 10%+ | Exceptional |

---

## Average View Duration (AVD)

Source: Retention Rabbit, 150M+ minutes analyzed

- **Average AVD**: 23.7%
- **Only 16.8%** of videos surpass 50% AVD
- **Below 40% AVD** = deprioritized by the algorithm

---

## Context-Adaptive Weighting

Watch time is weighted differently depending on device and content type:

| Context | Watch Time Weight |
|---------|------------------|
| TV / CTV | Higher |
| Mobile | Lower (relative to TV) |
| Podcasts | Higher |
| Music | Lower (relative to podcasts) |

---

## Engagement Signals

- **50+ comments replied** within 2 hours = **15-20% higher reach**
- Comment replies in the first 2 hours are critical for the testing cascade

---

## Upload Cadence & Growth

Source: vidIQ, 5.08M channels analyzed

| Cadence | Growth Impact |
|---------|---------------|
| 12+/month | 8x faster view growth, 3x subscriber growth |
| Consistency > frequency | Regular schedule beats sporadic bursts |

- **Max 3 notifications per 24 hours** -- uploads beyond this won't trigger subscriber notifications

---

## New Channel Promotion

- Channels **under 500 subscribers** receive active algorithmic promotion
- **Hype feature**: 3 votes per week per user, weighted more heavily for smaller channels
- Beta results: **5M hypes across 50K channels**

---

## Algorithm Timeline 2024-2025

| Date | Change |
|------|--------|
| Mid-2024 | Thumbnail A/B testing rollout |
| Oct 2024 | `[2025]` Shorts extended to 3 minutes |
| Jan 2025 | `[2025]` LLMs integrated into recommendations, satisfaction-weighted |
| Mar 2025 | `[2025]` Shorts view counting change (any playback = view, loops = additional views). Engaged Views metric introduced |
| Aug 2025 | `[2025]` Undocumented ~30% viewership drops reported; desktop-to-mobile shift observed |
| Oct 2025 | `[2025]` Pichai confirms Shorts earn more per watch hour than in-stream ads in US |
| Late 2025 | `[2025]` Home feed long-form reduced up to 80% (per MrBeast retention director). Shorts consuming feed real estate |
| Sep 2025 | `[2025]` Shorts freshness prioritization; Shorts older than ~28-30 days deprioritized |

---

## Core Mindset: Algorithm = Audience

Source: MrBeast methodology (validated at 100M+ views/video scale)

Whenever you hear "algorithm," replace it with "audience." The algorithm is simply
a measurement of human behavior. If people click and watch your content, YouTube
will promote it. There is no secret hack -- only understanding what your specific
audience wants and delivering it better than anyone else.

**Practical implication:** Stop optimizing for "the algorithm" and start studying
human psychology. Why do people click? Why do they leave? Why do they share?
Every decision (thumbnail, title, script, pacing) should answer these questions.

---

## Key Constraints & Gotchas

- **Browse CTR is naturally low** (3.5%) -- do not compare it against Search CTR (12.5%); they are different systems
- **AVD below 40% triggers deprioritization** -- retention is non-negotiable
- **Notification cap of 3/24h** means uploading more than 3 times daily wastes notification slots
- **Consistency beats frequency** -- irregular 12/month is worse than regular 4/month
- **Shorts older than ~28-30 days lose freshness boost** `[2025]` -- plan for front-loaded Shorts performance
- **Long-form Home feed visibility dropped up to 80%** `[2025]` -- diversify traffic sources beyond Browse
- **August 2025 viewership drops** were undocumented -- monitor analytics for unexplained dips
- **Quality Click Ratio** matters more than raw CTR -- clickbait that doesn't convert hurts ranking
- **TV/CTV watch time is weighted higher** -- optimize for lean-back viewing if targeting living room audiences
- **Comment replies are time-sensitive** -- the 2-hour window is critical for the 15-20% reach boost


---

<!-- file: references/analytics-guide.md -->

# YouTube Analytics Guide

## Table of Contents

1. [Metrics Hierarchy](#metrics-hierarchy)
2. [Vanity Metrics to Ignore](#vanity-metrics-to-ignore)
3. [Impressions Funnel](#impressions-funnel)
4. [Traffic Source Health](#traffic-source-health)
5. [RPM vs CPM](#rpm-vs-cpm)
6. [CPM Ranges by Niche](#cpm-ranges-by-niche)
7. [RPM Ranges by Niche](#rpm-ranges-by-niche)
8. [Geographic & Seasonal Factors](#geographic--seasonal-factors)
9. [Channel Health Indicators](#channel-health-indicators)
10. [YouTube Analytics API](#youtube-analytics-api)
11. [YouTube Reporting API](#youtube-reporting-api)
12. [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Metrics Hierarchy

| Priority | Metric | Impact |
|----------|--------|--------|
| 1 | Watch time | Most influential overall signal |
| 2 | CTR | ~**80%** of initial distribution decisions |
| 3 | AVD (Average View Duration) | **50%+ = 3x more likely** to be recommended |
| 4 | Traffic sources | Distribution health indicator |
| 5 | Subscribers gained per video | Long-term channel value signal |

## Vanity Metrics to Ignore

- **Subscriber count in isolation** -- PewDiePie: 110M subs, ~2.2M typical views
- **Total views without retention context**
- **Likes in isolation**

## Impressions Funnel

| Phase | CTR Range | Meaning |
|-------|-----------|---------|
| Launch (warm audience) | **12%+** | Normal for initial push |
| Expansion | Natural drop | Impressions scaling to cold audience |
| Sustained healthy | **4-8%** | Stable performance |

### Diagnostic Matrix

| Impressions | CTR | Diagnosis |
|-------------|-----|-----------|
| High | Low | Thumbnail/title problem |
| High | High + Low AVD | Clickbait signal |
| Low | High | Limited reach, content too niche |

## Traffic Source Health

| Pattern | Interpretation |
|---------|---------------|
| Balanced Suggested + Search | Healthy channel |
| Suggested growing faster than Search | Strong retention signals |
| External dominant | Over-reliant on off-platform promotion |
| Search dominant + low Suggested | Good SEO but content not engaging enough |

## RPM vs CPM

| Metric | Definition |
|--------|-----------|
| **CPM** | Advertiser pays per 1K **ad impressions** (before YouTube cut) |
| **RPM** | Creator earns per 1K **total views** (after YouTube 45% cut, all revenue sources) |

- RPM is **always lower** than CPM
- Videos **>8 min** with mid-roll ads = RPM roughly **doubles**

## CPM Ranges by Niche

`[2025]` Advertiser cost per 1K ad impressions:

| Niche | CPM Range |
|-------|-----------|
| Finance / Investing | $12-$16 |
| Tech / SaaS | $8-$14 |
| Business / Education | $5-$12 |
| Health | $4-$8 |
| Gaming | $1-$4 |

## RPM Ranges by Niche

`[2025]` Creator earnings per 1K total views (US audience):

### Tier 1 (High Value)

| Niche | RPM |
|-------|-----|
| Personal Finance | $20-$40+ |
| Legal / Real Estate | $20-$35 |
| Business / Entrepreneurship | $15-$30 |
| Tech / Software | $15-$25 |
| Digital Marketing | $12-$25 |

### Tier 2 (Mid Value)

| Niche | RPM |
|-------|-----|
| Health / Fitness | $8-$15 |
| Education | $8-$15 |
| DIY | $8-$14 |
| Food / Cooking | $6-$12 |
| Travel | $6-$12 |

### Tier 3 (Lower Value)

| Niche | RPM |
|-------|-----|
| Beauty | $5-$8 |
| Gaming | $2-$5 (median US $3.50) |
| Entertainment | $2-$5 |
| Lifestyle | $3-$6 |
| Music | $1-$3 |

## Geographic & Seasonal Factors

- **US viewers 5-8x more valuable** than SE Asian viewers
- Finance RPM: USA $15-$25 vs India $0.50-$1.50
- **Q4 (Oct-Dec)**: CPMs **30-60% higher**
- **January**: cheapest CPMs of the year

## Channel Health Indicators

### Healthy Channel

| Metric | Target |
|--------|--------|
| CTR | 4-8% |
| Retention | Above 40% (ahead of **83% of channels**) |
| Sub growth | Steady increase |
| Traffic sources | Balanced mix |
| Viewer ratio | Good new:returning balance |

### Struggling Channel

| Signal | Threshold |
|--------|-----------|
| CTR | Below 3% |
| View duration | Dropped **40%+** |
| Source reliance | **80%+** from single source |
| Schedule | Inconsistent uploads |

- JI Digital 20-point audit: channels scoring **76+** grow subs **3.2x faster** than those below 50

## YouTube Analytics API

### Queryable Metrics

- `views`, `engagedViews`, `estimatedMinutesWatched`, `averageViewDuration`
- `estimatedRevenue`, `estimatedAdRevenue`, `grossRevenue`, `CPM`
- `likes`, `dislikes`, `comments`, `shares`
- `subscribersGained`, `subscribersLost`
- `cardClickRate`, `playlistViews`, `playlistStarts`

**`engagedViews`** `[2025]`: Official metric since April 2025. For long-form, equals `views`. For Shorts, captures the pre-March 2025 view counting (minimum watch time required). Use `engagedViews` for accurate Shorts performance comparison across the view counting change.

### Available Dimensions

- **Time**: `day`, `month`
- **Geography**: `country`, `province`, `city`
- **Demographics**: `ageGroup`, `gender`
- **Device**: `deviceType`, `operatingSystem`
- **Source**: `insightTrafficSourceType`
- **Content**: `video`, `playlist`, `liveOrOnDemand`, `subscribedStatus`

### Limits

- Max **200 results** per query
- Groups up to **500 videos**

## YouTube Reporting API

- Bulk CSV exports
- **24-hour** granularity
- **60-day** data availability window
- `channel_reach_basic_a1` report: thumbnail impressions and CTR

---

## Key Constraints & Gotchas

- CTR naturally drops as impressions expand -- a declining CTR is not always bad
- AVD at 50%+ is the threshold for 3x recommendation likelihood
- RPM is always lower than CPM; never confuse the two in calculations
- Videos under 8 min cannot have mid-roll ads, roughly halving RPM potential
- US viewers are 5-8x more valuable than SE Asian -- audience geography dominates revenue
- Q4 CPM spikes 30-60%; plan high-value content for Oct-Dec
- Analytics API caps at 200 results per query; paginate for large datasets
- Reporting API data only available for 60 days; export regularly
- Subscriber count is a vanity metric without per-video view context
- 80%+ traffic from a single source indicates dangerous channel fragility


---

<!-- file: references/dataforseo-integration.md -->

# DataForSEO Integration Reference

Live YouTube data via the DataForSEO MCP server. When available, youtube skills use
these tools for real keyword metrics, YouTube SERP analysis, video intelligence,
trend data, and competitive research. Falls back to WebSearch + execution scripts
when DataForSEO is unavailable.

## Table of Contents

- [Detection & Fallback](#detection--fallback)
- [Default Parameters](#default-parameters)
- [API Credit Efficiency](#api-credit-efficiency)
- [YouTube-Specific Tools](#youtube-specific-tools)
- [Keyword Research Tools](#keyword-research-tools)
- [Trends & Seasonality](#trends--seasonality)
- [Competitor & Domain Analysis](#competitor--domain-analysis)
- [AI Visibility (GEO)](#ai-visibility-geo)
- [Sub-Skill → DataForSEO Module Mapping](#sub-skill--dataforseo-module-mapping)
- [Estimated Cost Per Workflow](#estimated-cost-per-workflow)
- [YouTube SERP Research Workflow](#youtube-serp-research-workflow)
- [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Detection & Fallback

Before using DataForSEO tools, check availability by calling any tool (e.g.,
`serp_youtube_organic_live_advanced`). If the call fails or the tool is not
found, fall back to WebSearch and execution scripts for that step.

**Pattern:**
1. Attempt DataForSEO tool call
2. If successful → use live data
3. If unavailable → fall back to WebSearch + execution scripts
4. Never block a workflow because DataForSEO is unavailable

## Default Parameters

All DataForSEO tools accept these defaults unless the user specifies otherwise:
- `location_code`: 2840 (United States)
- `language_code`: "en"
- `device`: "desktop" (SERP tools)
- `limit`: 50 (list endpoints)
- `depth`: 100 (SERP depth)

## API Credit Efficiency

DataForSEO charges per API call. Follow these rules:
- **Batch keywords** into single calls (volume/difficulty/intent tools accept arrays)
- **Don't re-fetch** data already retrieved in the same session
- **Use `dataforseo_labs_google_keyword_overview`** for single-keyword lookups
- **Default to limit=50** for list endpoints unless more results are needed
- **Warn the user** before running expensive operations (large keyword lists, full crawls)

---

## YouTube-Specific Tools

### YouTube SERP (Search Results)

| Tool | Purpose | Key Parameters | ~Cost |
|------|---------|---------------|-------|
| `serp_youtube_organic_live_advanced` | YouTube search results for a keyword | `keyword`, `location_code`, `language_code`, `device`, `depth` | ~0.002 |

**Response fields per result:**
- `youtube_video`: title, url, video_id, thumbnail_url, channel_id, channel_name, channel_url, channel_logo, description, views_count, publication_date, duration_time, duration_time_seconds, is_live, is_shorts, badges
- `youtube_channel`: channel_id, name, url, logo, video_count, is_verified, description
- `youtube_playlist`: title, url, playlist_id, videos_count, preview_videos

**Use cases:**
- Keyword competition analysis (how many videos rank, their view counts)
- Content gap discovery (what topics have low competition)
- Competitor video identification for any keyword
- Shorts vs long-form ratio analysis in search results

### YouTube Video Intelligence

| Tool | Purpose | Key Parameters | ~Cost |
|------|---------|---------------|-------|
| `serp_youtube_video_info_live_advanced` | Full video metadata and metrics | `video_id` | ~0.002 |
| `serp_youtube_video_comments_live_advanced` | Video comments with engagement | `video_id` | ~0.002 |
| `serp_youtube_video_subtitles_live_advanced` | Video subtitles/transcript | `video_id` | ~0.002 |

**Video info response fields:**
- Core: video_id, title, url, thumbnail_url, description, duration_time, duration_time_seconds, publication_date
- Engagement: views_count, likes_count, comments_count
- Channel: channel_id, channel_name, channel_url, channel_subscribers_count
- Classification: keywords (tags), category, is_live, is_embeddable
- Technical: subtitles (languages available), streaming_quality (resolutions)

**Comments response:** Comment text, author, likes, reply count, timestamp
**Subtitles response:** Full transcript text with language and auto-generation flags

---

## Keyword Research Tools

| Tool | Purpose | Parameters | ~Cost |
|------|---------|------------|-------|
| `kw_data_google_ads_search_volume` | Monthly search volume, CPC, competition, monthly trends | `keywords` (array), `location_code`, `language_code` | ~0.001 |
| `dataforseo_labs_google_keyword_ideas` | Generate keyword ideas from seed | `keywords` (array), `location_code`, `language_code`, `limit` | ~0.001 |
| `dataforseo_labs_google_keyword_suggestions` | Autocomplete-style suggestions | `keywords` (array), `location_code`, `language_code`, `limit` | ~0.001 |
| `dataforseo_labs_google_related_keywords` | Semantically related keywords | `keywords` (array), `location_code`, `language_code`, `limit` | ~0.001 |
| `dataforseo_labs_bulk_keyword_difficulty` | Difficulty scores (0-100) | `keywords` (array), `location_code`, `language_code` | ~0.001 |
| `dataforseo_labs_search_intent` | Intent classification (informational, commercial, transactional, navigational) | `keywords` (array), `location_code`, `language_code` | ~0.0005 |
| `dataforseo_labs_google_keyword_overview` | Quick overview: volume + difficulty + intent | `keywords` (array), `location_code`, `language_code` | ~0.001 |

**YouTube context:** Google search volume strongly correlates with YouTube search volume.
Keywords with high Google volume + informational intent are prime YouTube targets.
Commercial/transactional keywords convert better for monetisation but have lower view potential.

## Trends & Seasonality

| Tool | Purpose | Parameters | ~Cost |
|------|---------|------------|-------|
| `kw_data_google_trends_explore` | Google Trends time series data | `keywords` (array, max 5), `location_code`, `date_from`, `date_to`, `type` | ~0.001 |
| `content_analysis_phrase_trends` | Phrase popularity over time | `keyword`, `date_from`, `date_to` | ~0.002 |

**Critical for YouTube:** Use `kw_data_google_trends_explore` to:
- Identify rising topics before they peak (ideal upload timing)
- Compare topic seasonality for calendar planning
- Validate ideation topics against real trend data
- Detect declining topics to avoid (wasted production effort)

## Competitor & Domain Analysis

| Tool | Purpose | Parameters | ~Cost |
|------|---------|------------|-------|
| `dataforseo_labs_google_competitors_domain` | Competing domains by keyword overlap | `target` (domain), `location_code`, `language_code` | ~0.002 |
| `dataforseo_labs_google_ranked_keywords` | Keywords a domain ranks for with positions | `target` (domain), `location_code`, `language_code`, `limit` | ~0.002 |
| `dataforseo_labs_google_domain_intersection` | Shared keywords across 2-20 domains | `targets` (array), `location_code`, `language_code` | ~0.002 |
| `dataforseo_labs_bulk_traffic_estimation` | Estimated organic traffic for domains | `targets` (array), `location_code`, `language_code` | ~0.001 |
| `content_analysis_search` | Find content by topic with quality scores | `keyword` or `url` | ~0.002 |

**YouTube context:** Use these to analyze competitor channel websites and blog presence.
Cross-reference with `serp_youtube_organic_live_advanced` to build a complete picture
of competitor keyword coverage across both Google and YouTube.

## AI Visibility (GEO)

| Tool | Purpose | Parameters | ~Cost |
|------|---------|------------|-------|
| `ai_optimization_chat_gpt_scraper` | ChatGPT web search results: cited sources | `query`, `location_code`, `language_code` | ~0.01 |
| `ai_opt_llm_ment_search` | LLM mentions of a keyword/brand | `keyword`, `location_code`, `language_code` | ~0.01 |
| `ai_opt_llm_ment_top_domains` | Top domains cited by LLMs | `keyword`, `location_code`, `language_code` | ~0.01 |

**YouTube context:** YouTube videos appear in AI citations. Use these to check
if a creator's videos are being cited by AI platforms and identify gaps.

---

## Sub-Skill → DataForSEO Module Mapping

| Sub-Skill | DataForSEO Modules | What It Gets |
|-----------|-------------------|--------------|
| ideate | KEYWORDS_DATA, SERP (YouTube), ONPAGE | Keyword ideas, YouTube SERP competition, trends, search volume for idea validation |
| seo | KEYWORDS_DATA, DATAFORSEO_LABS, SERP (YouTube) | Volume, difficulty, intent for title/tag optimisation, YouTube SERP for competition check |
| competitor | SERP (YouTube), DATAFORSEO_LABS | YouTube SERP for keyword gaps, competitor domain analysis, ranked keywords |
| strategy | KEYWORDS_DATA, DATAFORSEO_LABS, SERP (YouTube), ONPAGE | Trends, volume, competition depth, niche viability, content gaps |
| calendar | KEYWORDS_DATA, ONPAGE | Google Trends for seasonal planning, volume for prioritisation |
| analyze | SERP (YouTube), DATAFORSEO_LABS | YouTube SERP position tracking, keyword overview for diagnosed videos |
| audit | SERP (YouTube), DATAFORSEO_LABS, KEYWORDS_DATA | Channel keyword coverage, YouTube SERP positions, competitor benchmarking |
| shorts | SERP (YouTube), KEYWORDS_DATA | Shorts-specific keyword trends, YouTube SERP Shorts ratio |
| hook | SERP (YouTube) | Top-performing video titles/hooks for the keyword from YouTube SERP |
| thumbnail | SERP (YouTube) | Competitor thumbnail analysis via YouTube SERP results |
| metadata | KEYWORDS_DATA, DATAFORSEO_LABS | Real volume/difficulty for tag optimisation, intent for description framing |

## Estimated Cost Per Workflow

| Workflow | Typical API Calls | Est. Cost |
|----------|------------------|-----------|
| `/youtube ideate <niche>` | 5-8 (trends + volume + ideas + YouTube SERP) | ~$0.01 |
| `/youtube seo <video>` | 3-5 (volume + difficulty + intent + YouTube SERP) | ~$0.008 |
| `/youtube competitor <channels>` | 6-10 (YouTube SERP × keywords + domain analysis) | ~$0.02 |
| `/youtube strategy <niche>` | 8-12 (trends + volume + YouTube SERP + competition) | ~$0.03 |
| `/youtube calendar` | 3-5 (trends + volume for scheduling) | ~$0.008 |
| `/youtube audit <channel>` | 8-15 (YouTube SERP + volume + video info × videos) | ~$0.04 |
| `/youtube analyze <video>` | 2-4 (video info + YouTube SERP + keyword overview) | ~$0.008 |
| `/youtube metadata <video>` | 2-3 (volume + difficulty for tags) | ~$0.004 |

## YouTube SERP Research Workflow

Standard research pattern for any YouTube sub-skill:

```
1. Identify target keywords (from user input or ideation)
2. Run `serp_youtube_organic_live_advanced` for each keyword
3. Extract from results:
   - Top video view counts → benchmark for niche
   - Channel distribution → concentration vs fragmentation
   - Shorts vs long-form ratio → format opportunity
   - Publication dates → content freshness in niche
   - Title patterns → what's working
4. Cross-reference with `kw_data_google_ads_search_volume`
   - High Google volume + low YouTube competition = opportunity
5. Validate with `kw_data_google_trends_explore`
   - Rising trend = act now, declining = avoid
```

---

## Key Constraints & Gotchas

- **Google volume ≠ YouTube volume** -- DataForSEO provides Google Ads search volume, not YouTube-specific volume. Google volume is a strong proxy but not identical; some keywords are disproportionately searched on YouTube (gaming, tutorials) vs Google
- **Batch keywords to save credits** -- volume, difficulty, and intent tools all accept arrays. Sending 20 keywords in one call costs the same as sending 1. Never loop single-keyword calls
- **Never re-fetch in the same session** -- if you already retrieved keyword data or YouTube SERP results for a keyword earlier in the conversation, reuse that data instead of making another API call
- **YouTube SERP results may lag** -- DataForSEO caches YouTube SERP data; results may be hours or days old. For trending topic analysis, supplement with `kw_data_google_trends_explore` for real-time signals
- **Video info requires video_id, not URL** -- extract the video ID from URLs before calling `serp_youtube_video_info_live_advanced`. Format: 11-character alphanumeric string (e.g., `dQw4w9WgXcQ`)
- **Comments tool returns limited depth** -- `serp_youtube_video_comments_live_advanced` returns top-level comments sorted by relevance, not all comments. Sufficient for audience gap analysis but not exhaustive
- **Subtitles may be auto-generated** -- check the auto-generation flag in `serp_youtube_video_subtitles_live_advanced` responses. Auto-generated transcripts contain errors that affect content analysis accuracy
- **CPC as RPM proxy is approximate** -- higher Google Ads CPC generally correlates with higher YouTube RPM for a topic, but the relationship is not linear. Use as a directional signal, not a precise estimate
- **Trends data compares relative interest, not absolute volume** -- `kw_data_google_trends_explore` returns index values (0-100), not search counts. Always pair with volume data for a complete picture
- **Cost awareness** -- typical YouTube workflow costs $0.002-$0.04. Warn the user before operations exceeding ~$0.05 (large keyword lists, multiple YouTube SERP queries)


---

<!-- file: references/monetization-guide.md -->

# YouTube Monetization Guide

## Table of Contents

1. [YPP Requirements](#ypp-requirements)
2. [AdSense RPM by Niche](#adsense-rpm-by-niche)
3. [Channel Memberships](#channel-memberships)
4. [Super Chat / Thanks / Stickers](#super-chat--thanks--stickers)
5. [YouTube Shopping Affiliate](#youtube-shopping-affiliate)
6. [Brand Deals](#brand-deals)
7. [FTC Disclosure Requirements](#ftc-disclosure-requirements)
8. [YouTube Premium Revenue](#youtube-premium-revenue)
9. [External Revenue Streams](#external-revenue-streams)
10. [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## YPP Requirements

### Expanded Tier (Partial Monetization)

| Requirement | Threshold |
|-------------|-----------|
| Subscribers | 500 |
| Public uploads | 3 in last 90 days |
| Watch hours | 3K in 12 months **OR** |
| Shorts views | 3M in 90 days |

**Unlocks**: Memberships, Super Chat/Thanks/Stickers, Shopping

### Full Tier (Ad Revenue)

| Requirement | Threshold |
|-------------|-----------|
| Subscribers | 1,000 |
| Watch hours | 4K in 12 months **OR** |
| Shorts views | 10M in 90 days |

**Unlocks**: Ad revenue + Premium revenue

- Review process: ~**1 month**
- Both tiers require: 2-step verification, no active strikes, linked AdSense

### `[2025]` Policy Change (July 2025)

- "Repetitious content" renamed to **"Inauthentic content"** policy
- Mass-produced / templated content risks losing monetization

## AdSense RPM by Niche

`[2025]` Creator earnings per 1K total views (US audience):

### Tier 1 (High Value)

| Niche | RPM |
|-------|-----|
| Personal Finance | $20-$40+ |
| Legal / Real Estate | $20-$35 |
| Business / Entrepreneurship | $15-$30 |
| Tech / Software | $15-$25 |
| Digital Marketing | $12-$25 |

### Tier 2 (Mid Value)

| Niche | RPM |
|-------|-----|
| Health / Fitness | $8-$15 |
| Education | $8-$15 |
| DIY | $8-$14 |
| Food / Cooking | $6-$12 |
| Travel | $6-$12 |

### Tier 3 (Lower Value)

| Niche | RPM |
|-------|-----|
| Beauty | $5-$8 |
| Gaming | $2-$5 (median US $3.50) |
| Entertainment | $2-$5 |
| Lifestyle | $3-$6 |
| Music | $1-$3 |

- **US viewers 5-8x more valuable** than SE Asian
- Finance RPM: USA $15-$25 vs India $0.50-$1.50

## Channel Memberships

| Parameter | Value |
|-----------|-------|
| Price range | $0.99-$499.99/month |
| Max tiers | 25 |
| YouTube cut | **30%** |
| Eligibility | 1K subs (500 at expanded tier) |

- Even **1% conversion** rate = significant revenue
- Start with **2-3 tiers** initially
- Case study: one creator earns **$217,000/year** from memberships alone
- Caution: paywalled content pushed to non-members frustrates viewers

## Super Chat / Thanks / Stickers

| Parameter | Value |
|-----------|-------|
| Revenue split | **70/30** (creator/YouTube) |
| Per-message range | $1-$500 |
| User weekly cap | $2K/user/week |
| Eligibility | Expanded tier (500+ subs) |

### Earnings Benchmarks

| Channel Size | Typical Monthly |
|-------------|-----------------|
| Mid-size channels | $50-$500/month |
| Case study (300K subs) | **$12,000/month** (30-45% of total revenue) |

### `[2025]` New Features

- **Jewels & Gifts** for vertical live streams
- **Super Thanks** available on Shorts

## YouTube Shopping Affiliate

| Parameter | Value |
|-----------|-------|
| Eligibility | YPP + likely **10K+ subs** (conflicting reports: 1K-15K range) |
| Countries | 12 |
| Commission range | 5-20% (median ~**15%**) |
| Products per video | Up to **60** |
| Attribution window | **30 days** |

### `[2025]` Shopping Product Stickers (June 2025)

- **40% more clicks** than standard product links

## Brand Deals

### Rate Benchmarks

| Average Views/Video | Rate per Video |
|---------------------|----------------|
| 5K-15K | $1K-$1.5K |
| 50K-250K | $1.25K-$6.25K |

- Floor is almost always **$1K+**

### Rate by Niche (per view)

| Niche | Rate per View |
|-------|---------------|
| Gaming | $0.037/view |
| Lifestyle | $0.023/view |

## FTC Disclosure Requirements

| Method | Requirement |
|--------|-------------|
| Verbal | First **15-30 seconds** of video |
| Visual text | On screen for **10+ seconds** |
| Written | First **2 lines** of description |
| YouTube toggle | Paid promotion toggle alone is **NOT sufficient** |

- Penalty: **$53,088 per violation**
- **Both brand AND creator** are liable
- AI-generated content requires **double disclosure**

## YouTube Premium Revenue

| Metric | Value |
|--------|-------|
| Global subscribers | **125M+** |
| Creator share | ~**55%** |
| Revenue contribution | **15-30%** of total for Premium-leaning channels |
| Premium Lite | $7.99/month |

## External Revenue Streams

### Digital Products

- Courses: $99 x 500 students = **$49,500**
- Platforms: Teachable, Kajabi, Gumroad

### Membership Platforms (External)

| Platform | Fee |
|----------|-----|
| Patreon | 10% + 2.9% Stripe |
| Ko-fi | Free |
| Substack | 10% |

### Affiliate Programs

| Program | Commission |
|---------|-----------|
| Amazon Associates | 1-10% |
| ClickBank / DigiStore24 | 20-75% |

### Industry Context

- Creator economy: **$127B+**
- **28.6%** of creators rank YouTube as top income platform

---

## Key Constraints & Gotchas

- YPP review takes ~1 month; plan content pipeline around the wait
- July 2025 "Inauthentic content" policy targets mass-produced/templated videos
- YouTube takes 30% of memberships and 30% of Super Chat -- factor into pricing
- Shopping affiliate eligibility threshold is unclear (reported 1K-15K subs)
- FTC penalties are $53,088 **per violation** -- both creator and brand are liable
- YouTube paid promotion toggle alone does NOT satisfy FTC requirements
- Paywalling membership content and showing it to non-members damages viewer trust
- Shorts RPM is far lower than long-form ($0.01-$0.07 typical, up to $0.30 in finance vs $2-$40+)
- US audience is 5-8x more valuable than SE Asian for ad revenue
- Super Chat has a $2K/user/week hard cap
- Premium Lite pays creators less than full Premium -- watch revenue mix
- AI content requires double disclosure under FTC rules


---

<!-- file: references/repurposing-guide.md -->

# YouTube Content Repurposing & Strategy Guide

## Table of Contents

1. [Hub/Hero/Help Model](#hubherohelp-model)
2. [Evergreen vs Trending Mix](#evergreen-vs-trending-mix)
3. [Playlist Strategy](#playlist-strategy)
4. [Series Strategy](#series-strategy)
5. [Channel Positioning & Niche](#channel-positioning--niche)
6. [Repurposing Workflows](#repurposing-workflows)
7. [Competitor Keyword Gap Analysis](#competitor-keyword-gap-analysis)
8. [Integration Architecture](#integration-architecture)
9. [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Hub/Hero/Help Model

`[2025]` Updated content pillar framework:

| Pillar | Frequency | Purpose | Examples |
|--------|-----------|---------|----------|
| **Hero** | 1-2x/year | Mass awareness, tentpole | Collabs, launches, events |
| **Hub** | Regular/episodic | Consistent audience building | Series, podcasts, weekly shows, behind-scenes |
| **Help/Hygiene** | Always-on | SEO capture, search traffic | Tutorials, how-tos, FAQs |

- Recommended mix: primarily **Hub + Help**, reserve Hero for **2-3 major moments/year**
- `[2025]` Edelman: **59% of consumers** want brands to teach them

## Evergreen vs Trending Mix

| Content Type | Target Share | Key Characteristics |
|-------------|-------------|---------------------|
| Evergreen | **70-80%** | Stays Google top 10 for **2+ years** |
| Trending | **20-30%** | Spikes views, decays fast |

- Updating evergreen content = **106%+ traffic increase**
- Educational how-tos = **42.1% retention** (highest of any format)
- Shorts freshness: older Shorts drop after **~30 days**
- Long-form evergreen is **unaffected** by freshness decay

## Playlist Strategy

| Metric | Impact |
|--------|--------|
| Watch time increase | **40%** vs unoptimized channels |
| Channel growth | **20-30%** from playlist SEO |
| Ideal playlist size | **5-10 videos** |

- Playlists rank independently in **YouTube and Google Search**
- Use **Series Playlists** feature (enforces watch order)
- Start each playlist with the **highest-performing video**
- Case study: reorganizing from "All My Content" to themed playlists = views per start from **1.2 to 3.8** within a month

## Series Strategy

- Optimal cycle: **5-7 video** series
- `[2025]` Connected content chains valued by 2025 algorithms
- Elements: consistent branding, numbering, cliffhangers, series playlists

## Channel Positioning & Niche

- **Niche-first, expand later** -- broad topics dead in 2025
- Micro-niche example: "cosmetics for everyone" narrowed to "skincare for rosacea" = audience **5x smaller** but **revenue increased**

### Phased Expansion

| Phase | Timeline | Focus |
|-------|----------|-------|
| Authority | Months 1-6 | Core niche dominance |
| Expansion | Months 7-12 | Adjacent topics |
| Diversification | Year 2+ | Broader audience |

### High-CPM Niches

| Niche | CPM Range |
|-------|-----------|
| Finance | $12+ |
| Business / SaaS | $8-$14 |
| Education | $5-$12 |
| Tech | $4-$8 |

## Repurposing Workflows

### YouTube Long-Form to Shorts

- Extract self-contained **"aha" moments**
- **"Hook-value bomb-CTA"** structure = **74% better** than continuous clips
- One **20-30 min** video = **10-20 Shorts**
- AI clipping tools reduce time **70-90%**
- **No TikTok watermarks** (algorithm suppresses them)

### YouTube to Blog

- Embed video for Google SEO value
- Add **Key Moments** via schema markup
- SEO synergy between video and written content

### YouTube to LinkedIn

- Professional angle reframe
- **150-word hook** + 3 key takeaways format

### YouTube to X (Twitter) Thread

- Hook tweet + **4-6 insight tweets** + CTA tweet

### YouTube to Email Newsletter

- Subject line A/B test
- Preview text optimization
- **200-word distillation** + video link

### YouTube to Podcast

- Works for **interview/discussion format only**
- Extract to standalone audio file

### Community Post (Same-Day)

- Image + caption + CTA
- Publish same day as video for cross-promotion

### Universal Rules

- AI tools reduce repurposing time by **70-90%**
- **No watermarks** when cross-posting between platforms
- Each platform gets a **native-format** adaptation, not a copy-paste

## Competitor Keyword Gap Analysis

### Workflow

1. Identify **3-5 competitors** in your niche
2. Export their top-performing videos
3. Identify **outliers** (3-10x their average views)
4. Reverse-engineer why outliers performed
5. Check comments for **unaddressed questions**
6. Use YouTube Analytics **"What your audience watches"** report

### Tools

| Tool | Price | Use Case |
|------|-------|----------|
| vidIQ | Free-$49/mo | Keyword research, competitor tracking |
| OutlierKit | **$9/mo** | Outlier video detection |
| TubeBuddy | Free-$49/mo | Keyword explorer, A/B testing |

## Integration Architecture

### API Access Tiers

| Data Type | API | Auth | Notes |
|-----------|-----|------|-------|
| Public data | Data API v3 | API key | **10K units/day** quota |
| Search queries | Data API v3 | API key | **100 units** per search call |
| Own analytics | Analytics API | OAuth | Channel owner only |
| Bulk export | Reporting API | OAuth | Channel owner only |
| Competitor public data | Data API + Social Blade | API key | No private metrics |
| Keyword trends | DataForSEO Google Trends | API key | `type: youtube` parameter |
| SERP data | DataForSEO YouTube SERP API | API key | -- |
| Transcripts | MCP servers | Varies | Third-party tools |

### Limitations

- **No competitor private data** accessible via any API
- **TubeBuddy and vidIQ have zero public APIs**
- Data API quota resets daily at Pacific midnight

---

## Key Constraints & Gotchas

- Broad/general channels are dead in 2025 -- niche-first is mandatory
- Shorts older than ~30 days lose algorithmic push; long-form evergreen is unaffected
- Playlists rank independently -- treat them as SEO assets, not just organization
- "Hook-value bomb-CTA" structure for Shorts outperforms raw clips by 74%
- No TikTok watermarks on any cross-posted content
- TubeBuddy and vidIQ have no APIs -- cannot automate their data
- Data API quota is 10K units/day; search costs 100 units per call (max 100 searches/day)
- Competitor private analytics (retention, RPM, CTR) are never accessible
- Updating old evergreen content can yield 106%+ traffic increase -- do not just publish and forget
- Micro-niching can shrink audience 5x but increase revenue -- smaller is often better
- Series playlists enforce watch order; regular playlists do not


---

<!-- file: references/retention-scripting-guide.md -->

# Retention & Scripting Guide

## Table of Contents

- [Hook Framework](#hook-framework)
- [Hook Benchmarks](#hook-benchmarks)
- [Pattern Interrupts](#pattern-interrupts)
- [Energy Patterns](#energy-patterns)
- [Optimal Video Length by Format](#optimal-video-length-by-format)
- [Retention Graph Diagnosis](#retention-graph-diagnosis)
- [Algorithmic Promotion Thresholds](#algorithmic-promotion-thresholds)
- [CTA Placement & Conversion](#cta-placement--conversion)
- [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Hook Framework

### Viewer Loss Data

- **55%** of viewers lost in the first 60 seconds
- **20%** lost in the first 10 seconds
- Videos with a **value proposition in the first 15 seconds** = 18% higher retention at the 1-minute mark

### Hook Structure (First 30 Seconds)

| Timestamp | Purpose | Action |
|-----------|---------|--------|
| 0:00-0:05 | Attention grab | Visual/verbal pattern break, bold claim, or unexpected moment |
| 0:05-0:15 | Clarify promise | State exactly what the viewer will get |
| 0:15-0:30 | Stakes/context | Why this matters, what they'll miss |

---

## Hook Benchmarks

| Metric | Threshold | Assessment |
|--------|-----------|------------|
| Retention at 10-15s | Below 50% | Hook is failing |
| Retention at 30s | 70%+ | Solid |
| Retention at 30s | 80%+ | Exceptional |

- **Never open with** "Hey guys welcome back" -- causes instant, measurable drop-off

---

## Pattern Interrupts

### Impact Data

- Pattern interrupt in **first 5 seconds** = **23% higher retention**
- Strategic breaks at drop-off points = **15-22% re-engagement** (Wistia)
- Adobe tutorials using pattern interrupts = **43% higher completion**

### Recommended Frequency

| Format | Interrupt Frequency |
|--------|-------------------|
| Pre-recorded | Every 30 seconds |
| Live | Every 2-3 minutes |
| Shorts | Every 2-3 seconds |

### Interrupt Types

- Camera angle change
- Sound effects / music shift
- Text pop-ups / lower thirds
- Unexpected facts or stats
- Format shifts (talking head to B-roll, screen share to whiteboard)

---

## Energy Patterns

Source: AIR Media-Tech, 5 documented patterns

| Pattern | Description | Best For |
|---------|-------------|----------|
| **Gradual Slowdown** | High energy open, gradually decreasing | Short content, impact pieces |
| **Calm-Burst Oscillation** | 15-25s calm, then energy burst every 2-3 min | Educational, tutorials |
| **Anchor Pattern** | Return to core thesis every 2-3 min | Long-form essays, explainers |
| **Strategic Pauses** | Deliberate silence/slowdown before key points | Storytelling, dramatic content |
| **Progressive Energy** | High first 3 min, stabilize, mix variety after min 8 | Vlogs, entertainment |

---

## Optimal Video Length by Format

| Format | Optimal Length | Notes |
|--------|---------------|-------|
| Tutorials | 7-15 min | Step-by-step pacing |
| Entertainment / Vlogs | 8-12 min | Energy management critical |
| Educational | 15-25 min | Anchor pattern recommended |
| Gaming (edited) | 10-20 min | Pattern interrupts essential |
| Product reviews | 8-15 min | Front-load verdict for retention |
| Podcasts | 30-90 min | Calm-Burst Oscillation works well |
| Shorts | 15-30s | Peak completion rate range |

### Length vs Performance

- **5-10 min** = peak retention at **31.5%**
- **Shorts** account for **75% of views** on the platform
- Videos **20+ min** capture **57% of total watch time**
- **8-minute threshold** unlocks mid-roll ads = ~**50% revenue increase**

---

## Retention Graph Diagnosis

| Pattern | Visual Shape | Diagnosis | Fix |
|---------|-------------|-----------|-----|
| **Sharp cliff** | 20%+ lost in first 15s | Hook failure | Rebuild 0:00-0:15 |
| **Steady decline** | Gradual downward slope | Normal/expected | Optimize pacing |
| **Mid-video valley** | Dip at 40-60% mark | Pacing issue | Add pattern interrupt or reorder content |
| **Spikes/bumps** | Upward blips | Rewatch moments | Create more of these intentionally |
| **Suspension bridge** | High retention through open loops | Excellent scripting | **68% higher completion** |
| **Sawtooth** | Zigzag from pattern interrupts | Active re-engagement | **43% higher completion** |

---

## Algorithmic Promotion Thresholds

- Videos outperforming channel average retention by **15%+** receive **2.3x more algorithmic promotion**
- A **10 percentage point retention improvement** = **25%+ impression increase**
- **AI narration** = **70% lower retention** vs human-fronted content

---

## CTA Placement & Conversion

### Viewer Reach Data

- Only **16%** of viewers reach the final 10% of a video
- At **~1 min mark**: ~60% of viewers still watching
- At **~4 min mark**: ~35% of viewers still watching

### Best Practices

| Strategy | Impact |
|----------|--------|
| Place CTA after first value delivery (1-3 min) | Catches majority of viewers |
| Embedded CTAs (visual + verbal) | **380% conversion increase** over verbal-only |
| With CTA: 1 sub per 33 views | **2.5x better** than without CTA (1 per 83 views) |
| "Join the family" vs "subscribe" | **150% growth boost** |

### Dual CTA Strategy

- **First CTA** at ~1 min = reaches ~60% of viewers
- **Second CTA** at ~4 min = reaches ~35% of viewers
- Never save the only CTA for the end (only 16% see it)

---

## MrBeast Principles (Validated at Scale)

Source: MrBeast interviews (100M+ views per video average)

### The 100-Video Rule
Your first videos will be terrible. Commit to making 100 videos and improving one
specific thing each time -- script, editing, camera presence, pacing. Micro-improvements
compound exponentially. Do not expect results before video ~50.

### Deliver on the Promise Immediately
The title and thumbnail set a promise. In the first 5-10 seconds, **instantly assure
the viewer you are delivering on that promise**. No vlog intros, no "hey guys",
no talking about your day. Deliver what they clicked for, then promise even more
to exceed expectations.

### Ruthless Pacing & Final Payoff
- Remove every dull moment. Have critical friends roast your video to find dead spots.
- Use different camera angles and fast cuts to maintain visual stimulation.
- Ensure a **strong payoff at the end** (reveal, winner, result) so viewers have a
  compelling reason to stay until the last second -- this directly boosts AVD.
- The algorithm replaces "algorithm" with "audience" -- if people click and watch, YouTube promotes it.

### Auto-Play Era (2025+)
Videos now auto-play on the YouTube homepage. The first 5 seconds serve as an
extension of your thumbnail -- you must visually convince people to stay while
the video is already playing. This makes the 0:00-0:05 hook more critical than ever.

### Outlier Analysis Method
Don't rely on guesswork. Look for outlier videos from smaller channels that
suddenly get 10x-1000x their normal views. Analyse what made that specific video
work. Study A/B thumbnail tests from successful creators in your niche.

---

## Key Constraints & Gotchas

- **55% of viewers leave in the first 60 seconds** -- the hook is the single highest-leverage optimization
- **"Hey guys welcome back"** is a measurable retention killer -- avoid channel-first openings entirely
- **AI narration drops retention by 70%** -- always prefer human-fronted content unless the channel is explicitly AI-themed
- **Only 16% reach the final 10%** of a video -- any CTA placed only at the end is seen by a fraction of viewers
- **8-minute mark unlocks mid-roll ads** but do not pad content to reach it -- retention loss from padding costs more than mid-roll revenue gains
- **Pattern interrupt frequency differs by format** -- every 30s for pre-recorded is aggressive but data-supported; live content needs longer intervals (2-3 min)
- **15%+ above channel average retention** is the threshold for algorithmic boost -- optimize your best-performing content types, not underperformers
- **Shorts optimal length is 15-30s** for completion rate, even though 3-minute Shorts are now allowed `[2025]`
- **The suspension bridge pattern (open loops)** delivers the highest completion rate improvement (68%) -- prioritize open-loop scripting over other techniques


---

<!-- file: references/seo-playbook.md -->

# YouTube SEO Playbook

## Table of Contents

- [Title Optimization](#title-optimization)
- [Description Structure](#description-structure)
- [Tags](#tags)
- [Chapters & Timestamps](#chapters--timestamps)
- [Hashtags](#hashtags)
- [Captions & Transcription](#captions--transcription)
- [Cards & End Screens](#cards--end-screens)
- [VideoObject Schema Markup](#videoobject-schema-markup)
- [YouTube Search vs Google Search](#youtube-search-vs-google-search)
- [Keyword Research Tools](#keyword-research-tools)
- [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Title Optimization

| Property | Value |
|----------|-------|
| Hard character limit | 100 characters |
| Desktop truncation | ~60-70 characters |
| Mobile truncation | ~40-50 characters |
| Front-load keyword | First 40-50 characters |

### Performance Data

- **70-100 character titles** outperform shorter titles by **10-14%** (10xCreator, 3M+ videos analyzed)
- **Numbers in titles** = +20-30% CTR
- **Brackets** add useful context (e.g., `[2025 Update]`, `[Step-by-Step]`)

### Clickbait Penalty `[2025]`

- Official rollout: late 2024, India first, then global
- **Gemini AI** compares actual video content against title/thumbnail metadata
- Misleading titles are actively suppressed

---

## Description Structure

| Property | Value |
|----------|-------|
| Max length | 5,000 characters |
| Visible before "Show more" | First 150-200 characters |
| Primary keyword placement | First 25 words |

### Recommended Structure

| Section | Content |
|---------|---------|
| Lines 1-3 | Primary keyword + hook (visible in preview) |
| Next block | Timestamps/chapters |
| Body | 200-350 words, keyword appears 2-4x |
| Links | Relevant resources, social |
| CTA | Subscribe, comment prompt |
| Closing | 3 hashtags |

- `[2025]` **29.5%** of Google AI Overviews cite YouTube (BrightEdge, mid-2025)

---

## Tags

- **Status**: Vestigial -- minimal ranking impact
- **Limit**: 500 characters, spend max 30 seconds
- `[2025]` Gemini analyzes actual video content now, not tags

### Only Use Tags For

- Common misspellings of your topic
- Disambiguation (when your topic has multiple meanings)
- Brand-new channels with no content history

---

## Chapters & Timestamps

| Requirement | Value |
|-------------|-------|
| Must start at | 0:00 |
| Minimum chapters | 3 |
| Minimum chapter length | 10 seconds each |

### Impact

- Enables **Google Key Moments** in search results
- **25%+** of Google search results include video snippets
- **4% higher AVD** (Backlinko)
- **Retention up to 50% higher** with timestamps (HubSpot)
- Use keyword-rich chapter labels

---

## Hashtags

| Context | Optimal Count | Max Before Ignored |
|---------|--------------|-------------------|
| Regular videos | 3-5 | 15 (exceeding = ALL ignored) |
| Shorts | 1-5 | 60 total characters |

- First 3 hashtags appear **above the video title**
- Exceeding 15 hashtags causes YouTube to ignore ALL of them

---

## Captions & Transcription

- **12% longer watch time** with captions enabled
- **80%** of caption users are not deaf (accessibility + comprehension)
- Manual SRT uploads rank better for indexing than auto-captions
- **Say target keywords naturally** on camera -- YouTube transcribes audio as SEO signals

---

## Cards & End Screens

- Cards and end screens **do not directly affect ranking**
- End screen CTR benchmarks:
  - **2%+** = healthy
  - **4%+** = strong
- Optimal placement: last **15-20 seconds** of video
- End screens can **double post-viewing engagement**

---

## VideoObject Schema Markup

### Required Properties

| Property | Description |
|----------|-------------|
| `name` | Video title |
| `thumbnailUrl` | Thumbnail image URL |
| `uploadDate` | ISO 8601 date |

### Performance

- `[2025]` **30% higher CTR** with VideoObject schema (Backlinko 2025)
- Use **JSON-LD** format
- Add **Clip** and **SeekToAction** markup for chapter-level rich results
- Since late 2023: video must be **main content** of the page for rich snippets (not sidebar embeds)

---

## YouTube Search vs Google Search

| Factor | YouTube Search | Google Search |
|--------|---------------|---------------|
| Primary ranking signal | Retention & satisfaction | Information delivery |
| Content priority | Watch time, engagement | Relevance, authority |

### Video-Trigger Keywords (Appear in Google Video Results)

- "how to", "tutorial", "review", "vs", "explained"

### Discovery Tool

- Use **Google Trends** with **YouTube Search filter** for keyword demand validation

---

## Keyword Research Tools

| Tool | Best For | Price |
|------|----------|-------|
| **vidIQ** | Research quality, keyword scoring | $17.50/mo |
| **TubeBuddy** | A/B testing integration | $2.25/mo |
| **YouTube Studio Research** | Own channel analytics | Free |
| **Google Trends (YouTube filter)** | Trend validation | Free |

- Neither vidIQ nor TubeBuddy has a public API
- `[2025]` Jan 2026 Search Filter Update for long-tail keywords (unconfirmed -- mentioned in community reports, not officially documented)

---

## Key Constraints & Gotchas

- **Mobile truncates titles at ~40-50 chars** -- if the keyword or hook isn't in that range, mobile viewers miss it
- **Exceeding 15 hashtags causes ALL hashtags to be ignored** -- not just the extras
- **Tags are effectively dead** -- spending more than 30 seconds on them is wasted effort. Gemini reads video content directly `[2025]`
- **Description keyword stuffing hurts** -- 2-4x keyword density in 200-350 words is the ceiling
- **First 150-200 chars of description** are all viewers see before clicking "Show more" -- treat them as ad copy
- **VideoObject schema only works** when the video is the main page content (since late 2023)
- **Clickbait penalty is AI-enforced** `[2025]` -- Gemini compares metadata to actual content. No manual review needed to trigger suppression
- **Auto-captions are inferior** to manual SRT for SEO indexing
- **Chapters require 0:00 start** -- omitting it disables the entire chapter system
- **Google AI Overviews increasingly cite YouTube** (29.5%, BrightEdge mid-2025) -- optimize descriptions for Google, not just YouTube search


---

<!-- file: references/shorts-playbook.md -->

# YouTube Shorts Playbook

## Table of Contents

1. [Algorithm: Explore & Exploit](#algorithm-explore--exploit)
2. [Signal Hierarchy](#signal-hierarchy)
3. [Format & Specs](#format--specs)
4. [SEO & Discovery](#seo--discovery)
5. [Impact on Long-Form](#impact-on-long-form)
6. [Monetisation](#monetisation)
7. [View Counting (March 2025)](#view-counting-march-2025)
8. [Repurposing to/from Shorts](#repurposing-tofrom-shorts)
9. [Key Analytics](#key-analytics)
10. [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## Algorithm: Explore & Exploit

- **Explore phase**: seed audience test with small cohort
- **Exploit phase**: triggered if early engagement is strong (past first 5 seconds)
- Scales progressively once in exploit phase
- A Short can take off as late as **day 4** after upload
- CTR plays almost **no role** -- swipe-away rate is the primary surface signal

## Signal Hierarchy

| Priority | Signal | Benchmark |
|----------|--------|-----------|
| 1 | Completion / retention | **70%+ = aggressive promotion** |
| 2 | Loop / replay rate | Heavily weighted by algorithm |
| 3 | Comments and shares | More weight than likes |
| 4 | Viewed vs Swiped Away | **75%+ good; below 50% = broken hook** |
| 5 | Satisfaction signals | Surveys, long-press interest |

## Format & Specs

| Parameter | Value |
|-----------|-------|
| Max length | 3 min (Oct 2024) |
| Sweet spot | **15-60 seconds** |
| Bimodal peaks | **13s or 60s** (35B views study) |
| Aspect ratio | 9:16 |
| Resolution | 1080x1920 |
| Captions | Essential |
| Visual change cadence | Every **3 seconds** |
| Hook window | First **1-3 seconds** |

### Length by Content Type

| Type | Ideal Length | Expected Completion |
|------|-------------|---------------------|
| Quick tips | 15-20s | 85-95% completion |
| Tutorials | 25-40s | -- |
| Loopable content | Any (favored by algorithm) | >100% avg viewed = loops |

- Content ID music blocks **1-3 min** Shorts worldwide

## SEO & Discovery

- **~40 characters** visible before title truncation
- Optimal title: **4-6 words, 20-40 characters**
- Use **3-5 hashtags**
- First **125 characters** of description shown in previews
- Thumbnails irrelevant in feed (Shorts auto-play)
- Shorts appear in **YouTube Search AND Google mobile** results

## Impact on Long-Form

| Metric | Value |
|--------|-------|
| Audience overlap with long-form | ~10% |
| "Related video" linking conversion | <1% |
| Growth boost (channels using both) | **40-60% faster** |

- MacDannyGun case study: **670K subs** through Shorts, resulting in **10x long-form views**
- `[2025]` Tubefilter/Digital i (Feb 2025): **no cannibalization** in US market
- Caveat: home feed reducing long-form real estate

## Monetisation

### Revenue Flow

1. Revenue pooling across all Shorts
2. Music licensing allocation deducted
3. Distributed by engaged view share
4. Creator keeps **45%**

### Music Track Impact on Revenue

| Tracks Used | Creator Revenue Share |
|-------------|----------------------|
| No music | 100% of pool allocation |
| 1 track | 50% |
| 2 tracks | 33% |

### RPM Ranges

| Niche | RPM per 1K Views |
|-------|-------------------|
| Finance | $0.05-$0.30 |
| Comedy / Lifestyle | $0.01-$0.05 |
| Typical range | $0.01-$0.07 (finance: up to $0.30) |

- **1M views ~ $10-$70** (finance: up to $300)
- `[2025]` vidIQ: **150% RPM increase** in 2025
- `[2025]` Shorts = **22% of YouTube total ad revenue** (up from 15% in 2024)

## View Counting (March 2025)

- `[2025]` **Any playback = 1 view** (changed March 2025)
- Loops count as **additional views**
- **Engaged Views** = separate metric (retained attention)
- Total views inflated **~30%** compared to pre-March counts

## Repurposing to/from Shorts

- Extract self-contained **"aha" moments** from long-form
- **"Hook-value bomb-CTA"** structure performs **74% better** than continuous clips
- One **20-30 min** video = **10-20 Shorts**
- AI clipping tools reduce production time **70-90%**
- **No TikTok watermarks** (suppressed by algorithm)
- Use Shorts to **test hooks**, then turn best performers into long-form

## Key Analytics

| Metric | What It Tells You |
|--------|-------------------|
| Viewed vs Swiped Away | Replaces CTR for Shorts |
| Average % Viewed | >100% = loops (viral quality) |
| Shown in Feed | True algorithmic reach |

### The 60% Rule

- If **Viewed vs Swiped Away** is under **60%**, test a new opening immediately

### `[2025]` Freshness Prioritization (September 2025)

- Algorithm deprioritizes Shorts older than **~28-30 days**

---

## Key Constraints & Gotchas

- CTR is irrelevant for Shorts -- focus on **swipe-away rate** instead
- Content ID music blocks kill 1-3 min Shorts globally
- No TikTok watermarks -- algorithm suppresses them
- March 2025 view counting change inflates totals ~30%; use **Engaged Views** for accuracy
- September 2025 freshness decay: Shorts lose algorithmic push after ~28-30 days
- Revenue is pooled, not per-video -- music tracks directly reduce your share
- 10% audience overlap means Shorts and long-form serve mostly **different audiences**
- Hook must land in 1-3 seconds; visual changes every 3 seconds minimum
- Title truncation at ~40 chars -- front-load keywords
- Completion rate is king: 70%+ triggers aggressive promotion


---

<!-- file: references/thumbnail-ctr-guide.md -->

# Thumbnail & CTR Guide

## Table of Contents

- [CTR Benchmarks by Niche](#ctr-benchmarks-by-niche)
- [CTR Lifecycle](#ctr-lifecycle)
- [Face Thumbnails](#face-thumbnails)
- [Visual Design Rules](#visual-design-rules)
- [Thumbnail Specifications](#thumbnail-specifications)
- [A/B Testing](#ab-testing)
- [Information Split Rule](#information-split-rule)
- [Mobile Optimization](#mobile-optimization)
- [Suppression Triggers & Strikes](#suppression-triggers--strikes)
- [High-CTR Title Formulas](#high-ctr-title-formulas)
- [Key Constraints & Gotchas](#key-constraints--gotchas)

---

## CTR Benchmarks by Niche

Source: Focus Digital, December 2025 `[2025]`

| Niche | Average CTR |
|-------|-------------|
| Gaming | 8.5% |
| Health & Fitness | 8.0% |
| Tech & Reviews | 7.5% |
| Beauty & Fashion | 6.5% |
| Entertainment | 6.0% |
| Finance & Business | 5.5% |
| Education | 4.5% |

---

## CTR Lifecycle

- **Highest CTR** occurs in the first 24 hours (warm/subscribed audience)
- **Sustained 4-8% CTR** across expanding audience reach = healthy performance
- CTR naturally drops as the video reaches colder audiences -- this is expected behavior

---

## Face Thumbnails

- Faces in thumbnails = **+20-30% CTR** (vidIQ)
- Face thumbnails average **921,000 more views** per video (AmpiFire)
- **Strong emotion required** -- neutral expressions underperform
- Exaggerated but authentic expressions work best

---

## Visual Design Rules

| Rule | Specification |
|------|--------------|
| Text overlay | 5 words max (ideally 3) |
| Color palette | 2-3 primary colors for brand consistency |
| Viewer decision time | Less than 1 second |
| Custom thumbnail usage | 90% of top-performing videos (YouTube Creator Academy) |
| Negative space | 30-40% of thumbnail area |
| Focal points | One clear focal point |

---

## Thumbnail Specifications

| Property | Value |
|----------|-------|
| Minimum resolution | 1280x720 |
| Recommended resolution | 1920x1080 (optimized for TV) |
| Aspect ratio | 16:9 |
| File formats | JPG, PNG, GIF, BMP |
| Max file size | 2MB |

---

## A/B Testing

Available through YouTube Studio (rolled out mid-2024)

| Feature | Detail |
|---------|--------|
| Max variants | Up to 3 thumbnails |
| Optimization metric | Watch time share (not just CTR) |
| Test duration | Up to 2 weeks |
| Result categories | Winner / Same / Inconclusive |
| Platform | Desktop-only setup |
| Restrictions | Not available for Shorts or kids content |

### Impact Data

- CTR improvements of **37% to 110%** in documented case studies
- A **0.5% CTR difference** is significant when measured over millions of impressions
- `[2025]` **Title A/B testing** added late 2024

---

## Information Split Rule

- **Thumbnail** = visual and emotional hook
- **Title** = keyword + promise
- **Never duplicate text** between thumbnail and title
- Each element should contribute unique information that together create a compelling click proposition

---

## Mobile Optimization

- **70%+ of views** come from mobile devices
- Design thumbnails at **1280x720 minimum** (1920x1080 for TV viewing)
- Always **test at mobile feed size** -- details invisible at small scale are wasted
- **Front-load title hook** in first 45 characters (mobile truncation)

---

## Suppression Triggers & Strikes

### Thumbnail Violations That Trigger Suppression

- Nudity / sexual content
- Violence / graphic imagery
- Misleading content (clickbait penalty)
- Hate speech
- Child safety violations
- Vulgar text

### Strike System

| Event | Consequence |
|-------|-------------|
| First violation | Warning (expires after 90 days) |
| Same policy violation within 90 days | Strike |
| 3 strikes | Channel termination |
| Pornographic thumbnails | **Immediate termination** (no warnings) |

- `[2025]` 2024-2025: Active crackdown on clickbait thumbnails for breaking news content

---

## High-CTR Title Formulas

| Formula | Example |
|---------|---------|
| **Dense Value + Time Compression** | "30 Years of Investing in 30 Minutes" |
| **System / Framework** | "The Blueprint for Building a $1M Channel" |
| **Searchable + Clickable Hybrid** | "[Keyword]: [Benefit/Curiosity Hook]" |
| **Contradiction + Promise** | "Why Working Less Made Me More Productive" |
| **How I + Specific Result + Timeframe** | "How I Got 100K Subscribers in 6 Months" |
| **Bracketed Context** | "Complete Guide to YouTube SEO [2025 Update]" |

### Title Strategy by Traffic Source

| Traffic Source | Title Style |
|---------------|-------------|
| Search traffic | Keyword-heavy, direct |
| Browse traffic | Curiosity-driven, emotional |

---

## MrBeast Thumbnail Principles

Source: MrBeast methodology (validated at 100M+ views/video scale)

- **Titles under 50 characters** -- longer titles get cut off with "..." on mobile, killing curiosity
- **Spark intense curiosity** -- the thumbnail should be so interesting a viewer would "lie awake wondering what happened" if they didn't click
- **Auto-play adaptation** -- because videos auto-play on the homepage (2025+), the first 5 seconds of video are now an extension of the thumbnail. Design thumbnails that create a visual question the video's opening answers.
- **Outlier-driven A/B testing** -- study thumbnail A/B tests from successful creators in your niche to see exactly what visual layouts and concepts drive clicks. Data beats intuition.

---

## Key Constraints & Gotchas

- **Viewers decide in under 1 second** -- if the thumbnail doesn't communicate instantly, it fails regardless of quality
- **Never duplicate information** between thumbnail text and title -- this wastes one of your two persuasion surfaces
- **A/B testing optimizes for watch time share, not CTR** -- a lower-CTR thumbnail can win if it attracts viewers who watch longer
- **Desktop-only A/B setup** -- you cannot A/B test thumbnails for Shorts or kids content
- **0.5% CTR difference matters** at scale -- do not dismiss small A/B test margins on high-impression videos
- **Exceeding 5 words on thumbnail text** reduces readability at mobile sizes where 70%+ of views occur
- **Pornographic thumbnails cause immediate channel termination** -- no warning, no strike, no appeal
- **Clickbait suppression is now AI-enforced** `[2025]` -- Gemini compares thumbnail/title claims against actual video content
- **Face thumbnails require strong emotion** -- a neutral face performs worse than no face at all
- **CTR drops as reach expands** -- a declining CTR over days is normal; sustained 4-8% across broader audiences is the real benchmark
- **Design for 1920x1080** even though 1280x720 is the minimum -- TV/CTV viewing is growing and low-res thumbnails look poor on large screens
- **30-40% negative space** is essential -- cluttered thumbnails lose the focal point at small sizes


---

<!-- file: sub-skills/analyze.md -->

# Analyze Sub-Skill

This sub-skill interprets raw YouTube channel analytics data — whether from screenshots, CSV exports, or verbally described metrics — and transforms it into a structured diagnosis of channel health with a prioritised action plan. It maps data points to known algorithm signals, identifies funnel leaks, classifies retention patterns, and produces maximum 5 high-impact actions the creator can execute immediately.

## Inputs Required

- **Channel analytics data** (any format): YouTube Studio screenshots, CSV/spreadsheet data, or described metrics (views, CTR, watch time, retention %, traffic sources, subscriber changes, revenue)
- **Time period** (optional): date range for the data (defaults to last 28 days)
- **Channel niche** (optional): for benchmarking against niche averages
- **Specific concerns** (optional): areas the creator wants focused attention on

## Reference Files to Load

- `references/analytics-guide.md`
- `references/algorithm-guide.md`

## DataForSEO Research (When Available)

Enhance analytics interpretation with external data:

1. **YouTube SERP check**: For the channel's key videos, run `serp_youtube_organic_live_advanced` with their target keywords to check if they appear in search results. A video with low views but no SERP presence = SEO problem; a video in top 5 SERP but low views = keyword demand problem.
2. **Video deep-dive**: Use `serp_youtube_video_info_live_advanced` on specific videos the user wants analysed to get full metadata, engagement metrics, and tags.
3. **Keyword validation**: If the user provides video topics, run `dataforseo_labs_google_keyword_overview` to check if those keywords have real search demand. Low-demand keywords explain low search traffic.

**Fallback:** If DataForSEO is unavailable, rely on user-provided analytics data and WebSearch for contextual benchmarks.

**Efficiency:** Typical analysis costs ~$0.008 (2-4 API calls).

## Parallel Agents

Not required. Execute sequentially.

## Step-by-Step Execution

1. Load both reference files. Internalise metric benchmarks, algorithm signals, retention pattern classifications, and traffic source implications.
2. Extract all available metrics from the provided data. Normalise into a consistent format regardless of input type (screenshot, CSV, or verbal).
3. Build the funnel diagnosis: Impressions to CTR to Views to Watch Time. Calculate each conversion step and identify where the biggest drop-off occurs. Cross-reference CTR and watch time benchmarks from the analytics guide.
4. Classify retention graph patterns. If retention data is available, match each video's curve to known types: cliff (hook failure within first 30 seconds), valley (pacing issue at a specific point), bump (rewatch segment), suspension bridge (strong open and close, dip in middle), sawtooth (repeated engagement spikes), steady decline (normal healthy pattern). Provide specific timestamps where issues occur if visible.
5. Analyse traffic source distribution. Calculate percentage from each source (Browse, Search, Suggested, External, Shorts feed, etc.). Flag over-reliance on any single source (above 60%). Map traffic source health to algorithm signals — is the algorithm actively recommending this channel? If DataForSEO is available, cross-reference with `serp_youtube_organic_live_advanced` to check whether the channel's videos appear in YouTube search results for their target keywords — this explains search traffic share.
6. Identify content performance outliers. Find the best and worst performing videos by views, CTR, and watch time. Extract patterns: what topic, format, length, thumbnail style, title structure, and upload timing correlate with high or low performance.
7. If revenue data is available, perform RPM analysis. Compare channel RPM to niche benchmarks. Identify which video types or topics earn disproportionately higher RPM and why.
8. Synthesise findings into a priority action list of maximum 5 items, ranked by impact-to-effort ratio.

## Output Template

```markdown
## Channel Analytics Report

**Period**: [Date range]
**Data sources**: [Screenshots / CSV / Described metrics]

---

### 1. Funnel Diagnosis

| Stage | Value | Benchmark | Status |
|-------|-------|-----------|--------|
| Impressions | [N] | — | [Trend: up/down/flat] |
| CTR | [X%] | [Niche avg: Y%] | [Above/Below/At benchmark] |
| Views | [N] | — | [Trend] |
| Avg Watch Time | [M:SS] | — | [Trend] |
| Avg % Viewed | [X%] | [Niche avg: Y%] | [Above/Below] |

**Primary funnel leak**: [Stage where biggest drop-off occurs]
**Diagnosis**: [Why this leak is happening — specific, evidence-based]

---

### 2. Retention Patterns

| Video | Pattern Type | Key Moment | Interpretation |
|-------|-------------|------------|----------------|
| "[Title]" | [Cliff/Valley/Bump/etc.] | [Timestamp] | [What happened and why] |
| ... | ... | ... | ... |

**Recurring pattern**: [If multiple videos share the same retention issue, call it out]
**Fix**: [Specific action to address the dominant retention pattern]

---

### 3. Traffic Source Health

| Source | Share | Trend | Health Signal |
|--------|-------|-------|---------------|
| Browse Features | [X%] | [Up/Down/Flat] | [Algorithm actively recommending / Not recommending] |
| YouTube Search | [X%] | ... | ... |
| Suggested Videos | [X%] | ... | ... |
| External | [X%] | ... | ... |
| Shorts Feed | [X%] | ... | ... |
| Other | [X%] | ... | ... |

**Over-reliance warning**: [Flag if any source exceeds 60%]
**Algorithm health**: [Overall assessment — is YouTube pushing this channel?]

---

### 4. Content Performance Outliers

**Top performers**:
| Video | Views | CTR | Watch Time | Why It Worked |
|-------|-------|-----|------------|---------------|
| "[Title]" | [N] | [X%] | [M:SS] | [Specific factors] |
| ... | ... | ... | ... | ... |

**Underperformers**:
| Video | Views | CTR | Watch Time | Why It Underperformed |
|-------|-------|-----|------------|----------------------|
| "[Title]" | [N] | [X%] | [M:SS] | [Specific factors] |
| ... | ... | ... | ... | ... |

**Patterns**: [Common traits of winners vs losers — topic, format, length, thumbnail, timing]

---

### 5. Revenue Analysis
> *(included only if revenue data is provided)*

| Metric | Value | Niche Benchmark |
|--------|-------|-----------------|
| Channel RPM | $[X.XX] | $[Y.YY] |
| Monthly Revenue | $[N] | — |
| Top Earning Video | "[Title]" — $[N] | — |

**High-RPM content types**: [Which formats/topics earn disproportionately more]
**Revenue opportunity**: [Untapped revenue potential based on current traffic]

---

### 6. Priority Action List

| # | Action | Why | How to Measure | Timeline |
|---|--------|-----|----------------|----------|
| 1 | [Highest impact action] | [Evidence from data] | [Specific metric to track] | [This week / This month] |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... |

**Impact-to-effort ranking**: Actions are ordered by expected improvement per hour of effort.
```

## Quality Criteria

- Every diagnosis must be tied to specific data points, never generic advice
- Funnel diagnosis identifies exactly one primary leak with evidence
- Retention patterns use the correct classification names from the analytics guide
- Traffic source percentages must sum to approximately 100%
- Over-reliance warnings trigger at 60%+ from a single source
- Content outlier analysis explains WHY, not just WHAT
- Action list is capped at 5 items — no padding with low-impact actions
- Each action includes a measurable outcome and timeline
- Revenue analysis uses realistic niche RPM benchmarks from the monetization guide
- If data is incomplete, explicitly state what is missing and how it limits the analysis


---

<!-- file: sub-skills/audit.md -->

# Channel Health Audit

This sub-skill performs a comprehensive channel health audit by spawning four parallel analysis agents — Technical SEO, Performance, Content Strategy, and Monetisation — each loading dedicated reference material, then synthesizing their findings into a scored report card with prioritized fixes and a concrete 30-day action plan.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Channel URL/handle | Yes | YouTube channel URL or @handle |
| Channel niche | Yes | Primary content category (e.g., tech reviews, cooking, fitness) |
| Channel size tier | Yes | Nano (<1K), Micro (1K-10K), Small (10K-100K), Mid (100K-500K), Large (500K-1M), Mega (1M+) |
| Primary goal | Yes | Growth, monetisation, authority, community, or hybrid |

## Reference Files

- `references/seo-playbook.md` (Agent A)
- `references/analytics-guide.md` (Agent B)
- `references/algorithm-guide.md` (Agent C)
- `references/monetization-guide.md` (Agent D)

## DataForSEO Research (When Available)

DataForSEO significantly enhances audit depth with live YouTube and keyword data:

1. **YouTube SERP positioning**: For each of the channel's recent video topics, run `serp_youtube_organic_live_advanced` to check if the channel's videos actually appear in YouTube search results. This reveals SEO effectiveness.
2. **Video intelligence**: Use `serp_youtube_video_info_live_advanced` on the channel's recent videos to get full metadata including tags, category classification, and engagement ratios — richer than the YouTube Data API alone.
3. **Keyword coverage audit**: Extract keywords from the channel's video titles, batch into `kw_data_google_ads_search_volume` to see if the channel targets high-demand keywords or wastes effort on zero-volume terms.
4. **Keyword difficulty**: Run `dataforseo_labs_bulk_keyword_difficulty` on the channel's target keywords to assess if they're targeting achievable keywords for their authority level.
5. **Competitor benchmarking**: Use `serp_youtube_organic_live_advanced` on the channel's core keywords to see who else ranks — identify if competitors are dominating the same keyword space.

**Fallback:** If DataForSEO is unavailable, use `execution/fetch_channel_data.py` and WebSearch for competitive context.

**Efficiency:** Typical audit costs ~$0.04 (8-15 API calls). Use batch endpoints for keywords.

## Parallel Agent Architecture

This skill MUST use 4 parallel agents. Launch all four simultaneously using the Agent tool. Do NOT run them sequentially.

### Agent A: Technical SEO Audit
- **Loads**: `references/seo-playbook.md`
- **Scope**: Last 20 videos
- **Analyzes**: Title keyword placement and length, description structure (first 150 chars, links, hashtags), tag coverage and relevance, chapter/timestamp presence and keyword density, hashtag usage (count, relevance, branded vs generic), thumbnail text presence (inferred from titles), metadata completeness score per video
- **Outputs**: SEO score (A-F), list of specific deficiencies, top 5 quick metadata fixes

### Agent B: Performance Analysis
- **Loads**: `references/analytics-guide.md`
- **Scope**: Channel-level and per-video metrics
- **Analyzes**: CTR vs niche benchmarks (reference file provides benchmarks by category), average view duration vs 40% video length threshold, impressions-to-views funnel efficiency, traffic source distribution (Search/Browse/Suggested/External percentages), subscriber conversion rate, views-per-hour velocity in first 48h (if inferrable)
- **Outputs**: Performance score (A-F), funnel bottleneck identification, benchmark comparison table

### Agent C: Content Strategy Review
- **Loads**: `references/algorithm-guide.md`
- **Scope**: Last 30-60 days of uploads
- **Analyzes**: Upload cadence (actual vs recommended for tier), niche consistency vs topic drift, series vs standalone ratio, playlist structure and completeness, evergreen vs trending content balance, content format mix (long-form, Shorts, live)
- **Outputs**: Strategy score (A-F), cadence recommendation, content mix adjustment

### Agent D: Monetisation Assessment
- **Loads**: `references/monetization-guide.md`
- **Scope**: Channel monetisation posture
- **Analyzes**: YPP eligibility status and tier (standard vs expanded), revenue stream count and diversification, RPM estimate vs niche benchmarks, sponsorship readiness (media kit signals, contact info, audience size), affiliate and product integration gaps, membership/Super Chat utilization
- **Outputs**: Monetisation score (A-F), revenue gap analysis, top 2 untapped streams

## Execution Steps

1. **Collect channel data**: Run `execution/fetch_channel_data.py` with the provided channel URL/handle. Additionally, if DataForSEO is available, use `serp_youtube_video_info_live_advanced` on key videos for deeper metadata (tags, engagement, category). Capture channel metadata, recent video list, and available public metrics.
2. **Detect channel type**: From the collected data and stated niche, determine the channel archetype. Load the matching template from `templates/` for context-aware benchmarking.
3. **Launch 4 parallel agents**: Each agent receives the collected channel data plus its specific reference file. All four run simultaneously.
4. **Synthesize results**: Once all agents return, merge their findings into the unified output format below. Resolve any conflicting recommendations by prioritizing impact on the stated primary goal.
5. **Score calibration**: Cross-reference all scores against benchmarks in the reference files. No score may be assigned without a specific benchmark justification.
6. **Generate action plan**: Rank all recommended fixes by estimated impact (high/medium/low) crossed with effort (quick win/moderate/heavy lift). The 30-day plan prioritizes high-impact quick wins first.

## Output Template

```
## Executive Summary

[Three sentences maximum. Sentence 1: Channel's current position and strongest asset. Sentence 2: The single biggest bottleneck limiting growth. Sentence 3: The highest-leverage change available right now.]

## Score Card

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Technical SEO | [A-F] | [One-line justification referencing specific benchmark] |
| Performance | [A-F] | [One-line justification referencing specific benchmark] |
| Content Strategy | [A-F] | [One-line justification referencing specific benchmark] |
| Monetisation | [A-F] | [One-line justification referencing specific benchmark] |
| **Overall** | **[A-F]** | **[Weighted average explanation]** |

## Top 3 Critical Fixes

### 1. [Fix Title] — Impact: [High/Critical]
- **Problem**: [Specific issue with data point]
- **Benchmark gap**: [Current metric] vs [benchmark from reference file]
- **Action**: [Exact steps to implement]
- **Expected result**: [Projected improvement with timeframe]

### 2. [Fix Title] — Impact: [High/Critical]
[Same structure]

### 3. [Fix Title] — Impact: [High/Critical]
[Same structure]

## 30-Day Action Plan

### Week 1: Quick Wins
- [ ] [Specific action with measurable outcome]
- [ ] [Specific action with measurable outcome]
- [ ] [Specific action with measurable outcome]

### Week 2: Foundation Fixes
- [ ] [Specific action with measurable outcome]
- [ ] [Specific action with measurable outcome]

### Week 3: Optimization
- [ ] [Specific action with measurable outcome]
- [ ] [Specific action with measurable outcome]

### Week 4: Measurement & Adjustment
- [ ] [Specific action with measurable outcome]
- [ ] [Review metrics and adjust]

## 90-Day Growth Projection

| Metric | Current (Est.) | 30-Day Target | 60-Day Target | 90-Day Target |
|--------|---------------|---------------|---------------|---------------|
| Monthly views | [X] | [Y] | [Z] | [W] |
| Subscribers | [X] | [Y] | [Z] | [W] |
| Avg CTR | [X%] | [Y%] | [Z%] | [W%] |
| Avg AVD | [X%] | [Y%] | [Z%] | [W%] |
| Est. Monthly Revenue | [X] | [Y] | [Z] | [W] |

*Projections assume consistent implementation of the action plan and [X uploads/week] cadence.*

## Detailed Agent Reports

### Technical SEO Report
[Full Agent A output]

### Performance Report
[Full Agent B output]

### Content Strategy Report
[Full Agent C output]

### Monetisation Report
[Full Agent D output]
```

## Quality Criteria

- Every letter grade MUST cite a specific benchmark from the loaded reference file
- The executive summary must be exactly 3 sentences — no more, no less
- All 30-day actions must be specific and measurable (no vague advice like "improve thumbnails")
- Growth projections must be conservative and grounded in the channel's current trajectory plus benchmark improvement rates from reference files
- The top 3 fixes must be ranked strictly by impact, not by ease of implementation
- No recommendations may contradict each other across agent reports — resolve conflicts in synthesis
- Channel size tier must influence all benchmarks (do not compare a 5K channel against 500K benchmarks)
- If data is unavailable or estimated, mark it explicitly with [estimated] or [data unavailable]


---

<!-- file: sub-skills/calendar.md -->

# Content Calendar Generator

This sub-skill produces a fully structured monthly content calendar with per-video metadata, evergreen/trending balance checks, Shorts extraction opportunities, and seasonal awareness, translating a channel's content pillars and cadence into a ready-to-execute publishing schedule.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Content pillars | Yes | Pillar names, types (Hub/Hero/Help), and posting frequency from the strategy sub-skill |
| Upload cadence | Yes | Videos per week (long-form and Shorts) |
| Month/timeframe | Yes | Target month or date range for the calendar |
| Seasonal events/launches | No | Holidays, product launches, industry events, personal milestones relevant to content |
| Channel niche | No | For seasonal CPM and trending context (default: inferred from pillars) |
| Creator timezone | No | For publish time optimization (default: US Eastern) |

## Reference Files

- `references/algorithm-guide.md`
- `references/seo-playbook.md`

## DataForSEO Research (When Available)

Use live trend and volume data to optimise calendar timing:

1. **Seasonal trends**: Run `kw_data_google_trends_explore` with the channel's core keywords to identify seasonal peaks and valleys for the target month. Schedule high-demand topics during their peak periods.
2. **Volume prioritisation**: Use `kw_data_google_ads_search_volume` on all planned video keywords to prioritise higher-volume topics earlier in the month for maximum impact.
3. **Rising topic detection**: Run `kw_data_google_trends_explore` with broader niche keywords to spot rising trends that should be added to this month's calendar.

**Fallback:** If DataForSEO is unavailable, use WebSearch for seasonal trends and rely on reference file seasonality data.

**Efficiency:** Typical calendar planning costs ~$0.008 (3-5 API calls).

## Parallel Agents

Not required. This skill runs as a single sequential workflow.

## Execution Steps

1. **Load references**: Read `references/algorithm-guide.md` and `references/seo-playbook.md` for publishing timing data and SEO integration.
2. **Map the month**: If DataForSEO is available, use Google Trends data to identify seasonal peaks for the channel's keyword clusters. Identify the number of publishing weeks, any holidays or seasonal events (both provided and standard), and CPM-relevant periods (Q4 premium, January slump, etc.).
3. **Distribute pillars across weeks**: Assign video slots to each week based on the pillar frequencies and upload cadence. Ensure no single pillar dominates any week.
4. **Generate per-video entries**: For each slot, produce the working title variants, metadata, and production notes.
5. **Assign publish dates and times**: Default to Tuesday/Wednesday/Thursday at 14:00-16:00 local time unless the algorithm guide suggests niche-specific alternatives.
6. **Run balance checks**: Verify evergreen/trending ratio, pillar distribution, and format mix.
7. **Generate Shorts plan**: For each long-form video, identify 2-3 Short clip extraction opportunities.
8. **Add seasonal notes**: Flag CPM windows, holiday content lead times, and any seasonal adjustments.

## Output Template

```
## Calendar Overview: [Month Year]

### Month Context
- **Publishing weeks**: [X] (Week of [date] through Week of [date])
- **Total planned videos**: [X long-form] + [X Shorts] = [X total]
- **Seasonal factors**: [Q4 CPM premium / January slump / holiday lead time / none]
- **Key dates this month**: [Holidays, events, launches — both provided and standard]

---

## Monthly Grid

| Week | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
|------|-----|-----|-----|-----|-----|-----|-----|
| Week 1 ([dates]) | — | [Video slot or —] | [Video slot or —] | [Video slot or —] | — | — | — |
| Week 2 ([dates]) | — | [Video slot or —] | [Video slot or —] | [Video slot or —] | — | — | — |
| Week 3 ([dates]) | — | [Video slot or —] | [Video slot or —] | [Video slot or —] | — | — | — |
| Week 4 ([dates]) | — | [Video slot or —] | [Video slot or —] | [Video slot or —] | — | — | — |
| Week 5 ([dates]) | — | [Video slot or —] | [Video slot or —] | [Video slot or —] | — | — | — |

**Legend**: LF = Long-form | SH = Short | LV = Live

---

## Per-Video Entries

### Video 1 — Week 1, [Day] [Date]

| Field | Detail |
|-------|--------|
| **Pillar** | [Pillar name] ([Hub/Hero/Help]) |
| **Format** | [Long-form / Short / Live] |
| **Traffic strategy** | [Search / Browse / Trending] |
| **Target keyword** | [Primary keyword for SEO] |
| **Hook type recommendation** | [Shock / Problem-Agitation / Story / Curiosity / Social Proof] |
| **Estimated production time** | [X hours: research + script + film + edit] |
| **Publish time** | [Day, Date at HH:MM timezone] |

**Working title variants**:
1. [Search-optimized title variant]
2. [Browse/curiosity-driven title variant]
3. [Hybrid title variant]

**Thumbnail concept note**: [One-sentence visual concept — focal point, emotion, text overlay idea]

**Content brief**: [2-3 sentences describing what this video covers and the viewer takeaway]

---

### Video 2 — Week 1, [Day] [Date]
[Same structure as above]

---

### Video 3 — Week 2, [Day] [Date]
[Same structure — continue for ALL videos in the month]

---

[Continue for every video slot in the month...]

---

## Evergreen / Trending Balance Check

| Video | Type | Classification |
|-------|------|---------------|
| [Video 1 title] | [Pillar] | [Evergreen / Trending / Hybrid] |
| [Video 2 title] | [Pillar] | [Evergreen / Trending / Hybrid] |
| ... | ... | ... |

**Balance summary**:
- Evergreen: [X%] of total videos
- Trending: [X%] of total videos
- Hybrid: [X%] of total videos

**Assessment**: [PASS if trending is 30% or less / WARNING if trending exceeds 30% — with specific swap recommendation if WARNING]

---

## Shorts Supplement Plan

### From Video 1: "[Long-form title]"
1. **Short 1**: [Clip concept — which segment, hook, 30-60 second scope]
2. **Short 2**: [Clip concept]
3. **Short 3**: [Clip concept] (optional)

### From Video 2: "[Long-form title]"
1. **Short 1**: [Clip concept]
2. **Short 2**: [Clip concept]

[Continue for each long-form video...]

**Shorts publishing cadence**: [When to publish relative to the long-form video — e.g., "1 Short on publish day, 1 Short two days later"]

---

## Seasonal & Timing Notes

### CPM Awareness
- **Current month CPM context**: [Is this a premium CPM period (Oct-Dec), average (Feb-Sep), or slump (January)?]
- **Implication**: [Adjust content — e.g., "Prioritize monetizable topics this month" or "Use January for experimental/growth content"]

### Holiday & Event Lead Times
| Event | Date | Lead Time Needed | Content Action |
|-------|------|-----------------|----------------|
| [Holiday/event] | [Date] | [X days/weeks before] | [Publish by date X to capture traffic] |

### January Slump Mitigation (if applicable)
- [Strategy for maintaining momentum during low-CPM period]
- [Content types that perform well in January despite lower ad rates]

### Q4 Premium Window (if applicable)
- [Strategy for maximizing revenue during Oct-Dec CPM spike]
- [Content topics with highest RPM potential this month]

---

## Production Timeline

| Week | Pre-Production | Production | Post-Production | Publish |
|------|---------------|------------|-----------------|---------|
| Week 1 | [What to research/script] | [What to film] | [What to edit] | [What goes live] |
| Week 2 | [What to research/script] | [What to film] | [What to edit] | [What goes live] |
| Week 3 | [What to research/script] | [What to film] | [What to edit] | [What goes live] |
| Week 4 | [What to research/script] | [What to film] | [What to edit] | [What goes live] |
```

## Quality Criteria

- Every video slot must have all fields filled — no blank entries or TBD placeholders
- Working title variants must include exactly 3 per video: search-optimized, browse-driven, and hybrid
- Publish times must default to Tuesday/Wednesday/Thursday 14:00-16:00 unless a niche-specific exception is justified
- The evergreen/trending balance must be calculated and flagged if trending content exceeds 30% of total videos
- Each long-form video must have 2-3 Short clip extraction ideas — no fewer than 2
- Seasonal notes must address CPM context for the target month specifically
- Holiday lead times must be calculated backwards from the event date (not just listed)
- The production timeline must be realistic for the stated resource level
- No two consecutive videos should be from the same pillar unless cadence requires it
- The monthly grid must accurately reflect the actual calendar dates for the target month


---

<!-- file: sub-skills/competitor.md -->

# Competitor Sub-Skill

This sub-skill performs a multi-dimensional competitor gap analysis by spawning four parallel agents that each investigate a distinct competitive dimension — top video patterns, keyword gaps, format gaps, and audience unmet needs. The combined output reveals specific, actionable content opportunities that competitors have validated with their audience but left gaps the creator can exploit.

## Inputs Required

- **Competitor channels** (list, max 3): channel names or URLs to analyse
- **User's channel niche** (string): the creator's content category
- **User's channel URL or name** (optional): for direct comparison
- **User's recent video titles** (optional): for keyword gap analysis

## Reference Files to Load

- `references/seo-playbook.md`
- `references/algorithm-guide.md`

## DataForSEO Research (When Available)

DataForSEO provides far richer competitor intelligence than the YouTube Data API alone. When available, use it as the PRIMARY data source for competitor analysis:

1. **YouTube SERP mapping**: For each competitor's known keywords (extracted from their titles), run `serp_youtube_organic_live_advanced` to see where competitors rank vs where they don't. This builds the keyword gap map with real ranking data.
2. **Video deep-dive**: Use `serp_youtube_video_info_live_advanced` on competitor top videos to get full metadata: tags, category, exact view/like/comment counts, duration, and publication date.
3. **Comment mining**: Use `serp_youtube_video_comments_live_advanced` on competitor videos (Agent D) to extract audience complaints, questions, and content requests without needing YouTube API OAuth.
4. **Transcript analysis**: Use `serp_youtube_video_subtitles_live_advanced` on competitor top videos to understand their content structure, talking points, and hooks.
5. **Keyword expansion**: Run `dataforseo_labs_google_keyword_ideas` with niche seed keywords to discover keyword opportunities neither the user nor competitors are targeting.
6. **Volume + difficulty for gaps**: Batch all identified keyword gaps into `kw_data_google_ads_search_volume` and `dataforseo_labs_bulk_keyword_difficulty` to quantify the opportunity.
7. **Trend validation**: Use `kw_data_google_trends_explore` on top keyword gaps to confirm they're rising, not declining.

**Fallback:** If DataForSEO is unavailable, use `execution/search_competitor_videos.py` (YouTube Data API, 100 units/search) and WebSearch.

**Efficiency:** Typical competitor analysis costs ~$0.02 (6-10 API calls). Use video_info in batches where possible.

## Parallel Agents

**Yes — spawn 4 parallel agents.** Each agent operates independently and produces its own section of the final output. Use DataForSEO YouTube tools (`serp_youtube_organic_live_advanced`, `serp_youtube_video_info_live_advanced`, `serp_youtube_video_comments_live_advanced`) as the primary data source. Fall back to `execution/search_competitor_videos.py` if DataForSEO is unavailable.

### Agent A: Top Video Analysis
- Retrieve each competitor's top 10 videos by view count
- Extract common title patterns (structures, power words, number usage)
- Categorise thumbnail styles (face vs no-face, text overlay patterns, colour schemes)
- Identify topic clusters that dominate their top content
- Note average video length of top performers

### Agent B: Keyword Gap
- Extract keywords and topics from competitor video titles and descriptions
- Cross-reference against the user's existing content
- Identify keywords and topics that competitors rank for but the user does not cover
- Assess keyword difficulty and search volume tier for each gap

### Agent C: Format Gap
- Catalogue content formats each competitor uses (tutorial, listicle, reaction, review, vlog, comparison, case study, interview, challenge, documentary-style)
- Identify formats that perform above channel average for competitors
- Compare against the user's format repertoire
- Flag high-performing formats the user has never attempted

### Agent D: Audience Gap
- Analyse competitor comment sections on recent videos (last 10-20 videos)
- Extract recurring complaints, unanswered questions, and content requests
- Identify audience frustrations that competitors are not addressing
- Catalogue specific video ideas that viewers are explicitly asking for

## Step-by-Step Execution

1. Load both reference files. Internalise SEO keyword analysis methods and algorithm signals that determine which content gets recommended.
2. Validate competitor channels. Confirm each is in the same or adjacent niche as the user.
3. Spawn all 4 agents in parallel. Each agent uses DataForSEO YouTube tools as the primary data source (`serp_youtube_organic_live_advanced`, `serp_youtube_video_info_live_advanced`, `serp_youtube_video_comments_live_advanced`, `serp_youtube_video_subtitles_live_advanced`). Fall back to `execution/search_competitor_videos.py` if DataForSEO is unavailable.
4. Agent A retrieves top 10 videos per competitor and analyses title/thumbnail/topic patterns.
5. Agent B extracts keywords from competitor content and identifies gaps against the user's existing videos.
6. Agent C catalogues content formats and identifies format opportunities.
7. Agent D scans comment sections for unmet audience needs.
8. Collect all 4 agent outputs and synthesise into the unified report.
9. Generate the content gap map, outlier analysis, quick win opportunities, and differentiation angles from the combined agent data.

## Output Template

```markdown
## Competitor Gap Analysis

**Competitors analysed**: [List of 1-3 competitor channels]
**User's niche**: [Niche]
**Analysis date**: [Date]

---

### 1. Competitor Profiles

| Attribute | [Competitor 1] | [Competitor 2] | [Competitor 3] |
|-----------|----------------|----------------|----------------|
| Subscribers | [N] | [N] | [N] |
| Size tier | [Micro/Small/Mid/Large/Mega] | ... | ... |
| Est. monthly views | [N] | ... | ... |
| Upload frequency | [N/week] | ... | ... |
| Primary strategy | [Search/Browse/Shorts/Mixed] | ... | ... |
| Monetisation approach | [Ads/Sponsors/Products/Mixed] | ... | ... |
| Avg video length | [M:SS] | ... | ... |

---

### 2. Top Video Analysis (Agent A)

**[Competitor 1] — Top 10 by views**:

| # | Title | Views | Length | Topic Cluster |
|---|-------|-------|--------|---------------|
| 1 | [Title] | [N] | [M:SS] | [Cluster] |
| ... | ... | ... | ... | ... |

*(Repeat for each competitor)*

**Title patterns detected**:
- [Pattern 1]: [Example — frequency across top videos]
- [Pattern 2]: [Example — frequency]
- [Pattern 3]: [Example — frequency]

**Thumbnail patterns**:
- [Style 1]: [Description — frequency]
- [Style 2]: [Description — frequency]

**Dominant topic clusters**: [List the 3-5 topic areas that dominate competitor top content]

---

### 3. Content Gap Map (Agent B)

| Topic / Keyword | [Comp 1] | [Comp 2] | [Comp 3] | User | Opportunity |
|-----------------|----------|----------|----------|------|-------------|
| [Keyword 1] | Yes | Yes | No | **No** | HIGH |
| [Keyword 2] | Yes | No | No | **No** | MEDIUM |
| ... | ... | ... | ... | ... | ... |

**Top keyword gaps** (competitor ranks, user does not):
1. **[Keyword]** — Search volume: [Tier], Difficulty: [Low/Med/High], Relevance: [High/Med]
2. ...
3. ...
4. ...
5. ...

---

### 4. Format Gap (Agent C)

| Format | [Comp 1] Avg Perf | [Comp 2] Avg Perf | [Comp 3] Avg Perf | User Uses? |
|--------|-------------------|-------------------|-------------------|------------|
| Tutorial | [Above/At/Below avg] | ... | ... | [Yes/No] |
| Listicle | ... | ... | ... | ... |
| Comparison | ... | ... | ... | ... |
| Case Study | ... | ... | ... | ... |
| ... | ... | ... | ... | ... |

**Format opportunities** (high competitor performance, user has not tried):
1. **[Format]** — Why it works: [Reasoning], Adaptation suggestion: [How user can make it their own]
2. ...
3. ...

---

### 5. Audience Gap (Agent D)

**Recurring complaints in competitor comments**:
1. "[Complaint/frustration]" — Frequency: [Common/Occasional], Opportunity: [Description]
2. ...
3. ...

**Unanswered questions**:
1. "[Question viewers keep asking]" — Video idea: [Title concept]
2. ...
3. ...

**Explicitly requested content**:
1. "[What viewers asked for]" — Times seen: [N], Competitor response: [Addressed/Ignored]
2. ...
3. ...

---

### 6. Outlier Video Analysis

Videos performing 3x+ above the competitor's channel average:

| Video | Channel | Views | Channel Avg | Multiple | Why It's an Outlier |
|-------|---------|-------|-------------|----------|-------------------|
| "[Title]" | [Comp] | [N] | [N] | [Xx] | [Specific factors] |
| ... | ... | ... | ... | ... | ... |

**Replicability assessment**: [Which outlier strategies can the user adapt, which are one-time events]

---

### 7. Quick Win Opportunities

Top 5 video ideas based on validated competitor demand with gaps:

| # | Video Idea | Source | Difficulty | Expected Impact |
|---|-----------|--------|------------|-----------------|
| 1 | [Title concept] | [Which gap: keyword/format/audience] | [Easy/Medium/Hard] | [High/Medium] |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... |

---

### 8. Differentiation Angles

How to cover the same topics as competitors while standing out:

1. **[Angle]**: [Description — how this creates distinct positioning]
2. **[Angle]**: [Description]
3. **[Angle]**: [Description]
```

## Quality Criteria

- All 4 agents produce output; no section is left empty or marked as unavailable
- Competitor profiles include realistic estimates, not fabricated precision
- Content gap map shows clear opportunities where competitors have coverage and the user does not
- Keyword gaps include difficulty and search volume assessments, not just topic names
- Format gap analysis compares performance relative to channel average, not absolute views
- Audience gap findings come from comment analysis patterns, not assumptions
- Outlier videos must be 3x+ channel average to qualify; the threshold is not lowered
- Quick win opportunities are validated by at least two data points (keyword demand + audience request, or competitor success + format gap)
- Differentiation angles are specific and actionable, not generic advice like "be authentic"
- The analysis does not recommend copying competitors; it identifies gaps and unique positioning


---

<!-- file: sub-skills/hook.md -->

# First-30-Second Hook Writer

This sub-skill generates five distinct hook variants for a video's opening 30 seconds, each using a different psychological mechanism, rated for drop-off risk and optimized traffic source, giving creators a tested menu of openings to choose from based on their channel size and content type.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Topic | Yes | Video subject matter |
| Channel niche | Yes | Content category (tech, fitness, finance, etc.) |
| Hook style preference | No | If creator wants to bias toward a specific style |
| Channel size | No | Helps calibrate the decision guide (default: small) |
| Video format | No | Long-form, Short, tutorial, commentary, etc. (default: long-form) |

## Reference Files

- `references/retention-scripting-guide.md`

## Parallel Agents

Not required. This skill runs as a single sequential workflow.

## Execution Steps

1. **Load reference**: Read `references/retention-scripting-guide.md` fully before generating hooks.
2. **Analyze the topic**: Identify the core tension, surprising angle, common misconception, emotional stakes, and audience pain point related to the topic.
3. **Generate 5 hook variants**: Write each variant following the exact structure below. Each hook must be a complete 30-second script (approximately 75 words at spoken pace).
4. **Rate each hook**: Assign drop-off risk, optimal traffic source, and identify the psychological mechanism.
5. **Build the decision guide**: Based on reference file principles, map hook types to channel sizes and content types.
6. **Apply preference weighting**: If a hook style preference was provided, note which variant aligns and explain tradeoffs of the preferred vs recommended style.

## Output Template

```
## Topic Analysis

- **Core tension**: [The fundamental conflict or question in this topic]
- **Surprising angle**: [What most people get wrong or don't expect]
- **Audience pain point**: [The problem viewers are trying to solve]
- **Emotional stakes**: [What viewers stand to gain or lose]

---

## Hook Variant 1: Shock/Contradiction

**Mechanism**: Cognitive dissonance — presents a counterintuitive statement that conflicts with the viewer's existing belief, creating an information gap they must resolve.

> [Full 30-second spoken script, approximately 75 words]
>
> [Line 1: The counterintuitive claim — delivered with confidence, no hedging]
> [Line 2-3: Brief evidence or framing that makes the claim credible]
> [Line 4-5: Pivot to promise — "and in this video, I'll show you exactly why..."]

- **Word count**: [X] words (~30 seconds)
- **Drop-off risk**: [Low/Medium/High] — [one-sentence explanation]
- **Optimized for**: [Browse/Search/Suggested] — [why this traffic source]
- **Best when**: [Scenario where this hook type excels]
- **Avoid when**: [Scenario where this hook type backfires]

---

## Hook Variant 2: Problem-Agitation

**Mechanism**: Pain amplification — names a problem the viewer already recognizes, then intensifies the emotional weight before offering the video as relief.

> [Full 30-second spoken script, approximately 75 words]
>
> [Line 1: Name the pain directly — "You've tried X and it didn't work"]
> [Line 2-3: Twist the knife — show the consequences of the unsolved problem]
> [Line 4-5: Relief signal — "Here's what actually works..."]

- **Word count**: [X] words (~30 seconds)
- **Drop-off risk**: [Low/Medium/High] — [one-sentence explanation]
- **Optimized for**: [Browse/Search/Suggested] — [why this traffic source]
- **Best when**: [Scenario]
- **Avoid when**: [Scenario]

---

## Hook Variant 3: Story-Open

**Mechanism**: Narrative transportation — drops the viewer into the middle of an action or scene, activating the brain's story-processing mode which naturally resists disengagement.

> [Full 30-second spoken script, approximately 75 words]
>
> [Line 1: Mid-action scene — start in medias res, no setup]
> [Line 2-3: Sensory details or stakes that make the scene vivid]
> [Line 4-5: Bridge to topic — connect the story to the video's core content]

- **Word count**: [X] words (~30 seconds)
- **Drop-off risk**: [Low/Medium/High] — [one-sentence explanation]
- **Optimized for**: [Browse/Search/Suggested] — [why this traffic source]
- **Best when**: [Scenario]
- **Avoid when**: [Scenario]

---

## Hook Variant 4: Curiosity-Gap

**Mechanism**: Information gap theory — reveals enough to make the viewer aware of what they don't know, creating psychological tension that can only be resolved by watching.

> [Full 30-second spoken script, approximately 75 words]
>
> [Line 1: Tease the answer without giving it — "There's one thing that..."]
> [Line 2-3: Build the gap — add specificity that makes the unknown feel important]
> [Line 4-5: Promise the payoff — signal exactly when the answer comes]

- **Word count**: [X] words (~30 seconds)
- **Drop-off risk**: [Low/Medium/High] — [one-sentence explanation]
- **Optimized for**: [Browse/Search/Suggested] — [why this traffic source]
- **Best when**: [Scenario]
- **Avoid when**: [Scenario]

---

## Hook Variant 5: Social Proof

**Mechanism**: Authority bias + stakes — leads with credibility (results, credentials, or third-party validation) to earn trust instantly, then pivots to what's at stake.

> [Full 30-second spoken script, approximately 75 words]
>
> [Line 1: Credibility statement — specific result, number, or proof point]
> [Line 2-3: Stakes — what this means for the viewer]
> [Line 4-5: Promise — "I'm going to break down exactly how..."]

- **Word count**: [X] words (~30 seconds)
- **Drop-off risk**: [Low/Medium/High] — [one-sentence explanation]
- **Optimized for**: [Browse/Search/Suggested] — [why this traffic source]
- **Best when**: [Scenario]
- **Avoid when**: [Scenario]

---

## Decision Guide

### By Channel Size

| Channel Size | Recommended Hook | Reasoning |
|-------------|-----------------|-----------|
| Nano (<1K) | [Type] | [Why — e.g., "No established authority, so social proof is weak"] |
| Micro (1K-10K) | [Type] | [Why] |
| Small (10K-100K) | [Type] | [Why] |
| Mid (100K-500K) | [Type] | [Why] |
| Large (500K+) | [Type] | [Why] |

### By Content Type

| Content Type | Primary Hook | Secondary Hook | Avoid |
|-------------|-------------|----------------|-------|
| Tutorial/How-to | [Type] | [Type] | [Type + why] |
| Commentary/Opinion | [Type] | [Type] | [Type + why] |
| Review | [Type] | [Type] | [Type + why] |
| Entertainment | [Type] | [Type] | [Type + why] |
| Educational | [Type] | [Type] | [Type + why] |
| Vlog | [Type] | [Type] | [Type + why] |

### By Traffic Source Goal

| Traffic Source | Best Hook Types | Why |
|---------------|----------------|-----|
| Search | [Types] | [Explanation] |
| Browse/Home | [Types] | [Explanation] |
| Suggested | [Types] | [Explanation] |

## Recommendation

**For this video**: [Recommended variant number and name] — [2-sentence justification based on topic, niche, and channel context]

**Runner-up**: [Second choice] — [When to use this instead]
```

## Quality Criteria

- Each hook must be a complete, speakable 30-second script — approximately 75 words (65-85 acceptable range)
- All five hook types must be represented: Shock/Contradiction, Problem-Agitation, Story-Open, Curiosity-Gap, Social Proof
- Each hook must name its specific psychological mechanism with a one-sentence explanation of how it works
- Drop-off risk ratings must be justified, not arbitrary
- Traffic source recommendations must align with the retention scripting guide's principles
- The decision guide must cover all channel sizes AND all listed content types
- No two hooks may use the same opening structure or first sentence pattern
- Hooks must be written in natural spoken language — no written-prose phrasing
- The curiosity-gap hook must NOT give away the answer within the 30 seconds
- The story-open hook must start in medias res — no "Let me tell you about a time when..."


---

<!-- file: sub-skills/ideate.md -->

# Ideate Sub-Skill

This sub-skill generates 10 data-informed video ideas ranked by a composite score of search demand, CTR potential, production feasibility, and niche fit. Each idea comes with a complete brief — keyword analysis, traffic strategy, hook angle, thumbnail concept, and revenue potential — so the creator can move directly from ideation to production without additional research.

## Inputs Required

- **Channel niche** (string): content category
- **Recent top-performing videos** (list, optional): titles and view counts of the creator's best recent videos
- **Audience pain points** (list, optional): known problems, frustrations, or questions from the target audience
- **Trending topics** (list, optional): current trends in the niche or broader culture
- **Competitor top videos** (list, optional): titles and view counts from competitor channels
- **Content the creator wants to avoid** (optional): topics or formats to exclude

## Reference Files to Load

- `references/algorithm-guide.md`
- `references/seo-playbook.md`
- `references/analytics-guide.md`

## DataForSEO Research (When Available)

Before generating ideas, gather live data to ground ideation in real demand:

1. **Trend discovery**: Use `kw_data_google_trends_explore` with 3-5 seed keywords from the niche to identify rising topics. Compare last 12 months. Rising trends = urgent ideas; declining = avoid.
2. **Keyword ideas**: Use `dataforseo_labs_google_keyword_ideas` and `dataforseo_labs_google_keyword_suggestions` with niche seed keywords to discover what people actually search for.
3. **YouTube SERP competition**: For each promising keyword, run `serp_youtube_organic_live_advanced` to check:
   - How many videos rank? What are their view counts?
   - Are top results from mega-channels or small creators? (opportunity signal)
   - What's the Shorts vs long-form ratio in results?
   - What title patterns dominate?
4. **Volume + difficulty**: Batch all candidate keywords into `kw_data_google_ads_search_volume` and `dataforseo_labs_bulk_keyword_difficulty` to get real numbers instead of estimated tiers.
5. **Intent classification**: Run `dataforseo_labs_search_intent` on candidates to match traffic strategy (informational → search-first, commercial → monetisation opportunity).

**Fallback:** If DataForSEO is unavailable, use WebSearch with queries like "[niche] trending topics 2025 2026" and rely on manual keyword assessment.

**Efficiency:** Batch all keywords into single calls. Typical ideation costs ~$0.01 (5-8 API calls).

## Parallel Agents

Not required. Execute sequentially.

## Step-by-Step Execution

1. Load all three reference files. Internalise keyword strategy, algorithm recommendation signals, traffic source mechanics, and content performance patterns.
2. Analyse the creator's top-performing videos (if provided) to identify what works: topic patterns, title structures, content formats, and audience signals. These inform ideas that build on proven success.
3. Map audience pain points to searchable topics. Each pain point represents validated demand — convert these into specific video concepts.
4. Assess trending topics for relevance and timing. Separate flash trends (must publish this week) from sustained trends (rising search interest over months). Flag seasonal deadlines.
5. Analyse competitor top videos (if provided) to identify proven topics with room for a better or different take.
6. Generate 10 video ideas. For each idea, determine the optimal traffic strategy: Search-first (targeting specific keyword intent), Browse-first (optimising for CTR and watch time to trigger algorithm recommendations), or Trending (capitalising on current interest spikes).
7. For each idea, assess keyword viability. If DataForSEO is available, use real volume and difficulty data from the research phase. Otherwise, assess competition level (Low/Medium/High based on existing content volume and channel authority of rankers), estimated monthly search volume tier (Low: under 1K, Medium: 1K-10K, High: 10K+), and Google Trends direction (Rising/Stable/Declining).
8. Craft a hook angle for each idea — one sentence that captures the curiosity gap or value proposition that will make viewers click and stay.
9. Design a thumbnail concept for each idea — a 15-word visual description specific enough for a designer to start working.
10. Estimate content length based on topic depth, niche norms, and search intent (how-to queries need completeness; opinion content can be shorter).
11. Assess revenue potential: estimate the RPM tier based on advertiser demand for the topic (some topics within a niche attract significantly higher CPMs).
12. Assign an urgency flag to each idea and rank all 10 by composite score.

## Output Template

```markdown
## Video Ideas: [Niche]

**Generated from**: [List data sources used — top videos, pain points, trends, competitor data]
**Ideas ranked by**: Search Demand x CTR Potential x Production Feasibility x Niche Fit

---

### Idea 1: [Working Title]

| Attribute | Value |
|-----------|-------|
| **Title** | [Keyword-optimised, max 100 chars] |
| **Traffic strategy** | [Search-first / Browse-first / Trending] |
| **Keyword** | [Primary keyword] |
| **Competition** | [Low / Medium / High] |
| **Search volume tier** | [Low (<1K) / Medium (1K-10K) / High (10K+)] |
| **Trends direction** | [Rising / Stable / Declining] |
| **Content length** | [Estimated minutes] |
| **RPM tier** | [Low ($2-5) / Medium ($5-12) / High ($12-30) / Premium ($30+)] |
| **Urgency** | [Trending: make this week / Evergreen: any time / Seasonal: deadline noted] |
| **Composite score** | [N/40] |

**Hook angle**: [One sentence — the curiosity gap or value proposition]

**Thumbnail concept**: [15-word visual description — subject, emotion, text, colours]

**Why this idea**: [1-2 sentences connecting it to the creator's data — what signal suggests this will perform]

**Source**: [What input data this idea came from — top video pattern, pain point, trend, competitor gap]

---

### Idea 2: [Working Title]

*(Same structure repeated for all 10 ideas)*

---

*(Ideas 3-10 follow the same format)*

---

### Ranking Summary

| Rank | Title | Strategy | Score | Urgency |
|------|-------|----------|-------|---------|
| 1 | [Title] | [Strategy] | [N/40] | [Flag] |
| 2 | [Title] | [Strategy] | [N/40] | [Flag] |
| 3 | [Title] | [Strategy] | [N/40] | [Flag] |
| 4 | [Title] | [Strategy] | [N/40] | [Flag] |
| 5 | [Title] | [Strategy] | [N/40] | [Flag] |
| 6 | [Title] | [Strategy] | [N/40] | [Flag] |
| 7 | [Title] | [Strategy] | [N/40] | [Flag] |
| 8 | [Title] | [Strategy] | [N/40] | [Flag] |
| 9 | [Title] | [Strategy] | [N/40] | [Flag] |
| 10 | [Title] | [Strategy] | [N/40] | [Flag] |

### Production Priority

**Make this week** (time-sensitive):
- [List any ideas flagged as Trending or Seasonal with approaching deadlines]

**Next in queue** (highest evergreen scores):
- [Top 2-3 evergreen ideas by composite score]

**Backlog** (solid ideas, no urgency):
- [Remaining ideas]

### Content Calendar Suggestion

| Week | Video | Strategy | Rationale |
|------|-------|----------|-----------|
| Week 1 | [Title] | [Strategy] | [Why this week] |
| Week 2 | [Title] | [Strategy] | [Why] |
| Week 3 | [Title] | [Strategy] | [Why] |
| Week 4 | [Title] | [Strategy] | [Why] |
```

## Quality Criteria

- All 10 ideas are distinct in topic and angle — no near-duplicates or minor variations
- Every title is under 100 characters and includes the target keyword
- Traffic strategies are justified by the topic type (how-to = search-first, opinion = browse-first, news = trending)
- Keyword competition assessment reflects realistic analysis, not arbitrary labels
- Search volume tiers use defined thresholds: Low (<1K), Medium (1K-10K), High (10K+)
- Trends direction is based on observable patterns, not guesses
- Hook angles create genuine curiosity gaps or clear value propositions — not generic statements
- Thumbnail concepts are specific enough for a designer to start (15 words, covering subject, emotion, text, colours)
- Content length estimates match niche norms and topic depth
- RPM tiers reflect advertiser demand for the specific topic, not just the niche average
- Urgency flags are used correctly: Trending only for genuinely time-sensitive topics, Seasonal only with a stated deadline
- Composite scores are internally consistent — higher-scored ideas are clearly stronger across dimensions
- Ideas draw from the provided input data with explicit attribution (not generic niche ideas)
- Content calendar accounts for production complexity and alternates between strategies
- At least 3 different traffic strategies are represented across the 10 ideas


---

<!-- file: sub-skills/metadata.md -->

# Metadata Sub-Skill

This sub-skill generates a complete, copy-paste-ready upload metadata package for a YouTube video — title variants, full description, tags, hashtags, chapters, thumbnail brief, card/end screen placement, publish settings, and a pre-publish SEO checklist. It serves as the final pre-publish gate, ensuring every SEO and discoverability element is optimised before the video goes live.

## Inputs Required

- **Video title** (string): working title (will be optimised)
- **Description** (string): draft description or bullet points of what the video covers
- **Content summary** (string): brief overview of the video's content and key points
- **Niche** (string): content category for keyword and audience targeting
- **Target keyword** (string): primary keyword the video should rank for
- **Video duration** (optional): total length for card/end screen timing calculations
- **Chapter timestamps** (optional): existing chapter markers to refine

## Reference Files to Load

- `references/seo-playbook.md`

## DataForSEO Research (When Available)

Validate metadata choices with live data:

1. **Tag optimization**: Run `kw_data_google_ads_search_volume` with all candidate tags to prioritise by real search volume.
2. **Keyword difficulty**: Use `dataforseo_labs_bulk_keyword_difficulty` to avoid tags where competition is too high for the channel's authority level.
3. **Title validation**: Run `serp_youtube_organic_live_advanced` with the primary keyword to check if the chosen title pattern aligns with what's currently ranking.

**Fallback:** If DataForSEO is unavailable, rely on keyword heuristics from the SEO playbook reference.

**Efficiency:** Typical metadata workflow costs ~$0.004 (2-3 API calls).

## Parallel Agents

Not required. Execute sequentially.

## Step-by-Step Execution

1. Load the SEO playbook reference file. Internalise title formulas, description structure, tag strategy, and all metadata best practices.
2. Analyse the target keyword. Assess its placement potential in titles and descriptions. Identify 2-3 secondary keywords and long-tail variations.
3. Generate 3 title variants: one search-optimised (keyword-forward, clear intent match), one browse-optimised (curiosity-driven, emotional trigger), and one hybrid (keyword present but wrapped in compelling framing). All titles must be under 100 characters with the primary keyword in the first 40 characters.
4. Write the full description (max 5000 characters). Structure it with the primary keyword in the first 25 words, a compelling first 2 lines (visible before "Show More"), timestamps/chapters, relevant links, and a channel description boilerplate. Include hashtags at the bottom of the description (not in the title).
5. Generate 10-15 tags in priority order. Start with the exact target keyword, then variations, then broader topic tags. Total tag string must be under 500 characters.
6. Select 3-5 hashtags. Lead with the most specific, end with the broadest.
7. Format chapters starting at 0:00 with a minimum of 3 chapters. If timestamps were provided, refine them. If not, create placeholder chapters based on the content summary.
8. Write a one-line thumbnail brief covering: subject/focal point, emotion/expression, text overlay (max 3-4 words), and dominant colour scheme.
9. Plan cards and end screens. Place cards at approximately 20% and 70% of video length. Recommend which video to link (related content or series next). Design end screen for the final 20 seconds with video suggestion and subscribe element.
10. Recommend publish settings: optimal day/time for the niche, audience setting (made for kids or not), category, and language.
11. Compile the pre-publish SEO checklist.

## Output Template

````markdown
## Upload Metadata Package: "[Working Title]"

**Target keyword**: [Primary keyword]
**Secondary keywords**: [Keyword 2], [Keyword 3]

---

### TITLE OPTIONS (3 variants)

| Type | Title | Chars |
|------|-------|-------|
| Search-optimised | [Keyword-forward, clear intent] | [N] |
| Browse-optimised | [Curiosity-driven, emotional] | [N] |
| Hybrid (recommended) | [Keyword + compelling frame] | [N] |

**Recommendation**: Use [type] because [reasoning].

---

### FINAL DESCRIPTION (copy-paste ready)

```
[First 2 lines — visible before "Show More". Primary keyword in first 25 words. Compelling hook.]

[Paragraph 2 — expanded context, secondary keywords naturally included]

TIMESTAMPS:
0:00 Introduction
[MM:SS Chapter title]
[MM:SS Chapter title]
[MM:SS Chapter title]

RESOURCES MENTIONED:
- [Resource 1]: [link placeholder]
- [Resource 2]: [link placeholder]

CONNECT:
[Social link placeholders]

ABOUT THIS CHANNEL:
[1-2 sentence channel description boilerplate]

#hashtag1 #hashtag2 #hashtag3 [#hashtag4] [#hashtag5]
```

**Character count**: [N] / 5000

---

### TAGS (copy-paste, comma-separated)

```
[exact target keyword], [variation 1], [variation 2], [long-tail 1], [long-tail 2], [related topic 1], [related topic 2], [broader term 1], [broader term 2], [broader term 3], [channel name]
```

**Character count**: [N] / 500

---

### HASHTAGS

```
#[specific1] #[specific2] #[mid-range] #[broader] #[broadest]
```

---

### CHAPTERS

```
0:00 Introduction
[MM:SS] [Chapter title — descriptive, keyword-aware]
[MM:SS] [Chapter title]
[MM:SS] [Chapter title]
[MM:SS] [Chapter title]
```

**Chapter count**: [N] (minimum 3 required)

---

### THUMBNAIL BRIEF

> **Subject**: [Who/what is the focal point]
> **Emotion**: [Expression or mood]
> **Text overlay**: [3-4 words max]
> **Dominant colours**: [2-3 colours, high contrast]
> **Composition**: [Left/right/center weighted, rule of thirds note]

---

### CARDS & END SCREENS

**Card 1** (at [MM:SS] — ~20% mark):
- Link to: "[Related video title]"
- CTA text: "[Teaser text]"
- Trigger: Place after [content moment that creates curiosity about related topic]

**Card 2** (at [MM:SS] — ~70% mark):
- Link to: "[Related video or playlist title]"
- CTA text: "[Teaser text]"
- Trigger: Place after [relevant content moment]

**End screen** (final 20 seconds, starts at [MM:SS]):
- Element 1: Best for viewer (video suggestion)
- Element 2: Subscribe button
- Verbal CTA: "[Exact words to say during end screen]"

---

### PUBLISH SETTINGS

| Setting | Value | Rationale |
|---------|-------|-----------|
| Publish day | [Day] | [Why — niche audience behaviour] |
| Publish time | [HH:MM timezone] | [Why — peak audience activity] |
| Audience | [Not made for kids / Made for kids] | |
| Category | [Category] | |
| Language | [Language] | |
| Visibility | [Public / Unlisted / Scheduled] | |
| Premiere | [Yes / No] | [Rationale] |

---

### PRE-PUBLISH SEO CHECKLIST

- [ ] Primary keyword in title (first 40 characters)
- [ ] Primary keyword in first 25 words of description
- [ ] Description under 5000 characters
- [ ] Timestamps start at 0:00 with minimum 3 chapters
- [ ] Tags under 500 characters total
- [ ] Custom thumbnail uploaded (not auto-generated)
- [ ] Hashtags in description body (not in title)
- [ ] Cards placed at ~20% and ~70% of video length
- [ ] End screen covers final 20 seconds
- [ ] End screen has video suggestion + subscribe element
- [ ] Subtitles/captions uploaded or auto-generated reviewed
- [ ] Audience setting correct (kids/not kids)
- [ ] Video category selected
- [ ] Verbal CTA matches end screen timing
````

## Quality Criteria

- All 3 title variants are genuinely distinct in strategy, not minor word swaps
- Primary keyword appears in the first 40 characters of every title variant
- Description places the primary keyword within the first 25 words naturally
- Description first 2 lines are compelling standalone (they appear before "Show More")
- Tags are in priority order: exact keyword first, then variations, then broad terms
- Tag total is under 500 characters — verified with a character count
- Description total is under 5000 characters — verified with a character count
- Chapters start at 0:00 and include at least 3 entries
- Hashtags are in description, never in the title
- Card placements reference specific content moments, not arbitrary timestamps
- End screen timing accounts for the actual video duration
- Thumbnail brief is specific enough for a designer to execute without questions
- Pre-publish checklist covers all items — none are omitted
- The entire package is copy-paste ready with no placeholder brackets remaining in the copy-paste sections (except link placeholders clearly marked)


---

<!-- file: sub-skills/monetize.md -->

# Monetize Sub-Skill

This sub-skill produces a comprehensive monetisation strategy by auditing all seven YouTube revenue streams against the creator's current channel size, niche, and audience — then building a 90-day activation roadmap with specific revenue targets. It bridges YouTube-native monetisation (AdSense, memberships, Super Chat) with external revenue (brand deals, digital products, funnels) to maximise total creator income.

## Inputs Required

- **Channel size** (number): current subscriber count
- **Niche** (string): content category
- **Current revenue streams** (list): which monetisation methods are currently active
- **Monthly views** (number): approximate total monthly views across all content
- **Audience demographics** (optional): age range, geography, gender split, interests
- **Existing products or services** (optional): anything the creator already sells

## Reference Files to Load

- `references/monetization-guide.md`
- `references/analytics-guide.md`

## Parallel Agents

Not required. Execute sequentially.

## Step-by-Step Execution

1. Load both reference files. Internalise YPP tier thresholds, RPM benchmarks by niche, revenue stream requirements, and brand deal rate calculations.
2. Determine the creator's current YPP tier: none (below thresholds), expanded (500 subs + 3K watch hours or 3M Shorts views), or full (1K subs + 4K watch hours or 10M Shorts views). List which features are unlocked at their tier.
3. Estimate current monthly ad revenue using the formula: monthly views multiplied by niche-specific RPM divided by 1000. Use the RPM benchmarks from the monetization guide for the stated niche.
4. Perform a revenue gap analysis across all 7 streams: AdSense display ads, Shorts ad revenue share, Channel Memberships, Super Chat and Super Thanks, YouTube Shopping affiliate, Brand Deals, and External Funnels (courses, communities, digital products, consulting). For each stream, assess: current status (active/available/locked), revenue potential at the creator's current scale, and the gap between current and potential.
5. Build a priority activation roadmap. Rank streams by: revenue potential at current scale, effort to activate, time to first dollar. Small channels should prioritise brand deals and external funnels over ad revenue. Large channels should optimise ad revenue while layering memberships and shopping.
6. Calculate a brand deal rate card. Use CPM-equivalent pricing (cost per 1000 views on a sponsored video). Establish a negotiation floor (minimum acceptable rate) and ceiling (aspirational rate for high-demand niches). Include the FTC disclosure checklist.
7. Design an external funnel architecture. Recommend the best product type for the niche (course, community, digital download, or consulting). Map the funnel: YouTube video to landing page to email capture to offer. Estimate conversion rates at each stage using industry benchmarks.
8. Build the 90-day revenue action plan with specific milestones and revenue targets for Month 1, Month 2, and Month 3.

## Output Template

```markdown
## Monetisation Strategy: [Niche] Channel

**Channel size**: [N] subscribers
**Monthly views**: [N]
**Current streams**: [List of active revenue sources]

---

### 1. Current State

| Metric | Value |
|--------|-------|
| YPP Tier | [None / Expanded / Full] |
| Active streams | [List] |
| Available (not activated) | [List] |
| Locked (requirements not met) | [List + what is needed] |
| Estimated monthly ad revenue | $[N] ([N] views x $[RPM] RPM) |

---

### 2. Revenue Gap Analysis

| Stream | Status | Current $/mo | Potential $/mo | Gap | Priority |
|--------|--------|-------------|----------------|-----|----------|
| AdSense (long-form) | [Active/Available/Locked] | $[N] | $[N] | $[N] | [High/Med/Low] |
| Shorts ad share | ... | ... | ... | ... | ... |
| Memberships | ... | ... | ... | ... | ... |
| Super Chat / Thanks | ... | ... | ... | ... | ... |
| Shopping affiliate | ... | ... | ... | ... | ... |
| Brand deals | ... | ... | ... | ... | ... |
| External funnels | ... | ... | ... | ... | ... |
| **Total** | | **$[N]** | **$[N]** | **$[N]** | |

---

### 3. Priority Activation Roadmap

**Activate first** (highest ROI at current scale):
1. **[Stream]** — [Why now, what to do, expected revenue timeline]

**Activate second**:
2. **[Stream]** — [Why, what, when]

**Activate third**:
3. **[Stream]** — [Why, what, when]

**Hold for later** (requires more scale):
- [Stream] — unlock at [N] subscribers / [N] monthly views

---

### 4. Brand Deal Rate Card

| Metric | Value |
|--------|-------|
| Average views per video | [N] |
| CPM rate (niche benchmark) | $[N] |
| **Negotiation floor** | $[N] per integration |
| **Target rate** | $[N] per integration |
| **Ceiling** (premium placement) | $[N] per integration |

**Rate justification**: [Why this rate is appropriate for the channel's niche, engagement, and audience]

**FTC Disclosure Checklist**:
- [ ] "Paid promotion" toggle enabled in YouTube Studio
- [ ] Verbal disclosure within first 30 seconds of video
- [ ] "#ad" or "Sponsored by [Brand]" in title or first line of description
- [ ] Disclosure visible before "Show More" fold
- [ ] Separate disclosure for each sponsored element (if multiple brands)

---

### 5. External Funnel Design

**Recommended product**: [Course / Community / Digital download / Consulting]
**Why this product**: [Fit with niche and audience needs]

**Funnel architecture**:
```
YouTube Video (awareness)
  -> Link in description / pinned comment
    -> Landing Page (interest)
      -> Email Capture (lead)
        -> Email Sequence (nurture, 3-5 emails)
          -> Offer Page (conversion)
```

**Estimated conversion rates**:
| Stage | Rate | Monthly volume |
|-------|------|----------------|
| Video viewers to landing page | [1-3%] | [N] |
| Landing page to email | [20-40%] | [N] |
| Email to purchase | [2-5%] | [N] |
| **Estimated monthly product revenue** | | **$[N]** |

**Price point recommendation**: $[N] — [Rationale]

---

### 6. 90-Day Revenue Action Plan

**Month 1: Foundation**
- [ ] [Action item 1] — target: $[N]
- [ ] [Action item 2]
- [ ] [Action item 3]
- **Month 1 revenue target**: $[N]

**Month 2: Activation**
- [ ] [Action item 1] — target: $[N]
- [ ] [Action item 2]
- [ ] [Action item 3]
- **Month 2 revenue target**: $[N]

**Month 3: Optimisation**
- [ ] [Action item 1] — target: $[N]
- [ ] [Action item 2]
- [ ] [Action item 3]
- **Month 3 revenue target**: $[N]

**Total 90-day revenue target**: $[N] (up from $[current] — [X%] increase)
```

## Quality Criteria

- YPP tier classification is accurate based on the stated subscriber count and watch hours
- RPM estimates use realistic niche-specific benchmarks, not inflated averages
- All 7 revenue streams are analysed, even those that are locked (with unlock requirements stated)
- Revenue potential estimates are conservative and based on channel's actual scale
- Brand deal rates use CPM-equivalent calculation, not arbitrary numbers
- FTC disclosure checklist is complete and current
- External funnel conversion rates use industry benchmarks, not optimistic projections
- 90-day plan has specific, measurable targets — not vague goals
- Priority order accounts for channel size: small channels prioritise brand deals and products over ad revenue
- Revenue gap table clearly shows the difference between current and potential income


---

<!-- file: sub-skills/repurpose.md -->

# Repurpose Sub-Skill

This sub-skill transforms a single YouTube video into a complete cross-platform content distribution package. It extracts the highest-value moments for Shorts, restructures the core message for blog posts, social media, email, podcast, and community posts — each adapted to the native format and audience expectations of the target platform rather than simply copy-pasting the transcript.

## Inputs Required

- **Video title** (string): the published or working title
- **Video description or full script** (string): either the YouTube description, bullet-point summary, or complete transcript/script
- **Target platforms** (list): which platforms to generate content for (defaults to all)
- **Available resources** (optional): what the creator has access to (e.g., video editor, blog, email list, podcast feed)
- **Video duration** (optional): total length for timestamp calculations
- **Video chapters/timestamps** (optional): existing chapter markers

## Reference Files to Load

- `references/repurposing-guide.md`
- `references/shorts-playbook.md`

## Parallel Agents

Not required. Execute sequentially.

## Step-by-Step Execution

1. Load both reference files. Internalise platform-specific formatting rules, Shorts extraction criteria, and the repurposing best practices.
2. Analyse the video content to identify the core message, key insights, quotable moments, emotional peaks, and standalone segments that work without full context.
3. Extract 3-5 Shorts candidates. For each, identify the timestamp range, rate the hook quality (does the first 1-3 seconds work standalone?), write a Shorts-native title, and rewrite the hook for vertical scroll-stop format. Determine posting order based on hook strength and topic independence.
4. Generate a blog post outline. Map video chapters or major sections to H2/H3 headings. Design an SEO-optimised structure with a target keyword. Plan YouTube embed placement with timestamp parameters for Google Key Moments markup.
5. Write a LinkedIn post. Extract the professional or industry angle. Write a 150-word hook paragraph plus 3 key takeaways. Match LinkedIn's native tone (insight-driven, no clickbait).
6. Write an X/Twitter thread. Create a hook tweet that stands alone, 4-6 insight tweets that each deliver independent value, and a CTA tweet linking back to the video. Each tweet must be under 280 characters.
7. Write an email newsletter block. Generate 2 subject line A/B variants, preview text (40-90 characters), a 200-word distillation of the video's core value, and a link CTA.
8. Create a podcast episode outline. Restructure the video content for audio-only consumption: remove visual-dependent segments, add verbal context where the video relied on screen content, and suggest a discussion or interview framing.
9. Write a YouTube Community post. Describe an image concept (poll, behind-the-scenes, or key frame), write caption text, and include a CTA driving views to the video. This should publish same-day as the video for maximum algorithm signal.

## Output Template

```markdown
## Repurposing Package: "[Video Title]"

---

### 1. Shorts Extraction (3-5 clips)

| # | Timestamp | Hook Quality | Post Order | Title |
|---|-----------|-------------|------------|-------|
| 1 | [MM:SS-MM:SS] | [Strong/Medium/Weak] | [1st/2nd/etc.] | [Shorts title, 20-40 chars] |
| 2 | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... |

**Clip 1 — "[Title]"**
- **Hook rewrite** (first 1-3s): "[Scroll-stopping opening line]"
- **Why this clip**: [What makes it standalone-worthy]
- **Loop setup**: [How final 1-2s connects back to opening]

*(Repeat for each clip)*

**Posting schedule**: Post Clip [N] first (strongest hook), space remaining clips 2-3 days apart.

---

### 2. Blog Post

**Target keyword**: [Primary SEO keyword]
**Estimated word count**: [N words]

#### Outline:
1. **[H2: Introduction]** — [2-sentence summary, embed video here]
2. **[H2: Section from chapter]** — [Key points, embed at ?t=XXs]
3. **[H2: Section]** — [Key points]
4. ...
5. **[H2: Conclusion / CTA]** — [Summary + link to related content]

**Embed strategy**: Place YouTube embeds with `?t=` timestamps at each major section. Use structured data for Google Key Moments.
**Internal links**: [Suggest 2-3 related posts to link to/from]

---

### 3. LinkedIn Post

> [150-word hook paragraph — professional angle, insight-driven]
>
> 3 Key Takeaways:
> 1. [Takeaway with professional context]
> 2. [Takeaway]
> 3. [Takeaway]
>
> [CTA: link to video or ask engagement question]

**Best posting time**: [Weekday, time range for LinkedIn engagement]

---

### 4. X/Twitter Thread

**Tweet 1 (Hook)**:
> [Hook tweet — standalone insight, under 280 chars]

**Tweet 2-N (Insights)**:
> [Insight tweet — independent value, under 280 chars]

*(4-6 insight tweets)*

**Final Tweet (CTA)**:
> [CTA tweet with video link, under 280 chars]

**Thread length**: [N] tweets
**Best posting time**: [Day/time recommendation]

---

### 5. Email Newsletter

**Subject Line A**: [Variant A — curiosity-driven]
**Subject Line B**: [Variant B — benefit-driven]
**Preview text**: [40-90 characters]

> [200-word distillation of video value]
>
> [CTA button text]: Watch the full breakdown -> [video link]

---

### 6. Podcast Episode Outline

**Episode title**: [Audio-optimised title]
**Estimated duration**: [N minutes]

1. **Intro** ([M:SS]): [Context setting — what listeners will learn]
2. **Segment 1** ([M:SS]): [Topic — add verbal context for visual-dependent parts]
3. **Segment 2** ([M:SS]): [Topic]
4. ...
5. **Outro** ([M:SS]): [Key takeaway + CTA to YouTube video for visual content]

**Adaptation notes**: [What was changed from video format and why]

---

### 7. Community Post (Same-Day Publish)

**Image concept**: [Description — poll option / key frame / behind-the-scenes]
**Caption**:
> [Caption text — 2-3 sentences max]
> [CTA driving to video]

**Post type**: [Image / Poll / Text]
**Timing**: Publish within 1 hour of video going live.
```

## Quality Criteria

- Each platform's content is natively formatted, not a copy-paste of the transcript
- Shorts clips have genuine standalone value — they make sense without watching the full video
- Shorts hooks are rewritten for vertical scroll-stop, not just lifted from the video
- Blog post includes specific embed timestamps and targets a real SEO keyword
- LinkedIn tone is professional and insight-driven, never clickbaity
- Every tweet in the thread is under 280 characters and delivers independent value
- Email newsletter is a distillation (200 words), not a summary of the entire video
- Podcast outline explicitly addresses visual-dependent segments with verbal alternatives
- Community post is designed for same-day publishing to boost algorithm signals
- All CTAs link back to the original video with appropriate context per platform


---

<!-- file: sub-skills/script.md -->

# Retention-Engineered Script

This sub-skill generates a full video script engineered for maximum audience retention, using proven structural patterns — hook-promise-stakes openings, pattern interrupts, forward hooks, and strategic CTAs — all calibrated to the target video length and audience type.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Topic | Yes | Video subject matter |
| Target length | Yes | Desired video duration in minutes |
| Channel type | Yes | Educational, entertainment, vlog, review, tutorial, commentary, etc. |
| Audience persona | Yes | Who is watching (age range, knowledge level, why they clicked) |
| Key points | Yes | Core information/arguments to cover (bullet list) |
| Tone | No | Casual, professional, energetic, conversational (default: conversational) |
| CTA goal | No | Subscribe, product, community, or custom (default: subscribe) |

## Reference Files

- `references/retention-scripting-guide.md`
- `references/algorithm-guide.md`

## Parallel Agents

Not required. This skill runs as a single sequential workflow.

## Execution Steps

1. **Load references**: Read `references/retention-scripting-guide.md` and `references/algorithm-guide.md` fully before writing.
2. **Calculate structure**: Based on target length, compute section durations. Hook: 0:00-0:30. Intro: 0:30-2:00. Mid-CTA: ~25% mark. Retention re-hook: ~60% mark. Outro: final 60 seconds. Remaining time divided among content blocks.
3. **Map key points to chapters**: Assign the provided key points to content blocks. Order them by engagement potential — strongest points early and late, weaker points in the middle (surrounded by pattern interrupts).
4. **Write the hook block**: Produce the 3-part hook (Grab, Promise, Stakes) targeting >70% retention at the 30-second mark.
5. **Write the intro**: Bridge from hook to content. Establish context, stakes, and viewer outcome.
6. **Write content blocks**: Each block opens with a pattern interrupt, delivers value, ends with a micro-summary and forward hook to the next section.
7. **Insert pattern interrupts**: Place one every 60-90 seconds. Mark each with its type tag.
8. **Place CTAs**: Soft mid-CTA at ~25%, hard CTA in outro.
9. **Write outro**: Hard CTA, end screen cue, next video tease.
10. **Annotate retention risks**: Scan the full script for drop-off danger zones. Mark each with a warning symbol and mitigation note.
11. **Add pacing notes**: Insert editor directions throughout.

## Output Template

```
## Script Metadata

- **Topic**: [topic]
- **Target length**: [X] minutes ([Y] words at ~150 words/minute)
- **Channel type**: [type]
- **Audience**: [persona summary]
- **Estimated word count**: [total words]

---

## HOOK (0:00 — 0:30) | Target: >70% retention at 0:30

### Grab (0:00 — 0:05)
[Opening line — the single most important sentence in the video]

[PACING: Deliver fast. No intro graphics. Start mid-thought or mid-action.]

### Promise (0:05 — 0:15)
[What the viewer will get from watching. Specific, tangible outcome.]

### Stakes (0:15 — 0:30)
[Why it matters. What they lose by clicking away. Emotional or practical consequence.]

⚠️ RETENTION RISK: [If applicable — e.g., "Generic promise language. Make the outcome hyper-specific."]

---

## INTRO (0:30 — 2:00) | Context + Credibility

[CAMERA CHANGE]

[Context paragraph: Why this topic, why now, why from this creator.]

[Viewer outcome restatement: "By the end of this video, you'll..."]

[PACING: Moderate. Establish trust but don't linger. Viewers who survived the hook want content.]

---

## CONTENT BLOCK 1: [Chapter Title] (2:00 — X:XX)

[GRAPHIC: Chapter title card]
[Pattern interrupt: opening line that resets attention]
[Core content — spoken-word style: short sentences, direct address ("you"), rhetorical questions.]
[B-ROLL CUE: Describe what should appear on screen]
[Micro-summary: One sentence recap] → [Forward hook: "But that's only half the picture..."]
⚠️ RETENTION RISK: [If applicable — e.g., "Dense info block. Break with visual at 4:30."]

---

## CONTENT BLOCK 2: [Chapter Title] (X:XX — X:XX)

[SOUND EFFECT: Transition sting]
[Pattern interrupt] → [Content delivery] → [UNEXPECTED STAT]
[Micro-summary] → [Forward hook]

---

## MID-CTA (~25% mark, approximately X:XX)

[CAMERA CHANGE] [Soft CTA — conversational, tied to content just delivered. 10-15 seconds max.]
> "If you're finding this useful, hit subscribe — I break down [niche topic] like this every [cadence]."

---

## CONTENT BLOCKS 3+: [Chapter Titles] (X:XX — X:XX)

[Continue pattern: interrupt → content → B-ROLL → micro-summary → forward hook]

## RETENTION RE-HOOK (~60% mark, approximately X:XX)

[CAMERA CHANGE] [Why the remaining content is the most valuable part.]
⚠️ RETENTION RISK: [60% mark is a common drop-off cliff. This re-hook must feel like a second hook.]

---

## OUTRO (final 60 seconds, X:XX — end)

### Hard CTA (15 seconds)
[Direct call-to-action tied to the video's value delivery.]

> "[Specific CTA: subscribe, comment a specific thing, check link in description]"

### End Screen Cue (15 seconds)
[GRAPHIC: End screen overlay]

> "If you liked this, you'll want to watch [related video topic] — I'll put it right here."

[Point to end screen card position]

### Next Video Tease (15 seconds)
[Brief, compelling preview of the suggested next video. Create a mini curiosity gap.]

[PACING: Keep energy up through the final second. No "thanks for watching" wind-down.]

---

## Pattern Interrupt Log

| Timestamp | Type | Description |
|-----------|------|-------------|
| X:XX | [CAMERA CHANGE] | [Brief note] |
| X:XX | [B-ROLL CUE] | [Brief note] |
| X:XX | [GRAPHIC] | [Brief note] |
| X:XX | [SOUND EFFECT] | [Brief note] |
| X:XX | [UNEXPECTED STAT] | [Brief note] |

**Total pattern interrupts**: [X] | **Average interval**: [X] seconds

## Retention Risk Map

| Timestamp | Risk Level | Issue | Mitigation |
|-----------|------------|-------|------------|
| X:XX | ⚠️ High | [Description] | [Solution] |
| X:XX | ⚠️ Medium | [Description] | [Solution] |

## Editor Notes

- [Pacing guidance for specific sections]
- [Music/sound design suggestions]
- [Cut rhythm recommendations]
- [Thumbnail moment candidates with timestamps]
```

## Quality Criteria

- Word count must match target length at ~150 words per minute (within 10% tolerance)
- The hook must contain all three elements: Grab (0-5s), Promise (5-15s), Stakes (15-30s)
- Pattern interrupts must appear every 60-90 seconds — verify by checking the interrupt log timestamps
- Every content block must end with both a micro-summary AND a forward hook
- Mid-CTA must appear at approximately the 25% mark, not earlier
- Retention re-hook must appear at approximately the 60% mark
- All production cue tags must use the exact bracket format: [CAMERA CHANGE], [B-ROLL CUE], [GRAPHIC], [SOUND EFFECT], [UNEXPECTED STAT]
- At least 3 retention risk points must be identified and marked with mitigations
- The script must read as natural spoken language, not written prose — short sentences, contractions, direct address
- The outro must never contain filler phrases like "thanks for watching" or "don't forget to" — maintain energy to the final second


---

<!-- file: sub-skills/seo.md -->

# Video SEO Optimization

This sub-skill generates complete, search-optimized metadata for a YouTube video — titles, description, tags, chapters, hashtags, and structured data — all grounded in keyword strategy and algorithm best practices from the reference playbooks.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Topic/keyword | Yes | Primary topic or target keyword for the video |
| Channel niche | Yes | Channel's content category for contextual optimization |
| Target audience | Yes | Who the video is for (demographics, skill level, intent) |
| Video content summary | Yes | Brief overview of what the video covers (key points, structure) |
| Secondary keywords | No | Additional keywords to weave in |
| Video length | No | Approximate duration (affects chapter planning) |

## Reference Files

- `references/seo-playbook.md`
- `references/algorithm-guide.md`

## DataForSEO Research (When Available)

Use live keyword data to ground SEO recommendations in real metrics:

1. **Primary keyword validation**: Run `dataforseo_labs_google_keyword_overview` with the target keyword to get volume, difficulty, CPC, and intent in one call.
2. **Related keywords**: Use `dataforseo_labs_google_keyword_suggestions` and `dataforseo_labs_google_related_keywords` to expand secondary keyword and long-tail lists with real volume data.
3. **YouTube SERP check**: Run `serp_youtube_organic_live_advanced` with the primary keyword to see:
   - What titles/descriptions are working for top-ranking videos
   - Title length and keyword placement patterns of rank #1-5
   - Competition depth (how many high-view videos exist)
4. **Difficulty assessment**: Use `dataforseo_labs_bulk_keyword_difficulty` on all candidate keywords to prioritise achievable targets.
5. **Intent classification**: Run `dataforseo_labs_search_intent` to confirm whether keyword intent matches the video's content type.

**Fallback:** If DataForSEO is unavailable, proceed with keyword analysis based on reference file heuristics and WebSearch.

**Efficiency:** Batch keywords. Typical SEO metadata workflow costs ~$0.008 (3-5 API calls).

## Parallel Agents

Not required. This skill runs as a single sequential workflow.

## Execution Steps

1. **Load references**: Read `references/seo-playbook.md` and `references/algorithm-guide.md` in full before generating any output.
2. **Keyword analysis**: If DataForSEO is available, use live data from the research phase. Otherwise, from the provided topic/keyword, identify the primary keyword, 3-5 secondary keywords, and 2-3 long-tail variations. Consider search intent (informational, navigational, transactional).
3. **Title generation**: Write 3 title variants following the specifications below. Validate each against the rules in the SEO playbook.
4. **Description writing**: Build the full 5000-character description template following the exact structure specified.
5. **Tag generation**: Produce 10-15 tags within the 500-character limit, ranked by priority.
6. **Chapter timestamps**: Write 5 keyword-rich chapter labels.
7. **Hashtag selection**: Choose 3-5 hashtags with rationale.
8. **Schema markup**: Generate the VideoObject JSON-LD snippet.
9. **Self-check**: Verify all outputs against the quality criteria before returning.

## Output Template

```
## Keyword Strategy

- **Primary keyword**: [keyword] — Search intent: [informational/navigational/transactional]
- **Secondary keywords**: [keyword 2], [keyword 3], [keyword 4]
- **Long-tail variations**: [phrase 1], [phrase 2], [phrase 3]

## Title Variants

### Variant A: Search-Optimized
> [Title — 60-100 chars, primary keyword in first 40 chars, front-loaded for search]

- **Character count**: [X]
- **Keyword position**: Chars [X-Y]
- **Target traffic source**: Search
- **Rationale**: [Why this title works for search discovery]

### Variant B: Browse/Curiosity-Driven
> [Title — 60-100 chars, curiosity hook, emotional trigger, keyword present but not leading]

- **Character count**: [X]
- **Keyword position**: Chars [X-Y]
- **Target traffic source**: Browse/Home feed
- **Rationale**: [Why this title drives clicks from impressions]

### Variant C: Hybrid (Search + Browse)
> [Title — 60-100 chars, keyword front-loaded + curiosity element]

- **Character count**: [X]
- **Keyword position**: Chars [X-Y]
- **Target traffic source**: Search + Browse
- **Rationale**: [Why this balances both discovery paths]

**Recommended title**: [A, B, or C] — [one-sentence justification based on channel size and niche]

## Description

```
[First 150 characters: primary keyword + compelling hook — this is the visible preview text]

⏱ Timestamps:
00:00 - [Chapter 1: keyword-rich label]
XX:XX - [Chapter 2: keyword-rich label]
XX:XX - [Chapter 3: keyword-rich label]
XX:XX - [Chapter 4: keyword-rich label]
XX:XX - [Chapter 5: keyword-rich label]

[250-word body: natural keyword integration, context about the video, value proposition. Include secondary keywords organically. Break into 2-3 short paragraphs for readability.]

🔗 Resources & Links:
- [Mentioned resource 1]: [URL placeholder]
- [Mentioned resource 2]: [URL placeholder]

📱 Connect:
- [Social/website link placeholders]

👉 [Call-to-action: subscribe, comment prompt, or related video link]

#[Hashtag1] #[Hashtag2] #[Hashtag3]
```

**Description stats**: [X] characters | Primary keyword appears [X] times | Secondary keywords: [list with counts]

## Tags

| Priority | Tag | Characters | Rationale |
|----------|-----|------------|-----------|
| 1 | [exact primary keyword] | [X] | Primary target term |
| 2 | [secondary keyword] | [X] | [Rationale] |
| 3 | [long-tail variation] | [X] | [Rationale] |
| ... | ... | ... | ... |
| [10-15] | [broad niche tag] | [X] | Category signal |

**Total characters used**: [X] / 500

## Chapter Timestamps

| Timestamp | Label | Target Keyword |
|-----------|-------|----------------|
| 00:00 | [Keyword-rich intro label] | [keyword] |
| XX:XX | [Chapter 2 label] | [keyword] |
| XX:XX | [Chapter 3 label] | [keyword] |
| XX:XX | [Chapter 4 label] | [keyword] |
| XX:XX | [Chapter 5 label] | [keyword] |

## Hashtags

| Hashtag | Type | Rationale |
|---------|------|-----------|
| #[Hashtag1] | Niche-specific | [Why this hashtag] |
| #[Hashtag2] | Topic-specific | [Why this hashtag] |
| #[Hashtag3] | Broad discovery | [Why this hashtag] |
| #[Hashtag4] | (optional) | [Why this hashtag] |
| #[Hashtag5] | (optional) | [Why this hashtag] |

## VideoObject Schema (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[Recommended title]",
  "description": "[First 150 chars of description]",
  "thumbnailUrl": "[placeholder]",
  "uploadDate": "[YYYY-MM-DD]",
  "duration": "[PT#M#S format]",
  "contentUrl": "[video URL placeholder]",
  "embedUrl": "[embed URL placeholder]",
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": { "@type": "WatchAction" },
    "userInteractionCount": 0
  }
}
```
```

## Quality Criteria

- All three titles must be between 60-100 characters with the primary keyword appearing in the first 40 characters
- The description's first 150 characters must contain the primary keyword and a compelling hook (this is the search preview)
- Tags must total 500 characters or fewer; exactly 10-15 tags provided
- Each tag must include a clear rationale — no filler tags
- The 250-word description body must read naturally, not as keyword stuffing
- Chapter labels must each contain a relevant keyword while remaining descriptive
- Hashtags limited to 3-5; more than 5 triggers YouTube's spam filter
- JSON-LD must be valid schema.org VideoObject markup
- All keyword frequency claims must be verifiable by counting occurrences in the output
- Recommendations must align with the SEO playbook and algorithm guide principles


---

<!-- file: sub-skills/shorts.md -->

# Shorts Sub-Skill

This sub-skill generates a complete YouTube Shorts production package — from concept through script to SEO metadata — optimised for the Shorts algorithm's unique signals (Viewed vs Swiped Away, loop rate, replay rate). It handles both standalone Shorts concepts and repurposing clips from existing long-form content, tailoring output to the creator's goal: channel growth, Shorts monetisation, or funneling viewers to long-form videos.

## Inputs Required

- **Channel niche** (string): the creator's content category
- **Content idea OR existing long-form video** (string): either a new concept, or a video URL/description to repurpose
- **Shorts goal** (one of): `growth` | `monetisation` | `long-form funnel`
- **Target audience** (optional): demographic or viewer persona

## Reference Files to Load

- `references/shorts-playbook.md`
- `references/algorithm-guide.md`
- `references/monetization-guide.md`

## Parallel Agents

Not required. Execute sequentially.

## Step-by-Step Execution

1. Load all three reference files and internalise Shorts algorithm signals, format constraints, and monetisation rules.
2. Determine format: if the user provided an existing long-form video, identify the best repurpose-worthy moments (highest density of value or emotion in under 60 seconds). If a standalone idea, proceed to concept design.
3. Design the hook (first 1-3 seconds). This is the single highest-impact element. The hook must create an open loop, pattern interrupt, or immediate curiosity gap. Refer to the shorts playbook for proven hook formulas.
4. Write the full script/outline with visual change markers every 3 seconds minimum. Structure: Hook (1-3s) then Value bomb (remaining time) then Loop setup (final 1-2s that mirrors or callbacks to the opening frame for seamless replay).
5. Select optimal length. Use the 13-second or 60-second sweet spots from the playbook. Choose 13s for punchy hooks/reveals and 60s for tutorials or storytelling. Avoid 30-45s dead zone unless content demands it.
6. Write SEO metadata: title (4-6 words, 20-40 characters, front-load keyword), description (first 125 characters carry all weight), and 3-5 hashtags.
7. Predict performance using the Viewed vs Swiped Away framework. Flag any Short predicted below 60% viewed rate and suggest fixes.
8. Calculate monetisation context: Shorts ad revenue share RPM for the niche, and flag music licensing impact (using 1 track = 50% revenue share rule).
9. If the goal is `long-form funnel`, design a bridge element: verbal CTA, pinned comment, or visual teaser that drives viewers to a specific long-form video.

## Output Template

```markdown
## YouTube Short: [Working Title]

### Concept Brief
- **Format**: [Standalone / Repurposed from: "Video Title"]
- **Length**: [Xs] — Rationale: [why this length]
- **Goal**: [Growth / Monetisation / Long-Form Funnel]
- **Hook Strategy**: [1-sentence description of the hook approach]

### Script / Outline

| Timestamp | Visual | Audio / Script | Notes |
|-----------|--------|----------------|-------|
| 0:00-0:01 | [HOOK visual — pattern interrupt] | "[Hook line]" | First frame must stop scroll |
| 0:01-0:03 | [Visual change] | "[Setup]" | Open loop established |
| 0:03-0:06 | [Visual change] | "[Value point 1]" | |
| ... | ... | ... | Visual change min every 3s |
| 0:XX-0:XX | [LOOP SETUP — mirrors opening] | "[Callback/loop line]" | Seamless replay trigger |

**Total visual changes**: [N] (minimum 1 per 3 seconds)

### SEO Metadata
- **Title**: [4-6 words, 20-40 chars, keyword front-loaded]
- **Description** (first 125 chars matter):
  > [Description text]
- **Hashtags**: #tag1 #tag2 #tag3 [#tag4] [#tag5]

### Performance Prediction
- **Predicted Viewed vs Swiped Away**: [X%] viewed
- **Status**: [PASS: above 60% / WARNING: below 60% — fix recommended]
- **Risk factors**: [list any weaknesses]
- **Suggested fixes** (if below 60%): [specific changes]

### Monetisation Context
- **Niche Shorts RPM**: $[X.XX] estimated
- **Music licensing**: [No music / Original sound / Licensed track — 50% revenue share applies]
- **Estimated revenue per 1M views**: $[X]

### Long-Form Funnel Bridge
> *(included only when goal = long-form funnel)*
- **Target long-form video**: "[Title]"
- **Bridge method**: [Verbal CTA / Pinned comment / Visual teaser / Cliffhanger]
- **CTA script**: "[Exact words to say/show]"
- **Pinned comment text**: "[Comment text with link context]"
```

## Quality Criteria

- Hook must be completable in 1-3 seconds and create genuine curiosity or pattern interrupt
- Visual change markers appear at minimum every 3 seconds throughout the script
- Loop setup in final 1-2 seconds must logically connect back to the opening
- Title is 4-6 words, 20-40 characters, with primary keyword in first position
- Description front-loads critical information in first 125 characters
- Performance prediction is justified with specific reasoning, not arbitrary
- Monetisation RPM estimate is realistic for the stated niche (cross-reference monetization guide)
- If music is suggested, the 50% revenue share warning is always included
- Long-form funnel bridge is only included when goal is `long-form funnel`
- Total output is actionable: a creator could produce the Short using only this document


---

<!-- file: sub-skills/strategy.md -->

# Channel Positioning + Content Pillars

This sub-skill builds a complete 90-day channel strategy — positioning statement, content pillar framework, niche viability analysis, upload cadence recommendation, and milestone plan — giving creators a clear, actionable roadmap grounded in data from the reference files and matched to their channel type template.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Creator background | Yes | Skills, expertise, personality, on-camera comfort level |
| Target audience | Yes | Who they want to reach (demographics, interests, problems) |
| Niche | Yes | Content category or micro-niche |
| Current channel state | Yes | Subscriber count, video count, monthly views, upload frequency, time creating |
| Competitive landscape | No | Known competitors, gaps spotted, differentiation ideas |
| Resource level | No | Solo creator, small team (2-3), or full team (4+). Default: solo |
| Primary goal | No | Growth, monetisation, authority, community. Default: growth |

## Reference Files

- `references/algorithm-guide.md`
- `references/analytics-guide.md`
- Also load the relevant channel type template from `templates/` based on niche detection

## DataForSEO Research (When Available)

Ground strategy recommendations in live market data:

1. **Niche viability check**: Run `kw_data_google_ads_search_volume` with 10-15 niche keywords to assess real search demand. High volume + informational intent = strong YouTube niche signal.
2. **Competition depth**: Use `serp_youtube_organic_live_advanced` for 3-5 core niche keywords to see how saturated the YouTube landscape is. Check: are top results from mega-channels or is there diversity?
3. **Trend direction**: Use `kw_data_google_trends_explore` with core niche keywords (last 12 months) to confirm the niche is growing, stable, or declining.
4. **Keyword landscape**: Run `dataforseo_labs_google_keyword_ideas` with niche seeds to discover content pillar opportunities and long-tail keyword clusters.
5. **CPM/CPC validation**: Use CPC data from `kw_data_google_ads_search_volume` as a proxy for advertiser demand (higher CPC = higher YouTube RPM for that topic).

**Fallback:** If DataForSEO is unavailable, rely on reference file benchmarks and WebSearch for trend signals.

**Efficiency:** Typical strategy workflow costs ~$0.03 (8-12 API calls).

## Parallel Agents

Not required. This skill runs as a single sequential workflow.

## Execution Steps

1. **Load references**: Read `references/algorithm-guide.md` and `references/analytics-guide.md` in full.
2. **Detect channel type**: Based on the niche and creator background, identify the matching channel template from `templates/`. Load it for archetype-specific guidance.
3. **Craft positioning statement**: Distill the creator's unique angle into one sentence. Apply the micro-niche-then-expand framework: start specific, plan expansion milestones.
4. **Build content pillars**: Design 3-5 pillars using the Hub/Hero/Help framework. Each pillar gets a name, purpose, cadence, and example ideas.
5. **Assess niche viability**: If DataForSEO data is available, use real search volume, CPC, and trend data to ground viability estimates. Otherwise, estimate CPM range, competition density, content lifespan (evergreen vs trend), and months to monetisation.
6. **Set upload cadence**: Based on channel size tier, resource level, and the vidIQ 5M-channel study data referenced in the algorithm guide. Provide the specific reasoning.
7. **Define milestones**: Create concrete, measurable targets for 30, 60, and 90 days. Tie each to specific actions.

## Output Template

```
## Positioning Statement

> [One sentence: "[Creator] helps [target viewer] achieve [outcome] through [unique angle/format] that [differentiator from competitors]."]

### Positioning Breakdown
- **Unique angle**: [What makes this creator's perspective different]
- **Target viewer**: [Specific person, not a demographic — e.g., "first-time homebuyers overwhelmed by conflicting advice"]
- **Differentiation**: [What competitors do NOT offer that this channel will]
- **Micro-niche start**: [The narrow starting point]
- **Expansion path**: [How the niche broadens at 10K, 50K, 100K subscribers]

---

## Content Pillar Framework (Hub / Hero / Help)

### Pillar 1: [Pillar Name] — [Hub/Hero/Help]
- **Purpose**: [What this pillar does for the channel — audience building, authority, search traffic, etc.]
- **Format**: [Video format — tutorial, commentary, review, list, etc.]
- **Posting frequency**: [X per week/month]
- **Target traffic source**: [Search/Browse/Suggested]
- **Example videos**:
  1. [Working title + one-line concept]
  2. [Working title + one-line concept]
  3. [Working title + one-line concept]

### Pillar 2: [Pillar Name] — [Hub/Hero/Help]
- **Purpose**: [What this pillar does]
- **Format**: [Video format]
- **Posting frequency**: [X per week/month]
- **Target traffic source**: [Search/Browse/Suggested]
- **Example videos**:
  1. [Working title + one-line concept]
  2. [Working title + one-line concept]
  3. [Working title + one-line concept]

### Pillar 3: [Pillar Name] — [Hub/Hero/Help]
[Same structure]

### Pillar 4: [Pillar Name] — [Hub/Hero/Help] (if applicable)
[Same structure]

### Pillar 5: [Pillar Name] — [Hub/Hero/Help] (if applicable)
[Same structure]

### Pillar Balance Check
| Pillar | Type | Monthly Videos | % of Output |
|--------|------|---------------|-------------|
| [Name] | [Hub/Hero/Help] | [X] | [X%] |
| [Name] | [Hub/Hero/Help] | [X] | [X%] |
| [Name] | [Hub/Hero/Help] | [X] | [X%] |
| **Total** | — | **[X]** | **100%** |

**Balance assessment**: [Is the Hub/Hero/Help ratio appropriate for this channel's size and goals? Recommended: ~70% Hub, 15% Help, 15% Hero for growth-stage channels]

---

## Niche Viability Analysis

| Factor | Assessment | Detail |
|--------|-----------|--------|
| **Estimated CPM range** | $[X] — $[Y] | [Source: niche benchmarks from reference files] |
| **Competition density** | [Low/Medium/High/Saturated] | [How many established channels, barrier to entry] |
| **Content lifespan** | [Evergreen-heavy / Mixed / Trend-dependent] | [What % of content will drive views 6+ months later] |
| **Audience demand** | [Growing/Stable/Declining] | [Search trend direction, audience size signals] |
| **Monetisation timeline** | [X-Y months to YPP] | [Based on current state + proposed cadence] |
| **Sponsorship potential** | [Low/Medium/High] | [Brand interest level in this niche] |
| **Diversification options** | [List 2-3] | [Courses, products, affiliates, memberships, etc.] |

**Viability verdict**: [Strong/Moderate/Challenging] — [one-sentence summary with the single biggest risk and biggest opportunity]

---

## Upload Cadence Recommendation

**Recommended cadence**: [X long-form videos per week] + [Y Shorts per week]

### Justification
- **Channel size tier** ([tier]): [What the data says about optimal frequency for this tier]
- **Resource level** ([solo/small team/full team]): [Sustainable output at this resource level]
- **vidIQ 5M-channel study finding**: [Specific data point from algorithm guide supporting this cadence]
- **Quality threshold**: [Minimum quality bar — it's better to post less at higher quality than more at lower]

### Weekly Production Schedule
| Day | Activity | Output |
|-----|----------|--------|
| [Day] | [Activity] | [Deliverable] |
| [Day] | [Activity] | [Deliverable] |
| [Day] | [Activity] | [Deliverable] |
| [Day] | [Activity] | [Deliverable] |
| [Day] | [Activity] | [Deliverable] |

---

## 30/60/90 Day Milestones

### Day 30 Milestones
| Milestone | Target | Action Required |
|-----------|--------|----------------|
| Videos published | [X] | [Stick to cadence] |
| Subscribers | [+X from current] | [Specific growth action] |
| Avg views per video | [X] | [SEO + promotion strategy] |
| Avg CTR | [X%] | [Thumbnail/title optimization] |
| Channel identity | [Established] | [Consistent branding, banner, about page] |

### Day 60 Milestones
| Milestone | Target | Action Required |
|-----------|--------|----------------|
| Total videos | [X] | [Cumulative] |
| Subscribers | [+X from current] | [Growth compounds if content is consistent] |
| Top-performing video views | [X] | [Identify what works, double down] |
| Avg AVD | [X%] | [Script and pacing improvements] |
| Community signals | [X comments/video avg] | [Engagement strategy] |

### Day 90 Milestones
| Milestone | Target | Action Required |
|-----------|--------|----------------|
| Total videos | [X] | [Cumulative] |
| Subscribers | [+X from current] | [Growth target] |
| Monthly views | [X] | [Total monthly channel views] |
| Monetisation status | [YPP eligible / on track] | [Revenue readiness] |
| Content system | [Documented] | [Repeatable production workflow] |

---

## Channel Type Template Reference

**Detected channel type**: [Type name]
**Template file**: `templates/[filename]`
**Key template guidance applied**: [2-3 bullet points on how the template influenced this strategy]
```

## Quality Criteria

- The positioning statement must be exactly one sentence and include all four elements: creator, viewer, outcome, differentiator
- Content pillars must follow the Hub/Hero/Help framework with each pillar explicitly labeled
- Each pillar must include exactly 3 example video ideas with working titles
- The pillar balance check must flag imbalances (e.g., all Hub, no Help)
- Niche viability must include a CPM range estimate grounded in reference file data
- Upload cadence must cite the vidIQ 5M-channel study or equivalent data from the algorithm guide
- All 30/60/90 milestones must be numeric and measurable — no vague goals like "grow audience"
- Milestones must be realistic for the stated channel size and resource level
- The micro-niche expansion path must include specific subscriber thresholds for broadening
- The strategy must reference the detected channel type template with specific guidance pulled from it


---

<!-- file: sub-skills/thumbnail.md -->

# Thumbnail Brief + A/B Concepts

This sub-skill produces a detailed thumbnail design brief with three A/B test variants, a title-thumbnail synergy analysis, and niche-specific CTR benchmarks, giving creators or designers a complete specification for high-performing thumbnails without ambiguity.

## Inputs Required

| Input | Required | Description |
|-------|----------|-------------|
| Video title | Yes | The chosen title (or top candidate) |
| Topic | Yes | Video subject for visual concept ideation |
| Channel niche | Yes | Content category for benchmark context |
| Visual style | No | Existing brand style (colors, face prominence, text style) |
| Channel size | No | Helps set realistic CTR targets (default: small) |
| Competitor thumbnails | No | URLs or descriptions of competitor thumbnails for differentiation |

## Reference Files

- `references/thumbnail-ctr-guide.md`
- `references/seo-playbook.md`

## DataForSEO Research (When Available)

Analyse competitor thumbnails with live YouTube SERP data:

1. **Competitor thumbnail scan**: Run `serp_youtube_organic_live_advanced` with the video's target keyword to retrieve top-ranking videos with their `thumbnail_url` fields. This shows what visual styles currently dominate the SERP for this keyword.
2. **Channel context**: Use `serp_youtube_video_info_live_advanced` on the top 3-5 videos to get channel names and subscriber counts — understand whether top thumbnails come from authority channels or small creators.
3. **Differentiation check**: Compare the primary brief against competitor thumbnail patterns to ensure visual distinctiveness in the search results page.

**Fallback:** If DataForSEO is unavailable, use WebSearch for `[keyword] youtube` and manually review thumbnail patterns.

## Thumbnail Generation (When NanoBanana MCP Available)

When the NanoBanana MCP server is configured, generate actual thumbnail images using the `generate_image` tool:

**Tool:** `generate_image`

**Recommended settings for YouTube thumbnails:**
- `aspect_ratio`: `"16:9"` (YouTube standard)
- `resolution`: `"4k"` (maximum quality for 1280×720 YouTube requirement)
- `model_tier`: `"nb2"` (default — best balance of speed and quality for production assets)
- `output_path`: user's project directory or `~/nanobanana-images/`

**Workflow:**
1. After generating the primary thumbnail brief, convert it into a detailed image generation prompt
2. Generate the primary thumbnail: call `generate_image` with a prompt derived from the brief (focal point, expression, text overlay, colour palette, composition all specified)
3. Generate each A/B variant: call `generate_image` with the variant's modified prompt
4. Present all 4 images (primary + 3 variants) to the user for review
5. If the user requests refinements, use iterative prompting to adjust

**Prompt engineering tips for thumbnails:**
- Specify "YouTube thumbnail style" in the prompt
- Include text rendering instructions: `text "[WORD]" in bold white sans-serif with black stroke`
- Specify face expressions precisely: "genuine shocked expression with wide eyes and open mouth"
- Include background colour: "solid [colour] background" or "blurred [scene] background"
- Add "high contrast, vibrant colours, clean composition" for thumbnail aesthetics
- Mention "legible at small size" to encourage clear focal points

**Fallback:** If NanoBanana MCP is unavailable, deliver the text-based thumbnail brief only.
The brief is detailed enough for any designer to execute.

## Parallel Agents

Not required. This skill runs as a single sequential workflow.

## Execution Steps

1. **Load references**: Read `references/thumbnail-ctr-guide.md` and `references/seo-playbook.md` before generating output.
2. **Analyze the title**: Identify what information the title already communicates. The thumbnail must add NEW information — never duplicate the title.
3. **Determine focal strategy**: Based on niche and topic, decide the primary visual approach (face-driven, object-driven, text-driven, comparison, transformation).
4. **Build the primary brief**: Specify every visual element with enough detail that a designer can execute without questions.
5. **Create 3 A/B variants**: Each must change ONE meaningful variable from the primary concept.
6. **Run synergy check**: Verify title + thumbnail follow the information split rule.
7. **Set benchmarks**: Pull CTR benchmarks from the thumbnail-CTR guide for this niche and channel size.

## Output Template

```
## Title-Thumbnail Analysis

- **Title**: [the video title]
- **Title communicates**: [What information the title already provides]
- **Thumbnail must add**: [The complementary information/emotion the thumbnail needs to convey]
- **Information split**: [Title handles X, thumbnail handles Y — no overlap]

---

## Primary Thumbnail Brief

### Focal Point
- **Primary subject**: [What the eye should hit first — face, object, result, etc.]
- **Position**: [Where in the frame — rule of thirds placement, e.g., "Subject right-third, looking left toward text"]
- **Size**: [How much of the frame the focal point occupies — e.g., "60% of frame"]

### Expression/Emotion (if face-based)
- **Target emotion**: [Specific emotion — not just "surprised" but "genuine disbelief with raised eyebrows and open mouth"]
- **Eye direction**: [Looking at camera, looking at object, looking at text]
- **Avoid**: [What NOT to do — e.g., "No fake surprise, no closed-mouth smiles"]

### Text Overlay
- **Text**: [Maximum 3 words — ideally 1-2]
- **Font style**: [Bold sans-serif, handwritten, etc.]
- **Font size**: [Relative to frame — must be legible at 168x94px mobile size]
- **Position**: [Where the text sits — must not overlap the face/focal point]
- **Color**: [High contrast against background — specify exact pairing]
- **Stroke/shadow**: [Outline specifications for legibility]

### Color Palette
- **Primary color**: [Hex code + name] — [Role: background/dominant]
- **Secondary color**: [Hex code + name] — [Role: accent/text]
- **Contrast color**: [Hex code + name] — [Role: pop element that draws eye]
- **Color psychology**: [Why these colors work for this niche/emotion]

### Composition
- **Layout**: [Rule of thirds grid description]
- **Negative space**: [Where and how much — needed for text and visual breathing room]
- **Depth**: [Foreground/background relationship, blur, etc.]
- **Visual flow**: [How the eye moves through the thumbnail — entry point to exit point]

### Mobile Legibility Check
- **At 168x94px**: [What must still be visible — focal point, text, key element]
- **Remove at small size**: [Elements that become noise on mobile]
- **Text size minimum**: [Must pass the "arm's length phone" test]

### DO NOT Include
- [Specific element to avoid and why]
- [Specific element to avoid and why]
- [Specific element to avoid and why]

---

## A/B Test Variants

### Variant A: [Concept Name]
- **What changes from primary**: [One specific variable — color, text, expression, composition]
- **Why test this**: [Hypothesis for why this might outperform]
- **Target segment**: [Who this variant appeals to more — new viewers, returning, search, browse]
- **Predicted CTR direction**: [Higher/Lower than primary and why]

### Variant B: [Concept Name]
- **What changes from primary**: [One specific variable]
- **Why test this**: [Hypothesis]
- **Target segment**: [Who this appeals to]
- **Predicted CTR direction**: [Higher/Lower and why]

### Variant C: [Concept Name]
- **What changes from primary**: [One specific variable]
- **Why test this**: [Hypothesis]
- **Target segment**: [Who this appeals to]
- **Predicted CTR direction**: [Higher/Lower and why]

### A/B Testing Protocol
- **Minimum test duration**: [Hours/days before statistical significance]
- **Primary metric**: CTR (impressions click-through rate)
- **Secondary metric**: AVD (to ensure clicks aren't misleading)
- **Sample size note**: [Minimum impressions before drawing conclusions]

---

## Title + Thumbnail Synergy Check

| Rule | Status | Detail |
|------|--------|--------|
| Information split (no duplication) | [PASS/FAIL] | [What title says vs what thumbnail shows] |
| Emotional alignment | [PASS/FAIL] | [Title tone matches thumbnail emotion] |
| Curiosity amplification | [PASS/FAIL] | [Together they create more curiosity than either alone] |
| Text overlap check | [PASS/FAIL] | [Thumbnail text does not repeat title words] |
| Mobile readability | [PASS/FAIL] | [Both title and thumbnail work at mobile size] |

**Synergy verdict**: [Strong/Moderate/Weak] — [one-sentence assessment]

[If FAIL on any rule: specific fix recommendation]

---

## Benchmark Context

| Metric | This Niche Benchmark | Target for This Video | Source |
|--------|---------------------|----------------------|--------|
| Average CTR | [X%] | [Y%] | thumbnail-ctr-guide.md |
| Top 10% CTR | [X%] | — | thumbnail-ctr-guide.md |
| CTR by channel size ([tier]) | [X%] | [Y%] | thumbnail-ctr-guide.md |

**What the thumbnail must achieve**: [Specific CTR target with context — e.g., "Minimum 5.5% CTR to outperform niche average; 8%+ to reach top quartile for this channel size"]
```

## Quality Criteria

- Text overlay must be 3 words maximum — reject any brief with more
- Color palette must include exact hex codes, not just color names
- The primary brief must be specific enough for a designer to execute without follow-up questions
- Each A/B variant must change exactly ONE variable from the primary concept — not multiple changes
- The synergy check must evaluate all 5 rules and flag any failures with fixes
- Mobile legibility must be explicitly addressed (168x94px test)
- The "DO NOT Include" section must contain at least 3 specific items
- CTR benchmarks must reference the thumbnail-ctr-guide.md with niche-specific numbers
- No thumbnail brief may suggest duplicating information already in the title
- All composition directions must use spatial language a designer can act on (not "make it look good" but "subject occupies right third, 3px white stroke on text")


---

<!-- file: templates/commentary-channel.md -->

# Commentary Channel Template

> News commentary, opinion pieces, cultural essays, reaction/analysis content.
> Traffic mix: Browse Features (~45%) + Suggested (~30%) + Search (~15%) + Shorts (~10%).

---

## 1. Channel DNA

Commentary channels are **personality-driven opinion machines**. The algorithm rewards them for high CTR (pattern-interrupt thumbnails + polarising titles), strong early retention (hot-take hooks), and session-starting Browse traffic. The format is algorithmically distinct because it rides trending topics (high impression volume) while injecting a unique angle (differentiator). Entertainment/Education RPM sits at $2-8 depending on whether the niche leans cultural ($2-5) or news/politics ($5-8). Content has a short shelf life — 70% of lifetime views land in the first 7 days. Success hinges on speed-to-publish and strength of opinion.

## 2. Optimal Content Mix

| Type | % | Description |
|------|---|-------------|
| **Hero** | 25-30% | Trending/timely takes on breaking news or viral moments. Highest impressions, shortest lifespan. |
| **Hub** | 45-50% | Recurring series (weekly roundups, ranking videos, "worst takes" compilations). Builds subscriber habit. |
| **Help** | 20-25% | Evergreen explainers, "why X happened" deep dives. Compounds via Search over months. |

Trending content ratio should sit at 25-30% — high enough to capture spikes, low enough to avoid full dependence on the news cycle.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| **Solo creator** | 2-3 long-form + 3-4 Shorts/week | 12+/month target for 8x faster view growth. Batch record 2-3 evergreen videos, fill gaps with timely takes. |
| **Small team (2-3)** | 3-4 long-form + 5-7 Shorts/week | One person on trending radar, one on editing. Publish timely takes within 24h of event. |

Long-form target: 8-15 minutes (unlocks mid-roll ads at 8 min for ~50% revenue boost). Shorts repurpose best clips from long-form commentary.

## 4. Title Pattern Library

1. "I Need To Talk About [TRENDING TOPIC]"
2. "The [INDUSTRY/COMMUNITY] Has A [PROBLEM] Problem"
3. "[PERSON/BRAND] Just Made A Huge Mistake"
4. "Why Everyone Is Wrong About [TOPIC]"
5. "The Real Reason [EVENT] Happened"
6. "[NUMBER] Things Nobody Is Saying About [TOPIC]"
7. "This Changes Everything For [GROUP/COMMUNITY]"
8. "[TOPIC] Is Worse Than You Think (Here's Why)"
9. "I Was Wrong About [PREVIOUS TAKE] — Here's What Changed"
10. "The [TOPIC] Debate Is Missing The Point"

Front-load the opinion/tension word within the first 40 characters. Entertainment CTR benchmark: 6.0%. Strong commentary channels hit 8-12% by leveraging curiosity + controversy.

## 5. Thumbnail Formula

- **Face with exaggerated expression** (shock, disgust, disbelief) — close-cropped, filling 40-60% of frame
- **Bold 3-4 word text overlay** in contrasting colour (red/yellow on dark backgrounds)
- **Reference image** of the subject/topic in remaining space (screenshot, logo, person discussed)
- **High contrast + saturation** — commentary thumbnails compete in Browse where everything is small
- Avoid: cluttered backgrounds, more than 2 faces, small text, neutral expressions
- A/B test expression intensity — "concerned" often outperforms "screaming"

## 6. Hook Style

**Primary: Shock/Contradiction** — Open with a bold, counter-consensus statement that forces the viewer to stay and hear the reasoning. "Everyone is celebrating [X], but nobody is talking about the part that should terrify you."

**Secondary: Curiosity-gap** — Tease the conclusion without revealing it. "What [PERSON] just did isn't just bad — it's the beginning of something much bigger."

Deliver the hook in 0-5 seconds. Cut to a brief context-set (5-15 seconds), then promise the payoff structure: "Let me explain why in 3 parts." Retention benchmark: aim for 55-65% at 30 seconds (above the 42.1% educational average).

## 7. Monetisation Priority Stack

| Rank | Stream | Why This Position |
|------|--------|-------------------|
| 1 | **AdSense** | Primary driver. $2-8 RPM. 8-min+ videos unlock mid-rolls. Volume strategy — more uploads = more revenue. |
| 2 | **Brand Deals** | At 5K-15K avg views: $1K-1.5K/video. Commentary audiences are engaged and trust the creator's opinion. |
| 3 | **Memberships** | Loyal audiences pay for early access, behind-the-scenes, extended cuts. $4.99/month sweet spot. YouTube takes 30%. |
| 4 | **External Funnels** | Newsletter, podcast, Patreon. Own the audience off-platform. Email list is insurance against algorithm shifts. |
| 5 | **Super Chat/Thanks** | Works if you do occasional livestream commentary on breaking events. Spiky but real revenue. |
| 6 | **Shorts Ad Share** | Repurposed clips generate incremental revenue. RPM is low ($0.01-$0.07) but drives long-form discovery. |
| 7 | **Shopping Affiliate** | Lowest priority — commentary rarely has natural product tie-ins unless reviewing physical products. |

## 8. Growth Trajectory

| Milestone | Timeline | Key Metrics |
|-----------|----------|-------------|
| 0-500 subs | Months 1-3 | 20-30 videos published. Find your angle. 1-2 videos catch trending waves. |
| 500-1K subs (YPP Expanded) | Months 3-5 | 3K watch hours. Enable memberships/Super Chat. Consistent upload habit locked in. |
| 1K-5K subs (Full YPP) | Months 5-10 | 4K watch hours. AdSense active. 1-2 videos per month hit 5K+ views. Recognisable style established. |
| 5K-25K subs | Months 10-18 | Brand deal inquiries begin. 5K-15K avg views. Community tab active. First viral hit (50K+ views). |
| 25K-100K subs | Months 18-30 | Consistent Browse traffic. $2K-5K/month total revenue. Audience expects your take on every major event. |

Using both long-form + Shorts accelerates these timelines by 40-60%.

## 9. Common Failure Modes

**1. Trending-only trap** — Chasing every news cycle with no evergreen content. Views spike and crash. No compounding growth. **Fix**: Maintain 20-25% evergreen "Help" content. Create a signature series that runs regardless of news.

**2. Personality fade** — Copying other commentators' styles instead of developing a distinct voice. Audience has no reason to choose you over established creators. **Fix**: Define 3 opinion pillars (topics where you always have a take). Develop a catchphrase or recurring segment. Let your background/expertise differentiate you.

**3. Burnout from speed pressure** — Commentary rewards fast publishing, which leads to 7-day-a-week production and creative exhaustion. **Fix**: Batch-record 2-3 evergreen videos during slow news weeks. Use Shorts for quick takes instead of full productions. Build a 3-video buffer of non-timely content.


---

<!-- file: templates/education-channel.md -->

# Education Channel Template

> How-to guides, explainers, mini-courses. The highest-retention format on YouTube (42.1% avg).

---

## 1. Channel DNA

Education channels win on **utility density** -- the algorithm rewards them because viewers
watch longer (42.1% retention vs ~30% platform avg) and return via Search + Suggested.
Google treats educational content as dual-surface: ranking in both web results (Key Moments)
and YouTube search. This makes every upload a compound-interest asset. The algorithmic
signature is high watch time per impression, strong returning-viewer ratio, and playlist
completion rates that signal binge-worthy structure. CPM $5-12, RPM $8-15.

## 2. Optimal Content Mix

| Type | Share | Purpose |
|------|-------|---------|
| **Help** | 60% | Searchable how-tos, FAQ answers, skill tutorials |
| **Hub** | 30% | Weekly series, course playlists, deep-dive explainers |
| **Hero** | 10% | Myth-busting, "everything you know is wrong" tentpoles |

Evergreen ratio target: 80%+. Trending/timely content is secondary.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| Solo creator | 2/week (8-10/month) | Batch-film 4 videos in one session |
| Small team | 3/week (12+/month) | 12+/month = 8x faster view growth (vidIQ data) |

Supplement with 2-3 Shorts/week (key concept clips). Long-form + Shorts = 40-60% faster growth.
Target 8-15 min per video to unlock mid-roll ads (~50% revenue increase).

## 4. Title Pattern Library

1. `How to [Skill] in [Timeframe] (Even If You're a [Beginner Descriptor])`
2. `[Topic] Explained in [Number] Minutes`
3. `The [Number] Biggest Mistakes in [Skill] (and How to Fix Them)`
4. `[Topic]: What I Wish I Knew [Timeframe] Ago`
5. `Why [Common Belief] Is Wrong -- The Science of [Topic]`
6. `Complete [Skill] Tutorial for Beginners ([Year] Edition)`
7. `[Expert/Source] Says Do THIS to [Desired Outcome]`
8. `I Studied [Topic] for [Time] -- Here's What Actually Works`
9. `[Number] [Topic] Tips That Will Change How You [Activity]`
10. `Stop [Common Mistake] -- Do THIS Instead ([Topic] Guide)`

Front-load the keyword. Keep titles under 55 characters when possible.

## 5. Thumbnail Formula

- **Text**: 1-3 bold words max (the "what"), high contrast against background
- **Layout**: Before/After or Step-number visual (e.g., "Step 1 -> Result")
- **Face**: Optional but effective -- curious/excited expression with prop or tool
- **Colors**: High-saturation backgrounds (yellow, teal) with white or black text
- **Avoid**: Cluttered diagrams. Save complexity for the video, sell simplicity in the thumb.
- Target CTR: 4.5% (Education niche avg), aim for 6%+ with optimized thumbs.

## 6. Hook Style

**Primary: Problem-Agitation** -- "You've been doing [X] wrong, and it's costing you [Y]."
Open by naming a specific pain point the viewer searched for, agitate with a relatable
consequence, then promise the fix within the video. First 30 seconds must restate the
title promise and preview the payoff. Education viewers are intent-driven; respect their
time by front-loading value.

**Secondary: Curiosity-Gap** -- for Hub/Hero content where the viewer didn't search directly.

## 7. Monetisation Priority Stack

1. **AdSense** -- High RPM ($8-15) + mid-rolls on 8+ min videos = primary revenue
2. **External Funnels** -- Courses, ebooks, templates, Notion packs (highest margin)
3. **Brand Deals** -- Education audiences are high-trust; sponsors pay premium CPMs
4. **Memberships** -- Bonus lessons, early access, community Q&A
5. **Shopping Affiliate** -- Tools, books, software relevant to your niche
6. **Super Chat/Thanks** -- Moderate; works best during live Q&A sessions
7. **Shorts Ad Share** -- Supplemental; Shorts drive awareness more than revenue

## 8. Growth Trajectory

| Milestone | Timeline | Key Lever |
|-----------|----------|-----------|
| 500 subs / 3K watch hrs (YPP Expanded) | Months 2-4 | 30+ searchable Help videos |
| 1K subs / 4K watch hrs (Full YPP) | Months 4-7 | Playlist structure, 5-10 per playlist |
| 10K subs | Months 8-14 | Series content + Shorts funnel |
| 50K subs | Months 14-24 | Collab with adjacent educators, course launch |
| 100K subs | Months 20-36 | Compounding evergreen library (40% watch time boost from playlists) |

## 9. Common Failure Modes

**1. Lecture mode -- talking AT the viewer instead of solving WITH them.**
Fix: Open every video with a concrete problem. Use "you" not "we." Show the outcome first.

**2. Ignoring chapters and Key Moments markup.**
Fix: Add timestamps in the description (00:00 format). This enables Google Key Moments,
doubles your search surface, and improves retention by letting viewers skip to relevance.

**3. Over-investing in production, under-investing in volume.**
Fix: Education viewers value clarity over cinematography. A clean screen recording with
good audio beats a cinematic shoot with weak content. Hit 8+/month before upgrading gear.


---

<!-- file: templates/entertainment-channel.md -->

# Entertainment Channel Template

> Comedy, challenges, reactions, skits. Browse Features dominant. Maximum pattern-interrupt density.

---

## 1. Channel DNA

Entertainment channels live and die by **Click-Through Rate and early retention**.
The algorithm surfaces them primarily through Browse Features (Home/Suggested), not Search.
This means every video competes in a visual auction against every other genre on the viewer's
home page. The algorithmic signature is high CTR (target 6%+, niche avg 6.0%), above-average
first-30-second retention, and strong new-viewer conversion. RPM is low ($2-5) so volume
and scale are the monetisation strategy. Virality potential is the highest of any format.

## 2. Optimal Content Mix

| Type | Share | Purpose |
|------|-------|---------|
| **Hero** | 40% | Big swings -- challenges, collabs, trending topic riffs |
| **Hub** | 30% | Recurring series, character bits, weekly formats |
| **Help** | 10% | Behind-the-scenes, "how we made this" (audience bonding) |
| **Trending** | 20% | React to current events, memes, viral moments within 48 hrs |

Evergreen ratio: ~30%. Trending/timely content mix is higher than any other format.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| Solo creator | 3/week (12+/month) | 12+/month = 8x faster view growth; critical for entertainment |
| Small team | 4-5/week (16-20/month) | Include 4-6 Shorts/week from long-form clips |

Shorts are essential here. Long-form + Shorts = 40-60% faster growth. Entertainment Shorts
have the highest viral ceiling. Target 8-12 min for long-form to unlock mid-rolls (~50% revenue boost).

## 4. Title Pattern Library

1. `I [Extreme Action] for [Timeframe] and [Unexpected Result]`
2. `[Number] People, [Number] [Objects] -- Last to [Action] Wins [Prize]`
3. `We Tried [Trending Thing] and It [Shocking Outcome]`
4. `[Person/Group] Reacts to [Viral/Extreme Content] for the First Time`
5. `I Let [Person/Stranger/AI] Control My [Life Aspect] for [Time]`
6. `[Impossible-Sounding Challenge] (It Actually Worked)`
7. `I Spent [Time/Money] on [Absurd Thing] -- Was It Worth It?`
8. `Why [Obvious Thing] Is Actually [Contradictory Claim]`
9. `[Number] Things You Should NEVER Do at [Location/Situation]`
10. `I Surprised [Person] with [Extreme Gift/Prank/Experience]`

Titles must provoke curiosity or disbelief. All-caps on ONE word max. Under 50 characters ideal.

## 5. Thumbnail Formula

- **Face**: Exaggerated emotion (shock, joy, fear) is non-negotiable. Full-face, close crop.
- **Text**: 0-2 words max. The face IS the message.
- **Colors**: Saturated, contrasting. Red/yellow urgency. Avoid muted tones.
- **Composition**: Before/After split, or face + extreme situation juxtaposition
- **Motion implication**: Thumbnails that suggest something is about to happen outperform static poses
- Target CTR: 6.0% (niche avg). Aim for 8%+ on Hero content.

## 6. Hook Style

**Primary: Shock/Contradiction** -- "This is the dumbest thing I've ever done." Open with the
most extreme, unexpected, or visually arresting moment. Entertainment viewers make a
stay-or-leave decision in 3-5 seconds. Cold-open with the climax teaser, then rewind.

**Secondary: Story-Open** -- for series/Hub content. "So last Tuesday something happened
that changed everything..." builds parasocial investment.

Pattern interrupt density: aim for a visual or tonal shift every 30-60 seconds to sustain
the attention of Browse-sourced viewers who had no prior search intent.

## 7. Monetisation Priority Stack

1. **Brand Deals** -- Scale compensates for low RPM; entertainment reach = brand awareness budgets
2. **AdSense** -- Low RPM ($2-5) but high volume; mid-rolls on 8+ min videos essential
3. **Shorts Ad Share** -- Entertainment Shorts get massive views; revenue adds up at scale
4. **External Funnels** -- Merch, apparel, catchphrase products (audience identity purchases)
5. **Super Chat/Thanks** -- Strong during live streams; entertainment audiences are emotionally engaged
6. **Memberships** -- Behind-the-scenes, bloopers, early access to videos
7. **Shopping Affiliate** -- Lowest priority; entertainment audiences have low purchase intent per video

## 8. Growth Trajectory

| Milestone | Timeline | Key Lever |
|-----------|----------|-----------|
| 500 subs / 3K watch hrs (YPP Expanded) | Months 1-3 | High-volume Shorts + 2 long-form/week |
| 1K subs / 4K watch hrs (Full YPP) | Months 3-5 | One viral hit can shortcut this entirely |
| 10K subs | Months 5-10 | Recurring series that trains return viewers |
| 100K subs | Months 10-18 | Collab network + consistent Hero content |
| 500K subs | Months 18-36 | Format evolution, multi-platform clips (TikTok, IG Reels) |

Entertainment has the widest variance. One breakout video can compress any milestone by months.

## 9. Common Failure Modes

**1. CTR collapse from repetitive thumbnails.**
Fix: A/B test thumbnails aggressively. Rotate face expressions, colors, and compositions.
Never use the same visual template more than 3 videos in a row. The Home feed punishes
pattern fatigue.

**2. Chasing trends without a channel identity.**
Fix: React to trends through YOUR format lens. The trend is the ingredient; your series
format is the recipe. Viewers should recognize your video before reading the channel name.

**3. Revenue disappointment from low RPM ($2-5) leading to burnout.**
Fix: Entertainment RPM is structurally low. Plan for it. Diversify early into brand deals
and merch. Treat AdSense as baseline, not the business model. At 100K+ subs, brand deals
should be 50%+ of income.


---

<!-- file: templates/niche-authority-channel.md -->

# Niche Authority Channel Template

> Deep-dive single-topic expertise. Finance, business, tech, health, law, real estate, B2B.
> Traffic mix: Search (~40%) + Suggested (~30%) + Browse (~20%) + External (~10%).

---

## 1. Channel DNA

Niche authority channels are **keyword-compounding search engines disguised as YouTube channels**. The algorithm rewards them for high average view duration on evergreen content, topical clustering (related videos suggesting each other), and consistent upload within a tight semantic field. This format commands the highest CPMs on YouTube — Finance $20-40+, Tech $15-25, Business $8-14, Education $8-15 — because advertisers bid aggressively for purchase-intent audiences. 70-80% of content is evergreen, generating views for 12-36 months after upload. Growth is slow but compounds exponentially once topical authority is established (YouTube's system recognises the channel as *the* source for a subject).

## 2. Optimal Content Mix

| Type | % | Description |
|------|---|-------------|
| **Help** | 50-60% | Search-optimised how-tos and explainers. "How to [DO THING] in [YEAR]", "What is [CONCEPT] explained simply". Highest retention format (42.1% avg). |
| **Hub** | 25-30% | Recurring series for subscribers. Weekly market updates, case studies, Q&A, tool reviews. Builds habit loop. |
| **Hero** | 10-15% | Tentpole deep dives, industry predictions, "complete guide" videos. High production value. Attract new audiences. |

Micro-niche start strategy: cover 1 tight sub-topic exhaustively (e.g., "index fund investing" not "finance"), then expand outward after establishing authority.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| **Solo creator** | 2 long-form + 2-3 Shorts/week | 10-12/month. Quality over quantity — each video must target a specific keyword cluster. |
| **Small team (2-3)** | 3-4 long-form + 3-5 Shorts/week | Researcher handles keyword mapping, editor handles post. Creator focuses on scripting and delivery. |

Long-form target: 10-20 minutes. Educational content retains well at longer lengths. Every video above 8 minutes unlocks mid-roll ads (~50% revenue increase). Shorts repurpose key takeaways and definitions for discovery.

## 4. Title Pattern Library

1. "[TOPIC] Explained In [TIME] Minutes (Beginner to Advanced)"
2. "How To [ACHIEVE RESULT] — Step By Step Guide ([YEAR])"
3. "I Analyzed [NUMBER] [THINGS] — Here's What Actually Works"
4. "[COMMON ADVICE] Is Wrong — Do This Instead"
5. "The [NUMBER]-Step [FRAMEWORK] For [DESIRED OUTCOME]"
6. "Why [NUMBER]% of [PEOPLE] Fail At [TOPIC] (And How To Fix It)"
7. "[TOPIC]: Everything You Need To Know Before [ACTION]"
8. "I Spent [TIME] Learning [SKILL] — Here's What Nobody Tells You"
9. "[TOOL/METHOD] vs [TOOL/METHOD]: Which Is Actually Better?"
10. "The Complete [TOPIC] Guide For [SPECIFIC AUDIENCE] ([YEAR])"

Include the target keyword in the first 40 characters. Education CTR benchmark: 4.5%. Niche authority channels with strong titles hit 6-9% because impressions are highly targeted.

## 5. Thumbnail Formula

- **Clean, minimal design** — 2-3 elements maximum. White/light background with bold text.
- **Data visualisation element** — chart, graph, number, comparison arrow. Signals depth and credibility.
- **Creator face (optional)** — if present, use "explaining" expression (slightly raised eyebrow, pointing gesture), not shock/screaming.
- **Brand-consistent colour palette** — use the same 2-3 colours across all thumbnails for instant recognition in Suggested.
- **Large keyword/number** as text overlay — "7 Steps", "$100K", "2026 Guide".
- Avoid: clickbait faces, cluttered backgrounds, trendy fonts that date quickly.
- Playlists with consistent thumbnail style increase watch time by 40% (5-10 videos per playlist).

## 6. Hook Style

**Primary: Problem-agitation** — Name the viewer's exact pain point and intensify it before offering the solution. "If you've been [DOING COMMON THING], you're probably losing [MONEY/TIME/RESULTS] every single month — and the fix takes less than 10 minutes."

**Secondary: Curiosity-gap** — Tease a counter-intuitive finding. "After researching [NUMBER] case studies, one pattern kept appearing that nobody in [INDUSTRY] talks about."

Deliver the hook in 0-8 seconds. Follow with a credibility stamp (10-20 seconds): your qualification, data source, or "I've spent X years doing this." Then road-map the video structure. Retention benchmark: aim for 50-60% average view duration (educational how-tos average 42.1%).

## 7. Monetisation Priority Stack

| Rank | Stream | Why This Position |
|------|--------|-------------------|
| 1 | **AdSense** | Highest RPM format on YouTube. Finance $20-40+, Tech $15-25, Education $8-15. 10-20 min videos with mid-rolls compound aggressively. |
| 2 | **External Funnels** | Courses, coaching, consulting, paid communities. A 10K-sub niche authority channel can generate $5K-20K/month from a $500 course or $200/hr consulting. |
| 3 | **Brand Deals** | Premium CPMs attract premium sponsors. At 5K-15K avg views: $1K-1.5K/video, but niche authority channels command 2-3x that due to audience quality. |
| 4 | **Shopping Affiliate** | Natural fit — reviewing tools, software, financial products. Commission-based revenue compounds with evergreen content. |
| 5 | **Memberships** | Behind-the-scenes, exclusive analysis, early access. $9.99-$49.99/month tiers work when audience is professional. YouTube takes 30%. |
| 6 | **Super Chat/Thanks** | Live Q&A sessions on niche topics generate solid Super Chat revenue from professionals seeking advice. |
| 7 | **Shorts Ad Share** | Low RPM ($0.01-$0.07) but drives discovery for high-RPM long-form. Treat as a funnel, not a revenue stream. |

## 8. Growth Trajectory

| Milestone | Timeline | Key Metrics |
|-----------|----------|-------------|
| 0-500 subs | Months 1-4 | 30-40 videos covering the core keyword cluster. Search traffic begins compounding. Low views but high retention. |
| 500-1K subs (YPP Expanded) | Months 4-7 | 3K watch hours. Topical authority signals emerge — videos start appearing in Suggested alongside established channels. |
| 1K-5K subs (Full YPP) | Months 7-14 | 4K watch hours. AdSense active at premium RPMs. First $500-1K month. External funnel (course/consulting) soft-launched. |
| 5K-25K subs | Months 14-24 | Brand deals at premium rates. Course/consulting generating $2K-10K/month. Invited to speak/collaborate in industry. |
| 25K-100K subs | Months 24-36 | Recognised authority. $10K-30K/month total (AdSense + external). Evergreen library generates passive income. Book/speaking opportunities. |

Growth is slower than entertainment channels but revenue-per-subscriber is 5-10x higher. Long-form + Shorts together accelerate timelines by 40-60%.

## 9. Common Failure Modes

**1. Niche too broad from day one** — Starting as "finance" instead of "index fund investing for beginners." YouTube cannot classify the channel, Suggested traffic never activates. **Fix**: Pick a micro-niche you can dominate with 30-50 videos. Expand only after you rank on page 1 for your core terms. Map out 50 keyword clusters before recording a single video.

**2. Expert's curse — overcomplicating content** — Using jargon, skipping fundamentals, assuming viewer knowledge. Retention craters after the first 2 minutes. **Fix**: Script for a smart 14-year-old. Define every term. Use analogies. Check retention graphs — if there is a cliff at minute 2-3, the content jumped too far ahead.

**3. Neglecting packaging for substance** — Assuming great content sells itself. Weak titles and plain thumbnails mean low CTR, so YouTube stops serving impressions. **Fix**: Spend 30% of production time on title + thumbnail. A/B test thumbnails. Study top-performing videos in adjacent niches for packaging patterns. CTR below 4% on a niche channel means the packaging is the bottleneck, not the content.


---

<!-- file: templates/personal-brand-channel.md -->

# Personal Brand Channel Template

> Creator-as-brand, multi-format content. Talking head, tutorials, vlogs, interviews, behind-the-scenes.
> Traffic mix: Browse (~35%) + Suggested (~25%) + Search (~20%) + External (~15%) + Shorts (~5%).

---

## 1. Channel DNA

Personal brand channels are **trust-building engines that monetise off-platform**. The algorithm treats them as hybrid — partly educational, partly entertainment — which means they pull from multiple traffic sources without dominating any single one. The creator IS the product. Content ranges across formats (talking head, tutorial, vlog, interview, podcast clips) unified by the creator's perspective and expertise. RPM varies wildly ($5-25) depending on topic overlap. The key algorithmic signal is returning viewers — YouTube's "New and returning viewers" metric matters more here than raw impressions. Revenue skews premium: courses, coaching, consulting, and email-list-driven funnels typically generate 3-10x more than AdSense.

## 2. Optimal Content Mix

| Type | % | Description |
|------|---|-------------|
| **Hub** | 40-50% | Recurring formats subscribers expect. Weekly vlogs, "day in my life", process breakdowns, lessons learned. Builds parasocial connection. |
| **Help** | 25-35% | Tutorials and how-tos tied to the creator's expertise. Searchable, evergreen. Attracts new audience via Search. |
| **Hero** | 15-20% | Milestone videos, collaborations, challenges, high-production pieces. Spiky growth moments. |

Multi-format is a feature, not a bug — but each format should reinforce the same personal brand positioning. Avoid randomness.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| **Solo creator** | 1-2 long-form + 3-5 Shorts/week | 12+/month total for 8x faster view growth. Alternate between high-effort (tutorial) and low-effort (talking head, behind-scenes). |
| **Small team (2-3)** | 2-3 long-form + 5-7 Shorts/week | Delegate editing entirely. Creator focuses on scripting, filming, and community. One interview/collab per month. |

Long-form target: 8-15 minutes for talking head/tutorials (mid-roll eligible at 8 min for ~50% revenue boost). Vlogs can run 12-20 minutes. Shorts capture daily moments and repurpose key lessons.

## 4. Title Pattern Library

1. "How I [ACHIEVED RESULT] In [TIMEFRAME] (And You Can Too)"
2. "I Tried [METHOD/TOOL] For [TIMEFRAME] — Here's What Happened"
3. "[NUMBER] Lessons From [EXPERIENCE] That Changed Everything"
4. "The Truth About [TOPIC] Nobody Tells You"
5. "Why I Quit [OLD THING] And Started [NEW THING]"
6. "A Day In My Life As A [ROLE/TITLE] ([DETAIL])"
7. "What [NUMBER] Years Of [SKILL] Taught Me About [BIGGER TOPIC]"
8. "I Asked [EXPERT/AUDIENCE] Their [TOPIC] Secrets — Best Answers"
9. "My Honest [TOOL/PRODUCT/SYSTEM] Review After [TIMEFRAME]"
10. "How To [SKILL] Like A [ASPIRATIONAL IDENTITY] (Step By Step)"

Personal brand titles always feature "I" or "My" — the creator is the lens. Front-load the emotional hook within 40 characters.

## 5. Thumbnail Formula

- **Creator's face as the consistent anchor** — same face, varying expression and context. Builds visual brand recognition.
- **Before/after or transformation visual** — results-oriented imagery (workspace, physique, dashboard, etc.)
- **Minimal text** — 2-4 words maximum. The face does the selling. Text adds context only.
- **Signature colour or style element** — consistent border, background tone, or text style across all thumbnails.
- **Lifestyle context cues** — studio, office, travel location, event stage. Signal the aspirational identity.
- Avoid: generic stock imagery, inconsistent styles that make the channel page look random, hiding the creator's face.
- Organise content into 5-10 video playlists by format/topic for 40% watch time increase.

## 6. Hook Style

**Primary: Story-open** — Begin with a personal moment that grounds the video in lived experience. "Six months ago, I was [SITUATION] and I made a decision that completely changed my [BUSINESS/LIFE/CAREER]."

**Secondary: Problem-agitation** — Address a pain the audience shares with the creator. "Every creator hits a point where [COMMON STRUGGLE]. I spent [TIME] figuring out what actually works."

Open with 5-10 seconds of story or personal stake. Cut to a quick "here's what this video will give you" promise (10-15 seconds). Then transition into content. Personal brand hooks work because the audience already trusts the creator — leverage that by being vulnerable and specific, not clickbaity.

## 7. Monetisation Priority Stack

| Rank | Stream | Why This Position |
|------|--------|-------------------|
| 1 | **External Funnels** | Courses, coaching, digital products, consulting. This is the primary business model. A 5K-sub personal brand channel with a $200 course can generate $5K-15K/month. Email list is the critical asset — drive every viewer to subscribe. |
| 2 | **Brand Deals** | Personal brands command premium sponsorship rates because of audience trust. At 5K-15K avg views: $1K-1.5K/video. Long-term partnerships (3-6 month deals) are more valuable than one-offs. |
| 3 | **Memberships** | Community access, exclusive Q&A, early content. $4.99-$14.99/month. YouTube takes 30%. Alternative: run memberships on Patreon/Skool to keep 90%+. |
| 4 | **AdSense** | Secondary revenue. RPM varies ($5-25) based on topic mix. Reliable baseline but rarely the primary income driver for personal brands. |
| 5 | **Shopping Affiliate** | Recommend tools, books, gear you actually use. Authentic affiliate content converts well when the audience trusts the creator. |
| 6 | **Super Chat/Thanks** | Live sessions, AMAs, community calls. Supplement income during launch events or live workshops. |
| 7 | **Shorts Ad Share** | Low RPM ($0.01-$0.07). Use Shorts for awareness and email-list growth, not direct revenue. |

**Critical asset: the email list.** Every video should include a CTA driving viewers to a lead magnet (free guide, template, mini-course). An email list of 5K converts at 2-5% on a $200 product = $20K-50K per launch.

## 8. Growth Trajectory

| Milestone | Timeline | Key Metrics |
|-----------|----------|-------------|
| 0-500 subs | Months 1-3 | 20-30 videos across 2-3 formats. Find which format resonates (talking head vs tutorial vs vlog). Build email list from day 1. |
| 500-1K subs (YPP Expanded) | Months 3-6 | 3K watch hours. Enable memberships. Email list: 200-500. First collaborations with similar-sized creators. |
| 1K-5K subs (Full YPP) | Months 6-12 | 4K watch hours. AdSense active. Soft-launch first digital product. Email list: 500-2K. Community starting to self-identify. |
| 5K-25K subs | Months 12-20 | Brand deals active. Course/coaching generating $2K-10K/month. Email list: 2K-10K. Speaking/podcast guest invitations. |
| 25K-100K subs | Months 20-36 | Full-time creator income. $10K-30K/month total. Multiple revenue streams active. Email list: 10K-30K. Recognised industry name. |

Long-form + Shorts together accelerate these timelines by 40-60%. Personal brand channels monetise earlier than entertainment channels because off-platform revenue does not require YPP.

## 9. Common Failure Modes

**1. Identity scatter — too many topics, no positioning** — Posting fitness, then finance, then tech reviews, then travel vlogs. YouTube cannot identify the audience, Browse traffic never activates, and no community forms. **Fix**: Define your personal brand in one sentence: "I help [AUDIENCE] achieve [RESULT] through [METHOD]." Every video should pass this filter. Multi-format is fine; multi-topic without a through-line is not.

**2. Ignoring the email list** — Treating YouTube as the entire business instead of as a top-of-funnel channel. When the algorithm shifts, revenue disappears overnight. **Fix**: Add a lead magnet CTA to every video (pinned comment + verbal mention). Aim for 10-20% of subscribers on the email list. Email is the only audience you truly own.

**3. Perfectionism paralysis** — Personal brand creators often delay publishing because "it's not good enough" or "I need better equipment." Publishing frequency drops below 8/month and growth stalls. **Fix**: Adopt a "70% good enough" rule for talking head content. Invest production value only in Hero videos. A consistent creator with a phone camera outperforms a perfectionist with a cinema rig who posts twice a month. The 12+/month threshold drives 8x faster growth.


---

<!-- file: templates/review-channel.md -->

# Review Channel Template

> Product reviews, comparisons, unboxings. Search-dominant. Shopping affiliate powerhouse. Tech RPM $15-25.

---

## 1. Channel DNA

Review channels are **purchase-decision engines**. Viewers arrive with buying intent, making
this format the highest commercial-value content on YouTube. The algorithm surfaces reviews
through Search (70%+ of traffic) and Google Shopping/web results (dual-surface). The
algorithmic signature is high search impression share, strong click-to-watch-completion
(viewers watch until they get their answer), and Shopping shelf eligibility. Tech niche
CTR averages 7.5%. RPM is among the highest on the platform: Tech $15-25, Finance $20-40+.
Every video is a long-tail affiliate asset.

## 2. Optimal Content Mix

| Type | Share | Purpose |
|------|-------|---------|
| **Help** | 55% | Single-product reviews, "Is [X] worth it?" decision videos |
| **Hub** | 30% | "X vs Y" comparisons, "Best [Category] of [Year]" roundups, series |
| **Hero** | 15% | Major launch-day reviews, "I tested every [product] so you don't have to" |

Evergreen ratio target: 70%+. Product reviews lose relevance as models refresh, but
comparison and "best of" roundups compound. Update titles with year tags annually.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| Solo creator | 2/week (8-10/month) | Align with product release cycles; batch B-roll |
| Small team | 3/week (12+/month) | 12+/month = 8x faster view growth; cover more products |

Shorts: 2-4/week. Quick verdicts, "One thing I hate about [product]," unboxing reactions.
Long-form + Shorts = 40-60% faster growth. Optimal length: 8-15 min. Hit 8+ min for
mid-roll ads (~50% revenue increase). Longer comparisons (15-20 min) perform well when
covering 3+ products.

## 4. Title Pattern Library

1. `[Product] Review -- [Time Period] Later (Honest Opinion)`
2. `[Product A] vs [Product B] -- Which Should You Buy in [Year]?`
3. `Best [Product Category] in [Year] -- Top [Number] Picks`
4. `[Product] -- [Number] Things to Know Before You Buy`
5. `Is the [Product] Worth $[Price]? (Honest Review)`
6. `I Tested [Number] [Products] -- Here's the Best One`
7. `[Product] -- The Truth After [Timeframe] of Daily Use`
8. `Don't Buy [Product] Until You Watch This`
9. `[Product] Unboxing + First Impressions -- Better Than [Competitor]?`
10. `[Budget Product] vs [Premium Product] -- Is [Expensive One] Worth [X]x More?`

Include the product name, year, and price point when relevant. "vs" and "best" are
high-search-volume keywords. Keep under 60 characters.

## 5. Thumbnail Formula

- **Layout**: Product + face reaction is the proven formula. Product on one side, your face on the other.
- **Face**: Genuine reaction -- thoughtful, skeptical, impressed. Match the review verdict.
- **Product**: Clean product shot, no cluttered background. Remove or simplify the backdrop.
- **Text**: Rating (e.g., "9/10"), verdict word ("WORTH IT", "SKIP"), or price ("$299")
- **Comparison thumbs**: Both products side-by-side with VS in the center, checkmark on winner
- **Colors**: Clean, professional. White/dark backgrounds with the product's accent color.
- Target CTR: 7.5% (Tech niche avg). Aim for 9%+ on comparison and launch-day content.

## 6. Hook Style

**Primary: Problem-Agitation** -- "Before you spend $[X] on this, there are [N] things
nobody's telling you." Review viewers have money on the line. Open by validating their
hesitation, then promise an honest answer. This builds trust immediately.

**Secondary: Social Proof** -- "[X] million people bought this last quarter. I've been
using it for [time] to find out if the hype is real." Contextualizes the review within
market demand.

First 30 seconds: state your verdict direction (positive/negative/mixed). Review viewers
will scrub to the end if you bury the conclusion. Front-load the take, then spend the
video justifying it.

## 7. Monetisation Priority Stack

1. **Shopping Affiliate** -- Amazon, brand programs, affiliate networks. Highest ROI for reviews.
2. **AdSense** -- Premium RPM ($15-25 Tech). Mid-rolls on 8+ min videos. Evergreen search traffic.
3. **Brand Deals** -- Companies pay for launch-day coverage and dedicated reviews
4. **External Funnels** -- Buying guides, deal newsletters, comparison spreadsheets
5. **Memberships** -- Early access to reviews, deal alerts, exclusive "what I actually use" lists
6. **Super Chat/Thanks** -- Live "ask me anything about [product]" streams before purchase season
7. **Shorts Ad Share** -- Quick verdicts drive traffic to full reviews more than direct revenue

Affiliate tip: Pin affiliate links in comments AND description. Use timestamped links
for multi-product roundups. Disclose affiliates transparently -- trust is your entire business.

## 8. Growth Trajectory

| Milestone | Timeline | Key Lever |
|-----------|----------|-----------|
| 500 subs / 3K watch hrs (YPP Expanded) | Months 2-5 | 25+ single-product reviews in one niche |
| 1K subs / 4K watch hrs (Full YPP) | Months 4-8 | "Best of" roundups + comparison playlists (5-10 per playlist) |
| 10K subs | Months 8-16 | Launch-day reviews + affiliate revenue funds better products to review |
| 50K subs | Months 16-28 | Brands send products for free; reinvest into production quality |
| 100K subs | Months 24-40 | Authority status; viewers search "[Product] + [Your Channel Name]" |

Review channels have a reinvestment flywheel: affiliate income funds products, which fund content.

## 9. Common Failure Modes

**1. Only positive reviews -- audience loses trust.**
Fix: Negative and mixed reviews build more credibility than positive ones. Your most
valuable video is an honest "don't buy this" take. Include at least 2-3 genuine criticisms
in every review. Trust is your moat; once lost, the channel is finished.

**2. Reviewing products nobody is searching for.**
Fix: Before filming, check search volume (YouTube search suggestions, Google Trends,
vidIQ/TubeBuddy). Review products people are actively considering buying. Niche down to
a specific product category rather than reviewing everything.

**3. Missing the purchase window -- uploading reviews months after launch.**
Fix: For new products, publish within 1-2 weeks of launch (search volume peaks here).
For evergreen reviews, target "X months later" follow-ups when search resurges. Plan your
content calendar around known product release dates in your niche.


---

<!-- file: templates/shorts-first-channel.md -->

# Shorts-First Channel Template

> Primarily vertical short-form content (< 60 seconds). Rapid-fire publishing, completion-rate optimised.
> Traffic mix: Shorts Feed (~75%) + Browse (~10%) + Suggested (~10%) + Search (~5%).

---

## 1. Channel DNA

Shorts-first channels are **completion-rate machines operating inside a swipe-driven feed**. The algorithm is fundamentally different from long-form: the primary signal is **Viewed vs Swiped Away** (target: 75%+ Viewed), followed by **completion rate** (70%+ is good, 90%+ is exceptional), then likes, comments, and shares. Content length sweet spots are **13 seconds** (highest completion) and **50-60 seconds** (highest ad revenue per view). RPM reality is harsh: $0.01-$0.07 per 1K views, and using even 1 licensed music track forces a 50% revenue share with the rights holder. The September 2025 freshness shift means YouTube now heavily weights content recency — a 28-30 day window determines most Shorts distribution. This channel type prioritises **volume and velocity** over production polish. Growth can be explosive (100K subs in 3-6 months is achievable) but monetisation requires a deliberate bridge to long-form or external revenue.

## 2. Optimal Content Mix

| Type | % | Description |
|------|---|-------------|
| **Hub** | 50-60% | Recurring formats/series with a signature style. "One fact a day", "rating [THINGS]", "[TOPIC] in 30 seconds". Pattern recognition drives repeat viewership. |
| **Hero** | 25-30% | Trend-riding content, challenges, duets, reaction hooks. Highest viral potential, shortest lifespan. |
| **Help** | 10-20% | Quick tips, "how to [X] in 15 seconds", micro-tutorials. Evergreen but lower impression volume in Shorts feed. |

Every Short should be part of a recognisable series or format — the Shorts algorithm rewards channels whose viewers consistently watch multiple Shorts in a row.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| **Solo creator** | 1-3 Shorts/day (7-21/week) | 30-90 Shorts/month. Batch-film 5-10 Shorts in a single session. Volume is non-negotiable — the 28-30 day freshness window demands constant output. |
| **Small team (2-3)** | 2-4 Shorts/day (14-28/week) | Dedicated editor enables same-day turnaround on trends. One person monitors trending audio and formats. |

Length targets: 13 seconds for maximum completion rate, 50-60 seconds for maximum revenue per view. Mix both. Avoid 30-45 seconds — it is the dead zone with lower completion and lower RPM than either extreme. Post during peak hours for your audience (typically 12-3 PM and 7-10 PM local time).

## 4. Title Pattern Library

1. "[TOPIC] In [NUMBER] Seconds"
2. "POV: You [RELATABLE SITUATION]"
3. "Wait For It... [TOPIC/PUNCHLINE]"
4. "Things Only [GROUP] Will Understand"
5. "Rating [THINGS] From 1-10 (Part [NUMBER])"
6. "Did You Know [SURPRISING FACT]?"
7. "[NUMBER] [THINGS] You're Doing Wrong"
8. "How To [QUICK TIP] #shorts"
9. "This [THING] Is Insane"
10. "Day [NUMBER] Of [CHALLENGE/SERIES]"

Shorts titles matter less than long-form (most viewers never see them in the feed), but they help with Search discovery and YouTube's topical classification. Keep them under 40 characters. Add 3-5 relevant hashtags in the description, not the title.

## 5. Thumbnail Formula

- **Auto-generated frame selection** — YouTube picks the thumbnail for Shorts feed. You can set a custom thumbnail but it only shows on the channel page and Search.
- **Design the first frame as the hook** — the opening frame IS the thumbnail in the feed. Make it visually arresting.
- **Text-on-screen in first frame** — bold, centred, readable at small size. This is what makes viewers stop scrolling.
- **High contrast and bright colours** — compete against rapid swipe behaviour.
- **Face close-up with expression** — if the format includes the creator, the first frame should show emotion or action.
- For custom thumbnails (channel page): use consistent series branding with episode numbers for binge-ability.

## 6. Hook Style

**Primary: Curiosity-gap** — The first 1-2 seconds must create an irresistible question. "This is the [THING] they don't want you to know about." Viewer must feel they will miss something by swiping away.

**Secondary: Shock/Contradiction** — Open with a visual or statement that violates expectations. A surprising image, an absurd claim, or an action mid-motion. No preamble — the hook IS the first frame.

Zero tolerance for slow starts. The "Viewed vs Swiped Away" metric is decided in the first 1-3 seconds. No intros, no logos, no "hey guys." Start mid-action or mid-sentence. The hook must answer: "Why should I NOT swipe right now?"

## 7. Monetisation Priority Stack

| Rank | Stream | Why This Position |
|------|--------|-------------------|
| 1 | **External Funnels** | Shorts RPM is too low to be the primary revenue. Use Shorts as a massive top-of-funnel for email lists, products, courses, or apps. A 100K-sub Shorts channel can build a 10K email list in months. |
| 2 | **Brand Deals** | Shorts sponsorships pay per-video, not per-view. 50K-100K subs with high engagement = $500-2K per sponsored Short. Brands want the audience reach. |
| 3 | **Shorts Ad Share** | RPM: $0.01-$0.07/1K Engaged Views (finance: up to $0.30). At 1M views/month = $10-70. Using 1 licensed music track = 50% share to rights holder. Use original audio or royalty-free music to keep 100%. |
| 4 | **Shopping Affiliate** | Quick product showcases and "things I use" Shorts convert well. Link in description. Natural for lifestyle, tech, and beauty niches. |
| 5 | **Long-form AdSense (bridge strategy)** | Publish 1-2 long-form videos per week to capture subscribers gained from Shorts. Long-form RPM is 10-100x Shorts RPM. This is the real monetisation play. |
| 6 | **Memberships** | At scale (50K+ subs), offer exclusive Shorts, bloopers, or community access. $0.99-$4.99/month. YouTube takes 30%. |
| 7 | **Super Chat/Thanks** | Minimal relevance unless doing live content alongside Shorts. |

**Critical strategy: the long-form bridge.** Channels using both long-form + Shorts grow 40-60% faster. Use Shorts to attract subscribers, then serve them 8-min+ long-form content where real AdSense revenue lives.

## 8. Growth Trajectory

| Milestone | Timeline | Key Metrics |
|-----------|----------|-------------|
| 0-500 subs | Weeks 1-4 | 30-60 Shorts published. Testing 3-5 formats. Completion rate tracking begins. 1-2 Shorts break 10K views. |
| 500-1K subs (YPP Expanded) | Weeks 4-8 | 3M Shorts views in 90 days (or 3K long-form watch hours). Enable memberships. Signature format identified. |
| 1K-10K subs | Months 2-4 | Viral Short hits 500K-1M+ views. Subscriber growth becomes self-reinforcing. Start long-form bridge (1 video/week). |
| 10K-100K subs | Months 4-8 | Multiple Shorts crossing 1M views. Brand deal inquiries. Long-form videos pulling 10K-50K views from Shorts-acquired audience. |
| 100K-500K subs | Months 8-18 | Full monetisation stack active. Long-form generating $3K-10K/month. Shorts brand deals adding $2K-5K/month. External funnels scaling. |

Shorts growth is nonlinear — one viral hit can add 10K-50K subs in a week. But it is also volatile: a week without posting can collapse reach due to the 28-30 day freshness window.

## 9. Common Failure Modes

**1. No long-form bridge** — Building a massive Shorts audience but never giving them long-form content. Revenue stays at $0.01-$0.07 RPM forever. The channel is big but broke. **Fix**: Start publishing 1 long-form video per week by the time you hit 5K subs. Tease long-form in Shorts end-cards. The long-form bridge is where Shorts-first channels actually make money.

**2. Music licensing revenue drain** — Using trending licensed audio on every Short. Each track with a licensed song forces a 50% revenue share to the rights holder, cutting already-low RPM in half. **Fix**: Use original audio, voiceover, or royalty-free music for at least 50% of Shorts. Save licensed audio for trend-riding Hero content where virality justifies the revenue split.

**3. Ignoring the freshness window** — Taking a 2-week break and expecting to resume where you left off. The September 2025 algorithm update weights recency heavily — Shorts older than 28-30 days receive drastically reduced distribution. Inconsistent posting resets the channel's momentum. **Fix**: Build a 2-week content buffer. Batch-film 20-30 Shorts in one session. Schedule daily publishing even during breaks. If you stop posting, expect 2-3 weeks of rebuilding before distribution normalises.


---

<!-- file: templates/tutorial-channel.md -->

# Tutorial Channel Template

> Step-by-step walkthroughs, demos, software guides. Search-dominant. Google dual-surface powerhouse.

---

## 1. Channel DNA

Tutorial channels are **Search machines**. They rank on both YouTube search AND Google web
results (dual-surface), making every video a permanent traffic asset. The algorithmic
signature is high search impression share, strong satisfaction signals (likes, saves, low
bounce), and playlist-driven session time. Unlike entertainment, growth is slow-and-steady
compounding. Retention benchmarks approach education levels (42.1% for how-tos). Videos
solve a single, specific problem. RPM varies by niche: Tech $15-25, general skills $8-15.

## 2. Optimal Content Mix

| Type | Share | Purpose |
|------|-------|---------|
| **Help** | 70% | Single-problem tutorials, "How to X in Y" |
| **Hub** | 20% | Series walkthroughs, full project builds, playlists |
| **Hero** | 10% | "Complete guide to [Tool/Skill]" tentpole videos |

Evergreen ratio target: 80%+. Tutorials should be useful 1-3 years after upload.
Update titles with year tags annually (e.g., "2026 Edition") to maintain search freshness.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| Solo creator | 2/week (8-10/month) | Batch similar tutorials (same tool/topic in one session) |
| Small team | 3/week (12+/month) | 12+/month = 8x faster view growth; compound search footprint |

Add 2-3 Shorts/week: quick tips, "Did you know?" clips from long-form. Long-form + Shorts =
40-60% faster growth. Optimal long-form length: 7-15 min. Hit 8+ min for mid-roll ads
(~50% revenue increase). Longer is fine IF the tutorial demands it.

## 4. Title Pattern Library

1. `How to [Specific Action] in [Tool/Platform] -- Step by Step`
2. `[Tool] Tutorial for Beginners -- [Outcome] in [Timeframe]`
3. `[Specific Problem] FIXED -- [Tool/Method] Tutorial`
4. `[Tool A] vs [Tool B]: Which Is Better for [Use Case]?`
5. `[Number] [Tool] Tricks You Probably Don't Know ([Year])`
6. `Complete [Tool/Skill] Tutorial -- Beginner to [Level] in [Time]`
7. `How I [Built/Created/Designed] [Project] Using [Tool] (Full Walkthrough)`
8. `[Tool] -- [Number] Features You're Not Using (But Should)`
9. `The FASTEST Way to [Desired Outcome] in [Tool]`
10. `[Specific Error/Problem]? Here's the Fix ([Tool] [Year])`

Front-load the tool/platform name. Include the year for software tutorials. Keep under 60 chars.

## 5. Thumbnail Formula

- **Layout**: Before/After split is the highest-converting format (messy -> clean, error -> fixed)
- **Screen captures**: Clean, cropped UI screenshots with arrows or circles highlighting the key element
- **Text**: 2-3 words max. Tool logo/icon + result word ("FIXED", "EASY", version number)
- **Face**: Small face in corner showing relief/satisfaction -- optional but lifts CTR 10-15%
- **Colors**: Tool's brand colors as accent, dark or neutral background for contrast
- Target CTR: 5-7% (Search-sourced clicks convert on relevance, not shock).

## 6. Hook Style

**Primary: Problem-Agitation** -- "If you've been struggling with [X], you're not alone.
In the next [N] minutes, I'll show you exactly how to [outcome]." Tutorial viewers arrived
with a problem. Validate it in 5 seconds, promise the solution, then deliver immediately.

**Secondary: Curiosity-Gap** -- for Hub/Hero content. "There's a feature in [Tool] that
90% of users don't know about -- and it changes everything."

Critical rule: Show the end result in the first 15 seconds. Tutorial viewers need proof
you can deliver before they commit 10+ minutes. Then rewind to step one.

## 7. Monetisation Priority Stack

1. **AdSense** -- Mid-roll ads on 8+ min tutorials compound with evergreen traffic. Primary income.
2. **Shopping Affiliate** -- Tools, software, gear used in tutorials. Highest conversion of any format.
3. **External Funnels** -- Premium courses, templates, project files, Patreon-exclusive content
4. **Brand Deals** -- Tool companies sponsor tutorials featuring their product (natural fit)
5. **Memberships** -- Source files, bonus tutorials, direct Q&A support
6. **Super Chat/Thanks** -- Live tutorial sessions and Q&A streams
7. **Shorts Ad Share** -- Supplemental; tip-style Shorts drive channel awareness

## 8. Growth Trajectory

| Milestone | Timeline | Key Lever |
|-----------|----------|-----------|
| 500 subs / 3K watch hrs (YPP Expanded) | Months 2-5 | 30+ targeted Help videos covering high-search queries |
| 1K subs / 4K watch hrs (Full YPP) | Months 4-8 | Playlist structure (5-10 per playlist, 40% watch time boost) |
| 10K subs | Months 8-16 | Become the default channel for one specific tool/niche |
| 50K subs | Months 16-28 | Expand to adjacent tools; Google dual-surface traffic compounds |
| 100K subs | Months 24-42 | Evergreen library generates 70%+ views from videos older than 6 months |

Tutorial growth is backloaded. Month 1-6 feels slow; months 12+ accelerate as search compounds.

## 9. Common Failure Modes

**1. Too broad -- covering too many unrelated tools/topics.**
Fix: Pick ONE tool or platform for your first 30 videos. Become the search-dominant channel
for that tool. Expand only after establishing authority. The algorithm rewards topical depth.

**2. Missing chapters and timestamps.**
Fix: Every tutorial needs chapters (00:00 timestamps in description). This enables Google
Key Moments, lets viewers jump to their specific problem, and improves retention metrics.
Structure: Intro (0:00) -> Problem (0:30) -> Steps (1:00+) -> Result (end).

**3. Over-explaining basics in every video.**
Fix: Link to your "Beginner Setup" video instead of re-explaining prerequisites. Assume
the viewer searched for THIS specific problem. Respecting their time earns subscribers.
Create a "Start Here" playlist for true beginners and reference it in cards/end screens.


---

<!-- file: templates/vlog-channel.md -->

# Vlog Channel Template

> Day-in-life, personal updates, journey documentation. Community-first. Subscriber loyalty over algorithmic reach.

---

## 1. Channel DNA

Vlog channels are **relationship engines**. The algorithm rewards them through Subscriptions
feed and Suggested (from your own videos), not Search or Browse. The core metric is
returning-viewer percentage -- vlogs succeed when 40%+ of views come from subscribers.
This makes audience loyalty the growth flywheel, not virality. Vlogs have moderate RPM
($4-10) but unlock premium monetisation through parasocial trust: memberships, merch, and
brand deals convert at higher rates because the audience knows YOU, not just your content.
Series format and consistency matter more than any single video.

## 2. Optimal Content Mix

| Type | Share | Purpose |
|------|-------|---------|
| **Hub** | 60% | Weekly series, recurring segments, life updates |
| **Help** | 15% | "What I learned" lessons, gear/routine breakdowns |
| **Hero** | 15% | Major life events, milestones, travel, transformation arcs |
| **Trending** | 10% | Your take on cultural moments through your personal lens |

Evergreen ratio: ~40%. Vlogs are more temporal than tutorials but series arcs extend shelf life.

## 3. Upload Cadence

| Setup | Cadence | Notes |
|-------|---------|-------|
| Solo creator | 1-2/week (6-8/month) | Consistency matters more than volume for vlogs |
| Small team | 3/week (12+/month) | 12+/month = 8x faster view growth; mix long + short vlogs |

Shorts: 3-5/week. Quick moments, reactions, behind-the-scenes clips. Long-form + Shorts =
40-60% faster growth. Optimal long-form length: 8-12 min. Hit 8+ min for mid-roll ads
(~50% revenue increase). Under 8 min is acceptable for quick updates but costs you mid-rolls.

## 4. Title Pattern Library

1. `A Day in My Life as a [Identity/Job] in [Location]`
2. `I Finally [Major Decision/Change] -- Here's What Happened`
3. `[Number] Things That Changed My Life This [Month/Year]`
4. `Moving to [Place] -- The Honest Truth After [Time]`
5. `What I Spend in a [Week/Month] as a [Identity] in [City]`
6. `I Tried [New Thing] for [Timeframe] -- Honest Results`
7. `Why I [Controversial Personal Decision] (Not What You Think)`
8. `[Life Event] Vlog -- This Was NOT the Plan`
9. `How I Actually [Daily Routine/Habit] (Realistic [Year] Edition)`
10. `Answering Your Questions About [Topic] (Get to Know Me)`

Titles should feel personal and conversational. Use "I" and "My" naturally. Avoid clickbait
that doesn't match the actual content -- vlog audiences punish broken trust.

## 5. Thumbnail Formula

- **Face**: Genuine emotion, not exaggerated. Authentic expression matching the story tone.
- **Context**: Show the setting/situation (new apartment, travel destination, workspace)
- **Text**: 1-2 words of context or none at all. The face + setting tells the story.
- **Style**: Consistent color grade/filter becomes your visual brand. Warm tones build familiarity.
- **Composition**: Candid > posed. Mid-action shots outperform static portraits.
- Target CTR: 5-7% from subscribers (lower Browse CTR is normal for vlogs).

## 6. Hook Style

**Primary: Story-Open** -- "So something happened this week that I wasn't expecting..."
Vlog viewers are here for the narrative. Open in media res -- start in the middle of the
action or emotion, then let the story unfold. The hook is your authenticity, not a gimmick.

**Secondary: Social Proof** -- "10,000 of you asked me about this, so here's the truth."
Referencing audience requests validates the community and signals the video is crowd-demanded.

First 15 seconds: establish the emotional stakes of this episode. What is today's story
ABOUT? Vlogs without a narrative thread lose viewers after the novelty of "hanging out" fades.

## 7. Monetisation Priority Stack

1. **Brand Deals** -- Highest value. Vlog integration feels native; sponsors pay for trust transfer.
2. **External Funnels** -- Merch, personal brand products, presets, planners (audience buys YOU)
3. **Memberships** -- Behind-the-scenes, unedited footage, polls on life decisions. Community-first.
4. **AdSense** -- Moderate RPM ($4-10). Mid-rolls on 8+ min videos. Steady baseline income.
5. **Super Chat/Thanks** -- Vlogs translate well to live streams; community is emotionally invested
6. **Shopping Affiliate** -- Gear, lifestyle products featured naturally in vlogs
7. **Shorts Ad Share** -- Supplemental; vlog Shorts build familiarity for the main channel

## 8. Growth Trajectory

| Milestone | Timeline | Key Lever |
|-----------|----------|-----------|
| 500 subs / 3K watch hrs (YPP Expanded) | Months 2-5 | Consistent weekly uploads + daily Shorts |
| 1K subs / 4K watch hrs (Full YPP) | Months 4-8 | Define your series format, build returning viewers |
| 10K subs | Months 8-18 | Community engagement (comments, polls, memberships) |
| 50K subs | Months 18-30 | Collab with similar-sized vloggers; cross-pollinate audiences |
| 100K subs | Months 24-42 | Multi-platform presence (IG, TikTok) funneling to YouTube |

Vlog growth is slower than entertainment but more durable. Subscriber churn is lowest of any format.

## 9. Common Failure Modes

**1. No narrative structure -- "just filming my day" without a story arc.**
Fix: Every vlog needs a question, conflict, or goal. "Will I finish the move?" "Can I
stick to this routine?" Even mundane days need a throughline. Plan your A-story before
you start filming. Viewers stay for resolution, not footage.

**2. Inconsistent upload schedule breaking subscriber trust.**
Fix: Vlog audiences build viewing habits around YOUR schedule. Missing uploads without
communication damages the parasocial contract. Use community posts to communicate gaps.
Batch-film 2-3 vlogs on high-energy days to build a buffer.

**3. Refusing to evolve the format as your life changes.**
Fix: Vlogs must grow with you. The audience that followed you for college content will
leave if you keep performing that identity post-graduation. Signal transitions openly --
"This channel is evolving and here's why." Audiences respect honesty over stagnation.


---
Source: https://github.com/AgriciDaniel/claude-youtube (MIT). Packaged by Full Production Studio.
