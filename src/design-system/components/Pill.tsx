import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { radii, spacing, typography } from '../tokens';

type Tone = 'success' | 'warning' | 'critical' | 'info' | 'neutral' | 'accent';

type Props = {
  label: string;
  tone?: Tone;
  accent?: string;
  style?: ViewStyle;
};

const toneMap: Record<Tone, { bg: string; fg: string }> = {
  success: { bg: '#D1FAE5', fg: '#065F46' },
  warning: { bg: '#FEF3C7', fg: '#92400E' },
  critical: { bg: '#FEE2E2', fg: '#991B1B' },
  info: { bg: '#DBEAFE', fg: '#1E40AF' },
  neutral: { bg: '#E2E8F0', fg: '#0F172A' },
  accent: { bg: '#EEF2FF', fg: '#4338CA' },
};

export function Pill({ label, tone = 'neutral', accent, style }: Props) {
  const { bg, fg } = toneMap[tone];
  const finalBg = accent ? accent + '22' : bg;
  const finalFg = accent ?? fg;
  return (
    <View style={[styles.pill, { backgroundColor: finalBg }, style]}>
      <Text style={[styles.label, { color: finalFg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  label: { ...typography.caption, letterSpacing: 0.4 },
});
