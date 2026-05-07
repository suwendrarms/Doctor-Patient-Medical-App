import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { spacing, typography } from '../tokens';

type Props = {
  icon: React.ReactNode;
  title: string;
  message?: string;
  cta?: React.ReactNode;
};

export function EmptyState({ icon, title, message, cta }: Props) {
  const t = useTheme();
  return (
    <View style={styles.wrap}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={[styles.title, { color: t.text }]}>{title}</Text>
      {message ? <Text style={[styles.msg, { color: t.textMuted }]}>{message}</Text> : null}
      {cta ? <View style={{ marginTop: spacing.lg }}>{cta}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: spacing['2xl'], gap: spacing.sm },
  iconWrap: { marginBottom: spacing.sm },
  title: { ...typography.titleL, textAlign: 'center' },
  msg: { ...typography.body, textAlign: 'center', maxWidth: 280 },
});
