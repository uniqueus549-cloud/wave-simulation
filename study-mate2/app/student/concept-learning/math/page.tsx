import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { LearningPageLayout } from "@/components/concept-learning/LearningPageLayout";
import { learningRoutes } from "@/lib/learning/routes";

export default function MathPage() {
  return (
    <StudentAppShell>
      <LearningPageLayout
        breadcrumbs={[
          { label: "학생 홈", href: learningRoutes.studentHome },
          { label: "개념학습", href: learningRoutes.conceptLearning },
          { label: "수학" },
        ]}
        title="수학"
        description="수학 개념학습 시뮬레이션을 추가할 수 있는 확장 자리입니다."
      >
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm font-semibold text-slate-500">
          아직 등록된 단원이 없습니다.
        </div>
      </LearningPageLayout>
    </StudentAppShell>
  );
}
