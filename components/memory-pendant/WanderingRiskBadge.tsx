import type { WanderingRisk } from "@/lib/memory-pendant/types";

type WanderingRiskBadgeProps = {
  risk: WanderingRisk;
};

export function WanderingRiskBadge({ risk }: WanderingRiskBadgeProps) {
  const className = risk === "high" ? "danger" : risk === "medium" ? "warning" : "success";

  return <span className={`pill ${className}`}>Wandering risk: {risk}</span>;
}
