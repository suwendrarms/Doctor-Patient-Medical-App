import React from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  ListRow,
  SectionHeader,
  useToast,
  useConfirm,
  ThemeModeToggle,
} from '../../../design-system/components';
import { useStore } from '../../../store';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import {
  Building2,
  Flag,
  ShieldCheck,
  Database,
  LogOut,
  Webhook,
  ChevronRight,
  FileSearch,
  Moon,
} from 'lucide-react-native';

export function AdminSettings() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.admin;
  const { signOut } = useAuth();
  const toast = useToast();
  const confirm = useConfirm();
  const branches = useStore((s) => s.branches);
  const flags = useStore((s) => s.flags);
  const toggleFlag = useStore((s) => s.toggleFlag);

  const toggle = (code: string) => {
    toggleFlag(code);
    const f = flags.find((x) => x.code === code);
    toast.show(`${code} ${f?.enabled ? 'disabled' : 'enabled'}`, 'success');
  };

  const onSignOut = async () => {
    const ok = await confirm.ask({ title: 'Sign out?', confirmLabel: 'Sign out' });
    if (!ok) return;
    signOut();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Settings</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Branches, feature flags, integrations, retention and audit.
      </Text>

      <SectionHeader title="Branches" accent={role.accent} action={{ label: '+ Add', onPress: () => toast.show('Add-branch flow coming soon', 'info') }} />
      {branches.map((b) => (
        <ListRow
          key={b.id}
          title={b.name}
          subtitle={`${b.code} - ${b.users} users`}
          leading={<Building2 color={role.accent} size={22} />}
          trailing={
            <Pill
              label={b.status}
              tone={b.status === 'ACTIVE' ? 'success' : 'warning'}
            />
          }
          onPress={() => toast.show(`${b.name} - ${b.code}`, 'info')}
        />
      ))}

      <SectionHeader title="Appearance" accent={role.accent} />
      <Card>
        <View style={styles.flagRow}>
          <Moon size={20} color={role.accent} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: t.text }]}>Theme</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              Currently {t.mode === 'dark' ? 'Dark' : 'Light'} mode
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 4, paddingBottom: spacing.xs }}>
          <ThemeModeToggle accent={role.accent} />
        </View>
      </Card>

      <SectionHeader title="Feature flags" accent={role.accent} />
      <Card>
        {flags.map((f, i) => (
          <View key={f.code}>
            <View style={styles.flagRow}>
              <Flag size={20} color={role.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.bodyBold, { color: t.text }]}>{f.code}</Text>
                <Text style={[typography.caption, { color: t.textMuted }]}>{f.description}</Text>
              </View>
              <Switch
                value={f.enabled}
                onValueChange={() => toggle(f.code)}
                trackColor={{ true: role.accent }}
              />
            </View>
            {i < flags.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </Card>

      <SectionHeader title="Integrations" accent={role.accent} />
      <Card>
        <NavRow icon={<Webhook color={role.accent} size={20} />} label="Lab integrations (FHIR)" status="Connected" />
        <Divider />
        <NavRow icon={<Webhook color={role.accent} size={20} />} label="Pharmacy partners" status="3 active" />
        <Divider />
        <NavRow icon={<Webhook color={role.accent} size={20} />} label="SMS / Email gateway" status="Healthy" />
      </Card>

      <SectionHeader title="Security & compliance" accent={role.accent} />
      <Card>
        <NavRow icon={<ShieldCheck color={role.accent} size={20} />} label="Audit log retention" status="3 years" />
        <Divider />
        <NavRow icon={<Database color={role.accent} size={20} />} label="Backup & DR runbook" status="OK" />
        <Divider />
        <ListRow
          title="Audit Log Viewer"
          subtitle="Search and export event records"
          leading={<FileSearch color={role.accent} size={22} />}
          onPress={() => router.push('/(admin)/audit')}
        />
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Sign out"
        variant="outline"
        accent="#EF4444"
        icon={<LogOut size={18} color="#EF4444" />}
        onPress={onSignOut}
      />
    </ScreenContainer>
  );
}

function NavRow({ icon, label, status }: { icon: React.ReactNode; label: string; status: string }) {
  const t = useTheme();
  return (
    <View style={styles.navRow}>
      {icon}
      <Text style={[typography.body, { color: t.text, flex: 1 }]}>{label}</Text>
      <Text style={[typography.caption, { color: t.textMuted }]}>{status}</Text>
      <ChevronRight size={18} color={t.textMuted} />
    </View>
  );
}

function Divider() {
  const t = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: t.border, marginVertical: 4 }} />;
}

const styles = StyleSheet.create({
  flagRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
});
