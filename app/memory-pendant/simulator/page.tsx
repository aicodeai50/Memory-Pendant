"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCard } from "@/components/memory-pendant/AlertCard";
import { PatientCard } from "@/components/memory-pendant/PatientCard";
import { VoiceResponsePreview } from "@/components/memory-pendant/VoiceResponsePreview";
import { getPatientSnapshots, getVoiceResponse, triggerSimulatorEvent } from "@/lib/memory-pendant/api";
import type { AlertEvent, AlertType, PatientSnapshot, VoiceResponse } from "@/lib/memory-pendant/types";

const simulatorEvents: Array<{ type: AlertType; patientId: string; label: string; description: string }> = [
  {
    type: "help",
    patientId: "arthur-miles",
    label: "Patient pressed help button",
    description: "Shows urgent staff escalation with a reassuring pendant response.",
  },
  {
    type: "confusion",
    patientId: "sofia-rivera",
    label: "Patient is confused",
    description: "Uses orientation cues and approved safe phrases.",
  },
  {
    type: "anxiety",
    patientId: "arthur-miles",
    label: "Patient is anxious",
    description: "Previews calm breathing support and staff trend update.",
  },
  {
    type: "wandering",
    patientId: "sofia-rivera",
    label: "Patient may be wandering",
    description: "Escalates possible exit-seeking behavior.",
  },
  {
    type: "battery",
    patientId: "sofia-rivera",
    label: "Battery low",
    description: "Warns staff while keeping patient language gentle.",
  },
];

export default function MemoryPendantSimulatorPage() {
  const [baseSnapshots, setBaseSnapshots] = useState<PatientSnapshot[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<VoiceResponse | null>(null);
  const [simulatedAlert, setSimulatedAlert] = useState<AlertEvent | null>(null);

  useEffect(() => {
    void getPatientSnapshots().then(setBaseSnapshots);
  }, []);

  const snapshotsWithSimulation: PatientSnapshot[] = useMemo(() => {
    if (!simulatedAlert) {
      return baseSnapshots;
    }

    return baseSnapshots.map((snapshot) =>
      snapshot.patient.id === simulatedAlert.patientId
        ? { ...snapshot, alerts: [simulatedAlert, ...snapshot.alerts] }
        : snapshot,
    );
  }, [baseSnapshots, simulatedAlert]);

  async function handleEventClick(eventType: AlertType, patientId: string) {
    const [response, alert] = await Promise.all([
      getVoiceResponse(eventType, patientId),
      triggerSimulatorEvent(patientId, eventType),
    ]);

    setSelectedResponse(response);
    setSimulatedAlert(alert);
  }

  return (
    <main>
      <section>
        <p className="eyebrow">Prototype simulator</p>
        <h1>Test pendant events safely.</h1>
        <p className="lead">
          Click an event to see how the pendant speaks to the patient and how the staff dashboard mock updates. This is
          frontend-only and does not call your backend.
        </p>
      </section>

      <section className="section grid grid-2">
        <article className="card">
          <p className="eyebrow">Test events</p>
          <h2>Trigger a scenario</h2>
          <div className="stack">
            {simulatorEvents.map((event) => (
              <button
                className="secondary-button"
                key={event.type}
                onClick={() => handleEventClick(event.type, event.patientId)}
                style={{
                  alignItems: "flex-start",
                  borderRadius: 22,
                  flexDirection: "column",
                  textAlign: "left",
                  width: "100%",
                }}
                type="button"
              >
                <strong>{event.label}</strong>
                <span className="muted">{event.description}</span>
              </button>
            ))}
          </div>
        </article>

        {selectedResponse ? (
          <VoiceResponsePreview response={selectedResponse} />
        ) : (
          <article className="card">
            <p className="eyebrow">Awaiting event</p>
            <h2>No scenario selected yet</h2>
            <p className="muted">
              Choose a prototype event to preview the voice response, recommended staff action, and dashboard alert.
            </p>
          </article>
        )}
      </section>

      <section className="section">
        <p className="eyebrow">Dashboard update</p>
        <h2>Mock staff view after event</h2>
        {simulatedAlert && (
          <div style={{ marginBottom: 18 }}>
            <AlertCard alert={simulatedAlert} />
          </div>
        )}
        <div className="grid grid-3">
          {snapshotsWithSimulation.map((snapshot) => (
            <PatientCard key={snapshot.patient.id} snapshot={snapshot} />
          ))}
        </div>
      </section>
    </main>
  );
}
