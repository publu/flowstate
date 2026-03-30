import { Phase, PhaseEncyclopedia, PhaseIndicator, EncyclopediaAction, AvoidItem, ActionCategory } from '../types';

const menstruationIndicators: PhaseIndicator[] = [
  { key: 'cuddle_factor', label: 'Cuddle Factor', emoji: '\u{1F43B}', value: 0.90, flavor: 'Maximum koala mode. She wants to be wrapped up.' },
  { key: 'romance_level', label: 'Romance Level', emoji: '\u{1F339}', value: 0.25, flavor: 'Sweet gestures over grand gestures right now.' },
  { key: 'adventure_readiness', label: 'Adventure Readiness', emoji: '\u{1F3D4}', value: 0.10, flavor: 'The couch IS the adventure.' },
  { key: 'patience_meter', label: 'Patience Meter', emoji: '\u{1F9CA}', value: 0.30, flavor: 'Low bandwidth. Choose your words carefully.' },
  { key: 'spicy_meter', label: 'Spicy Meter', emoji: '\u{1F336}', value: 0.15, flavor: 'Not the time, cowboy.' },
  { key: 'nesting_energy', label: 'Nesting Energy', emoji: '\u{1F6CB}', value: 0.95, flavor: 'Blanket fort architect mode engaged.' },
  { key: 'social_battery', label: 'Social Battery', emoji: '\u{1F50B}', value: 0.20, flavor: 'Party of two. Max.' },
];

const follicularIndicators: PhaseIndicator[] = [
  { key: 'cuddle_factor', label: 'Cuddle Factor', emoji: '\u{1F43B}', value: 0.50, flavor: 'Affectionate but also wants to do stuff.' },
  { key: 'romance_level', label: 'Romance Level', emoji: '\u{1F339}', value: 0.70, flavor: 'Plan something. She will say yes.' },
  { key: 'adventure_readiness', label: 'Adventure Readiness', emoji: '\u{1F3D4}', value: 0.85, flavor: 'She is DOWN. Try something new together.' },
  { key: 'patience_meter', label: 'Patience Meter', emoji: '\u{1F9CA}', value: 0.80, flavor: 'Chill vibes. Hard to annoy her right now.' },
  { key: 'spicy_meter', label: 'Spicy Meter', emoji: '\u{1F336}', value: 0.55, flavor: 'Interest is building. Be playful.' },
  { key: 'nesting_energy', label: 'Nesting Energy', emoji: '\u{1F6CB}', value: 0.25, flavor: 'She wants OUT. Plans, movement, newness.' },
  { key: 'social_battery', label: 'Social Battery', emoji: '\u{1F50B}', value: 0.80, flavor: 'Fully charged. Invite friends.' },
];

const ovulationIndicators: PhaseIndicator[] = [
  { key: 'cuddle_factor', label: 'Cuddle Factor', emoji: '\u{1F43B}', value: 0.65, flavor: 'Affectionate and confident. Peak chemistry.' },
  { key: 'romance_level', label: 'Romance Level', emoji: '\u{1F339}', value: 1.0, flavor: 'PEAK ROMANCE WINDOW. Do not waste this.' },
  { key: 'adventure_readiness', label: 'Adventure Readiness', emoji: '\u{1F3D4}', value: 0.95, flavor: 'She will literally try anything right now.' },
  { key: 'patience_meter', label: 'Patience Meter', emoji: '\u{1F9CA}', value: 0.85, flavor: 'Almost nothing will bother her.' },
  { key: 'spicy_meter', label: 'Spicy Meter', emoji: '\u{1F336}', value: 1.0, flavor: 'This is it. The window. You know what to do.' },
  { key: 'nesting_energy', label: 'Nesting Energy', emoji: '\u{1F6CB}', value: 0.15, flavor: 'Staying home would be a waste right now.' },
  { key: 'social_battery', label: 'Social Battery', emoji: '\u{1F50B}', value: 1.0, flavor: 'She could talk to a stranger for 3 hours and enjoy it.' },
];

const lutealEarlyIndicators: PhaseIndicator[] = [
  { key: 'cuddle_factor', label: 'Cuddle Factor', emoji: '\u{1F43B}', value: 0.75, flavor: 'Wants closeness but on her terms.' },
  { key: 'romance_level', label: 'Romance Level', emoji: '\u{1F339}', value: 0.55, flavor: 'Thoughtful > flashy right now.' },
  { key: 'adventure_readiness', label: 'Adventure Readiness', emoji: '\u{1F3D4}', value: 0.40, flavor: 'Maybe a chill outing. Nothing wild.' },
  { key: 'patience_meter', label: 'Patience Meter', emoji: '\u{1F9CA}', value: 0.50, flavor: 'Starting to thin. Be aware.' },
  { key: 'spicy_meter', label: 'Spicy Meter', emoji: '\u{1F336}', value: 0.40, flavor: 'Mood dependent. Read the room.' },
  { key: 'nesting_energy', label: 'Nesting Energy', emoji: '\u{1F6CB}', value: 0.65, flavor: 'Comfort is becoming priority again.' },
  { key: 'social_battery', label: 'Social Battery', emoji: '\u{1F50B}', value: 0.45, flavor: 'Smaller groups. Close friends only.' },
];

const lutealLateIndicators: PhaseIndicator[] = [
  { key: 'cuddle_factor', label: 'Cuddle Factor', emoji: '\u{1F43B}', value: 0.85, flavor: 'PEAK CUDDLE TIME. Hold her and do not let go.' },
  { key: 'romance_level', label: 'Romance Level', emoji: '\u{1F339}', value: 0.20, flavor: 'She does not want surprises. She wants comfort.' },
  { key: 'adventure_readiness', label: 'Adventure Readiness', emoji: '\u{1F3D4}', value: 0.05, flavor: 'Leave the house? In this economy?' },
  { key: 'patience_meter', label: 'Patience Meter', emoji: '\u{1F9CA}', value: 0.15, flavor: 'Walking on eggshells territory. Be gentle.' },
  { key: 'spicy_meter', label: 'Spicy Meter', emoji: '\u{1F336}', value: 0.10, flavor: 'Hard no. Focus on emotional closeness.' },
  { key: 'nesting_energy', label: 'Nesting Energy', emoji: '\u{1F6CB}', value: 0.95, flavor: 'She is building an emotional blanket fort.' },
  { key: 'social_battery', label: 'Social Battery', emoji: '\u{1F50B}', value: 0.10, flavor: 'If your friends are coming over, warn her first.' },
];

