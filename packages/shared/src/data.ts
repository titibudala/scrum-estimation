export const VoteMechanism = {
  FIBONACCI: {
    name: "Fibonacci",
    value: ["0", "1", "2", "3", "5", "8"],
  },
  DAYS: {
    name: "Days",
    value: ["0.5", "1", "2", "3", "4", "5"],
  },
  T_SHIRTS: {
    name: "T-Shirts",
    value: ["XS", "S", "M", "L", "XL"],
  },
} as const;
export const VoteMechanismKeys = Object.keys(VoteMechanism) as Array<
  keyof typeof VoteMechanism
>;

export const SecurityMechanism = {
  OPEN: {
    name: "No security",
  },
  WAITING_ROOM: {
    name: "Waiting room",
  },
} as const;

export const SecurityMechanismKeys = Object.keys(SecurityMechanism) as Array<
  keyof typeof SecurityMechanism
>;

export const ExpertiseCategory = {
  FE_DEV: {
    name: "Front-end Developer",
  },
  BE_DEV: {
    name: "Back-end Developer",
  },
  UI_UX: {
    name: "UI/UX Designer",
  },
  QA_ENGINEER: {
    name: "QA Engineer",
  },
  ARHITECT: {
    name: "Arhitect",
  },
} as const;

export const ExpertiseCategoryKeys = Object.keys(ExpertiseCategory) as Array<
  keyof typeof ExpertiseCategory
>;
