import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  ScreenContainer,
  Card,
  StatCard,
  PrimaryButton,
  Pill,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { facilityKpis, reportsData } from '../../../data/fixtures';
import { Download, BarChart3 } from 'lucide-react-native';

export function Reports() {
  const t = useTheme();
  const role = roleThemes.admin;
  const max = Math.max(...reportsData.patientsThisWeek);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Reports & KPIs</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Clinical, operational and security metrics across all branches.
      </Text>

      <SectionHeader title="This week" accent={role.accent} />
      <View style={styles.row}>
        <StatCard label={facilityKpis[0].label.toUpperCase()} value={facilityKpis[0].value} delta={facilityKpis[0].delta} accent={role.accent} />
        <StatCard label={facilityKpis[1].label.toUpperCase()} value={facilityKpis[1].value} delta={facilityKpis[1].delta} accent={role.accent} />
      </View>
      <View style={styles.row}>
        <StatCard label={facilityKpis[2].label.toUpperCase()} value={facilityKpis[2].value} delta={facilityKpis[2].delta} accent="#EF4444" />
        <StatCard label={facilityKpis[3].label.toUpperCase()} value={facilityKpis[3].value} delta={facilityKpis[3].delta} accent="#10B981" />
      </View>

      <SectionHeader title="Patients per day" accent={role.accent} />
      <Card>
        <View style={styles.chart}>
          {reportsData.patientsThisWeek.map((v, i) => (
            <View key={i} style={styles.barCol}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (v / max) * 140,
                    backgroundColor: role.accent + (i === reportsData.patientsThisWeek.length - 2 ? 'FF' : '88'),
                  },
                ]}
              />
              <Text style={[typography.caption, { color: t.textMuted, marginTop: 4 }]}>
                {dayLabel(i)}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeader title="Avg wait (min)" accent={role.accent} />
      <Card>
        <View style={styles.lineChart}>
          {reportsData.avgWaitWeek.map((v, i) => (
            <View key={i} style={styles.linePoint}>
              <View style={[styles.dot, { backgroundColor: role.accent }]} />
              <Text style={[typography.caption, { color: t.text }]}>{v}m</Text>
              <Text style={[typography.caption, { color: t.textMuted }]}>{dayLabel(i)}</Text>
            </View>
          ))}
        </View>
      </Card>

      <SectionHeader title="By department" accent={role.accent} />
      <Card>
        {reportsData.byDepartment.map((d) => (
          <View key={d.name} style={styles.deptRow}>
            <Text style={[typography.body, { color: t.text, width: 110 }]}>{d.name}</Text>
            <View style={[styles.deptTrack, { backgroundColor: t.bg }]}>
              <View style={[styles.deptFill, { width: `${d.value}%`, backgroundColor: d.accent }]} />
            </View>
            <Text style={[typography.bodyBold, { color: t.text, width: 40, textAlign: 'right' }]}>
              {d.value}%
            </Text>
          </View>
        ))}
      </Card>

      <SectionHeader title="Security KPIs" accent={role.accent} />
      <Card>
        <SecRow label="Failed login attempts (24h)" value="12" tone="warning" />
        <Divider />
        <SecRow label="Compromised tokens revoked" value="0" tone="success" />
        <Divider />
        <SecRow label="Audit log integrity check" value="Passed" tone="success" />
      </Card>

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Export PDF"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Download color="#fff" size={18} />}
        onPress={() => {}}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton
        label="Schedule weekly email"
        variant="outline"
        accent={role.accent}
        icon={<BarChart3 color={role.accent} size={18} />}
        onPress={() => {}}
      />
    </ScreenContainer>
  );
}

function SecRow({ label, value, tone }: { label: string; value: string; tone: any }) {
  const t = useTheme();
  return (
    <View style={styles.secRow}>
      <Text style={[typography.body, { color: t.textMuted, flex: 1 }]}>{label}</Text>
      <Text style={[typography.bodyBold, { color: t.text }]}>{value}</Text>
      <View style={{ width: spacing.sm }} />
      <Pill label={tone === 'warning' ? 'Watch' : 'OK'} tone={tone} />
    </View>
  );
}

function Divider() {
  const t = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: t.border, marginVertical: 4 }} />;
}

function dayLabel(i: number) {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] ?? '';
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 160,
    paddingTop: spacing.sm,
  },
  barCol: { alignItems: 'center', flex: 1 },
  bar: { width: 18, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  lineChart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingVertical: spacing.sm },
  linePoint: { alignItems: 'center', gap: 2 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  deptRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, gap: spacing.sm },
  deptTrack: { flex: 1, height: 10, borderRadius: radii.pill, overflow: 'hidden' },
  deptFill: { height: '100%', borderRadius: radii.pill },
  secRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
});