// ============================================================
// MENSTRUATION ACTIONS
// ============================================================
const menstruationFood: EncyclopediaAction[] = [
  { id: 'm_f1', text: 'Make her a hot chocolate with extra marshmallows', detail: 'Warm drinks soothe cramps by relaxing smooth muscle. Plus it just feels like being cared for.', category: 'food', effort: 'low' },
  { id: 'm_f2', text: 'Cook something iron-rich: steak, spinach salad, lentil soup', detail: 'She is literally losing iron through blood loss right now. Her body needs to replenish.', category: 'food', effort: 'medium', proTip: 'Pair iron with vitamin C (squeeze lemon on the spinach) for better absorption.' },
  { id: 'm_f3', text: 'Order her favorite delivery food without asking', detail: 'Decision fatigue is real when you feel like garbage. Just order it and tell her it is coming.', category: 'food', effort: 'low' },
  { id: 'm_f4', text: 'Bring home dark chocolate (70%+ cacao)', detail: 'Magnesium in dark chocolate directly helps with cramps and triggers endorphin release.', category: 'food', effort: 'low', proTip: 'If she has a specific brand she likes, learn it. That level of detail hits different.' },
  { id: 'm_f5', text: 'Make ginger tea or buy ginger shots', detail: 'Ginger is a natural anti-inflammatory. Studies show it is as effective as ibuprofen for menstrual cramps.', category: 'food', effort: 'low' },
  { id: 'm_f6', text: 'Prep comfort food: mac and cheese, soup, grilled cheese', detail: 'Warm, soft foods are easier on a sensitive digestive system. Prostaglandins mess with her gut too.', category: 'food', effort: 'medium' },
  { id: 'm_f7', text: 'Have her favorite snacks stocked before she asks', detail: 'This one is about anticipation. If you already bought them, she knows you were thinking about her.', category: 'food', effort: 'low' },
  { id: 'm_f8', text: 'Make banana smoothie with peanut butter and oats', detail: 'Bananas have potassium (reduces bloating), PB has magnesium (cramps), oats stabilize blood sugar.', category: 'food', effort: 'medium' },
  { id: 'm_f9', text: 'Avoid cooking strong-smelling food', detail: 'Heightened sense of smell during menstruation is real. Strong odors can trigger nausea.', category: 'food', effort: 'low' },
  { id: 'm_f10', text: 'Bring her water or herbal tea without being asked', detail: 'Dehydration worsens cramps and headaches. She might not think to drink enough.', category: 'food', effort: 'low' },
  { id: 'm_f11', text: 'Make overnight oats so breakfast is ready tomorrow', detail: 'Mornings during her period are rough. Having food ready means one less thing to deal with.', category: 'food', effort: 'medium' },
  { id: 'm_f12', text: 'Get her a turmeric latte (golden milk)', detail: 'Turmeric is anti-inflammatory. Warm milk is comforting. It is science wrapped in a hug.', category: 'food', effort: 'low' },
];

const menstruationDate: EncyclopediaAction[] = [
  { id: 'm_d1', text: 'Movie marathon on the couch, her pick', detail: 'Let her choose everything. The movie, the blanket, the snack. Your job is to be the warm body next to her.', category: 'date', effort: 'low' },
  { id: 'm_d2', text: 'Set up a bath with candles and music', detail: 'Warm water relaxes uterine muscles and eases cramps. Make the bathroom feel like a spa.', category: 'date', effort: 'medium', proTip: 'Epsom salts have magnesium which absorbs through skin and helps cramps.' },
  { id: 'm_d3', text: 'Build an actual blanket fort and watch something together', detail: 'Sounds childish. Feels magical. The enclosed cozy space triggers comfort at a primal level.', category: 'date', effort: 'medium' },
  { id: 'm_d4', text: 'Do a puzzle or board game together at home', detail: 'Low energy activity that still feels like quality time. No screens, just presence.', category: 'date', effort: 'low' },
  { id: 'm_d5', text: 'Read together in the same room, legs tangled', detail: 'Not everything needs to be a conversation. Sometimes parallel existence is the most intimate thing.', category: 'date', effort: 'low' },
  { id: 'm_d6', text: 'Cook dinner together, something simple and warm', detail: 'The act of cooking together is the date. Keep it low effort, high comfort.', category: 'date', effort: 'medium' },
  { id: 'm_d7', text: 'Put on her favorite playlist and just hang', detail: 'Music changes the energy of a room. Let her soundtrack set the tone.', category: 'date', effort: 'low' },
  { id: 'm_d8', text: 'Short sunset drive with no destination', detail: 'Sometimes she wants to leave the house without actually doing anything. A drive is perfect.', category: 'date', effort: 'low' },
];

const menstruationTouch: EncyclopediaAction[] = [
  { id: 'm_t1', text: 'Give her a long lower back rub without being asked', detail: 'The lower back takes a beating during menstruation from uterine contractions radiating through the pelvis.', category: 'physical_touch', effort: 'medium' },
  { id: 'm_t2', text: 'Offer a heating pad for her abdomen or lower back', detail: 'Heat relaxes the smooth muscle of the uterus, directly reducing cramping.', category: 'physical_touch', effort: 'low' },
  { id: 'm_t3', text: 'Play with her hair while watching something', detail: 'Scalp stimulation triggers oxytocin release. It is one of the most comforting forms of touch.', category: 'physical_touch', effort: 'low' },
  { id: 'm_t4', text: 'Hold her hand or put your arm around her', detail: 'Physical contact without expectation. Just warmth and presence.', category: 'physical_touch', effort: 'low' },
  { id: 'm_t5', text: 'Foot rub while watching TV', detail: 'Reflexology points in the feet connect to the uterus and lower back. Or forget the science, it just feels nice.', category: 'physical_touch', effort: 'low' },
  { id: 'm_t6', text: 'Spoon her without escalating', detail: 'She wants to feel held and warm. That is it. That is the whole thing.', category: 'physical_touch', effort: 'low', proTip: 'Be the big spoon. Wrap your arm around her stomach with gentle pressure, it helps cramps.' },
  { id: 'm_t7', text: 'Warm your hands before touching her', detail: 'Cold hands on someone in pain is jarring. Run them under warm water first.', category: 'physical_touch', effort: 'low' },
  { id: 'm_t8', text: 'Massage her temples if she has a headache', detail: 'Estrogen withdrawal triggers migraines. Gentle temple pressure helps blood flow.', category: 'physical_touch', effort: 'low' },
];

const menstruationWords: EncyclopediaAction[] = [
  { id: 'm_w1', text: '"What do you need today?" and actually mean it', detail: 'Not "what is wrong" or "are you ok." Just a direct, judgment-free offer to help.', category: 'words', effort: 'low' },
  { id: 'm_w2', text: '"You are not being difficult, your body is going through something real"', detail: 'If she apologizes for being moody. This one sentence reframes everything.', category: 'words', effort: 'low' },
  { id: 'm_w3', text: '"I already handled [chore]. You do not need to worry about it"', detail: 'Do not ask what needs doing. Just do it and tell her it is done.', category: 'words', effort: 'low' },
  { id: 'm_w4', text: '"Do you want me to cancel plans tonight?"', detail: 'Give her permission to rest without guilt. She might be dreading an obligation.', category: 'words', effort: 'low' },
  { id: 'm_w5', text: '"I like taking care of you"', detail: 'She might feel like a burden. Tell her the opposite directly.', category: 'words', effort: 'low' },
  { id: 'm_w6', text: 'Text her during the day: "How are you feeling?"', detail: 'A small check-in shows she is on your mind even when you are not together.', category: 'words', effort: 'low' },
  { id: 'm_w7', text: '"You do not have to perform being fine right now"', detail: 'Women are socialized to push through pain. Giving her explicit permission to not be ok is powerful.', category: 'words', effort: 'low' },
  { id: 'm_w8', text: 'Do NOT try to fix her mood. Just validate it.', detail: '"That sounds really uncomfortable" > "Have you tried yoga?" She does not want solutions, she wants to feel heard.', category: 'words', effort: 'low' },
];

