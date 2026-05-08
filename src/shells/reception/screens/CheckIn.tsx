import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScanLine, CheckCircle2, Search } from 'lucide-react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  Pill,
  Avatar,
  SectionHeader,
  useToast,
} from '../../../design-system/components';
import { useStore } from '../../../store';
import { roleThemes, spacing, typography, radii } from '../../../design-system/tokens';
import { useTheme } from '../../../design-system/theme';

export function CheckIn() {
  const t = useTheme();
  const role = roleThemes.reception;
  const toast = useToast();
  const addQueue = useStore((s) => s.addQueueEntry);
  const [scanned, setScanned] = useState(false);

  return (
    <ScreenContainer>
      <Text style={[typography.displayL, { color: t.text }]}>Check-in</Text>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Ask patient to show their QR. Tap below to simulate a scan.
      </Text>

      <View style={{ alignItems: 'center', marginTop: spacing.xl }}>
        <LinearGradient
          colors={[role.gradientFrom, role.gradientTo]}
          style={styles.scanFrame}
        >
          <View style={styles.scanInner}>
            <ScanLine color={role.accent} size={64} />
            <Text style={[typography.bodyBold, { color: t.text, marginTop: spacing.md }]}>
              {scanned ? 'Patient identified' : 'Camera viewfinder'}
            </Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              {scanned ? 'Loading record...' : 'Center the QR inside the frame'}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={{ height: spacing.lg }} />
      <PrimaryButton
        label={scanned ? 'Reset' : 'Simulate scan'}
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        icon={<ScanLine color="#fff" size={18} />}
        onPress={() => setScanned((s) => !s)}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton
        label="Search by NIC / phone"
        variant="outline"
        accent={role.accent}
        icon={<Search color={role.accent} size={18} />}
        onPress={() => toast.show('Manual search coming soon', 'info')}
      />

      {scanned ? (
        <>
          <SectionHeader title="Patient" accent={role.accent} />
          <Card>
            <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
              <Avatar name="Saman Kumara" size={56} gradient={[role.gradientFrom, role.gradientTo]} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleM, { color: t.text }]}>Saman Kumara</Text>
                <Text style={[typography.body, { color: t.textMuted }]}>NIC 19xxxxxxxxxx - 38 yrs</Text>
                <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs }}>
                  <Pill label="Allergy: Penicillin" tone="critical" />
                  <Pill label="Insured: Sanasa" tone="info" />
                </View>
              </View>
              <CheckCircle2 color={role.accent} size={28} />
            </View>
          </Card>

          <SectionHeader title="Assign to doctor" accent={role.accent} />
          <Card>
            <Text style={[typography.bodyBold, { color: t.text }]}>Dr. Samanthi Fernando</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>OPD-2 - 6 in queue (~14m)</Text>
          </Card>
          <View style={{ height: spacing.sm }} />
          <Card>
            <Text style={[typography.bodyBold, { color: t.text }]}>Dr. Asanka Bandara</Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>OPD-3 - 3 in queue (~8m)</Text>
          </Card>

          <View style={{ height: spacing.lg }} />
          <PrimaryButton
            label="Confirm check-in"
            variant="solid"
            gradient={[role.gradientFrom, role.gradientTo]}
            onPress={() => {
              const entry = addQueue({
                patientName: 'Saman Kumara',
                reason: 'Walk-in',
                arrivedAt: 'just now',
                severity: 2,
                status: 'WAITING',
                doctor: 'Dr. Samanthi Fernando',
              });
              toast.show(`Token #${entry.number} - Saman Kumara`, 'success');
              setScanned(false);
            }}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scanFrame: {
    padding: spacing.md,
    borderRadius: radii.xl,
    width: '100%',
    aspectRatio: 1,
    maxHeight: 320,
  },
  scanInner: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.lg,
    padding: spacing.xl,
  },
});
