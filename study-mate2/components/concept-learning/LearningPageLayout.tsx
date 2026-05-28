import { ConceptBreadcrumb } from "./ConceptBreadcrumb";
import { PageHeader } from "@/components/app-shell/PageHeader";

type LearningPageLayoutProps = {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  description: string;
  children: React.ReactNode;
};

export function LearningPageLayout({
  breadcrumbs,
  title,
  description,
  children,
}: LearningPageLayoutProps) {
  return (
    <section>
      <ConceptBreadcrumb items={breadcrumbs} />
      <PageHeader eyebrow="개념학습" title={title} description={description} />
      <div className="mt-2">{children}</div>
    </section>
  );
}