const menstruationLogistics: EncyclopediaAction[] = [
  { id: 'm_l1', text: 'Handle the dishes, laundry, or trash without being asked', detail: 'Do not announce it. Do not want credit. Just do it. She will notice.', category: 'logistics', effort: 'medium' },
  { id: 'm_l2', text: 'Make the bedroom extra comfortable: clean sheets, right temp, dim lights', detail: 'She is spending more time in bed. Make it a sanctuary, not a wrinkled mess.', category: 'logistics', effort: 'medium' },
  { id: 'm_l3', text: 'Have ibuprofen and a glass of water on her nightstand', detail: 'Ibuprofen is an anti-prostaglandin. It targets the actual chemical cause of cramps.', category: 'logistics', effort: 'low', proTip: 'She should take it BEFORE cramps peak, not after. Timing matters.' },
  { id: 'm_l4', text: 'Make sure pads/tampons are stocked', detail: 'Running out during a period is a crisis. Check the supply before she has to.', category: 'logistics', effort: 'low' },
  { id: 'm_l5', text: 'Keep the house warm or have blankets accessible', detail: 'Body temperature regulation is off during menstruation. She might feel colder than usual.', category: 'logistics', effort: 'low' },
  { id: 'm_l6', text: 'Walk the dog, take out trash, handle the errands', detail: 'Every small thing she does not have to do is energy saved for recovery.', category: 'logistics', effort: 'medium' },
  { id: 'm_l7', text: 'Charge her phone and have it near her', detail: 'Small thing. But if she is stuck in bed and her phone dies, it is isolating.', category: 'logistics', effort: 'low' },
  { id: 'm_l8', text: 'Cancel or reschedule any non-essential plans for her', detail: 'If she is dreading something, offer to handle the cancellation text so she does not have to explain.', category: 'logistics', effort: 'low' },
];

const menstruationGift: EncyclopediaAction[] = [
  { id: 'm_g1', text: 'Care package: her favorite snacks, face mask, candle', detail: 'A small bag of things that say "I know what you like and I thought about you." Costs $15, hits like $150.', category: 'gift', effort: 'medium' },
  { id: 'm_g2', text: 'Bring home flowers, nothing fancy, just because', detail: 'It is not about the flowers. It is about the fact that you stopped on the way home and thought of her.', category: 'gift', effort: 'low' },
  { id: 'm_g3', text: 'Cozy socks or a soft blanket', detail: 'She is cold, crampy, and tired. Warm soft things are the right answer.', category: 'gift', effort: 'medium' },
  { id: 'm_g4', text: 'A hot water bottle if she does not have one', detail: 'These are better than heating pads. They mold to her body and stay warm for hours.', category: 'gift', effort: 'medium', proTip: 'The ones with a soft cover are elite.' },
  { id: 'm_g5', text: 'Her favorite magazine or a book she mentioned wanting', detail: 'Low-energy entertainment that shows you were listening.', category: 'gift', effort: 'medium' },
  { id: 'm_g6', text: 'Bath bomb or bath salts', detail: 'Epsom salts with lavender. Magnesium for cramps, lavender for relaxation.', category: 'gift', effort: 'low' },
  { id: 'm_g7', text: 'A handwritten note that says something genuine', detail: 'Even three sentences. "I see how tough this is. I am here. You are not a burden." That hits.', category: 'gift', effort: 'low' },
];

// ============================================================
// FOLLICULAR ACTIONS
// ============================================================
const follicularFood: EncyclopediaAction[] = [
  { id: 'fo_f1', text: 'Try a new restaurant together', detail: 'Her brain is primed for novelty right now. Estrogen is rising and so is her openness to new experiences.', category: 'food', effort: 'medium' },
  { id: 'fo_f2', text: 'Cook something adventurous you have never tried', detail: 'Thai curry, homemade sushi, Korean BBQ at home. Her patience for experiments is at its peak.', category: 'food', effort: 'high' },
  { id: 'fo_f3', text: 'Fresh fruits and lighter meals', detail: 'Her body is done recovering. She craves freshness and energy, not heavy comfort food.', category: 'food', effort: 'low' },
  { id: 'fo_f4', text: 'Make smoothie bowls together', detail: 'Colorful, healthy, fun to assemble together. Matches the light, creative energy of this phase.', category: 'food', effort: 'medium' },
  { id: 'fo_f5', text: 'Plan a brunch date', detail: 'She has energy for morning plans now. Take advantage before the cycle shifts.', category: 'food', effort: 'medium' },
  { id: 'fo_f6', text: 'Farmers market run together', detail: 'Walking, picking fresh produce, trying samples. It is a date disguised as errands.', category: 'food', effort: 'medium' },
  { id: 'fo_f7', text: 'Protein-rich meals to fuel her energy', detail: 'Estrogen is rebuilding the uterine lining. Her body needs building blocks.', category: 'food', effort: 'medium' },
  { id: 'fo_f8', text: 'Coffee or matcha date at a new spot', detail: 'She is social, curious, and energetic. A new coffee shop is a low-effort win.', category: 'food', effort: 'low' },
];

const follicularDate: EncyclopediaAction[] = [
  { id: 'fo_d1', text: 'Plan an actual date night out', detail: 'This is the phase where she WANTS to get dressed up and go somewhere. Do not waste it on the couch.', category: 'date', effort: 'high' },
  { id: 'fo_d2', text: 'Try a new activity: rock climbing, pottery, cooking class', detail: 'Her brain is literally wired for novelty right now. New experiences bond you together.', category: 'date', effort: 'high' },
  { id: 'fo_d3', text: 'Go on a hike or outdoor adventure', detail: 'Energy is high, mood is high. This is peak "let us do something" energy.', category: 'date', effort: 'medium' },
  { id: 'fo_d4', text: 'Visit a museum, gallery, or bookstore together', detail: 'Her creativity is peaking. She will actually enjoy browsing and discovering.', category: 'date', effort: 'medium' },
  { id: 'fo_d5', text: 'Double date with friends', detail: 'Social battery is charged. She actually wants to see people.', category: 'date', effort: 'medium' },
  { id: 'fo_d6', text: 'Dance class or live music', detail: 'Movement feels good. Music feels good. Combining them with you is peak follicular energy.', category: 'date', effort: 'high' },
  { id: 'fo_d7', text: 'Weekend trip or day trip somewhere new', detail: 'This is the window for travel. She has energy, patience, and curiosity.', category: 'date', effort: 'high' },
  { id: 'fo_d8', text: 'Workout together: gym, run, yoga', detail: 'Her body feels strong right now. Training together builds a different kind of intimacy.', category: 'date', effort: 'medium' },
  { id: 'fo_d9', text: 'Game night with friends', detail: 'Competitive, social, fun. She is in the mood for all of it.', category: 'date', effort: 'low' },
];

