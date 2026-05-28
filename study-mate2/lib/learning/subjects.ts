import { physics1Units } from "./physics1";
import { learningRoutes } from "./routes";

export type Subject = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: "ready" | "coming-soon";
};

export const subjects: Subject[] = [
  {
    id: "physics-1",
    title: "물리학 I",
    description: `${physics1Units.length}개 단원으로 개념을 실험합니다.`,
    href: learningRoutes.physics1,
    status: "ready",
  },
  {
    id: "math",
    title: "수학",
    description: "함수, 그래프, 기하 시뮬레이션을 확장할 예정입니다.",
    href: learningRoutes.math,
    status: "coming-soon",
  },
];
