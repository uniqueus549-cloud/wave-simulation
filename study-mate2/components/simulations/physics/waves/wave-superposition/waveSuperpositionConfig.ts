export const WAVE_SUPERPOSITION_VERSION = "v0.1.0-study-mate2";

export const superpositionViewConfig = {
  width: 1100,
  height: 420,
  viewBoxMinX: -80,
  graphRightPadding: 140,
  originX: 80,
  midY: 210,
  xScale: 160,
  yScale: 24,
  yAxisArrowTipY: 72,
} as const;

export const superpositionParameterRanges = {
  frequency: { min: 0.2, max: 5, step: 0.1 },
  wavelength: { min: 0.5, max: 3, step: 0.1 },
  amplitudeA: { min: 0.1, max: 3, step: 0.1 },
  amplitudeB: { min: 0.1, max: 3, step: 0.1 },
  phaseDifference: { min: 0, max: 180, step: 15 },
} as const;
