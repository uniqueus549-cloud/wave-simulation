"use client";

import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import { learningRoutes } from "@/lib/learning/routes";
import { TimeDisplacementGraph } from "./TimeDisplacementGraph";
import { WaveCanvas } from "./WaveCanvas";
import { WaveControls } from "./WaveControls";
import { WaveFormulaPanel } from "./WaveFormulaPanel";
import { WAVE_PROPAGATION_VERSION } from "./wavePropagationConfig";
import { useWavePropagation } from "./useWavePropagation";

const observationPoints = [
  "파형은 오른쪽으로 진행한다.",
  "각 입자는 제자리에서 위아래로만 진동한다.",
];

export function WavePropagationSimulation() {
  const model = useWavePropagation();

  return (
    <SimulationFrame
      breadcrumbs={[
        { label: "학생 홈", href: learningRoutes.studentHome },
        { label: "개념학습", href: learningRoutes.conceptLearning },
        { label: "물리학 I", href: learningRoutes.physics1 },
        { label: "파동과 정보 통신", href: learningRoutes.physics1Waves },
        { label: "파동의 진행" },
      ]}
      title="파동의 진행"
    >
      <section className="rounded-lg border border-blue-200 bg-white px-4 py-4 shadow-sm sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
            파형의 진행과 입자의 제자리 진동
          </h2>
          <p className="w-fit rounded-md bg-violet-50 px-3 py-2 text-sm font-black text-violet-800 ring-1 ring-violet-100">
            y = A sin(2π(x - vt)/λ)
          </p>
        </div>
      </section>

      <section>
        <WaveCanvas model={model}>
          <div className="w-full max-w-[560px] sm:ml-[clamp(0px,calc(var(--selected-particle-x)-250px),calc(100%-500px))]">
            <TimeDisplacementGraph model={model} />
          </div>
        </WaveCanvas>
      </section>
      <WaveControls model={model} />
      <WaveFormulaPanel
        frequency={model.state.frequency}
        wavelength={model.state.wavelength}
        speed={model.state.speed}
        period={model.metrics.period}
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-black text-slate-500">관찰 포인트</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {observationPoints.map((point, index) => (
            <div
              key={point}
              className="grid grid-cols-[32px_1fr] items-center gap-3 rounded-md bg-slate-50 px-3 py-2.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-sm font-black text-white">
                {index + 1}
              </span>
              <p className="text-base font-bold leading-7 text-slate-800">
                {point}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="self-end rounded-md bg-slate-900/5 px-2 py-1 text-xs font-semibold text-slate-500">
        Version: {WAVE_PROPAGATION_VERSION}
      </div>
    </SimulationFrame>
  );
}
