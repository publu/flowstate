export const colors = {
  background: '#050506',
  backgroundAlt: '#0A0A0C',
  surface: 'rgba(255,255,255,0.04)',
  surfaceHover: 'rgba(255,255,255,0.06)',
  surfaceAlt: 'rgba(255,255,255,0.08)',
  surfaceSolid: '#111114',
  textPrimary: '#EDEDEF',
  textSecondary: '#8A8F98',
  textTertiary: '#565B65',
  accent: '#E8836B',
  accentSoft: 'rgba(232,131,107,0.15)',
  accentGlow: 'rgba(232,131,107,0.25)',
  accentDim: '#E8836B33',
  error: '#C75B5B',
  border: 'rgba(255,255,255,0.06)',
  borderLight: 'rgba(255,255,255,0.10)',
  glow: 'rgba(255,255,255,0.03)',

  phase: {
    menstruation: '#C75B5B',
    follicular: '#6BC7A3',
    ovulation: '#E8C86B',
    luteal_early: '#7B8FD4',
    luteal_late: '#9B7BC7',
  },

  hormone: {
    estrogen: '#E88BA3',
    progesterone: '#B07BE8',
    testosterone: '#E8B86B',
    prostaglandins: '#E86B6B',
    serotonin: '#6BC7E8',
  },

  category: {
    food: '#E8A86B',
    date: '#E86BA3',
    physical_touch: '#B06BE8',
    words: '#6BC7E8',
    logistics: '#6BE8A3',
    gift: '#E8C86B',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const font = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 36,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;
