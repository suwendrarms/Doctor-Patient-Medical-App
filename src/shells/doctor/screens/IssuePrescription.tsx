import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { Search, Plus, Trash2, Pill as PillIcon, Send } from 'lucide-react-native';

type RxItem = {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  duration: string;
};

const drugSuggestions = ['Metformin 500mg', 'Atorvastatin 10mg', 'Losartan 50mg', 'Amoxicillin 500mg'];
const frequencies = ['OD', 'BD', 'TDS', 'QID', 'SOS', 'HS'];

export function IssuePrescription() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.doctor;
  const [items, setItems] = useState<RxItem[]>([
    { id: 'rx-new-1', name: 'Metformin 500mg', dose: '1 tablet', frequency: 'BD', duration: '30 days' },
  ]);
  const [q, setQ] = useState('');

  const addItem = (name: string) => {
    setItems((prev) => [
      ...prev,
      { id: `rx-${Date.now()}`, name, dose: '1 tablet', frequency: 'OD', duration: '30 days' },
    ]);
    setQ('');
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const update = (id: string, field: keyof RxItem, value: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Issue e-Prescription</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Patient: Saman Kumara - Visit #2210
      </Text>

      <SectionHeader title="Add medication" accent={role.accent} />
      <View style={[styles.search, { backgroundColor: t.card, borderColor: t.border }]}>
        <Search color={t.textMuted} size={18} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Type medication..."
          placeholderTextColor={t.textMuted}
          style={[typography.body, { flex: 1, color: t.text, padding: 0 }]}
        />
      </View>

      <View style={[styles.suggestions]}>
        {drugSuggestions
          .filter((d) => d.toLowerCase().includes(q.toLowerCase()))
          .map((d) => (
            <Pill
              key={d}
              label={`+ ${d}`}
              tone="accent"
              accent={role.accent}
              style={{ marginRight: spacing.sm, marginBottom: spacing.sm }}
            />
          ))}
        {q && !drugSuggestions.some((d) => d.toLowerCase() === q.toLowerCase()) ? (
          <Pill
            label={`+ Add new: ${q}`}
            tone="warning"
            style={{ marginRight: spacing.sm, marginBottom: spacing.sm }}
          />
        ) : null}
      </View>

      <PrimaryButton
        label="Add to prescription"
        variant="soft"
        accent={role.accent}
        icon={<Plus size={16} color={role.accent} />}
        onPress={() => q && addItem(q)}
        disabled={!q}
      />

      <SectionHeader title="Items" accent={role.accent} />
      {items.map((it) => (
        <View key={it.id} style={{ marginBottom: spacing.md }}>
          <Card>
            <View style={styles.itemHeader}>
              <PillIcon color={role.accent} size={20} />
              <Text style={[typography.titleM, { color: t.text, flex: 1 }]}>{it.name}</Text>
              <Trash2 size={18} color="#EF4444" onPress={() => remove(it.id)} />
            </View>
            <View style={styles.itemFields}>
              <Field label="Dose" value={it.dose} onChange={(v) => update(it.id, 'dose', v)} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.caption, { color: t.textMuted }]}>FREQUENCY</Text>
                <View style={styles.freqRow}>
                  {frequencies.map((f) => (
                    <Pill
                      key={f}
                      label={f}
                      tone={it.frequency === f ? 'success' : 'neutral'}
                      style={{ marginRight: 6, marginTop: 4 }}
                    />
                  ))}
                </View>
              </View>
              <Field label="Duration" value={it.duration} onChange={(v) => update(it.id, 'duration', v)} />
            </View>
          </Card>
        </View>
      ))}

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Sign & send to pharmacy"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Send color="#fff" size={18} />}
        onPress={() => router.back()}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton label="Save as draft" variant="outline" accent={role.accent} onPress={() => {}} />
    </ScreenContainer>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const t = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>
        {label.toUpperCase()}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        style={[typography.bodyBold, { color: t.text, padding: 0, marginTop: 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.sm },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  itemFields: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  freqRow: { flexDirection: 'row', flexWrap: 'wrap' },
});
