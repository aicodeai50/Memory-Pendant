import type { Reminder } from "@/lib/memory-pendant/types";

type ReminderTimelineProps = {
  reminders: Reminder[];
};

export function ReminderTimeline({ reminders }: ReminderTimelineProps) {
  return (
    <div className="stack">
      {reminders.map((reminder) => {
        const statusClass =
          reminder.status === "missed" ? "danger" : reminder.status === "upcoming" ? "warning" : "success";

        return (
          <article className="soft-card" key={reminder.id}>
            <div className="split-row">
              <strong>{reminder.time}</strong>
              <span className={`pill ${statusClass}`}>{reminder.status}</span>
            </div>
            <h3 style={{ marginTop: 12 }}>{reminder.title}</h3>
            <p className="muted">{reminder.notes}</p>
          </article>
        );
      })}
    </div>
  );
}
