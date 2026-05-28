import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export function ConceptBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="rounded-md px-1 py-1 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ) : (
            <span className="rounded-md bg-white px-2 py-1 text-slate-900 shadow-sm">
              {item.label}
            </span>
          )}
          {index < items.length - 1 ? <span className="text-slate-300">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
