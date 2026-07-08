import type { VoiceResponse } from "@/lib/memory-pendant/types";

type VoiceResponsePreviewProps = {
  response: VoiceResponse;
};

export function VoiceResponsePreview({ response }: VoiceResponsePreviewProps) {
  return (
    <article className="card" aria-live="polite">
      <p className="eyebrow">AI Response Preview</p>
      <h2>Calm pendant voice</h2>
      <div className="stack">
        <div className="soft-card">
          <h3>Pendant says</h3>
          <p style={{ fontSize: "1.25rem" }}>{response.pendantSpeech}</p>
        </div>
        <div className="soft-card">
          <h3>Staff dashboard update</h3>
          <p className="muted">{response.staffUpdate}</p>
        </div>
        <div className="soft-card">
          <h3>Recommended next step</h3>
          <p className="muted">{response.nextStep}</p>
        </div>
      </div>
    </article>
  );
}
