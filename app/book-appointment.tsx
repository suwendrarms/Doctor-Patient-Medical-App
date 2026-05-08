import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, User as UserIcon, Stethoscope } from 'lucide-react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  SectionHeader,
  Pill,
  useToast,
} from '../src/design-system/components';
import { roleThemes, spacing, typography, radii } from '../src/design-system/tokens';
import { useTheme } from '../src/design-system/theme';
import { useAuth } from '../src/auth/AuthContext';
import { useStore } from '../src/store';

const doctors = [
  { name: 'Dr. Samanthi Fernando', specialization: 'General Practitioner' },
  { name: 'Dr. Asanka Bandara', specialization: 'Cardiology' },
  { name: 'Dr. Niluka Dissanayake', specialization: 'Pediatrics' },
];

const slots = ['Today, 4:00 PM', 'Tomorrow, 9:30 AM', 'Tomorrow, 2:00 PM', 'Sat, 11:00 AM'];

export default function BookAppointment() {
  const t = useTheme();
  const role = roleThemes.patient;
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const addAppointment = useStore((s) => s.addAppointment);
  const [docIdx, setDocIdx] = useState(0);
  const [slotIdx, setSlotIdx] = useState(0);
  const [reason, setReason] = useState('');

  const submit = () => {
    addAppointment({
      patientName: user?.name ?? 'Patient',
      doctorName: doctors[docIdx].name,
      specialization: doctors[docIdx].specialization,
      startsAt: slots[slotIdx],
      branch: user?.branch ?? 'Colombo Central',
    });
    toast.show('Appointment booked', 'success');
    router.back();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Pick a doctor, time, and add a reason if you want.
      </Text>

      <SectionHeader title="Doctor" accent={role.accent} />
      <View style={{ gap: spacing.sm }}>
        {doctors.map((d, i) => (
          <Pressable key={d.name} onPress={() => setDocIdx(i)}>
            <Card
              style={{
                borderColor: docIdx === i ? role.accent : t.border,
                borderWidth: docIdx === i ? 1.5 : StyleSheet.hairlineWidth,
              }}
            >
              <View style={styles.row}>
                <Stethoscope color={role.accent} size={22} />
                <View style={{ flex: 1 }}>
                  <Text style={[typography.titleM, { color: t.text }]}>{d.name}</Text>
                  <Text style={[typography.body, { color: t.textMuted }]}>
                    {d.specialization}
                  </Text>
                </View>
                {docIdx === i ? <Pill label="Selected" tone="success" /> : null}
              </View>
            </Card>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Time slot" accent={role.accent} />
      <View style={styles.slots}>
        {slots.map((s, i) => (
          <Pressable
            key={s}
            onPress={() => setSlotIdx(i)}
            style={[
              styles.slot,
              {
                backgroundColor: slotIdx === i ? role.accent : t.card,
                borderColor: slotIdx === i ? role.accent : t.border,
              },
            ]}
          >
            <Calendar size={16} color={slotIdx === i ? '#fff' : t.textMuted} />
            <Text
              style={[
                typography.bodyBold,
                { color: slotIdx === i ? '#fff' : t.text },
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Reason (optional)" accent={role.accent} />
      <Card>
        <View style={styles.row}>
          <UserIcon color={role.accent} size={20} />
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="e.g. follow-up for blood pressure"
            placeholderTextColor={t.textMuted}
            style={[typography.body, { flex: 1, color: t.text, padding: 0 }]}
          />
        </View>
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Confirm booking"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        onPress={submit}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton label="Cancel" variant="outline" accent={role.accent} onPress={() => router.back()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  slots: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  slot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1.5,
  },
});
