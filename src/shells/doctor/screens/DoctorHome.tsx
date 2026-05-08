import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScanLine, AlertTriangle, Stethoscope, Activity, Bell } from 'lucide-react-native';
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
  useConfirm,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { useStore } from '../../../store';

export function DoctorHome() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.doctor;
  const { user, signOut } = useAuth();
  const confirm = useConfirm();
  const queue = useStore((s) => s.queue);
  const myCases = queue.filter((q) => q.doctor === user?.name);
  const critical = myCases.filter((q) => q.severity >= 4).length;

  const onSignOut = async () => {
    const ok = await confirm.ask({ title: 'Sign out?', confirmLabel: 'Sign out' });
    if (!ok) return;
    signOut();
  };

  return (
    <ScreenContainer>
      <GradientHero
        role={role}
        greeting={`Good morning, ${user?.name.split(' ').slice(-1)[0]}`}
        subtitle={`${myCases.length} patients in your queue today.`}
        rightSlot={
          <Pressable onPress={() => router.push('/notifications')} style={{ padding: 4 }}>
            <Bell color="#fff" size={22} />
          </Pressable>
        }
      >
        <PrimaryButton
          label="Scan Patient QR"
          variant="solid"
          gradient={['#fff', '#D1FAE5']}
          icon={<ScanLine color={role.accent} size={18} />}
          onPress={() => router.push('/(doctor)/(tabs)/queue')}
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

      <SectionHeader title="Up next" accent={role.accent} action={{ label: 'See queue', onPress: () => router.push('/(doctor)/(tabs)/queue') }} />
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
          onPress={() => router.push({ pathname: '/(doctor)/patient', params: { id: q.id } })}
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
      <PrimaryButton label="Sign out" variant="outline" accent={role.accent} onPress={onSignOut} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
});
