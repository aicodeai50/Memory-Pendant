"use client";

import { useMemo, useState } from "react";
import { acknowledgeAlert, resolveAlert } from "@/lib/memory-pendant/api";
import type { AlertEvent, AlertStatus, PatientSnapshot } from "@/lib/memory-pendant/types";
import { AlertCard } from "./AlertCard";

type DashboardAlertWorkflowProps = {
  initialSnapshots: PatientSnapshot[];
};

const statusLabels: Record<AlertStatus, string> = {
  new: "New",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
};

const statusOrder: AlertStatus[] = ["new", "acknowledged", "resolved"];

export function DashboardAlertWorkflow({ initialSnapshots }: DashboardAlertWorkflowProps) {
  const [snapshots, setSnapshots] = useState<PatientSnapshot[]>(initialSnapshots);

  const groupedAlerts = useMemo(() => {
    const alerts = snapshots.flatMap((snapshot) => snapshot.alerts);

    return statusOrder.reduce<Record<AlertStatus, AlertEvent[]>>(
      (groups, status) => ({
        ...groups,
        [status]: alerts.filter((alert) => alert.status === status),
      }),
      {
        new: [],
        acknowledged: [],
        resolved: [],
      },
    );
  }, [snapshots]);

  async function applyAlertUpdate(alertId: string, updater: (id: string) => Promise<AlertEvent | undefined>) {
    const updatedAlert = await updater(alertId);

    if (!updatedAlert) {
      return;
    }

    setSnapshots((currentSnapshots) =>
      currentSnapshots.map((snapshot) => ({
        ...snapshot,
        alerts: snapshot.alerts.map((alert) => (alert.id === alertId ? updatedAlert : alert)),
      })),
    );
  }

  return (
    <section className="section">
      <p className="eyebrow">Alert lifecycle</p>
      <h2>Staff attention workflow</h2>
      <div className="grid grid-3">
        {statusOrder.map((status) => (
          <article className="card" key={status}>
            <div className="split-row">
              <h3>{statusLabels[status]}</h3>
              <span className="pill">{groupedAlerts[status].length}</span>
            </div>
            <div className="stack">
              {groupedAlerts[status].length > 0 ? (
                groupedAlerts[status].map((alert) => (
                  <AlertCard
                    alert={alert}
                    key={alert.id}
                    onAcknowledge={(alertId) => applyAlertUpdate(alertId, acknowledgeAlert)}
                    onResolve={(alertId) => applyAlertUpdate(alertId, resolveAlert)}
                  />
                ))
              ) : (
                <p className="muted">No {statusLabels[status].toLowerCase()} alerts.</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
