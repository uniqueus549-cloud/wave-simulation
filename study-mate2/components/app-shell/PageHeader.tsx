type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      {eyebrow ? (
        <p className="text-sm font-bold text-blue-600">{eyebrow}</p>
      ) : null}
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </header>
  );
}
