// theme/styles.js
import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0F172A',     // fundo geral
  surface: '#111827',        // cards / superfícies
  primary: '#3B82F6',        // azul principal
  primarySoft: '#1D4ED8',
  text: '#E5E7EB',           // texto principal
  textMuted: '#9CA3AF',      // texto secundário
  border: '#1F2937',         // bordas
  danger: '#F97373',
  success: '#22C55E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

export const typography = {
  title: 22,
  subtitle: 16,
  body: 14,
  small: 12,
};

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  title: {
    fontSize: typography.title,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  label: {
    fontSize: typography.small,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  value: {
    fontSize: typography.subtitle,
    color: colors.text,
    fontWeight: '500',
  },

  timestamp: {
    fontSize: typography.small,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    fontSize: typography.body,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },

  listContent: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },

  listItem: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  listItemTitle: {
    fontSize: typography.body,
    color: colors.text,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },

  listItemSubtitle: {
    fontSize: typography.small,
    color: colors.textMuted,
  },
});

export default globalStyles;
