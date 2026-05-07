import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from './Card';
import { useTheme } from '../theme';
import { spacing, typography } from '../tokens';

type Props = {
  label: string;
  value: string | number;
  delta?: string;
  accent?: string;
  icon?: React.ReactNode;
};

export function StatCard({ label, value, delta, accent, icon }: Props) {
  const t = useTheme();
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: t.textMuted }]}>{label}</Text>
        {icon}
      </View>
      <Text style={[styles.value, { color: t.text }]}>{value}</Text>
      {delta ? (
        <Text style={[styles.delta, { color: accent ?? t.textMuted }]}>{delta}</Text>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, gap: spacing.xs },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { ...typography.caption, letterSpacing: 0.6 },
  value: { ...typography.displayL, marginTop: spacing.xs },
  delta: { ...typography.caption, marginTop: spacing.xs },
});
