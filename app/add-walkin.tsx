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

const docs = ['Dr. Samanthi Fernando', 'Dr. Asanka Bandara'];

export default function AddWalkIn() {
  const t = useTheme();
  const role = roleThemes.reception;
  const router = useRouter();
  const toast = useToast();
  const addQueue = useStore((s) => s.addQueueEntry);
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [docIdx, setDocIdx] = useState(0);

  const ok = name.trim().length > 1;

  const submit = () => {
    if (!ok) return;
    const entry = addQueue({
      patientName: name.trim(),
      reason: reason.trim() || 'Walk-in',
      arrivedAt: 'just now',
      severity: 2,
      status: 'WAITING',
      doctor: docs[docIdx],
    });
    toast.show(`Token #${entry.number} - ${entry.patientName}`, 'success');
    router.back();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Quick add for patients who walk in without an appointment.
      </Text>

      <SectionHeader title="Patient name" accent={role.accent} />
      <Card>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor={t.textMuted}
          style={[typography.titleM, { color: t.text, padding: 0 }]}
        />
      </Card>

      <SectionHeader title="Reason" accent={role.accent} />
      <Card>
        <TextInput
          value={reason}
          onChangeText={setReason}
          placeholder="e.g. fever, follow-up"
          placeholderTextColor={t.textMuted}
          style={[typography.body, { color: t.text, padding: 0 }]}
        />
      </Card>

      <SectionHeader title="Assign to doctor" accent={role.accent} />
      <View style={{ gap: spacing.sm }}>
        {docs.map((d, i) => (
          <Pressable key={d} onPress={() => setDocIdx(i)}>
            <Card
              style={{
                borderColor: docIdx === i ? role.accent : t.border,
                borderWidth: docIdx === i ? 1.5 : StyleSheet.hairlineWidth,
              }}
            >
              <View style={styles.row}>
                <Text style={[typography.titleM, { color: t.text, flex: 1 }]}>{d}</Text>
                {docIdx === i ? <Pill label="Selected" tone="success" /> : null}
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      {!ok ? (
        <View style={{ marginTop: spacing.lg }}>
          <Pill label="Patient name is required" tone="warning" />
        </View>
      ) : null}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Add to queue"
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
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
