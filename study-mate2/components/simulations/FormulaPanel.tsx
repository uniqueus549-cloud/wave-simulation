type FormulaPanelProps = {
  title: string;
  formula: string;
  details: string[];
};

export function FormulaPanel({ title, formula, details }: FormulaPanelProps) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-5 shadow-sm">
      <p className="text-sm font-black text-emerald-700">{title}</p>
      <p className="mt-3 text-2xl font-black text-slate-950">{formula}</p>
      <div className="mt-4 grid gap-1 text-sm leading-6 text-slate-600 sm:grid-cols-2">
        {details.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
      </div>
    </div>
  );
}
