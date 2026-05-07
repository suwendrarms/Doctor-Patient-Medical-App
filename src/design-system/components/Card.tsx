import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import { radii, shadow, spacing } from '../tokens';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
};

export function Card({ children, style, padded = true }: Props) {
  const t = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: t.card, borderColor: t.border },
        padded && { padding: spacing.lg },
        shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
