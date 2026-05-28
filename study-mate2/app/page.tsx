import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center">
        <p className="text-sm font-bold text-blue-600">Study Mate 2</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          학습 관리와 개념 시뮬레이션을 한 곳에서
        </h1>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/student"
            className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm transition hover:border-blue-400 hover:shadow-md"
          >
            <p className="text-lg font-bold text-slate-950">학생 홈</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              질문, 자습, 개념학습으로 이동합니다.
            </p>
          </Link>
          <Link
            href="/teacher"
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-400 hover:shadow-md"
          >
            <p className="text-lg font-bold text-slate-950">선생님 홈</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              학생관리, 질문관리, 자습관리를 확인합니다.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
