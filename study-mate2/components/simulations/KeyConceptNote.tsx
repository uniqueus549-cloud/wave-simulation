export function KeyConceptNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-slate-800">
      <span className="shrink-0 rounded-md bg-blue-600 px-3 py-1 text-sm font-black text-white">
        핵심
      </span>
      <p className="text-sm font-semibold leading-6 sm:text-base">{children}</p>
    </div>
  );
}
