import type { WavePropagationModel } from "./useWavePropagation";

type WaveCanvasProps = {
  model: WavePropagationModel;
  children?: React.ReactNode;
};

export function WaveCanvas({ model, children }: WaveCanvasProps) {
  const { state, metrics, layout, computed } = model;

  return (
    <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-1 shadow-sm sm:p-3">
      <div className="mb-2 flex items-center justify-between gap-3 px-2 pt-1">
        <h2 className="text-base font-black text-slate-950">
          위치-변위 그래프
        </h2>
        <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-black text-red-700">
          특정 시각의 파형
        </span>
      </div>
      <div className="overflow-x-auto overflow-y-hidden rounded-md bg-white">
        <svg
          viewBox={`${layout.viewBoxMinX} 0 ${layout.viewBoxWidth} ${layout.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="h-[560px] w-[1240px] max-w-none [--axis-font:20px] [--measure-font:18px] [--motion-sub-font:18px] [--motion-title-font:22px] [--x-label-font:24px] [--y-label-font:22px] sm:h-[480px] sm:w-full sm:[--axis-font:16px] sm:[--measure-font:16px] sm:[--motion-sub-font:16px] sm:[--motion-title-font:18px] sm:[--x-label-font:22px] sm:[--y-label-font:20px]"
        >
          <defs>
            <marker id="orangeArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
            </marker>
            <marker id="purpleArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto-start-reverse">
              <path d="M0,1 L4,3 L0,5 Z" fill="#7c3aed" />
            </marker>
            <marker id="greenArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto-start-reverse">
              <path d="M0,1 L4,3 L0,5 Z" fill="#16a34a" />
            </marker>
          </defs>

          <rect
            x={computed.motionParticle.x - computed.motionBandWidth / 2}
            y={layout.midY - metrics.graphAmplitude}
            width={computed.motionBandWidth}
            height={metrics.graphAmplitude * 2}
            rx="6"
            fill="#2563eb"
            opacity="0.1"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.18"
          />

          {computed.xTickValues.map((value) => (
            <g key={value}>
              <line x1={layout.originX + value} y1={layout.midY - 6} x2={layout.originX + value} y2={layout.midY + 6} stroke="#94a3b8" strokeWidth="2" />
              <text x={layout.originX + value} y={layout.midY + 28} fontSize="var(--axis-font)" fill="#475569" textAnchor="middle">
                {(value / metrics.xScale).toFixed(0)}
              </text>
            </g>
          ))}

          {computed.yTickValues.map((value) => (
            <g key={value}>
              {value !== 0 && (
                <line x1={layout.originX - 6} y1={layout.midY - value} x2={layout.originX} y2={layout.midY - value} stroke="#94a3b8" strokeWidth="2" />
              )}
              <text x={layout.originX - 14} y={layout.midY - value + 6} fontSize="var(--axis-font)" fill="#475569" textAnchor="end">
                {Number(value / metrics.yScale).toFixed(value === 0 ? 0 : 1)}
              </text>
            </g>
          ))}

          <line x1={layout.originX} y1={layout.midY} x2={layout.axisArrowStartX} y2={layout.midY} stroke="#64748b" strokeWidth="4" strokeLinecap="butt" />
          <polygon points={`${layout.axisEndX},${layout.midY} ${layout.axisArrowStartX},${layout.midY - 9} ${layout.axisArrowStartX},${layout.midY + 9}`} fill="#64748b" />

          <line x1={layout.originX} y1={layout.midY + 142} x2={layout.originX} y2={layout.yAxisArrowStartY} stroke="#64748b" strokeWidth="4" strokeLinecap="butt" />
          <polygon points={`${layout.originX},${layout.yAxisArrowTipY} ${layout.originX - 9},${layout.yAxisArrowStartY} ${layout.originX + 9},${layout.yAxisArrowStartY}`} fill="#64748b" />

          <text x={layout.axisEndX + 8} y={layout.midY} fontSize="var(--x-label-font)" fill="#475569" fontWeight="700" textAnchor="start" dominantBaseline="middle">
            x (cm)
          </text>
          <text x={layout.originX - 16} y="54" fontSize="var(--y-label-font)" fill="#475569" fontWeight="700" textAnchor="end">
            변위 y (cm)
          </text>
          <text x={layout.originX - 34} y={layout.midY} fontSize="var(--motion-sub-font)" fontWeight="700" fill="#f97316" textAnchor="end" dominantBaseline="middle">
            x=0
          </text>

          <polyline points={computed.wavePoints} fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          {computed.particles.map((particle, index) => (
            <circle key={`${particle.physicsX}-${index}`} cx={particle.x} cy={particle.y} r="8" fill="#111827" />
          ))}

          <circle cx={computed.firstParticle.x} cy={computed.firstParticle.y} r="9.75" fill="none" stroke="#f97316" strokeWidth="3.5" />

          {metrics.showWaveFrontLabel ? (
            <line x1={metrics.waveFrontScreenX} y1={layout.midY - 90} x2={metrics.waveFrontScreenX} y2={layout.midY + 90} stroke="#f97316" strokeWidth="4" strokeDasharray="8 8" />
          ) : null}

          <text x={computed.motionParticle.x} y="40" fontSize="var(--motion-title-font)" fontWeight="700" fill="#2563eb" textAnchor="middle">
            입자 운동
          </text>
          <text x={computed.motionParticle.x} y="66" fontSize="var(--motion-sub-font)" fill="#2563eb" textAnchor="middle">
            위아래 진동
          </text>
          <circle cx={computed.motionParticle.x} cy={computed.motionParticle.y} r="9.75" fill="none" stroke="#2563eb" strokeWidth="3.5" />

          <line x1={layout.axisEndX - 180} y1="34" x2={layout.axisEndX - 40} y2="34" stroke="#ef4444" strokeWidth="4" markerEnd="url(#orangeArrow)" />
          <text x={layout.axisEndX - 180} y="18" fontSize="var(--motion-title-font)" fontWeight="700" fill="#ef4444">
            파동 진행 방향
          </text>

          {computed.showAmplitude ? (
            <>
              <line x1={computed.crestScreenX} y1={layout.midY} x2={computed.crestScreenX} y2={computed.crestY} stroke="#7c3aed" strokeWidth="2.5" markerStart="url(#purpleArrow)" markerEnd="url(#purpleArrow)" opacity="0.95" />
              <text x={computed.crestScreenX + 14} y={computed.amplitudeLabelY} fontSize="var(--measure-font)" fontWeight="700" fill="#7c3aed">
                {`진폭 A = ${state.amplitude.toFixed(1)} cm`}
              </text>
            </>
          ) : null}

          {computed.showWavelength ? (
            <>
              <line x1={computed.wavelengthStartX} y1={computed.wavelengthLineY} x2={computed.wavelengthEndX} y2={computed.wavelengthLineY} stroke="#16a34a" strokeWidth="2.5" markerStart="url(#greenArrow)" markerEnd="url(#greenArrow)" opacity="0.95" />
              <text x={(computed.wavelengthStartX + computed.wavelengthEndX) / 2} y={computed.wavelengthLabelY} fontSize="var(--measure-font)" fontWeight="700" fill="#166534" textAnchor="middle">
                {`파장 λ = ${state.wavelength.toFixed(1)} cm`}
              </text>
            </>
          ) : null}
        </svg>
      </div>
      {children ? (
        <div
          className="-mt-6 px-2 pb-2 sm:-mt-8 sm:px-8"
          style={
            {
              "--selected-particle-x": `${computed.motionParticle.x}px`,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
