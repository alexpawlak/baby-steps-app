export type Domain =
  | "social_emotional"
  | "language_communication"
  | "cognitive_learning"
  | "movement_physical";

export type MilestoneStatus = "observed" | "emerging" | "not_yet";

export type Milestone = {
  id: string;
  domain: Domain;
  text: string;
  activity?: string;
};

export type Observation = {
  milestoneId: string;
  status: MilestoneStatus;
  note?: string;
  recordedAt: string;
  recordedBy: "Mum" | "Dad";
};
