import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Sun, Moon, Smartphone } from 'lucide-react-native';
import { useTheme, useThemePref, ThemePref } from '../theme';
import { typography } from '../tokens';

const opts: { code: ThemePref; label: string; icon: any }[] = [
  { code: 'system', label: 'System', icon: Smartphone },
  { code: 'light', label: 'Light', icon: Sun },
  { code: 'dark', label: 'Dark', icon: Moon },
];

export function ThemeModeToggle({ accent }: { accent: string }) {
  const t = useTheme();
  const { pref, setPref } = useThemePref();
  return (
    <View style={[styles.row, { borderColor: t.border, backgroundColor: t.bgAlt }]}>
      {opts.map((o) => {
        const active = pref === o.code;
        const Icon = o.icon;
        return (
          <Pressable
            key={o.code}
            onPress={() => setPref(o.code)}
            style={[styles.btn, { backgroundColor: active ? accent : 'transparent' }]}
          >
            <Icon size={14} color={active ? '#fff' : t.text} />
            <Text style={[typography.caption, { color: active ? '#fff' : t.text, fontWeight: '600' }]}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderRadius: 999, padding: 3, borderWidth: 1, gap: 4 },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
});
