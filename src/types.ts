export type Domain =
  | "social_emotional"
  | "language_communication"
  | "cognitive_learning"
  | "movement_physical";

export type Milestone = {
  id: string;
  domain: Domain;
  text: string;
  /** Typical age window, in days since birth. */
  fromDays: number;
  toDays: number;
  activity?: string;
};

/** Milestone id → ISO date it was checked. */
export type Checks = Record<string, string>;
