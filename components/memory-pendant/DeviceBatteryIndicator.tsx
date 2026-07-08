type DeviceBatteryIndicatorProps = {
  level: number;
};

export function DeviceBatteryIndicator({ level }: DeviceBatteryIndicatorProps) {
  const safeLevel = Math.max(0, Math.min(level, 100));
  const statusClass = safeLevel < 25 ? "danger" : safeLevel < 55 ? "warning" : "success";

  return (
    <div aria-label={`Battery level ${safeLevel}%`}>
      <div className="split-row">
        <strong>Battery</strong>
        <span className={`pill ${statusClass}`}>{safeLevel}%</span>
      </div>
      <div
        style={{
          height: 12,
          borderRadius: 999,
          background: "#dfecea",
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${safeLevel}%`,
            height: "100%",
            background: safeLevel < 25 ? "var(--danger)" : safeLevel < 55 ? "var(--warning)" : "var(--success)",
          }}
        />
      </div>
    </div>
  );
}
