import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  SectionHeader,
  Pill,
  useToast,
} from '../src/design-system/components';
import { roleThemes, spacing, typography, radii } from '../src/design-system/tokens';
import { useTheme } from '../src/design-system/theme';
import { useStore } from '../src/store';
import { useAuth } from '../src/auth/AuthContext';

const masters = [
  'medication_master',
  'disease_master',
  'lab_test_master',
  'allergen_master',
  'vaccine_master',
];

export default function AddMaster() {
  const t = useTheme();
  const role = roleThemes.admin;
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const addMasterRequest = useStore((s) => s.addMasterRequest);
  const [masterIdx, setMasterIdx] = useState(0);
  const [title, setTitle] = useState('');

  const ok = title.trim().length > 1;

  const submit = () => {
    if (!ok) return;
    addMasterRequest({
      title: title.trim(),
      requestedBy: user?.name ?? 'Admin',
      status: 'AUTO_APPROVED',
    });
    toast.show('Master entry added', 'success');
    router.back();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Add a new entry directly. This bypasses the request queue and auto-approves with audit.
      </Text>

      <SectionHeader title="Catalogue" accent={role.accent} />
      <View style={styles.chips}>
        {masters.map((m, i) => (
          <Pressable
            key={m}
            onPress={() => setMasterIdx(i)}
            style={[
              styles.chip,
              {
                backgroundColor: masterIdx === i ? role.accent : t.card,
                borderColor: masterIdx === i ? role.accent : t.border,
              },
            ]}
          >
            <Text
              style={[
                typography.caption,
                { fontWeight: '600', color: masterIdx === i ? '#fff' : t.text },
              ]}
            >
              {m}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Entry name / code" accent={role.accent} />
      <Card>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Zentilex 500mg or A92.5"
          placeholderTextColor={t.textMuted}
          style={[typography.titleM, { color: t.text, padding: 0 }]}
        />
      </Card>

      {!ok ? (
        <View style={{ marginTop: spacing.lg }}>
          <Pill label="Type a name to continue" tone="warning" />
        </View>
      ) : null}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Save entry"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        onPress={submit}
        disabled={!ok}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton label="Cancel" variant="outline" accent={role.accent} onPress={() => router.back()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.pill, borderWidth: 1.5 },
});
