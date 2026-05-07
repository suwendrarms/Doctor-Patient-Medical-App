import { Appointment, AuthUser, Prescription, QueueEntry, Vitals } from './types';

export const demoUsers: AuthUser[] = [
  { id: 'u-pat-1', name: 'Nimal Perera', role: 'patient', branch: 'Colombo Central' },
  { id: 'u-doc-1', name: 'Dr. Samanthi Fernando', role: 'doctor', branch: 'Colombo Central' },
  { id: 'u-rec-1', name: 'Kanchana Silva', role: 'reception', branch: 'Colombo Central' },
  { id: 'u-nur-1', name: 'Anushka Jayasuriya', role: 'nurse', branch: 'Colombo Central' },
  { id: 'u-adm-1', name: 'Roshan Wickrama', role: 'admin', branch: 'Headquarters' },
];

export const myAppointments: Appointment[] = [
  {
    id: 'a-1',
    patientName: 'Nimal Perera',
    doctorName: 'Dr. Samanthi Fernando',
    specialization: 'General Practitioner',
    startsAt: 'Today, 3:30 PM',
    status: 'CONFIRMED',
    branch: 'Colombo Central',
  },
  {
    id: 'a-2',
    patientName: 'Nimal Perera',
    doctorName: 'Dr. Asanka Bandara',
    specialization: 'Cardiology',
    startsAt: 'Sat, 11:00 AM',
    status: 'BOOKED',
    branch: 'Colombo Central',
  },
];

export const myPrescriptions: Prescription[] = [
  {
    id: 'rx-1',
    patientName: 'Nimal Perera',
    doctorName: 'Dr. Samanthi Fernando',
    issuedAt: '2 days ago',
    status: 'ACTIVE',
    items: [
      { medication: 'Metformin 500mg', dose: '1 tablet', frequency: 'BD', duration: '30 days' },
      { medication: 'Atorvastatin 10mg', dose: '1 tablet', frequency: 'HS', duration: '30 days' },
    ],
  },
  {
    id: 'rx-2',
    patientName: 'Nimal Perera',
    doctorName: 'Dr. Asanka Bandara',
    issuedAt: 'Last week',
    status: 'PENDING_REFILL',
    items: [{ medication: 'Losartan 50mg', dose: '1 tablet', frequency: 'OD', duration: '30 days' }],
  },
];

export const todayQueue: QueueEntry[] = [
  {
    id: 'q-1',
    number: 12,
    patientName: 'Saman Kumara',
    reason: 'Chest pain',
    arrivedAt: '10 min ago',
    severity: 5,
    status: 'TRIAGED',
    doctor: 'Dr. Samanthi Fernando',
  },
  {
    id: 'q-2',
    number: 13,
    patientName: 'Tharushi Dilrukshi',
    reason: 'Routine follow-up',
    arrivedAt: '12 min ago',
    severity: 2,
    status: 'WAITING',
    doctor: 'Dr. Samanthi Fernando',
  },
  {
    id: 'q-3',
    number: 14,
    patientName: 'Pradeep Rathnayake',
    reason: 'Fever, cough',
    arrivedAt: '15 min ago',
    severity: 3,
    status: 'WAITING',
    doctor: 'Dr. Samanthi Fernando',
  },
  {
    id: 'q-4',
    number: 15,
    patientName: 'Imali Senarath',
    reason: 'Skin allergy',
    arrivedAt: '20 min ago',
    severity: 2,
    status: 'WAITING',
    doctor: 'Dr. Asanka Bandara',
  },
];

export const triageQueue: QueueEntry[] = todayQueue.filter((q) => q.status !== 'IN_CONSULT');

export const lastVitals: Vitals = {
  bp: '128/82',
  pulse: 78,
  temperature: 36.8,
  spo2: 98,
  weight: 72.5,
  height: 174,
};

export const facilityKpis = [
  { label: 'Patients today', value: 142, delta: '+8% vs yesterday' },
  { label: 'Avg wait', value: '14m', delta: '-3m this week' },
  { label: 'No-show rate', value: '4.2%', delta: '-0.6% this month' },
  { label: 'NPS', value: 72, delta: '+5 this quarter' },
];

export const masterUpdates = [
  { id: 'm-1', title: 'New medication: Zentilex 500mg', requestedBy: 'Dr. Samanthi', status: 'PENDING' },
  { id: 'm-2', title: 'Allergen: Yellow dye 5', requestedBy: 'Nurse Anushka', status: 'PENDING' },
  { id: 'm-3', title: 'ICD-10: A92.5 (Zika)', requestedBy: 'Dr. Asanka', status: 'AUTO_APPROVED' },
];

export const userManagementSeed = [
  { id: 'um-1', name: 'Dr. Samanthi Fernando', role: 'Doctor', branch: 'Colombo Central', status: 'ACTIVE' },
  { id: 'um-2', name: 'Anushka Jayasuriya', role: 'Nurse', branch: 'Colombo Central', status: 'ACTIVE' },
  { id: 'um-3', name: 'Kanchana Silva', role: 'Reception', branch: 'Colombo Central', status: 'ACTIVE' },
  { id: 'um-4', name: 'Dr. Asanka Bandara', role: 'Doctor', branch: 'Kandy', status: 'INVITED' },
];
