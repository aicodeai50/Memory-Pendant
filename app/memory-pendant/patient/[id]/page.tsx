import { notFound } from "next/navigation";
import { AlertCard } from "@/components/memory-pendant/AlertCard";
import { CalmSupportPanel } from "@/components/memory-pendant/CalmSupportPanel";
import { MemoryModuleCard } from "@/components/memory-pendant/MemoryModuleCard";
import { PendantStatusCard } from "@/components/memory-pendant/PendantStatusCard";
import { ReminderTimeline } from "@/components/memory-pendant/ReminderTimeline";
import { WanderingRiskBadge } from "@/components/memory-pendant/WanderingRiskBadge";
import { getPatientSnapshot, getPatients } from "@/lib/memory-pendant/api";

type PatientDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const patients = await getPatients();

  return patients.map((patient) => ({ id: patient.id }));
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params;
  const snapshot = await getPatientSnapshot(id);

  if (!snapshot) {
    notFound();
  }

  const { patient, device, alerts, memories, reminders } = snapshot;

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">{patient.room}</p>
          <h1>{patient.name}</h1>
          <p className="lead">{patient.profileSummary}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
            <span className={`pill ${patient.emotionalState === "calm" ? "success" : "warning"}`}>
              Calm/anxiety: {patient.emotionalState}
            </span>
            <WanderingRiskBadge risk={patient.wanderingRisk} />
            <span className="pill">Care team: {patient.careTeam}</span>
          </div>
        </div>
        <PendantStatusCard device={device} />
      </section>

      <section className="section grid grid-2">
        <article className="card">
          <p className="eyebrow">Patient profile</p>
          <h2>Care context</h2>
          <div className="stack">
            <div className="split-row">
              <span className="muted">Age</span>
              <strong>{patient.age}</strong>
            </div>
            <div className="split-row">
              <span className="muted">Last interaction</span>
              <strong>{patient.lastInteraction}</strong>
            </div>
            <div className="split-row">
              <span className="muted">Reminder status</span>
              <strong>{patient.reminderStatus}</strong>
            </div>
          </div>
        </article>

        <CalmSupportPanel safePhrases={patient.safePhrases} routine={patient.dailyRoutine} />
      </section>

      <section className="section">
        <p className="eyebrow">Family memory</p>
        <h2>Personal grounding details</h2>
        <div className="grid grid-3">
          {memories.map((memory) => (
            <MemoryModuleCard key={memory.id} memory={memory} />
          ))}
          {patient.familyMemory.map((memory) => (
            <article className="soft-card" key={memory}>
              <h3>Family note</h3>
              <p className="muted">{memory}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section grid grid-2">
        <article className="card">
          <p className="eyebrow">Alerts history</p>
          <h2>Recent events</h2>
          <div className="stack">
            {alerts.map((alert) => (
              <AlertCard alert={alert} key={alert.id} />
            ))}
          </div>
        </article>

        <article className="card">
          <p className="eyebrow">Reminder schedule</p>
          <h2>Today&apos;s routine support</h2>
          <ReminderTimeline reminders={reminders} />
        </article>
      </section>
    </main>
  );
}
