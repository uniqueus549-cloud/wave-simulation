"use client";

import { useEffect, useState } from "react";
import type { WavePropagationModel } from "./useWavePropagation";

type TimeDisplacementGraphProps = {
  model: WavePropagationModel;
};

export function TimeDisplacementGraph({ model }: TimeDisplacementGraphProps) {
  const { state, metrics, computed } = model;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const width = 500;
  const height = 190;
  const paddingLeft = 56;
  const paddingRight = 26;
  const paddingTop = 46;
  const paddingBottom = 44;
  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;
  const midY = paddingTop + graphHeight / 2;
  const maxAmplitude = 5;
  const timeWindow = metrics.stopTime;
  const currentTime = mounted ? Math.min(state.time, timeWindow) : 0;
  const selectedParticleX = metrics.selectedParticleX;

  const getDisplacement = (time: number) =>
    metrics.getDisplacementAt(selectedParticleX, time);

  const getX = (time: number) =>
    paddingLeft + (time / timeWindow) * graphWidth;
  const getY = (displacement: number) =>
    midY - (displacement / maxAmplitude) * (graphHeight / 2);

  const points = mounted
    ? Array.from({ length: 180 }, (_, index) => {
        const t = (index / 179) * timeWindow;
        return `${getX(t)},${getY(getDisplacement(t))}`;
      }).join(" ")
    : "";

  const currentX = getX(currentTime);
  const currentY = mounted ? getY(getDisplacement(currentTime)) : midY;
  const arrivalTime = selectedParticleX / state.speed;
  let firstCrestTime =
    (selectedParticleX / state.wavelength - 0.25) / state.frequency;
  while (firstCrestTime < arrivalTime) {
    firstCrestTime += metrics.period;
  }
  const secondCrestTime = firstCrestTime + metrics.period;
  const periodLineY = paddingTop - 20;
  const showPeriod =
    mounted && firstCrestTime >= 0 && secondCrestTime <= timeWindow;

  const timeTicks = Array.from(
    { length: Math.floor(timeWindow / 5) + 1 },
    (_, index) => {
      const value = index * 5;
      return {
        value,
        x: getX(value),
      };
    }
  ).filter((tick) => tick.value <= timeWindow);

  const yTicks = [-5, -2.5, 0, 2.5, 5];

  return (
    <section className="min-w-0 rounded-lg border border-blue-100 bg-blue-50/70 p-2.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3 px-1">
        <h2 className="text-base font-black text-slate-950">
          시간-변위 그래프
        </h2>
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[190px] w-[500px] max-w-none"
          role="img"
          aria-label="강조된 입자 하나의 시간에 따른 변위 그래프"
        >
          <defs>
            <marker
              id="periodArrow"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto-start-reverse"
            >
              <path d="M0,1 L4,3 L0,5 Z" fill="#2563eb" />
            </marker>
          </defs>

          <rect
            x={paddingLeft}
            y={paddingTop}
            width={graphWidth}
            height={graphHeight}
            rx="6"
            fill="#eff6ff"
          />

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={paddingLeft}
                y1={getY(tick)}
                x2={paddingLeft + graphWidth}
                y2={getY(tick)}
                stroke={tick === 0 ? "#64748b" : "#bfdbfe"}
                strokeWidth={tick === 0 ? 2 : 1}
                opacity={tick === 0 ? 1 : 0.65}
              />
              <text
                x={paddingLeft - 10}
                y={getY(tick) + 5}
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill="#64748b"
              >
                {tick.toFixed(tick === 0 ? 0 : 1)}
              </text>
            </g>
          ))}

          {timeTicks.map((tick) => (
            <g key={tick.value}>
              <line
                x1={tick.x}
                y1={paddingTop}
                x2={tick.x}
                y2={paddingTop + graphHeight}
                stroke="#bfdbfe"
                strokeWidth="1"
                opacity="0.65"
              />
              <text
                x={tick.x}
                y={paddingTop + graphHeight + 18}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#64748b"
              >
                {tick.value.toFixed(1)}
              </text>
            </g>
          ))}

          <line
            x1={paddingLeft}
            y1={paddingTop + graphHeight}
            x2={paddingLeft + graphWidth + 12}
            y2={paddingTop + graphHeight}
            stroke="#475569"
            strokeWidth="2.5"
          />
          <line
            x1={paddingLeft}
            y1={paddingTop + graphHeight}
            x2={paddingLeft}
            y2={paddingTop - 12}
            stroke="#475569"
            strokeWidth="2.5"
          />

          <text
            x={paddingLeft + graphWidth + 16}
            y={paddingTop + graphHeight + 22}
            fontSize="14"
            fontWeight="800"
            fill="#475569"
          >
            t (s)
          </text>
          <text
            x={paddingLeft - 18}
            y={paddingTop - 16}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fill="#475569"
          >
            y (cm)
          </text>

          {mounted ? (
            <polyline
              points={points}
              fill="none"
              stroke="#111827"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}

          {mounted ? (
            <>
              <line
                x1={currentX}
                y1={paddingTop}
                x2={currentX}
                y2={paddingTop + graphHeight}
                stroke="#2563eb"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              <circle
                cx={currentX}
                cy={currentY}
                r="8"
                fill="#111827"
                stroke="#2563eb"
                strokeWidth="3.5"
              />
            </>
          ) : null}

          {showPeriod ? (
            <>
              <line
                x1={getX(firstCrestTime)}
                y1={periodLineY}
                x2={getX(secondCrestTime)}
                y2={periodLineY}
                stroke="#2563eb"
                strokeWidth="2.5"
                markerStart="url(#periodArrow)"
                markerEnd="url(#periodArrow)"
              />
              <text
                x={(getX(firstCrestTime) + getX(secondCrestTime)) / 2}
                y={periodLineY - 7}
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#1d4ed8"
                paintOrder="stroke"
                stroke="#eff6ff"
                strokeWidth="5"
              >
                주기 T = {metrics.period.toFixed(2)} s
              </text>
            </>
          ) : null}
        </svg>
      </div>
    </section>
  );
}
