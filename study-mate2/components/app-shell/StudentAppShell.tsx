import Link from "next/link";
import { MobileBottomNav } from "./MobileBottomNav";
import { learningRoutes } from "@/lib/learning/routes";

const navItems = [
  { label: "학생 홈", href: learningRoutes.studentHome },
  { label: "개념학습", href: learningRoutes.conceptLearning },
  { label: "질문관리", href: learningRoutes.studentQuestions },
  { label: "자습관리", href: learningRoutes.studentSelfStudy },
];

export function StudentAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f8fb] pb-24 md:pb-0">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href={learningRoutes.studentHome}
            className="text-lg font-black text-slate-950"
          >
            Study Mate 2
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
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
      <MobileBottomNav />
    </div>
  );
}
