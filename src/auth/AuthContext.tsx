import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthUser } from '../data/types';

type AuthState = {
  user: AuthUser | null;
  onboardingDone: boolean;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
  finishOnboarding: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  const value = useMemo<AuthState>(
    () => ({
      user,
      onboardingDone,
      signIn: setUser,
      signOut: () => setUser(null),
      finishOnboarding: () => setOnboardingDone(true),
    }),
    [user, onboardingDone],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
