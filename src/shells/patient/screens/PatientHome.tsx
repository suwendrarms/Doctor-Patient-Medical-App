import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Bell, Calendar, Pill as PillIcon, Activity, Footprints } from 'lucide-react-native';
import {
  ScreenContainer,
  GradientHero,
  StatCard,
  Card,
  ListRow,
  SectionHeader,
  Avatar,
  PrimaryButton,
  Pill,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { myAppointments, myPrescriptions } from '../../../data/fixtures';

export function PatientHome() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.patient;
  const { user, signOut } = useAuth();
  const next = myAppointments[0];
  const activeRx = myPrescriptions.find((r) => r.status === 'ACTIVE');

  return (
    <ScreenContainer>
      <GradientHero
        role={role}
        greeting={`Hi ${user?.name.split(' ')[0]}`}
        subtitle="Take care of yourself today."
        rightSlot={
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Bell color="#fff" size={22} />
            <Avatar name={user?.name ?? 'P'} size={36} gradient={['#fff', '#E0E7FF']} />
          </View>
        }
      >
        <PrimaryButton
          label="Show My QR"
          variant="solid"
          gradient={['#fff', '#E0E7FF']}
          onPress={() => router.push('/(patient)/qr')}
          style={{ alignSelf: 'flex-start' }}
        />
      </GradientHero>

      <View style={styles.statsRow}>
        <StatCard label="HEART RATE" value="78 bpm" delta="resting, normal" accent={role.accent} icon={<Activity size={18} color={role.accent} />} />
        <StatCard label="STEPS" value="6,420" delta="goal 8,000" accent={role.accent} icon={<Footprints size={18} color={role.accent} />} />
      </View>

      <SectionHeader
        title="Next Appointment"
        accent={role.accent}
        action={{ label: 'See all', onPress: () => router.push('/(patient)/appointments') }}
      />
      {next ? (
        <Card>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
            <Avatar name={next.doctorName} gradient={[role.gradientFrom, role.gradientTo]} />
            <View style={{ flex: 1 }}>
              <Text style={[typography.titleM, { color: t.text }]}>{next.doctorName}</Text>
              <Text style={[typography.body, { color: t.textMuted }]}>{next.specialization}</Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
                <Pill label={next.startsAt} tone="info" />
                <Pill label={next.status} tone="success" />
              </View>
            </View>
            <Calendar size={22} color={role.accent} />
          </View>
        </Card>
      ) : null}

      <SectionHeader title="Active Medications" accent={role.accent} />
      {activeRx
        ? activeRx.items.map((it, i) => (
            <ListRow
              key={i}
              title={it.medication}
              subtitle={`${it.dose} - ${it.frequency} - ${it.duration}`}
              meta={`Prescribed by ${activeRx.doctorName}`}
              leading={<PillIcon color={role.accent} size={22} />}
              onPress={() => {}}
            />
          ))
        : null}

      <SectionHeader title="Health goals" accent={role.accent} />
      <Card>
        <View style={{ gap: spacing.sm }}>
          <Text style={[typography.bodyBold, { color: t.text }]}>Hydration streak</Text>
          <Text style={[typography.body, { color: t.textMuted }]}>5 days in a row. Drink 2 more glasses today.</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { backgroundColor: role.accent, width: '62%' }]} />
          </View>
        </View>
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Sign out (demo)"
        variant="outline"
        accent={role.accent}
        onPress={signOut}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  progressTrack: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginTop: spacing.xs },
  progressBar: { height: '100%', borderRadius: 8 },
});
