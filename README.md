# FlowState

**The first cycle tracker built for partners.**

Every period tracking app on the market (Flo, Clue, Natural Cycles) is designed for the person who menstruates. FlowState is designed for the person who loves them. It teaches you what's happening inside her body, why she feels the way she does, and gives you real things you can do about it.

One input. One date. Daily guidance that actually makes you a better partner.

## Current State (What's Built)

This is a **working MVP** with the core daily experience fully implemented. Here's what exists and what doesn't.

### Shipped

- **Onboarding flow** with signal-based phase estimation (no period date needed)
- **Daily Cards** with full 28-day content (biology, feelings, actions, avoids, hormone levels)
- **Cycle Insights** screen with animated SVG cycle ring visualization
- **Check-in system** with daily observation logging, streaks, and milestones
- **Category playbooks** with 100+ actions across 6 categories (food, date, physical touch, words, logistics, gifts)
- **Encyclopedia data** with 7 phase-specific "vibe meters" per phase (Cuddle Factor, Romance Level, etc.)
- **Observation mode** with signal-to-phase estimation algorithm
- **Non-28-day cycle support** via proportional day mapping
- **Dark theme** with phase-specific color accents
- **Animations** via React Native Reanimated v4 (bars, counters, rings, transitions)
- **Local storage** via AsyncStorage (no backend, no account required)

### Not Built Yet

- **AI Coach** (context-aware relationship advice via API, see `docs/AI_COACH.md` for full architecture)
- **Smart Reminders** (push notifications for phase transitions)
- **Learn Mode** (educational mini-modules on biology topics)
- **Manual date input onboarding** (only signal-based exists right now)
- **Cycle Log** ("Period started today" recalibration button)
- **Data export / partner sharing**
- **Premium tier / monetization**

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React Native + Expo SDK 54 |
| Routing | Expo Router 6 (file-based) |
| Language | TypeScript (strict) |
| Storage | AsyncStorage (local-first, no backend) |
| Animations | React Native Reanimated v4 |
| Gestures | React Native Gesture Handler |
| Visualization | react-native-svg |
| Date Picker | @react-native-community/datetimepicker |

No state management library (single custom hook). No UI component library. No backend.

## Project Structure

```
flowstate/
├── app.json                          # Expo config (dark theme, scheme: flowstate)
├── package.json                      # main: expo-router/entry
├── tsconfig.json                     # strict, paths: @/* -> src/*
├── babel.config.js                   # babel-preset-expo + reanimated plugin
├── index.ts                          # expo-router entry point
│
├── docs/
│   ├── PRODUCT.md                    # Product vision, features, monetization
│   ├── ARCHITECTURE.md               # Technical architecture overview
│   ├── AI_COACH.md                   # AI observation + coaching webhook design
│   └── CONTENT_GUIDE.md              # How daily content is structured + hormone reference table
│
├── app/
│   ├── _layout.tsx                   # Root Stack layout, GestureHandler, SafeArea, StatusBar
│   ├── index.tsx                     # Router: checks onboarding state -> redirects
│   ├── onboarding.tsx                # Signal-based onboarding (vibe cards)
│   ├── (tabs)/
│   │   ├── _layout.tsx               # Tab bar: Today, Cycle, Check In (animated icons)
│   │   ├── index.tsx                 # Today screen (Daily Card, main experience)
│   │   ├── insights.tsx              # Cycle Insights (SVG ring, phase legend, hormones)
│   │   └── checkin.tsx               # Check-in flow (daily questions + streak tracking)
│   └── category/
│       └── [category].tsx            # Category detail page (full action playbook)
│
├── src/
│   ├── types/
│   │   └── index.ts                  # All TypeScript types and interfaces
│   ├── constants/
│   │   ├── theme.ts                  # Colors, spacing, radius, typography
│   │   └── phases.ts                 # Phase metadata: names, colors, day ranges, emojis
│   ├── data/
│   │   ├── cycle-content.ts          # 28 DayContent entries (803 lines of content)
│   │   ├── signals.ts                # 24 vibe cards, 10 questions, signal-to-phase weights
│   │   └── encyclopedia.ts           # Phase-specific indicators, actions, avoids (488 lines)
│   ├── utils/
│   │   ├── cycle.ts                  # getCycleDay, getPhase, getDayContent, mapTo28
│   │   ├── storage.ts                # AsyncStorage wrapper (save/load/clear config + observations)
│   │   └── signals.ts                # Phase estimation from behavioral signals
│   ├── hooks/
│   │   └── useCycleData.ts           # Single hook: loads config, computes day/phase/content
│   └── components/
│       ├── HormoneChart.tsx           # 5 animated horizontal bars (estrogen, progesterone, etc.)
│       ├── VibeMeters.tsx             # 7 animated indicator bars with emoji + flavor text
│       ├── CycleRing.tsx              # 280px SVG circular visualization with phase arcs
│       └── AnimatedCounter.tsx        # Animated number display with prefix/suffix support
│
└── assets/
    ├── icon.png
    ├── adaptive-icon.png
    ├── splash-icon.png
    └── favicon.png
```

