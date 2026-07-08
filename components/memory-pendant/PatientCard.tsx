import Link from "next/link";
import type { PatientSnapshot } from "@/lib/memory-pendant/types";
import { DeviceBatteryIndicator } from "./DeviceBatteryIndicator";
import { WanderingRiskBadge } from "./WanderingRiskBadge";

type PatientCardProps = {
  snapshot: PatientSnapshot;
};

export function PatientCard({ snapshot }: PatientCardProps) {
  const { patient, device, alerts } = snapshot;
  const activeAlerts = alerts.filter((alert) => !alert.resolved);

  return (
    <article className="card">
      <div className="split-row">
        <div>
          <p className="eyebrow">{patient.room}</p>
          <h3>{patient.name}</h3>
        </div>
        <span className={`pill ${device.status === "online" ? "success" : "danger"}`}>{device.status}</span>
      </div>

      <p className="muted">{patient.profileSummary}</p>

      <div className="stack">
        <DeviceBatteryIndicator level={device.batteryLevel} />
        <div className="split-row">
          <span className="muted">Last interaction</span>
          <strong>{patient.lastInteraction}</strong>
        </div>
        <div className="split-row">
          <span className="muted">Calm/anxiety status</span>
          <span className={`pill ${patient.emotionalState === "calm" ? "success" : "warning"}`}>
            {patient.emotionalState}
          </span>
        </div>
        <div className="split-row">
          <span className="muted">Reminder status</span>
          <span className={`pill ${patient.reminderStatus === "missed" ? "danger" : "success"}`}>
            {patient.reminderStatus}
          </span>
        </div>
        <div className="split-row">
          <span className="muted">Help alerts</span>
          <strong>{activeAlerts.length}</strong>
        </div>
        <WanderingRiskBadge risk={patient.wanderingRisk} />
        <Link className="button-link" href={`/memory-pendant/patient/${patient.id}`}>
          View patient details
        </Link>
      </div>
    </article>
  );
}
