import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  GradientHero,
  StatCard,
  PrimaryButton,
  Card,
  SectionHeader,
  Avatar,
  Pill,
  useConfirm,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { useStore } from '../../../store';
import { Activity, FlaskConical, Syringe, AlertOctagon, ScanBarcode, Bell } from 'lucide-react-native';

export function NurseHome() {
  const router = useRouter();
  const t = useTheme();
  const role = roleThemes.nurse;
  const { user, signOut } = useAuth();
  const confirm = useConfirm();
  const queue = useStore((s) => s.queue);
  const triageQueue = queue;
  const urgent = triageQueue.filter((q) => q.severity >= 4).length;

  const onSignOut = async () => {
    const ok = await confirm.ask({ title: 'Sign out?', confirmLabel: 'Sign out' });
    if (!ok) return;
    signOut();
  };

  return (
    <ScreenContainer>
      <GradientHero
        role={role}
        greeting={`Hi ${user?.name.split(' ')[0]}`}
        subtitle="Triage queue is moving fast today."
        rightSlot={
          <Pressable onPress={() => router.push('/notifications')} style={{ padding: 4 }}>
            <Bell color="#fff" size={22} />
          </Pressable>
        }
      >
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <PrimaryButton
            label="Capture Vitals"
            variant="solid"
            gradient={['#fff', '#D1FAE5']}
            icon={<Activity color={role.accent} size={18} />}
            onPress={() => router.push('/(nurse)/vitals')}
          />
          <PrimaryButton
            label="Administer"
            variant="solid"
            gradient={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']}
            icon={<ScanBarcode color="#fff" size={18} />}
            onPress={() => router.push('/administer-med')}
          />
        </View>
      </GradientHero>

      <View style={styles.statsRow}>
        <StatCard label="TRIAGE QUEUE" value={triageQueue.length} delta={`${urgent} urgent`} accent={role.accent} icon={<AlertOctagon size={18} color={role.accent} />} />
        <StatCard label="LAB SAMPLES" value={6} delta="2 awaiting collection" accent={role.accent} icon={<FlaskConical size={18} color={role.accent} />} />
      </View>

      <SectionHeader title="Medications due" accent={role.accent} />
      <Card>
        <Row name="Saman Kumara" detail="Cefuroxime 750mg IV - 4:00 PM" tone="critical" />
        <Row name="Tharushi Dilrukshi" detail="Paracetamol 500mg PO - 3:30 PM" tone="warning" />
      </Card>

      <SectionHeader title="Vaccination batch" accent={role.accent} />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <Syringe color={role.accent} size={22} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: t.text }]}>Influenza 2026 - Batch FL-26-08</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              26 doses left of 50 - 24 administered today
            </Text>
          </View>
          <Pill label="Active" tone="success" />
        </View>
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton label="Sign out (demo)" variant="outline" accent={role.accent} onPress={onSignOut} />
    </ScreenContainer>
  );
}

function Row({ name, detail, tone }: { name: string; detail: string; tone: any }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      <Avatar name={name} gradient={['#34D399', '#A3E635']} size={36} />
      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyBold, { color: t.text }]}>{name}</Text>
        <Text style={[typography.caption, { color: t.textMuted }]}>{detail}</Text>
      </View>
      <Pill label={tone === 'critical' ? 'NOW' : 'Soon'} tone={tone} />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
});
