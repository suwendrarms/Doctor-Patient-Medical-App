import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import {
  ScreenContainer,
  Card,
  Pill,
  PrimaryButton,
  SectionHeader,
  useToast,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { auditEvents } from '../../../data/fixtures';
import { Search, Download, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react-native';
import { AuditEvent } from '../../../data/types';

const levelMeta: Record<AuditEvent['level'], { tone: any; icon: any }> = {
  INFO: { tone: 'info', icon: CheckCircle2 },
  WARN: { tone: 'warning', icon: AlertTriangle },
  CRITICAL: { tone: 'critical', icon: ShieldAlert },
};

export function AuditLog() {
  const t = useTheme();
  const role = roleThemes.admin;
  const toast = useToast();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'ALL' | AuditEvent['level']>('ALL');

  const list = auditEvents.filter(
    (e) =>
      (filter === 'ALL' || e.level === filter) &&
      (q === '' ||
        e.actor.toLowerCase().includes(q.toLowerCase()) ||
        e.action.toLowerCase().includes(q.toLowerCase()) ||
        e.target.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Audit Log</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Append-only event log. Search, filter, export.
      </Text>

      <View style={[styles.search, { backgroundColor: t.card, borderColor: t.border }]}>
        <Search color={t.textMuted} size={18} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search actor, action, target..."
          placeholderTextColor={t.textMuted}
          style={[typography.body, { flex: 1, color: t.text, padding: 0 }]}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 6, marginTop: spacing.md, flexWrap: 'wrap' }}>
        {(['ALL', 'INFO', 'WARN', 'CRITICAL'] as const).map((f) => (
          <View
            key={f}
            style={[
              styles.filter,
              {
                backgroundColor: filter === f ? role.accent : t.card,
                borderColor: filter === f ? role.accent : t.border,
              },
            ]}
          >
            <Text
              onPress={() => setFilter(f)}
              style={[
                typography.caption,
                { color: filter === f ? '#fff' : t.text, fontWeight: '600' },
              ]}
            >
              {f}
            </Text>
          </View>
        ))}
      </View>

      <SectionHeader title={`${list.length} events`} accent={role.accent} />
      {list.map((e) => {
        const meta = levelMeta[e.level];
        const Icon = meta.icon;
        return (
          <View key={e.id} style={{ marginBottom: spacing.md }}>
            <Card>
              <View style={styles.row}>
                <Icon size={20} color={meta.tone === 'critical' ? '#EF4444' : meta.tone === 'warning' ? '#F59E0B' : role.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={[typography.bodyBold, { color: t.text }]}>{e.action}</Text>
                  <Text style={[typography.caption, { color: t.textMuted }]}>
                    by {e.actor} ({e.role}) - {e.target}
                  </Text>
                  <Text style={[typography.caption, { color: t.textMuted }]}>
                    {e.ip} - {e.at}
                  </Text>
                </View>
                <Pill label={e.level} tone={meta.tone} />
              </View>
            </Card>
          </View>
        );
      })}

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Export filtered (CSV)"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Download color="#fff" size={18} />}
        onPress={() => toast.show(`Exported ${list.length} events to CSV`, 'success')}
      />
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
    marginTop: spacing.lg,
  },
  filter: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
});
