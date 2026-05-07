import React, { useState } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Avatar,
  Pill,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';
import { Calendar, Bell, LogOut, Globe } from 'lucide-react-native';

const languages = ['English', 'සිංහල', 'தமிழ்'];

export function ReceptionProfile() {
  const t = useTheme();
  const role = roleThemes.reception;
  const { user, signOut } = useAuth();
  const [lang, setLang] = useState('English');
  const [walkIn, setWalkIn] = useState(true);

  return (
    <ScreenContainer>
      <Card>
        <View style={styles.header}>
          <Avatar name={user?.name ?? 'R'} size={64} gradient={[role.gradientFrom, role.gradientTo]} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleL, { color: t.text }]}>{user?.name}</Text>
            <Text style={[typography.body, { color: t.textMuted }]}>Reception - {user?.branch}</Text>
            <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
              <Pill label="On shift" tone="success" />
              <Pill label="OPD-Lobby" tone="info" />
            </View>
          </View>
        </View>
      </Card>

      <SectionHeader title="Today's shift" accent={role.accent} />
      <Card>
        <Row icon={<Calendar color={role.accent} size={20} />} label="Shift" value="Morning - 8 AM to 4 PM" />
        <Divider />
        <Row icon={<Calendar color={role.accent} size={20} />} label="Coverage" value="OPD-Lobby + Phone" />
        <Divider />
        <Row icon={<Calendar color={role.accent} size={20} />} label="Next shift swap" value="Sat 11 May - 12 PM" />
      </Card>

      <SectionHeader title="Preferences" accent={role.accent} />
      <Card>
        <View style={styles.prefRow}>
          <Globe size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Language</Text>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {languages.map((l) => (
              <View
                key={l}
                style={[
                  styles.langChip,
                  {
                    backgroundColor: l === lang ? role.accent : t.bg,
                    borderColor: l === lang ? role.accent : t.border,
                  },
                ]}
              >
                <Text
                  onPress={() => setLang(l)}
                  style={[
                    typography.caption,
                    { color: l === lang ? '#fff' : t.text, fontWeight: '600' },
                  ]}
                >
                  {l}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Divider />
        <View style={styles.prefRow}>
          <Bell size={20} color={role.accent} />
          <Text style={[typography.body, { color: t.text, flex: 1 }]}>Auto-suggest walk-in slot</Text>
          <Switch value={walkIn} onValueChange={setWalkIn} trackColor={{ true: role.accent }} />
        </View>
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Sign out"
        variant="outline"
        accent="#EF4444"
        icon={<LogOut size={18} color="#EF4444" />}
        onPress={signOut}
      />
    </ScreenContainer>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  const t = useTheme();
  return (
    <View style={styles.row}>
      {icon}
      <Text style={[typography.body, { color: t.textMuted, flex: 1 }]}>{label}</Text>
      <Text style={[typography.bodyBold, { color: t.text }]}>{value}</Text>
    </View>
  );
}

function Divider() {
  const t = useTheme();
  return <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: t.border, marginVertical: 4 }} />;
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  prefRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  langChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
});
