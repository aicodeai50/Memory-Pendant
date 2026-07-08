import { alerts, memoryModules, patients, pendantDevices, reminders, voiceResponses } from "./mock-data";
import {
  fetchAlertsFromBackend,
  fetchPatientByIdFromBackend,
  fetchPatientsFromBackend,
  fetchPendantStatusFromBackend,
  fetchVoiceResponseFromBackend,
  sendSimulatorEventToBackend,
} from "./backend-client";
import type { AlertEvent, AlertStatus, AlertType, Patient, PatientSnapshot, PendantDevice, VoiceResponse } from "./types";

export type ApiMode = "mock" | "real";

export const API_MODE: ApiMode = "mock";

const severityByEventType: Record<AlertType, AlertEvent["severity"]> = {
  help: "high",
  confusion: "medium",
  anxiety: "medium",
  wandering: "high",
  battery: "medium",
  reminder: "low",
};

let mockAlerts: AlertEvent[] = [...alerts];

async function withBackendFallback<T>(operationName: string, realRequest: () => Promise<T>, mockFallback: () => T): Promise<T> {
  if (API_MODE === "mock") {
    return mockFallback();
  }

  try {
    // TODO: This branch is where Zentro backend fetch calls are enabled after API_MODE is set to "real".
    return await realRequest();
  } catch (error) {
    console.warn(`Zentro backend request failed for ${operationName}. Falling back to mock data.`, error);
    return mockFallback();
  }
}

function getMockVoiceResponse(eventType: AlertType, patientId: string): VoiceResponse {
  const patientSpecificResponse = voiceResponses.find(
    (response) => response.eventType === eventType && response.patientId === patientId,
  );

  const fallbackResponse = voiceResponses.find((response) => response.eventType === eventType);
  const response = patientSpecificResponse ?? fallbackResponse;

  if (!response) {
    throw new Error(`No mock voice response found for event type: ${eventType}`);
  }

  return {
    ...response,
    patientId,
  };
}

function createMockSimulatorAlert(patientId: string, eventType: AlertType, response: VoiceResponse): AlertEvent {
  const timestamp = new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());

  return {
    id: `sim-${patientId}-${eventType}-${Date.now()}`,
    patientId,
    type: eventType,
    severity: severityByEventType[eventType],
    status: "new",
    title: response.staffUpdate,
    description: response.nextStep,
    createdAt: `Today, ${timestamp}`,
    resolved: false,
  };
}

function getMockPatientSnapshots(): PatientSnapshot[] {
  return patients.map((patient) => ({
    patient,
    device: pendantDevices.find((device) => device.patientId === patient.id)!,
    alerts: mockAlerts.filter((alert) => alert.patientId === patient.id),
    memories: memoryModules.filter((memory) => memory.patientId === patient.id),
    reminders: reminders.filter((reminder) => reminder.patientId === patient.id),
  }));
}

function updateMockAlertStatus(alertId: string, status: AlertStatus): AlertEvent | undefined {
  let updatedAlert: AlertEvent | undefined;

  mockAlerts = mockAlerts.map((alert) => {
    if (alert.id !== alertId) {
      return alert;
    }

    updatedAlert = {
      ...alert,
      status,
      resolved: status === "resolved",
    };

    return updatedAlert;
  });

  return updatedAlert;
}

export async function getPatients(): Promise<Patient[]> {
  return withBackendFallback(
    "getPatients",
    // TODO: Real mode will fetch the patient list from the Zentro backend here.
    () => fetchPatientsFromBackend(),
    () => patients,
  );
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  return withBackendFallback(
    "getPatientById",
    // TODO: Real mode will fetch a single patient from the Zentro backend here.
    () => fetchPatientByIdFromBackend(id),
    () => patients.find((patient) => patient.id === id),
  );
}

export async function getPendantStatus(patientId: string): Promise<PendantDevice | undefined> {
  return withBackendFallback(
    "getPendantStatus",
    // TODO: Real mode will fetch pendant status from the Zentro backend here.
    () => fetchPendantStatusFromBackend(patientId),
    () => pendantDevices.find((device) => device.patientId === patientId),
  );
}

export async function getAlerts(): Promise<AlertEvent[]> {
  return withBackendFallback(
    "getAlerts",
    // TODO: Real mode will fetch alert events from the Zentro backend here.
    () => fetchAlertsFromBackend(),
    () => mockAlerts,
  );
}

export async function getVoiceResponse(eventType: AlertType, patientId: string): Promise<VoiceResponse> {
  return withBackendFallback(
    "getVoiceResponse",
    // TODO: Real mode will request generated pendant speech from the Zentro backend here.
    () => fetchVoiceResponseFromBackend(eventType, patientId),
    () => getMockVoiceResponse(eventType, patientId),
  );
}

export async function triggerSimulatorEvent(patientId: string, eventType: AlertType): Promise<AlertEvent> {
  const response = await getVoiceResponse(eventType, patientId);

  return withBackendFallback(
    "triggerSimulatorEvent",
    // TODO: Real mode will post simulator events to the Zentro backend here.
    () => sendSimulatorEventToBackend(patientId, eventType),
    () => {
      const alert = createMockSimulatorAlert(patientId, eventType, response);
      mockAlerts = [alert, ...mockAlerts];
      return alert;
    },
  );
}

export async function acknowledgeAlert(alertId: string): Promise<AlertEvent | undefined> {
  return withBackendFallback(
    "acknowledgeAlert",
    async () => {
      // TODO: Add PATCH /api/zentro/memory-pendant/alerts/:alertId/acknowledge when ready.
      throw new Error("Real backend not connected yet");
    },
    () => updateMockAlertStatus(alertId, "acknowledged"),
  );
}

export async function resolveAlert(alertId: string): Promise<AlertEvent | undefined> {
  return withBackendFallback(
    "resolveAlert",
    async () => {
      // TODO: Add PATCH /api/zentro/memory-pendant/alerts/:alertId/resolve when ready.
      throw new Error("Real backend not connected yet");
    },
    () => updateMockAlertStatus(alertId, "resolved"),
  );
}

export async function getPatientSnapshots(): Promise<PatientSnapshot[]> {
  return withBackendFallback(
    "getPatientSnapshots",
    async () => {
      // TODO: Prefer replacing this composition with one Zentro dashboard endpoint when available.
      const [backendPatients, backendAlerts] = await Promise.all([fetchPatientsFromBackend(), fetchAlertsFromBackend()]);

      return Promise.all(
        backendPatients.map(async (patient) => ({
          patient,
          device: (await fetchPendantStatusFromBackend(patient.id)) ?? pendantDevices.find((device) => device.patientId === patient.id)!,
          alerts: backendAlerts.filter((alert) => alert.patientId === patient.id),
          memories: memoryModules.filter((memory) => memory.patientId === patient.id),
          reminders: reminders.filter((reminder) => reminder.patientId === patient.id),
        })),
      );
    },
    () => getMockPatientSnapshots(),
  );
}

export async function getPatientSnapshot(id: string): Promise<PatientSnapshot | undefined> {
  // TODO: Replace with a dedicated Zentro patient detail endpoint when available.
  const snapshots = await getPatientSnapshots();
  return snapshots.find((snapshot) => snapshot.patient.id === id);
}
