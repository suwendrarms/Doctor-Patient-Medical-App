import React from 'react';
import { ScanLine } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { ScreenContainer, EmptyState, PrimaryButton } from '../../../src/design-system/components';
import { roleThemes, spacing } from '../../../src/design-system/tokens';

export default function ScanScreen() {
  const r = roleThemes.doctor;
  return (
    <ScreenContainer>
      <View style={{ height: spacing['2xl'] }} />
      <EmptyState
        icon={
          <LinearGradient
            colors={[r.gradientFrom, r.gradientTo]}
            style={{ width: 96, height: 96, borderRadius: 28, alignItems: 'center', justifyContent: 'center' }}
          >
            <ScanLine color="#fff" size={44} />
          </LinearGradient>
        }
        title="Scan Patient QR"
        message="Vision Camera + ML Kit barcode reader. Point at the patient QR to open their record instantly."
        cta={
          <PrimaryButton
            label="Coming soon"
            variant="soft"
            accent={r.accent}
            onPress={() => {}}
          />
        }
      />
    </ScreenContainer>
  );
}
