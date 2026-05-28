"use client";

import { useEffect, useMemo, useState } from "react";
import { waveViewConfig } from "./wavePropagationConfig";

export type WaveParticle = {
  x: number;
  y: number;
  physicsX: number;
};

export function useWavePropagation() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [frequency, setFrequency] = useState(0.4);
  const [wavelength, setWavelength] = useState(1.8);
  const [amplitude, setAmplitude] = useState(5);
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
  } = waveViewConfig;

  const axisEndX = originX + 1040;
  const axisArrowStartX = axisEndX - 18;
  const yAxisArrowStartY = yAxisArrowTipY + 18;
  const waveMaxX = axisArrowStartX;
  const axisLength = axisEndX - originX;
  const waveMaxPhysicsX = waveMaxX - originX;
  const viewBoxWidth = width - viewBoxMinX + graphRightPadding;
  const speed = frequency * wavelength;
  const graphWavelength = wavelength * xScale;
  const graphAmplitude = amplitude * yScale;
  const graphSpeed = speed * xScale;
  const period = 1 / frequency;
  const waveFrontPhysics = graphSpeed * time;
  const selectedParticleX = wavelength * 1.5;
  const selectedParticleGraphX = selectedParticleX * xScale;
  const waveFrontScreenX = Math.min(originX + waveFrontPhysics, waveMaxX);
  const showWaveFrontLabel = waveFrontPhysics < waveMaxPhysicsX;
  const stopTime =
    Math.ceil((axisLength / graphSpeed + 5 * period) / period) * period;

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

  const getDisplacementAt = (x: number, targetTime: number) => {
    const waveFront = speed * targetTime;
    if (x > waveFront) return 0;

    return (
      amplitude *
      Math.sin(2 * Math.PI * (x / wavelength - frequency * targetTime))
    );
  };

  const getY = (physicsX: number) => {
    const x = physicsX / xScale;
    const waveFront = graphSpeed * time;
    if (physicsX > waveFront) return midY;

    const displacement = getDisplacementAt(x, time) * yScale;

    return midY - displacement;
  };

  const computed = useMemo(() => {
    const xTickValues = isMobile
      ? [0, 1, 2, 3, 4, 5, 6].map((value) => value * xScale)
      : [0, 1, 2, 3, 4, 5, 6].map((value) => value * xScale);
    const yTickValues = [-5, -2.5, 0, 2.5, 5].map(
      (value) => value * yScale
    );

    const wavePointsArray: string[] = [];
    for (let screenX = originX; screenX <= waveMaxX; screenX += 6) {
      const physicsX = screenX - originX;
      wavePointsArray.push(`${screenX},${getY(physicsX)}`);
    }
    if (wavePointsArray.at(-1)?.split(",")[0] !== String(waveMaxX)) {
      wavePointsArray.push(`${waveMaxX},${getY(waveMaxX - originX)}`);
    }

    const particleSpacing = graphWavelength / 8;
    const particleCount = Math.max(
      6,
      Math.floor(waveMaxPhysicsX / particleSpacing) + 1
    );

    const particles: WaveParticle[] = Array.from(
      { length: particleCount },
      (_, index) => {
        const physicsX = index * particleSpacing;
        return {
          x: originX + physicsX,
          y: getY(physicsX),
          physicsX,
        };
      }
    );

    const firstParticle = particles[0];
    const motionParticlePhysicsX =
      Math.round(selectedParticleGraphX / particleSpacing) * particleSpacing;
    const motionParticle = {
      x: originX + motionParticlePhysicsX,
      y: getY(motionParticlePhysicsX),
      physicsX: motionParticlePhysicsX,
    };
    const selectedParticleX = motionParticle.physicsX / xScale;

    const showAmplitude =
      !isPlaying && waveFrontPhysics >= 0.75 * graphWavelength;
    const showWavelength =
      !isPlaying && waveFrontPhysics >= 1.25 * graphWavelength;

    const crestPhysicsX = showAmplitude
      ? (() => {
          let x = waveFrontPhysics - 0.75 * graphWavelength;
          while (x > waveMaxPhysicsX) x -= graphWavelength;
          while (x < 0) x += graphWavelength;
          return x;
        })()
      : 0;

    const crestScreenX = originX + crestPhysicsX;
    const crestY = getY(crestPhysicsX);

    let wavelengthStartX = 0;
    let wavelengthEndX = 0;
    const wavelengthLineY = midY + Math.max(130, graphAmplitude + 42);

    if (showWavelength) {
      let troughA = waveFrontPhysics - 0.25 * graphWavelength;
      while (troughA > waveMaxPhysicsX) troughA -= graphWavelength;
      while (troughA < graphWavelength) troughA += graphWavelength;
      const troughB = troughA - graphWavelength;
      wavelengthStartX = originX + troughB;
      wavelengthEndX = originX + troughA;
    }

    return {
      xTickValues,
      yTickValues,
      wavePoints: wavePointsArray.join(" "),
      particles,
      firstParticle,
      motionParticle,
      selectedParticleX,
      motionBandWidth: 58,
      showAmplitude,
      showWavelength,
      crestScreenX,
      crestY,
      amplitudeLabelY: crestY - 18,
      wavelengthStartX,
      wavelengthEndX,
      wavelengthLineY,
      wavelengthLabelY: wavelengthLineY + 24,
    };
  }, [
    amplitude,
    isMobile,
    isPlaying,
    midY,
    originX,
    selectedParticleGraphX,
    speed,
    graphSpeed,
    graphWavelength,
    time,
    waveFrontPhysics,
    waveMaxPhysicsX,
    waveMaxX,
    wavelength,
  ]);

  return {
    state: {
      time,
      isPlaying,
      timeScale,
      frequency,
      speed,
      wavelength,
      amplitude,
    },
    actions: {
      setTime,
      setIsPlaying,
      setTimeScale,
      setFrequency,
      setWavelength,
      setAmplitude,
    },
    metrics: {
      period,
      stopTime,
      waveFrontPhysics,
      waveFrontScreenX,
      showWaveFrontLabel,
      xScale,
      yScale,
      graphWavelength,
      graphAmplitude,
      graphSpeed,
      selectedParticleX: computed.selectedParticleX,
      getDisplacementAt,
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
      waveMaxX,
    },
    computed,
  };
}

export type WavePropagationModel = ReturnType<typeof useWavePropagation>;
