import type { AlertEvent, AlertType, Patient, PendantDevice, VoiceResponse } from "./types";

function backendNotConnectedError(): Error {
  return new Error("Real backend not connected yet");
}

export async function fetchPatientsFromBackend(): Promise<Patient[]> {
  // TODO: Add GET /api/zentro/memory-pendant/patients when the Zentro backend is ready.
  throw backendNotConnectedError();
}

export async function fetchPatientByIdFromBackend(id: string): Promise<Patient | undefined> {
  // TODO: Add GET /api/zentro/memory-pendant/patients/:id when the Zentro backend is ready.
  void id;
  throw backendNotConnectedError();
}

export async function fetchPendantStatusFromBackend(patientId: string): Promise<PendantDevice | undefined> {
  // TODO: Add GET /api/zentro/memory-pendant/patients/:patientId/pendant when ready.
  void patientId;
  throw backendNotConnectedError();
}

export async function fetchAlertsFromBackend(): Promise<AlertEvent[]> {
  // TODO: Add GET /api/zentro/memory-pendant/alerts when the Zentro backend is ready.
  throw backendNotConnectedError();
}

export async function sendSimulatorEventToBackend(patientId: string, eventType: AlertType): Promise<AlertEvent> {
  // TODO: Add POST /api/zentro/memory-pendant/simulator/events when the Zentro backend is ready.
  void patientId;
  void eventType;
  throw backendNotConnectedError();
}

export async function fetchVoiceResponseFromBackend(
  eventType: AlertType,
  patientId: string,
): Promise<VoiceResponse> {
  // TODO: Add POST /api/zentro/memory-pendant/voice-response when the Zentro backend is ready.
  void eventType;
  void patientId;
  throw backendNotConnectedError();
}
