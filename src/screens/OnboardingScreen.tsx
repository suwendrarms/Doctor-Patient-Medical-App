import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stethoscope, QrCode, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, typography, radii, shadow } from '../design-system/tokens';
import { useTheme } from '../design-system/theme';
import { useAuth } from '../auth/AuthContext';

const { width } = Dimensions.get('window');

type Slide = {
  title: string;
  body: string;
  icon: React.ReactNode;
  gradient: [string, string];
};

const slides: Slide[] = [
  {
    title: 'One app, every role',
    body: 'Patients, doctors, reception, nurses and admins - the same Medix app, tailored per role.',
    icon: <Stethoscope size={64} color="#fff" />,
    gradient: ['#6366F1', '#38BDF8'],
  },
  {
    title: 'Your data, your QR',
    body: 'Show a rotating QR for instant, consented access. No paper, no repeating your story.',
    icon: <QrCode size={64} color="#fff" />,
    gradient: ['#0D9488', '#10B981'],
  },
  {
    title: 'Encrypted by default',
    body: 'TLS 1.3, biometrics, and an audit trail for every action. Your health data stays yours.',
    icon: <ShieldCheck size={64} color="#fff" />,
    gradient: ['#8B5CF6', '#D946EF'],
  },
];

export function OnboardingScreen() {
  const t = useTheme();
  const { finishOnboarding } = useAuth();
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const next = () => {
    if (index < slides.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
      setIndex(index + 1);
    } else {
      finishOnboarding();
    }
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: t.bg }]}>
      <Pressable onPress={finishOnboarding} style={styles.skip}>
        <Text style={[typography.bodyBold, { color: t.textMuted }]}>Skip</Text>
      </Pressable>

      <FlatList
        ref={ref}
        data={slides}
        keyExtractor={(_, i) => `slide-${i}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <LinearGradient
              colors={item.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.iconWrap, shadow.fab]}
            >
              {item.icon}
            </LinearGradient>
            <Text style={[styles.title, { color: t.text }]}>{item.title}</Text>
            <Text style={[styles.body, { color: t.textMuted }]}>{item.body}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === index ? slides[index].gradient[0] : t.border,
                width: i === index ? 22 : 8,
              },
            ]}
          />
        ))}
      </View>

      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.xl }}>
        <Pressable onPress={next}>
          <LinearGradient
            colors={slides[index].gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.cta, shadow.card]}
          >
            <Text style={[typography.bodyBold, { color: '#fff' }]}>
              {index === slides.length - 1 ? 'Get started' : 'Continue'}
            </Text>
            <ArrowRight color="#fff" size={20} />
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  skip: { position: 'absolute', top: 56, right: spacing.xl, zIndex: 10 },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  iconWrap: {
    width: 140,
    height: 140,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: { ...typography.displayXl, textAlign: 'center' },
  body: { ...typography.body, textAlign: 'center', maxWidth: 320, lineHeight: 22 },
  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginVertical: spacing.lg },
  dot: { height: 8, borderRadius: 4 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: radii.pill,
  },
});
