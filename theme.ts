export const colors = {
  background: "#0B0F14",
  surface: "#121821",
  surfaceElevated: "#18202B",
  border: "#242E3A",
  textPrimary: "#F2F5F7",
  textSecondary: "#9AA6B2",
  accent: "#7C9EFF",
  danger: "#FF6B6B",

  A: "#FF6B6B",
  ASoft: "rgba(255, 107, 107, 0.16)",
  B: "#FFA94D",
  BSoft: "rgba(255, 169, 77, 0.16)",
  C: "#FFD166",
  CSoft: "rgba(255, 209, 102, 0.16)",
  D: "#7BE495",
  DSoft: "rgba(123, 228, 149, 0.16)",
  E: "#7C9EFF",
  ESoft: "rgba(124, 158, 255, 0.16)",
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  full: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const tagStyles: Record<
  string,
  { color: string; soft: string; label: string; description: string }
> = {
  A: {
    color: colors.A,
    soft: colors.ASoft,
    label: "Must do",
    description: "Critical tasks with real consequences. Complete these first.",
  },
  B: {
    color: colors.B,
    soft: colors.BSoft,
    label: "Should do",
    description:
      "Important tasks, but they can wait until your A tasks are done.",
  },
  C: {
    color: colors.C,
    soft: colors.CSoft,
    label: "Nice to do",
    description:
      "Optional tasks with little impact. Do them only when A and B are complete.",
  },
  D: {
    color: colors.D,
    soft: colors.DSoft,
    label: "Delegate",
    description:
      "Tasks that someone else can handle, freeing your time for higher priorities.",
  },
  E: {
    color: colors.E,
    soft: colors.ESoft,
    label: "Eliminate",
    description:
      "Low-value tasks. Remove them from your list whenever possible.",
  },
};
