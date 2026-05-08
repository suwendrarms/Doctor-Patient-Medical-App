import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react-native';
import { palette, radii, shadow, spacing, typography } from '../tokens';

type Tone = 'success' | 'warning' | 'critical' | 'info';

type ToastItem = {
  id: number;
  message: string;
  tone: Tone;
};

type ToastApi = { show: (message: string, tone?: Tone) => void };

const ToastCtx = createContext<ToastApi | null>(null);

const toneMap: Record<Tone, { bg: string; fg: string; Icon: any }> = {
  success: { bg: '#0F766E', fg: '#fff', Icon: CheckCircle2 },
  warning: { bg: '#B45309', fg: '#fff', Icon: AlertTriangle },
  critical: { bg: '#B91C1C', fg: '#fff', Icon: XCircle },
  info: { bg: '#1E40AF', fg: '#fff', Icon: Info },
};

let _id = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<ToastItem | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(40)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
      Animated.timing(translate, { toValue: 40, duration: 180, useNativeDriver: true }),
    ]).start(() => setItem(null));
  }, [opacity, translate]);

  const show = useCallback(
    (message: string, tone: Tone = 'success') => {
      _id += 1;
      setItem({ id: _id, message, tone });
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(translate, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(dismiss, 2600);
    },
    [opacity, translate, dismiss],
  );

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const meta = item ? toneMap[item.tone] : null;
  const Icon = meta?.Icon;

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      {item && meta ? (
        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.wrap,
            { opacity, transform: [{ translateY: translate }] },
          ]}
        >
          <Pressable onPress={dismiss}>
            <View style={[styles.toast, { backgroundColor: meta.bg }, shadow.fab]}>
              {Icon ? <Icon color={meta.fg} size={20} /> : null}
              <Text style={[styles.msg, { color: meta.fg }]} numberOfLines={2}>
                {item.message}
              </Text>
              <X color={meta.fg} size={16} />
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    return { show: (_m: string, _t?: Tone) => {} };
  }
  return ctx;
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing['2xl'] + 60,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    minWidth: 200,
    maxWidth: '100%',
  },
  msg: { ...typography.bodyBold, flex: 1 },
});
