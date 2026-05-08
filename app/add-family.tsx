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

const relations = ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Sibling', 'Guardian', 'Other'];

export default function AddFamily() {
  const t = useTheme();
  const role = roleThemes.patient;
  const router = useRouter();
  const toast = useToast();
  const addFamily = useStore((s) => s.addFamilyMember);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Spouse');
  const [age, setAge] = useState('');

  const ageOk = /^\d{1,3}$/.test(age);
  const ok = name.trim().length > 1 && ageOk;

  const submit = () => {
    if (!ok) return;
    addFamily({ name: name.trim(), relation, age: parseInt(age, 10) });
    toast.show(`${name.trim()} added`, 'success');
    router.back();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Linked dependent profiles let you book and view care for family members.
      </Text>

      <SectionHeader title="Name" accent={role.accent} />
      <Card>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor={t.textMuted}
          style={[typography.titleM, { color: t.text, padding: 0 }]}
        />
      </Card>

      <SectionHeader title="Relationship" accent={role.accent} />
      <View style={styles.chips}>
        {relations.map((r) => (
          <Pressable
            key={r}
            onPress={() => setRelation(r)}
            style={[
              styles.chip,
              {
                backgroundColor: relation === r ? role.accent : t.card,
                borderColor: relation === r ? role.accent : t.border,
              },
            ]}
          >
            <Text
              style={[
                typography.caption,
                { fontWeight: '600', color: relation === r ? '#fff' : t.text },
              ]}
            >
              {r}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Age" accent={role.accent} />
      <Card>
        <TextInput
          value={age}
          onChangeText={(v) => setAge(v.replace(/\D/g, '').slice(0, 3))}
          placeholder="e.g. 32"
          placeholderTextColor={t.textMuted}
          keyboardType="number-pad"
          style={[typography.titleM, { color: t.text, padding: 0 }]}
        />
      </Card>

      <View style={{ height: spacing.lg }} />
      {!ok ? <Pill label="Fill name and age to continue" tone="warning" /> : null}

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Add to family"
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
