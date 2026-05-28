import Link from "next/link";
import type { Unit } from "@/lib/learning/physics1";

export function UnitGrid({ units }: { units: Unit[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {units.map((unit) => {
        const isReady = unit.href !== "#";

        const card = (
          <div className="flex h-full min-h-40 flex-col justify-between rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-black text-slate-950">{unit.title}</h2>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                  {unit.lessons.length}개 시뮬레이션
                </span>
              </div>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-sm sm:leading-6">
                {unit.description}
              </p>
            </div>
            <p className={`mt-5 text-sm font-black ${isReady ? "text-blue-700" : "text-slate-400"}`}>
              {isReady ? "시뮬레이션 보기" : "준비 중"}
            </p>
          </div>
        );

        return isReady ? (
          <Link key={unit.id} href={unit.href} className="block">
            {card}
          </Link>
        ) : (
          <div key={unit.id} className="opacity-70">
            {card}
          </div>
        );
      })}
    </div>
  );
}
