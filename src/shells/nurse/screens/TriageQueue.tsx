import React from 'react';
import { Text, View } from 'react-native';
import {
  ScreenContainer,
  ListRow,
  Pill,
  Avatar,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { triageQueue } from '../../../data/fixtures';

export function TriageQueueScreen() {
  const t = useTheme();
  const role = roleThemes.nurse;
  const sorted = [...triageQueue].sort((a, b) => b.severity - a.severity);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Triage Queue</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Severity-sorted. Tap to capture vitals or set severity.
      </Text>

      <SectionHeader title={`${sorted.length} patients`} accent={role.accent} />
      {sorted.map((q) => (
        <ListRow
          key={q.id}
          title={`#${q.number} - ${q.patientName}`}
          subtitle={q.reason}
          meta={`${q.arrivedAt} - ${q.doctor ?? 'Unassigned'}`}
          leading={<Avatar name={q.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
          trailing={
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Pill
                label={`Sev ${q.severity}`}
                tone={q.severity >= 4 ? 'critical' : q.severity >= 3 ? 'warning' : 'success'}
              />
              <Text style={[typography.caption, { color: t.textMuted }]}>{q.status}</Text>
            </View>
          }
          onPress={() => {}}
        />
      ))}
    </ScreenContainer>
  );
}
