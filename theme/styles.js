// theme/styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  background: '#030712',     // fundo bem escuro
  surface: '#020617',        // cartões / superfícies
  surfaceSoft: '#0B1120',
  primary: '#38BDF8',        // azul neon
  primarySoft: '#0EA5E9',
  accent: '#A855F7',         // roxo para detalhes
  text: '#E5E7EB',
  textMuted: '#9CA3AF',
  border: '#1F2937',
  danger: '#F97373',
  success: '#22C55E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: 24,
  subtitle: 18,
  body: 14,
  small: 12,
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  title: {
    fontSize: typography.title,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },

  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },

  label: {
    fontSize: typography.small,
    color: colors.textMuted,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  value: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: '600',
  },

  timestamp: {
    fontSize: typography.small,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
    backgroundColor: colors.surfaceSoft,
    marginBottom: spacing.md,
  },

  listContent: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },

  listItem: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },

  listItemTitle: {
    fontSize: typography.body,
    color: colors.text,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },

  listItemSubtitle: {
    fontSize: typography.small,
    color: colors.textMuted,
  },

  // -------- estilos específicos para o menu de início --------
  homeLogoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  homeLogo: {
    width: 120,
    height: 120,
    borderRadius: 32,
    marginBottom: spacing.md,
  },

  homeAppName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 1,
  },

  homeAppSubtitle: {
    fontSize: typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  homeButtonsContainer: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },

  menuButton: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 5,
  },

  menuButtonText: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '600',
  },

  menuButtonHint: {
    color: colors.textMuted,
    fontSize: typography.small,
  },
});

export default globalStyles;