const follicularTouch: EncyclopediaAction[] = [
  { id: 'fo_t1', text: 'Be more playful with touch: tickle, wrestle, dance together', detail: 'Energy is up. She does not want gentle caregiving touch, she wants fun physical interaction.', category: 'physical_touch', effort: 'low' },
  { id: 'fo_t2', text: 'Hold hands in public', detail: 'She feels confident and wants to show affection. Meet her there.', category: 'physical_touch', effort: 'low' },
  { id: 'fo_t3', text: 'Surprise kiss or hug from behind', detail: 'Her guard is down, she is feeling good. Spontaneous affection lands perfectly right now.', category: 'physical_touch', effort: 'low' },
  { id: 'fo_t4', text: 'Give her a full body massage with nice oil', detail: 'Not because she is in pain. Because it feels good and builds anticipation.', category: 'physical_touch', effort: 'high' },
  { id: 'fo_t5', text: 'Link arms when walking together', detail: 'Old school. Underrated. She will love it during this confident phase.', category: 'physical_touch', effort: 'low' },
  { id: 'fo_t6', text: 'Pull her in for a slow dance in the kitchen', detail: 'No music needed. Just grab her hand, pull her close, sway. Trust me.', category: 'physical_touch', effort: 'low' },
];

const follicularWords: EncyclopediaAction[] = [
  { id: 'fo_w1', text: '"You look incredible today"', detail: 'She probably put effort in because she feels good. Notice it and say it.', category: 'words', effort: 'low' },
  { id: 'fo_w2', text: '"I love how excited you get about [thing]"', detail: 'Her enthusiasm is peaking. Celebrating it instead of just observing it makes her feel seen.', category: 'words', effort: 'low' },
  { id: 'fo_w3', text: '"Let us do something this weekend, you pick"', detail: 'Give her the creative control. She has ideas right now and wants to use them.', category: 'words', effort: 'low' },
  { id: 'fo_w4', text: '"I was thinking about you today"', detail: 'Simple. Devastating. She wants to know she is on your mind when you are apart.', category: 'words', effort: 'low' },
  { id: 'fo_w5', text: 'Compliment her mind, not just her appearance', detail: '"That was a really smart take" or "I love how you think about things." She is sharp right now.', category: 'words', effort: 'low' },
  { id: 'fo_w6', text: 'Bring up future plans together', detail: 'Trips, goals, dreams. Her optimism is high and she wants to build with you.', category: 'words', effort: 'low' },
];

const follicularLogistics: EncyclopediaAction[] = [
  { id: 'fo_l1', text: 'Plan ahead for the week together', detail: 'Her organizational energy is high. Use it to align on the week.', category: 'logistics', effort: 'low' },
  { id: 'fo_l2', text: 'Book that reservation or buy those tickets', detail: 'She will actually follow through right now. Lock in plans while the energy is there.', category: 'logistics', effort: 'medium' },
  { id: 'fo_l3', text: 'Tackle a house project together', detail: 'Reorganize a room, build that shelf, hang the art. She has energy for it.', category: 'logistics', effort: 'high' },
  { id: 'fo_l4', text: 'Grocery shop together and meal prep', detail: 'She wants to feel productive. Channel it into something useful you both benefit from.', category: 'logistics', effort: 'medium' },
];

const follicularGift: EncyclopediaAction[] = [
  { id: 'fo_g1', text: 'Get her something she mentioned wanting weeks ago', detail: 'The fact that you remembered is the real gift. The object is just proof.', category: 'gift', effort: 'medium' },
  { id: 'fo_g2', text: 'Flowers that are bright and fun, not funeral-formal', detail: 'Sunflowers, wildflowers, ranunculus. Match the energy of the phase: vibrant.', category: 'gift', effort: 'low' },
  { id: 'fo_g3', text: 'A new workout accessory or water bottle', detail: 'She feels strong and active. Gear that supports that shows you pay attention.', category: 'gift', effort: 'medium' },
  { id: 'fo_g4', text: 'Concert tickets or experience voucher', detail: 'She wants to DO things. Gift an experience, not an object.', category: 'gift', effort: 'high' },
];

// ============================================================
// OVULATION ACTIONS
// ============================================================
const ovulationFood: EncyclopediaAction[] = [
  { id: 'ov_f1', text: 'Take her to the best restaurant you can afford', detail: 'She is glowing, confident, and social. This is the night for the nice place.', category: 'food', effort: 'high' },
  { id: 'ov_f2', text: 'Cook a romantic dinner at home with candles', detail: 'If going out is not the vibe, make home feel like a restaurant.', category: 'food', effort: 'high' },
  { id: 'ov_f3', text: 'Aphrodisiac foods: oysters, figs, dark chocolate, strawberries', detail: 'Fun to eat together. The science is debatable but the mood it creates is not.', category: 'food', effort: 'medium' },
  { id: 'ov_f4', text: 'Make cocktails or mocktails together', detail: 'The process of mixing drinks is flirty and fun. It is foreplay for the kitchen.', category: 'food', effort: 'medium' },
  { id: 'ov_f5', text: 'Breakfast in bed', detail: 'She woke up feeling amazing. Match that energy before the day even starts.', category: 'food', effort: 'medium' },
  { id: 'ov_f6', text: 'Late night food run together', detail: 'Spontaneous. Fun. She is up for anything.', category: 'food', effort: 'low' },
  { id: 'ov_f7', text: 'Light, fresh, colorful foods', detail: 'Her digestion is at its best. She gravitates toward clean, vibrant meals.', category: 'food', effort: 'medium' },
];

const ovulationDate: EncyclopediaAction[] = [
  { id: 'ov_d1', text: 'Dress up and go OUT. This is the night.', detail: 'She is at peak confidence, peak attractiveness, peak social energy. Do not let this be a Netflix night.', category: 'date', effort: 'high' },
  { id: 'ov_d2', text: 'Dancing. Actual dancing.', detail: 'Club, salsa class, wedding, living room. Movement + music + her at peak confidence = magic.', category: 'date', effort: 'medium' },
  { id: 'ov_d3', text: 'Rooftop bar or scenic spot at sunset', detail: 'She wants to feel special and beautiful. Give her the backdrop for it.', category: 'date', effort: 'medium' },
  { id: 'ov_d4', text: 'Party or group outing', detail: 'Her social battery is maxed. She wants to be around people and she wants you there with her.', category: 'date', effort: 'medium' },
  { id: 'ov_d5', text: 'Surprise date. Do not tell her where you are going.', detail: 'Mystery and spontaneity hit different during ovulation. Her brain craves novelty.', category: 'date', effort: 'high' },
  { id: 'ov_d6', text: 'Beach, pool, or anything where she can show off', detail: 'She feels hot. Let her feel hot. Compliment her relentlessly.', category: 'date', effort: 'medium' },
  { id: 'ov_d7', text: 'Karaoke night', detail: 'Confidence is maxed. She might actually do it and love it.', category: 'date', effort: 'medium' },
  { id: 'ov_d8', text: 'Photo walk together around the city', detail: 'She looks and feels her best. Take photos of her. She will actually like them.', category: 'date', effort: 'low' },
];

