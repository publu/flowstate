# FlowState -- Technical Architecture

## Stack
- **Framework**: React Native with Expo SDK 54
- **Routing**: Expo Router (file-based)
- **Storage**: AsyncStorage (local-first, no backend for MVP)
- **Visualization**: react-native-svg (cycle ring)
- **Date picker**: @react-native-community/datetimepicker
- **Language**: TypeScript (strict)

## Project Structure

```
flowstate/
  app.json                    # Expo config (dark theme, scheme: flowstate)
  package.json                # main: expo-router/entry
  tsconfig.json               # paths: @/* -> src/*
  docs/
    PRODUCT.md                # Product vision, features, phases
    ARCHITECTURE.md           # This file
    AI_COACH.md               # AI observation + coaching architecture
    CONTENT_GUIDE.md          # How daily content is structured
  app/
    _layout.tsx               # Root Stack layout, dark theme, loads storage
    index.tsx                 # Router: checks onboarding -> redirects
    onboarding.tsx            # Enter last period date + cycle length
    (tabs)/
      _layout.tsx             # Tab bar: Today + Timeline
      index.tsx               # Daily Card screen (main experience)
      timeline.tsx            # Cycle ring visualization
  src/
    types/
      index.ts                # Phase, Action, DayContent, CycleConfig, etc.
    constants/
      theme.ts                # Colors (dark), spacing, radius, font sizes
      phases.ts               # Phase metadata: names, colors, day ranges, emojis
    data/
      cycle-content.ts        # 28 DayContent entries (biology, feelings, actions, hormones)
    utils/
      cycle.ts                # getCycleDay, getPhase, getDayContent, mapTo28
      storage.ts              # AsyncStorage wrapper: save/load/clear CycleConfig
    hooks/
      useCycleData.ts         # Single hook: loads config, computes day/phase/content
    components/
      DailyCard.tsx           # Card container with all sections
      BiologySection.tsx      # "What's happening" with hormone explanation
      FeelingsSection.tsx     # "What she might be feeling" bullet list
      ActionsSection.tsx      # Actions grouped by category with effort indicators
      AvoidSection.tsx        # "Things to avoid" red-tinted list
      HormoneBar.tsx          # Single horizontal bar for one hormone
      HormoneChart.tsx        # Group of HormoneBar components
      CycleRing.tsx           # SVG circular timeline
      PhaseIndicator.tsx      # Phase name badge with phase color
```

## Data Flow

```
AsyncStorage (CycleConfig)
       |
       v
useCycleData hook
  - loads config on mount
  - computes cycleDay from lastPeriodStart + today
  - maps cycleDay to 28-day equivalent (for non-28 cycles)
  - looks up DayContent from cycle-content.ts
  - returns { loading, isOnboarded, cycleDay, phase, content, daysUntilPeriod }
       |
       v
Screens consume hook
  - Onboarding: calls saveConfig
  - Daily Card: renders content
  - Timeline: renders cycle ring + phase info
```

## Cycle Math

### Day Calculation
```
cycleDay = ((daysSince(lastPeriodStart, today)) % cycleLength) + 1
```

### Non-28 Cycle Scaling
Content is written for 28 days. For other cycle lengths, we proportionally map:
```
fractionElapsed = (currentDay - 1) / (actualCycleLength - 1)
equivalentDay = Math.round(fractionElapsed * 27) + 1
```
This means a 35-day cycle's "day 20" maps to roughly the same biological phase as a 28-day cycle's "day 16."

### Phase Boundaries (28-day baseline)
- Days 1-5: menstruation
- Days 6-13: follicular
- Days 14-16: ovulation
- Days 17-21: luteal_early
- Days 22-28: luteal_late

## Theme

Dark theme with warm accents. Phase-specific colors:
- Background: #0D0D0F
- Surface: #1A1A1F
- Text: #F0EDE8
- Accent: #E8836B (warm coral)
- Menstruation: #C75B5B (warm red)
- Follicular: #6BC7A3 (fresh green)
- Ovulation: #E8C86B (golden)
- Early Luteal: #7B8FD4 (calm blue)
- Late Luteal: #9B7BC7 (muted purple)

## Dependencies (MVP)
- expo ~54
- expo-router ~6
- react 19.1, react-native 0.81
- @react-native-async-storage/async-storage
- react-native-svg
- @react-native-community/datetimepicker
- expo-status-bar, expo-constants, expo-linking
- react-native-safe-area-context, react-native-screens

No state management library (one hook is enough).
No UI component library.
No backend.
