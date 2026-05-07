import React from 'react';
import { Text, View } from 'react-native';
import {
  ScreenContainer,
  ListRow,
  Pill,
  PrimaryButton,
  SectionHeader,
  Card,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { masterUpdates } from '../../../data/fixtures';
import { Pill as PillIcon, Stethoscope, FlaskConical, Globe, Plus } from 'lucide-react-native';

export function MasterData() {
  const t = useTheme();
  const role = roleThemes.admin;

  const masters = [
    { code: 'medication_master', label: 'Medications', count: 1284, icon: <PillIcon color={role.accent} size={22} /> },
    { code: 'disease_master', label: 'Diseases (ICD-10)', count: 14062, icon: <Stethoscope color={role.accent} size={22} /> },
    { code: 'lab_test_master', label: 'Lab tests (LOINC)', count: 312, icon: <FlaskConical color={role.accent} size={22} /> },
    { code: 'country_master', label: 'Countries', count: 249, icon: <Globe color={role.accent} size={22} /> },
  ];

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Master Data</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Curate the catalogues that the whole facility depends on.
      </Text>

      <SectionHeader title="Pending requests" accent={role.accent} />
      {masterUpdates.map((m) => (
        <ListRow
          key={m.id}
          title={m.title}
          subtitle={`Requested by ${m.requestedBy}`}
          trailing={
            <Pill
              label={m.status === 'PENDING' ? 'REVIEW' : 'AUTO-APPROVED'}
              tone={m.status === 'PENDING' ? 'warning' : 'success'}
            />
          }
          onPress={() => {}}
        />
      ))}

      <SectionHeader title="Catalogues" accent={role.accent} />
      {masters.map((m) => (
        <ListRow
          key={m.code}
          title={m.label}
          subtitle={`${m.count.toLocaleString()} entries - up to date`}
          leading={m.icon}
          onPress={() => {}}
        />
      ))}

      <View style={{ height: spacing.lg }} />
      <Card>
        <Text style={[typography.bodyBold, { color: t.text }]}>Bulk import</Text>
        <Text style={[typography.body, { color: t.textMuted, marginTop: 4 }]}>
          Pull the latest ICD / SNOMED / LOINC / ATC / CPT bundles. Diff preview before apply.
        </Text>
      </Card>

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Add new master entry"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Plus color="#fff" size={18} />}
        onPress={() => {}}
      />
    </ScreenContainer>
  );
}