const ovulationTouch: EncyclopediaAction[] = [
  { id: 'ov_t1', text: 'Do not hold back on physical affection', detail: 'This is the window. She wants to be touched, held, kissed. Biology is screaming for closeness.', category: 'physical_touch', effort: 'low' },
  { id: 'ov_t2', text: 'Extended eye contact + slow touch', detail: 'Testosterone and estrogen are both peaking. The chemistry is physically different right now.', category: 'physical_touch', effort: 'low' },
  { id: 'ov_t3', text: 'Kiss her neck, not just her lips', detail: 'Sensitivity is heightened everywhere. She feels more than usual.', category: 'physical_touch', effort: 'low' },
  { id: 'ov_t4', text: 'Be physically close in public', detail: 'Hand on her back, arm around her waist. She wants to feel claimed (in a good way).', category: 'physical_touch', effort: 'low' },
  { id: 'ov_t5', text: 'Take your time', detail: 'Everything is heightened. Rushing through this phase is a crime.', category: 'physical_touch', effort: 'low' },
  { id: 'ov_t6', text: 'Whisper something in her ear in a crowded room', detail: 'The intimacy of being close in a public space is intoxicating during ovulation.', category: 'physical_touch', effort: 'low' },
];

const ovulationWords: EncyclopediaAction[] = [
  { id: 'ov_w1', text: '"You are the most beautiful person in this room"', detail: 'She knows she looks good. Confirming it out loud makes her feel seen, not just looked at.', category: 'words', effort: 'low' },
  { id: 'ov_w2', text: 'Be specific: "That dress, your eyes, the way you laugh"', detail: 'Generic compliments bounce off. Specific ones stick.', category: 'words', effort: 'low' },
  { id: 'ov_w3', text: '"I am so attracted to you right now"', detail: 'Direct. Honest. She wants to hear it said plainly, not implied.', category: 'words', effort: 'low' },
  { id: 'ov_w4', text: '"Everyone was looking at you tonight"', detail: 'Social proof + your pride in her = extremely powerful combination.', category: 'words', effort: 'low' },
  { id: 'ov_w5', text: 'Flirt with her like you just met', detail: 'Long relationships kill flirting. Bring it back right now when she is most receptive.', category: 'words', effort: 'low' },
  { id: 'ov_w6', text: 'Tell her something you have never said before', detail: 'Vulnerability during her most open phase creates deep bonding.', category: 'words', effort: 'low' },
];

const ovulationLogistics: EncyclopediaAction[] = [
  { id: 'ov_l1', text: 'Clear your schedule for her', detail: 'Do not double book. Do not be on your phone. Be fully present.', category: 'logistics', effort: 'medium' },
  { id: 'ov_l2', text: 'Set up the bedroom: clean sheets, dim lights, music', detail: 'The vibe of the space matters more than usual right now.', category: 'logistics', effort: 'medium' },
  { id: 'ov_l3', text: 'Handle all logistics for the date', detail: 'Reservation, directions, parking. She should not have to think about any of it.', category: 'logistics', effort: 'medium' },
  { id: 'ov_l4', text: 'Stock up on her favorite wine or drink', detail: 'Have it ready at home for when you get back from wherever.', category: 'logistics', effort: 'low' },
];

const ovulationGift: EncyclopediaAction[] = [
  { id: 'ov_g1', text: 'Lingerie or something she feels sexy in', detail: 'Only if you know her taste. This is about how SHE feels, not about what you want to see.', category: 'gift', effort: 'high' },
  { id: 'ov_g2', text: 'Perfume she has been wanting', detail: 'Scent + peak confidence = she will wear it tonight and think of you every time after.', category: 'gift', effort: 'high' },
  { id: 'ov_g3', text: 'A single statement flower, not a whole bouquet', detail: 'One perfect rose. One peony. Understated and romantic.', category: 'gift', effort: 'low' },
  { id: 'ov_g4', text: 'Jewelry: something small and meaningful', detail: 'Not expensive. Meaningful. A necklace she pointed at once. An anklet from a trip.', category: 'gift', effort: 'high' },
];

// ============================================================
// LUTEAL EARLY ACTIONS
// ============================================================
const lutealEarlyFood: EncyclopediaAction[] = [
  { id: 'le_f1', text: 'Complex carbs: sweet potatoes, brown rice, whole grain pasta', detail: 'Serotonin is dropping. Complex carbs boost serotonin production naturally.', category: 'food', effort: 'medium' },
  { id: 'le_f2', text: 'Make comfort food but keep it balanced', detail: 'She is starting to crave heavier food. Meet her halfway: hearty but not junk.', category: 'food', effort: 'medium' },
  { id: 'le_f3', text: 'Magnesium-rich snacks: almonds, dark chocolate, pumpkin seeds', detail: 'Magnesium helps with the mood swings and sleep disruption starting now.', category: 'food', effort: 'low' },
  { id: 'le_f4', text: 'Chamomile or sleepy tea in the evening', detail: 'Progesterone makes her sleepy but also wired. Herbal tea helps the transition.', category: 'food', effort: 'low' },
  { id: 'le_f5', text: 'Do not let her skip meals', detail: 'Blood sugar crashes hit harder during the luteal phase. Regular meals stabilize mood.', category: 'food', effort: 'low' },
  { id: 'le_f6', text: 'Salmon or omega-3 rich foods', detail: 'Omega-3s are anti-inflammatory and support mood regulation as hormones shift.', category: 'food', effort: 'medium' },
  { id: 'le_f7', text: 'Homemade soup: nothing says "I care" like a pot of soup', detail: 'It takes 30 minutes and feeds the soul. Chicken noodle, tomato basil, anything warm.', category: 'food', effort: 'medium' },
];

const lutealEarlyDate: EncyclopediaAction[] = [
  { id: 'le_d1', text: 'Chill dinner at a cozy spot, not a loud bar', detail: 'She still wants to go out but the volume is turning down. Intimate > energetic.', category: 'date', effort: 'medium' },
  { id: 'le_d2', text: 'Movie date (actual theater)', detail: 'Dark room, shared snacks, no need to talk. Perfect for when social energy dips.', category: 'date', effort: 'medium' },
  { id: 'le_d3', text: 'Sunset walk in a quiet area', detail: 'Movement helps mood. Low stakes, no performance required.', category: 'date', effort: 'low' },
  { id: 'le_d4', text: 'Spa day or couple massages', detail: 'Her body is starting to ache and retain water. Professional relaxation hits different.', category: 'date', effort: 'high' },
  { id: 'le_d5', text: 'Cook together at home with wine', detail: 'Intimate, low pressure, and she does not have to get dressed up.', category: 'date', effort: 'medium' },
  { id: 'le_d6', text: 'Bookstore or plant shop browse', detail: 'Quiet, sensory, no time pressure. Perfect transitional phase date.', category: 'date', effort: 'low' },
];