## How to Run

```bash
# Install dependencies
npm install

# Start Expo dev server (all platforms)
npm start

# Platform-specific
npm run web        # Web
npm run ios        # iOS Simulator
npm run android    # Android Emulator
```

For Vercel web deployment, set:
- Build command: `npx expo export --platform web`
- Output directory: `dist`

## Screens

### 1. Onboarding (`app/onboarding.tsx`)

Two-step flow:

**Step 0: Welcome**
- Logo with ambient glow, tagline "understand her better"
- Three feature callouts
- "Get started" button

**Step 1: Signal Selection**
- Prompt: "What's going on with her?"
- 24 emoji-based vibe cards in a 2-column grid (multi-select)
- Examples: "She's on fire" 🔥, "Really happy" 😍, "Low energy" 😴, "Cramps" 🤕
- Cards use a rotating 12-color palette for selection feedback with checkmark badges
- Live phase estimate preview below the grid (shows estimated phase + confidence)
- On submit: estimates cycle phase from signals, calculates synthetic period start date, saves CycleConfig to AsyncStorage, redirects to tabs

Each vibe card maps to multiple signal tags. Signal tags have weighted probabilities per phase. The algorithm picks the highest-probability phase and derives a synthetic `lastPeriodStart` date.

**What's missing**: Manual date input path (enter period start date + cycle length directly). The `docs/PRODUCT.md` describes this as "Path A" but only Path B (observation) is built.

### 2. Today Screen (`app/(tabs)/index.tsx`)

The main daily experience. Scrollable card with these sections (each animates in with staggered FadeInUp):

1. **Hero**: Phase name, animated cycle day counter ("Day 14/28"), pulsing countdown pill ("Period likely in 3 days"), confidence indicator if estimate is rough

2. **The Vibe Right Now**: 7 horizontal bar meters from `encyclopedia.ts`:
   - Cuddle Factor, Romance Level, Adventure Readiness, Patience Meter, Spicy Meter, Nesting Energy, Social Battery
   - Each has emoji, label, animated fill bar, and flavor text (e.g., "Maximum koala mode. She wants to be wrapped up.")

3. **What's Happening**: Plain-language biology explanation of current hormones and their effects (from `cycle-content.ts`)

4. **Hormone Levels**: 5 animated horizontal bars showing estrogen, progesterone, testosterone, serotonin, prostaglandins with color-coded fills

5. **She Might Be Feeling**: Bullet list of 4-5 emotional/physical feelings with parenthetical explanations

6. **What You Can Do**: 2x3 grid of 6 action category cards (Food, Date Ideas, Physical Touch, Words, Logistics, Gifts), each showing count and preview. Taps navigate to `/category/[category]`

7. **Today's Picks**: Top 5 prioritized actions across all categories with emoji, text, and effort indicator (Easy/Medium/Big with color dot)

8. **Don't Do This**: Red-tinted section with avoids and severity indicators (if any exist for the day)

9. **CTA**: "Quick check in" button linking to check-in tab

**Design patterns**: Ambient phase-color glow background (8% opacity), glass-morphism cards (rgba with 3% white overlay), staggered fade animations

### 3. Cycle Insights (`app/(tabs)/insights.tsx`)

