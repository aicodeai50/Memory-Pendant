import type { AlertEvent } from "@/lib/memory-pendant/types";

type AlertCardProps = {
  alert: AlertEvent;
};

export function AlertCard({ alert }: AlertCardProps) {
  const severityClass =
    alert.severity === "urgent" ? "danger" : alert.severity === "warning" ? "warning" : "success";

  return (
    <article className="soft-card">
      <div className="split-row">
        <span className={`pill ${severityClass}`}>{alert.severity}</span>
        <span className="muted">{alert.createdAt}</span>
      </div>
      <h3 style={{ marginTop: 14 }}>{alert.title}</h3>
      <p className="muted">{alert.description}</p>
      <span className={`pill ${alert.resolved ? "success" : "warning"}`}>
        {alert.resolved ? "Resolved" : "Needs review"}
      </span>
    </article>
  );
}
