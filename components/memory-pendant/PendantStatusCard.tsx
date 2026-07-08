import type { PendantDevice } from "@/lib/memory-pendant/types";
import { DeviceBatteryIndicator } from "./DeviceBatteryIndicator";

type PendantStatusCardProps = {
  device: PendantDevice;
};

export function PendantStatusCard({ device }: PendantStatusCardProps) {
  const isOnline = device.status === "online";

  return (
    <article className="card">
      <div className="split-row">
        <div>
          <p className="eyebrow">Pendant Device</p>
          <h3>{device.id}</h3>
        </div>
        <span className={`pill ${isOnline ? "success" : "danger"}`}>{device.status}</span>
      </div>
      <div className="stack" style={{ marginTop: 18 }}>
        <DeviceBatteryIndicator level={device.batteryLevel} />
        <div className="split-row">
          <span className="muted">Last sync</span>
          <strong>{device.lastSync}</strong>
        </div>
        <div className="split-row">
          <span className="muted">Firmware</span>
          <strong>{device.firmwareVersion}</strong>
        </div>
      </div>
    </article>
  );
}
