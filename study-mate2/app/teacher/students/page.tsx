import { PageHeader } from "@/components/app-shell/PageHeader";
import { TeacherAppShell } from "@/components/app-shell/TeacherAppShell";

export default function TeacherStudentsPage() {
  return (
    <TeacherAppShell>
      <PageHeader
        eyebrow="선생님"
        title="학생관리"
        description="기존 study-mate의 학생관리 기능이 들어올 자리입니다."
      />
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        학생 목록, 상세 관리, 학습 현황을 이 영역에 연결합니다.
      </div>
    </TeacherAppShell>
  );
}
