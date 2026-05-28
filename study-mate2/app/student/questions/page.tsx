import { PageHeader } from "@/components/app-shell/PageHeader";
import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { ConceptBreadcrumb } from "@/components/concept-learning/ConceptBreadcrumb";
import { learningRoutes } from "@/lib/learning/routes";

export default function StudentQuestionsPage() {
  return (
    <StudentAppShell>
      <ConceptBreadcrumb
        items={[
          { label: "학생 홈", href: learningRoutes.studentHome },
          { label: "질문관리" },
        ]}
      />
      <PageHeader
        eyebrow="학생"
        title="질문관리"
        description="현재 단계에서는 라우트 뼈대만 유지합니다. 실제 개발 우선순위는 개념학습과 시뮬레이션 학습 기능입니다."
      />
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-base leading-7 text-slate-600 shadow-sm">
        질문관리 기능은 기존 study-mate 기능 이식 단계에서 연결합니다.
      </div>
    </StudentAppShell>
  );
}
