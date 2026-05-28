import { learningRoutes } from "./routes";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  href: string;
  type: "simulation" | "lesson" | "coming-soon";
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  href: string;
  lessons: Lesson[];
};

export const physics1Units: Unit[] = [
  {
    id: "mechanics",
    title: "역학과 에너지",
    description: "힘, 운동, 에너지 시뮬레이션을 추가할 수 있습니다.",
    href: "#",
    lessons: [],
  },
  {
    id: "electromagnetism",
    title: "물질과 전자기장",
    description: "물질의 전기적 성질과 전자기장 시뮬레이션을 추가할 수 있습니다.",
    href: "#",
    lessons: [],
  },
  {
    id: "waves",
    title: "파동과 정보 통신",
    description: "현재는 파동의 진행 시뮬레이션을 집중 개발합니다.",
    href: learningRoutes.physics1Waves,
    lessons: [
      {
        id: "wave-propagation",
        title: "파동의 진행",
        description: "파형 이동과 입자 진동 관찰",
        href: learningRoutes.wavePropagation,
        type: "simulation",
      },
      {
        id: "wave-superposition",
        title: "파동의 중첩",
        description: "두 펄스가 만나고 지나가는 과정 관찰",
        href: learningRoutes.waveSuperposition,
        type: "simulation",
      },
      {
        id: "wave-interference-1",
        title: "파동의 간섭 1",
        description: "두 사인파의 합성 변위 관찰",
        href: learningRoutes.waveInterference1,
        type: "simulation",
      },
    ],
  },
];
