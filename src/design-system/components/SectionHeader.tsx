import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { spacing, typography } from '../tokens';

type Props = {
  title: string;
  action?: { label: string; onPress: () => void };
  accent?: string;
};

export function SectionHeader({ title, action, accent }: Props) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: t.text }]}>{title}</Text>
      {action ? (
        <Pressable onPress={action.onPress}>
          <Text style={[styles.action, { color: accent ?? t.textMuted }]}>{action.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  title: { ...typography.titleL },
  action: { ...typography.bodyBold },
});
