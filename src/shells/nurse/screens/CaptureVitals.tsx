import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  SectionHeader,
  useToast,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';
import { Heart, Thermometer, Activity, Droplets, Scale } from 'lucide-react-native';

export function CaptureVitals() {
  const t = useTheme();
  const role = roleThemes.nurse;
  const router = useRouter();
  const toast = useToast();
  const saveVitals = useStore((s) => s.saveVitals);
  const logAudit = useStore((s) => s.logAudit);
  const [bp, setBp] = useState('128/82');
  const [pulse, setPulse] = useState('78');
  const [temp, setTemp] = useState('36.8');
  const [spo2, setSpo2] = useState('98');
  const [weight, setWeight] = useState('72.5');
  const [severity, setSeverity] = useState<1 | 2 | 3 | 4 | 5>(3);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Capture Vitals</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Patient: Saman Kumara - Token #12
      </Text>

      <SectionHeader title="Vitals" accent={role.accent} />
      <Card>
        <Field icon={<Heart color={role.accent} size={20} />} label="Blood pressure" unit="mmHg" value={bp} setValue={setBp} />
        <Field icon={<Activity color={role.accent} size={20} />} label="Pulse" unit="bpm" value={pulse} setValue={setPulse} />
        <Field icon={<Thermometer color={role.accent} size={20} />} label="Temperature" unit="degC" value={temp} setValue={setTemp} />
        <Field icon={<Droplets color={role.accent} size={20} />} label="SpO2" unit="%" value={spo2} setValue={setSpo2} />
        <Field icon={<Scale color={role.accent} size={20} />} label="Weight" unit="kg" value={weight} setValue={setWeight} />
      </Card>

      <SectionHeader title="Triage severity" accent={role.accent} />
      <View style={styles.severityRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <SeverityChip key={s} value={s as any} active={severity === s} onPress={() => setSeverity(s as any)} />
        ))}
      </View>

      <View style={{ height: spacing.lg }} />
      <Pill
        label={severity >= 4 ? 'CRITICAL - escalate to doctor immediately' : 'Routine triage'}
        tone={severity >= 4 ? 'critical' : 'success'}
      />

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Save and route to doctor"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        onPress={() => {
          saveVitals({
            bp,
            pulse: parseInt(pulse, 10) || 0,
            temperature: parseFloat(temp) || 0,
            spo2: parseInt(spo2, 10) || 0,
            weight: parseFloat(weight) || 0,
            height: 174,
          });
          logAudit({
            actor: 'Anushka Jayasuriya',
            role: 'Nurse',
            action: 'VITALS.CAPTURE',
            target: 'Visit #2210',
            ip: '10.10.2.9',
            level: severity >= 4 ? 'WARN' : 'INFO',
          });
          toast.show('Vitals saved - routed to doctor', 'success');
          router.back();
        }}
      />
    </ScreenContainer>
  );
}

function Field({
  icon,
  label,
  unit,
  value,
  setValue,
}: {
  icon: React.ReactNode;
  label: string;
  unit: string;
  value: string;
  setValue: (v: string) => void;
}) {
  const t = useTheme();
  return (
    <View style={styles.field}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>
          {label.toUpperCase()}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <TextInput
            value={value}
            onChangeText={setValue}
            style={[typography.titleM, { color: t.text, padding: 0 }]}
            keyboardType="default"
          />
          <Text style={[typography.caption, { color: t.textMuted }]}>{unit}</Text>
        </View>
      </View>
    </View>
  );
}

function SeverityChip({ value, active, onPress }: { value: number; active: boolean; onPress: () => void }) {
  const t = useTheme();
  const role = roleThemes.nurse;
  const tone = value >= 4 ? '#EF4444' : value >= 3 ? '#F59E0B' : role.accent;
  return (
    <Text
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? tone : t.card,
          color: active ? '#fff' : t.text,
          borderColor: active ? tone : t.border,
        },
      ]}
    >
      Sev {value}
    </Text>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  severityRow: { flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    overflow: 'hidden',
    fontWeight: '600',
  },
});
