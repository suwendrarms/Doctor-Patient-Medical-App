import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { spacing } from '../tokens';

type Props = {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
};

export function ScreenContainer({ children, scroll = true, padded = true, style }: Props) {
  const t = useTheme();
  const inner = (
    <View style={[padded && { paddingHorizontal: spacing.lg, paddingBottom: spacing['3xl'] }, style]}>
      {children}
    </View>
  );
  return (
    <SafeAreaView edges={['top']} style={[styles.flex, { backgroundColor: t.bg }]}>
      {scroll ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing['3xl'] }}>
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
