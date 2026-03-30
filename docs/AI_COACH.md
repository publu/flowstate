# FlowState -- AI Coach Architecture

## Overview
The AI Coach is a premium feature that provides context-aware relationship guidance. It calls into an AI backend (Bhat/Claude API) with the user's cycle context to deliver biology-informed advice.

## Two AI-Powered Features

### 1. Observation-Based Cycle Estimation

**Problem**: Most guys don't know when her period started. Asking is awkward.

**Solution**: Users log observable behaviors and the AI estimates the cycle phase.

**Input examples**:
- "She's been really tired the last two days"
- "She had cramps this morning"
- "She's been super energetic and wanted to go dancing"
- "She cried watching a movie, which isn't like her"
- "She's been craving chocolate all week"
- "She cancelled plans with friends"
- "Her skin is breaking out"
- "She said she feels bloated"

**How it works**:
1. Each observation is tagged with a date
2. AI maps observations to most likely hormonal signatures:
   - Cramps + fatigue + low mood -> menstruation (days 1-5)
   - Rising energy + social + glowing -> follicular (days 6-13)
   - Peak energy + high libido + confident -> ovulation (days 14-16)
   - Tired + bloated + emotional + cravings -> late luteal (days 22-28)
3. With 1-2 clear markers (cramps = menstruation), AI can estimate a start date
4. After one full cycle of observations, the model has enough data to predict forward
5. Confidence score shown to user: "~70% confident she's in late luteal phase"

**Data accumulation**:
- First observation: rough phase estimate only
- 1-2 weeks of observations: phase estimate + approximate day range
- Full cycle: locked cycle length + predictive capability
- 2+ cycles: high-confidence predictions, personalized pattern recognition

**Transition to proper tracker**:
Once the AI has estimated a full cycle, the app suggests: "Based on your observations, her cycle appears to be about 29 days. Want to switch to predictive mode?" User confirms, and the app transitions from observation mode to the standard daily card experience with forward predictions.

### 2. Context-Aware Coaching

**Problem**: Generic relationship advice doesn't account for hormonal context.

**Solution**: User describes a situation. AI responds with biology-informed guidance.

**Example interaction**:
```
User: "We just had a fight about something small. She's really upset."

AI (knowing she's on day 24 -- late luteal):
"Right now her estrogen and progesterone are both dropping fast. This
hormonal crash reduces serotonin, which directly affects emotional
regulation. She's not overreacting -- her brain is literally processing
emotions more intensely right now.

What to do:
- Don't try to 'solve' the argument. Just validate how she feels.
- Say something like 'I hear you, that sounds really frustrating.'
- Offer physical comfort if she's receptive -- a hug, making tea.
- Don't bring up the topic again tonight. Revisit in 3-4 days when
  her follicular phase starts and she'll have more emotional bandwidth.

What NOT to do:
- Don't say 'you're being dramatic' or mention PMS
- Don't get defensive or escalate
- Don't withdraw completely -- she needs to feel supported even if
  she's pushing back"
```

## Webhook Architecture

### Overview
FlowState calls into Bhat (Railway-hosted Claude instance) via a secured webhook. All AI features route through this single endpoint.

### Endpoint
```
POST https://bhat.up.railway.app/api/flowstate
```

### Authentication & Security

**API Key**:
- Each FlowState install generates a device-specific UUID on first launch
- The webhook requires an `X-FlowState-Key` header with a shared secret
- The shared secret is embedded in the app build (rotatable via app update)
- Device UUID is sent in `X-Device-ID` header for rate limiting

**Rate Limiting (enforced server-side)**:
- **Per device**: 20 requests/hour, 100 requests/day
- **Per IP**: 50 requests/hour (catches abuse even if device IDs are spoofed)
- **Global**: 5000 requests/day (cost ceiling -- at ~$0.02/req that's $100/day max)
- Returns `429 Too Many Requests` with `Retry-After` header when exceeded
- Rate limit state stored in-memory on Railway (resets on deploy, which is fine)

**Request Validation**:
- Reject payloads > 10KB (observations + context shouldn't exceed this)
- Validate JSON schema before forwarding to Claude
- Strip any fields not in the expected schema (prevent prompt injection via extra fields)
- Require `Content-Type: application/json`

**Anti-Abuse**:
- Device IDs that hit rate limits 3x in a day get soft-banned for 24h
- No PII in requests -- observations are behavioral text, no names or identifying info
- Server logs request counts only, not payloads

### Request Payload
```json
{
  "type": "coach" | "observe",
  "device_id": "uuid-v4",
  "cycle_context": {
    "estimated_day": 24,
    "phase": "luteal_late",
    "confidence": 0.85,
    "cycle_length": 28,
    "hormones": {
      "estrogen": 0.25,
      "progesterone": 0.40,
      "testosterone": 0.15,
      "serotonin": 0.20
    }
  },
  "user_input": "We just had a fight about something small.",
  "observation_history": [
    { "date": "2026-03-25", "text": "She was really tired" },
    { "date": "2026-03-27", "text": "She's been craving sweets" }
  ]
}
```

### Response
```json
{
  "type": "coach_response" | "phase_estimate",
  "content": "...",
  "estimated_phase": "luteal_late",
  "estimated_day_range": [22, 26],
  "confidence": 0.85,
  "suggested_actions": [...],
  "rate_limit": {
    "remaining_hour": 17,
    "remaining_day": 92,
    "reset_at": "2026-03-30T08:00:00Z"
  }
}
```

### Webhook Server Implementation (Bhat side)

The webhook handler on Bhat:
1. Validates `X-FlowState-Key` header against stored secret
2. Checks rate limits for `X-Device-ID` and source IP
3. Validates + sanitizes the JSON payload
4. Builds a system prompt with:
   - Full hormonal context for the estimated day
   - The complete biology of the current phase
   - Role instructions: respond with empathy, explain hormones, give actionable advice
   - Safety instructions: NEVER be judgmental about the partner, never diagnose medical conditions
5. Calls Claude API with the constructed prompt
6. Returns structured response with rate limit info in body

### System Prompt for Coach Mode
The AI receives:
1. Full hormonal context for the current estimated day
2. The complete biology of the current phase
3. The user's situation description
4. Instruction to respond with empathy, biology, and actionable advice
5. Instruction to NEVER be judgmental about the partner
6. Instruction to explain the "why" (hormones) before the "what to do"
7. Instruction to never diagnose or replace medical advice

### Privacy
- Observations stored locally on device
- Only sent to webhook when user explicitly asks for coaching or estimation
- No persistent server-side storage of observations or user data
- Webhook is stateless -- all context sent per request
- Rate limit counters are the only server-side state (in-memory, no DB)
- Server logs request counts and device IDs only, never payloads

## Implementation Phases

### Phase 1 (MVP): Manual date input + static daily cards
No AI. Just the content engine with 28 days of pre-written biology/actions.

### Phase 2: AI Coach
Add the coaching endpoint. User taps "Ask Coach" on daily card, types situation, gets biology-informed response.

### Phase 3: Observation Mode
Add observation logging UI. AI estimates phase from behavioral inputs. Replaces manual onboarding as default path.

### Phase 4: Predictive Tracker
After enough observations, app auto-transitions to predictive mode. Combines observation history with forward predictions. Most accurate experience.

## Cost Considerations
- Each coach query = 1 Claude API call (~$0.01-0.03)
- Phase estimation from observations = 1 call per batch of new observations
- Premium feature -- either subscription or one-time purchase covers API costs
- Could cache common coaching responses for similar situations to reduce calls
