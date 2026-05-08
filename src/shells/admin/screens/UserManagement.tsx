import React, { useState } from 'react';
import { Pressable, Text, View, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  ListRow,
  Avatar,
  Pill,
  PrimaryButton,
  SectionHeader,
  useToast,
  useConfirm,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';
import { Search, UserPlus } from 'lucide-react-native';

export function UserManagement() {
  const t = useTheme();
  const role = roleThemes.admin;
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();

  const users = useStore((s) => s.users);
  const setUserStatus = useStore((s) => s.setUserStatus);

  const [q, setQ] = useState('');
  const list = users.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.role.toLowerCase().includes(q.toLowerCase()),
  );

  const onToggleStatus = async (id: string, name: string, current: string) => {
    const ok = await confirm.ask({
      title: current === 'ACTIVE' ? `Deactivate ${name}?` : `Activate ${name}?`,
      message:
        current === 'ACTIVE'
          ? 'They will lose access until reactivated.'
          : 'They will be able to sign in immediately.',
      confirmLabel: current === 'ACTIVE' ? 'Deactivate' : 'Activate',
      destructive: current === 'ACTIVE',
    });
    if (!ok) return;
    setUserStatus(id, current === 'ACTIVE' ? 'INVITED' : 'ACTIVE');
    toast.show(
      `${name} ${current === 'ACTIVE' ? 'deactivated' : 'activated'}`,
      current === 'ACTIVE' ? 'warning' : 'success',
    );
  };

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Users & Roles</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Manage staff, roles and permissions across branches.
      </Text>

      <View style={[styles.search, { backgroundColor: t.card, borderColor: t.border }]}>
        <Search color={t.textMuted} size={18} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search name, role, or branch"
          placeholderTextColor={t.textMuted}
          style={[typography.body, { flex: 1, color: t.text, padding: 0 }]}
        />
      </View>

      <SectionHeader title={`${list.length} users`} accent={role.accent} />
      {list.map((u) => (
        <Pressable key={u.id} onPress={() => onToggleStatus(u.id, u.name, u.status)}>
          <ListRow
            title={u.name}
            subtitle={`${u.role} - ${u.branch}`}
            leading={<Avatar name={u.name} gradient={[role.gradientFrom, role.gradientTo]} />}
            trailing={
              <Pill label={u.status} tone={u.status === 'ACTIVE' ? 'success' : 'warning'} />
            }
            onPress={() => onToggleStatus(u.id, u.name, u.status)}
          />
        </Pressable>
      ))}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Invite user"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<UserPlus color="#fff" size={18} />}
        onPress={() => router.push('/add-user')}
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
    marginTop: spacing.lg,
  },
});
