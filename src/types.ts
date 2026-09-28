export type Domain =
  | "social_emotional"
  | "language_communication"
  | "cognitive_learning"
  | "movement_physical";

export type SourceId = "cdc_2m" | "cdc_4m" | "aap_reflexes" | "aap_1m" | "aap_2_4m" | "nhs_lincs_0_3m" | "gosh_0_12m";

export type Milestone = {
  id: string;
  domain: Domain;
  text: string;
  /** Typical age window, in days since birth. */
  fromDays: number;
  toDays: number;
  source: SourceId;
  activity?: string;
  /** Illustration path under public/, e.g. "milestones/cdc_02m_social_04.webp". */
  image?: string;
};

/** Milestone id → ISO date it was checked. */
export type Checks = Record<string, string>;
