import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  Avatar,
  ListRow,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { insuranceList } from '../../../data/fixtures';
import { Search, ShieldCheck, Send } from 'lucide-react-native';

export function Insurance() {
  const t = useTheme();
  const role = roleThemes.reception;
  const [policy, setPolicy] = useState('');
  const [verified, setVerified] = useState<typeof insuranceList[number] | null>(null);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Insurance</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Verify eligibility before consultation. No surprises at billing.
      </Text>

      <SectionHeader title="Verify policy" accent={role.accent} />
      <Card>
        <View style={[styles.search, { backgroundColor: t.bg, borderColor: t.border }]}>
          <Search color={t.textMuted} size={18} />
          <TextInput
            value={policy}
            onChangeText={setPolicy}
            placeholder="Policy # or NIC"
            placeholderTextColor={t.textMuted}
            style={[typography.body, { flex: 1, color: t.text, padding: 0 }]}
          />
        </View>
        <View style={{ height: spacing.md }} />
        <PrimaryButton
          label="Check eligibility"
          variant="solid"
          gradient={[role.gradientFrom, role.gradientTo]}
          icon={<Send color="#fff" size={18} />}
          onPress={() => setVerified(insuranceList[0])}
          disabled={!policy}
        />
      </Card>

      {verified ? (
        <>
          <SectionHeader title="Eligibility result" accent={role.accent} />
          <Card>
            <View style={styles.row}>
              <ShieldCheck size={28} color={role.accent} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleM, { color: t.text }]}>
                  {verified.insurer}
                </Text>
                <Text style={[typography.body, { color: t.textMuted }]}>
                  Policy {verified.policyNo} - {verified.patientName}
                </Text>
              </View>
              <Pill label={verified.status} tone="success" />
            </View>
            <View style={{ height: spacing.sm }} />
            <Text style={[typography.body, { color: t.text }]}>{verified.coverage}</Text>
          </Card>
        </>
      ) : null}

      <SectionHeader title="Today's verifications" accent={role.accent} />
      {insuranceList.map((i) => (
        <ListRow
          key={i.id}
          title={i.patientName}
          subtitle={`${i.insurer} - ${i.policyNo}`}
          meta={i.coverage}
          leading={<Avatar name={i.patientName} gradient={[role.gradientFrom, role.gradientTo]} />}
          trailing={
            <Pill
              label={i.status.replace('_', ' ')}
              tone={i.status === 'ELIGIBLE' ? 'success' : i.status === 'EXPIRED' ? 'critical' : 'warning'}
            />
          }
          onPress={() => {}}
        />
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
