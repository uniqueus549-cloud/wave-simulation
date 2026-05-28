import Link from "next/link";
import type { Subject } from "@/lib/learning/subjects";

export function SubjectGrid({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((subject) => (
        <Link
          key={subject.id}
          href={subject.href}
          className="flex min-h-40 flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
        >
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-black text-slate-950">{subject.title}</h2>
              <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                {subject.status === "ready" ? "시작 가능" : "확장 예정"}
              </span>
            </div>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-sm sm:leading-6">
              {subject.description}
            </p>
          </div>
          <p className="mt-5 text-sm font-black text-blue-700">
            {subject.status === "ready" ? "과목으로 이동" : "구조 확인"}
          </p>
        </Link>
      ))}
    </div>
  );
}
