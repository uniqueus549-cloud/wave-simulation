import Link from "next/link";
import type { Lesson } from "@/lib/learning/physics1";

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  if (lessons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-base font-semibold text-slate-500">
        아직 등록된 시뮬레이션이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {lessons.map((lesson, index) => {
        const isReady = lesson.href !== "#" && lesson.type !== "coming-soon";

        const card = (
          <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-lg text-base font-black ${
                isReady
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {index + 1}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-slate-500">
                시뮬레이션
              </p>
              <h3 className="mt-1 text-2xl font-black text-slate-950">
                {lesson.title}
              </h3>
              <p className="mt-2 text-base leading-7 text-slate-600">
                {lesson.description}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <span
                className={`w-fit rounded-md px-3 py-2 text-xs font-bold ${
                  isReady
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {isReady ? "사용 가능" : "준비 중"}
              </span>
              <span
                className={`w-fit rounded-md px-3 py-2 text-xs font-black ${
                  isReady
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-400 ring-1 ring-slate-200"
                }`}
              >
                {isReady ? "열기" : "준비 중"}
              </span>
            </div>
          </div>
        );

        return isReady ? (
          <Link
            key={lesson.id}
            href={lesson.href}
            className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md sm:p-6"
          >
            {card}
          </Link>
        ) : (
          <div
            key={lesson.id}
            className="rounded-lg border border-slate-200 bg-white p-5 opacity-80 shadow-sm sm:p-6"
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