- **Cycle Ring**: 280px SVG circular visualization with 5 colored phase arcs, each animated with staggered strokeDasharray. Pulsing glow dot on current day. Center shows cycle day number + phase pill.
- **Phase Legend**: Table of all 5 phases with color dot, name, day ranges
- **Hormone Levels**: Same chart as Today screen
- **Period Countdown**: "Estimated next period in X days"
- **Low Confidence Warning**: Shows if confidence < 0.7

### 4. Check-In (`app/(tabs)/checkin.tsx`)

**Question Flow** (if not checked in today):
- Animated progress bar at top
- 3 questions per session, randomly selected from pool of 10 (seeded by date for consistency)
- Sample: "How's her energy?", "What's her mood?", "Does she want to go out?", "Any physical complaints?"
- Each question has 3-4 multi-select emoji answer cards
- Slide transitions between questions (FadeInRight/FadeOutLeft)
- Answers map to signal tags which feed into the phase estimation algorithm

**Completion Screen** (shown after finishing or if already checked in today):
- Animated streak counter with spring entry
- Fire emoji that pulses at 7+ day streaks
- Streak messages ("Unstoppable. She is lucky to have you.")
- 4 milestone boxes (3-day, 7-day, 14-day, 30-day) with glow for achieved ones
- Next check-in reminder
- Accuracy improvement hint based on streak length

### 5. Category Detail (`app/category/[category].tsx`)

- Header with emoji and category name
- Scrollable list of all actions for that category in the current phase
- Each action card shows: bold title, detail explanation, optional pro tip (💡), effort label (Easy Win / Worth the Effort / Go All Out with color)
- "Things to Avoid" section at bottom with red styling (if avoids exist)

## Navigation

```
/                     -> Splash (checks isOnboarded in AsyncStorage)
                         -> if no:  /onboarding
                         -> if yes: /(tabs)
/onboarding           -> Signal-based setup flow
/(tabs)/              -> Tab navigator (3 tabs)
  index               -> Today (💡)
  insights            -> Cycle (🔄)
  checkin             -> Check In (📝)
/category/[category]  -> Category detail (back button returns to tabs)
```

Tab icons have spring scale animation on focus (damping 15, stiffness 300).

## Data Model

### Core Types (`src/types/index.ts`)

```typescript
type Phase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal_early' | 'luteal_late'

type ActionCategory = 'food' | 'date' | 'physical_touch' | 'words' | 'logistics' | 'gift'

type Effort = 'low' | 'medium' | 'high'

type SignalTag = 'tired' | 'energetic' | 'cramps' | 'flirty' | 'emotional' | 'bloated'
              | 'hungry' | 'social' | 'withdrawn' | 'irritable' | 'happy' | 'anxious'
              | 'confident' | 'acne' | 'headache' | 'backpain' | 'nauseous'
              | 'cravings_sweet' | 'cravings_salty' | 'insomnia' | ... // ~20+ tags

interface CycleConfig {
  lastPeriodStart: string        // ISO date string
  cycleLength: number            // default 28
  onboardedAt: string            // ISO timestamp
  source: 'observation' | 'manual'
  confidence: number             // 0-1, from signal estimation
}

interface DayContent {
  biology: string                // 150-200 word hormone explanation
  feelings: string[]             // 4-5 emotional/physical experiences
  actions: Action[]              // 5-8 suggestions across categories
  avoid: string[]                // 2-4 things not to do
  hormones: {
    estrogen: number             // 0-1 relative levels
    progesterone: number
    testosterone: number
    prostaglandins: number
    serotonin: number
  }
}

interface Action {
  text: string
  category: ActionCategory
  effort: Effort
}

interface Observation {
  id: string
  date: string
  signals: SignalTag[]
  note?: string
}

interface PhaseEstimate {
  phase: Phase
  confidence: number             // 0-1
  estimatedDay: number
  probabilities: Record<Phase, number>
}

interface PhaseIndicator {
  label: string                  // e.g., "Cuddle Factor"
  emoji: string                  // e.g., "🤗"
  value: number                  // 0-1 for bar fill
  flavor: string                 // e.g., "Maximum koala mode."
}

interface EncyclopediaAction {
  id: string
  text: string
  detail: string
  category: ActionCategory
  effort: Effort
  proTip?: string
}

interface AvoidItem {
  text: string
  why: string
  severity: 'gentle' | 'serious' | 'nuclear'
}
```

