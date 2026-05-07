import React from 'react';
import { Text, View } from 'react-native';
import { Calendar, Plus } from 'lucide-react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  Avatar,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { myAppointments } from '../../../data/fixtures';

export function PatientAppointments() {
  const t = useTheme();
  const role = roleThemes.patient;
  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Appointments</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Upcoming and recent visits.
      </Text>

      <SectionHeader title="Upcoming" accent={role.accent} />
      {myAppointments.map((a) => (
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
          </Card>
        </View>
      ))}

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Book new appointment"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Plus color="#fff" size={18} />}
        onPress={() => {}}
      />
    </ScreenContainer>
  );
}
