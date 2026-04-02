# FlowState: Onboarding & Feature Exposure Strategy

## Current State

The app has these features built:

### Screens
1. **Today** (main tab): cycle day, phase, hormone levels, vibe meters, action suggestions across 6 categories
2. **Cycle** (tab): full 28-day cycle ring visualization with phase arcs
3. **Check In** (tab): daily 3-question check-in with streak tracking + milestones
4. **Category Detail** (6 variants): food, date, physical touch, words, logistics, gift — full action lists per phase

### Content Engine
- 28 days of unique cycle content (biology, feelings, actions, foods to avoid, hormone levels)
- 200+ encyclopedia actions across 6 categories per phase
- 43 "avoid" items with severity levels (gentle, serious, nuclear)
- 7 vibe meters per phase (Cuddle Factor, Romance Level, Adventure Readiness, Patience Meter, Spicy Meter, Nesting Energy, Social Battery)
- 5 hormone level visualizations (estrogen, progesterone, testosterone, prostaglandins, serotonin)

### Engagement
- Check-in streaks with animated celebrations
- 4 milestone badges (3, 7, 14, 30 days)
- Confidence scoring that improves with more check-ins
- Signal tracking (21 tags across energy, mood, physical, affection, behavior)

### Current Onboarding (2 steps)
1. Welcome screen with 3 bullet points
2. Vibe selection (23 cards, multi-select) → estimates phase → saves config → drops into Today tab

---

## The Problem

The onboarding is 2 screens. The user lands on the Today tab without knowing:
- What the 6 category cards do
- That there's a full cycle visualization on the Cycle tab
- That daily check-ins exist and build streaks
- That check-ins improve accuracy over time
- What vibe meters are
- What the hormone chart means
- That there are "avoid" items with severity levels
- How the phase estimation works or gets better

The app has deep content. The user sees maybe 20% on first load. We need to flip that to 80%.

---

## Revised Onboarding Strategy

Goal: by the time the user hits the Today tab, they've already touched every major feature. Not previewed it. Used it. They're invested because they set the app up around their specific relationship.

Principle: every screen is an interaction, not a slide. No "here's what we do" explainer screens. The user learns by doing.

### Screen 1: Hook
- Headline + CTA. Get them in.

### Screen 2: Her Name
- "Who are you showing up for?"
- Single text field, required
- Every screen after this uses [name]

### Screen 3: Vibe Selection (existing, adapted)
- 23 vibe cards, multi-select
- Phase estimation preview shows live as they tap
- They're already interacting with the signal system. This IS the check-in mechanic, they just don't know it yet.

### Screen 4: Vibe Meters (interactive)
- Show the 7 vibe meters for their estimated phase, values filled in
- Let them ADJUST the meters based on what they're seeing with [name] right now
- "Does this feel right? Slide to adjust."
- This teaches them what vibe meters are by having them calibrate them
- Their adjustments get saved as the baseline

### Screen 5: Pick a Category (interactive)
- Show all 6 category cards (food, date, touch, words, logistics, gift)
- "Which would help most with [name] right now?"
- They tap one. It expands to show 3-4 actions from the current phase for that category
- They've now seen the content depth, and they chose which one — invested
- Bonus: save their pick as a preference signal (weight this category higher on Today tab)

### Screen 6: Avoid Item (interactive)
- Show 2-3 avoid items for the current phase, including at least one nuclear severity
- "These are things to skip right now with [name]."
- Have them mark which ones they've been doing (ouch moments)
- This is the gut-punch screen. They realize they've been making mistakes the app could have prevented.

### Screen 7: Cycle Ring (interactive)
- Show the full 28-day cycle ring with their estimated position
- Let them tap different phases to see how the vibe meters and categories shift
- "See what's coming. Tap any phase."
- They explore the ring themselves. They discover that content changes per phase because they're clicking through it.

### Screen 8: First Check-in (interactive)
- Run the actual check-in flow: 3 questions, select answers
- This IS the daily mechanic, done for the first time during setup
- After completing: show streak count (Day 1!) and the milestone badges ahead (3, 7, 14, 30)
- "Come back tomorrow to keep your streak."
- They've now done the thing they'll do every day. No explanation needed.

### Screen 9: Notification Permission
- "Remind you to check in on [name] every day?"
- Show mock notification using [name]
- Enable / Maybe later

### Screen 10: Paywall
- $0.99/mo | $9.99/yr
- By this point they've:
  - Named her
  - Selected vibes
  - Calibrated meters
  - Picked a category and seen actions
  - Read avoid items and marked their mistakes
  - Explored the cycle ring across phases
  - Completed their first check-in
  - Started a streak
- They're not paying for something they've been told about. They're paying to keep something they've already set up.

---

## Annual Upsell

Don't push annual at the paywall. Let them subscribe monthly at $0.99.

After sustained usage (e.g., 30-day streak milestone, or 2-3 months subscribed), surface the annual upsell:
- "You've been checking in for [X] days. Lock in your year for $9.99 (save 17%)."
- Tie it to a milestone moment so it feels like a reward, not a sales pitch
- Could also surface after a phase transition they found useful, or when confidence score hits a threshold
- Show what they'd save: "$11.88/yr → $9.99/yr"

The user already has history and patterns stored locally. The upsell pitch is: you've invested in understanding [name]'s cycle, keep it going for less.

---

## Feature Exposure Map

What the user learns and when:

### On first load — by doing it (80%):
| Feature | How they interact with it |
|---|---|
| Signal/vibe system | Screen 3: select vibes, see phase estimate live |
| Vibe meters | Screen 4: calibrate meters for [name] |
| 6 action categories | Screen 5: pick one, see real actions |
| Avoid items + severity | Screen 6: mark which mistakes they've been making |
| Cycle ring + phase map | Screen 7: tap phases, see content shift |
| Daily check-in | Screen 8: complete their first one |
| Streaks + milestones | Screen 8: see Day 1 streak + upcoming badges |
| Phase estimation | Screen 3: vibe selection produces estimate |

### Discovered in first week — through daily use (20%):
| Feature | How they discover it |
|---|---|
| Hormone chart details | Exploring Today tab after onboarding |
| Confidence score improving | After 2-3 check-ins, accuracy message changes |
| Phase transitions | Cycle day crosses into new phase |
| Pro tips on actions | Tapping individual encyclopedia items |
| Full 28-day content depth | Content changes each day they return |
| Other category actions | Exploring categories they didn't pick in onboarding |

---

## What Needs Building

Based on what exists vs. what this strategy requires:

1. **Onboarding screens 3-6**: new screens showing feature previews (Today preview, vibe meters, check-in/streaks, cycle tab)
2. **Push notifications**: daily check-in reminders + phase transition alerts
3. **Paywall + subscription**: IAP integration, $0.99/mo and $9.99/yr
4. **Notification permission screen**: in onboarding flow
5. **Settings screen**: cycle config editing, notification times, subscription management

---

## Open Questions (for Pablo to decide)
- What goes behind the paywall vs. free? (Everything? Or free with limits?)
- Partner name input: should onboarding ask for her name so content says "[name]" instead of "her"?
- Account creation: email/Apple/Google sign-in, or keep it fully local?
- Which onboarding screens can be combined to keep it tight?
- Any features to add to the exposure list that I'm missing from the current build?
