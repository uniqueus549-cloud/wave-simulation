import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { WaveSuperpositionSimulation } from "@/components/simulations/physics/waves/wave-superposition/WaveSuperpositionSimulation";

export default function WaveInterference1Page() {
  return (
    <StudentAppShell>
      <WaveSuperpositionSimulation />
    </StudentAppShell>
  );
}
