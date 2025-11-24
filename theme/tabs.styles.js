// theme/tabs.styles.js
import { StyleSheet } from 'react-native';
import { colors } from './styles';

export const tabsTheme = {
  active: colors.primary,
  inactive: colors.textMuted,
  background: '#FFFFFF',
  borderTop: colors.border,
};

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: tabsTheme.background,
    borderTopColor: tabsTheme.borderTop,
    borderTopWidth: 1,
    height: 60,
  },
});
