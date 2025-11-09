import { Shield, Bug, Wrench } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-2 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Code Guardian</h1>
            <p className="text-xs text-slate-500">Analyze • Debug • Secure</p>
          </div>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
            <Bug className="h-4 w-4 text-rose-500" />
            <span>Real-time checks</span>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600">
            <Wrench className="h-4 w-4 text-emerald-500" />
            <span>Fix suggestions</span>
          </div>
        </div>
      </div>
    </header>
  );
}
