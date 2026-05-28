import Link from "next/link";
import { learningRoutes } from "@/lib/learning/routes";

const navItems = [
  { label: "홈", href: learningRoutes.studentHome },
  { label: "개념", href: learningRoutes.conceptLearning },
  { label: "질문", href: learningRoutes.studentQuestions },
  { label: "자습", href: learningRoutes.studentSelfStudy },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-2 py-3 text-center text-sm font-bold text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