const lutealEarlyTouch: EncyclopediaAction[] = [
  { id: 'le_t1', text: 'Shoulder and neck massage', detail: 'Tension builds in the upper body during luteal. She might not ask but she needs it.', category: 'physical_touch', effort: 'medium' },
  { id: 'le_t2', text: 'Cuddle on the couch, let her lean into you', detail: 'She wants closeness but may not want to initiate. Create the space for it.', category: 'physical_touch', effort: 'low' },
  { id: 'le_t3', text: 'Gentle touch, check before escalating', detail: 'Sensitivity is increasing. What felt great last week might feel like too much now.', category: 'physical_touch', effort: 'low' },
  { id: 'le_t4', text: 'Hand on her thigh while driving or sitting', detail: 'Passive, warm, reassuring. Not asking for anything, just being present.', category: 'physical_touch', effort: 'low' },
  { id: 'le_t5', text: 'Brush her hair or braid it', detail: 'Rhythmic, gentle, intimate. Very few things are more soothing.', category: 'physical_touch', effort: 'low' },
];

const lutealEarlyWords: EncyclopediaAction[] = [
  { id: 'le_w1', text: '"I noticed you seem a little off. I am here if you want to talk"', detail: 'Acknowledge without pushing. She might not know why she feels different yet.', category: 'words', effort: 'low' },
  { id: 'le_w2', text: '"You do not have to be fun right now"', detail: 'She might feel guilty about the energy drop. Remove that pressure.', category: 'words', effort: 'low' },
  { id: 'le_w3', text: '"I love the quiet version of us too"', detail: 'Not everything has to be exciting. Telling her you enjoy stillness together is huge.', category: 'words', effort: 'low' },
  { id: 'le_w4', text: 'Do NOT pick this moment to bring up something heavy', detail: 'Her emotional processing is shifting. Save serious conversations for follicular.', category: 'words', effort: 'low' },
  { id: 'le_w5', text: '"What sounds good for dinner?" not "What is wrong?"', detail: 'Practical care > emotional interrogation. She will open up when she is ready.', category: 'words', effort: 'low' },
];

const lutealEarlyLogistics: EncyclopediaAction[] = [
  { id: 'le_l1', text: 'Start picking up more around the house preemptively', detail: 'In a few days her tolerance for mess drops to zero. Get ahead of it.', category: 'logistics', effort: 'medium' },
  { id: 'le_l2', text: 'Check the calendar: reduce social commitments ahead', detail: 'If there are big events in late luteal, now is the time to make them optional.', category: 'logistics', effort: 'low' },
  { id: 'le_l3', text: 'Stock up on period supplies early', detail: 'She does not want to think about this yet. But future her will thank you.', category: 'logistics', effort: 'low' },
  { id: 'le_l4', text: 'Make sure comfort items are clean and ready: blankets, PJs', detail: 'She is about to need these heavily. Wash them now.', category: 'logistics', effort: 'medium' },
];

const lutealEarlyGift: EncyclopediaAction[] = [
  { id: 'le_g1', text: 'Her comfort food stash, pre-built', detail: 'A bag with chocolate, chips, her favorite candy. Label it "Emergency Supplies."', category: 'gift', effort: 'medium' },
  { id: 'le_g2', text: 'A new candle or essential oil diffuser blend', detail: 'Scent is grounding. Lavender and eucalyptus for calm.', category: 'gift', effort: 'medium' },
  { id: 'le_g3', text: 'Cozy pajamas or loungewear', detail: 'She is about to live in these. Good ones make a difference.', category: 'gift', effort: 'medium' },
  { id: 'le_g4', text: 'A journal or nice pen', detail: 'Some women process the luteal emotional shift through writing. Worth a shot.', category: 'gift', effort: 'medium' },
];

// ============================================================
// LUTEAL LATE ACTIONS
// ============================================================
const lutealLateFood: EncyclopediaAction[] = [
  { id: 'll_f1', text: 'Do NOT comment on what she is eating', detail: 'Cravings are hormone-driven, not willpower failures. Let her eat what she wants.', category: 'food', effort: 'low' },
  { id: 'll_f2', text: 'Have chocolate available at all times', detail: 'This is not a want, it is a biochemical need. Magnesium + endorphins + serotonin boost.', category: 'food', effort: 'low' },
  { id: 'll_f3', text: 'Cook for her without asking what she wants', detail: 'Decision fatigue is crippling right now. Just make something warm and put it in front of her.', category: 'food', effort: 'medium' },
  { id: 'll_f4', text: 'Salty snacks: her body is retaining water and craving sodium', detail: 'Popcorn, pretzels, chips. Do not fight it, just provide.', category: 'food', effort: 'low' },
  { id: 'll_f5', text: 'Anti-inflammatory foods: turmeric, ginger, berries', detail: 'Prostaglandin production is ramping up. Anti-inflammatory foods blunt the coming cramps.', category: 'food', effort: 'medium' },
  { id: 'll_f6', text: 'Calcium-rich foods: yogurt, cheese, milk', detail: 'Studies show calcium reduces PMS symptoms by up to 50%. Real science.', category: 'food', effort: 'low' },
  { id: 'll_f7', text: 'Keep meals regular: no skipping, no fasting', detail: 'Blood sugar crashes + PMS = emotional nuclear bomb. Small frequent meals.', category: 'food', effort: 'low' },
  { id: 'll_f8', text: 'Reduce caffeine gently', detail: 'Caffeine worsens breast tenderness and anxiety, both of which are spiking now.', category: 'food', effort: 'low' },
  { id: 'll_f9', text: 'Warm milk with honey before bed', detail: 'Tryptophan + warmth + sweetness. Old school sleep aid that actually works.', category: 'food', effort: 'low' },
  { id: 'll_f10', text: 'Surprise her with ice cream', detail: 'Sometimes the answer is just ice cream. Do not overthink it.', category: 'food', effort: 'low' },
];

const lutealLateDate: EncyclopediaAction[] = [
  { id: 'll_d1', text: 'Movie night at home, no negotiations on what to watch', detail: 'She picks. You enjoy. If it is a romcom she has seen 40 times, watch it like it is new.', category: 'date', effort: 'low' },
  { id: 'll_d2', text: 'Pajama day: do not leave the house, do not get dressed', detail: 'Make staying in feel intentional, not lazy. Light candles, order food, make it a thing.', category: 'date', effort: 'low' },
  { id: 'll_d3', text: 'Take a warm bath together', detail: 'Warm water, dim lights, no agenda. One of the most intimate low-energy things you can do.', category: 'date', effort: 'medium' },
  { id: 'll_d4', text: 'Drive-through dinner eaten in the car', detail: 'Oddly romantic. Low effort. She does not have to be presentable.', category: 'date', effort: 'low' },
  { id: 'll_d5', text: 'Look through old photos together', detail: 'Nostalgia is comforting. Reminds her of good times during a rough patch.', category: 'date', effort: 'low' },
  { id: 'll_d6', text: 'Do a face mask together', detail: 'She will think it is cute. You both get better skin. Win-win.', category: 'date', effort: 'low' },
  { id: 'll_d7', text: 'Slow morning in bed: coffee, pastries, no alarms', detail: 'Give her a morning with zero urgency. PMS mornings are the hardest.', category: 'date', effort: 'low' },
];

