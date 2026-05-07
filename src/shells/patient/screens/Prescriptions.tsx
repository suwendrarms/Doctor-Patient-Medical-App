import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  ScreenContainer,
  Card,
  Pill,
  PrimaryButton,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { myPrescriptions } from '../../../data/fixtures';
import { Pill as PillIcon, RefreshCw, Download } from 'lucide-react-native';

export function PrescriptionsScreen() {
  const t = useTheme();
  const role = roleThemes.patient;
  const active = myPrescriptions.filter((p) => p.status === 'ACTIVE');
  const refill = myPrescriptions.filter((p) => p.status === 'PENDING_REFILL');
  const past = myPrescriptions.filter((p) => p.status === 'COMPLETED');

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>My Medications</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Active prescriptions, refill requests and history.
      </Text>

      {active.length > 0 ? (
        <>
          <SectionHeader title="Active" accent={role.accent} />
          {active.map((p) => (
            <RxCard key={p.id} p={p} />
          ))}
        </>
      ) : null}

      {refill.length > 0 ? (
        <>
          <SectionHeader title="Pending refill" accent={role.accent} />
          {refill.map((p) => (
            <RxCard key={p.id} p={p} pending />
          ))}
        </>
      ) : null}

      {past.length > 0 ? (
        <>
          <SectionHeader title="History" accent={role.accent} />
          {past.map((p) => (
            <RxCard key={p.id} p={p} muted />
          ))}
        </>
      ) : null}

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Request refill"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<RefreshCw color="#fff" size={18} />}
        onPress={() => {}}
      />
    </ScreenContainer>
  );
}

function RxCard({
  p,
  pending = false,
  muted = false,
}: {
  p: typeof myPrescriptions[number];
  pending?: boolean;
  muted?: boolean;
}) {
  const t = useTheme();
  const role = roleThemes.patient;
  return (
    <View style={{ marginBottom: spacing.md, opacity: muted ? 0.7 : 1 }}>
      <Card>
        <View style={styles.row}>
          <PillIcon color={role.accent} size={22} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleM, { color: t.text }]}>{p.items[0].medication}</Text>
            <Text style={[typography.body, { color: t.textMuted }]}>
              By {p.doctorName} - {p.issuedAt}
            </Text>
          </View>
          <Pill
            label={p.status.replace('_', ' ')}
            tone={pending ? 'warning' : muted ? 'neutral' : 'success'}
          />
        </View>

        <View style={{ height: spacing.sm }} />
        {p.items.map((it, i) => (
          <View key={i} style={styles.itemRow}>
            <Text style={[typography.body, { color: t.text, flex: 1 }]}>{it.medication}</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              {it.dose} - {it.frequency} - {it.duration}
            </Text>
          </View>
        ))}

        <View style={styles.actionRow}>
          <PrimaryButton
            label="Download PDF"
            variant="soft"
            accent={role.accent}
            icon={<Download size={16} color={role.accent} />}
            onPress={() => {}}
            style={{ flex: 1 }}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: 4 },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
});
