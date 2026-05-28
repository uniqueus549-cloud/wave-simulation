import { ConceptBreadcrumb } from "@/components/concept-learning/ConceptBreadcrumb";

type SimulationFrameProps = {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SimulationFrame({
  breadcrumbs,
  title,
  description,
  children,
}: SimulationFrameProps) {
  return (
    <section>
      <ConceptBreadcrumb items={breadcrumbs} />
      <header className="mb-5">
        <p className="text-sm font-bold text-blue-600">인터랙티브 시뮬레이션</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
            {description}
          </p>
        ) : null}
      </header>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}
