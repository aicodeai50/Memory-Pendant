import type { AlertEvent } from "@/lib/memory-pendant/types";

type AlertCardProps = {
  alert: AlertEvent;
  onAcknowledge?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
};

export function AlertCard({ alert, onAcknowledge, onResolve }: AlertCardProps) {
  const severityClass = alert.severity === "high" ? "danger" : alert.severity === "medium" ? "warning" : "success";
  const statusClass =
    alert.status === "resolved" ? "success" : alert.status === "acknowledged" ? "warning" : "danger";
  const canAcknowledge = Boolean(onAcknowledge) && alert.status === "new";
  const canResolve = Boolean(onResolve) && alert.status !== "resolved";

  return (
    <article className="soft-card">
      <div className="split-row">
        <span className={`pill ${severityClass}`}>Severity: {alert.severity}</span>
        <span className="muted">{alert.createdAt}</span>
      </div>
      <h3 style={{ marginTop: 14 }}>{alert.title}</h3>
      <p className="muted">{alert.description}</p>
      <div className="split-row" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        <span className={`pill ${statusClass}`}>Status: {alert.status}</span>
        {(canAcknowledge || canResolve) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {canAcknowledge && (
              <button className="secondary-button" onClick={() => onAcknowledge?.(alert.id)} type="button">
                Acknowledge
              </button>
            )}
            {canResolve && (
              <button className="button-link" onClick={() => onResolve?.(alert.id)} type="button">
                Resolve
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
