import type {
  AlertEvent,
  MemoryModule,
  Patient,
  PatientMemory,
  PendantDevice,
  Reminder,
  VoiceResponse,
} from "./types";

export const patients: Patient[] = [
  {
    id: "mara-chen",
    name: "Mara Chen",
    age: 78,
    room: "Rose Wing 104",
    careTeam: "Morning Care Team",
    profileSummary: "Usually calm, enjoys soft piano music and reminders about her garden.",
    emotionalState: "calm",
    wanderingRisk: "low",
    lastInteraction: "10 minutes ago: asked about lunch",
    reminderStatus: "completed",
    safePhrases: [
      "You are safe at Zentro Gardens.",
      "Your daughter Lina will visit after lunch.",
      "Let's take one slow breath together.",
    ],
    familyMemory: [
      "Daughter Lina visits on Tuesdays and Fridays.",
      "Grandson Noah plays piano and sends short recordings.",
      "Mara loved growing lavender in her old backyard.",
    ],
    dailyRoutine: ["8:00 AM breakfast", "10:30 AM garden walk", "1:00 PM rest time"],
  },
  {
    id: "arthur-miles",
    name: "Arthur Miles",
    age: 84,
    room: "Cedar Wing 212",
    careTeam: "Evening Care Team",
    profileSummary: "Can become anxious near shift change; responds well to simple reassurance.",
    emotionalState: "anxious",
    wanderingRisk: "medium",
    lastInteraction: "4 minutes ago: repeated question about going home",
    reminderStatus: "upcoming",
    safePhrases: [
      "You are in your room and the care team is nearby.",
      "Your coat is safe in the closet.",
      "We can look at your family photo together.",
    ],
    familyMemory: [
      "Wife Elaine's photo is on the bedside table.",
      "Arthur worked as a train conductor for 31 years.",
      "He likes hearing that his son Ben called this morning.",
    ],
    dailyRoutine: ["7:30 AM tea", "11:00 AM mobility session", "6:15 PM quiet music"],
  },
  {
    id: "sofia-rivera",
    name: "Sofia Rivera",
    age: 81,
    room: "Maple Wing 018",
    careTeam: "Night Safety Team",
    profileSummary: "Higher wandering risk after dinner; responds to familiar Spanish greetings.",
    emotionalState: "confused",
    wanderingRisk: "high",
    lastInteraction: "1 minute ago: asked where the front door is",
    reminderStatus: "missed",
    safePhrases: [
      "Hola Sofia, you are safe and Maria is nearby.",
      "Let's walk back toward the blue chair together.",
      "Your room is close. I can help you find it.",
    ],
    familyMemory: [
      "Daughter Maria calls every evening.",
      "Sofia loves bolero music and family recipes.",
      "Her favorite blanket is blue and folded on her chair.",
    ],
    dailyRoutine: ["8:45 AM medication", "2:00 PM family call", "7:00 PM hallway check-in"],
  },
];

export const patientMemories: PatientMemory[] = [
  {
    patientId: "mara-chen",
    safePhrases: [
      "You are safe at Zentro Gardens.",
      "Your daughter Lina will visit after lunch.",
      "Let's take one slow breath together.",
    ],
    familyMemory: [
      "Daughter Lina visits on Tuesdays and Fridays.",
      "Grandson Noah plays piano and sends short recordings.",
      "Mara loved growing lavender in her old backyard.",
    ],
    dailyRoutine: ["8:00 AM breakfast", "10:30 AM garden walk", "1:00 PM rest time"],
    calmingInstructions: [
      "Offer soft piano music before asking questions.",
      "Mention lavender or garden walks when she seems uncertain.",
    ],
    thingsToAvoidSaying: [
      "Do not say she already asked that question.",
      "Avoid rushing her away from garden topics.",
    ],
    emergencyContactNotes: [
      "Call Lina Chen first for urgent family updates.",
      "If Mara refuses lunch, ask Lina about preferred foods before escalating.",
    ],
  },
  {
    patientId: "arthur-miles",
    safePhrases: [
      "You are in your room and the care team is nearby.",
      "Your coat is safe in the closet.",
      "We can look at your family photo together.",
    ],
    familyMemory: [
      "Wife Elaine's photo is on the bedside table.",
      "Arthur worked as a train conductor for 31 years.",
      "He likes hearing that his son Ben called this morning.",
    ],
    dailyRoutine: ["7:30 AM tea", "11:00 AM mobility session", "6:15 PM quiet music"],
    calmingInstructions: [
      "Start with one simple reassurance before offering choices.",
      "Use train route language when redirecting him toward his room.",
    ],
    thingsToAvoidSaying: [
      "Avoid telling him he cannot go home.",
      "Do not remove Elaine's photo during cleaning without replacing it immediately.",
    ],
    emergencyContactNotes: [
      "Call Ben Miles for repeated anxiety that does not settle after staff support.",
      "Mention any medication refusal during evening handoff.",
    ],
  },
  {
    patientId: "sofia-rivera",
    safePhrases: [
      "Hola Sofia, you are safe and Maria is nearby.",
      "Let's walk back toward the blue chair together.",
      "Your room is close. I can help you find it.",
    ],
    familyMemory: [
      "Daughter Maria calls every evening.",
      "Sofia loves bolero music and family recipes.",
      "Her favorite blanket is blue and folded on her chair.",
    ],
    dailyRoutine: ["8:45 AM medication", "2:00 PM family call", "7:00 PM hallway check-in"],
    calmingInstructions: [
      "Use a familiar Spanish greeting before giving directions.",
      "Redirect toward the blue chair instead of describing exits.",
    ],
    thingsToAvoidSaying: [
      "Avoid saying the front door is locked.",
      "Do not argue about whether Maria is present.",
    ],
    emergencyContactNotes: [
      "Call Maria Rivera if Sofia approaches exits twice in one hour.",
      "Escalate to Night Safety Team when pendant is offline and wandering risk is high.",
    ],
  },
];

