type ParameterSliderProps = {
  label: string;
  symbol: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  description: string;
  onChange: (value: number) => void;
};

export function ParameterSlider({
  label,
  symbol,
  value,
  unit,
  min,
  max,
  step,
  description,
  onChange,
}: ParameterSliderProps) {
  return (
    <div className="grid items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[minmax(220px,1fr)_260px]">
      <div className="grid gap-3">
        <p className="text-lg font-black text-slate-950">
          {label}
          {symbol ? ` ${symbol}` : ""} ={" "}
          <span className="text-blue-600">
            {value} {unit}
          </span>
        </p>
        <div className="grid grid-cols-[42px_1fr_42px] items-center gap-3">
          <span className="text-sm font-semibold text-slate-500">{min}</span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            className="w-full accent-blue-600"
          />
          <span className="text-sm font-semibold text-slate-500">{max}</span>
        </div>
      </div>
      <p className="rounded-md bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}
