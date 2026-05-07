import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Card } from './Card';
import { useTheme } from '../theme';
import { spacing, typography } from '../tokens';

type Props = {
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onPress?: () => void;
};

export function ListRow({ title, subtitle, meta, leading, trailing, onPress }: Props) {
  const t = useTheme();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [pressed && { opacity: 0.85 }]}>
      <Card style={styles.row}>
        {leading ? <View style={styles.leading}>{leading}</View> : null}
        <View style={styles.flex}>
          <Text style={[styles.title, { color: t.text }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: t.textMuted }]} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
          {meta ? <Text style={[styles.meta, { color: t.textMuted }]}>{meta}</Text> : null}
        </View>
        {trailing ?? <ChevronRight size={20} color={t.textMuted} />}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  leading: { marginRight: spacing.xs },
  flex: { flex: 1, gap: 2 },
  title: { ...typography.titleM },
  subtitle: { ...typography.body, marginTop: 2 },
  meta: { ...typography.caption, marginTop: 2 },
});
