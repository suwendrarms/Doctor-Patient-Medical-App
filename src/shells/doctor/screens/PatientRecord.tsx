import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  Pill,
  PrimaryButton,
  Avatar,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { lastVitals, todayQueue } from '../../../data/fixtures';
import { Activity, Pill as PillIcon, Plus, FileText } from 'lucide-react-native';

export function PatientRecord() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const t = useTheme();
  const role = roleThemes.doctor;
  const patient =
    todayQueue.find((q) => q.id === id) ??
    { id: '', patientName: 'Patient', reason: '', number: 0 };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Avatar name={patient.patientName} size={64} gradient={[role.gradientFrom, role.gradientTo]} />
        <View style={{ flex: 1 }}>
          <Text style={[typography.titleL, { color: t.text }]}>{patient.patientName}</Text>
          <Text style={[typography.body, { color: t.textMuted }]}>
            Token #{patient.number} - {patient.reason || 'Walk-in'}
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
            <Pill label="Allergy: Penicillin" tone="critical" />
            <Pill label="Diabetic" tone="warning" />
          </View>
        </View>
      </View>

      <SectionHeader title="Latest vitals" accent={role.accent} />
      <Card>
        <View style={styles.vitalsGrid}>
          <Vital label="Blood pressure" value={lastVitals.bp} unit="mmHg" tone="info" />
          <Vital label="Pulse" value={String(lastVitals.pulse)} unit="bpm" tone="success" />
          <Vital label="Temperature" value={String(lastVitals.temperature)} unit="degC" tone="success" />
          <Vital label="SpO2" value={String(lastVitals.spo2)} unit="%" tone="success" />
        </View>
      </Card>

      <SectionHeader title="Active medications" accent={role.accent} />
      <Card>
        <Row icon={<PillIcon color={role.accent} size={20} />} title="Metformin 500mg" detail="1 tab BD - 30 days" />
        <Row icon={<PillIcon color={role.accent} size={20} />} title="Atorvastatin 10mg" detail="1 tab HS - 30 days" />
      </Card>

      <SectionHeader title="Recent history" accent={role.accent} />
      <Card>
        <Row icon={<FileText color={role.accent} size={20} />} title="Hypertension follow-up" detail="3 weeks ago - Dr. Asanka" />
        <Row icon={<Activity color={role.accent} size={20} />} title="ECG (normal)" detail="2 months ago" />
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Add diagnosis"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Plus color="#fff" size={18} />}
        onPress={() => router.push('/(doctor)/add-diagnosis')}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton
        label="Issue e-Prescription"
        variant="outline"
        accent={role.accent}
        icon={<PillIcon color={role.accent} size={18} />}
        onPress={() => router.push('/(doctor)/issue-prescription')}
      />
    </ScreenContainer>
  );
}

function Vital({ label, value, unit, tone }: { label: string; value: string; unit: string; tone: any }) {
  const t = useTheme();
  return (
    <View style={styles.vital}>
      <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>
        {label.toUpperCase()}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 2 }}>
        <Text style={[typography.titleL, { color: t.text }]}>{value}</Text>
        <Text style={[typography.caption, { color: t.textMuted }]}>{unit}</Text>
      </View>
      <Pill label="Normal" tone={tone} style={{ marginTop: 6 }} />
    </View>
  );
}

function Row({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  const t = useTheme();
  return (
    <View style={styles.medRow}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[typography.bodyBold, { color: t.text }]}>{title}</Text>
        <Text style={[typography.caption, { color: t.textMuted }]}>{detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md },
  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  vital: { width: '50%', paddingVertical: spacing.sm },
  medRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
});
