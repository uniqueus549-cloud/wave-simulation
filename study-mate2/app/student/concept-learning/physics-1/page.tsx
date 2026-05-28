import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { LearningPageLayout } from "@/components/concept-learning/LearningPageLayout";
import { UnitGrid } from "@/components/concept-learning/UnitGrid";
import { physics1Units } from "@/lib/learning/physics1";
import { learningRoutes } from "@/lib/learning/routes";

export default function Physics1Page() {
  return (
    <StudentAppShell>
      <LearningPageLayout
        breadcrumbs={[
          { label: "학생 홈", href: learningRoutes.studentHome },
          { label: "개념학습", href: learningRoutes.conceptLearning },
          { label: "물리학 I" },
        ]}
        title="물리학 I"
        description="교육과정 단원별로 수업 보조용 시뮬레이션을 연결합니다."
      >
        <UnitGrid units={physics1Units} />
      </LearningPageLayout>
    </StudentAppShell>
  );
}
