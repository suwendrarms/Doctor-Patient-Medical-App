import React, { createContext, useCallback, useContext, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { palette, radii, shadow, spacing, typography } from '../tokens';
import { useTheme } from '../theme';
import { PrimaryButton } from './PrimaryButton';

type Options = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
};

type ConfirmApi = { ask: (opts: Options) => Promise<boolean> };

const ConfirmCtx = createContext<ConfirmApi | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<Options | null>(null);
  const [resolver, setResolver] = useState<((v: boolean) => void) | null>(null);
  const t = useTheme();

  const ask = useCallback((o: Options) => {
    setOpts(o);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const close = (value: boolean) => {
    resolver?.(value);
    setOpts(null);
    setResolver(null);
  };

  return (
    <ConfirmCtx.Provider value={{ ask }}>
      {children}
      <Modal
        transparent
        visible={!!opts}
        animationType="fade"
        onRequestClose={() => close(false)}
      >
        <View style={styles.scrim}>
          <View style={[styles.card, { backgroundColor: t.card }, shadow.fab]}>
            <View style={styles.iconWrap}>
              <AlertTriangle size={28} color={opts?.destructive ? '#EF4444' : '#F59E0B'} />
            </View>
            <Text style={[styles.title, { color: t.text }]}>{opts?.title}</Text>
            {opts?.message ? (
              <Text style={[styles.msg, { color: t.textMuted }]}>{opts.message}</Text>
            ) : null}
            <View style={styles.actions}>
              <Pressable onPress={() => close(false)} style={styles.cancelBtn}>
                <Text style={[typography.bodyBold, { color: t.text }]}>
                  {opts?.cancelLabel ?? 'Cancel'}
                </Text>
              </Pressable>
              <PrimaryButton
                label={opts?.confirmLabel ?? 'Confirm'}
                variant="solid"
                gradient={
                  opts?.destructive ? ['#EF4444', '#B91C1C'] : ['#6366F1', '#8B5CF6']
                }
                onPress={() => close(true)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ConfirmCtx.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmCtx);
  if (!ctx) return { ask: async (_o: Options) => true };
  return ctx;
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    borderRadius: radii.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconWrap: { marginBottom: spacing.sm },
  title: { ...typography.titleL, textAlign: 'center' },
  msg: { ...typography.body, textAlign: 'center', maxWidth: 300 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, width: '100%' },
  cancelBtn: {
    flex: 1,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: palette.border,
  },
});