const lutealLateTouch: EncyclopediaAction[] = [
  { id: 'll_t1', text: 'HOLD HER. Just hold her.', detail: 'This is peak cuddle time. Not a suggestion. A biological imperative. Oxytocin is the only thing counteracting the hormone crash.', category: 'physical_touch', effort: 'low' },
  { id: 'll_t2', text: 'Spoon in bed, no talking necessary', detail: 'She might cry. She might fall asleep. Both are correct outcomes.', category: 'physical_touch', effort: 'low' },
  { id: 'll_t3', text: 'Gentle forehead kisses', detail: 'The most "I love you without conditions" gesture that exists.', category: 'physical_touch', effort: 'low' },
  { id: 'll_t4', text: 'Rub her lower back, slow circles', detail: 'Pre-cramps are starting. Counter-pressure helps before they peak.', category: 'physical_touch', effort: 'low' },
  { id: 'll_t5', text: 'Let her put her cold feet on you without flinching', detail: 'Circulation is poor during late luteal. Her feet are ice. Absorb it. This is love.', category: 'physical_touch', effort: 'low', proTip: 'If you flinch, you lose points. Steel yourself.' },
  { id: 'll_t6', text: 'Wrap her in a blanket burrito', detail: 'Swaddle the adult. She wants to feel contained and safe. Yes, really.', category: 'physical_touch', effort: 'low' },
  { id: 'll_t7', text: 'Stroke her arm or back while she is falling asleep', detail: 'Sleep is disrupted during PMS. Gentle repetitive touch triggers parasympathetic response.', category: 'physical_touch', effort: 'low' },
  { id: 'll_t8', text: 'Do NOT take it personally if she does not want to be touched', detail: 'Some days the skin feels too sensitive. If she pulls away, it is not about you.', category: 'physical_touch', effort: 'low' },
];

const lutealLateWords: EncyclopediaAction[] = [
  { id: 'll_w1', text: '"You are not crazy. This is real and I see it."', detail: 'Women are told PMS is not that bad their entire lives. Validating her experience is everything.', category: 'words', effort: 'low' },
  { id: 'll_w2', text: '"I am not going anywhere"', detail: 'She might feel unlovable right now. Tell her directly that she is not.', category: 'words', effort: 'low' },
  { id: 'll_w3', text: '"What can I take off your plate?"', detail: 'Not "can I help" which requires her to assign tasks. Offer to take specific things.', category: 'words', effort: 'low' },
  { id: 'll_w4', text: '"I love you even when you do not love yourself"', detail: 'Self-esteem tanks during late luteal. She needs to hear this from the outside.', category: 'words', effort: 'low' },
  { id: 'll_w5', text: 'Do NOT say "are you getting your period?"', detail: 'Even if you are thinking it. Even if it is true. Just do not.', category: 'words', effort: 'low' },
  { id: 'll_w6', text: '"This will pass. I will be here when it does."', detail: 'Remind her this is temporary without minimizing what she feels right now.', category: 'words', effort: 'low' },
  { id: 'll_w7', text: '"You are beautiful" when she feels bloated and gross', detail: 'She will argue. Say it anyway. Mean it anyway.', category: 'words', effort: 'low' },
  { id: 'll_w8', text: 'Agree with her more than usual', detail: 'This is not the time to play devil\'s advocate. She does not need a debate partner.', category: 'words', effort: 'low' },
];

const lutealLateLogistics: EncyclopediaAction[] = [
  { id: 'll_l1', text: 'Handle EVERYTHING you can handle', detail: 'Cooking, cleaning, errands, pets, bills. Every task you absorb is pressure released.', category: 'logistics', effort: 'high' },
  { id: 'll_l2', text: 'Create a "no decisions required" environment', detail: 'Pick the food, pick the show, handle the plans. Decision fatigue is maxed out.', category: 'logistics', effort: 'medium' },
  { id: 'll_l3', text: 'Keep the house extra clean', detail: 'Mess triggers irritability x10 right now. A clean space is an emotional buffer.', category: 'logistics', effort: 'medium' },
  { id: 'll_l4', text: 'Period supplies: fully stocked, visible, accessible', detail: 'Period could start any day. She should not have to hunt for supplies.', category: 'logistics', effort: 'low' },
  { id: 'll_l5', text: 'Have pain relievers ready', detail: 'Pre-cramps hit before the period. She might need ibuprofen before she expects to.', category: 'logistics', effort: 'low' },
  { id: 'll_l6', text: 'Turn down the social calendar', detail: 'If friends invited you both somewhere, check with her first. She probably wants to skip.', category: 'logistics', effort: 'low' },
  { id: 'll_l7', text: 'Set up the bedroom for maximum comfort', detail: 'Extra pillows, fresh sheets, blackout curtains. She is about to need serious sleep.', category: 'logistics', effort: 'medium' },
];

const lutealLateGift: EncyclopediaAction[] = [
  { id: 'll_g1', text: 'Heating pad or hot water bottle (with a cute cover)', detail: 'If she does not have one yet, this is the move. She will use it in 2 days and think of you.', category: 'gift', effort: 'medium' },
  { id: 'll_g2', text: 'A weighted blanket', detail: 'Deep pressure stimulation reduces cortisol and anxiety. Science cuddles.', category: 'gift', effort: 'high' },
  { id: 'll_g3', text: 'Her specific comfort food, the exact brand', detail: 'Not "chips." HER chips. The specific ones. From the place she likes. Details matter.', category: 'gift', effort: 'low' },
  { id: 'll_g4', text: 'A handwritten "reasons I love you" list', detail: 'She will cry. That is the point. Happy tears during a hard time are medicinal.', category: 'gift', effort: 'low' },
  { id: 'll_g5', text: 'Fuzzy socks', detail: 'Her feet are always cold right now. This is a $5 gift that gets used every night.', category: 'gift', effort: 'low' },
  { id: 'll_g6', text: 'A curated Spotify playlist: "Songs for when everything is annoying"', detail: 'Funny, thoughtful, free. She will listen to it and think of you.', category: 'gift', effort: 'low' },
];

// ============================================================
// AVOID ITEMS
// ============================================================
const menstruationAvoids: AvoidItem[] = [
  { text: 'Do not say "Is it that time of the month?"', why: 'Dismisses everything she is feeling as hormonal and therefore invalid.', severity: 'nuclear' },
  { text: 'Do not act grossed out by her period', why: 'She already feels uncomfortable. Your disgust makes her feel ashamed of a biological process.', severity: 'serious' },
  { text: 'Do not push for high-energy plans', why: 'Her body is literally shedding tissue. She needs rest, not a hike.', severity: 'gentle' },
  { text: 'Do not comment if she looks tired', why: 'She knows. Pointing it out helps zero percent.', severity: 'gentle' },
  { text: 'Do not try to fix her mood with logic', why: 'She does not need solutions. She needs to feel heard.', severity: 'serious' },
  { text: 'Do not be passive aggressive about canceled plans', why: 'She already feels guilty. Adding guilt is cruel.', severity: 'serious' },
  { text: 'Do not complain about lack of intimacy', why: 'She is in pain. Making it about your needs right now is selfish.', severity: 'nuclear' },
  { text: 'Do not bring up stressful topics', why: 'Her emotional bandwidth is zero. Save the "we need to talk" for next week.', severity: 'serious' },
  { text: 'Do not be on your phone while she is talking', why: 'She is already low. Feeling ignored on top of that is devastating.', severity: 'gentle' },
  { text: 'Do not compare her to other women who "handle it fine"', why: 'Every body is different. Pain is not a competition.', severity: 'nuclear' },
];

