import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ScanBarcode, CheckCircle2, ScanLine } from 'lucide-react-native';
import {
  ScreenContainer,
  Card,
  PrimaryButton,
  SectionHeader,
  Pill,
  useToast,
} from '../src/design-system/components';
import { roleThemes, spacing, typography, radii } from '../src/design-system/tokens';
import { useTheme } from '../src/design-system/theme';
import { useStore } from '../src/store';

export default function AdministerMed() {
  const t = useTheme();
  const role = roleThemes.nurse;
  const router = useRouter();
  const toast = useToast();
  const logAudit = useStore((s) => s.logAudit);

  const [patientScanned, setPatientScanned] = useState(false);
  const [medScanned, setMedScanned] = useState(false);
  const [med, setMed] = useState('Cefuroxime 750mg IV');
  const [dose, setDose] = useState('1 vial');
  const [notes, setNotes] = useState('');

  const allOk = patientScanned && medScanned;

  const submit = () => {
    if (!allOk) return;
    logAudit({
      actor: 'Anushka Jayasuriya',
      role: 'Nurse',
      action: 'MEDICATION.ADMINISTER',
      target: med,
      ip: '10.10.2.9',
      level: 'INFO',
    });
    toast.show(`${med} administered - audited`, 'success');
    router.back();
  };

  return (
    <ScreenContainer>
      <Text style={[typography.body, { color: t.textMuted, marginTop: spacing.xs }]}>
        Two-factor verification: scan the patient QR and the medication barcode.
      </Text>

      <SectionHeader title="Patient" accent={role.accent} />
      <Card>
        <View style={styles.row}>
          <ScanLine color={role.accent} size={22} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: t.text }]}>
              {patientScanned ? 'Saman Kumara - Token #12' : 'Not scanned yet'}
            </Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              {patientScanned ? 'Allergies: Penicillin' : 'Tap to simulate scan'}
            </Text>
          </View>
          {patientScanned ? <CheckCircle2 color={role.accent} size={22} /> : null}
        </View>
        <View style={{ height: spacing.sm }} />
        <PrimaryButton
          label={patientScanned ? 'Re-scan patient QR' : 'Scan patient QR'}
          variant={patientScanned ? 'soft' : 'solid'}
          gradient={[role.gradientFrom, role.gradientTo]}
          accent={role.accent}
          icon={<ScanLine size={16} color={patientScanned ? role.accent : '#fff'} />}
          onPress={() => setPatientScanned(true)}
        />
      </Card>

      <SectionHeader title="Medication" accent={role.accent} />
      <Card>
        <View style={styles.row}>
          <ScanBarcode color={role.accent} size={22} />
          <View style={{ flex: 1 }}>
            <Text style={[typography.bodyBold, { color: t.text }]}>
              {medScanned ? med : 'Not scanned yet'}
            </Text>
            <Text style={[typography.caption, { color: t.textMuted }]}>
              {medScanned ? `Dose: ${dose}` : 'Tap to simulate barcode scan'}
            </Text>
          </View>
          {medScanned ? <CheckCircle2 color={role.accent} size={22} /> : null}
        </View>
        <View style={{ height: spacing.sm }} />
        <PrimaryButton
          label={medScanned ? 'Re-scan medication' : 'Scan medication barcode'}
          variant={medScanned ? 'soft' : 'solid'}
          gradient={[role.gradientFrom, role.gradientTo]}
          accent={role.accent}
          icon={<ScanBarcode size={16} color={medScanned ? role.accent : '#fff'} />}
          onPress={() => setMedScanned(true)}
        />
      </Card>

      {medScanned ? (
        <>
          <SectionHeader title="Confirm details" accent={role.accent} />
          <Card>
            <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>
              MEDICATION
            </Text>
            <TextInput value={med} onChangeText={setMed} style={[typography.titleM, { color: t.text, padding: 0 }]} />
            <View style={{ height: spacing.sm }} />
            <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>DOSE</Text>
            <TextInput value={dose} onChangeText={setDose} style={[typography.titleM, { color: t.text, padding: 0 }]} />
            <View style={{ height: spacing.sm }} />
            <Text style={[typography.caption, { color: t.textMuted, letterSpacing: 0.6 }]}>NOTES</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="Site, route, observations..."
              placeholderTextColor={t.textMuted}
              multiline
              style={[typography.body, { color: t.text, padding: 0, minHeight: 60, textAlignVertical: 'top' }]}
            />
          </Card>
        </>
      ) : null}

      {!allOk ? (
        <View style={{ marginTop: spacing.lg }}>
          <Pill label="Both scans required to administer" tone="warning" />
        </View>
      ) : null}

      <View style={{ height: spacing.xl }} />
      <PrimaryButton
        label="Mark administered"
        variant="solid"
        gradient={[role.gradientFrom, role.gradientTo]}
        onPress={submit}
        disabled={!allOk}
      />
      <View style={{ height: spacing.sm }} />
      <PrimaryButton label="Cancel" variant="outline" accent={role.accent} onPress={() => router.back()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
