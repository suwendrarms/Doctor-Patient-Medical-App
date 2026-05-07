import React from 'react';
import { Text, View } from 'react-native';
import {
  ScreenContainer,
  Card,
  Pill,
  ListRow,
  Avatar,
  PrimaryButton,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { todayQueue } from '../../../data/fixtures';
import { Plus } from 'lucide-react-native';

export function LiveQueue() {
  const t = useTheme();
  const role = roleThemes.reception;

  const grouped = groupBy(todayQueue, 'doctor');

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Live Queue Board</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Realtime - reorder, escalate, or mark no-show.
      </Text>

      {Object.entries(grouped).map(([doctor, list]) => (
        <View key={doctor}>
          <SectionHeader title={doctor} accent={role.accent} />
          <Card>
            <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>
              {list.length} patients waiting
            </Text>
          </Card>
          <View style={{ height: spacing.sm }} />
          {list.map((q) => (
            <ListRow
              key={q.id}
              title={`#${q.number} - ${q.patientName}`}
              subtitle={q.reason}
              meta={`${q.arrivedAt}`}
              leading={<Avatar name={q.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
              trailing={
                <Pill
                  label={`Sev ${q.severity}`}
                  tone={q.severity >= 4 ? 'critical' : q.severity >= 3 ? 'warning' : 'success'}
                />
              }
              onPress={() => {}}
            />
          ))}
        </View>
      ))}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Add walk-in"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Plus color="#fff" size={18} />}
        onPress={() => {}}
      />
    </ScreenContainer>
  );
}

function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T) {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = (item[key] as string) ?? 'Other';
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});
}
