"use client";

import { useEffect, useMemo, useState } from "react";
import { superpositionViewConfig } from "./waveSuperpositionConfig";

export function useWaveSuperposition() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [frequency, setFrequency] = useState(0.6);
  const [wavelength, setWavelength] = useState(2);
  const [amplitudeA, setAmplitudeA] = useState(2);
  const [amplitudeB, setAmplitudeB] = useState(2);
  const [phaseDifference, setPhaseDifference] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const {
    width,
    height,
    viewBoxMinX,
    graphRightPadding,
    originX,
    midY,
    xScale,
    yScale,
    yAxisArrowTipY,
  } = superpositionViewConfig;

  const axisEndX = originX + 960;
  const axisArrowStartX = axisEndX - 18;
  const yAxisArrowStartY = yAxisArrowTipY + 18;
  const viewBoxWidth = width - viewBoxMinX + graphRightPadding;
  const graphMaxX = axisArrowStartX;
  const period = 1 / frequency;
  const speed = frequency * wavelength;
  const stopTime = Math.ceil((8 / speed + 3 * period) / period) * period;
  const phaseRadians = (phaseDifference * Math.PI) / 180;

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
  }, [isPlaying, stopTime, timeScale]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const getWaveA = (x: number, targetTime: number) =>
    amplitudeA *
    Math.sin(2 * Math.PI * (x / wavelength - frequency * targetTime));

  const getWaveB = (x: number, targetTime: number) =>
    amplitudeB *
    Math.sin(
      2 * Math.PI * (x / wavelength - frequency * targetTime) +
        phaseRadians
    );

  const getResult = (x: number, targetTime: number) =>
    getWaveA(x, targetTime) + getWaveB(x, targetTime);

  const computed = useMemo(() => {
    const xTickValues = isMobile
      ? [0, 1, 2, 3, 4, 5, 6].map((value) => value * xScale)
      : [0, 1, 2, 3, 4, 5, 6].map((value) => value * xScale);
    const yTickValues = [-6, -3, 0, 3, 6].map((value) => value * yScale);

    const pointsFor = (fn: (x: number, targetTime: number) => number) => {
      const points: string[] = [];
      for (let screenX = originX; screenX <= graphMaxX; screenX += 5) {
        const x = (screenX - originX) / xScale;
        const y = midY - fn(x, time) * yScale;
        points.push(`${screenX},${y}`);
      }
      return points.join(" ");
    };

    return {
      xTickValues,
      yTickValues,
      waveAPoints: pointsFor(getWaveA),
      waveBPoints: pointsFor(getWaveB),
      resultPoints: pointsFor(getResult),
    };
  }, [
    amplitudeA,
    amplitudeB,
    frequency,
    graphMaxX,
    isMobile,
    midY,
    originX,
    phaseRadians,
    time,
    wavelength,
    xScale,
    yScale,
  ]);

  return {
    state: {
      time,
      isPlaying,
      timeScale,
      frequency,
      wavelength,
      amplitudeA,
      amplitudeB,
      phaseDifference,
    },
    actions: {
      setTime,
      setIsPlaying,
      setTimeScale,
      setFrequency,
      setWavelength,
      setAmplitudeA,
      setAmplitudeB,
      setPhaseDifference,
    },
    metrics: {
      period,
      speed,
      stopTime,
      xScale,
      yScale,
    },
    layout: {
      width,
      height,
      viewBoxMinX,
      viewBoxWidth,
      originX,
      midY,
      axisEndX,
      axisArrowStartX,
      yAxisArrowTipY,
      yAxisArrowStartY,
      graphMaxX,
    },
    computed,
  };
}

export type WaveSuperpositionModel = ReturnType<typeof useWaveSuperposition>;
