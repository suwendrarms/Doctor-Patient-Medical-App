import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Avatar,
  Pill,
  SectionHeader,
  useConfirm,
  useToast,
  ThemeModeToggle,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { Award, Calendar, ShieldCheck, LogOut, BellRing, Moon } from 'lucide-react-native';

export function DoctorProfile() {
  const t = useTheme();
  const role = roleThemes.doctor;
  const { user, signOut } = useAuth();
  const confirm = useConfirm();
  const toast = useToast();
  const [autoFollowup, setAutoFollowup] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  const onSignOut = async () => {
    const ok = await confirm.ask({ title: 'Sign out?', confirmLabel: 'Sign out' });
    if (!ok) return;
    signOut();
  };

  return (
    <ScreenContainer>
      <Card>
        <View style={styles.header}>
          <Avatar name={user?.name ?? 'D'} size={64} gradient={[role.gradientFrom, role.gradientTo]} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleL, { color: t.text }]}>{user?.name}</Text>
            <Text style={[typography.body, { color: t.textMuted }]}>General Practitioner</Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
              <Pill label="2FA on" tone="success" />
              <Pill label="License OK" tone="info" />
            </View>
          </View>
        </View>
      </Card>

      <SectionHeader title="Credentials" accent={role.accent} />
      <Card>
        <Row icon={<Award color={role.accent} size={20} />} label="License #" value="SLMC 14021" />
        <Divider />
        <Row icon={<ShieldCheck color={role.accent} size={20} />} label="Specialization" value="General Practice" />
        <Divider />
        <Row icon={<Calendar color={role.accent} size={20} />} label="Joined" value="Jan 2022" />
      </Card>

      <SectionHeader title="Today's schedule" accent={role.accent} />
      <Card>
        <Row icon={<Calendar color={role.accent} size={20} />} label="OPD-2 (Colombo)" value="9:00 AM - 1:00 PM" />
        <Divider />
        <Row icon={<Calendar color={role.accent} size={20} />} label="Telemedicine" value="4:00 PM - 6:00 PM" />
      </Card>

      <SectionHeader title="Appearance" accent={role.accent} />
      <Card>
        <View style={styles.prefRow}>
          <Moon size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Theme</Text>
          <Text style={[typography.caption, { color: t.textMuted }]}>{t.mode === 'dark' ? 'Dark' : 'Light'}</Text>
        </View>
        <View style={{ paddingTop: 4, paddingBottom: spacing.xs }}>
          <ThemeModeToggle accent={role.accent} />
        </View>
      </Card>

      <SectionHeader title="Notification rules" accent={role.accent} />
      <Card>
        <View style={styles.prefRow}>
          <BellRing size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Auto follow-up reminders</Text>
          <Switch
            value={autoFollowup}
            onValueChange={(v) => {
              setAutoFollowup(v);
              toast.show(v ? 'Follow-up reminders on' : 'Follow-up reminders off', 'info');
            }}
            trackColor={{ true: role.accent }}
          />
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <BellRing size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Critical alerts only after 8 PM</Text>
          <Switch
            value={criticalOnly}
            onValueChange={(v) => {
              setCriticalOnly(v);
              toast.show(v ? 'Quiet hours active' : 'Quiet hours off', 'info');
            }}
            trackColor={{ true: role.accent }}
          />
        </View>
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

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      {icon}
      <Text style={[typography.body, { color: t.textMuted, flex: 1 }]}>{label}</Text>
      <Text style={[typography.bodyBold, { color: t.text }]}>{value}</Text>
    </View>
  );
}

function Divider() {
  const t = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: t.border, marginVertical: 4 }} />;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  prefRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
});
