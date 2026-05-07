import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScanLine, AlertTriangle, Stethoscope, Activity } from 'lucide-react-native';
import {
  ScreenContainer,
  GradientHero,
  StatCard,
  Card,
  ListRow,
  SectionHeader,
  PrimaryButton,
  Avatar,
  Pill,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { todayQueue } from '../../../data/fixtures';

export function DoctorHome({ navigation }: any) {
  const t = useTheme();
  const role = roleThemes.doctor;
  const { user, signOut } = useAuth();
  const myCases = todayQueue.filter((q) => q.doctor === user?.name);
  const critical = myCases.filter((q) => q.severity >= 4).length;

  return (
    <ScreenContainer>
      <GradientHero
        role={role}
        greeting={`Good morning, ${user?.name.split(' ').slice(-1)[0]}`}
        subtitle={`${myCases.length} patients in your queue today.`}
      >
        <PrimaryButton
          label="Scan Patient QR"
          variant="solid"
          gradient={['#fff', '#D1FAE5']}
          icon={<ScanLine color={role.accent} size={18} />}
          onPress={() => navigation.navigate('Queue')}
          style={{ alignSelf: 'flex-start' }}
        />
      </GradientHero>

      <View style={styles.statsRow}>
        <StatCard
          label="MY QUEUE"
          value={myCases.length}
          delta="2 critical, 1 urgent"
          accent={role.accent}
          icon={<Stethoscope size={18} color={role.accent} />}
        />
        <StatCard
          label="CRITICAL ALERTS"
          value={critical}
          delta="auto-prioritized"
          accent="#EF4444"
          icon={<AlertTriangle size={18} color="#EF4444" />}
        />
      </View>

      <SectionHeader title="Up next" accent={role.accent} action={{ label: 'See queue', onPress: () => navigation.navigate('Queue') }} />
      {myCases.slice(0, 3).map((q) => (
        <ListRow
          key={q.id}
          title={`#${q.number} - ${q.patientName}`}
          subtitle={q.reason}
          meta={`${q.arrivedAt} - ${q.status}`}
          leading={<Avatar name={q.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
          trailing={
            <Pill
              label={`Sev ${q.severity}`}
              tone={q.severity >= 4 ? 'critical' : q.severity >= 3 ? 'warning' : 'success'}
            />
          }
          onPress={() => navigation.navigate('PatientRecord', { patient: q })}
        />
      ))}

      <SectionHeader title="Today at a glance" accent={role.accent} />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Activity color={role.accent} size={22} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: t.text }]}>14 visits scheduled - 2 telemedicine</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              Avg consult time today: 12 min - 3 min faster than your weekly avg.
            </Text>
          </View>
        </View>
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton label="Sign out (demo)" variant="outline" accent={role.accent} onPress={signOut} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
});
