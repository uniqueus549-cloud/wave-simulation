"use client";

import { useEffect, useMemo, useState } from "react";
import { SimulationFrame } from "@/components/simulations/SimulationFrame";
import { ParameterSlider } from "@/components/simulations/ParameterSlider";
import { learningRoutes } from "@/lib/learning/routes";

const VERSION = "v0.1.0-study-mate2";

const width = 1100;
const height = 420;
const originX = 80;
const midY = 210;
const axisEndX = 1040;
const xScale = 110;
const yScale = 42;

function pulse(x: number, center: number, amplitude: number, widthValue: number) {
  const distance = (x - center) / widthValue;
  return amplitude * Math.exp(-distance * distance);
}

export function PulseSuperpositionSimulation() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [amplitudeA, setAmplitudeA] = useState(2.5);
  const [amplitudeB, setAmplitudeB] = useState(1.5);
  const [wavelength, setWavelength] = useState(1.8);

  const speed = 0.9;
  const stopTime = 7;
  const pulseWidth = wavelength / 4;

  useEffect(() => {
    let frameId: number;
    let last: number | null = null;

    const animate = (now: number) => {
      if (last === null) last = now;
      const delta = (now - last) / 1000;
      last = now;

      if (isPlaying) {
        setTime((prev) => {
          const next = prev + delta * timeScale;
          if (next >= stopTime) {
            setIsPlaying(false);
            return stopTime;
          }
          return next;
        });
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, timeScale]);

  const computed = useMemo(() => {
    const centerA = 1.1 + speed * time;
    const centerB = 8.2 - speed * time;

    const makePoints = (fn: (x: number) => number) => {
      const points: string[] = [];
      for (let screenX = originX; screenX <= axisEndX; screenX += 5) {
        const x = (screenX - originX) / xScale;
        const y = fn(x);
        points.push(`${screenX},${midY - y * yScale}`);
      }
      return points.join(" ");
    };

    const waveA = (x: number) => pulse(x, centerA, amplitudeA, pulseWidth);
    const waveB = (x: number) => pulse(x, centerB, amplitudeB, pulseWidth);
    const result = (x: number) => waveA(x) + waveB(x);

    return {
      centerA,
      centerB,
      waveAPoints: makePoints(waveA),
      waveBPoints: makePoints(waveB),
      resultPoints: makePoints(result),
    };
  }, [amplitudeA, amplitudeB, pulseWidth, time]);

  return (
    <SimulationFrame
      breadcrumbs={[
        { label: "학생 홈", href: learningRoutes.studentHome },
        { label: "개념학습", href: learningRoutes.conceptLearning },
        { label: "물리학 I", href: learningRoutes.physics1 },
        { label: "파동과 정보 통신", href: learningRoutes.physics1Waves },
        { label: "파동의 중첩" },
      ]}
      title="파동의 중첩"
    >
      <section className="rounded-lg border border-blue-200 bg-white px-4 py-4 shadow-sm sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
            두 파동이 만날 때 변위가 더해지는 현상
          </h2>
          <p className="w-fit rounded-md bg-violet-50 px-3 py-2 text-sm font-black text-violet-800 ring-1 ring-violet-100">
            y = y₁ + y₂
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-4">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3 px-1">
          <h2 className="text-base font-black text-slate-950">
            위치-변위 그래프
          </h2>
          <div className="flex flex-wrap gap-2 text-xs font-black">
            <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
              파동 A
            </span>
            <span className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-700">
              파동 B
            </span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-800">
              합성 변위
            </span>
          </div>
        </div>
        <div className="overflow-x-auto overflow-y-hidden">
          <svg
            viewBox="0 0 1120 420"
            className="h-[500px] w-[1120px] max-w-none sm:h-[440px] sm:w-full"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
              <g key={value}>
                <line
                  x1={originX + value * xScale}
                  y1={midY - 6}
                  x2={originX + value * xScale}
                  y2={midY + 6}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
                <text
                  x={originX + value * xScale}
                  y={midY + 28}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#475569"
                >
                  {value}
                </text>
              </g>
            ))}

            {[-4, -2, 0, 2, 4, 6].map((value) => (
              <g key={value}>
                {value !== 0 ? (
                  <line
                    x1={originX - 6}
                    y1={midY - value * yScale}
                    x2={originX}
                    y2={midY - value * yScale}
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                ) : null}
                <text
                  x={originX - 14}
                  y={midY - value * yScale + 6}
                  textAnchor="end"
                  fontSize="16"
                  fontWeight="700"
                  fill="#475569"
                >
                  {value}
                </text>
              </g>
            ))}

            <line
              x1={originX}
              y1={midY}
              x2={axisEndX}
              y2={midY}
              stroke="#64748b"
              strokeWidth="4"
            />
            <line
              x1={originX}
              y1={midY + 160}
              x2={originX}
              y2={48}
              stroke="#64748b"
              strokeWidth="4"
            />
            <text
              x={axisEndX + 16}
              y={midY + 6}
              fontSize="22"
              fontWeight="800"
              fill="#475569"
            >
              x (cm)
            </text>
            <text
              x={originX - 16}
              y="34"
              fontSize="20"
              fontWeight="800"
              fill="#475569"
              textAnchor="end"
            >
              변위 y (cm)
            </text>

            <polyline
              points={computed.waveAPoints}
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={computed.waveBPoints}
              fill="none"
              stroke="#059669"
              strokeWidth="4"
              strokeDasharray="8 8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={computed.resultPoints}
              fill="none"
              stroke="#111827"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <text
              x={originX + computed.centerA * xScale}
              y={midY - amplitudeA * yScale - 20}
              textAnchor="middle"
              fontSize="24"
              fontWeight="800"
              fill="#2563eb"
            >
              A
            </text>
            <text
              x={originX + computed.centerB * xScale}
              y={midY - amplitudeB * yScale - 20}
              textAnchor="middle"
              fontSize="24"
              fontWeight="800"
              fill="#059669"
            >
              B
            </text>
          </svg>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="text-lg font-black text-slate-950">
            재생 및 시간 설정
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">
            <button
              onClick={() => setIsPlaying(true)}
              className="rounded-md bg-blue-600 px-5 py-3 text-base font-black text-white shadow-sm transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              재생
            </button>
            <button
              onClick={() => setIsPlaying(false)}
              className="rounded-md border border-slate-300 bg-slate-50 px-5 py-3 text-base font-black text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              일시정지
            </button>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-lg font-black text-slate-950">
              시간 t = <span className="text-blue-600">{time.toFixed(2)} s</span>
            </p>
            <input
              type="range"
              min="0"
              max={stopTime}
              step="0.01"
              value={time}
              onChange={(event) => {
                setIsPlaying(false);
                setTime(Number(event.target.value));
              }}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <div className="grid gap-3">
          <ParameterSlider
            label="파동 A의 최대 변위"
            symbol=""
            value={amplitudeA}
            unit="cm"
            min={-4}
            max={4}
            step={0.1}
            description="오른쪽으로 이동하는 파동의 최대 변위"
            onChange={setAmplitudeA}
          />
          <ParameterSlider
            label="파동 B의 최대 변위"
            symbol=""
            value={amplitudeB}
            unit="cm"
            min={-4}
            max={4}
            step={0.1}
            description="왼쪽으로 이동하는 파동의 최대 변위"
            onChange={setAmplitudeB}
          />
          <ParameterSlider
            label="파장"
            symbol="λ"
            value={wavelength}
            unit="cm"
            min={1}
            max={4}
            step={0.1}
            description="파동의 가로 길이를 파장 기준으로 조절"
            onChange={setWavelength}
          />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <p className="text-sm font-black text-slate-500">관찰 포인트</p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {[
            "두 파동이 겹치는 순간 변위가 더해진다.",
            "겹친 뒤에는 각 파동이 원래 모양을 유지하며 지나간다.",
          ].map((point, index) => (
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
        Version: {VERSION}
      </div>
    </SimulationFrame>
  );
}
