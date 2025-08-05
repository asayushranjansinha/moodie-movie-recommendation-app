export const theme = {
  colors: {
    primary: "#6366F1",
    secondary: "#EC4899",
    background: "#0F0F23",
    surface: "#1A1A2E",
    card: "#16213E",
    text: "#FFFFFF",
    textSecondary: "#cbd5e3ff",
    accent: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    success: "#10B981",
    border: "#334155",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    heading1: {
      fontSize: 32,
      fontWeight: "700" as const,
      lineHeight: 40,
    },
    heading2: {
      fontSize: 24,
      fontWeight: "600" as const,
      lineHeight: 32,
    },
    heading3: {
      fontSize: 20,
      fontWeight: "600" as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: "400" as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 16,
    },
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
