// theme/styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  background: '#F9FAFB',      // mais claro
  surface: '#FFFFFF',
  surfaceSoft: '#ECFEFF',     // leve azul/teal muito claro
  primary: '#0D9488',         // teal
  primarySoft: '#14B8A6',
  accent: '#22C55E',          // verde
  text: '#0F172A',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  danger: '#DC2626',
  success: '#16A34A',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  title: 26,
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

  // Títulos com um pouco mais de personalidade
  title: {
    fontSize: typography.title,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },

  subtitle: {
    fontSize: typography.body,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
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
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
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

  // Home
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
    fontSize: 24,
    fontWeight: '800',
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
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },

  menuButtonText: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: '700',
  },

  menuButtonHint: {
    color: colors.textMuted,
    fontSize: typography.small,
  },
});

export default globalStyles;
