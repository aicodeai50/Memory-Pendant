import type { MemoryModule } from "@/lib/memory-pendant/types";

type MemoryModuleCardProps = {
  memory: MemoryModule;
};

export function MemoryModuleCard({ memory }: MemoryModuleCardProps) {
  return (
    <article className="soft-card">
      <span className="pill">{memory.category}</span>
      <h3 style={{ marginTop: 14 }}>{memory.title}</h3>
      <p className="muted">{memory.content}</p>
    </article>
  );
}
