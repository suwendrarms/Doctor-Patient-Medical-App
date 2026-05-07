import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import {
  ScreenContainer,
  ListRow,
  Avatar,
  Pill,
  PrimaryButton,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { userManagementSeed } from '../../../data/fixtures';
import { Search, UserPlus } from 'lucide-react-native';

export function UserManagement() {
  const t = useTheme();
  const role = roleThemes.admin;
  const [q, setQ] = useState('');
  const list = userManagementSeed.filter(
    (u) => u.name.toLowerCase().includes(q.toLowerCase()) || u.role.toLowerCase().includes(q.toLowerCase()),
  );

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
        <ListRow
          key={u.id}
          title={u.name}
          subtitle={`${u.role} - ${u.branch}`}
          leading={<Avatar name={u.name} gradient={[role.gradientFrom, role.gradientTo]} />}
          trailing={
            <Pill label={u.status} tone={u.status === 'ACTIVE' ? 'success' : 'warning'} />
          }
          onPress={() => {}}
        />
      ))}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Invite user"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<UserPlus color="#fff" size={18} />}
        onPress={() => {}}
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
