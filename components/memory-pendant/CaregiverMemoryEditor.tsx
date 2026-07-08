"use client";

import { useState } from "react";
import { updatePatientMemory } from "@/lib/memory-pendant/api";
import type { PatientMemory, PatientMemoryUpdate } from "@/lib/memory-pendant/types";

type CaregiverMemoryEditorProps = {
  patientId: string;
  initialMemory: PatientMemory;
};

type MemoryField = {
  key: keyof PatientMemoryUpdate;
  label: string;
  helper: string;
};

const memoryFields: MemoryField[] = [
  {
    key: "safePhrases",
    label: "Safe phrases",
    helper: "Short reassurance phrases the pendant can say gently.",
  },
  {
    key: "familyMemory",
    label: "Family memory",
    helper: "Personal grounding details that help the patient feel known.",
  },
  {
    key: "dailyRoutine",
    label: "Daily routine",
    helper: "Predictable care rhythm, reminders, and comfort routines.",
  },
  {
    key: "calmingInstructions",
    label: "Calming instructions",
    helper: "Caregiver guidance for what usually helps during distress.",
  },
  {
    key: "thingsToAvoidSaying",
    label: "Things to avoid saying",
    helper: "Phrases or corrections that may increase anxiety.",
  },
  {
    key: "emergencyContactNotes",
    label: "Emergency contact notes",
    helper: "Non-permanent mock notes for who staff should contact and when.",
  },
];

function toText(items: string[]): string {
  return items.join("\n");
}

function toList(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function CaregiverMemoryEditor({ patientId, initialMemory }: CaregiverMemoryEditorProps) {
  const [formState, setFormState] = useState<Record<keyof PatientMemoryUpdate, string>>({
    safePhrases: toText(initialMemory.safePhrases),
    familyMemory: toText(initialMemory.familyMemory),
    dailyRoutine: toText(initialMemory.dailyRoutine),
    calmingInstructions: toText(initialMemory.calmingInstructions),
    thingsToAvoidSaying: toText(initialMemory.thingsToAvoidSaying),
    emergencyContactNotes: toText(initialMemory.emergencyContactNotes),
  });
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    setSaveMessage("");

    const memoryUpdate: PatientMemoryUpdate = {
      safePhrases: toList(formState.safePhrases),
      familyMemory: toList(formState.familyMemory),
      dailyRoutine: toList(formState.dailyRoutine),
      calmingInstructions: toList(formState.calmingInstructions),
      thingsToAvoidSaying: toList(formState.thingsToAvoidSaying),
      emergencyContactNotes: toList(formState.emergencyContactNotes),
    };

    const savedMemory = await updatePatientMemory(patientId, memoryUpdate);

    if (savedMemory) {
      setSaveMessage("Saved in mock mode. These notes are not stored permanently.");
    } else {
      setSaveMessage("Unable to save mock memory for this patient.");
    }

    setIsSaving(false);
  }

  return (
    <section className="section">
      <article className="card">
        <p className="eyebrow">Caregiver memory modules</p>
        <h2>Editable support guidance</h2>
        <p className="lead">
          Update mock caregiver guidance for the pendant. Do not enter real sensitive data yet because this prototype
          does not use encrypted permanent storage.
        </p>
        <div className="grid grid-2">
          {memoryFields.map((field) => (
            <label className="soft-card" key={field.key}>
              <strong>{field.label}</strong>
              <p className="muted">{field.helper}</p>
              <textarea
                aria-label={field.label}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
                rows={6}
                style={{
                  width: "100%",
                  minHeight: 160,
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--text)",
                  background: "white",
                  padding: 14,
                  resize: "vertical",
                }}
                value={formState[field.key]}
              />
            </label>
          ))}
        </div>
        <div className="split-row" style={{ flexWrap: "wrap", marginTop: 20 }}>
          <button className="button-link" disabled={isSaving} onClick={handleSave} type="button">
            {isSaving ? "Saving..." : "Save caregiver memory"}
          </button>
          {saveMessage && (
            <span aria-live="polite" className="pill success">
              {saveMessage}
            </span>
          )}
        </div>
      </article>
    </section>
  );
}
