import { useState } from "react";
import Header from "./components/Header";
import AnalyzerForm from "./components/AnalyzerForm";
import ResultsPanel from "./components/ResultsPanel";
import HowItWorks from "./components/HowItWorks";

// Simple local analyzer to simulate checks without a backend yet
function runLocalAnalysis({ code, language }) {
  const issues = [];

  // Demo security checks
  if (/eval\s*\(/.test(code)) {
    issues.push({
      title: "Use of eval detected",
      severity: "high",
      description:
        "eval can execute arbitrary code and is a common injection vector. Avoid using it.",
      suggestion: `// Replace eval with a safe parser or a whitelist-based interpreter\n// Bad\nconst output = eval(userInput);\n// Good\n// Use JSON.parse for data, or implement a switch/case for allowed operations`,
    });
  }

  if (/password\s*=\s*['\"][^'\"]+['\"]/i.test(code)) {
    issues.push({
      title: "Hardcoded secret/password",
      severity: "high",
      description:
        "Credentials should not be hardcoded. Use environment variables or a secret manager.",
      suggestion: `# .env\nAPP_PASSWORD=\n\n# usage\nconst password = process.env.APP_PASSWORD;`,
    });
  }

  if (/innerHTML\s*=/.test(code)) {
    issues.push({
      title: "Direct innerHTML assignment",
      severity: "medium",
      description:
        "Setting innerHTML with untrusted data can lead to XSS. Prefer textContent or sanitization.",
      suggestion: `// Prefer textContent when inserting user data\nnode.textContent = userText;`,
    });
  }

  if (/fetch\s*\([^)]*\)\s*;?\s*$/m.test(code) && !/try\s*\{[\s\S]*fetch[\s\S]*\}/.test(code)) {
    issues.push({
      title: "Network call without error handling",
      severity: "low",
      description:
        "Wrap network calls in try/catch and handle timeouts for resilience.",
      suggestion: `try {\n  const c = new AbortController();\n  const id = setTimeout(() => c.abort(), 10000);\n  const res = await fetch(url, { signal: c.signal });\n  clearTimeout(id);\n  if (!res.ok) throw new Error('Request failed');\n} catch (e) {\n  // handle error\n}`,
    });
  }

  const summary = {
    overview:
      issues.length === 0
        ? "No issues found in the snippet."
        : `Detected ${issues.length} potential issue${issues.length > 1 ? "s" : ""}. Review and apply fixes.`,
    counts: {
      high: issues.filter((i) => i.severity === "high").length,
      medium: issues.filter((i) => i.severity === "medium").length,
      low: issues.filter((i) => i.severity === "low").length,
    },
  };

  return { summary, issues, language };
}

export default function App() {
  const [results, setResults] = useState(null);

  const onAnalyze = async (payload) => {
    // For now run local checks; later this can call the backend.
    const res = runLocalAnalysis(payload);
    setResults(res);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />
      <main>
        <section className="mx-auto max-w-6xl px-4 pt-8">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow">
            <h2 className="text-2xl font-semibold tracking-tight">Ship safer code, faster</h2>
            <p className="mt-2 max-w-2xl text-sm text-indigo-100">
              Paste a snippet to get instant feedback on bugs, security problems, and performance pitfalls—with practical fixes.
            </p>
          </div>
        </section>
        <AnalyzerForm onAnalyze={onAnalyze} />
        <ResultsPanel results={results} />
        <HowItWorks />
      </main>
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        Built with ❤️ to help you analyze, debug, and secure your code.
      </footer>
    </div>
  );
}
