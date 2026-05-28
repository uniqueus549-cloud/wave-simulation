import Link from "next/link";
import { learningRoutes } from "@/lib/learning/routes";

const navItems = [
  { label: "선생님 홈", href: learningRoutes.teacherHome },
  { label: "학생관리", href: learningRoutes.teacherStudents },
  { label: "질문관리", href: learningRoutes.teacherQuestions },
  { label: "자습관리", href: learningRoutes.teacherSelfStudy },
];

export function TeacherAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <Link href={learningRoutes.teacherHome} className="font-black text-slate-950">
            Study Mate 2 Teacher
          </Link>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        {children}
      </main>
    </div>
  );
}
