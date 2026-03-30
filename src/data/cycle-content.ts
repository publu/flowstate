import { DayContent } from '../types';

export const cycleContent: DayContent[] = [
  // ============================================================
  // MENSTRUATION (Days 1-5)
  // ============================================================
  {
    day: 1,
    phase: 'menstruation',
    phaseName: 'Menstruation',
    biology:
      'Her period just started. The uterine lining is shedding because pregnancy didn\'t occur last cycle. Prostaglandins -- chemical messengers that cause the uterus to contract -- are at their highest right now. These same prostaglandins circulate throughout her body, which is why period symptoms aren\'t just in the abdomen. They can cause headaches, nausea, diarrhea, and general achiness. Both estrogen and progesterone are at rock bottom, meaning serotonin and dopamine (the "feel-good" brain chemicals) are also at their lowest.',
    feelings: [
      'Cramps ranging from mild to severe (prostaglandins causing uterine contractions)',
      'Fatigue and low energy from hormonal lows',
      'Possible headaches or migraines (estrogen withdrawal is a trigger)',
      'Lower back pain from contractions radiating through the pelvis',
      'Mood may actually improve slightly -- PMS is over and there\'s often a sense of relief',
    ],
    actions: [
      { text: 'Have ibuprofen ready -- it\'s an anti-prostaglandin, so it targets the actual cause of cramps', category: 'logistics', effort: 'low' },
      { text: 'Set up a heating pad or hot water bottle for her (heat relaxes uterine muscles)', category: 'physical_touch', effort: 'low' },
      { text: 'Cook something iron-rich -- steak, spinach salad, or lentil soup (she\'s losing iron through blood loss)', category: 'food', effort: 'medium' },
      { text: 'Say "What do you need today?" and mean it', category: 'words', effort: 'low' },
      { text: 'Handle the dishes, laundry, or whatever chore she\'d normally do without being asked', category: 'logistics', effort: 'medium' },
      { text: 'Bring her dark chocolate -- it has magnesium which helps with cramps and triggers endorphins', category: 'gift', effort: 'low' },
      { text: 'Offer physical affection without sexual expectation -- just hold her', category: 'physical_touch', effort: 'low' },
    ],
    avoid: [
      'Don\'t say "Is it that time of the month?" -- she knows, and it dismisses what she\'s feeling',
      'Don\'t act grossed out or make her feel like she\'s inconvenient',
      'Don\'t push for high-energy plans tonight',
      'Don\'t comment on her appearance if she looks tired',
    ],
    hormones: { estrogen: 0.10, progesterone: 0.05, testosterone: 0.15, prostaglandins: 1.0, serotonin: 0.15 },
  },
  {
    day: 2,
    phase: 'menstruation',
    phaseName: 'Menstruation',
    biology:
      'Day 2 is typically the heaviest flow day. Prostaglandins are still very active, meaning cramps are likely at their worst. Her body is working hard -- the uterus is contracting repeatedly to expel the lining. Iron levels are dropping from blood loss, which adds to fatigue. Estrogen is still at its floor, so serotonin production is minimal. The body is essentially in recovery mode.',
    feelings: [
      'Heaviest flow day -- she may need to change pads/tampons more frequently',
      'Cramps likely at their most intense',
      'Deep fatigue from iron loss and hormonal lows',
      'Possible digestive issues (prostaglandins affect the bowels too)',
      'May feel drained but not necessarily sad -- the body is just running on empty',
    ],
    actions: [
      { text: 'Make her a warm, iron-rich meal -- beef stew, dark leafy greens, or even a burger', category: 'food', effort: 'medium' },
      { text: 'Refill her water bottle without being asked (hydration helps with cramps and fatigue)', category: 'logistics', effort: 'low' },
      { text: 'Suggest a movie night -- let her pick, no pressure to go out', category: 'date', effort: 'low' },
      { text: 'Give her a lower back massage (that\'s where uterine contractions radiate)', category: 'physical_touch', effort: 'medium' },
      { text: 'Make sure the bathroom is stocked with pads, tampons, or whatever she uses', category: 'logistics', effort: 'low' },
      { text: 'Bring her ginger or chamomile tea -- both help with cramps and nausea', category: 'food', effort: 'low' },
    ],
    avoid: [
      'Don\'t suggest she\'s being lazy -- her body is doing hard physical work right now',
      'Don\'t make plans that require her to be "on" socially',
      'Don\'t comment on how much she\'s eating -- her body is burning extra energy',
    ],
    hormones: { estrogen: 0.08, progesterone: 0.05, testosterone: 0.15, prostaglandins: 0.85, serotonin: 0.12 },
  },
  {
    day: 3,
    phase: 'menstruation',
    phaseName: 'Menstruation',
    biology:
      'Flow is beginning to stabilize, but iron levels continue to drop -- especially if her flow has been heavy. The body is still producing prostaglandins but at a slightly lower rate than yesterday. Estrogen is just barely beginning to stir as the brain\'s pituitary gland starts sending early signals (FSH -- Follicle Stimulating Hormone) to the ovaries. This is the very beginning of the next cycle\'s follicle development, though she won\'t feel it yet.',
    feelings: [
      'Cramps easing slightly but still present',
      'Fatigue from cumulative iron loss over 3 days',
      'May feel more emotionally stable than days 1-2',
      'Low energy but possibly a hint of "turning the corner"',
      'Might be frustrated with the logistics of managing her period',
    ],
    actions: [
      { text: 'Take over a chore she usually handles -- take out the trash, walk the dog, prep lunch', category: 'logistics', effort: 'medium' },
      { text: 'Make a smoothie with spinach, banana, and berries (iron + potassium + vitamins)', category: 'food', effort: 'low' },
      { text: 'Ask if she wants company or alone time -- don\'t assume', category: 'words', effort: 'low' },
      { text: 'Get her a cozy blanket and set up the couch for her', category: 'physical_touch', effort: 'low' },
      { text: 'Surprise her with her comfort snack -- whatever she always reaches for', category: 'gift', effort: 'low' },
      { text: 'Handle dinner entirely -- cook or order her favorite', category: 'food', effort: 'medium' },
    ],
    avoid: [
      'Don\'t try to "fix" her mood with forced positivity',
      'Don\'t take it personally if she\'s quiet or withdrawn',
      'Don\'t bring up stressful topics or big decisions right now',
    ],
    hormones: { estrogen: 0.10, progesterone: 0.05, testosterone: 0.18, prostaglandins: 0.70, serotonin: 0.15 },
  },
  {
    day: 4,
    phase: 'menstruation',
    phaseName: 'Menstruation',
    biology:
      'Flow is lightening. Prostaglandins are decreasing, which means cramps are subsiding. The pituitary gland is now actively releasing FSH (Follicle Stimulating Hormone), telling the ovaries to start developing follicles -- tiny fluid-filled sacs that each contain an egg. Estrogen is starting its slow climb from the floor. She\'s not going to feel the hormonal shift yet, but her body is already preparing for the next phase.',
    feelings: [
      'Pain easing noticeably -- cramps becoming occasional rather than constant',
      'Energy still low but not as depleted as days 1-3',
      'May feel a bit of relief that the worst is behind her',
      'Appetite returning to normal',
      'Might start feeling restless from staying in',
    ],
    actions: [
      { text: 'Suggest a low-key movie night -- something lighthearted she\'ll enjoy', category: 'date', effort: 'low' },
      { text: 'Cook her favorite comfort food -- pasta, soup, whatever she loves', category: 'food', effort: 'medium' },
      { text: 'Foot rub while watching TV -- simple but it means a lot', category: 'physical_touch', effort: 'low' },
      { text: '"You\'ve been so tough this week" -- acknowledge what she\'s been through', category: 'words', effort: 'low' },
      { text: 'Light a candle, dim the lights -- create a calm atmosphere at home', category: 'logistics', effort: 'low' },
      { text: 'Pick up flowers on the way home -- doesn\'t have to be expensive', category: 'gift', effort: 'medium' },
    ],
    avoid: [
      'Don\'t assume she\'s "fine now" just because the worst is passing',
      'Don\'t push for anything physically demanding yet',
      'Don\'t stop being attentive -- the effort matters even as symptoms ease',
    ],
    hormones: { estrogen: 0.15, progesterone: 0.05, testosterone: 0.20, prostaglandins: 0.50, serotonin: 0.20 },
  },
  {
    day: 5,
    phase: 'menstruation',
    phaseName: 'Menstruation',
    biology:
      'Last day of menstruation for most women. Flow is very light or spotting. Prostaglandins have dropped significantly. Estrogen is now visibly rising -- she\'s transitioning into the follicular phase. FSH is actively working in the ovaries, and one follicle is starting to become dominant. Her brain is beginning to produce more serotonin as estrogen climbs, so mood and energy are on an upswing. This is the "turning the corner" day.',
    feelings: [
      'Light flow or spotting -- period is wrapping up',
      'Energy starting to return, mood lifting',
      'May feel a sense of "fresh start"',
      'Appetite normalizing',
      'Might be ready to do something beyond the couch',
    ],
    actions: [
      { text: 'Suggest a gentle walk together -- fresh air after days inside feels great', category: 'date', effort: 'low' },
      { text: 'Cook a nutrient-dense meal to replenish what she\'s lost (salmon, sweet potatoes, greens)', category: 'food', effort: 'medium' },
      { text: '"You look like you\'re feeling better" -- notice and acknowledge the shift', category: 'words', effort: 'low' },
      { text: 'Suggest light plans for the weekend -- she\'s ready to start looking forward', category: 'date', effort: 'low' },
      { text: 'Hold her hand on a walk -- reconnect physically in a simple way', category: 'physical_touch', effort: 'low' },
      { text: 'Pick up her favorite coffee or tea on your way home', category: 'gift', effort: 'low' },
    ],
    avoid: [
      'Don\'t immediately ramp up to full intensity plans -- she\'s recovering, not recovered',
      'Don\'t stop the attentiveness cold turkey just because her period is ending',
    ],
    hormones: { estrogen: 0.20, progesterone: 0.05, testosterone: 0.22, prostaglandins: 0.30, serotonin: 0.25 },
  },

  // ============================================================
  // FOLLICULAR PHASE (Days 6-13)
  // ============================================================
  {
    day: 6,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Welcome to the follicular phase -- the "glow-up" begins. FSH (Follicle Stimulating Hormone) is actively developing follicles in the ovaries, and estrogen is climbing steadily. Estrogen is the main "feel-good" hormone -- it directly boosts serotonin (mood), dopamine (motivation and pleasure), and endorphins (natural painkillers). Her pain tolerance is improving, skin is starting to clear up, and cognitive function is sharpening. This is the beginning of her best stretch.',
    feelings: [
      'Energy visibly returning after the period low',
      'Mood brightening -- serotonin is climbing with estrogen',
      'Starting to feel more motivated and engaged',
      'Physically recovering -- bloating decreasing, pain gone',
      'May start wanting to be more social again',
    ],
    actions: [
      { text: 'Suggest something active -- a walk, gym session, or bike ride together', category: 'date', effort: 'medium' },
      { text: 'Plan a date for later this week -- she\'ll have the energy for it', category: 'date', effort: 'low' },
      { text: 'Cook a fresh, energizing meal -- grilled chicken with roasted veggies, stir fry', category: 'food', effort: 'medium' },
      { text: '"You seem like you\'re in a great mood" -- reflect her energy back', category: 'words', effort: 'low' },
      { text: 'Suggest an errand or project together -- she\'s getting her drive back', category: 'logistics', effort: 'medium' },
      { text: 'Play her favorite upbeat playlist during dinner', category: 'logistics', effort: 'low' },
    ],
    avoid: [
      'Don\'t be a downer -- match her rising energy, don\'t drag it down',
      'Don\'t bring up stressful financial or logistical conversations yet -- save it for a couple more days when she\'s peaking',
    ],
    hormones: { estrogen: 0.28, progesterone: 0.05, testosterone: 0.28, prostaglandins: 0.10, serotonin: 0.30 },
  },
  {
    day: 7,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Estrogen continues its steady climb. The dominant follicle in her ovary is growing larger each day, producing more estrogen as it develops. Testosterone is also beginning to rise -- yes, women produce testosterone too, primarily from the ovaries and adrenal glands. Testosterone drives sex drive, motivation, assertiveness, and competitive energy. The combination of rising estrogen + rising testosterone is why this phase feels like confidence building from the ground up.',
    feelings: [
      'Mood noticeably brighter than last week',
      'Starting to feel attractive again after the period slump',
      'More interested in socializing and making plans',
      'Better sleep quality (estrogen helps regulate sleep architecture)',
      'Motivation to tackle things she\'s been putting off',
    ],
    actions: [
      { text: 'Plan a real date for this weekend -- dinner out, a show, something worth getting dressed up for', category: 'date', effort: 'high' },
      { text: 'Compliment her genuinely -- "You look amazing today" lands especially well right now', category: 'words', effort: 'low' },
      { text: 'Suggest cooking something new together -- she\'s open to trying things', category: 'food', effort: 'medium' },
      { text: 'Work out together -- her strength and endurance are climbing', category: 'date', effort: 'medium' },
      { text: 'Make a plan to tackle something around the house together -- she\'s got the energy and drive', category: 'logistics', effort: 'medium' },
      { text: 'Initiate physical affection -- she\'s more receptive now', category: 'physical_touch', effort: 'low' },
    ],
    avoid: [
      'Don\'t waste this energy window on nothing -- she wants to do things',
      'Don\'t be passive when she suggests plans -- match her enthusiasm',
    ],
    hormones: { estrogen: 0.35, progesterone: 0.05, testosterone: 0.32, prostaglandins: 0.10, serotonin: 0.38 },
  },
  {
    day: 8,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Estrogen is now in the mid-range and climbing. Her brain is responding with increased serotonin and dopamine production, which means she\'s more optimistic, creative, and verbally fluent. Studies show that verbal memory and social cognition actually peak during this phase. Her skin is improving because estrogen promotes collagen production and reduces sebum. She\'s literally glowing up from the inside out.',
    feelings: [
      'Feeling optimistic and creative',
      'More talkative and expressive than usual',
      'Skin clearing up, feeling better about her appearance',
      'Higher tolerance for stress and frustration',
      'Interested in new experiences and novelty',
    ],
    actions: [
      { text: 'Try something new together -- a restaurant neither of you has been to, a new trail, a cooking experiment', category: 'date', effort: 'medium' },
      { text: 'Have a real conversation about dreams, goals, future plans -- she\'s in her most articulate phase', category: 'words', effort: 'low' },
      { text: 'Make a colorful, fresh meal -- Buddha bowl, sushi night, Mediterranean spread', category: 'food', effort: 'medium' },
      { text: 'Take photos together -- she\'s feeling herself', category: 'date', effort: 'low' },
      { text: 'Surprise her with a small adventure -- "I found this cool place, let\'s check it out"', category: 'date', effort: 'high' },
      { text: 'Tell her something you appreciate about her personality, not just her looks', category: 'words', effort: 'low' },
    ],
    avoid: [
      'Don\'t be boring -- she craves novelty right now',
      'Don\'t shut down her ideas or enthusiasm',
      'Don\'t be glued to your phone when she wants to talk -- she\'s at her most communicative',
    ],
    hormones: { estrogen: 0.42, progesterone: 0.05, testosterone: 0.38, prostaglandins: 0.08, serotonin: 0.45 },
  },
  {
    day: 9,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Testosterone is rising noticeably alongside estrogen. Testosterone in women drives motivation, assertiveness, and physical strength. Combined with high estrogen (boosting serotonin and dopamine), this creates a window where she feels both strong and happy. Her muscle recovery is faster, pain tolerance is higher, and she can push harder physically without as much soreness afterward. This is the ideal workout window.',
    feelings: [
      'Feeling strong and capable',
      'Motivation is high -- she might be crushing it at work',
      'Sex drive starting to climb (testosterone effect)',
      'Competitive energy -- she might want to push herself',
      'Confident and decisive',
    ],
    actions: [
      { text: 'Hit the gym together -- suggest a challenging workout, she can handle it', category: 'date', effort: 'medium' },
      { text: 'Plan an active date -- rock climbing, hiking, dancing, tennis', category: 'date', effort: 'high' },
      { text: 'Make a high-protein post-workout meal together -- grilled chicken, quinoa, avocado', category: 'food', effort: 'medium' },
      { text: 'Compliment her strength or drive -- "I love how hard you go at things"', category: 'words', effort: 'low' },
      { text: 'Be physically playful -- wrestle, race, be spontaneous', category: 'physical_touch', effort: 'low' },
      { text: 'If she\'s been wanting to start something (project, hobby, goal) -- encourage her to go for it now', category: 'words', effort: 'low' },
    ],
    avoid: [
      'Don\'t be a couch potato when she wants to be active',
      'Don\'t underestimate her physically -- she\'s at her strongest',
    ],
    hormones: { estrogen: 0.50, progesterone: 0.05, testosterone: 0.45, prostaglandins: 0.08, serotonin: 0.52 },
  },
  {
    day: 10,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Estrogen is approaching its upper range. The dominant follicle in her ovary is now large enough to be visible on an ultrasound -- about 15mm. Estrogen at this level significantly boosts serotonin, which regulates mood, sleep, and appetite. She\'s sleeping well, eating normally, and feeling emotionally stable. Dopamine is also elevated, meaning she gets more pleasure from activities and is more likely to feel rewarded by positive experiences.',
    feelings: [
      'Confidence building steadily',
      'Sleeping well, waking up rested',
      'Emotionally stable and resilient',
      'Finding more pleasure in everyday activities',
      'Social battery is charged -- she might want to see friends',
    ],
    actions: [
      { text: 'Compliment her genuinely and specifically -- not just "you look nice" but what exactly', category: 'words', effort: 'low' },
      { text: 'Suggest a double date or group hangout -- she\'s socially energized', category: 'date', effort: 'high' },
      { text: 'Cook together and make it fun -- put on music, open wine, dance in the kitchen', category: 'food', effort: 'medium' },
      { text: 'Be affectionate in public -- hold her hand, arm around her waist', category: 'physical_touch', effort: 'low' },
      { text: 'If there\'s a big conversation you\'ve been putting off, this is a good window for it', category: 'words', effort: 'medium' },
      { text: 'Surprise her with tickets to something -- concert, comedy show, exhibition', category: 'gift', effort: 'high' },
    ],
    avoid: [
      'Don\'t cancel plans she\'s excited about',
      'Don\'t be emotionally distant when she\'s open and connected',
    ],
    hormones: { estrogen: 0.60, progesterone: 0.05, testosterone: 0.52, prostaglandins: 0.05, serotonin: 0.60 },
  },
  {
    day: 11,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Estrogen is now high. An interesting effect at this level: pain tolerance increases significantly. Studies show women in their late follicular phase can withstand more physical discomfort than at any other point in their cycle. This is why doctors sometimes recommend scheduling procedures like waxing, dental work, or tattoos during this window. Her immune system is also functioning optimally right now.',
    feelings: [
      'Feeling physically strong and pain-resilient',
      'High energy throughout the day',
      'Adventurous and open to new experiences',
      'Feeling attractive -- estrogen is peaking skin quality',
      'Emotionally open and expressive',
    ],
    actions: [
      { text: 'Plan an adventure date -- something you\'ve both been wanting to try', category: 'date', effort: 'high' },
      { text: 'If she\'s been putting off a tough workout or physical challenge, encourage her -- today\'s the day', category: 'words', effort: 'low' },
      { text: 'Make a vibrant, celebratory meal -- think date-night quality at home', category: 'food', effort: 'high' },
      { text: 'Be spontaneous -- "Let\'s go for a drive" or "Let\'s try that place we always pass"', category: 'date', effort: 'medium' },
      { text: 'Physical intimacy is on an upswing -- be attentive to her cues', category: 'physical_touch', effort: 'low' },
      { text: 'Tell her about something you admire about how she handles things', category: 'words', effort: 'low' },
    ],
    avoid: [
      'Don\'t be negative or pessimistic -- she\'s riding high and your energy matters',
      'Don\'t shut down adventurous suggestions',
    ],
    hormones: { estrogen: 0.70, progesterone: 0.05, testosterone: 0.60, prostaglandins: 0.05, serotonin: 0.70 },
  },
  {
    day: 12,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'Estrogen is nearing its peak. The dominant follicle is now about 18-20mm and producing large amounts of estrogen. This high estrogen level is about to trigger the LH (Luteinizing Hormone) surge that causes ovulation. Her pheromone production is shifting -- studies show that men actually rate women\'s scent as more attractive during this part of the cycle. Her voice pitch subtly rises, and facial symmetry perception changes. Biology is running its "attract a mate" program.',
    feelings: [
      'Social energy at its highest -- she wants to be out and about',
      'Feeling very attractive and confident',
      'High sex drive (testosterone + estrogen combo)',
      'Creative and mentally sharp',
      'May want to dress up more than usual',
    ],
    actions: [
      { text: 'Go out with friends, do something social -- she\'s at her most outgoing', category: 'date', effort: 'medium' },
      { text: 'Tell her she looks incredible -- she\'s put effort in and she wants to hear it', category: 'words', effort: 'low' },
      { text: 'Plan something for tomorrow night -- ovulation is coming and it\'s date night territory', category: 'date', effort: 'low' },
      { text: 'Be flirty -- match her energy, tease her, keep it playful', category: 'words', effort: 'low' },
      { text: 'Make reservations at that restaurant she\'s been mentioning', category: 'date', effort: 'high' },
      { text: 'Be physically present -- sit close, touch her back, lean in when she talks', category: 'physical_touch', effort: 'low' },
    ],
    avoid: [
      'Don\'t be a wallflower when she wants to go out',
      'Don\'t ignore her when she\'s clearly put effort into how she looks',
      'Don\'t bring up heavy/stressful topics -- ride the wave',
    ],
    hormones: { estrogen: 0.80, progesterone: 0.08, testosterone: 0.70, prostaglandins: 0.05, serotonin: 0.78 },
  },
  {
    day: 13,
    phase: 'follicular',
    phaseName: 'Follicular Phase',
    biology:
      'The pre-ovulation surge is building. Estrogen is about to hit its absolute peak, which will trigger the LH surge tomorrow. The follicle is fully mature at about 20-24mm. Her body is producing maximum estrogen, meaning serotonin, dopamine, and endorphins are all at their cycle highs. Testosterone is also climbing toward its peak. She\'s essentially running on biological rocket fuel right now -- peak mood, peak energy, peak confidence.',
    feelings: [
      'Peak energy and mood -- she feels unstoppable',
      'Very high sex drive',
      'Extremely social and charismatic',
      'Creative ideas flowing',
      'Anticipation and excitement about life in general',
    ],
    actions: [
      { text: 'Plan tomorrow\'s date night -- ovulation peak is coming, make it count', category: 'date', effort: 'medium' },
      { text: 'Match her energy -- be present, be fun, be engaged', category: 'words', effort: 'low' },
      { text: 'Cook something special or take her somewhere she loves', category: 'food', effort: 'high' },
      { text: 'Be physically close and affectionate -- she\'s very receptive right now', category: 'physical_touch', effort: 'low' },
      { text: 'If you\'ve been meaning to have a good conversation, tonight\'s great for it', category: 'words', effort: 'low' },
      { text: 'Surprise her -- flowers, a handwritten note, an unplanned detour to her favorite spot', category: 'gift', effort: 'medium' },
    ],
    avoid: [
      'Don\'t waste this window on autopilot -- be intentional',
      'Don\'t be low-energy or checked out',
    ],
    hormones: { estrogen: 0.90, progesterone: 0.08, testosterone: 0.80, prostaglandins: 0.05, serotonin: 0.85 },
  },

  // ============================================================
  // OVULATION (Days 14-16)
  // ============================================================
  {
    day: 14,
    phase: 'ovulation',
    phaseName: 'Ovulation',
    biology:
      'This is ovulation day. Estrogen hits its absolute peak, triggering a massive surge of LH (Luteinizing Hormone) from the pituitary gland. This LH surge causes the dominant follicle to rupture, releasing a mature egg into the fallopian tube. The egg is viable for 12-24 hours. This is the biological peak of the entire cycle. Testosterone is also at its cycle high, driving peak sex drive. Estrogen at maximum means serotonin, dopamine, and endorphins are all peaking. Pheromone production, voice pitch, even her scent -- everything is biologically optimized right now.',
    feelings: [
      'Peak confidence and energy -- she feels magnetic',
      'Highest sex drive of the entire cycle',
      'Most social and outgoing she\'ll be all month',
      'Heightened senses -- smell, taste, and touch are more acute',
      'Some women feel a mild twinge on one side (mittelschmerz -- "middle pain" in German) as the egg releases',
    ],
    actions: [
      { text: 'This is THE date night. Go somewhere memorable -- a great restaurant, a rooftop bar, live music', category: 'date', effort: 'high' },
      { text: 'Be fully present -- put your phone away, look at her, engage deeply', category: 'words', effort: 'low' },
      { text: 'Physical intimacy is at its natural peak -- be attentive and take your time', category: 'physical_touch', effort: 'medium' },
      { text: 'Take a photo together -- she looks and feels her best', category: 'date', effort: 'low' },
      { text: 'Tell her something meaningful -- not just "you\'re beautiful" but why you chose her', category: 'words', effort: 'low' },
      { text: 'Cook an incredible meal if staying in -- make the effort match the moment', category: 'food', effort: 'high' },
    ],
    avoid: [
      'Don\'t be on your phone during dinner',
      'Don\'t waste this on a forgettable evening -- she\'ll remember how you show up during her peak',
      'If you\'re not trying to conceive, this is the fertility window -- be mindful about contraception',
    ],
    hormones: { estrogen: 1.0, progesterone: 0.10, testosterone: 1.0, prostaglandins: 0.05, serotonin: 1.0 },
  },
  {
    day: 15,
    phase: 'ovulation',
    phaseName: 'Ovulation',
    biology:
      'The egg was released yesterday and is now in the fallopian tube. Estrogen has started to dip slightly from its peak but is still very high. Testosterone is at its cycle high, meaning sex drive is maximal. The ruptured follicle is beginning its transformation into the corpus luteum ("yellow body"), which will soon start producing progesterone. But progesterone hasn\'t kicked in yet, so she\'s still riding the estrogen-testosterone high. Enjoy this -- the hormonal shift starts tomorrow.',
    feelings: [
      'Still riding the peak -- high energy, high confidence',
      'Very high sex drive (testosterone at max)',
      'Socially magnetic and charming',
      'May feel a slight shift starting -- like the last day of vacation',
      'Heightened emotional connection -- she feels close to you',
    ],
    actions: [
      { text: 'Be present and connected -- this peak window is closing soon', category: 'words', effort: 'low' },
      { text: 'Initiate intimacy -- she\'s at her most receptive', category: 'physical_touch', effort: 'low' },
      { text: 'Have a meaningful conversation about your relationship -- what\'s working, what you love', category: 'words', effort: 'medium' },
      { text: 'Do something active together -- her energy is still high', category: 'date', effort: 'medium' },
      { text: 'Make her favorite breakfast in bed -- start the day right', category: 'food', effort: 'medium' },
      { text: 'Write her a note about something specific you love about her', category: 'gift', effort: 'low' },
    ],
    avoid: [
      'Don\'t be distant or checked out -- she\'s emotionally open and will notice',
      'Don\'t pick fights or bring up grievances during this window',
    ],
    hormones: { estrogen: 0.85, progesterone: 0.15, testosterone: 0.85, prostaglandins: 0.05, serotonin: 0.88 },
  },
  {
    day: 16,
    phase: 'ovulation',
    phaseName: 'Ovulation',
    biology:
      'The ovulation window is closing. Estrogen is coming down from its peak, and progesterone is starting to rise as the corpus luteum gets to work. This is a transition day -- the body is shifting from "attract mode" to "nest mode." Testosterone is declining from its peak but still elevated. She might feel a subtle energy shift, like going from fifth gear to fourth. Still a great day, but the hormonal landscape is changing.',
    feelings: [
      'Energy still high but starting to feel the shift',
      'Emotionally warm and connected',
      'Sex drive still elevated but not at yesterday\'s peak',
      'May feel more contemplative than the last few days',
      'Starting to turn inward slightly',
    ],
    actions: [
      { text: 'Have a deep conversation -- she\'s transitioning from social to reflective', category: 'words', effort: 'low' },
      { text: 'Cook a nice meal together at home -- she may prefer staying in tonight', category: 'food', effort: 'medium' },
      { text: 'Hold her, be close -- physical touch grounds the transition', category: 'physical_touch', effort: 'low' },
      { text: 'Suggest a walk at sunset -- calm, connected, beautiful', category: 'date', effort: 'low' },
      { text: 'Talk about plans for the coming week -- she\'s still in planning mode', category: 'words', effort: 'low' },
      { text: 'Run her a bath -- the shift to "nesting" energy starts here', category: 'logistics', effort: 'medium' },
    ],
    avoid: [
      'Don\'t push for a big social night out -- she\'s winding down from peak social mode',
      'Don\'t ignore the subtle mood shift -- she\'s not upset, she\'s transitioning',
    ],
    hormones: { estrogen: 0.70, progesterone: 0.25, testosterone: 0.65, prostaglandins: 0.05, serotonin: 0.75 },
  },

  // ============================================================
  // EARLY LUTEAL (Days 17-21)
  // ============================================================
  {
    day: 17,
    phase: 'luteal_early',
    phaseName: 'Early Luteal Phase',
    biology:
      'The corpus luteum (the structure left behind after the egg was released) is now actively producing progesterone. Progesterone is the "nesting hormone" -- it slows things down, raises body temperature slightly (about 0.5 degrees F), and begins preparing the uterine lining for a potential pregnancy. Unlike estrogen which boosts serotonin and dopamine, progesterone has a sedative effect. It acts on GABA receptors in the brain, which are the same receptors targeted by anti-anxiety medications. She may feel calmer but also sleepier.',
    feelings: [
      'Noticeably calmer than the ovulation high',
      'Slightly sleepier, especially in the evening',
      'Introspective mood -- thinking more, talking slightly less',
      'Still emotionally stable (estrogen hasn\'t crashed yet)',
      'Body temperature slightly elevated -- she might feel warmer than usual',
    ],
    actions: [
      { text: 'Cook together at home -- a slow, relaxing evening beats going out', category: 'food', effort: 'medium' },
      { text: 'Suggest a calm evening activity -- puzzle, board game, cooking something elaborate', category: 'date', effort: 'low' },
      { text: 'Ask a thoughtful question and listen to the full answer', category: 'words', effort: 'low' },
      { text: 'Give her a shoulder massage while she\'s reading or watching something', category: 'physical_touch', effort: 'low' },
      { text: 'Handle something on the to-do list she\'s been mentioning', category: 'logistics', effort: 'medium' },
      { text: 'Make herbal tea after dinner -- chamomile or lavender', category: 'food', effort: 'low' },
    ],
    avoid: [
      'Don\'t interpret her quieter mood as something being wrong',
      'Don\'t push for high-energy plans -- she\'s shifting gears naturally',
      'Don\'t overload her with decisions right now',
    ],
    hormones: { estrogen: 0.55, progesterone: 0.40, testosterone: 0.45, prostaglandins: 0.05, serotonin: 0.60 },
  },
  {
    day: 18,
    phase: 'luteal_early',
    phaseName: 'Early Luteal Phase',
    biology:
      'Progesterone continues to climb. It\'s now the dominant hormone for the first time this cycle. Progesterone\'s effect on the GI tract is real -- it relaxes smooth muscle throughout the body, including in the intestines, which can cause bloating and slower digestion. It also increases appetite, particularly for energy-dense foods. This isn\'t a lack of discipline -- progesterone literally changes how the body processes hunger signals. Her basal body temperature stays elevated.',
    feelings: [
      'Appetite increasing -- she wants more substantial meals',
      'Mild bloating starting (progesterone slows digestion)',
      'Feeling reflective and deep-thinking',
      'Still emotionally stable but quieter than last week',
      'May prefer smaller social gatherings over big groups',
    ],
    actions: [
      { text: 'Make a hearty, satisfying dinner -- pasta, stew, risotto. Her body is asking for fuel', category: 'food', effort: 'medium' },
      { text: 'Have a deep conversation -- "What\'s been on your mind lately?"', category: 'words', effort: 'low' },
      { text: 'Suggest a cozy date -- a bookstore visit, a quiet bar, a cooking project', category: 'date', effort: 'medium' },
      { text: 'Gentle physical affection -- play with her hair, hold her hand', category: 'physical_touch', effort: 'low' },
      { text: 'Take something off her plate -- do the grocery run, handle a bill, make a call', category: 'logistics', effort: 'medium' },
      { text: 'Bring home her favorite comfort snack -- she\'ll appreciate the thoughtfulness', category: 'gift', effort: 'low' },
    ],
    avoid: [
      'Don\'t comment on her eating more -- it\'s hormonal and it\'s normal',
      'Don\'t take her being quieter as disinterest',
      'Don\'t plan loud, crowded activities without checking first',
    ],
    hormones: { estrogen: 0.50, progesterone: 0.55, testosterone: 0.35, prostaglandins: 0.08, serotonin: 0.55 },
  },
  {
    day: 19,
    phase: 'luteal_early',
    phaseName: 'Early Luteal Phase',
    biology:
      'Today there\'s a brief second estrogen peak -- a smaller wave that occurs mid-luteal phase. The corpus luteum produces some estrogen alongside progesterone, creating a temporary boost. This can stabilize mood briefly before the bigger decline that comes in the late luteal phase. Think of it as the body giving one last "good mood" bump before PMS territory. Progesterone continues building toward its peak.',
    feelings: [
      'Mood might be slightly brighter today thanks to the estrogen mini-peak',
      'Still calm and reflective overall',
      'Good window for meaningful connection',
      'Body adjusting to progesterone -- bloating, warmer',
      'May feel creative in a more introspective way than during follicular',
    ],
    actions: [
      { text: 'Go for a walk together -- fresh air, conversation, no agenda', category: 'date', effort: 'low' },
      { text: 'Watch something together she\'s been wanting to see', category: 'date', effort: 'low' },
      { text: 'Make a warming meal -- soup, curry, something with spices', category: 'food', effort: 'medium' },
      { text: '"I love our quiet nights together" -- let her know you enjoy the calm too', category: 'words', effort: 'low' },
      { text: 'Bring her a small thoughtful gift -- a book she mentioned, her favorite candy', category: 'gift', effort: 'medium' },
      { text: 'Cuddle on the couch -- no phone, no distractions', category: 'physical_touch', effort: 'low' },
    ],
    avoid: [
      'Don\'t mistake calm for boring -- she\'s content, not understimulated',
      'Don\'t ignore her in favor of your phone or games',
    ],
    hormones: { estrogen: 0.52, progesterone: 0.65, testosterone: 0.30, prostaglandins: 0.08, serotonin: 0.55 },
  },
  {
    day: 20,
    phase: 'luteal_early',
    phaseName: 'Early Luteal Phase',
    biology:
      'Progesterone is approaching its peak. At high levels, progesterone affects the central nervous system through its metabolite allopregnanolone, which modulates GABA receptors. GABA is the brain\'s main "calming" neurotransmitter. This can make her feel calm and relaxed, but it can also make her feel sluggish, foggy, or like she\'s thinking through cotton. Water retention is increasing -- she might notice rings fitting tighter or ankles looking puffy.',
    feelings: [
      'Mild brain fog or sluggishness (progesterone\'s sedative effect)',
      'Noticeable bloating and water retention',
      'Appetite strong, especially for comfort foods',
      'Calm but heavy -- like being wrapped in a weighted blanket',
      'May start noticing the first hints of emotional sensitivity',
    ],
    actions: [
      { text: 'Make a comforting dinner she doesn\'t have to think about -- just serve it', category: 'food', effort: 'medium' },
      { text: 'Keep the evening low-key -- she\'s winding down naturally', category: 'date', effort: 'low' },
      { text: 'Offer a warm blanket or heating pad for bloating discomfort', category: 'physical_touch', effort: 'low' },
      { text: '"No pressure tonight, let\'s just relax" -- take decision-making off her plate', category: 'words', effort: 'low' },
      { text: 'Handle meal prep for tomorrow so she doesn\'t have to think about it', category: 'logistics', effort: 'medium' },
      { text: 'Get her loose, comfortable clothes if she\'s feeling bloated -- her favorite sweats', category: 'gift', effort: 'low' },
    ],
    avoid: [
      'Don\'t push for productivity -- her brain is running on progesterone\'s sedative mode',
      'Don\'t comment on bloating or water retention',
      'Don\'t make her make decisions she doesn\'t need to make',
    ],
    hormones: { estrogen: 0.55, progesterone: 0.75, testosterone: 0.28, prostaglandins: 0.10, serotonin: 0.50 },
  },
  {
    day: 21,
    phase: 'luteal_early',
    phaseName: 'Early Luteal Phase',
    biology:
      'This is the transition day between early and late luteal. Progesterone is at or near its absolute peak. The corpus luteum has been producing progesterone for about 5 days now. If the egg wasn\'t fertilized (which is the case in most cycles), the corpus luteum will start to degrade in the next few days. When it does, progesterone will crash -- and that crash is what triggers PMS. For today, she\'s still in the "calm before the storm," but the body is making its decision.',
    feelings: [
      'Appetite at its highest -- her body is burning 100-300 extra calories/day this phase',
      'Comfortable but starting to feel the weight of progesterone',
      'May feel a vague sense that something is shifting',
      'Desire for stability and routine',
      'Last day of emotional equilibrium before the decline',
    ],
    actions: [
      { text: 'Make her favorite meal -- she\'ll appreciate the comfort and the gesture', category: 'food', effort: 'medium' },
      { text: 'Stock up on chocolate, tea, and comfort snacks -- you\'ll need them this week', category: 'logistics', effort: 'medium' },
      { text: 'Plan a quiet, low-stress weekend -- the next 7 days are when she needs you most', category: 'logistics', effort: 'low' },
      { text: 'Gentle back rub before bed -- her body feels heavy', category: 'physical_touch', effort: 'low' },
      { text: '"Whatever you need this week, I\'m here" -- plant the seed now', category: 'words', effort: 'low' },
      { text: 'Do a deep clean of the kitchen or bathroom -- a clean space helps when stress rises', category: 'logistics', effort: 'high' },
    ],
    avoid: [
      'Don\'t plan anything high-stakes for the coming week if you can help it',
      'Don\'t judge her food intake -- 100-300 extra calories per day is real, not indulgent',
      'Don\'t start a serious argument -- save hard conversations for next week',
    ],
    hormones: { estrogen: 0.50, progesterone: 0.85, testosterone: 0.25, prostaglandins: 0.10, serotonin: 0.48 },
  },

  // ============================================================
  // LATE LUTEAL / PMS (Days 22-28)
  // ============================================================
  {
    day: 22,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'The corpus luteum is beginning to break down. Progesterone is still high but has started its decline. More importantly, estrogen is falling from its second peak, and this fall drags serotonin down with it. Serotonin is the neurotransmitter that regulates mood, sleep, and appetite. When it drops, everything gets harder -- mood destabilizes, sleep suffers, cravings intensify. This is the beginning of the PMS window. It\'s not psychological. It\'s a measurable biochemical event.',
    feelings: [
      'Emotional sensitivity increasing -- things that normally wouldn\'t bother her might sting',
      'Fatigue settling in, especially afternoon slumps',
      'Cravings for sugar and carbs (the body is asking for serotonin precursors)',
      'Bloating noticeable -- she may feel uncomfortable in fitted clothes',
      'May feel frustrated with herself for feeling this way',
    ],
    actions: [
      { text: 'Make a comforting, carb-rich dinner -- pasta, mac and cheese, rice dishes. Her body needs the fuel', category: 'food', effort: 'medium' },
      { text: 'Be extra patient today. If she snaps, don\'t snap back -- the hormonal crash is real', category: 'words', effort: 'low' },
      { text: '"That sounds really frustrating" -- validate her feelings, don\'t try to fix them', category: 'words', effort: 'low' },
      { text: 'Run her a warm bath with epsom salts -- helps with bloating and muscle tension', category: 'logistics', effort: 'medium' },
      { text: 'Gentle cuddling -- physical closeness without demands', category: 'physical_touch', effort: 'low' },
      { text: 'Bring home chocolate and don\'t comment on it -- just leave it on the counter', category: 'gift', effort: 'low' },
    ],
    avoid: [
      'NEVER say "Are you PMSing?" -- even if you\'re right, it invalidates her feelings',
      'Don\'t try to logic her out of emotions -- "Well actually..." is not helpful right now',
      'Don\'t comment on what she\'s eating or how much',
      'Don\'t take emotional distance personally',
    ],
    hormones: { estrogen: 0.45, progesterone: 1.0, testosterone: 0.22, prostaglandins: 0.12, serotonin: 0.42 },
  },
  {
    day: 23,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'Serotonin is declining more noticeably now as estrogen continues to fall. The connection between estrogen and serotonin is direct -- estrogen helps produce serotonin and prevents its breakdown. When estrogen drops, serotonin drops. Low serotonin is clinically associated with depression, anxiety, and irritability. This is the same mechanism that SSRIs (antidepressants) target. For women with severe PMS or PMDD, this serotonin crash can feel like a temporary depression. It\'s biochemistry, not a character flaw.',
    feelings: [
      'Mood dipping -- irritability or sadness may appear',
      'Anxiety levels may increase (GABA modulation is disrupted)',
      'Less patience for small annoyances',
      'Sleep quality declining (progesterone raises body temp, making it harder to sleep)',
      'May feel overwhelmed by things she\'d normally handle easily',
    ],
    actions: [
      { text: 'Validate feelings without trying to fix them. "I hear you" > "Have you tried..."', category: 'words', effort: 'low' },
      { text: 'Keep dinner simple and comforting -- order in if cooking feels like too much', category: 'food', effort: 'low' },
      { text: 'Take household tasks off her plate without being asked', category: 'logistics', effort: 'medium' },
      { text: 'Create a calm environment -- dim lights, no loud TV, quiet evening', category: 'logistics', effort: 'low' },
      { text: 'Offer a hug and hold it for longer than usual', category: 'physical_touch', effort: 'low' },
      { text: 'Bring her favorite comfort drink -- hot chocolate, tea, her specific coffee order', category: 'food', effort: 'low' },
    ],
    avoid: [
      'Don\'t tell her to "calm down" or "relax" -- it does the opposite',
      'Don\'t start arguments about unresolved issues -- wait until next week',
      'Don\'t take her irritability as a personal attack',
      'Don\'t dismiss her feelings as "just hormones" even though hormones are the cause',
    ],
    hormones: { estrogen: 0.38, progesterone: 0.80, testosterone: 0.20, prostaglandins: 0.15, serotonin: 0.35 },
  },
  {
    day: 24,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'The corpus luteum is actively degrading now. Progesterone is falling and it\'s taking estrogen down with it. The dual crash of both hormones is what makes this window the hardest. Progesterone\'s metabolite (allopregnanolone) was modulating GABA receptors -- keeping her calm. As it withdraws, the GABA system destabilizes, which can cause anxiety, restlessness, and feeling on-edge. Think of it like withdrawal from a natural sedative. Her body is also retaining peak water -- bloating is at its worst.',
    feelings: [
      'Anxiety may spike -- she might feel worried about things that normally don\'t faze her',
      'Bloating at its worst (2-5 pounds of water weight is normal)',
      'Sleep disrupted -- waking in the night, trouble falling asleep',
      'Feeling overwhelmed by to-do lists or responsibilities',
      'May feel disconnected from her body or frustrated with it',
    ],
    actions: [
      { text: 'Reduce friction everywhere you can -- clean up, handle logistics, simplify the evening', category: 'logistics', effort: 'medium' },
      { text: '"You don\'t have to do anything tonight" -- give her permission to rest', category: 'words', effort: 'low' },
      { text: 'Make a warm, simple dinner -- nothing she has to think about or decide', category: 'food', effort: 'medium' },
      { text: 'Offer magnesium-rich snacks -- dark chocolate, almonds, bananas (magnesium helps with anxiety and cramps)', category: 'food', effort: 'low' },
      { text: 'Warm blanket, heating pad, comfortable clothes -- set up her comfort zone', category: 'physical_touch', effort: 'low' },
      { text: 'Gentle foot massage before bed -- helps with sleep', category: 'physical_touch', effort: 'medium' },
    ],
    avoid: [
      'Don\'t create new problems or bring up things that need discussion',
      'Don\'t expect her to be productive or efficient',
      'Don\'t take her withdrawal personally -- she\'s managing internal storms',
      'Don\'t comment on bloating or body changes',
    ],
    hormones: { estrogen: 0.30, progesterone: 0.65, testosterone: 0.18, prostaglandins: 0.20, serotonin: 0.28 },
  },
  {
    day: 25,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'PMS is intensifying. Progesterone continues to crash as the corpus luteum degrades further. Prostaglandins are beginning to build in the uterine lining -- they\'ll be needed in a few days for menstruation, but their early activity can cause pre-period cramping, back aches, and digestive changes now. Estrogen is low enough that serotonin production is significantly impaired. The brain is literally operating with less of its mood-stabilizing neurotransmitter.',
    feelings: [
      'PMS symptoms intensifying -- mood swings, irritability, sadness',
      'Pre-period cramping may start (prostaglandins building)',
      'Strong cravings for sugar, carbs, and comfort food',
      'Breast tenderness (progesterone effect on breast tissue)',
      'May cry more easily or feel emotions more intensely',
    ],
    actions: [
      { text: 'Stock up on her go-to period supplies -- pads, tampons, painkillers, heating pads, chocolate', category: 'logistics', effort: 'medium' },
      { text: 'Be patient with mood swings. They\'ll pass in a few days. Your steadiness is an anchor', category: 'words', effort: 'low' },
      { text: 'Make her absolute favorite comfort food -- whatever dish makes her feel at home', category: 'food', effort: 'high' },
      { text: 'Offer to cancel plans if she\'s not up for it -- "We don\'t have to go"', category: 'words', effort: 'low' },
      { text: 'Physical comfort without pressure -- a long hug, stroking her hair, sitting close', category: 'physical_touch', effort: 'low' },
      { text: 'Buy her favorite treat on your way home -- ice cream, pastry, whatever she loves', category: 'gift', effort: 'low' },
    ],
    avoid: [
      'Don\'t suggest she\'s overreacting -- her brain chemistry is genuinely different right now',
      'Don\'t bring up contentious topics',
      'Don\'t withdraw your affection because she\'s moody',
      'Don\'t make her feel guilty for canceling plans',
    ],
    hormones: { estrogen: 0.22, progesterone: 0.50, testosterone: 0.18, prostaglandins: 0.30, serotonin: 0.22 },
  },
  {
    day: 26,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'Both hormones are in free fall. Progesterone is crashing, estrogen is near its floor. The body is preparing for menstruation -- the uterine lining is becoming unstable without progesterone to maintain it, and prostaglandin production is ramping up. Serotonin is at its cycle low. This hormonal environment is similar to what happens during perimenopause or postpartum -- a rapid withdrawal of hormones that the brain has adapted to. It\'s temporary, but it\'s real and it\'s difficult.',
    feelings: [
      'Emotional, tired, and bloated all at once',
      'May feel like nothing fits right -- clothes, mood, skin',
      'Easily overwhelmed by normal responsibilities',
      'Physical discomfort: breast tenderness, headaches, back pain',
      'May feel guilty about being "difficult" even though she can\'t help it',
    ],
    actions: [
      { text: 'Offer a heating pad for her lower back or abdomen -- pre-period cramping is starting', category: 'physical_touch', effort: 'low' },
      { text: 'Give her a long back rub without being asked', category: 'physical_touch', effort: 'medium' },
      { text: 'Order her favorite delivery food -- zero effort required from her', category: 'food', effort: 'low' },
      { text: '"You\'re not difficult, your body is going through something real" -- if she apologizes for being moody', category: 'words', effort: 'low' },
      { text: 'Make the bedroom extra comfortable -- clean sheets, right temperature, dim lights', category: 'logistics', effort: 'medium' },
      { text: 'Bring home a small care package: her favorite snacks, a face mask, a candle', category: 'gift', effort: 'high' },
    ],
    avoid: [
      'Don\'t say "It\'ll be over soon" -- she knows, and it doesn\'t help right now',
      'Don\'t expect gratitude for being supportive -- just be steady',
      'Don\'t make her feel like a burden',
    ],
    hormones: { estrogen: 0.15, progesterone: 0.35, testosterone: 0.15, prostaglandins: 0.45, serotonin: 0.18 },
  },
  {
    day: 27,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'Almost at the hormonal floor. Progesterone and estrogen are both approaching their cycle lows. The uterine lining is now unstable and beginning to break down. Prostaglandins are building rapidly in preparation for menstruation. She may experience pre-period spotting as the lining starts to shed. Sleep is at its worst -- progesterone (even while declining) still elevates body temperature, and the lack of estrogen means serotonin (which helps regulate sleep) is depleted.',
    feelings: [
      'Sleep disrupted -- restless nights, waking early',
      'On edge -- emotional threshold is very low',
      'Physical discomfort building: cramps, bloating, headaches',
      'May feel like she\'s just waiting for her period to start so she can feel better',
      'Possible pre-period spotting',
    ],
    actions: [
      { text: 'Keep the evening extremely low-key -- no demands, no decisions, no debates', category: 'logistics', effort: 'low' },
      { text: 'Make sure there\'s chamomile or sleepytime tea available -- help with sleep', category: 'food', effort: 'low' },
      { text: 'Offer to handle everything tomorrow morning -- she\'s not sleeping well', category: 'logistics', effort: 'medium' },
      { text: 'A long, quiet hug when she gets home -- no words needed', category: 'physical_touch', effort: 'low' },
      { text: '"You\'re almost through it" -- only if she brings up feeling rough first, don\'t volunteer it', category: 'words', effort: 'low' },
      { text: 'Make sure the bathroom is stocked -- her period could start tomorrow', category: 'logistics', effort: 'low' },
    ],
    avoid: [
      'Don\'t play loud music or create a stimulating environment',
      'Don\'t expect her to be fun or social tonight',
      'Don\'t point out that her period is coming -- she\'s well aware',
    ],
    hormones: { estrogen: 0.12, progesterone: 0.20, testosterone: 0.15, prostaglandins: 0.60, serotonin: 0.15 },
  },
  {
    day: 28,
    phase: 'luteal_late',
    phaseName: 'Late Luteal Phase',
    biology:
      'The final day before the cycle resets. Both progesterone and estrogen are at or near their absolute lows. The corpus luteum has fully degraded. The uterine lining is at its most unstable -- menstruation will likely start tomorrow or within 48 hours. Prostaglandins are primed and ready. On the brain side, serotonin is at its cycle floor, but there\'s often a subtle psychological relief building: the PMS is about to end. Many women describe this as "ready for the reset."',
    feelings: [
      'Ready for the cycle to reset -- "just let it start already"',
      'Physical symptoms at their pre-period peak: cramps, bloating, headaches',
      'Emotionally drained but may feel a hint of acceptance',
      'Low energy, patience running thin',
      'Possible spotting or very early start of period',
    ],
    actions: [
      { text: 'Prep the comfort station: heating pad charged, painkillers accessible, chocolate in the fridge', category: 'logistics', effort: 'medium' },
      { text: 'Cook something warm and nourishing -- her body needs fuel for what\'s coming', category: 'food', effort: 'medium' },
      { text: 'Be her calm in the storm -- steady, present, unflappable', category: 'words', effort: 'low' },
      { text: 'Physical warmth: blankets, warm drinks, body heat. The comfort is healing.', category: 'physical_touch', effort: 'low' },
      { text: 'Take care of everything she\'d normally handle tomorrow morning -- she\'ll wake up to day 1', category: 'logistics', effort: 'high' },
      { text: 'A simple "I love you" with no strings attached', category: 'words', effort: 'low' },
    ],
    avoid: [
      'Don\'t push for anything -- plans, conversations, decisions',
      'Don\'t get frustrated with her short patience -- it\'s the last day of the hardest stretch',
      'Don\'t forget: tomorrow is day 1, and she\'ll need you to show up again',
    ],
    hormones: { estrogen: 0.10, progesterone: 0.10, testosterone: 0.15, prostaglandins: 0.75, serotonin: 0.12 },
  },
];
