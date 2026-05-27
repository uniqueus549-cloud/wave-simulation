"use client";

import { useEffect, useState } from "react";

const VERSION = "v0.1.0-mobile";

export default function WaveAnimation() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [speed, setSpeed] = useState(120);
  const [wavelength, setWavelength] = useState(300);
  const [amplitude, setAmplitude] = useState(70);
  const [isMobile, setIsMobile] = useState(false);

  const width = 1100;
  const height = 420;
  const viewBoxMinX = -80;
  const graphRightPadding = 140;
  const viewBoxWidth = width - viewBoxMinX + graphRightPadding;
  const originX = 80;
  const midY = 210;
  const axisEndX = originX + 1040;
  const axisArrowStartX = axisEndX - 18;
  const yAxisArrowTipY = 50;
  const yAxisArrowStartY = yAxisArrowTipY + 18;
  const waveMaxX = axisArrowStartX;
  const axisLength = axisEndX - originX;
  const waveMaxPhysicsX = waveMaxX - originX;

  const period = wavelength / speed;
  const waveFrontPhysics = speed * time;
  const waveFrontScreenX = Math.min(originX + waveFrontPhysics, waveMaxX);
  const showWaveFrontLabel = waveFrontPhysics < waveMaxPhysicsX;
  const stopTime = Math.ceil((axisLength / speed + 5 * period) / period) * period;

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
  }, [isPlaying, timeScale, stopTime]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const getY = (physicsX: number) => {
    const waveFront = speed * time;
    if (physicsX > waveFront) return midY;

    const displacement =
      amplitude *
      Math.sin((2 * Math.PI * (physicsX - speed * time)) / wavelength);

    return midY - displacement;
  };

  const xTickValues = isMobile
    ? [0, 200, 400, 600, 800, 1000]
    : [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const yTickValues = [-100, -50, 0, 50, 100];

  const wavePoints = (() => {
    const points: string[] = [];
    for (let screenX = originX; screenX <= waveMaxX; screenX += 6) {
      const physicsX = screenX - originX;
      points.push(`${screenX},${getY(physicsX)}`);
    }
    if (points.at(-1)?.split(",")[0] !== String(waveMaxX)) {
      points.push(`${waveMaxX},${getY(waveMaxX - originX)}`);
    }
    return points.join(" ");
  })();

  const particleSpacing = wavelength / 8;
  const particleCount = Math.max(
    6,
    Math.floor(waveMaxPhysicsX / particleSpacing) + 1
  );

  const particles = Array.from({ length: particleCount }, (_, i) => {
    const physicsX = i * particleSpacing;
    return {
      x: originX + physicsX,
      y: getY(physicsX),
      physicsX,
    };
  });
  const firstParticle = particles[0];
  const motionParticle =
    particles[Math.min(particles.length - 1, Math.max(1, Math.round(particles.length * 0.42)))];
  const motionBandWidth = 58;

  const showAmplitude = !isPlaying && waveFrontPhysics >= 0.75 * wavelength;
  const showWavelength = !isPlaying && waveFrontPhysics >= 1.25 * wavelength;

  const crestPhysicsX = showAmplitude
    ? (() => {
        let x = waveFrontPhysics - 0.75 * wavelength;
        while (x > waveMaxPhysicsX) x -= wavelength;
        while (x < 0) x += wavelength;
        return x;
      })()
    : 0;

  const crestScreenX = originX + crestPhysicsX;
  const crestY = getY(crestPhysicsX);
  const amplitudeLabelY = crestY - 18;

  let wavelengthStartX = 0;
  let wavelengthEndX = 0;
  const wavelengthLineY = midY + 90;
  const wavelengthLabelY = wavelengthLineY + 24;

  if (showWavelength) {
    let troughA = waveFrontPhysics - 0.25 * wavelength;
    while (troughA > waveMaxPhysicsX) troughA -= wavelength;
    while (troughA < wavelength) troughA += wavelength;
    const troughB = troughA - wavelength;
    wavelengthStartX = originX + troughB;
    wavelengthEndX = originX + troughA;
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] px-1 py-4 text-slate-900 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-none space-y-4 sm:max-w-6xl sm:space-y-6">
        <header className="pt-1 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm sm:px-7">
            물리 I · 파동의 진행
          </div>
          <p className="mx-auto mt-3 max-w-3xl px-3 text-base text-slate-600 sm:px-0">
            속도, 파장, 진폭, 시간을 바꾸며 파동 운동을 관찰해 보세요.
          </p>
        </header>

        <section className="rounded-xl bg-white p-2 shadow-lg border border-slate-200 sm:rounded-2xl sm:p-5">
          <div className="overflow-x-auto overflow-y-hidden rounded-lg bg-white sm:rounded-xl">
            <svg
              viewBox={`${viewBoxMinX} 0 ${viewBoxWidth} ${height}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-[520px] w-[1240px] max-w-none [--axis-font:20px] [--measure-font:18px] [--motion-sub-font:18px] [--motion-title-font:22px] [--x-label-font:24px] [--y-label-font:22px] sm:h-[440px] sm:w-full sm:[--axis-font:16px] sm:[--measure-font:16px] sm:[--motion-sub-font:16px] sm:[--motion-title-font:18px] sm:[--x-label-font:22px] sm:[--y-label-font:20px]"
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
                x={motionParticle.x - motionBandWidth / 2}
                y={midY - amplitude}
                width={motionBandWidth}
                height={amplitude * 2}
                rx="6"
                fill="#2563eb"
                opacity="0.1"
                stroke="#2563eb"
                strokeWidth="1"
                strokeOpacity="0.18"
              />

              {xTickValues.map((value) => (
                <g key={value}>
                  <line
                    x1={originX + value}
                    y1={midY - 6}
                    x2={originX + value}
                    y2={midY + 6}
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                  <text
                    x={originX + value}
                    y={midY + 28}
                    fontSize="var(--axis-font)"
                    fill="#475569"
                    textAnchor="middle"
                  >
                    {value}
                  </text>
                </g>
              ))}

              {yTickValues.map((value) => (
                <g key={value}>
                  {value !== 0 && (
                    <line
                      x1={originX - 6}
                      y1={midY - value}
                      x2={originX}
                      y2={midY - value}
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                  )}
                  <text
                    x={originX - 14}
                    y={midY - value + 6}
                    fontSize="var(--axis-font)"
                    fill="#475569"
                    textAnchor="end"
                  >
                    {value}
                  </text>
                </g>
              ))}

              <line
                x1={originX}
                y1={midY}
                x2={axisArrowStartX}
                y2={midY}
                stroke="#64748b"
                strokeWidth="4"
                strokeLinecap="butt"
              />
              <polygon
                points={`${axisEndX},${midY} ${axisArrowStartX},${midY - 9} ${axisArrowStartX},${midY + 9}`}
                fill="#64748b"
              />

              <line
                x1={originX}
                y1={height - 55}
                x2={originX}
                y2={yAxisArrowStartY}
                stroke="#64748b"
                strokeWidth="4"
                strokeLinecap="butt"
              />
              <polygon
                points={`${originX},${yAxisArrowTipY} ${originX - 9},${yAxisArrowStartY} ${originX + 9},${yAxisArrowStartY}`}
                fill="#64748b"
              />

              <text
                x={axisEndX + 8}
                y={midY}
                fontSize="var(--x-label-font)"
                fill="#475569"
                fontWeight="700"
                textAnchor="start"
                dominantBaseline="middle"
              >
                x (cm)
              </text>

              <text x={originX - 16} y="76" fontSize="var(--y-label-font)" fill="#475569" fontWeight="700" textAnchor="end">
                변위 y (cm)
              </text>

              <text
                x={originX - 34}
                y={midY}
                fontSize="var(--motion-sub-font)"
                fontWeight="700"
                fill="#f97316"
                textAnchor="end"
                dominantBaseline="middle"
              >
                x=0
              </text>

              <polyline
                points={wavePoints}
                fill="none"
                stroke="#ef4444"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {particles.map((particle, index) => (
                <circle key={index} cx={particle.x} cy={particle.y} r="8" fill="#111827" />
              ))}

              <circle
                cx={firstParticle.x}
                cy={firstParticle.y}
                r="9.75"
                fill="none"
                stroke="#f97316"
                strokeWidth="3.5"
              />

              {showWaveFrontLabel && (
                <>
                  <line
                    x1={waveFrontScreenX}
                    y1={midY - 90}
                    x2={waveFrontScreenX}
                    y2={midY + 90}
                    stroke="#f97316"
                    strokeWidth="4"
                    strokeDasharray="8 8"
                  />
                </>
              )}

              <text x={motionParticle.x} y="40" fontSize="var(--motion-title-font)" fontWeight="700" fill="#2563eb" textAnchor="middle">
                입자 운동
              </text>
              <text x={motionParticle.x} y="66" fontSize="var(--motion-sub-font)" fill="#2563eb" textAnchor="middle">
                위아래 진동
              </text>
              <circle
                cx={motionParticle.x}
                cy={motionParticle.y}
                r="9.75"
                fill="none"
                stroke="#2563eb"
                strokeWidth="3.5"
              />

              <line
                x1={axisEndX - 180}
                y1="80"
                x2={axisEndX - 40}
                y2="80"
                stroke="#ef4444"
                strokeWidth="4"
                markerEnd="url(#orangeArrow)"
              />
              <text x={axisEndX - 180} y="62" fontSize="var(--motion-title-font)" fontWeight="700" fill="#ef4444">
                파동 진행 방향
              </text>

              {showAmplitude && (
                <>
                  <line
                    x1={crestScreenX}
                    y1={midY}
                    x2={crestScreenX}
                    y2={crestY}
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                    markerStart="url(#purpleArrow)"
                    markerEnd="url(#purpleArrow)"
                    opacity="0.95"
                  />
                  <text
                    x={crestScreenX + 14}
                    y={amplitudeLabelY}
                    fontSize="var(--measure-font)"
                    fontWeight="700"
                    fill="#7c3aed"
                  >
                    {`진폭 A = ${amplitude} cm`}
                  </text>
                </>
              )}

              {showWavelength && (
                <>
                  <line
                    x1={wavelengthStartX}
                    y1={wavelengthLineY}
                    x2={wavelengthEndX}
                    y2={wavelengthLineY}
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    markerStart="url(#greenArrow)"
                    markerEnd="url(#greenArrow)"
                    opacity="0.95"
                  />
                  <text
                    x={(wavelengthStartX + wavelengthEndX) / 2}
                    y={wavelengthLabelY}
                    fontSize="var(--measure-font)"
                    fontWeight="700"
                    fill="#166534"
                    textAnchor="middle"
                  >
                    {`파장 λ = ${wavelength} cm`}
                  </text>
                </>
              )}
            </svg>
          </div>
          <div className="mt-3 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-3 py-3 text-slate-800 sm:mt-4 sm:items-center sm:gap-4 sm:px-4">
            <span className="rounded-md bg-blue-600 px-3 py-1 text-base font-bold text-white sm:text-sm">
              핵심
            </span>
            <p className="text-base leading-7 sm:leading-normal">
              파동은 x = 0에서 시작해 오른쪽으로 전달되지만, 각 입자는 제자리에서만 진동합니다.
            </p>
          </div>
        </section>

        <section className="grid gap-4 lg:gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-5">
              <div className="grid items-center gap-5 md:grid-cols-[auto_auto] md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 sm:text-lg">재생 및 시간 설정</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:flex">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="rounded-lg bg-blue-600 px-5 py-3 text-base font-bold text-white shadow-md transition hover:bg-blue-700 sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      ▶ 재생
                    </button>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="rounded-lg border border-slate-300 bg-slate-50 px-5 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:py-2.5 sm:text-sm"
                    >
                      ❚❚ 일시정지
                    </button>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-base font-bold text-slate-800 sm:text-sm">재생 속도</p>
                  <div className="grid grid-cols-4 gap-2 sm:flex">
                    {[0.25, 0.5, 1, 2].map((value) => (
                      <button
                        key={value}
                        onClick={() => setTimeScale(value)}
                        className={`rounded-lg px-3 py-3 text-base font-semibold transition border sm:py-2 sm:text-sm ${
                          timeScale === value
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-700 border-slate-300"
                        }`}
                      >
                        {value}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-lg">
                  <span>시간 t =</span>
                  <span className="text-blue-600">{time.toFixed(2)} s</span>
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4">
                  <span className="text-base text-slate-700 sm:text-sm">0 s</span>
                  <input
                    type="range"
                    min="0"
                    max={stopTime}
                    step="0.01"
                    value={time}
                    onChange={(e) => {
                      setIsPlaying(false);
                      setTime(Number(e.target.value));
                    }}
                    className="w-full accent-blue-600"
                  />
                  <span className="text-base text-slate-700 sm:text-sm">{Math.round(stopTime)} s</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-lg sm:p-5">
              <div className="grid items-center gap-5 md:grid-cols-[60px_minmax(0,1fr)_150px] md:gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-300 text-3xl text-white shadow-md">
                  ∿
                </div>
                <div className="min-w-0">
                  <p className="text-center text-lg font-semibold text-emerald-700 sm:text-base">파동의 기본 관계식</p>
                  <div className="mt-3 flex items-end justify-center gap-4 whitespace-nowrap text-2xl font-serif text-slate-900 sm:gap-5">
                    <span>v = λ / T</span>
                    <span>f = 1 / T</span>
                  </div>
                  <div className="mt-1 flex justify-center gap-5 whitespace-nowrap text-sm text-slate-600 sm:gap-8 sm:text-xs">
                    <span>(속도)</span>
                    <span>(파장)</span>
                    <span>(주기)</span>
                    <span>(진동수)</span>
                  </div>
                </div>
                <div className="rounded-xl bg-white/70 px-4 py-3 text-base leading-7 text-slate-700 md:ml-2 md:text-sm md:leading-6">
                  <p>v : 속도 (cm/s)</p>
                  <p>λ : 파장 (cm)</p>
                  <p>T : 주기 (s)</p>
                  <p>f : 진동수 (Hz)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-lg sm:p-5">
            <h3 className="text-xl font-bold text-slate-900 sm:text-lg">파동 매개변수</h3>
            <div className="mt-5 grid gap-4">
              <div className="grid items-center gap-5 md:grid-cols-[minmax(260px,1fr)_300px]">
                <div className="grid gap-3">
                  <p className="text-xl font-bold text-slate-900 sm:text-lg">
                    속도 v = <span className="text-blue-600">{speed} cm/s</span>
                  </p>
                  <div className="grid grid-cols-[42px_1fr_42px] items-center gap-3">
                    <span className="text-base text-slate-600 sm:text-sm">40</span>
                    <input
                      type="range"
                      min="40"
                      max="240"
                      step="10"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-base text-slate-600 sm:text-sm">240</span>
                  </div>
                </div>
                <p className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-base text-slate-700 md:whitespace-nowrap md:text-sm">
                  파동의 맨 앞이 1초 동안 이동하는 거리
                </p>
              </div>

              <div className="grid items-center gap-5 md:grid-cols-[minmax(260px,1fr)_300px]">
                <div className="grid gap-3">
                  <p className="text-xl font-bold text-slate-900 sm:text-lg">
                    파장 λ = <span className="text-blue-600">{wavelength} cm</span>
                  </p>
                  <div className="grid grid-cols-[42px_1fr_42px] items-center gap-3">
                    <span className="text-base text-slate-600 sm:text-sm">160</span>
                    <input
                      type="range"
                      min="160"
                      max="520"
                      step="10"
                      value={wavelength}
                      onChange={(e) => setWavelength(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-base text-slate-600 sm:text-sm">520</span>
                  </div>
                </div>
                <p className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-base text-slate-700 md:whitespace-nowrap md:text-sm">
                  같은 위상(모양)을 가진 두 점 사이의 거리
                </p>
              </div>

              <div className="grid items-center gap-5 md:grid-cols-[minmax(260px,1fr)_300px]">
                <div className="grid gap-3">
                  <p className="text-xl font-bold text-slate-900 sm:text-lg">
                    진폭 A = <span className="text-blue-600">{amplitude} cm</span>
                  </p>
                  <div className="grid grid-cols-[42px_1fr_42px] items-center gap-3">
                    <span className="text-base text-slate-600 sm:text-sm">20</span>
                    <input
                      type="range"
                      min="20"
                      max="110"
                      step="5"
                      value={amplitude}
                      onChange={(e) => setAmplitude(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                    <span className="text-base text-slate-600 sm:text-sm">110</span>
                  </div>
                </div>
                <p className="rounded-lg border border-violet-100 bg-violet-50 px-4 py-3 text-base text-slate-700 md:whitespace-nowrap md:text-sm">
                  평형 위치(0)에서 최대 변위까지의 거리
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 sm:px-5">
              <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                주기 T = λ / v = <span className="text-red-600">{period.toFixed(2)} s</span>
              </p>
              <p className="text-base text-slate-600 sm:text-sm">한 번 진동(한 주기)을 하는 데 걸리는 시간</p>
            </div>
          </div>
        </section>
      </div>
      <div className="fixed bottom-2 right-2 z-50 rounded-md bg-slate-900/5 px-2 py-1 text-[11px] font-medium text-slate-500 backdrop-blur-sm sm:bottom-3 sm:right-3 sm:text-xs">
        Version: {VERSION}
      </div>
    </div>
  );
}
