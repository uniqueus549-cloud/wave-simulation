import { PageHeader } from "@/components/app-shell/PageHeader";
import { TeacherAppShell } from "@/components/app-shell/TeacherAppShell";

export default function TeacherQuestionsPage() {
  return (
    <TeacherAppShell>
      <PageHeader
        eyebrow="선생님"
        title="질문관리"
        description="기존 study-mate의 질문관리 기능이 들어올 자리입니다."
      />
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        질문 답변, 상태 변경, 학생별 필터를 이 영역에 연결합니다.
      </div>
    </TeacherAppShell>
  );
}
