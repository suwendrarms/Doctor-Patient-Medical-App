# Medix - Unified Mobile App (Phase 1)

One React Native + TypeScript app with role-adaptive shells for **Patient**,
**Doctor**, **Reception**, **Nurse**, and **Admin**. Phase 1 ships the modern
"new-world" UI: gradient role themes, glassmorphism cards, dark/light auto
theme, motion, and a complete navigation tree with home dashboards plus
representative screens for each role.

## Stack

- Expo SDK 51 + TypeScript
- React Navigation v6 (Bottom Tabs + Native Stack)
- Reanimated 3, Linear Gradient, expo-blur, expo-haptics
- lucide-react-native icons
- react-native-qrcode-svg for the patient QR

## Run

```powershell
cd "c:/Users/Suwendra/Desktop/int/mobile-app"
npm install
npm start
```

Then:

- Press **w** to open in the browser (web preview, fastest for UI iteration)
- Press **a** to launch on a connected Android emulator / device
- Press **i** to launch on iOS simulator (macOS only)
- Or scan the QR code from the terminal with the Expo Go app on your phone

## Demo flow

1. Launch the app -> Login screen.
2. Tap any of the 5 demo role cards (Patient / Doctor / Reception / Nurse / Admin).
3. Each role mounts a role-specific bottom-tab shell with its own gradient,
   home dashboard, and 2 fully-built screens. Remaining tabs are styled stubs
   wired to navigation - drop content into them as Phase 1 progresses.
4. Use "Sign out (demo)" on each Home screen to switch roles.

## Folder structure

```
mobile-app/
├── App.tsx                       # entry, theme, fonts, NavigationContainer
├── app.json                      # Expo config
├── src/
│   ├── design-system/
│   │   ├── tokens.ts             # palette, role gradients, spacing, typography
│   │   ├── theme.ts              # light/dark theme hook
│   │   └── components/           # GradientHero, StatCard, Card, ListRow, Pill,
│   │                             # Avatar, PrimaryButton, EmptyState, etc.
│   ├── auth/
│   │   └── AuthContext.tsx       # mock auth (swap for real JWT/biometric in Phase 2)
│   ├── role-router/
│   │   └── RoleRouter.tsx        # mounts the right shell from user.role
│   ├── shells/
│   │   ├── patient/   PatientShell + Home, MyQR, Appointments, stubs
│   │   ├── doctor/    DoctorShell + Home, Queue, PatientRecord, stubs
│   │   ├── reception/ ReceptionShell + Home, LiveQueue, CheckIn, stubs
│   │   ├── nurse/     NurseShell + Home, Triage, CaptureVitals, stubs
│   │   └── admin/     AdminShell + Home, UserManagement, MasterData, stubs
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   └── StubScreen.tsx
│   └── data/
│       ├── types.ts              # AuthUser, Appointment, Prescription, Vitals...
│       └── fixtures.ts           # demoUsers, queues, KPIs, master updates
```

## Role themes (matches SRS Section 8A)

| Role      | Gradient                | Accent     |
| --------- | ----------------------- | ---------- |
| Patient   | Indigo -> Sky           | `#6366F1` |
| Doctor    | Teal -> Emerald         | `#0D9488` |
| Reception | Amber -> Pink           | `#F59E0B` |
| Nurse     | Mint -> Lime            | `#10B981` |
| Admin     | Violet -> Fuchsia       | `#8B5CF6` |

Light, Dark, and Auto themes are honoured via `useColorScheme`. All colours,
spacing, radii, and type scales come from `src/design-system/tokens.ts`.

## What is fully built in Phase 1

- 5 role shells with bottom-tab navigation and per-role gradients
- Login with demo role picker (replace with phone OTP / 2FA / biometric)
- Patient: Home dashboard, **My QR** (rotating token), Appointments
- Doctor: Home dashboard, Today's Queue, Patient Record (with vitals + history)
- Reception: Home dashboard, Live Queue Board, Check-in (simulated scan flow)
- Nurse: Home dashboard, Triage Queue, Capture Vitals (with severity chips)
- Admin: Home dashboard with KPIs, User & Role Management, Master Data

## What is stubbed (next iterations)

- Telemedicine (WebRTC), AI Health Assistant, Insurance, Lab samples,
  Reports, Settings, Profile (per role). Each stub is reachable from its tab,
  themed correctly, and ready to drop content into.

## Wiring to a real backend

Replace `src/auth/AuthContext.tsx` and `src/data/fixtures.ts` with a real
API client (recommend TanStack Query + Axios). The role from `user.role`
already drives the entire shell - the rest is just data.
