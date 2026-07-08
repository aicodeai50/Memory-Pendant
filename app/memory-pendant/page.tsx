import Link from "next/link";

const featureCards = [
  {
    title: "Safety-first design",
    text: "Built around gentle support, clear escalation, and staff visibility without turning care into surveillance.",
  },
  {
    title: "No camera. Not surveillance.",
    text: "The pendant focuses on voice support, simple signals, and alerts. It is designed to preserve dignity and trust.",
  },
  {
    title: "Calm AI companion",
    text: "Short, familiar phrases help orient the patient, lower anxiety, and avoid confrontational correction.",
  },
  {
    title: "Help button",
    text: "A large accessible help action lets patients request care when they are afraid, lost, or uncomfortable.",
  },
  {
    title: "Staff alerts",
    text: "Care teams can see urgent events, battery health, recent interactions, and risk changes at a glance.",
  },
  {
    title: "Reminder support",
    text: "Medication, family calls, routines, and comfort reminders are delivered in a predictable dementia-friendly way.",
  },
];

export default function MemoryPendantLandingPage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Dementia care AI pendant</p>
          <h1>Calm support around the neck, confidence for the care team.</h1>
          <p className="lead">
            Zentro Memory Pendant is a frontend prototype for a soft-spoken AI companion that helps patients feel safe,
            reminds them of familiar routines, and alerts staff when a human should step in.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
            <Link className="button-link" href="/memory-pendant/dashboard">
              Open staff dashboard
            </Link>
            <Link className="secondary-button" href="/memory-pendant/simulator">
              Try simulator
            </Link>
          </div>
        </div>

        <aside className="card">
          <p className="eyebrow">What it does</p>
          <div className="stack">
            <div className="soft-card">
              <h3>Listens for care events</h3>
              <p className="muted">Help requests, confusion, anxiety, wandering risk, and low battery states.</p>
            </div>
            <div className="soft-card">
              <h3>Responds gently</h3>
              <p className="muted">Uses approved safe phrases, family memory, and routine cues.</p>
            </div>
            <div className="soft-card">
              <h3>Alerts staff</h3>
              <p className="muted">Escalates when support should move from AI reassurance to human care.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <p className="eyebrow">Dementia-friendly design</p>
        <h2>Professional care technology that stays human.</h2>
        <div className="grid grid-3">
          {featureCards.map((card) => (
            <article className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p className="muted">{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
