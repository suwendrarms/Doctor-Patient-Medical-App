import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  ListRow,
  Pill,
  PrimaryButton,
  SectionHeader,
  Card,
  useToast,
  useConfirm,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';
import { Pill as PillIcon, Stethoscope, FlaskConical, Globe, Plus, Check, X } from 'lucide-react-native';

export function MasterData() {
  const t = useTheme();
  const role = roleThemes.admin;
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();

  const masterUpdates = useStore((s) => s.masterRequests);
  const approve = useStore((s) => s.approveMasterRequest);
  const reject = useStore((s) => s.rejectMasterRequest);

  const masters = [
    { code: 'medication_master', label: 'Medications', count: 1284, icon: <PillIcon color={role.accent} size={22} /> },
    { code: 'disease_master', label: 'Diseases (ICD-10)', count: 14062, icon: <Stethoscope color={role.accent} size={22} /> },
    { code: 'lab_test_master', label: 'Lab tests (LOINC)', count: 312, icon: <FlaskConical color={role.accent} size={22} /> },
    { code: 'country_master', label: 'Countries', count: 249, icon: <Globe color={role.accent} size={22} /> },
  ];

  const onReject = async (id: string, title: string) => {
    const ok = await confirm.ask({
      title: `Reject "${title}"?`,
      message: 'Dependent records will be flagged for clinician follow-up.',
      confirmLabel: 'Reject',
      destructive: true,
    });
    if (!ok) return;
    reject(id);
    toast.show('Request rejected', 'info');
  };

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Master Data</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Curate the catalogues that the whole facility depends on.
      </Text>

      <SectionHeader title="Pending requests" accent={role.accent} />
      {masterUpdates.length === 0 ? (
        <Card>
          <Text style={[typography.body, { color: t.textMuted }]}>
            All caught up - no pending requests.
          </Text>
        </Card>
      ) : null}
      {masterUpdates.map((m) => (
        <View key={m.id} style={{ marginBottom: spacing.md }}>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleM, { color: t.text }]}>{m.title}</Text>
                <Text style={[typography.caption, { color: t.textMuted }]}>
                  Requested by {m.requestedBy}
                </Text>
              </View>
              <Pill
                label={m.status === 'PENDING' ? 'REVIEW' : 'AUTO-APPROVED'}
                tone={m.status === 'PENDING' ? 'warning' : 'success'}
              />
            </View>
            {m.status === 'PENDING' ? (
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
                <PrimaryButton
                  label="Approve"
                  variant="solid"
                  gradient={[role.gradientFrom, role.gradientTo]}
                  icon={<Check color="#fff" size={16} />}
                  onPress={() => {
                    approve(m.id);
                    toast.show(`Approved "${m.title}"`, 'success');
                  }}
                  style={{ flex: 1 }}
                />
                <PrimaryButton
                  label="Reject"
                  variant="outline"
                  accent="#EF4444"
                  icon={<X color="#EF4444" size={16} />}
                  onPress={() => onReject(m.id, m.title)}
                  style={{ flex: 1 }}
                />
              </View>
            ) : null}
          </Card>
        </View>
      ))}

      <SectionHeader title="Catalogues" accent={role.accent} />
      {masters.map((m) => (
        <ListRow
          key={m.code}
          title={m.label}
          subtitle={`${m.count.toLocaleString()} entries - up to date`}
          leading={m.icon}
          onPress={() => toast.show(`${m.label} catalogue browser opening...`, 'info')}
        />
      ))}

      <View style={{ height: spacing.lg }} />
      <Pressable onPress={() => toast.show('Bulk import wizard opening...', 'info')}>
        <Card>
          <Text style={[typography.bodyBold, { color: t.text }]}>Bulk import</Text>
          <Text style={[typography.body, { color: t.textMuted, marginTop: 4 }]}>
            Pull the latest ICD / SNOMED / LOINC / ATC / CPT bundles. Diff preview before apply.
          </Text>
        </Card>
      </Pressable>

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Add new master entry"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Plus color="#fff" size={18} />}
        onPress={() => router.push('/add-master')}
      />
    </ScreenContainer>
  );
}
