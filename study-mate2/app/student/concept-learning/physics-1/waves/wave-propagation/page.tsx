import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { WavePropagationSimulation } from "@/components/simulations/physics/waves/wave-propagation/WavePropagationSimulation";

export default function WavePropagationPage() {
  return (
    <StudentAppShell>
      <WavePropagationSimulation />
    </StudentAppShell>
  );
}