### Storage (`src/utils/storage.ts`)

AsyncStorage wrapper with two keys:
- `@flowstate/cycle_config` for CycleConfig
- `@flowstate/observations` for Observation[]

Functions: `saveCycleConfig`, `loadCycleConfig`, `clearCycleConfig`, `saveObservations`, `loadObservations`, `clearObservations`

Auto-migration for old configs missing `source` or `confidence` fields.

### Single Hook (`src/hooks/useCycleData.ts`)

`useCycleData()` is the only state hook. It:
1. Loads config and observations from AsyncStorage on mount
2. Computes `cycleDay` from `lastPeriodStart` using `daysBetween`
3. Maps to 28-day equivalent for non-28-day cycles
4. Looks up DayContent from `cycle-content.ts`
5. Returns `{ loading, isOnboarded, cycleDay, phase, content, daysUntilPeriod, confidence }`
6. `addObservation` callback re-estimates phase if in observation mode

## Content System

### Daily Content (`src/data/cycle-content.ts`)

803 lines. 28 unique `DayContent` entries, one per cycle day. Each day includes:
- **Biology**: 150-200 word explanation of what hormones are doing TODAY
- **Feelings**: 4-5 specific experiences with "why" in parentheses
- **Actions**: 5-8 concrete suggestions (at least 2-3 low effort, at least 1 high effort, varied categories)
- **Avoids**: 2-4 specific behaviors to not do
- **Hormones**: 5 normalized values (0.0 to 1.0) for chart visualization

See `docs/CONTENT_GUIDE.md` for the full hormone reference table (all 28 days) and content writing rules.

### Encyclopedia (`src/data/encyclopedia.ts`)

488 lines. Per-phase expanded content:
- **Phase Indicators**: 7 "vibe meters" per phase with label, emoji, value (0-1), flavor text
- **Actions by Category**: Detailed actions with `id`, `text`, `detail`, `category`, `effort`, optional `proTip`
- **Avoids**: Phase-specific with `text`, `why`, `severity`

This is what powers the category detail pages and the vibe meters on the Today screen.

### Signals (`src/data/signals.ts`)

- **24 Vibe Cards**: For onboarding. Each has emoji, label, and array of SignalTag mappings
- **10 Daily Questions**: For check-in. Each has text, 3-4 emoji options, each option maps to signal tags
- **Signal Phase Weights**: Maps each of ~20 signal tags to phase probability distribution. Example: `cramps` = 80% menstruation, `flirty` = 55% ovulation
- **Phase Midpoints**: Estimated cycle day for each phase center (menstruation: 3, follicular: 10, ovulation: 15, luteal_early: 19, luteal_late: 25)
- **`pickDailyQuestions()`**: Selects 3 random questions seeded by date for consistency

### Signal Estimation (`src/utils/signals.ts`)

- `estimatePhaseFromSignals(signals)`: Takes signal array, returns PhaseEstimate with phase, confidence, day, probabilities
- `estimateFromDatedObservations(observations)`: Temporal analysis using observation dates to fit best cycle start day
- `syntheticPeriodStart(estimatedDay)`: Calculates a lastPeriodStart date from estimated cycle day

## Cycle Math

### Day Calculation
```
cycleDay = ((daysSince(lastPeriodStart, today)) % cycleLength) + 1
```

### Non-28-Day Cycle Mapping
Content is written for 28 days. For other lengths, proportional mapping:
```
fractionElapsed = (currentDay - 1) / (actualCycleLength - 1)
equivalentDay = Math.round(fractionElapsed * 27) + 1
```
A 35-day cycle's "day 20" maps to roughly the same phase as a 28-day cycle's "day 16."

### Phase Boundaries (28-day baseline)
| Phase | Days | Color |
|-------|------|-------|
| Menstruation | 1-5 | #C75B5B (warm red) |
| Follicular | 6-13 | #6BC7A3 (fresh green) |
| Ovulation | 14-16 | #E8C86B (golden) |
| Early Luteal | 17-21 | #7B8FD4 (calm blue) |
| Late Luteal | 22-28 | #9B7BC7 (muted purple) |

## Design System (`src/constants/theme.ts`)

