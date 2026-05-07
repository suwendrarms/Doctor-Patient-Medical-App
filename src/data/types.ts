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

export type Telesession = {
  id: string;
  patientName: string;
  reason: string;
  startsAt: string;
  durationMin: number;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'MISSED';
};

export type LabSample = {
  id: string;
  patientName: string;
  testName: string;
  sampleType: string;
  collectedAt?: string;
  status: 'PENDING_COLLECTION' | 'COLLECTED' | 'IN_LAB' | 'RESULT_READY';
  barcode: string;
  doctor: string;
};

export type AuditEvent = {
  id: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ip: string;
  at: string;
  level: 'INFO' | 'WARN' | 'CRITICAL';
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  category: 'APPOINTMENT' | 'MEDICATION' | 'LAB' | 'SECURITY' | 'SYSTEM';
  at: string;
  read: boolean;
};

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  age: number;
};

export type ConsentRecord = {
  id: string;
  grantedTo: string;
  scope: string;
  validUntil: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
};

export type FacilityKpi = { label: string; value: string | number; delta: string };

export type FeatureFlag = { code: string; description: string; enabled: boolean };

export type Insurance = {
  id: string;
  patientName: string;
  insurer: string;
  policyNo: string;
  status: 'ELIGIBLE' | 'EXPIRED' | 'PENDING_VERIFICATION';
  coverage: string;
};
