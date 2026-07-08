import { DashboardAlertWorkflow } from "@/components/memory-pendant/DashboardAlertWorkflow";
import { PatientCard } from "@/components/memory-pendant/PatientCard";
import { getPatientSnapshots } from "@/lib/memory-pendant/api";

export default async function MemoryPendantDashboardPage() {
  const snapshots = await getPatientSnapshots();
  const activeAlerts = snapshots.flatMap((snapshot) => snapshot.alerts).filter((alert) => !alert.resolved);
  const onlineDevices = snapshots.filter((snapshot) => snapshot.device.status === "online").length;

  return (
    <main>
      <section>
        <p className="eyebrow">Staff dashboard</p>
        <h1>Care team overview</h1>
        <p className="lead">
          Monitor pendant connectivity, recent interactions, help alerts, wandering risk, calm/anxiety state, and
          reminder status from a single calm dashboard.
        </p>
      </section>

      <section className="section grid grid-3" aria-label="Dashboard summary">
        <article className="card">
          <p className="eyebrow">Patients</p>
          <div className="metric">{snapshots.length}</div>
          <p className="muted">Mock patients currently assigned.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Online pendants</p>
          <div className="metric">
            {onlineDevices}/{snapshots.length}
          </div>
          <p className="muted">Device connection health.</p>
        </article>
        <article className="card">
          <p className="eyebrow">Open alerts</p>
          <div className="metric">{activeAlerts.length}</div>
          <p className="muted">Help, anxiety, wandering, and battery events.</p>
        </article>
      </section>

      <section className="section">
        <div className="split-row">
          <div>
            <p className="eyebrow">Patient cards</p>
            <h2>Today&apos;s pendant status</h2>
          </div>
        </div>
        <div className="grid grid-3">
          {snapshots.map((snapshot) => (
            <PatientCard key={snapshot.patient.id} snapshot={snapshot} />
          ))}
        </div>
      </section>

      <DashboardAlertWorkflow initialSnapshots={snapshots} />
    </main>
  );
}
