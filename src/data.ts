import type { Domain, Milestone, SourceId } from "./types";

export const birthDate = "2026-09-23";

export const sources: Record<SourceId, { short: string; label: string; url: string }> = {
  cdc_2m: { short: "CDC", label: "CDC — Milestones by 2 months", url: "https://www.cdc.gov/act-early/milestones/2-months.html" },
  cdc_4m: { short: "CDC", label: "CDC — Milestones by 4 months", url: "https://www.cdc.gov/act-early/milestones/4-months.html" },
  aap_reflexes: { short: "AAP", label: "AAP HealthyChildren — Newborn reflexes", url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Newborn-Reflexes.aspx" },
  aap_1m: { short: "AAP", label: "AAP HealthyChildren — Milestones at 1 month", url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones-1-Month.aspx" },
  aap_2_4m: { short: "AAP", label: "AAP HealthyChildren — Milestones at 2 and 4 months", url: "https://www.healthychildren.org/English/ages-stages/baby/Pages/Developmental-Milestones-3-Months.aspx" },
  nhs_lincs_0_3m: { short: "NHS", label: "NHS Lincolnshire Children’s Therapy — Birth to 3 months", url: "https://www.lincolnshirechildrenstherapyservices.nhs.uk/what-typical-development/0-2-years/0-3-months" },
  gosh_0_12m: { short: "NHS", label: "Great Ormond Street Hospital — Speech and language, birth to 12 months", url: "https://www.gosh.nhs.uk/conditions-and-treatments/procedures-and-treatments/speech-and-language-development-birth-12-months/" },
};

// Windows run from when a behaviour usually starts to show to the age by which most babies do it.
// CDC checkpoints mark what 75% of babies do by that age (2 months ≈ 9 weeks, 4 months ≈ 17 weeks);
// start ages come from AAP and NHS guidance and are approximate.
export const milestones: Milestone[] = [
  // Birth: reflexes and first behaviours
  { id: "nb_reflex_rooting", domain: "movement_physical", text: "Turns toward your touch on their cheek, looking for a feed", fromDays: 0, toDays: 7, source: "aap_reflexes", image: "milestones/nb_reflex_rooting.webp" },
  { id: "nb_reflex_sucking", domain: "movement_physical", text: "Sucks when something touches the roof of the mouth", fromDays: 0, toDays: 7, source: "aap_reflexes", image: "milestones/nb_reflex_sucking.webp" },
  { id: "nb_reflex_grasp", domain: "movement_physical", text: "Grips your finger tightly", fromDays: 0, toDays: 7, source: "aap_reflexes" },
  { id: "nb_reflex_startle", domain: "movement_physical", text: "Startles and flings arms out at a sudden noise or movement", fromDays: 0, toDays: 7, source: "aap_reflexes" },
  { id: "nb_reflex_stepping", domain: "movement_physical", text: "Makes stepping movements when held upright with feet on a surface", fromDays: 0, toDays: 7, source: "aap_reflexes" },
  { id: "nb_reflex_fencing", domain: "movement_physical", text: "Lies in a “fencing” pose: head turned, that arm straight, the other bent", fromDays: 0, toDays: 14, source: "aap_reflexes" },
  { id: "cdc_02m_movement_02", domain: "movement_physical", text: "Moves both arms and both legs", fromDays: 0, toDays: 7, source: "cdc_2m" },
  { id: "nb_language_cry", domain: "language_communication", text: "Cries to show hunger or discomfort", fromDays: 0, toDays: 7, source: "gosh_0_12m" },
  { id: "cdc_02m_language_02", domain: "language_communication", text: "Reacts to loud sounds", fromDays: 0, toDays: 14, source: "cdc_2m" },
  { id: "nb_social_face", domain: "social_emotional", text: "Looks at a face held close (20–30 cm away)", fromDays: 0, toDays: 14, source: "aap_1m", activity: "Hold your baby close and let them study your face while you talk softly." },
  { id: "nb_movement_tummy_turn", domain: "movement_physical", text: "Turns head from side to side when lying on their tummy", fromDays: 0, toDays: 28, source: "aap_1m", activity: "Short, supervised tummy time on your chest counts too." },
  { id: "nb_cognitive_contrast", domain: "cognitive_learning", text: "Stares at black-and-white or high-contrast patterns", fromDays: 0, toDays: 35, source: "aap_1m", activity: "Hold a bold black-and-white card 20–30 cm from their face and move it slowly." },
  { id: "nb_social_voice", domain: "social_emotional", text: "Quiets or turns toward a familiar voice", fromDays: 0, toDays: 28, source: "aap_1m" },
  { id: "nb_movement_hands_mouth", domain: "movement_physical", text: "Brings hands up near the eyes and mouth", fromDays: 0, toDays: 28, source: "aap_1m" },
  { id: "cdc_02m_social_01", domain: "social_emotional", text: "Calms when spoken to or picked up", fromDays: 0, toDays: 28, source: "cdc_2m", activity: "Skin-to-skin contact while you talk or hum." },
  { id: "cdc_02m_social_02", domain: "social_emotional", text: "Looks at your face", fromDays: 0, toDays: 28, source: "cdc_2m" },
  { id: "nb_movement_head_lift", domain: "movement_physical", text: "Lifts head briefly during tummy time", fromDays: 0, toDays: 35, source: "nhs_lincs_0_3m" },

  // Weeks 2–9: towards the 2-month checkpoint
  { id: "nb_cognitive_follow", domain: "cognitive_learning", text: "Follows a face or moving object with their eyes", fromDays: 14, toDays: 63, source: "aap_2_4m", activity: "Move your face slowly from side to side while talking." },
  { id: "cdc_02m_movement_03", domain: "movement_physical", text: "Opens hands briefly", fromDays: 14, toDays: 63, source: "cdc_2m" },
  { id: "cdc_02m_cognitive_01", domain: "cognitive_learning", text: "Watches you as you move", fromDays: 21, toDays: 63, source: "cdc_2m" },
  { id: "cdc_02m_social_04", domain: "social_emotional", text: "Smiles when you talk or smile", fromDays: 28, toDays: 63, source: "cdc_2m", activity: "Talk, read, or sing together for a few minutes." },
  { id: "cdc_02m_social_03", domain: "social_emotional", text: "Seems happy when you come close", fromDays: 28, toDays: 63, source: "cdc_2m" },
  { id: "cdc_02m_movement_01", domain: "movement_physical", text: "Holds head up during tummy time", fromDays: 28, toDays: 63, source: "cdc_2m", activity: "Supervised tummy time while your baby is awake, with something interesting at eye level. If sleepy, place baby on their back in a safe sleep space." },
  { id: "cdc_02m_language_01", domain: "language_communication", text: "Makes sounds other than crying", fromDays: 35, toDays: 63, source: "cdc_2m", activity: "When your baby makes a sound, smile and answer back. Then pause for their response." },
  { id: "cdc_02m_cognitive_02", domain: "cognitive_learning", text: "Looks at a toy for several seconds", fromDays: 35, toDays: 63, source: "cdc_2m", activity: "Look at a bright picture or familiar face together and describe what you see." },
  { id: "lincs_03m_feet_weight", domain: "movement_physical", text: "Takes a little weight on their feet when held upright", fromDays: 28, toDays: 91, source: "nhs_lincs_0_3m" },

  // Weeks 6–17: emerging through month 3, towards the 4-month checkpoint
  { id: "cdc_04m_language_coo", domain: "language_communication", text: "Coos: “oooo”, “aahh”", fromDays: 42, toDays: 119, source: "cdc_4m", activity: "Copy their coos back, then wait. Taking turns is the start of conversation." },
  { id: "cdc_04m_language_reply", domain: "language_communication", text: "Makes sounds back when you talk", fromDays: 56, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_language_voice", domain: "language_communication", text: "Turns head toward the sound of your voice", fromDays: 56, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_social_smile", domain: "social_emotional", text: "Smiles on their own to get your attention", fromDays: 56, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_cognitive_hands", domain: "cognitive_learning", text: "Looks at their hands with interest", fromDays: 56, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_cognitive_feed", domain: "cognitive_learning", text: "Opens mouth when they see breast or bottle, if hungry", fromDays: 56, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_movement_hold", domain: "movement_physical", text: "Holds a toy when you put it in their hand", fromDays: 56, toDays: 119, source: "cdc_4m", activity: "Place a light rattle in their palm and let them feel it." },
  { id: "lincs_03m_hands_together", domain: "movement_physical", text: "Brings hands together", fromDays: 56, toDays: 91, source: "nhs_lincs_0_3m" },
  { id: "cdc_04m_movement_head_steady", domain: "movement_physical", text: "Holds head steady without support when you hold them", fromDays: 63, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_movement_swing", domain: "movement_physical", text: "Swings an arm at toys", fromDays: 63, toDays: 119, source: "cdc_4m", activity: "Dangle a soft toy within reach during floor play." },
  { id: "cdc_04m_social_chuckle", domain: "social_emotional", text: "Chuckles when you try to make them laugh", fromDays: 70, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_social_attention", domain: "social_emotional", text: "Looks, moves, or makes sounds to keep your attention", fromDays: 70, toDays: 119, source: "cdc_4m" },
  { id: "cdc_04m_movement_forearms", domain: "movement_physical", text: "Pushes up onto elbows or forearms during tummy time", fromDays: 70, toDays: 119, source: "cdc_4m" },
];

export const domainMeta: Record<Domain, { label: string; symbol: string; colour: string }> = {
  social_emotional: { label: "Social & emotional", symbol: "♥", colour: "coral" },
  language_communication: { label: "Language & communication", symbol: "◌", colour: "sun" },
  cognitive_learning: { label: "Learning & noticing", symbol: "✦", colour: "blue" },
  movement_physical: { label: "Movement & physical", symbol: "↗", colour: "leaf" },
};
