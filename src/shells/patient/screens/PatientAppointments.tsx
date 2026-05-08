import React from 'react';
import { Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Plus, X } from 'lucide-react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  Avatar,
  SectionHeader,
  EmptyState,
  useToast,
  useConfirm,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';

export function PatientAppointments() {
  const t = useTheme();
  const role = roleThemes.patient;
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();

  const appointments = useStore((s) => s.appointments);
  const cancelAppointment = useStore((s) => s.cancelAppointment);

  const onCancel = async (id: string, doctorName: string) => {
    const ok = await confirm.ask({
      title: 'Cancel appointment?',
      message: `This will cancel your booking with ${doctorName}.`,
      confirmLabel: 'Cancel booking',
      cancelLabel: 'Keep',
      destructive: true,
    });
    if (!ok) return;
    cancelAppointment(id);
    toast.show('Appointment cancelled', 'info');
  };

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Appointments</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Upcoming and recent visits.
      </Text>

      {appointments.length === 0 ? (
        <View style={{ marginTop: spacing.xl }}>
          <EmptyState
            icon={<Calendar size={48} color={t.textMuted} />}
            title="No appointments"
            message="Book your first one - takes less than a minute."
            cta={
              <PrimaryButton
                label="Book new appointment"
                variant="solid"
                gradient={[role.gradientFrom, role.gradientTo]}
                icon={<Plus color="#fff" size={18} />}
                onPress={() => router.push('/book-appointment')}
              />
            }
          />
        </View>
      ) : null}

      {appointments.length > 0 ? (
        <SectionHeader title="Upcoming" accent={role.accent} />
      ) : null}
      {appointments.map((a) => (
        <View key={a.id} style={{ marginBottom: spacing.md }}>
          <Card>
            <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
              <Avatar name={a.doctorName} gradient={[role.gradientFrom, role.gradientTo]} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleM, { color: t.text }]}>{a.doctorName}</Text>
                <Text style={[typography.body, { color: t.textMuted }]}>{a.specialization}</Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
                  <Pill label={a.startsAt} tone="info" />
                  <Pill
                    label={a.status}
                    tone={a.status === 'CONFIRMED' ? 'success' : 'neutral'}
                  />
                </View>
              </View>
              <Calendar size={22} color={role.accent} />
            </View>
            <View style={{ height: spacing.sm }} />
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <PrimaryButton
                label="Reschedule"
                variant="soft"
                accent={role.accent}
                onPress={() => toast.show('Reschedule flow coming soon', 'info')}
                style={{ flex: 1 }}
              />
              <PrimaryButton
                label="Cancel"
                variant="outline"
                accent="#EF4444"
                icon={<X size={16} color="#EF4444" />}
                onPress={() => onCancel(a.id, a.doctorName)}
                style={{ flex: 1 }}
              />
            </View>
          </Card>
        </View>
      ))}

      {appointments.length > 0 ? (
        <>
          <View style={{ height: spacing.lg }} />
          <PrimaryButton
            label="Book new appointment"
            variant="solid"
            gradient={[role.gradientFrom, role.gradientTo]}
            icon={<Plus color="#fff" size={18} />}
            onPress={() => router.push('/book-appointment')}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}
