import { useState } from "react";
import { Upload, Play, ShieldAlert } from "lucide-react";

export default function AnalyzerForm({ onAnalyze }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("javascript");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      await onAnalyze({ code, language });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Paste your code</h2>
            <select
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
              <option value="ruby">Ruby</option>
            </select>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste code to analyze..."
            className="h-56 w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-sm leading-relaxed text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <div className="mt-3 flex items-center justify-between">
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-slate-600">
              <Upload className="h-4 w-4" />
              <span>Upload file (soon)</span>
              <input type="file" className="hidden" disabled />
            </label>
            <button
              onClick={handleSubmit}
              disabled={loading || !code.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Play className="h-4 w-4" />
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-700">What this checks</h3>
          </div>
          <ul className="list-disc space-y-2 pl-6 text-sm text-slate-700">
            <li>Common bugs and anti-patterns</li>
            <li>Security red flags like injection and secrets</li>
            <li>Dependency risks and outdated APIs</li>
            <li>Performance hotspots and memory leaks</li>
            <li>Best-practice suggestions with quick fixes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
