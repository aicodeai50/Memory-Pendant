export type PendantConnectionStatus = "online" | "offline";

export type EmotionalState = "calm" | "anxious" | "confused";

export type WanderingRisk = "low" | "medium" | "high";

export type ReminderStatus = "completed" | "upcoming" | "missed";

export type AlertSeverity = "low" | "medium" | "high";

export type AlertStatus = "new" | "acknowledged" | "resolved";

export type AlertType = "help" | "confusion" | "anxiety" | "wandering" | "battery" | "reminder";

export type Patient = {
  id: string;
  name: string;
  age: number;
  room: string;
  careTeam: string;
  profileSummary: string;
  emotionalState: EmotionalState;
  wanderingRisk: WanderingRisk;
  lastInteraction: string;
  reminderStatus: ReminderStatus;
  safePhrases: string[];
  familyMemory: string[];
  dailyRoutine: string[];
};

export type PendantDevice = {
  id: string;
  patientId: string;
  status: PendantConnectionStatus;
  batteryLevel: number;
  lastSync: string;
  firmwareVersion: string;
};

export type AlertEvent = {
  id: string;
  patientId: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  createdAt: string;
  resolved: boolean;
};

export type MemoryModule = {
  id: string;
  patientId: string;
  title: string;
  category: "family" | "comfort" | "routine" | "identity";
  content: string;
};

export type Reminder = {
  id: string;
  patientId: string;
  title: string;
  time: string;
  status: ReminderStatus;
  notes: string;
};

export type VoiceResponse = {
  id: string;
  eventType: AlertType;
  patientId: string;
  pendantSpeech: string;
  staffUpdate: string;
  nextStep: string;
};

export type PatientSnapshot = {
  patient: Patient;
  device: PendantDevice;
  alerts: AlertEvent[];
  memories: MemoryModule[];
  reminders: Reminder[];
};
