import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { LearningPageLayout } from "@/components/concept-learning/LearningPageLayout";
import { SubjectGrid } from "@/components/concept-learning/SubjectGrid";
import { subjects } from "@/lib/learning/subjects";
import { learningRoutes } from "@/lib/learning/routes";

export default function ConceptLearningPage() {
  return (
    <StudentAppShell>
      <LearningPageLayout
        breadcrumbs={[
          { label: "학생 홈", href: learningRoutes.studentHome },
          { label: "개념학습" },
        ]}
        title="과목 선택"
        description="탐구할 과목을 선택하세요. 과목과 단원은 데이터 구조로 확장할 수 있습니다."
      >
        <SubjectGrid subjects={subjects} />
      </LearningPageLayout>
    </StudentAppShell>
  );
}
