import {
  Appointment,
  AuditEvent,
  AuthUser,
  ConsentRecord,
  FacilityKpi,
  FamilyMember,
  FeatureFlag,
  Insurance,
  LabSample,
  Notification,
  Prescription,
  QueueEntry,
  Telesession,
  Vitals,
} from './types';

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
  {
    id: 'rx-3',
    patientName: 'Nimal Perera',
    doctorName: 'Dr. Samanthi Fernando',
    issuedAt: '3 months ago',
    status: 'COMPLETED',
    items: [{ medication: 'Amoxicillin 500mg', dose: '1 capsule', frequency: 'TDS', duration: '7 days' }],
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

export const facilityKpis: FacilityKpi[] = [
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

export const teleSessions: Telesession[] = [
  { id: 't-1', patientName: 'Kasun Madushanka', reason: 'Diabetes follow-up', startsAt: 'Today, 4:30 PM', durationMin: 15, status: 'SCHEDULED' },
  { id: 't-2', patientName: 'Mihira Wickramasinghe', reason: 'Skin rash photos', startsAt: 'Today, 5:00 PM', durationMin: 10, status: 'SCHEDULED' },
  { id: 't-3', patientName: 'Sanduni Herath', reason: 'Post-op review', startsAt: 'Yesterday', durationMin: 18, status: 'COMPLETED' },
];

export const labSamples: LabSample[] = [
  { id: 'ls-1', patientName: 'Saman Kumara', testName: 'CBC + ESR', sampleType: 'EDTA blood', status: 'PENDING_COLLECTION', barcode: 'LB-26-00451', doctor: 'Dr. Samanthi' },
  { id: 'ls-2', patientName: 'Tharushi Dilrukshi', testName: 'HbA1c', sampleType: 'EDTA blood', collectedAt: '15 min ago', status: 'COLLECTED', barcode: 'LB-26-00452', doctor: 'Dr. Samanthi' },
  { id: 'ls-3', patientName: 'Pradeep Rathnayake', testName: 'CRP', sampleType: 'Plain blood', collectedAt: '40 min ago', status: 'IN_LAB', barcode: 'LB-26-00450', doctor: 'Dr. Asanka' },
  { id: 'ls-4', patientName: 'Imali Senarath', testName: 'Skin scrape KOH', sampleType: 'Skin scrape', collectedAt: '1h ago', status: 'RESULT_READY', barcode: 'LB-26-00449', doctor: 'Dr. Asanka' },
];

export const auditEvents: AuditEvent[] = [
  { id: 'ev-1', actor: 'Dr. Samanthi', role: 'Doctor', action: 'PATIENT.VIEW', target: 'Patient #1042 (S.Kumara)', ip: '10.10.2.14', at: '2 min ago', level: 'INFO' },
  { id: 'ev-2', actor: 'Kanchana Silva', role: 'Reception', action: 'APPOINTMENT.CREATE', target: 'Appt #882', ip: '10.10.2.7', at: '5 min ago', level: 'INFO' },
  { id: 'ev-3', actor: 'unknown', role: '-', action: 'AUTH.LOGIN_FAILED', target: 'admin@medix.lk', ip: '203.115.31.40', at: '8 min ago', level: 'WARN' },
  { id: 'ev-4', actor: 'Roshan Wickrama', role: 'Admin', action: 'ROLE.MANAGE', target: 'Role: Junior Doctor', ip: '10.10.1.5', at: '34 min ago', level: 'CRITICAL' },
  { id: 'ev-5', actor: 'Anushka Jayasuriya', role: 'Nurse', action: 'VITALS.CAPTURE', target: 'Visit #2210', ip: '10.10.2.9', at: '42 min ago', level: 'INFO' },
];

export const myNotifications: Notification[] = [
  { id: 'n-1', title: 'Take Metformin', body: '1 tablet now (BD)', category: 'MEDICATION', at: 'in 10 min', read: false },
  { id: 'n-2', title: 'Appointment confirmed', body: 'Dr. Samanthi - today 3:30 PM', category: 'APPOINTMENT', at: '2 hours ago', read: false },
  { id: 'n-3', title: 'Lab result available', body: 'CBC report uploaded', category: 'LAB', at: 'Yesterday', read: true },
  { id: 'n-4', title: 'New device signed in', body: 'iPhone 15 - Colombo', category: 'SECURITY', at: '3 days ago', read: true },
];

export const familyMembers: FamilyMember[] = [
  { id: 'fm-1', name: 'Hashini Perera', relation: 'Spouse', age: 36 },
  { id: 'fm-2', name: 'Dineth Perera', relation: 'Son', age: 8 },
  { id: 'fm-3', name: 'Indrani Perera', relation: 'Mother', age: 64 },
];

export const consents: ConsentRecord[] = [
  { id: 'c-1', grantedTo: 'Dr. Samanthi Fernando', scope: 'Full record (current visit)', validUntil: 'Today, 11:59 PM', status: 'ACTIVE' },
  { id: 'c-2', grantedTo: 'Colombo Central Pharmacy', scope: 'Active prescriptions only', validUntil: '30 Jun 2026', status: 'ACTIVE' },
  { id: 'c-3', grantedTo: 'Dr. Asanka Bandara', scope: 'Cardiology history', validUntil: '12 Mar 2026', status: 'EXPIRED' },
];

export const insuranceList: Insurance[] = [
  { id: 'in-1', patientName: 'Saman Kumara', insurer: 'Sanasa Insurance', policyNo: 'SI-9921', status: 'ELIGIBLE', coverage: 'OPD + Lab up to LKR 25,000' },
  { id: 'in-2', patientName: 'Imali Senarath', insurer: 'Allianz Lanka', policyNo: 'AL-7714', status: 'PENDING_VERIFICATION', coverage: 'Family plan (3 deps)' },
  { id: 'in-3', patientName: 'Tharushi Dilrukshi', insurer: 'AIA Health', policyNo: 'AIA-3380', status: 'EXPIRED', coverage: 'Lapsed 2 weeks ago' },
];

export const featureFlags: FeatureFlag[] = [
  { code: 'TELEMEDICINE', description: 'Enable WebRTC telemedicine consultations', enabled: true },
  { code: 'AI_ASSISTANT', description: 'In-app AI Health Assistant for patients', enabled: true },
  { code: 'WALLET_PASS', description: 'Apple Wallet / Google Wallet QR pass', enabled: false },
  { code: 'AR_PILL_ID', description: 'AR pill identifier in patient app', enabled: false },
  { code: 'FAMILY_ACCOUNTS', description: 'Linked dependent profiles', enabled: true },
];

export const aiChatHistory = [
  { id: 'ai-1', from: 'ai' as const, text: 'Hi Nimal! How can I help today? You can ask about your medications, results, or general health.' },
  { id: 'ai-2', from: 'me' as const, text: 'I forgot if Metformin is before or after food.' },
  { id: 'ai-3', from: 'ai' as const, text: 'Your prescription says Metformin 500mg twice daily, ideally WITH or just after meals to reduce stomach upset. If you missed a dose by less than 3 hours, take it now; otherwise skip and continue normally. Want me to set a reminder?' },
];

export const reportsData = {
  patientsThisWeek: [98, 112, 124, 130, 142, 88, 76],
  avgWaitWeek: [18, 16, 15, 14, 14, 12, 13],
  byDepartment: [
    { name: 'OPD', value: 64, accent: '#6366F1' },
    { name: 'Cardiology', value: 18, accent: '#0D9488' },
    { name: 'Pediatrics', value: 12, accent: '#F59E0B' },
    { name: 'Dermatology', value: 8, accent: '#8B5CF6' },
  ],
};

export const branches = [
  { id: 'br-1', name: 'Colombo Central', code: 'CMB-01', users: 38, status: 'ACTIVE' },
  { id: 'br-2', name: 'Kandy', code: 'KND-01', users: 22, status: 'ACTIVE' },
  { id: 'br-3', name: 'Galle', code: 'GAL-01', users: 14, status: 'ACTIVE' },
  { id: 'br-4', name: 'Jaffna', code: 'JAF-01', users: 9, status: 'PILOT' },
];
