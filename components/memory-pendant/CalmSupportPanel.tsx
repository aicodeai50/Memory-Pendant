type CalmSupportPanelProps = {
  safePhrases: string[];
  routine?: string[];
};

export function CalmSupportPanel({ safePhrases, routine = [] }: CalmSupportPanelProps) {
  return (
    <article className="card">
      <p className="eyebrow">Calm Support</p>
      <h2>Dementia-friendly guidance</h2>
      <div className="grid grid-2">
        <div className="soft-card">
          <h3>Safe phrases</h3>
          <ul>
            {safePhrases.map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
          </ul>
        </div>
        <div className="soft-card">
          <h3>Daily rhythm</h3>
          <ul>
            {routine.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
