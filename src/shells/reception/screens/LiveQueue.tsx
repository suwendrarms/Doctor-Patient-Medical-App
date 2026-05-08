import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  Pill,
  ListRow,
  Avatar,
  PrimaryButton,
  SectionHeader,
  EmptyState,
  useToast,
  useConfirm,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';
import { Plus, Users } from 'lucide-react-native';
import { QueueEntry } from '../../../data/types';

export function LiveQueue() {
  const t = useTheme();
  const role = roleThemes.reception;
  const router = useRouter();
  const toast = useToast();
  const confirm = useConfirm();

  const queue = useStore((s) => s.queue);
  const setSeverity = useStore((s) => s.setSeverity);
  const removeQueueEntry = useStore((s) => s.removeQueueEntry);

  const grouped = groupBy(queue, 'doctor');

  const onEscalate = (q: QueueEntry) => {
    setSeverity(q.id, 5);
    toast.show(`#${q.number} escalated to critical`, 'warning');
  };

  const onNoShow = async (q: QueueEntry) => {
    const ok = await confirm.ask({
      title: `Mark #${q.number} as no-show?`,
      message: `${q.patientName} will be removed from the queue.`,
      confirmLabel: 'Mark no-show',
      destructive: true,
    });
    if (!ok) return;
    removeQueueEntry(q.id);
    toast.show(`#${q.number} marked no-show`, 'info');
  };

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Live Queue Board</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Realtime - reorder, escalate, or mark no-show.
      </Text>

      {queue.length === 0 ? (
        <View style={{ marginTop: spacing.xl }}>
          <EmptyState
            icon={<Users size={48} color={t.textMuted} />}
            title="No patients in queue"
            message="The queue updates in real time as patients check in."
            cta={
              <PrimaryButton
                label="Add walk-in"
                variant="solid"
                gradient={[role.gradientFrom, role.gradientTo]}
                icon={<Plus color="#fff" size={18} />}
                onPress={() => router.push('/add-walkin')}
              />
            }
          />
        </View>
      ) : null}

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
            <View key={q.id} style={{ marginBottom: spacing.md }}>
              <ListRow
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
                onPress={() => toast.show(`#${q.number} - ${q.patientName}`, 'info')}
              />
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: -spacing.md + 4, paddingHorizontal: 4 }}>
                <Pressable
                  onPress={() => onEscalate(q)}
                  style={{ flex: 1 }}
                >
                  <Pill label="Escalate" tone="warning" style={{ alignSelf: 'stretch' }} />
                </Pressable>
                <Pressable
                  onPress={() => onNoShow(q)}
                  style={{ flex: 1 }}
                >
                  <Pill label="No-show" tone="critical" style={{ alignSelf: 'stretch' }} />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      ))}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Add walk-in"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<Plus color="#fff" size={18} />}
        onPress={() => router.push('/add-walkin')}
      />
    </ScreenContainer>
  );
}

function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T) {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = (item[key] as string) ?? 'Unassigned';
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});
}