### Colors
```
Background:       #050506 (near black)
Surface:          rgba(255,255,255,0.04) (glass)
Text Primary:     #EDEDEF (off-white)
Text Secondary:   #8A8F98 (gray)
Text Tertiary:    #565B65 (darker gray)
Accent:           #E8836B (warm coral/salmon)
```

**Phase Colors**: See table above.

**Hormone Colors**:
```
Estrogen:         #E88BA3 (pink)
Progesterone:     #B07BE8 (purple)
Testosterone:     #E8B86B (orange)
Prostaglandins:   #E86B6B (red)
Serotonin:        #6BC7E8 (cyan)
```

**Category Colors**:
```
Food:             #E8A86B (orange)
Date:             #E86BA3 (pink)
Physical Touch:   #B06BE8 (purple)
Words:            #6BC7E8 (cyan)
Logistics:        #6BE8A3 (green)
Gift:             #E8C86B (yellow)
```

### Spacing
```
xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
```

### Border Radius
```
sm: 8, md: 12, lg: 16, xl: 24, full: 999
```

### Typography
```
Sizes:   xs (12), sm (14), md (16), lg (20), xl (28), xxl (36)
Weights: regular (400), medium (500), semibold (600), bold (700)
```

## Animation Patterns

All animations use React Native Reanimated v4. Key patterns:

**Entering animations**: `FadeIn`, `FadeInUp`, `FadeInRight`, `ZoomIn`, `BounceIn` with staggered delays (100-300ms between sections)

**Bar meters** (HormoneChart, VibeMeters): `useSharedValue` for width, animated from 0 with `Easing.out(Easing.cubic)`, staggered 80-100ms between bars

**Cycle Ring** (CycleRing.tsx): SVG arcs drawn with animated `strokeDasharray`, 150ms stagger between phases. Active phase has a wider stroke with pulsing opacity. Center dot pulses on a 1.5s sinewave cycle.

**Animated Counter** (AnimatedCounter.tsx): `useAnimatedReaction` to round intermediate values during transitions. Supports prefix/suffix ("Day " + "14" + " /28").

**Tab icons**: Spring scale on focus (damping 15, stiffness 300)

**Check-in streaks**: Spring entry for counter, pulse animation on fire emoji at 7+ day streaks, `ZoomIn` with springify for milestone boxes

**Pulsing dot** (countdown pill): Repeating sequence of scale 1.0 -> 1.4 -> 1.0, 1000ms each

**Glass morphism**: Cards use `rgba(255,255,255,0.03)` overlay on `rgba(255,255,255,0.04)` surface

## The Four Phases (Content Reference)

### Phase 1: Menstruation (Days 1-5)
**Biology**: Uterine lining sheds. Prostaglandins cause contractions. Estrogen + progesterone at floor. Iron drops from blood loss. Serotonin/dopamine low.
**Her experience**: Cramps (mild to debilitating), fatigue, possible headaches/migraines, lower back pain, nausea, mood may improve partway through as PMS lifts.
**Partner mode**: Comfort. Ibuprofen, heating pad, iron-rich food, handle chores, physical affection without pressure, stock the bathroom.
**Content tone**: Warm, supportive, practical.

### Phase 2: Follicular (Days 6-13)
**Biology**: Pituitary releases FSH, follicles develop. Estrogen rises steadily, boosting serotonin/dopamine/endorphins. Testosterone climbing. Pain tolerance improves.
**Her experience**: Energy climbing daily, mood brightening, increased sex drive, better workouts, skin clearing, more adventurous.
**Partner mode**: Adventure. Active dates, gym together, new experiences, spontaneous plans, compliments, match her energy.
**Content tone**: Energetic, encouraging, adventurous.

### Phase 3: Ovulation (Days 14-16)
**Biology**: Estrogen peaks, LH surges to release the egg. Peak testosterone. Pheromone production increases, senses heighten.
**Her experience**: Peak energy/mood/confidence, highest sex drive of the entire cycle, most social, skin glowing, some may feel mittelschmerz (ovulation pain).
**Partner mode**: Date night. Plan something memorable, be present, physical intimacy at natural peak, match social energy. This phase is 2-3 days.
**Content tone**: Celebratory, present, connected.

