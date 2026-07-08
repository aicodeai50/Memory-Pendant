import { alerts, memoryModules, patients, pendantDevices, reminders, voiceResponses } from "./mock-data";
import type { AlertEvent, AlertType, Patient, PatientSnapshot, PendantDevice, VoiceResponse } from "./types";

const severityByEventType: Record<AlertType, AlertEvent["severity"]> = {
  help: "urgent",
  confusion: "warning",
  anxiety: "warning",
  wandering: "urgent",
  battery: "warning",
  reminder: "info",
};

export async function getPatients(): Promise<Patient[]> {
  // TODO: Replace with fetch("/api/zentro/memory-pendant/patients") when the real backend is ready.
  return patients;
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  // TODO: Replace with fetch(`/api/zentro/memory-pendant/patients/${id}`) when the real backend is ready.
  return patients.find((patient) => patient.id === id);
}

export async function getPendantStatus(patientId: string): Promise<PendantDevice | undefined> {
  // TODO: Replace with fetch(`/api/zentro/memory-pendant/patients/${patientId}/pendant`) later.
  return pendantDevices.find((device) => device.patientId === patientId);
}

export async function getAlerts(): Promise<AlertEvent[]> {
  // TODO: Replace with fetch("/api/zentro/memory-pendant/alerts") when alerts are served by Zentro.
  return alerts;
}

export async function getVoiceResponse(eventType: AlertType, patientId: string): Promise<VoiceResponse> {
  // TODO: Replace with POST /api/zentro/memory-pendant/voice-response using eventType and patientId.
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

export async function triggerSimulatorEvent(patientId: string, eventType: AlertType): Promise<AlertEvent> {
  // TODO: Replace with POST /api/zentro/memory-pendant/simulator/events when the real backend is ready.
  const response = await getVoiceResponse(eventType, patientId);

  return {
    id: `sim-${patientId}-${eventType}`,
    patientId,
    type: eventType,
    severity: severityByEventType[eventType],
    title: response.staffUpdate,
    description: response.nextStep,
    createdAt: "Just now",
    resolved: false,
  };
}

export async function getPatientSnapshots(): Promise<PatientSnapshot[]> {
  // TODO: Replace this composition with a backend dashboard endpoint when Zentro exposes one.
  return patients.map((patient) => ({
    patient,
    device: pendantDevices.find((device) => device.patientId === patient.id)!,
    alerts: alerts.filter((alert) => alert.patientId === patient.id),
    memories: memoryModules.filter((memory) => memory.patientId === patient.id),
    reminders: reminders.filter((reminder) => reminder.patientId === patient.id),
  }));
}

export async function getPatientSnapshot(id: string): Promise<PatientSnapshot | undefined> {
  // TODO: Replace with a backend patient detail endpoint when available.
  const snapshots = await getPatientSnapshots();
  return snapshots.find((snapshot) => snapshot.patient.id === id);
}
