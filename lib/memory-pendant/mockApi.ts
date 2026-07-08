import { alerts, memoryModules, patients, pendantDevices, reminders, voiceResponses } from "./mockData";
import type { AlertEvent, AlertType, PatientSnapshot, VoiceResponse } from "./types";

export function buildMockPatientSnapshots(): PatientSnapshot[] {
  return patients.map((patient) => ({
    patient,
    device: pendantDevices.find((device) => device.patientId === patient.id)!,
    alerts: alerts.filter((alert) => alert.patientId === patient.id),
    memories: memoryModules.filter((memory) => memory.patientId === patient.id),
    reminders: reminders.filter((reminder) => reminder.patientId === patient.id),
  }));
}

export async function getPatientSnapshots(): Promise<PatientSnapshot[]> {
  // TODO: Replace with GET /api/zentro/patients when the real backend is connected.
  return buildMockPatientSnapshots();
}

export async function getPatientSnapshot(id: string): Promise<PatientSnapshot | undefined> {
  // TODO: Replace with GET /api/zentro/patients/:id when the real backend is connected.
  const snapshots = await getPatientSnapshots();
  return snapshots.find((snapshot) => snapshot.patient.id === id);
}

export async function getVoiceResponseForEvent(eventType: AlertType): Promise<VoiceResponse> {
  // TODO: Replace with POST /api/zentro/simulator/events when the real backend is connected.
  const response = voiceResponses.find((voiceResponse) => voiceResponse.eventType === eventType);

  if (!response) {
    throw new Error(`No mock voice response found for event type: ${eventType}`);
  }

  return response;
}

export function createSimulatedAlert(eventType: AlertType, response: VoiceResponse): AlertEvent {
  const severityByType: Record<AlertType, AlertEvent["severity"]> = {
    help: "urgent",
    confusion: "warning",
    anxiety: "warning",
    wandering: "urgent",
    battery: "warning",
    reminder: "info",
  };

  return {
    id: `sim-${eventType}`,
    patientId: response.patientId,
    type: eventType,
    severity: severityByType[eventType],
    title: response.staffUpdate,
    description: response.nextStep,
    createdAt: "Just now",
    resolved: false,
  };
}
