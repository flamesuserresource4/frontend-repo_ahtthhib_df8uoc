import { useMemo } from "react";
import { ShieldCheck, TriangleAlert, CheckCircle2 } from "lucide-react";

function Badge({ level }) {
  const { label, color } = useMemo(() => {
    switch (level) {
      case "high":
        return { label: "High", color: "bg-rose-100 text-rose-700 border-rose-200" };
      case "medium":
        return { label: "Medium", color: "bg-amber-100 text-amber-800 border-amber-200" };
      default:
        return { label: "Low", color: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    }
  }, [level]);

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs ${color}`}>
      {level === "high" && <TriangleAlert className="h-3.5 w-3.5" />}
      {level === "medium" && <ShieldCheck className="h-3.5 w-3.5" />}
      {level === "low" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

export default function ResultsPanel({ results }) {
  if (!results) {
    return (
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
          No analysis yet. Paste code and run an analysis to see results.
        </div>
      </section>
    );
  }

  const { summary, issues } = results;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Findings</h3>
          <div className="space-y-3">
            {issues.length === 0 ? (
              <div className="rounded-md bg-emerald-50 p-4 text-sm text-emerald-700">
                No issues detected. Great job!
              </div>
            ) : (
              issues.map((issue, idx) => (
                <div key={idx} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-medium text-slate-800">{issue.title}</p>
                    <Badge level={issue.severity} />
                  </div>
                  <p className="text-sm text-slate-600">{issue.description}</p>
                  {issue.suggestion && (
                    <pre className="mt-2 overflow-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
                      {issue.suggestion}
                    </pre>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-slate-700">Summary</h3>
          <p className="text-sm text-slate-700">{summary.overview}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xl font-semibold text-slate-800">{summary.counts.high}</p>
              <p className="text-xs text-slate-500">High</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xl font-semibold text-slate-800">{summary.counts.medium}</p>
              <p className="text-xs text-slate-500">Medium</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 text-center">
              <p className="text-xl font-semibold text-slate-800">{summary.counts.low}</p>
              <p className="text-xs text-slate-500">Low</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
