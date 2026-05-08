import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Avatar,
  SectionHeader,
  ListRow,
  Pill,
  useToast,
  useConfirm,
  ThemeModeToggle,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { useStore } from '../../../store';
import {
  Globe,
  Moon,
  Bell,
  ShieldCheck,
  UserPlus,
  LogOut,
  ChevronRight,
  Trash2,
} from 'lucide-react-native';

const languages = ['English', 'සිංහල', 'தமிழ்'];

export function PatientProfile() {
  const t = useTheme();
  const role = roleThemes.patient;
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();
  const { user, signOut } = useAuth();

  const family = useStore((s) => s.family);
  const consents = useStore((s) => s.consents);
  const removeFamily = useStore((s) => s.removeFamilyMember);
  const revokeConsent = useStore((s) => s.revokeConsent);

  const [lang, setLang] = useState('English');
  const [pushOn, setPushOn] = useState(true);
  const [autoRefill, setAutoRefill] = useState(false);

  const onRemoveFamily = async (id: string, name: string) => {
    const ok = await confirm.ask({
      title: `Remove ${name}?`,
      message: 'They will no longer appear in your dependents list.',
      confirmLabel: 'Remove',
      destructive: true,
    });
    if (!ok) return;
    removeFamily(id);
    toast.show(`${name} removed`, 'info');
  };

  const onRevokeConsent = async (id: string, grantedTo: string) => {
    const ok = await confirm.ask({
      title: `Revoke consent for ${grantedTo}?`,
      message: 'They will no longer be able to access your record under this scope.',
      confirmLabel: 'Revoke',
      destructive: true,
    });
    if (!ok) return;
    revokeConsent(id);
    toast.show(`Consent revoked for ${grantedTo}`, 'success');
  };

  const onSignOut = async () => {
    const ok = await confirm.ask({
      title: 'Sign out?',
      message: 'You will need to log in again on this device.',
      confirmLabel: 'Sign out',
    });
    if (!ok) return;
    signOut();
  };

  return (
    <ScreenContainer>
      <Card>
        <View style={styles.header}>
          <Avatar name={user?.name ?? 'P'} size={64} gradient={[role.gradientFrom, role.gradientTo]} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleL, { color: t.text }]}>{user?.name}</Text>
            <Text style={[typography.body, { color: t.textMuted }]}>{user?.branch}</Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
              <Pill label="Verified" tone="success" />
              <Pill label="Insured" tone="info" />
            </View>
          </View>
        </View>
      </Card>

      <SectionHeader
        title="Personal"
        accent={role.accent}
        action={{ label: 'Edit', onPress: () => toast.show('Inline edit available next release', 'info') }}
      />
      <Card>
        <Field label="Date of birth" value="14 Mar 1985" />
        <Divider />
        <Field label="Blood group" value="O+" />
        <Divider />
        <Field label="NIC" value="198507312290" />
        <Divider />
        <Field label="Phone" value="+94 71 234 5678" />
        <Divider />
        <Field label="Email" value="nimal@example.lk" />
      </Card>

      <SectionHeader
        title="Family / dependents"
        accent={role.accent}
        action={{ label: '+ Add', onPress: () => router.push('/add-family') }}
      />
      {family.length === 0 ? (
        <Card>
          <Text style={[typography.body, { color: t.textMuted }]}>No dependents added yet.</Text>
        </Card>
      ) : (
        family.map((m) => (
          <ListRow
            key={m.id}
            title={m.name}
            subtitle={`${m.relation} - ${m.age} yrs`}
            leading={<Avatar name={m.name} gradient={[role.gradientFrom, role.gradientTo]} />}
            trailing={
              <Pressable onPress={() => onRemoveFamily(m.id, m.name)}>
                <Trash2 size={18} color="#EF4444" />
              </Pressable>
            }
            onPress={() => toast.show(`${m.name} - ${m.relation}`, 'info')}
          />
        ))
      )}

      <SectionHeader title="Consent log" accent={role.accent} />
      <Card>
        {consents.map((c, i) => (
          <View key={c.id}>
            <View style={styles.consentRow}>
              <ShieldCheck size={20} color={c.status === 'ACTIVE' ? role.accent : t.textMuted} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.bodyBold, { color: t.text }]}>{c.grantedTo}</Text>
                <Text style={[typography.caption, { color: t.textMuted }]}>
                  {c.scope} - until {c.validUntil}
                </Text>
              </View>
              {c.status === 'ACTIVE' ? (
                <Pressable onPress={() => onRevokeConsent(c.id, c.grantedTo)}>
                  <Pill label="Revoke" tone="critical" />
                </Pressable>
              ) : (
                <Pill label={c.status} tone="neutral" />
              )}
            </View>
            {i < consents.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </Card>

      <SectionHeader title="Preferences" accent={role.accent} />
      <Card>
        <View style={styles.prefRow}>
          <Globe size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Language</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {languages.map((l) => (
              <Pressable
                key={l}
                onPress={() => {
                  setLang(l);
                  toast.show(`Language set to ${l}`, 'success');
                }}
                style={[
                  styles.langChip,
                  {
                    backgroundColor: l === lang ? role.accent : t.bg,
                    borderColor: l === lang ? role.accent : t.border,
                  },
                ]}
              >
                <Text
                  style={[
                    typography.caption,
                    { color: l === lang ? '#fff' : t.text, fontWeight: '600' },
                  ]}
                >
                  {l}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Divider />
        <View style={styles.themeRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <Moon size={20} color={role.accent} />
            <Text style={[typography.body, { color: t.text, flex: 1 }]}>Appearance</Text>
            <Pill label={t.mode === 'dark' ? 'Dark' : 'Light'} tone="info" />
          </View>
          <View style={{ marginTop: spacing.sm }}>
            <ThemeModeToggle accent={role.accent} />
          </View>
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <Bell size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Push notifications</Text>
          <Switch
            value={pushOn}
            onValueChange={(v) => {
              setPushOn(v);
              toast.show(v ? 'Push enabled' : 'Push muted', 'info');
            }}
            trackColor={{ true: role.accent }}
          />
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <UserPlus size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Auto-request refill</Text>
          <Switch
            value={autoRefill}
            onValueChange={(v) => {
              setAutoRefill(v);
              toast.show(v ? 'Auto-refill on' : 'Auto-refill off', 'info');
            }}
            trackColor={{ true: role.accent }}
          />
        </View>
      </Card>

      <SectionHeader title="Help & legal" accent={role.accent} />
      <Card>
        <NavRow label="Privacy policy" onPress={() => toast.show('Privacy policy will open in browser', 'info')} />
        <Divider />
        <NavRow label="Terms of service" onPress={() => toast.show('Terms will open in browser', 'info')} />
        <Divider />
        <NavRow label="Contact support" onPress={() => toast.show('Support chat opening...', 'info')} />
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

function Field({ label, value }: { label: string; value: string }) {
  const t = useTheme();
  return (
    <View style={styles.field}>
      <Text style={[typography.body, { color: t.textMuted, flex: 1 }]}>{label}</Text>
      <Text style={[typography.bodyBold, { color: t.text }]}>{value}</Text>
    </View>
  );
}

function NavRow({ label, onPress }: { label: string; onPress: () => void }) {
  const t = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.navRow}>
      <Text style={[typography.body, { color: t.text, flex: 1 }]}>{label}</Text>
      <ChevronRight size={20} color={t.textMuted} />
    </Pressable>
  );
}

function Divider() {
  const t = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: t.border, marginVertical: 4 }} />;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  field: { flexDirection: 'row', paddingVertical: spacing.sm },
  consentRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  prefRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  themeRow: { paddingVertical: spacing.sm },
  langChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  navRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
});
