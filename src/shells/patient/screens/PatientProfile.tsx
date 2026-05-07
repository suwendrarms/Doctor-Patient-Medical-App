import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Avatar,
  SectionHeader,
  ListRow,
  Pill,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { familyMembers, consents } from '../../../data/fixtures';
import {
  Globe,
  Moon,
  Bell,
  ShieldCheck,
  UserPlus,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

const languages = ['English', 'සිංහල', 'தமிழ்'];

export function PatientProfile() {
  const t = useTheme();
  const role = roleThemes.patient;
  const { user, signOut } = useAuth();
  const [lang, setLang] = useState('English');
  const [pushOn, setPushOn] = useState(true);
  const [autoRefill, setAutoRefill] = useState(false);

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

      <SectionHeader title="Personal" accent={role.accent} />
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
        action={{ label: '+ Add', onPress: () => {} }}
      />
      {familyMembers.map((m) => (
        <ListRow
          key={m.id}
          title={m.name}
          subtitle={`${m.relation} - ${m.age} yrs`}
          leading={<Avatar name={m.name} gradient={[role.gradientFrom, role.gradientTo]} />}
          onPress={() => {}}
        />
      ))}

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
              <Pill
                label={c.status}
                tone={c.status === 'ACTIVE' ? 'success' : 'neutral'}
              />
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
              <View
                key={l}
                style={[
                  styles.langChip,
                  {
                    backgroundColor: l === lang ? role.accent : t.bg,
                    borderColor: l === lang ? role.accent : t.border,
                  },
                ]}
              >
                <Text
                  onPress={() => setLang(l)}
                  style={[
                    typography.caption,
                    { color: l === lang ? '#fff' : t.text, fontWeight: '600' },
                  ]}
                >
                  {l}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <Moon size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Use device theme</Text>
          <Pill label={t.mode === 'dark' ? 'Dark' : 'Light'} tone="info" />
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <Bell size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Push notifications</Text>
          <Switch value={pushOn} onValueChange={setPushOn} trackColor={{ true: role.accent }} />
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <UserPlus size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Auto-request refill</Text>
          <Switch value={autoRefill} onValueChange={setAutoRefill} trackColor={{ true: role.accent }} />
        </View>
      </Card>

      <SectionHeader title="Help & legal" accent={role.accent} />
      <Card>
        <NavRow label="Privacy policy" />
        <Divider />
        <NavRow label="Terms of service" />
        <Divider />
        <NavRow label="Contact support" />
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Sign out"
        variant="outline"
        accent="#EF4444"
        icon={<LogOut size={18} color="#EF4444" />}
        onPress={signOut}
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

function NavRow({ label }: { label: string }) {
  const t = useTheme();
  return (
    <View style={styles.navRow}>
      <Text style={[typography.body, { color: t.text, flex: 1 }]}>{label}</Text>
      <ChevronRight size={20} color={t.textMuted} />
    </View>
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
  langChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  navRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
});
