import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { PulseSuperpositionSimulation } from "@/components/simulations/physics/waves/pulse-superposition/PulseSuperpositionSimulation";

export default function WaveSuperpositionPage() {
  return (
    <StudentAppShell>
      <PulseSuperpositionSimulation />
    </StudentAppShell>
  );
}
