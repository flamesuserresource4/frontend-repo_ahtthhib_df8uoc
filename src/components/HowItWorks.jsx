import { ListChecks, Lock, Wrench } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Analyze",
      description:
        "We scan code for bugs, security risks, and performance hotspots using static patterns.",
      icon: <ListChecks className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: "Secure",
      description:
        "We flag secrets, unsafe eval, insecure crypto, and injection risks with severity levels.",
      icon: <Lock className="h-5 w-5 text-indigo-600" />,
    },
    {
      title: "Fix",
      description:
        "We propose safe code changes and best-practice tips you can apply quickly.",
      icon: <Wrench className="h-5 w-5 text-indigo-600" />,
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight text-slate-900">
        How it works
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              {s.icon}
            </div>
            <h3 className="font-medium text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
