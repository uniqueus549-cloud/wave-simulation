import { StudentAppShell } from "@/components/app-shell/StudentAppShell";
import { LearningPageLayout } from "@/components/concept-learning/LearningPageLayout";
import { LessonList } from "@/components/concept-learning/LessonList";
import { physics1Units } from "@/lib/learning/physics1";
import { learningRoutes } from "@/lib/learning/routes";

const wavesUnit = physics1Units.find((unit) => unit.id === "waves");

export default function WavesPage() {
  return (
    <StudentAppShell>
      <LearningPageLayout
        breadcrumbs={[
          { label: "학생 홈", href: learningRoutes.studentHome },
          { label: "개념학습", href: learningRoutes.conceptLearning },
          { label: "물리학 I", href: learningRoutes.physics1 },
          { label: "파동과 정보 통신" },
        ]}
        title="파동과 정보 통신"
        description="현재 사용할 수 있는 파동 시뮬레이션입니다."
      >
        <div className="grid gap-5">
          <section className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-black text-blue-600">현재 개발 중</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
              파동의 진행 하나를 완성도 있게 다듬습니다
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              많은 도구를 나열하기보다, 수업 중 바로 설명할 수 있는 하나의 애니메이션과 조작 경험에 집중합니다.
            </p>
          </section>

          <section>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-black text-slate-500">사용 가능</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">
                  현재 사용할 수 있는 시뮬레이션
                </h2>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                파형 이동과 입자 진동을 관찰합니다.
              </p>
            </div>
            <LessonList lessons={wavesUnit?.lessons ?? []} />
          </section>
        </div>
      </LearningPageLayout>
    </StudentAppShell>
  );
}