### Phase 4a: Early Luteal (Days 17-21)
**Biology**: Corpus luteum forms, pumps progesterone. Second smaller estrogen peak. Body temperature rises.
**Her experience**: Relatively stable mood, slightly introspective, mild bloating starting, appetite increasing, prefers smaller settings.
**Partner mode**: Low-key. Cooking together, deep conversations, walks, comfortable evenings, proactively handle household tasks.
**Content tone**: Calm, reflective, nurturing.

### Phase 4b: Late Luteal (Days 22-28)
**Biology**: Corpus luteum breaks down. Progesterone and estrogen crash. Serotonin drops. GABA receptors disrupted. This is PMS and it's biochemical, not psychological.
**Her experience**: Mood swings, bloating (2-5 lbs water), breast tenderness, cravings (body burns 100-300 extra cal/day), acne, disrupted sleep, difficulty concentrating, lower self-esteem.
**Partner mode**: Patience. Validate feelings (don't fix), comfort food without commentary, reduce friction, heating pads, chocolate (magnesium + endorphins), give space or presence (ask which). NEVER say "Are you PMSing?"
**Content tone**: Patient, validating, gentle.

## Planned Features (Not Built)

### AI Coach (`docs/AI_COACH.md`)
Context-aware relationship coaching via webhook to a Claude API backend. User describes a situation ("we just had a fight"), AI responds with biology-informed advice knowing what cycle day she's on. Full architecture spec is in the doc including:
- Webhook endpoint design (`POST /api/flowstate`)
- Authentication (device UUID + shared secret)
- Rate limiting (20 req/hr, 100 req/day per device)
- Request/response payload schemas
- System prompt design
- Anti-abuse measures
- Privacy model (stateless server, all context sent per request)

### Smart Reminders
Local push notifications for phase transitions:
- "Her period likely starts in 2 days. Stock up on ibuprofen and chocolate."
- "Ovulation window. Date night?"
- "PMS window starts Thursday. Keep the weekend low-key."

### Learn Mode
Short educational modules (2-3 min reads): "What actually causes cramps," "The estrogen-serotonin connection," "Why her sex drive changes," "Why cravings are real." Premium feature.

### Manual Date Input Onboarding
Path A: user enters last period start date + cycle length directly. Currently only signal-based onboarding exists.

### Cycle Log Recalibration
"Period started today" button that recalibrates predictions over time for increasing accuracy.

## Monetization Plan

- **Free**: Daily cards, cycle tracking, observation logging, check-in streaks
- **Premium**: AI coach, learn mode, expanded action library, smart reminders, multi-cycle insights
- **One-time purchase option**: $5-10 unlock everything (no subscription)

## Privacy

- All data stored locally on device (AsyncStorage)
- No account required, no cloud sync by default
- No PII sent anywhere
- App prompts users to tell their partner they're using it (not a secret surveillance tool)
- Optional: partner can share data from their own tracker

## Dependencies

```json
{
  "expo": "~54.0.33",
  "expo-router": "~6.0.23",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "react-native-reanimated": "~4.1.1",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-svg": "15.12.1",
  "@react-native-async-storage/async-storage": "2.2.0",
  "@react-native-community/datetimepicker": "8.4.4",
  "react-native-safe-area-context": "~5.6.0",
  "expo-linear-gradient": "~15.0.8",
  "expo-status-bar": "~3.0.9",
  "typescript": "~5.9.2",
  "babel-preset-expo": "^55.0.13"
}
```

## Build & Deploy

**Expo Config** (`app.json`):
- Name: FlowState
- Slug/Scheme: flowstate
- Dark UI style
- Plugins: expo-router, @react-native-community/datetimepicker
- Android: edge-to-edge enabled, adaptive icon
- Web: metro bundler

**Babel** (`babel.config.js`):
- Preset: `babel-preset-expo`
- Plugin: `react-native-reanimated/plugin` (must be last)

**TypeScript** (`tsconfig.json`):
- Strict mode
- Path alias: `@/*` maps to `src/*`
- Extends `expo/tsconfig.base`

**Vercel Web Deploy**:
- Build command: `npx expo export --platform web`
- Output directory: `dist`
- Note: Reanimated and GestureHandler may need web-specific fallbacks

*Built by [publu](https://github.com/publu)*
