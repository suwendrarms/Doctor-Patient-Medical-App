import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stethoscope, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { ScreenContainer, PrimaryButton } from '../design-system/components';
import { roleThemes, spacing, typography, radii, shadow } from '../design-system/tokens';
import { useTheme } from '../design-system/theme';
import { useAuth } from '../auth/AuthContext';
import { demoUsers } from '../data/fixtures';

export function LoginScreen() {
  const t = useTheme();
  const { signIn } = useAuth();

  return (
    <ScreenContainer scroll>
      <View style={styles.brand}>
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logo}
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
          Encrypted by default. Biometric & 2FA on supported devices.
        </Text>
      </View>

      <Text style={[styles.demoLabel, { color: t.textMuted }]}>
        DEMO - PICK A ROLE TO CONTINUE
      </Text>

      <View style={styles.list}>
        {demoUsers.map((user) => {
          const role = roleThemes[user.role];
          return (
            <Pressable
              key={user.id}
              onPress={() => signIn(user)}
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

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Use phone OTP instead"
        variant="outline"
        accent="#6366F1"
        onPress={() => signIn(demoUsers[0])}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xl },
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
  demoLabel: { ...typography.caption, letterSpacing: 1.4, marginBottom: spacing.md },
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
