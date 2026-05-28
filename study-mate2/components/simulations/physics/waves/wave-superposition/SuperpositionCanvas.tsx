import type { WaveSuperpositionModel } from "./useWaveSuperposition";

type SuperpositionCanvasProps = {
  model: WaveSuperpositionModel;
};

export function SuperpositionCanvas({ model }: SuperpositionCanvasProps) {
  const { computed, layout, metrics } = model;

  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:p-3">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3 px-2 pt-1">
        <h2 className="text-base font-black text-slate-950">
          위치-변위 그래프
        </h2>
        <div className="flex flex-wrap gap-2 text-xs font-black">
          <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
            파동 1
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">
            파동 2
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-800">
            합성파
          </span>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-hidden rounded-md bg-white">
        <svg
          viewBox={`${layout.viewBoxMinX} 0 ${layout.viewBoxWidth} ${layout.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-[500px] w-[1180px] max-w-none [--axis-font:20px] [--x-label-font:24px] [--y-label-font:22px] sm:h-[440px] sm:w-full sm:[--axis-font:16px] sm:[--x-label-font:22px] sm:[--y-label-font:20px]"
        >
          {computed.xTickValues.map((value) => (
            <g key={value}>
              <line
                x1={layout.originX + value}
                y1={layout.midY - 6}
                x2={layout.originX + value}
                y2={layout.midY + 6}
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <text
                x={layout.originX + value}
                y={layout.midY + 28}
                fontSize="var(--axis-font)"
                fill="#475569"
                textAnchor="middle"
              >
                {(value / metrics.xScale).toFixed(0)}
              </text>
            </g>
          ))}

          {computed.yTickValues.map((value) => (
            <g key={value}>
              {value !== 0 ? (
                <line
                  x1={layout.originX - 6}
                  y1={layout.midY - value}
                  x2={layout.originX}
                  y2={layout.midY - value}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              ) : null}
              <text
                x={layout.originX - 14}
                y={layout.midY - value + 6}
                fontSize="var(--axis-font)"
                fill="#475569"
                textAnchor="end"
              >
                {Number(value / metrics.yScale).toFixed(0)}
              </text>
            </g>
          ))}

          <line
            x1={layout.originX}
            y1={layout.midY}
            x2={layout.axisArrowStartX}
            y2={layout.midY}
            stroke="#64748b"
            strokeWidth="4"
          />
          <polygon
            points={`${layout.axisEndX},${layout.midY} ${layout.axisArrowStartX},${layout.midY - 9} ${layout.axisArrowStartX},${layout.midY + 9}`}
            fill="#64748b"
          />

          <line
            x1={layout.originX}
            y1={layout.midY + 164}
            x2={layout.originX}
            y2={layout.yAxisArrowStartY}
            stroke="#64748b"
            strokeWidth="4"
          />
          <polygon
            points={`${layout.originX},${layout.yAxisArrowTipY} ${layout.originX - 9},${layout.yAxisArrowStartY} ${layout.originX + 9},${layout.yAxisArrowStartY}`}
            fill="#64748b"
          />

          <text
            x={layout.axisEndX + 8}
            y={layout.midY}
            fontSize="var(--x-label-font)"
            fill="#475569"
            fontWeight="700"
            dominantBaseline="middle"
          >
            x (cm)
          </text>
          <text
            x={layout.originX - 16}
            y="54"
            fontSize="var(--y-label-font)"
            fill="#475569"
            fontWeight="700"
            textAnchor="end"
          >
            변위 y (cm)
          </text>

          <polyline
            points={computed.waveAPoints}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <polyline
            points={computed.waveBPoints}
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
          <polyline
            points={computed.resultPoints}
            fill="none"
            stroke="#111827"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
