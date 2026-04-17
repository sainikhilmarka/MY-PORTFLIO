export type CameraVector = [number, number, number];

export type CameraPose = {
  position: CameraVector;
  target: CameraVector;
};

const cameraTimeline: Array<{ stop: number; pose: CameraPose }> = [
  {
    stop: 0,
    pose: {
      position: [0, 0, 6.8],
      target: [0, 0, 0],
    },
  },
  {
    stop: 0.34,
    pose: {
      position: [1.2, 0.55, 6.1],
      target: [0.18, -0.05, 0],
    },
  },
  {
    stop: 0.68,
    pose: {
      position: [-1.15, -0.25, 5.7],
      target: [-0.18, 0.06, 0],
    },
  },
  {
    stop: 1,
    pose: {
      position: [0.35, 0.15, 5.2],
      target: [0, 0, 0],
    },
  },
];

function mixValue(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

function mixVector(
  start: CameraVector,
  end: CameraVector,
  factor: number
): CameraVector {
  return [
    mixValue(start[0], end[0], factor),
    mixValue(start[1], end[1], factor),
    mixValue(start[2], end[2], factor),
  ];
}

export function getCameraPose(progress: number): CameraPose {
  const safeProgress = Math.min(Math.max(progress, 0), 1);

  for (let index = 0; index < cameraTimeline.length - 1; index += 1) {
    const current = cameraTimeline[index];
    const next = cameraTimeline[index + 1];

    if (safeProgress >= current.stop && safeProgress <= next.stop) {
      const span = next.stop - current.stop || 1;
      const factor = (safeProgress - current.stop) / span;

      return {
        position: mixVector(current.pose.position, next.pose.position, factor),
        target: mixVector(current.pose.target, next.pose.target, factor),
      };
    }
  }

  return cameraTimeline[cameraTimeline.length - 1].pose;
}