export const pendantDevices: PendantDevice[] = [
  {
    id: "pendant-104",
    patientId: "mara-chen",
    status: "online",
    batteryLevel: 92,
    lastSync: "2 minutes ago",
    firmwareVersion: "1.4.2",
  },
  {
    id: "pendant-212",
    patientId: "arthur-miles",
    status: "online",
    batteryLevel: 54,
    lastSync: "1 minute ago",
    firmwareVersion: "1.4.2",
  },
  {
    id: "pendant-018",
    patientId: "sofia-rivera",
    status: "offline",
    batteryLevel: 18,
    lastSync: "18 minutes ago",
    firmwareVersion: "1.3.9",
  },
];

export const alerts: AlertEvent[] = [
  {
    id: "alert-1",
    patientId: "mara-chen",
    type: "reminder",
    severity: "low",
    status: "resolved",
    title: "Morning garden walk completed",
    description: "Pendant confirmed Mara acknowledged the walk reminder calmly.",
    createdAt: "Today, 10:35 AM",
    resolved: true,
  },
  {
    id: "alert-2",
    patientId: "arthur-miles",
    type: "anxiety",
    severity: "medium",
    status: "acknowledged",
    title: "Repeated reassurance needed",
    description: "Arthur asked about going home three times in five minutes.",
    createdAt: "Today, 10:52 AM",
    resolved: false,
  },
  {
    id: "alert-3",
    patientId: "sofia-rivera",
    type: "wandering",
    severity: "high",
    status: "new",
    title: "Possible exit-seeking behavior",
    description: "Sofia asked for the front door and moved toward the west hallway.",
    createdAt: "Today, 10:55 AM",
    resolved: false,
  },
  {
    id: "alert-4",
    patientId: "sofia-rivera",
    type: "battery",
    severity: "medium",
    status: "new",
    title: "Pendant battery low",
    description: "Battery is below 20%. Staff should charge during next safe moment.",
    createdAt: "Today, 10:58 AM",
    resolved: false,
  },
];

export const memoryModules: MemoryModule[] = [
  {
    id: "memory-1",
    patientId: "mara-chen",
    title: "Lavender Garden",
    category: "comfort",
    content: "Mara feels grounded when reminded of her lavender garden and Noah's piano.",
  },
  {
    id: "memory-2",
    patientId: "arthur-miles",
    title: "Train Conductor Story",
    category: "identity",
    content: "Arthur is proud of his conductor years and likes short prompts about train routes.",
  },
  {
    id: "memory-3",
    patientId: "sofia-rivera",
    title: "Maria's Evening Call",
    category: "family",
    content: "Sofia relaxes when told Maria will call after dinner and that her blue blanket is nearby.",
  },
];

export const reminders: Reminder[] = [
  {
    id: "reminder-1",
    patientId: "mara-chen",
    title: "Garden walk",
    time: "10:30 AM",
    status: "completed",
    notes: "Use calm garden language and mention lavender.",
  },
  {
    id: "reminder-2",
    patientId: "arthur-miles",
    title: "Quiet music",
    time: "6:15 PM",
    status: "upcoming",
    notes: "Start playlist before evening shift change.",
  },
  {
    id: "reminder-3",
    patientId: "sofia-rivera",
    title: "Family call",
    time: "2:00 PM",
    status: "missed",
    notes: "Offer to call Maria from the lounge when Sofia is settled.",
  },
  {
    id: "reminder-4",
    patientId: "sofia-rivera",
    title: "Hallway check-in",
    time: "7:00 PM",
    status: "upcoming",
    notes: "Use familiar Spanish greeting and redirect toward blue chair.",
  },
];

export const voiceResponses: VoiceResponse[] = [
  {
    id: "voice-help",
    eventType: "help",
    patientId: "arthur-miles",
    pendantSpeech: "I heard you need help, Arthur. You are safe. I am telling the care team now.",
    staffUpdate: "Help button alert sent to Evening Care Team with room and pendant status.",
    nextStep: "Nearest staff member checks in and marks the alert resolved.",
  },
  {
    id: "voice-confusion",
    eventType: "confusion",
    patientId: "sofia-rivera",
    pendantSpeech: "Hola Sofia, you are safe. Let's pause together and look for the blue chair.",
    staffUpdate: "Confusion support logged. Staff sees suggested safe phrase and current location cue.",
    nextStep: "Care team offers gentle orientation without arguing or correcting.",
  },
  {
    id: "voice-anxiety",
    eventType: "anxiety",
    patientId: "arthur-miles",
    pendantSpeech: "Arthur, Elaine's photo is right nearby. Let's take a slow breath together.",
    staffUpdate: "Anxiety trend raised from calm check-in to warning status.",
    nextStep: "Staff starts quiet music and confirms he has his family photo.",
  },
  {
    id: "voice-wandering",
    eventType: "wandering",
    patientId: "sofia-rivera",
    pendantSpeech: "Sofia, Maria knows you are here. Let's walk back toward your blue blanket.",
    staffUpdate: "Urgent wandering risk alert added to dashboard for Maple Wing 018.",
    nextStep: "Night Safety Team intercepts calmly near the west hallway.",
  },
  {
    id: "voice-battery",
    eventType: "battery",
    patientId: "sofia-rivera",
    pendantSpeech: "Your pendant needs a little rest soon, Sofia. A caregiver will help.",
    staffUpdate: "Battery low alert created and device status marked attention needed.",
    nextStep: "Charge pendant during a seated activity or family call.",
  },
];
