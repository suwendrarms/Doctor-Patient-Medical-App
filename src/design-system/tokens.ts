export const palette = {
  ink: '#0F172A',
  inkSoft: '#1E293B',
  muted: '#64748B',
  surface: '#F8FAFC',
  surfaceAlt: '#F1F5F9',
  surfaceDark: '#0B1220',
  surfaceDarkAlt: '#111A2E',
  card: '#FFFFFF',
  cardDark: '#162033',
  border: '#E2E8F0',
  borderDark: '#1F2A44',
  white: '#FFFFFF',

  success: '#10B981',
  warning: '#F59E0B',
  critical: '#EF4444',
  info: '#3B82F6',
} as const;

export type RoleCode = 'patient' | 'doctor' | 'reception' | 'nurse' | 'admin';

export type RoleTheme = {
  code: RoleCode;
  label: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  softTint: string;
};

export const roleThemes: Record<RoleCode, RoleTheme> = {
  patient: {
    code: 'patient',
    label: 'Patient',
    gradientFrom: '#6366F1',
    gradientTo: '#38BDF8',
    accent: '#6366F1',
    softTint: '#EEF2FF',
  },
  doctor: {
    code: 'doctor',
    label: 'Doctor',
    gradientFrom: '#0D9488',
    gradientTo: '#10B981',
    accent: '#0D9488',
    softTint: '#ECFDF5',
  },
  reception: {
    code: 'reception',
    label: 'Reception',
    gradientFrom: '#F59E0B',
    gradientTo: '#F472B6',
    accent: '#F59E0B',
    softTint: '#FFF7ED',
  },
  nurse: {
    code: 'nurse',
    label: 'Nurse',
    gradientFrom: '#34D399',
    gradientTo: '#A3E635',
    accent: '#10B981',
    softTint: '#ECFDF5',
  },
  admin: {
    code: 'admin',
    label: 'Admin',
    gradientFrom: '#8B5CF6',
    gradientTo: '#D946EF',
    accent: '#8B5CF6',
    softTint: '#F5F3FF',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  displayXl: { fontSize: 32, lineHeight: 38, fontWeight: '700' as const, fontFamily: 'Manrope_700Bold' },
  displayL: { fontSize: 26, lineHeight: 32, fontWeight: '700' as const, fontFamily: 'Manrope_700Bold' },
  titleL: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold' },
  titleM: { fontSize: 17, lineHeight: 22, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold' },
  body: { fontSize: 15, lineHeight: 21, fontWeight: '400' as const, fontFamily: 'Inter_400Regular' },
  bodyBold: { fontSize: 15, lineHeight: 21, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const, fontFamily: 'Inter_500Medium' },
} as const;

export const shadow = {
  card: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  fab: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
} as const;

export const motion = {
  duration: 220,
} as const;
