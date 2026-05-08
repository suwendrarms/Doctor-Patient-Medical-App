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
  Avatar,
  Pill,
  ListRow,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { todayQueue } from '../../../data/fixtures';
import { ScanLine, Users, Clock } from 'lucide-react-native';

export function ReceptionHome() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.reception;
  const { user, signOut } = useAuth();
  const waiting = todayQueue.filter((q) => q.status === 'WAITING').length;

  return (
    <ScreenContainer>
      <GradientHero
        role={role}
        greeting={`Welcome, ${user?.name.split(' ')[0]}`}
        subtitle="Front desk - keep the queue moving."
      >
        <PrimaryButton
          label="Check-in by QR"
          variant="solid"
          gradient={['#fff', '#FED7AA']}
          icon={<ScanLine color={role.accent} size={18} />}
          onPress={() => router.push('/(reception)/checkin')}
          style={{ alignSelf: 'flex-start' }}
        />
      </GradientHero>

      <View style={styles.statsRow}>
        <StatCard label="WAITING" value={waiting} delta="2 over 20m" accent={role.accent} icon={<Users size={18} color={role.accent} />} />
        <StatCard label="AVG WAIT" value="14m" delta="-3m vs yesterday" accent={role.accent} icon={<Clock size={18} color={role.accent} />} />
      </View>

      <SectionHeader title="Doctors on duty" accent={role.accent} action={{ label: 'See queue', onPress: () => router.push('/(reception)/queue') }} />
      <Card>
        <Row name="Dr. Samanthi Fernando" status="In consult" tone="success" />
        <Row name="Dr. Asanka Bandara" status="Free in 5m" tone="info" />
      </Card>

      <SectionHeader title="Recent check-ins" accent={role.accent} />
      {todayQueue.slice(0, 3).map((q) => (
        <ListRow
          key={q.id}
          title={`#${q.number} - ${q.patientName}`}
          subtitle={q.reason}
          meta={`${q.arrivedAt} - ${q.doctor}`}
          leading={<Avatar name={q.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
          trailing={<Pill label={q.status} tone={q.status === 'TRIAGED' ? 'success' : 'info'} />}
          onPress={() => {}}
        />
      ))}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton label="Sign out (demo)" variant="outline" accent={role.accent} onPress={signOut} />
    </ScreenContainer>
  );
}

function Row({ name, status, tone }: { name: string; status: string; tone: any }) {
  const t = useTheme();
  return (
    <View style={styles.duty}>
      <Avatar name={name} gradient={['#F59E0B', '#F472B6']} />
      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyBold, { color: t.text }]}>{name}</Text>
        <Text style={[typography.caption, { color: t.textMuted }]}>Colombo Central - OPD-2</Text>
      </View>
      <Pill label={status} tone={tone} />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  duty: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
});
