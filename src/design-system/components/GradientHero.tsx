import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RoleTheme } from '../tokens';
import { radii, spacing, typography } from '../tokens';

type Props = {
  role: RoleTheme;
  greeting: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  style?: ViewStyle;
  children?: React.ReactNode;
};

export function GradientHero({ role, greeting, subtitle, rightSlot, style, children }: Props) {
  return (
    <LinearGradient
      colors={[role.gradientFrom, role.gradientTo]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.hero, style]}
    >
      <View style={styles.row}>
        <View style={styles.flex}>
          <Text style={styles.greetingTag}>{role.label.toUpperCase()}</Text>
          <Text style={styles.greeting}>{greeting}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightSlot}
      </View>
      {children ? <View style={{ marginTop: spacing.lg }}>{children}</View> : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  flex: { flex: 1 },
  greetingTag: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1.4,
    marginBottom: spacing.sm,
  },
  greeting: {
    ...typography.displayL,
    color: '#fff',
  },
  subtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.92)',
    marginTop: spacing.xs,
  },
});
