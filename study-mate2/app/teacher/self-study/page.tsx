import { PageHeader } from "@/components/app-shell/PageHeader";
import { TeacherAppShell } from "@/components/app-shell/TeacherAppShell";

export default function TeacherSelfStudyPage() {
  return (
    <TeacherAppShell>
      <PageHeader
        eyebrow="선생님"
        title="자습관리"
        description="기존 study-mate의 자습관리 기능이 들어올 자리입니다."
      />
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        자습 기록 검토, 피드백, 출결 관리를 이 영역에 연결합니다.
      </div>
    </TeacherAppShell>
  );
}
