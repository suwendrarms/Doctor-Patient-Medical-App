import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  GradientHero,
  StatCard,
  Card,
  PrimaryButton,
  SectionHeader,
  Pill,
  ListRow,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { useStore } from '../../../store';
import { Activity, ShieldAlert, Users, Database } from 'lucide-react-native';

export function AdminHome() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.admin;
  const { user, signOut } = useAuth();
  const facilityKpis = useStore((s) => s.kpis);
  const masterUpdates = useStore((s) => s.masterRequests);
  const pending = masterUpdates.filter((m) => m.status === 'PENDING').length;

  return (
    <ScreenContainer>
      <GradientHero
        role={role}
        greeting={`Welcome, ${user?.name.split(' ')[0]}`}
        subtitle="Facility health at a glance."
      >
        <PrimaryButton
          label="Open Reports"
          variant="solid"
          gradient={['#fff', '#FAE8FF']}
          onPress={() => router.push('/(admin)/(tabs)/reports')}
          style={{ alignSelf: 'flex-start' }}
        />
      </GradientHero>

      <View style={styles.statsRow}>
        <StatCard label="PATIENTS TODAY" value={facilityKpis[0].value} delta={facilityKpis[0].delta} accent={role.accent} icon={<Users size={18} color={role.accent} />} />
        <StatCard label="AVG WAIT" value={facilityKpis[1].value} delta={facilityKpis[1].delta} accent={role.accent} icon={<Activity size={18} color={role.accent} />} />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="NO-SHOW" value={facilityKpis[2].value} delta={facilityKpis[2].delta} accent="#EF4444" icon={<ShieldAlert size={18} color="#EF4444" />} />
        <StatCard label="NPS" value={facilityKpis[3].value} delta={facilityKpis[3].delta} accent="#10B981" icon={<Activity size={18} color="#10B981" />} />
      </View>

      <SectionHeader
        title="Master data requests"
        accent={role.accent}
        action={{ label: 'See all', onPress: () => router.push('/(admin)/(tabs)/masters') }}
      />
      {masterUpdates.map((m) => (
        <ListRow
          key={m.id}
          title={m.title}
          subtitle={`Requested by ${m.requestedBy}`}
          leading={<Database color={role.accent} size={22} />}
          trailing={
            <Pill
              label={m.status === 'PENDING' ? 'PENDING' : 'AUTO-APPROVED'}
              tone={m.status === 'PENDING' ? 'warning' : 'success'}
            />
          }
          onPress={() => router.push('/(admin)/(tabs)/masters')}
        />
      ))}

      <SectionHeader title="System health" accent={role.accent} />
      <Card>
        <Row label="API p95 latency" value="142ms" tone="success" />
        <Row label="Active sessions" value="218" tone="info" />
        <Row label="Failed login attempts (1h)" value="3" tone="warning" />
        <Row label="DB replication lag" value="0.4s" tone="success" />
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton label="Sign out (demo)" variant="outline" accent={role.accent} onPress={signOut} />
    </ScreenContainer>
  );
}

function Row({ label, value, tone }: { label: string; value: string; tone: any }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      <Text style={[typography.body, { color: t.textMuted }]}>{label}</Text>
      <View style={{ flex: 1 }} />
      <Text style={[typography.bodyBold, { color: t.text }]}>{value}</Text>
      <View style={{ width: spacing.sm }} />
      <Pill label={tone === 'warning' ? 'Watch' : tone === 'success' ? 'OK' : 'Info'} tone={tone} />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
});
