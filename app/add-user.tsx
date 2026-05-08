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

const roles = ['Doctor', 'Nurse', 'Reception', 'Admin'];

export default function AddUser() {
  const t = useTheme();
  const role = roleThemes.admin;
  const router = useRouter();
  const toast = useToast();
  const addUser = useStore((s) => s.addUser);
  const branches = useStore((s) => s.branches);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pickedRole, setPickedRole] = useState('Doctor');
  const [branchIdx, setBranchIdx] = useState(0);

  const emailOk = /\S+@\S+\.\S+/.test(email);
  const ok = name.trim().length > 1 && emailOk && branches.length > 0;

  const submit = () => {
    if (!ok) return;
    addUser({
      name: name.trim(),
      role: pickedRole,
      branch: branches[branchIdx]?.name ?? 'HQ',
      status: 'INVITED',
    });
    toast.show(`Invite sent to ${email}`, 'success');
    router.back();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Send an email invitation. The user signs in via OTP and accepts the role.
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

      <SectionHeader title="Email" accent={role.accent} />
      <Card>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="user@medix.lk"
          placeholderTextColor={t.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          style={[typography.titleM, { color: t.text, padding: 0 }]}
        />
      </Card>

      <SectionHeader title="Role" accent={role.accent} />
      <View style={styles.chips}>
        {roles.map((r) => (
          <Pressable
            key={r}
            onPress={() => setPickedRole(r)}
            style={[
              styles.chip,
              {
                backgroundColor: pickedRole === r ? role.accent : t.card,
                borderColor: pickedRole === r ? role.accent : t.border,
              },
            ]}
          >
            <Text
              style={[
                typography.bodyBold,
                { color: pickedRole === r ? '#fff' : t.text },
              ]}
            >
              {r}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Branch" accent={role.accent} />
      <View style={styles.chips}>
        {branches.map((b, i) => (
          <Pressable
            key={b.id}
            onPress={() => setBranchIdx(i)}
            style={[
              styles.chip,
              {
                backgroundColor: branchIdx === i ? role.accent : t.card,
                borderColor: branchIdx === i ? role.accent : t.border,
              },
            ]}
          >
            <Text
              style={[
                typography.bodyBold,
                { color: branchIdx === i ? '#fff' : t.text },
              ]}
            >
              {b.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {!ok ? (
        <View style={{ marginTop: spacing.lg }}>
          <Pill label="Name and a valid email are required" tone="warning" />
        </View>
      ) : null}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Send invite"
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
