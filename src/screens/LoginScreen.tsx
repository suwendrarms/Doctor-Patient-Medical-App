import React, { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import {
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Fingerprint,
  Phone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { ScreenContainer, PrimaryButton } from '../design-system/components';
import {
  roleThemes,
  spacing,
  typography,
  radii,
  shadow,
} from '../design-system/tokens';
import { useTheme } from '../design-system/theme';
import { useAuth } from '../auth/AuthContext';
import { demoUsers } from '../data/fixtures';

type Step = 'PHONE' | 'OTP';

export function LoginScreen() {
  const t = useTheme();
  const { signIn } = useAuth();

  const [step, setStep] = useState<Step>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showRoles, setShowRoles] = useState(false);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const phoneOk = /^\d{9,10}$/.test(phone.replace(/\s+/g, ''));
  const otpOk = otp.every((d) => d.length === 1);

  useEffect(() => {
    if (step === 'OTP') otpRefs.current[0]?.focus();
  }, [step]);

  const sendOtp = () => {
    if (!phoneOk) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setStep('OTP');
  };

  const verifyOtp = () => {
    if (!otpOk) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    signIn(demoUsers[0]); // demo: phone OTP path lands as Patient
  };

  const handleOtpChange = (i: number, v: string) => {
    const clean = v.slice(-1).replace(/\D/g, '');
    const copy = [...otp];
    copy[i] = clean;
    setOtp(copy);
    if (clean && i < 5) otpRefs.current[i + 1]?.focus();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenContainer scroll>
        <View style={styles.brand}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.logo, shadow.card]}
          >
            <Stethoscope color="#fff" size={28} />
          </LinearGradient>
          <Text style={[styles.brandName, { color: t.text }]}>Medix</Text>
          <Text style={[styles.brandTag, { color: t.textMuted }]}>
            One unified app for every role in your facility.
          </Text>
        </View>

        <View style={styles.security}>
          <ShieldCheck size={16} color={t.textMuted} />
          <Text style={[styles.securityText, { color: t.textMuted }]}>
            Encrypted by default - biometric & 2FA on supported devices.
          </Text>
        </View>

        {step === 'PHONE' ? (
          <View style={styles.formCard}>
            <Text style={[typography.titleM, { color: t.text }]}>Sign in</Text>
            <Text style={[typography.caption, { color: t.textMuted, marginTop: 4 }]}>
              We will send a one-time code to your phone.
            </Text>

            <View style={[styles.phoneRow, { backgroundColor: t.bg, borderColor: t.border }]}>
              <View style={styles.cc}>
                <Text style={[typography.bodyBold, { color: t.text }]}>+94</Text>
              </View>
              <Phone size={18} color={t.textMuted} />
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="71 234 5678"
                placeholderTextColor={t.textMuted}
                keyboardType="phone-pad"
                style={[typography.titleM, { flex: 1, color: t.text, padding: 0 }]}
              />
            </View>

            <View style={{ height: spacing.md }} />
            <PrimaryButton
              label="Send OTP"
              variant="solid"
              gradient={['#6366F1', '#8B5CF6']}
              onPress={sendOtp}
              disabled={!phoneOk}
              icon={<ArrowRight color="#fff" size={18} />}
            />
            <View style={{ height: spacing.sm }} />
            <PrimaryButton
              label="Sign in with biometric"
              variant="outline"
              accent="#6366F1"
              onPress={() => signIn(demoUsers[0])}
              icon={<Fingerprint color="#6366F1" size={18} />}
            />
          </View>
        ) : (
          <View style={styles.formCard}>
            <Text style={[typography.titleM, { color: t.text }]}>Enter the 6-digit code</Text>
            <Text style={[typography.caption, { color: t.textMuted, marginTop: 4 }]}>
              We sent it to +94 {phone}. Try any 6 digits in this demo.
            </Text>

            <View style={styles.otpRow}>
              {otp.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(r) => {
                    otpRefs.current[i] = r;
                  }}
                  value={d}
                  onChangeText={(v) => handleOtpChange(i, v)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={[
                    styles.otpBox,
                    {
                      backgroundColor: t.bg,
                      borderColor: d ? '#6366F1' : t.border,
                      color: t.text,
                    },
                  ]}
                />
              ))}
            </View>

            <View style={{ height: spacing.md }} />
            <PrimaryButton
              label="Verify"
              variant="solid"
              gradient={['#6366F1', '#8B5CF6']}
              onPress={verifyOtp}
              disabled={!otpOk}
              icon={<ArrowRight color="#fff" size={18} />}
            />
            <View style={{ height: spacing.sm }} />
            <PrimaryButton
              label="Change number"
              variant="outline"
              accent="#6366F1"
              onPress={() => {
                setStep('PHONE');
                setOtp(['', '', '', '', '', '']);
              }}
            />
          </View>
        )}

        <Pressable onPress={() => setShowRoles((s) => !s)} style={styles.toggleRow}>
          <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 1.4 }]}>
            DEMO - PICK A ROLE INSTEAD
          </Text>
          {showRoles ? <ChevronUp size={16} color={t.textMuted} /> : <ChevronDown size={16} color={t.textMuted} />}
        </Pressable>

        {showRoles ? (
          <View style={styles.list}>
            {demoUsers.map((user) => {
              const role = roleThemes[user.role];
              return (
                <Pressable
                  key={user.id}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                    signIn(user);
                  }}
                  style={({ pressed }) => [pressed && { transform: [{ scale: 0.98 }] }]}
                >
                  <LinearGradient
                    colors={[role.gradientFrom, role.gradientTo]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.card, shadow.card]}
                  >
                    <View style={styles.flex}>
                      <Text style={styles.cardLabel}>{role.label.toUpperCase()}</Text>
                      <Text style={styles.cardName}>{user.name}</Text>
                      <Text style={styles.cardBranch}>{user.branch}</Text>
                    </View>
                    <ArrowRight color="#fff" size={22} />
                  </LinearGradient>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.xl },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandName: { ...typography.displayXl },
  brandTag: { ...typography.body, textAlign: 'center', maxWidth: 280, marginTop: spacing.xs },
  security: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  securityText: { ...typography.caption },
  formCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: spacing.md,
  },
  cc: { paddingRight: spacing.sm, borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: '#E2E8F0' },
  otpRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, justifyContent: 'space-between' },
  otpBox: {
    width: 44,
    height: 56,
    borderRadius: radii.md,
    borderWidth: 1.5,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  list: { gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radii.lg,
    minHeight: 88,
  },
  flex: { flex: 1 },
  cardLabel: { ...typography.caption, color: 'rgba(255,255,255,0.85)', letterSpacing: 1.2 },
  cardName: { ...typography.titleL, color: '#fff', marginTop: 2 },
  cardBranch: { ...typography.caption, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
});
