import React from 'react';
import { Text, View } from 'react-native';
import {
  ScreenContainer,
  Pill,
  ListRow,
  Avatar,
  PrimaryButton,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { todayQueue } from '../../../data/fixtures';
import { ScanLine } from 'lucide-react-native';
import { useAuth } from '../../../auth/AuthContext';

export function DoctorQueue({ navigation }: any) {
  const t = useTheme();
  const role = roleThemes.doctor;
  const { user } = useAuth();
  const mine = todayQueue
    .filter((q) => q.doctor === user?.name)
    .sort((a, b) => b.severity - a.severity);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Today's Queue</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Sorted by severity. Tap to open the patient record.
      </Text>

      <PrimaryButton
        label="Scan Patient QR"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<ScanLine color="#fff" size={18} />}
        onPress={() => navigation.navigate('PatientRecord', { patient: mine[0] })}
        style={{ marginTop: spacing.lg }}
      />

      <SectionHeader title={`${mine.length} patients waiting`} accent={role.accent} />
      {mine.map((q) => (
        <ListRow
          key={q.id}
          title={`#${q.number} - ${q.patientName}`}
          subtitle={q.reason}
          meta={`${q.arrivedAt} - ${q.status}`}
          leading={<Avatar name={q.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
          trailing={
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Pill
                label={`Sev ${q.severity}`}
                tone={q.severity >= 4 ? 'critical' : q.severity >= 3 ? 'warning' : 'success'}
              />
            </View>
          }
          onPress={() => navigation.navigate('PatientRecord', { patient: q })}
        />
      ))}
    </ScreenContainer>
  );
}
