import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  Avatar,
  ListRow,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { labSamples } from '../../../data/fixtures';
import { ScanBarcode, Printer, FlaskConical } from 'lucide-react-native';
import { LabSample } from '../../../data/types';

const statusTone: Record<LabSample['status'], 'warning' | 'info' | 'success' | 'neutral'> = {
  PENDING_COLLECTION: 'warning',
  COLLECTED: 'info',
  IN_LAB: 'info',
  RESULT_READY: 'success',
};

export function LabSamples() {
  const t = useTheme();
  const role = roleThemes.nurse;
  const groups = ['PENDING_COLLECTION', 'COLLECTED', 'IN_LAB', 'RESULT_READY'] as const;

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Lab Samples</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Collection, barcode tracking, and result attachment.
      </Text>

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg }}>
        <PrimaryButton
          label="Scan barcode"
          variant="solid"
          gradient={[role.gradientFrom, role.gradientTo]}
          icon={<ScanBarcode color="#fff" size={18} />}
          onPress={() => {}}
          style={{ flex: 1 }}
        />
        <PrimaryButton
          label="Print labels"
          variant="outline"
          accent={role.accent}
          icon={<Printer color={role.accent} size={18} />}
          onPress={() => {}}
          style={{ flex: 1 }}
        />
      </View>

      {groups.map((g) => {
        const list = labSamples.filter((s) => s.status === g);
        if (list.length === 0) return null;
        return (
          <View key={g}>
            <SectionHeader title={titleOf(g)} accent={role.accent} />
            {list.map((s) => (
              <ListRow
                key={s.id}
                title={s.testName}
                subtitle={`${s.patientName} - ${s.sampleType}`}
                meta={`${s.barcode} - ${s.collectedAt ?? 'awaiting'} - by ${s.doctor}`}
                leading={<Avatar name={s.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
                trailing={
                  <Pill label={prettyStatus(s.status)} tone={statusTone[s.status]} />
                }
                onPress={() => {}}
              />
            ))}
          </View>
        );
      })}

      <View style={{ height: spacing.lg }} />
      <Card>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <FlaskConical color={role.accent} size={22} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: t.text }]}>Today: 14 samples</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              0 lost - 4 awaiting collection - SLA on track
            </Text>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
}

function titleOf(s: LabSample['status']) {
  switch (s) {
    case 'PENDING_COLLECTION':
      return 'Pending collection';
    case 'COLLECTED':
      return 'Collected';
    case 'IN_LAB':
      return 'In lab';
    case 'RESULT_READY':
      return 'Result ready';
  }
}

function prettyStatus(s: LabSample['status']) {
  return s.toLowerCase().replace(/_/g, ' ');
}

const styles = StyleSheet.create({});
