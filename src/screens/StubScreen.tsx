import React from 'react';
import { Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { ScreenContainer, EmptyState, PrimaryButton } from '../design-system/components';
import { roleThemes, RoleCode, spacing } from '../design-system/tokens';

type Props = {
  role: RoleCode;
  title: string;
  message?: string;
};

export function StubScreen({ role, title, message }: Props) {
  const r = roleThemes[role];
  return (
    <ScreenContainer>
      <View style={{ height: spacing['2xl'] }} />
      <EmptyState
        icon={
          <LinearGradient
            colors={[r.gradientFrom, r.gradientTo]}
            style={{ width: 72, height: 72, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}
          >
            <Sparkles color="#fff" size={32} />
          </LinearGradient>
        }
        title={title}
        message={message ?? 'Phase 1 stub - this screen is wired to navigation and styled, ready for content.'}
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
