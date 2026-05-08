import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  Avatar,
  SectionHeader,
  useToast,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useStore } from '../../../store';
import { Video, Phone, Mic, MicOff, VideoOff } from 'lucide-react-native';

export function Telemedicine() {
  const t = useTheme();
  const role = roleThemes.doctor;
  const toast = useToast();
  const sessions = useStore((s) => s.telemedicine);
  const upcoming = sessions.filter((s) => s.status === 'SCHEDULED');
  const past = sessions.filter((s) => s.status === 'COMPLETED');

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Telemedicine</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Video consults with structured notes panel.
      </Text>

      <SectionHeader title="Live preview" accent={role.accent} />
      <LinearGradient
        colors={[role.gradientFrom, role.gradientTo]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.callPreview}
      >
        <View style={styles.callTop}>
          <Pill label="STANDBY" tone="info" />
          <Text style={[typography.caption, { color: 'rgba(255,255,255,0.85)' }]}>WebRTC ready</Text>
        </View>
        <View style={styles.callMid}>
          <Avatar name="Kasun Madushanka" size={88} gradient={['#fff', '#D1FAE5']} />
          <Text style={[typography.titleL, { color: '#fff', marginTop: spacing.md }]}>
            Kasun Madushanka
          </Text>
          <Text style={[typography.caption, { color: 'rgba(255,255,255,0.85)' }]}>
            Diabetes follow-up - 4:30 PM
          </Text>
        </View>
        <View style={styles.callControls}>
          <CtrlBtn><Mic color="#fff" size={20} /></CtrlBtn>
          <CtrlBtn><Video color="#fff" size={20} /></CtrlBtn>
          <CtrlBtn primary><Phone color="#fff" size={22} /></CtrlBtn>
          <CtrlBtn><MicOff color="#fff" size={20} /></CtrlBtn>
          <CtrlBtn><VideoOff color="#fff" size={20} /></CtrlBtn>
        </View>
      </LinearGradient>

      <SectionHeader title="Upcoming" accent={role.accent} />
      {upcoming.map((s) => (
        <View key={s.id} style={{ marginBottom: spacing.md }}>
          <Card>
            <View style={styles.row}>
              <Avatar name={s.patientName} gradient={[role.gradientFrom, role.gradientTo]} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleM, { color: t.text }]}>{s.patientName}</Text>
                <Text style={[typography.body, { color: t.textMuted }]}>{s.reason}</Text>
                <Text style={[typography.caption, { color: t.textMuted, marginTop: 2 }]}>
                  {s.startsAt} - {s.durationMin} min
                </Text>
              </View>
              <PrimaryButton
                label="Join"
                variant="solid"
                gradient={[role.gradientFrom, role.gradientTo]}
                icon={<Video color="#fff" size={16} />}
                onPress={() => toast.show(`Connecting to ${s.patientName}...`, 'info')}
              />
            </View>
          </Card>
        </View>
      ))}

      <SectionHeader title="Recent" accent={role.accent} />
      {past.map((s) => (
        <View key={s.id} style={{ marginBottom: spacing.md }}>
          <Card>
            <View style={styles.row}>
              <Avatar name={s.patientName} gradient={[role.gradientFrom, role.gradientTo]} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleM, { color: t.text }]}>{s.patientName}</Text>
                <Text style={[typography.caption, { color: t.textMuted }]}>
                  {s.reason} - {s.startsAt} - {s.durationMin} min
                </Text>
              </View>
              <Pill label={s.status} tone="success" />
            </View>
          </Card>
        </View>
      ))}
    </ScreenContainer>
  );
}

function CtrlBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <View
      style={[
        styles.ctrlBtn,
        { backgroundColor: primary ? '#EF4444' : 'rgba(255,255,255,0.18)' },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  callPreview: {
    borderRadius: radii.xl,
    padding: spacing.xl,
    minHeight: 360,
  },
  callTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  callMid: { alignItems: 'center', marginTop: spacing.xl, gap: 4 },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xl,
  },
  ctrlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
