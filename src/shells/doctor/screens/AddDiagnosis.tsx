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
import { Search, Plus, Mic, AlertTriangle } from 'lucide-react-native';

const suggestions = [
  { code: 'E11.9', name: 'Type 2 diabetes mellitus, w/o complications' },
  { code: 'I10', name: 'Essential (primary) hypertension' },
  { code: 'J06.9', name: 'Acute upper respiratory infection' },
  { code: 'L20.9', name: 'Atopic dermatitis, unspecified' },
];

export function AddDiagnosis() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.doctor;
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<{ code: string; name: string } | null>(null);
  const [notes, setNotes] = useState('');

  const filtered = suggestions.filter(
    (s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.code.includes(q.toUpperCase()),
  );

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Add Diagnosis</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Patient: Saman Kumara - Visit #2210
      </Text>

      <SectionHeader title="Search ICD-10 / SNOMED" accent={role.accent} />
      <View style={[styles.search, { backgroundColor: t.card, borderColor: t.border }]}>
        <Search color={t.textMuted} size={18} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="e.g. diabetes, J06"
          placeholderTextColor={t.textMuted}
          style={[typography.body, { flex: 1, color: t.text, padding: 0 }]}
        />
      </View>

      <View style={{ height: spacing.sm }} />
      {filtered.map((s) => (
        <Pill
          key={s.code}
          label={`${s.code} - ${s.name}`}
          tone={selected?.code === s.code ? 'success' : 'accent'}
          style={{ marginBottom: spacing.sm }}
        />
      ))}

      {q && filtered.length === 0 ? (
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <AlertTriangle size={20} color="#F59E0B" />
            <View style={{ flex: 1 }}>
              <Text style={[typography.bodyBold, { color: t.text }]}>No match for "{q}"</Text>
              <Text style={[typography.caption, { color: t.textMuted }]}>
                Add as a new master entry. Routes to clinical lead for review.
              </Text>
            </View>
            <PrimaryButton
              label="Add"
              variant="soft"
              accent={role.accent}
              icon={<Plus size={14} color={role.accent} />}
              onPress={() => setSelected({ code: 'PENDING', name: q })}
            />
          </View>
        </Card>
      ) : null}

      <SectionHeader title="Clinical notes" accent={role.accent} />
      <Card>
        <View style={styles.notesRow}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Onset, character, exam findings..."
            placeholderTextColor={t.textMuted}
            multiline
            style={[
              typography.body,
              { color: t.text, minHeight: 100, textAlignVertical: 'top', flex: 1 },
            ]}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
          <PrimaryButton
            label="Voice notes"
            variant="soft"
            accent={role.accent}
            icon={<Mic size={16} color={role.accent} />}
            onPress={() => {}}
            style={{ flex: 1 }}
          />
        </View>
      </Card>

      <SectionHeader title="Decision support" accent={role.accent} />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <AlertTriangle size={20} color="#F59E0B" />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>
            Patient has Penicillin allergy - check before issuing antibiotics.
          </Text>
        </View>
      </Card>

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Save diagnosis"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        onPress={() => router.back()}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton
        label="Save & issue prescription"
        variant="outline"
        accent={role.accent}
        onPress={() => router.replace('/(doctor)/issue-prescription')}
      />
    </ScreenContainer>
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
  notesRow: { flexDirection: 'row' },
});
