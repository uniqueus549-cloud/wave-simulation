import { FormulaPanel } from "@/components/simulations/FormulaPanel";

type WaveFormulaPanelProps = {
  frequency: number;
  wavelength: number;
  speed: number;
  period: number;
};

export function WaveFormulaPanel({
  frequency,
  wavelength,
  speed,
  period,
}: WaveFormulaPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <FormulaPanel
        title="파동의 기본 관계식"
        formula="v = fλ,  T = 1/f"
        details={[
          `f : 진동수 ${frequency.toFixed(2)} Hz`,
          `λ : 파장 ${wavelength.toFixed(1)} cm`,
          `v : 속도 ${speed.toFixed(2)} cm/s`,
          `T : 주기 ${period.toFixed(2)} s`,
        ]}
      />
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
        <p className="text-sm font-black text-blue-700">현재 계산값</p>
        <div className="mt-3 grid gap-2 text-base font-bold leading-7 text-slate-700">
          <p>v = {frequency.toFixed(2)} Hz × {wavelength.toFixed(1)} cm = {speed.toFixed(2)} cm/s</p>
          <p>T = 1 / {frequency.toFixed(2)} Hz = {period.toFixed(2)} s</p>
        </div>
      </div>
    </div>
  );
}
