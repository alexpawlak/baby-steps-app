import type { Domain, Milestone } from "./types";

export const milestones: Milestone[] = [
  { id: "cdc_02m_social_01", domain: "social_emotional", text: "Calms when spoken to or picked up" },
  { id: "cdc_02m_social_02", domain: "social_emotional", text: "Looks at your face" },
  { id: "cdc_02m_social_03", domain: "social_emotional", text: "Seems happy when you come close" },
  { id: "cdc_02m_social_04", domain: "social_emotional", text: "Smiles when you talk or smile", activity: "Talk, read, or sing together for a few minutes." },
  { id: "cdc_02m_language_01", domain: "language_communication", text: "Makes sounds other than crying", activity: "When your baby makes a sound, smile and answer back. Then pause for their response." },
  { id: "cdc_02m_language_02", domain: "language_communication", text: "Reacts to loud sounds" },
  { id: "cdc_02m_cognitive_01", domain: "cognitive_learning", text: "Watches you as you move" },
  { id: "cdc_02m_cognitive_02", domain: "cognitive_learning", text: "Looks at a toy for several seconds", activity: "Look at a bright picture or familiar face together and describe what you see." },
  { id: "cdc_02m_movement_01", domain: "movement_physical", text: "Holds head up during tummy time", activity: "Try supervised tummy time while your baby is awake, with something interesting at eye level. If sleepy, place baby on their back in a safe sleep space." },
  { id: "cdc_02m_movement_02", domain: "movement_physical", text: "Moves both arms and both legs" },
  { id: "cdc_02m_movement_03", domain: "movement_physical", text: "Opens hands briefly" },
];

export const domainMeta: Record<Domain, { label: string; symbol: string; colour: string }> = {
  social_emotional: { label: "Social & emotional", symbol: "♥", colour: "coral" },
  language_communication: { label: "Language & communication", symbol: "◌", colour: "sun" },
  cognitive_learning: { label: "Learning & noticing", symbol: "✦", colour: "blue" },
  movement_physical: { label: "Movement & physical", symbol: "↗", colour: "leaf" },
};
