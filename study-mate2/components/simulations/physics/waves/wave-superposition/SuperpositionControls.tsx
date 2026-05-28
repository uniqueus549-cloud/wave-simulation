import { ParameterSlider } from "@/components/simulations/ParameterSlider";
import { superpositionParameterRanges } from "./waveSuperpositionConfig";
import type { WaveSuperpositionModel } from "./useWaveSuperposition";

type SuperpositionControlsProps = {
  model: WaveSuperpositionModel;
};

export function SuperpositionControls({ model }: SuperpositionControlsProps) {
  const { state, actions, metrics } = model;

  return (
    <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-5 md:grid-cols-[auto_auto] md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              재생 및 시간 설정
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">
              <button
                onClick={() => actions.setIsPlaying(true)}
                className="rounded-md bg-blue-600 px-5 py-3 text-base font-black text-white shadow-sm transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                재생
              </button>
              <button
                onClick={() => actions.setIsPlaying(false)}
                className="rounded-md border border-slate-300 bg-slate-50 px-5 py-3 text-base font-black text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:py-2.5 sm:text-sm"
              >
                일시정지
              </button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-black text-slate-800">재생 속도</p>
            <div className="grid grid-cols-4 gap-2 sm:flex">
              {[0.25, 0.5, 1, 2].map((value) => (
                <button
                  key={value}
                  onClick={() => actions.setTimeScale(value)}
                  className={`rounded-md border px-3 py-3 text-sm font-black transition sm:py-2 ${
                    state.timeScale === value
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-700"
                  }`}
                >
                  {value}x
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-lg font-black text-slate-950">
            <span>시간 t =</span>
            <span className="text-blue-600">{state.time.toFixed(2)} s</span>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <span className="text-sm font-semibold text-slate-600">0 s</span>
            <input
              type="range"
              min="0"
              max={metrics.stopTime}
              step="0.01"
              value={state.time}
              onChange={(event) => {
                actions.setIsPlaying(false);
                actions.setTime(Number(event.target.value));
              }}
              className="w-full accent-blue-600"
            />
            <span className="text-sm font-semibold text-slate-600">
              {Math.round(metrics.stopTime)} s
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <ParameterSlider
          label="진동수"
          symbol="f"
          value={state.frequency}
          unit="Hz"
          description="두 파동의 진동 속도"
          onChange={actions.setFrequency}
          {...superpositionParameterRanges.frequency}
        />
        <ParameterSlider
          label="파장"
          symbol="λ"
          value={state.wavelength}
          unit="cm"
          description="같은 모양이 반복되는 거리"
          onChange={actions.setWavelength}
          {...superpositionParameterRanges.wavelength}
        />
        <ParameterSlider
          label="파동 1 진폭"
          symbol="A₁"
          value={state.amplitudeA}
          unit="cm"
          description="파란 점선 파동의 진폭"
          onChange={actions.setAmplitudeA}
          {...superpositionParameterRanges.amplitudeA}
        />
        <ParameterSlider
          label="파동 2 진폭"
          symbol="A₂"
          value={state.amplitudeB}
          unit="cm"
          description="초록 점선 파동의 진폭"
          onChange={actions.setAmplitudeB}
          {...superpositionParameterRanges.amplitudeB}
        />
        <ParameterSlider
          label="위상차"
          symbol="φ"
          value={state.phaseDifference}
          unit="°"
          description="두 파동의 어긋난 정도"
          onChange={actions.setPhaseDifference}
          {...superpositionParameterRanges.phaseDifference}
        />

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 shadow-sm">
          <p className="text-sm font-black text-blue-700">자동 계산</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-black text-slate-500">속도</p>
              <p className="mt-2 text-lg font-black text-slate-950">
                v = fλ ={" "}
                <span className="text-blue-700">
                  {metrics.speed.toFixed(2)} cm/s
                </span>
              </p>
            </div>
            <div className="rounded-md bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-black text-slate-500">주기</p>
              <p className="mt-2 text-lg font-black text-slate-950">
                T = 1/f ={" "}
                <span className="text-blue-700">
                  {metrics.period.toFixed(2)} s
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
