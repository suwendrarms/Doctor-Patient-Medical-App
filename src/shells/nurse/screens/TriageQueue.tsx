import React from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  ScreenContainer,
  ListRow,
  Pill,
  Avatar,
  SectionHeader,
  Card,
  EmptyState,
  useToast,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';
import { Activity } from 'lucide-react-native';
import { QueueEntry } from '../../../data/types';

export function TriageQueueScreen() {
  const t = useTheme();
  const role = roleThemes.nurse;
  const toast = useToast();
  const queue = useStore((s) => s.queue);
  const setSeverity = useStore((s) => s.setSeverity);

  const sorted = [...queue].sort((a, b) => b.severity - a.severity);

  const onSetSeverity = (q: QueueEntry, s: QueueEntry['severity']) => {
    setSeverity(q.id, s);
    toast.show(`#${q.number} - severity ${s}`, s >= 4 ? 'critical' : 'success');
  };

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Triage Queue</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Severity-sorted. Tap a number to assign severity.
      </Text>

      {sorted.length === 0 ? (
        <View style={{ marginTop: spacing.xl }}>
          <EmptyState
            icon={<Activity size={48} color={t.textMuted} />}
            title="Triage queue is clear"
            message="Patients will appear here when reception checks them in."
          />
        </View>
      ) : null}

      <SectionHeader title={`${sorted.length} patients`} accent={role.accent} />
      {sorted.map((q) => (
        <View key={q.id} style={{ marginBottom: spacing.md }}>
          <ListRow
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
            onPress={() => toast.show(`Opening #${q.number}`, 'info')}
          />
          <Card style={{ marginTop: -spacing.sm, paddingVertical: spacing.sm }}>
            <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6, marginBottom: 6 }]}>
              SET SEVERITY
            </Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {[1, 2, 3, 4, 5].map((s) => {
                const tone =
                  s >= 4 ? '#EF4444' : s >= 3 ? '#F59E0B' : role.accent;
                const active = q.severity === s;
                return (
                  <Pressable key={s} onPress={() => onSetSeverity(q, s as QueueEntry['severity'])} style={{ flex: 1 }}>
                    <View
                      style={{
                        backgroundColor: active ? tone : t.bg,
                        borderColor: active ? tone : t.border,
                        borderWidth: 1.5,
                        borderRadius: 999,
                        paddingVertical: 8,
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={[
                          typography.caption,
                          { fontWeight: '700', color: active ? '#fff' : t.text },
                        ]}
                      >
                        Sev {s}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Card>
        </View>
      ))}
    </ScreenContainer>
  );
}
