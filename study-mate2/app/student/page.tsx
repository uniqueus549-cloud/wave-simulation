import Link from "next/link";
import { PageHeader } from "@/components/app-shell/PageHeader";
import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { ConceptBreadcrumb } from "@/components/concept-learning/ConceptBreadcrumb";
import { learningRoutes } from "@/lib/learning/routes";

const supportMenuItems = [
  {
    title: "질문관리",
    description: "기존 study-mate 기능 이식 단계에서 연결할 예정입니다.",
    href: learningRoutes.studentQuestions,
    accent: "bg-sky-50 text-sky-700",
    action: "준비 중",
  },
  {
    title: "자습관리",
    description: "자습 기록과 관리 기능은 추후 단계에서 다듬습니다.",
    href: learningRoutes.studentSelfStudy,
    accent: "bg-emerald-50 text-emerald-700",
    action: "준비 중",
  },
];

export default function StudentPage() {
  return (
    <StudentAppShell>
      <ConceptBreadcrumb items={[{ label: "학생 홈" }]} />
      <PageHeader
        eyebrow="학생 홈"
        title="개념을 직접 움직이며 배워요"
        description="Study Mate 2의 첫 개발 범위는 개념학습과 인터랙티브 시뮬레이션입니다. 지금은 물리학 I의 파동과 정보 통신 단원에서 파동의 진행을 완성도 있게 다듬습니다."
      />

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <Link
          href={learningRoutes.conceptLearning}
          className="flex min-h-72 flex-col justify-between rounded-lg border border-blue-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md sm:p-7"
        >
          <div>
            <span className="rounded-md bg-blue-600 px-3 py-1 text-xs font-black text-white">
              우선 개발
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              개념학습
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              과목과 단원을 선택하고, 시뮬레이션으로 현상을 관찰합니다. 현재는 물리학 I의 파동과 정보 통신 단원에서 파동의 진행 도구에 집중합니다.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-blue-50 px-4 py-3">
              <p className="text-xs font-black text-blue-700">현재 과목</p>
              <p className="mt-1 text-base font-black text-slate-950">물리학 I</p>
            </div>
            <div className="rounded-md bg-emerald-50 px-4 py-3">
              <p className="text-xs font-black text-emerald-700">우선 단원</p>
              <p className="mt-1 text-base font-black text-slate-950">파동과 정보 통신</p>
            </div>
            <div className="rounded-md bg-amber-50 px-4 py-3">
              <p className="text-xs font-black text-amber-700">첫 시뮬레이션</p>
              <p className="mt-1 text-base font-black text-slate-950">파동의 진행</p>
            </div>
          </div>
          <p className="mt-6 w-fit rounded-md bg-slate-950 px-5 py-3 text-base font-black text-white">
            개념학습 시작
          </p>
        </Link>

        <div className="grid gap-4">
          <Link
            href={learningRoutes.wavePropagation}
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <p className="text-sm font-black text-blue-600">바로가기</p>
            <h3 className="mt-3 text-2xl font-black text-slate-950">
              파동의 진행
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600 sm:text-sm sm:leading-6">
              속도, 파장, 진폭을 조절하며 파동이 전달되는 모습을 바로 확인합니다.
            </p>
            <p className="mt-5 text-sm font-black text-blue-700">시뮬레이션 열기</p>
          </Link>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black text-slate-500">개발 방향</p>
            <p className="mt-3 text-sm font-bold leading-6 text-slate-600">
              많은 도구보다 하나의 시뮬레이션을 수업에서 바로 쓸 수 있게 다듬습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-black text-slate-950">보조 메뉴</h2>
          <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
            기존 기능 이식 예정
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {supportMenuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-36 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 opacity-85 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div>
              <span className={`rounded-md px-3 py-1 text-xs font-black ${item.accent}`}>
                보조 메뉴
              </span>
              <h3 className="mt-4 text-xl font-black text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600 sm:text-sm sm:leading-6">
                {item.description}
              </p>
            </div>
            <p className="mt-5 text-sm font-black text-slate-500">{item.action}</p>
          </Link>
          ))}
        </div>
      </section>
    </StudentAppShell>
  );
}
