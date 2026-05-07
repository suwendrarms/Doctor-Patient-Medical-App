import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { radii, shadow, spacing, typography } from '../tokens';

type Props = {
  label: string;
  onPress?: () => void;
  gradient?: [string, string];
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'solid' | 'soft' | 'outline';
  accent?: string;
};

export function PrimaryButton({
  label,
  onPress,
  gradient,
  icon,
  disabled,
  style,
  variant = 'solid',
  accent = '#6366F1',
}: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onPress?.();
  };

  if (variant === 'solid' && gradient) {
    return (
      <Pressable onPress={handlePress} disabled={disabled} style={({ pressed }) => [pressed && styles.pressed]}>
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.btn, shadow.card, disabled && styles.disabled, style]}
        >
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text style={[styles.label, { color: '#fff' }]}>{label}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === 'soft') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.btn,
          { backgroundColor: accent + '22' },
          pressed && styles.pressed,
          disabled && styles.disabled,
          style,
        ]}
      >
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[styles.label, { color: accent }]}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        styles.outline,
        { borderColor: accent },
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.label, { color: accent }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  label: { ...typography.bodyBold },
  icon: { marginRight: 0 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.5 },
});
