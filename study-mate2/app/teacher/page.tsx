import Link from "next/link";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { TeacherAppShell } from "@/components/app-shell/TeacherAppShell";
import { learningRoutes } from "@/lib/learning/routes";

const menuItems = [
  { title: "학생관리", href: learningRoutes.teacherStudents },
  { title: "질문관리", href: learningRoutes.teacherQuestions },
  { title: "자습관리", href: learningRoutes.teacherSelfStudy },
];

export default function TeacherPage() {
  return (
    <TeacherAppShell>
      <PageHeader
        eyebrow="선생님 홈"
        title="관리 기능"
        description="기존 study-mate의 선생님 관리 기능과 개념학습 라우팅을 분리합니다."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-slate-200 bg-white p-5 text-lg font-black text-slate-950 shadow-sm transition hover:border-slate-400 hover:shadow-md"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </TeacherAppShell>
  );
}
