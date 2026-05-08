import { create } from 'zustand';
import {
  Appointment,
  AuditEvent,
  ConsentRecord,
  FamilyMember,
  FeatureFlag,
  Insurance,
  LabSample,
  Notification,
  Prescription,
  QueueEntry,
  Telesession,
  Vitals,
} from '../data/types';
import {
  auditEvents as seedAudit,
  branches as seedBranches,
  consents as seedConsents,
  facilityKpis as seedKpis,
  familyMembers as seedFamily,
  featureFlags as seedFlags,
  insuranceList as seedInsurance,
  labSamples as seedLab,
  masterUpdates as seedMasters,
  myAppointments as seedAppts,
  myNotifications as seedNotifs,
  myPrescriptions as seedRx,
  teleSessions as seedTele,
  todayQueue as seedQueue,
  userManagementSeed as seedUsers,
  lastVitals as seedVitals,
} from '../data/fixtures';

type MasterRequest = (typeof seedMasters)[number];
type ManagedUser = (typeof seedUsers)[number];
type Branch = (typeof seedBranches)[number];

let _id = 1;
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${_id++}`;

type State = {
  appointments: Appointment[];
  prescriptions: Prescription[];
  queue: QueueEntry[];
  vitals: Vitals;
  labSamples: LabSample[];
  family: FamilyMember[];
  consents: ConsentRecord[];
  insurance: Insurance[];
  notifications: Notification[];
  telemedicine: Telesession[];
  audit: AuditEvent[];
  users: ManagedUser[];
  masterRequests: MasterRequest[];
  branches: Branch[];
  flags: FeatureFlag[];
  kpis: typeof seedKpis;
};

type Actions = {
  // Appointments
  addAppointment: (a: Omit<Appointment, 'id' | 'status'> & Partial<Pick<Appointment, 'status'>>) => Appointment;
  cancelAppointment: (id: string) => void;
  // Prescriptions
  addPrescription: (rx: Omit<Prescription, 'id'>) => Prescription;
  requestRefill: (id: string) => void;
  approveRefill: (id: string) => void;
  // Queue
  addQueueEntry: (q: Omit<QueueEntry, 'id' | 'number'>) => QueueEntry;
  setSeverity: (id: string, severity: QueueEntry['severity']) => void;
  setQueueStatus: (id: string, status: QueueEntry['status']) => void;
  removeQueueEntry: (id: string) => void;
  // Vitals
  saveVitals: (v: Vitals) => void;
  // Lab
  setLabStatus: (id: string, status: LabSample['status']) => void;
  // Family
  addFamilyMember: (m: Omit<FamilyMember, 'id'>) => FamilyMember;
  removeFamilyMember: (id: string) => void;
  // Consents
  revokeConsent: (id: string) => void;
  // Insurance
  verifyInsurance: (id: string) => void;
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  pushNotification: (n: Omit<Notification, 'id' | 'read'>) => void;
  // Audit
  logAudit: (e: Omit<AuditEvent, 'id' | 'at'>) => void;
  // Users (admin)
  addUser: (u: Omit<ManagedUser, 'id'>) => ManagedUser;
  setUserStatus: (id: string, status: ManagedUser['status']) => void;
  // Masters
  addMasterRequest: (m: Omit<MasterRequest, 'id'>) => MasterRequest;
  approveMasterRequest: (id: string) => void;
  rejectMasterRequest: (id: string) => void;
  // Branches
  addBranch: (b: Omit<Branch, 'id'>) => Branch;
  // Flags
  toggleFlag: (code: string) => void;
};

export const useStore = create<State & Actions>((set, get) => ({
  appointments: [...seedAppts],
  prescriptions: [...seedRx],
  queue: [...seedQueue],
  vitals: { ...seedVitals },
  labSamples: [...seedLab],
  family: [...seedFamily],
  consents: [...seedConsents],
  insurance: [...seedInsurance],
  notifications: [...seedNotifs],
  telemedicine: [...seedTele],
  audit: [...seedAudit],
  users: [...seedUsers],
  masterRequests: [...seedMasters],
  branches: [...seedBranches],
  flags: [...seedFlags],
  kpis: [...seedKpis],

  addAppointment: (a) => {
    const created: Appointment = {
      id: nextId('a'),
      status: a.status ?? 'BOOKED',
      ...a,
    } as Appointment;
    set((s) => ({ appointments: [created, ...s.appointments] }));
    get().pushNotification({
      title: 'Appointment booked',
      body: `${created.doctorName} - ${created.startsAt}`,
      category: 'APPOINTMENT',
      at: 'just now',
    });
    return created;
  },
  cancelAppointment: (id) => {
    set((s) => ({ appointments: s.appointments.filter((a) => a.id !== id) }));
    get().pushNotification({
      title: 'Appointment cancelled',
      body: 'Removed from your schedule',
      category: 'APPOINTMENT',
      at: 'just now',
    });
  },

  addPrescription: (rx) => {
    const created: Prescription = { id: nextId('rx'), ...rx };
    set((s) => ({ prescriptions: [created, ...s.prescriptions] }));
    get().pushNotification({
      title: 'New prescription',
      body: `${created.doctorName} issued ${created.items[0]?.medication ?? 'Rx'}`,
      category: 'MEDICATION',
      at: 'just now',
    });
    return created;
  },
  requestRefill: (id) => {
    set((s) => ({
      prescriptions: s.prescriptions.map((p) =>
        p.id === id ? { ...p, status: 'PENDING_REFILL' } : p,
      ),
    }));
    get().pushNotification({
      title: 'Refill requested',
      body: 'Your doctor will review shortly',
      category: 'MEDICATION',
      at: 'just now',
    });
  },
  approveRefill: (id) => {
    set((s) => ({
      prescriptions: s.prescriptions.map((p) =>
        p.id === id ? { ...p, status: 'ACTIVE' } : p,
      ),
    }));
  },

  addQueueEntry: (q) => {
    const max = Math.max(0, ...get().queue.map((e) => e.number));
    const created: QueueEntry = { id: nextId('q'), number: max + 1, ...q };
    set((s) => ({ queue: [...s.queue, created] }));
    return created;
  },
  setSeverity: (id, severity) =>
    set((s) => ({
      queue: s.queue.map((q) => (q.id === id ? { ...q, severity, status: 'TRIAGED' } : q)),
    })),
  setQueueStatus: (id, status) =>
    set((s) => ({ queue: s.queue.map((q) => (q.id === id ? { ...q, status } : q)) })),
  removeQueueEntry: (id) =>
    set((s) => ({ queue: s.queue.filter((q) => q.id !== id) })),

  saveVitals: (v) => set({ vitals: v }),

  setLabStatus: (id, status) =>
    set((s) => ({ labSamples: s.labSamples.map((l) => (l.id === id ? { ...l, status } : l)) })),

  addFamilyMember: (m) => {
    const created: FamilyMember = { id: nextId('fm'), ...m };
    set((s) => ({ family: [...s.family, created] }));
    return created;
  },
  removeFamilyMember: (id) =>
    set((s) => ({ family: s.family.filter((f) => f.id !== id) })),

  revokeConsent: (id) =>
    set((s) => ({
      consents: s.consents.map((c) => (c.id === id ? { ...c, status: 'REVOKED' } : c)),
    })),

  verifyInsurance: (id) =>
    set((s) => ({
      insurance: s.insurance.map((i) => (i.id === id ? { ...i, status: 'ELIGIBLE' } : i)),
    })),

  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllNotificationsRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  pushNotification: (n) =>
    set((s) => ({
      notifications: [{ id: nextId('n'), read: false, ...n }, ...s.notifications],
    })),

  logAudit: (e) =>
    set((s) => ({ audit: [{ id: nextId('ev'), at: 'just now', ...e }, ...s.audit] })),

  addUser: (u) => {
    const created: ManagedUser = { id: nextId('um'), ...u };
    set((s) => ({ users: [created, ...s.users] }));
    get().logAudit({
      actor: 'Admin',
      role: 'Admin',
      action: 'USER.CREATE',
      target: created.name,
      ip: '10.10.1.5',
      level: 'INFO',
    });
    return created;
  },
  setUserStatus: (id, status) =>
    set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, status } : u)) })),

  addMasterRequest: (m) => {
    const created: MasterRequest = { id: nextId('m'), ...m };
    set((s) => ({ masterRequests: [created, ...s.masterRequests] }));
    return created;
  },
  approveMasterRequest: (id) =>
    set((s) => ({
      masterRequests: s.masterRequests.map((m) =>
        m.id === id ? { ...m, status: 'AUTO_APPROVED' } : m,
      ),
    })),
  rejectMasterRequest: (id) =>
    set((s) => ({ masterRequests: s.masterRequests.filter((m) => m.id !== id) })),

  addBranch: (b) => {
    const created: Branch = { id: nextId('br'), ...b };
    set((s) => ({ branches: [...s.branches, created] }));
    return created;
  },

  toggleFlag: (code) =>
    set((s) => ({
      flags: s.flags.map((f) => (f.code === code ? { ...f, enabled: !f.enabled } : f)),
    })),
}));

export const unreadNotificationCount = (s: State) =>
  s.notifications.filter((n) => !n.read).length;
