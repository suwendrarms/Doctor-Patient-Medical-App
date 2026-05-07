import { RoleCode } from '../design-system/tokens';

export type AuthUser = {
  id: string;
  name: string;
  role: RoleCode;
  branch: string;
  avatarSeed?: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorName: string;
  specialization: string;
  startsAt: string;
  status: 'BOOKED' | 'CONFIRMED' | 'CHECKED_IN' | 'IN_CONSULT' | 'COMPLETED';
  branch: string;
};

export type Prescription = {
  id: string;
  patientName: string;
  doctorName: string;
  issuedAt: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING_REFILL';
  items: { medication: string; dose: string; frequency: string; duration: string }[];
};

export type QueueEntry = {
  id: string;
  number: number;
  patientName: string;
  reason: string;
  arrivedAt: string;
  severity: 1 | 2 | 3 | 4 | 5;
  status: 'WAITING' | 'TRIAGED' | 'IN_CONSULT' | 'DONE';
  doctor?: string;
};

export type Vitals = {
  bp: string;
  pulse: number;
  temperature: number;
  spo2: number;
  weight: number;
  height: number;
};
