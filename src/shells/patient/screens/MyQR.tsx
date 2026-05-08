import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { ShieldCheck, RefreshCw, Clock } from 'lucide-react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  SectionHeader,
} from '../../../design-system/components';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';
import { useAuth } from '../../../auth/AuthContext';

export function MyQR() {
  const t = useTheme();
  const role = roleThemes.patient;
  const router = useRouter();
  const { user } = useAuth();
  const [token, setToken] = useState(genToken());
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setToken(genToken());
          return 60;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>My Medical QR</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Show this to clinic staff so they can pull your record. Token rotates every minute.
      </Text>

      <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
        <LinearGradient
          colors={[role.gradientFrom, role.gradientTo]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.qrFrame}
        >
          <View style={styles.qrInner}>
            <QRCode value={token} size={220} />
          </View>
        </LinearGradient>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.lg }}>
          <Clock size={16} color={t.textMuted} />
          <Text style={[typography.caption, { color: t.textMuted }]}>
            Rotates in {secondsLeft}s
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
          <Pill label="Patient verified" tone="success" />
          <Pill label="Consent: Care Team" tone="info" />
        </View>
      </View>

      <SectionHeader title="Recently scanned by" accent={role.accent} />
      <Card>
        <Text style={[typography.bodyBold, { color: t.text }]}>Dr. Samanthi Fernando</Text>
        <Text style={[typography.body, { color: t.textMuted }]}>Today, 3:31 PM - Colombo Central</Text>
      </Card>
      <View style={{ height: spacing.md }} />
      <Card>
        <Text style={[typography.bodyBold, { color: t.text }]}>Reception Kanchana</Text>
        <Text style={[typography.body, { color: t.textMuted }]}>Today, 3:24 PM - check-in</Text>
      </Card>

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Regenerate now"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<RefreshCw color="#fff" size={18} />}
        onPress={() => {
          setToken(genToken());
          setSecondsLeft(60);
        }}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton
        label="Manage consent"
        variant="outline"
        accent={role.accent}
        icon={<ShieldCheck color={role.accent} size={18} />}
        onPress={() => router.push('/(patient)/(tabs)/profile')}
      />
    </ScreenContainer>
  );
}

function genToken() {
  return 'medix:' + Math.random().toString(36).slice(2, 10) + '.' + Date.now();
}

const styles = StyleSheet.create({
  qrFrame: {
    padding: spacing.md,
    borderRadius: radii.xl,
  },
  qrInner: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: radii.lg,
  },
});
