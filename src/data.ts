import type { Domain, Milestone } from "./types";

export const birthDate = "2026-09-27";

// Newborn items (nb_*) are common newborn reflexes and early behaviours (AAP HealthyChildren, NHS).
// cdc_02m_* items are from CDC "Milestones by 2 months". Age windows are approximate typical ranges.
export const milestones: Milestone[] = [
  { id: "nb_reflex_rooting", domain: "movement_physical", text: "Turns toward your touch on their cheek, looking for a feed", fromDays: 0, toDays: 7 },
  { id: "nb_reflex_sucking", domain: "movement_physical", text: "Sucks when something touches the roof of the mouth", fromDays: 0, toDays: 7 },
  { id: "nb_reflex_grasp", domain: "movement_physical", text: "Grips your finger tightly", fromDays: 0, toDays: 7 },
  { id: "nb_reflex_startle", domain: "movement_physical", text: "Startles and flings arms out at a sudden noise or movement", fromDays: 0, toDays: 7 },
  { id: "nb_reflex_stepping", domain: "movement_physical", text: "Makes stepping movements when held upright with feet on a surface", fromDays: 0, toDays: 7 },
  { id: "cdc_02m_movement_02", domain: "movement_physical", text: "Moves both arms and both legs", fromDays: 0, toDays: 7 },
  { id: "nb_language_cry", domain: "language_communication", text: "Cries to show hunger or discomfort", fromDays: 0, toDays: 7 },
  { id: "cdc_02m_language_02", domain: "language_communication", text: "Reacts to loud sounds", fromDays: 0, toDays: 14 },
  { id: "nb_social_face", domain: "social_emotional", text: "Looks at a face held close (20–30 cm away)", fromDays: 0, toDays: 14, activity: "Hold your baby close and let them study your face while you talk softly." },
  { id: "nb_movement_tummy_turn", domain: "movement_physical", text: "Turns head to the side when lying on their tummy", fromDays: 0, toDays: 14, activity: "Short, supervised tummy time on your chest counts too." },
  { id: "nb_social_voice", domain: "social_emotional", text: "Quiets or turns toward your voice", fromDays: 0, toDays: 21 },
  { id: "nb_movement_hands_mouth", domain: "movement_physical", text: "Brings hands to mouth", fromDays: 0, toDays: 21 },
  { id: "cdc_02m_social_01", domain: "social_emotional", text: "Calms when spoken to or picked up", fromDays: 0, toDays: 28, activity: "Skin-to-skin contact while you talk or hum." },
  { id: "cdc_02m_social_02", domain: "social_emotional", text: "Looks at your face", fromDays: 0, toDays: 28 },
  { id: "nb_cognitive_follow", domain: "cognitive_learning", text: "Follows a face briefly with their eyes", fromDays: 14, toDays: 42 },
  { id: "cdc_02m_movement_03", domain: "movement_physical", text: "Opens hands briefly", fromDays: 14, toDays: 63 },
  { id: "nb_movement_head_lift", domain: "movement_physical", text: "Lifts head briefly during tummy time", fromDays: 21, toDays: 42 },
  { id: "cdc_02m_cognitive_01", domain: "cognitive_learning", text: "Watches you as you move", fromDays: 21, toDays: 63 },
  { id: "cdc_02m_social_04", domain: "social_emotional", text: "Smiles when you talk or smile", fromDays: 35, toDays: 63, activity: "Talk, read, or sing together for a few minutes." },
  { id: "cdc_02m_social_03", domain: "social_emotional", text: "Seems happy when you come close", fromDays: 35, toDays: 63 },
  { id: "cdc_02m_language_01", domain: "language_communication", text: "Makes sounds other than crying", fromDays: 35, toDays: 63, activity: "When your baby makes a sound, smile and answer back. Then pause for their response." },
  { id: "cdc_02m_cognitive_02", domain: "cognitive_learning", text: "Looks at a toy for several seconds", fromDays: 35, toDays: 63, activity: "Look at a bright picture or familiar face together and describe what you see." },
  { id: "cdc_02m_movement_01", domain: "movement_physical", text: "Holds head up during tummy time", fromDays: 35, toDays: 63, activity: "Supervised tummy time while your baby is awake, with something interesting at eye level. If sleepy, place baby on their back in a safe sleep space." },
];

export const domainMeta: Record<Domain, { label: string; symbol: string; colour: string }> = {
  social_emotional: { label: "Social & emotional", symbol: "♥", colour: "coral" },
  language_communication: { label: "Language & communication", symbol: "◌", colour: "sun" },
  cognitive_learning: { label: "Learning & noticing", symbol: "✦", colour: "blue" },
  movement_physical: { label: "Movement & physical", symbol: "↗", colour: "leaf" },
};