const follicularAvoids: AvoidItem[] = [
  { text: 'Do not waste this phase on routine', why: 'She is at her most adventurous and open. Netflix every night is a missed opportunity.', severity: 'gentle' },
  { text: 'Do not be low energy when she is high energy', why: 'Match her vibe or she will find it elsewhere (friends, solo plans). Step up.', severity: 'gentle' },
  { text: 'Do not bring up past arguments', why: 'She is in a good mood. Do not anchor her back to negativity.', severity: 'serious' },
  { text: 'Do not take her confidence as "she does not need me"', why: 'She is independent right now but still wants you CHOOSING to be there.', severity: 'gentle' },
  { text: 'Do not be jealous of her social energy', why: 'She wants to see friends. That is healthy. Support it.', severity: 'serious' },
  { text: 'Do not neg her or tease too hard', why: 'She feels good. Do not poke holes in that. Build her up.', severity: 'gentle' },
  { text: 'Do not ignore her appearance when she clearly made an effort', why: 'If she dressed up and you said nothing, she noticed your silence.', severity: 'gentle' },
];

const ovulationAvoids: AvoidItem[] = [
  { text: 'Do not be boring', why: 'Seriously. This is 2-3 days of peak everything. Plan something. Anything.', severity: 'gentle' },
  { text: 'Do not be on your phone during quality time', why: 'She is fully present and radiating energy. If you are scrolling, you are wasting it.', severity: 'serious' },
  { text: 'Do not take her friendliness with others as flirting', why: 'She is social and magnetic right now. That is biology, not betrayal.', severity: 'serious' },
  { text: 'Do not skip the compliments', why: 'She looks and feels her best. If you do not notice, someone else will.', severity: 'gentle' },
  { text: 'Do not pick a fight right now', why: 'She has the patience to handle it but the relationship does not need it. Enjoy the good times.', severity: 'gentle' },
  { text: 'Do not rush through intimacy', why: 'Everything is heightened. Slow down. Way down.', severity: 'serious' },
  { text: 'Do not make her feel objectified', why: 'There is a line between desire and reducing her to a body. Stay on the right side.', severity: 'serious' },
];

const lutealEarlyAvoids: AvoidItem[] = [
  { text: 'Do not start heavy conversations', why: 'Her emotional processing is shifting. She will take things harder than she would in follicular.', severity: 'serious' },
  { text: 'Do not point out mood changes', why: '"You seem different" or "you were so fun last week" is a comparison she does not need.', severity: 'serious' },
  { text: 'Do not leave messes around the house', why: 'Irritability is building. Clutter is a fuse you do not want to light.', severity: 'gentle' },
  { text: 'Do not make plans without checking first', why: 'Her social battery is variable now. Surprising her with a dinner party could backfire.', severity: 'gentle' },
  { text: 'Do not dismiss her if she is more emotional', why: 'Progesterone is peaking. Her feelings are real even if the trigger seems small.', severity: 'serious' },
  { text: 'Do not reduce affection just because she is less "fun"', why: 'She notices the drop-off. It confirms her fear that she is only lovable when she is easy.', severity: 'serious' },
  { text: 'Do not be critical of her body', why: 'Bloating is starting. She is already aware. Your job is to make her feel beautiful anyway.', severity: 'nuclear' },
  { text: 'Do not forget to ask how she is doing', why: 'She might not volunteer it. But she needs you to ask.', severity: 'gentle' },
];

const lutealLateAvoids: AvoidItem[] = [
  { text: 'Do NOT ask "are you getting your period?"', why: 'Even if you are thinking it. Even if it is obvious. Just do not.', severity: 'nuclear' },
  { text: 'Do not argue back', why: 'You will not win. Not because she is right, but because her brain is flooded with cortisol and she cannot process conflict.', severity: 'serious' },
  { text: 'Do not say "calm down"', why: 'Has this ever worked? In the history of humanity? No. It has not.', severity: 'nuclear' },
  { text: 'Do not bring up things she said when emotional later', why: '"Remember when you said..." is weaponizing a vulnerable moment. Do not.', severity: 'nuclear' },
  { text: 'Do not leave her alone for too long', why: 'She wants space but not abandonment. Check in. Be nearby.', severity: 'gentle' },
  { text: 'Do not comment on bloating or weight', why: 'She is retaining water. She knows. Your eyes do not need to confirm it.', severity: 'nuclear' },
  { text: 'Do not plan social events', why: 'She does not want to perform being fine in front of your friends right now.', severity: 'serious' },
  { text: 'Do not compare this week to last week', why: '"But you were fine last week!" Yes. That was a different hormonal reality.', severity: 'serious' },
  { text: 'Do not make her feel guilty for needing you more', why: 'She is not being needy. She is human. Be there.', severity: 'serious' },
  { text: 'Do not play devil\'s advocate', why: 'She does not need perspective right now. She needs agreement and comfort.', severity: 'gentle' },
  { text: 'Do not ignore her', why: 'The worst thing you can do during PMS is nothing. Silence reads as not caring.', severity: 'serious' },
];

// ============================================================
// ASSEMBLE ENCYCLOPEDIA
// ============================================================
export const encyclopedia: Record<Phase, PhaseEncyclopedia> = {
  menstruation: {
    phase: 'menstruation',
    indicators: menstruationIndicators,
    actions: {
      food: menstruationFood,
      date: menstruationDate,
      physical_touch: menstruationTouch,
      words: menstruationWords,
      logistics: menstruationLogistics,
      gift: menstruationGift,
    },
    avoids: menstruationAvoids,
  },
  follicular: {
    phase: 'follicular',
    indicators: follicularIndicators,
    actions: {
      food: follicularFood,
      date: follicularDate,
      physical_touch: follicularTouch,
      words: follicularWords,
      logistics: follicularLogistics,
      gift: follicularGift,
    },
    avoids: follicularAvoids,
  },
  ovulation: {
    phase: 'ovulation',
    indicators: ovulationIndicators,
    actions: {
      food: ovulationFood,
      date: ovulationDate,
      physical_touch: ovulationTouch,
      words: ovulationWords,
      logistics: ovulationLogistics,
      gift: ovulationGift,
    },
    avoids: ovulationAvoids,
  },
  luteal_early: {
    phase: 'luteal_early',
    indicators: lutealEarlyIndicators,
    actions: {
      food: lutealEarlyFood,
      date: lutealEarlyDate,
      physical_touch: lutealEarlyTouch,
      words: lutealEarlyWords,
      logistics: lutealEarlyLogistics,
      gift: lutealEarlyGift,
    },
    avoids: lutealEarlyAvoids,
  },
  luteal_late: {
    phase: 'luteal_late',
    indicators: lutealLateIndicators,
    actions: {
      food: lutealLateFood,
      date: lutealLateDate,
      physical_touch: lutealLateTouch,
      words: lutealLateWords,
      logistics: lutealLateLogistics,
      gift: lutealLateGift,
    },
    avoids: lutealLateAvoids,
  },
};
