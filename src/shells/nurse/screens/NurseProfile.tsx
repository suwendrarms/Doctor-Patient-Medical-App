import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Avatar,
  Pill,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { Award, Calendar, Bell, LogOut, ScanBarcode } from 'lucide-react-native';

export function NurseProfile() {
  const t = useTheme();
  const role = roleThemes.nurse;
  const { user, signOut } = useAuth();
  const [doseAlerts, setDoseAlerts] = useState(true);
  const [requireBarcode, setRequireBarcode] = useState(true);

  return (
    <ScreenContainer>
      <Card>
        <View style={styles.header}>
          <Avatar name={user?.name ?? 'N'} size={64} gradient={[role.gradientFrom, role.gradientTo]} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleL, { color: t.text }]}>{user?.name}</Text>
            <Text style={[typography.body, { color: t.textMuted }]}>Registered Nurse - {user?.branch}</Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
              <Pill label="On shift" tone="success" />
              <Pill label="Triage trained" tone="info" />
            </View>
          </View>
        </View>
      </Card>

      <SectionHeader title="Credentials" accent={role.accent} />
      <Card>
        <Row icon={<Award color={role.accent} size={20} />} label="License #" value="NRS 22041" />
        <Divider />
        <Row icon={<Award color={role.accent} size={20} />} label="Certifications" value="BLS, IV, Pediatric" />
        <Divider />
        <Row icon={<Calendar color={role.accent} size={20} />} label="Joined" value="Aug 2023" />
      </Card>

      <SectionHeader title="Today's shift" accent={role.accent} />
      <Card>
        <Row icon={<Calendar color={role.accent} size={20} />} label="Triage station" value="8 AM - 4 PM" />
        <Divider />
        <Row icon={<Calendar color={role.accent} size={20} />} label="Coverage" value="OPD-2 + Vaccinations" />
      </Card>

      <SectionHeader title="Safety preferences" accent={role.accent} />
      <Card>
        <View style={styles.prefRow}>
          <Bell size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Medication-due alerts</Text>
          <Switch value={doseAlerts} onValueChange={setDoseAlerts} trackColor={{ true: role.accent }} />
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <ScanBarcode size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>
            Require barcode scan before administer
          </Text>
          <Switch
            value={requireBarcode}
            onValueChange={setRequireBarcode}
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
        onPress={signOut}
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
