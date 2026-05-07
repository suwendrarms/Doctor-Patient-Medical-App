import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { PatientShell } from '../shells/patient/PatientShell';
import { DoctorShell } from '../shells/doctor/DoctorShell';
import { ReceptionShell } from '../shells/reception/ReceptionShell';
import { NurseShell } from '../shells/nurse/NurseShell';
import { AdminShell } from '../shells/admin/AdminShell';

export function RoleRouter() {
  const { user, onboardingDone } = useAuth();

  if (!onboardingDone) return <OnboardingScreen />;
  if (!user) return <LoginScreen />;

  switch (user.role) {
    case 'patient':
      return <PatientShell />;
    case 'doctor':
      return <DoctorShell />;
    case 'reception':
      return <ReceptionShell />;
    case 'nurse':
      return <NurseShell />;
    case 'admin':
      return <AdminShell />;
    default:
      return <LoginScreen />;
  }
}
