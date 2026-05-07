import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { typography } from '../tokens';

type Props = {
  name: string;
  size?: number;
  gradient?: [string, string];
};

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, size = 44, gradient = ['#6366F1', '#38BDF8'] }: Props) {
  return (
    <LinearGradient
      colors={gradient}
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <View
        style={[
          styles.inner,
          { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 },
        ]}
      >
        <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initialsOf(name)}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { ...typography.bodyBold, color: '#0F172A' },
});
