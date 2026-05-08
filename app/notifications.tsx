import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  SectionHeader,
  Pill,
  EmptyState,
  useToast,
} from '../src/design-system/components';
import { roleThemes, spacing, typography } from '../src/design-system/tokens';
import { useTheme } from '../src/design-system/theme';
import { useStore } from '../src/store';
import { useAuth } from '../src/auth/AuthContext';
import { Bell, Check, CalendarCheck, Pill as PillIcon, FlaskConical, ShieldAlert } from 'lucide-react-native';
import { Notification } from '../src/data/types';

const iconFor = (cat: Notification['category']) => {
  switch (cat) {
    case 'APPOINTMENT': return CalendarCheck;
    case 'MEDICATION': return PillIcon;
    case 'LAB': return FlaskConical;
    case 'SECURITY': return ShieldAlert;
    default: return Bell;
  }
};

export default function NotificationsScreen() {
  const t = useTheme();
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const role = roleThemes[user?.role ?? 'patient'];

  const notifications = useStore((s) => s.notifications);
  const markRead = useStore((s) => s.markNotificationRead);
  const markAll = useStore((s) => s.markAllNotificationsRead);

  const unread = notifications.filter((n) => !n.read);

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        {unread.length > 0 ? `${unread.length} unread` : 'All caught up'}
      </Text>

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell size={48} color={t.textMuted} />}
          title="No notifications yet"
          message="You will see appointment, medication, lab and security updates here."
        />
      ) : null}

      {unread.length > 0 ? (
        <SectionHeader
          title="Unread"
          accent={role.accent}
          action={{
            label: 'Mark all read',
            onPress: () => {
              markAll();
              toast.show('All notifications marked read', 'success');
            },
          }}
        />
      ) : null}
      {unread.map((n) => {
        const Icon = iconFor(n.category);
        return (
          <Pressable
            key={n.id}
            onPress={() => {
              markRead(n.id);
              toast.show('Marked read', 'success');
            }}
          >
            <View style={{ marginBottom: spacing.md }}>
              <Card>
                <View style={styles.row}>
                  <Icon size={22} color={role.accent} />
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.bodyBold, { color: t.text }]}>{n.title}</Text>
                    <Text style={[typography.caption, { color: t.textMuted }]}>{n.body}</Text>
                    <Text style={[typography.caption, { color: t.textMuted, marginTop: 2 }]}>
                      {n.at}
                    </Text>
                  </View>
                  <Pill label={n.category} tone="info" />
                </View>
              </Card>
            </View>
          </Pressable>
        );
      })}

      {notifications.some((n) => n.read) ? (
        <SectionHeader title="Earlier" accent={role.accent} />
      ) : null}
      {notifications
        .filter((n) => n.read)
        .map((n) => {
          const Icon = iconFor(n.category);
          return (
            <View key={n.id} style={{ marginBottom: spacing.md, opacity: 0.7 }}>
              <Card>
                <View style={styles.row}>
                  <Icon size={20} color={t.textMuted} />
                  <View style={{ flex: 1 }}>
                    <Text style={[typography.bodyBold, { color: t.text }]}>{n.title}</Text>
                    <Text style={[typography.caption, { color: t.textMuted }]}>{n.body}</Text>
                    <Text style={[typography.caption, { color: t.textMuted, marginTop: 2 }]}>
                      {n.at}
                    </Text>
                  </View>
                  <Check size={16} color={t.textMuted} />
                </View>
              </Card>
            </View>
          );
        })}

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label="Close"
        variant="outline"
        accent={role.accent}
        onPress={() => router.back()}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
});
