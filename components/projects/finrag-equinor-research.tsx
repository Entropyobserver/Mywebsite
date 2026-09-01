const researchQuestions = [
  "How do report selection and retrieval-unit granularity affect evidence localization?",
  "Which failures remain across standard sparse, dense, hybrid, hierarchical, and reranked baselines?",
  "Do retrieval differences affect final answers, especially when complete multi-hop evidence is required?",
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl leading-tight lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

function EvidenceConclusion({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-r-xl border-l-4 border-blue-600 bg-blue-50 px-5 py-4 font-medium leading-relaxed text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
      {children}
    </div>
  );
}

function MetricBar({
  label,
  value,
  color = "bg-blue-600",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono font-semibold tabular-nums">
          {(value * 100).toFixed(1)}%
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value * 100}%` }}
          role="img"
          aria-label={`${label}: ${(value * 100).toFixed(1)}%`}
        />
      </div>
    </div>
  );
}

function GroundingFunnel({
  title,
  values,
}: {
  title: string;
  values: [number, number, number];
}) {
  const labels = ["Document / year", "Page", "Exact object"];
  const tones = ["bg-blue-800", "bg-blue-600", "bg-blue-300 text-blue-950"];
  return (
    <div>
      <p className="mb-4 text-center text-sm font-semibold">{title}</p>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div
            key={labels[index]}
            className={`mx-auto flex h-12 items-center justify-between rounded-md px-4 text-sm font-semibold text-white ${tones[index]}`}
            style={{ width: `${Math.max(value, 52)}%` }}
          >
            <span>{labels[index]}</span>
            <span className="font-mono">{value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinragEquinorResearch() {
  return (
    <div className="space-y-20">
      <section>
        <SectionHeader title="Research Questions" />
        <div className="space-y-3">
          {researchQuestions.map((question, index) => (
            <div
              key={question}
              className="flex gap-4 rounded-2xl border bg-background p-5"
            >
              <p className="self-center font-medium leading-relaxed">
                <span className="mr-2 font-heading text-blue-600 dark:text-blue-400">
                  RQ{index + 1}.
                </span>
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="From Annual-Report PDFs to Traceable Evidence"
          description="We turn long annual reports into a structured, searchable evidence corpus. Each piece of evidence stays linked to its original report, page, and location, so we can trace where retrieval and grounding go wrong."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Annual reports", "15 reports · 4,369 pages"],
            ["02", "Layout objects", "100,150 extracted objects"],
            [
              "03",
              "Retrieval corpus",
              "41,736 paragraphs, headings, and tables",
            ],
            ["04", "Benchmark", "720 QA items · 660 answerable"],
          ].map(([step, label, detail]) => (
            <div key={step} className="rounded-2xl border bg-muted/20 p-5">
              <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                {step}
              </p>
              <h3 className="mt-3 font-heading text-xl">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Benchmark Composition and Reliability"
          description="The benchmark covers nine evidence requirements. All 720 items underwent human screening, with separate two-annotator audits of PDF extraction and QA reliability."
        />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="grid grid-cols-2 bg-blue-700 px-5 py-3 text-sm font-semibold text-white">
              <span>Question type</span>
              <span className="text-right">Items</span>
            </div>
            {[
              ["Direct factual", 90],
              ["Numerical extraction", 90],
              ["Definition / policy", 60],
              ["Causal explanation", 75],
              ["Temporal, year-specific", 75],
              ["Table-grounded", 90],
              ["Multi-hop", 90],
              ["Visual / chart layout", 90],
              ["Unanswerable", 60],
            ].map(([label, count], index) => (
              <div
                key={String(label)}
                className={`grid grid-cols-2 px-5 py-2.5 text-sm ${index % 2 ? "bg-muted/35" : ""}`}
              >
                <span>{label}</span>
                <span className="text-right font-mono tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[
              ["95 / 100", "Audited PDF pages usable for RAG"],
              ["100%", "Agreement on overall QA usability"],
              ["99%", "Agreement on answer correctness"],
              ["98%", "Agreement on evidence support"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border bg-muted/20 p-5">
                <p className="font-heading text-3xl text-blue-700 dark:text-blue-300">
                  {value}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader
          title={`RQ1. ${researchQuestions[0]}`}
          description="RQ1 separates two sources of difficulty: how much context a retrieval unit carries and whether the system searches within the correct annual report."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">Chunk Recall@10</h3>
            <div className="mt-6 space-y-5">
              <MetricBar label="Object BM25-year" value={0.756} />
              <MetricBar
                label="Page BM25-year"
                value={0.905}
                color="bg-emerald-600"
              />
              <MetricBar label="Page-window" value={0.876} />
              <MetricBar label="Object-window" value={0.883} />
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">BM25 Object Recall@10</h3>
            <div className="mt-6 space-y-5">
              <MetricBar
                label="Unrestricted search"
                value={0.515}
                color="bg-amber-500"
              />
              <MetricBar
                label="Oracle reference-year filter"
                value={0.756}
                color="bg-emerald-600"
              />
            </div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              Oracle year filtering removes report-level routing errors and
              isolates evidence localization within the correct report.
            </p>
          </div>
        </div>
        <EvidenceConclusion>
          Page units achieve <strong>90.5% Chunk Recall@10</strong>, while
          reference-year filtering raises BM25 exact-object Recall@10 from{" "}
          <strong>51.5% to 75.6%</strong>. More context and correct report
          selection both help, but neither guarantees exact localization.
        </EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader
          title={`RQ2. ${researchQuestions[1]}`}
          description="Sparse, dense, hybrid, hierarchical, and reranked baselines are evaluated at both page and exact-object levels."
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Method</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Object R@1
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Object R@10
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Page R@10
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">MRR</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["BM25 · unrestricted", ".214", ".515", ".603", ".297"],
                  ["BM25 · reference year", ".402", ".756", ".850", ".514"],
                  ["BGE-M3 · reference year", ".517", ".821", ".889", ".619"],
                  [
                    "BM25 + BGE · reference year",
                    ".489",
                    ".833",
                    ".908",
                    ".607",
                  ],
                  [
                    "BM25 + E5 · reference year",
                    ".459",
                    ".838",
                    ".908",
                    ".586",
                  ],
                  ["Page → object RRF", ".474", ".791", ".858", ".577"],
                ].map((row, index) => (
                  <tr key={row[0]} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium">{row[0]}</td>
                    {row.slice(1).map((value) => (
                      <td
                        key={value + row[0]}
                        className="px-5 py-4 text-right font-mono tabular-nums"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6 grid gap-6 rounded-2xl border bg-muted/20 p-5 sm:p-7 md:grid-cols-2">
          <GroundingFunnel
            title="BM25 · unrestricted"
            values={[91.2, 60.3, 51.5]}
          />
          <GroundingFunnel
            title="BM25 · reference year"
            values={[100, 85.0, 75.6]}
          />
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            ["40.2% → 63.6%", "BM25 object R@1 after reranking"],
            ["67.4%", "Best reranked hybrid object R@1"],
            ["73.1%", "Best reranked hybrid MRR"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border bg-background p-5 text-center"
            >
              <p className="font-heading text-2xl text-blue-700 dark:text-blue-300">
                {value}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
        <EvidenceConclusion>
          The strongest filtered hybrid reaches{" "}
          <strong>83.8% object Recall@10</strong>. Reranking promotes evidence
          already present in the top-10, but it cannot recover missing
          candidates. Page and exact-object localization remain the main failure
          points after the correct report is reached.
        </EvidenceConclusion>
      </section>

      <section id="rq3">
        <SectionHeader
          title={`RQ3. ${researchQuestions[2]}`}
          description="RQ3 connects complete multi-hop evidence retrieval to the quality of generated answers."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">90 multi-hop questions</h3>
            <div className="mt-6 space-y-5">
              <MetricBar
                label="BM25-year · Any hop R@10"
                value={0.911}
                color="bg-emerald-600"
              />
              <MetricBar
                label="BM25-year · All hops R@10"
                value={0.533}
                color="bg-amber-500"
              />
              <MetricBar
                label="Best tested · All hops R@10"
                value={0.744}
                color="bg-violet-600"
              />
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">
              Answerable-question accuracy
            </h3>
            <div className="mt-6 space-y-5">
              <MetricBar
                label="Closed-book"
                value={0.029}
                color="bg-slate-500"
              />
              <MetricBar label="BM25-year RAG" value={0.585} />
              <MetricBar
                label="Hybrid + rerank RAG"
                value={0.709}
                color="bg-emerald-600"
              />
              <MetricBar
                label="Oracle evidence"
                value={0.82}
                color="bg-violet-600"
              />
            </div>
          </div>
        </div>
        <EvidenceConclusion>
          BM25-year finds at least one required object for{" "}
          <strong>91.1%</strong> of multi-hop questions but finds the complete
          evidence set for only <strong>53.3%</strong>. Hybrid reranking raises
          answer accuracy from <strong>58.5% to 70.9%</strong>, while oracle
          evidence reaches <strong>82.0%</strong>.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          eyebrow="Exploratory analysis"
          title="Failure-Aware Retrieval Recovery"
          description="A threshold-based detector uses observable retrieval signals to trigger targeted actions for likely wrong-report, wrong-page, wrong-object, and missing-hop failures."
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Policy</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Object R@10
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Complete R@10
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Multi-hop all R@10
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Triggers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Initial", ".702", ".644", ".478", "0"],
                  ["Selective recovery", ".717", ".661", ".500", "250"],
                  ["Always-on recovery", ".717", ".665", ".522", "720"],
                ].map((row, index) => (
                  <tr key={row[0]} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium">{row[0]}</td>
                    {row.slice(1).map((value) => (
                      <td
                        key={value + row[0]}
                        className="px-5 py-4 text-right font-mono tabular-nums"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <EvidenceConclusion>
          Selective recovery matches always-on object Recall@10 with 250 rather
          than 720 triggers. The improvement is small and the held-out detector
          remains weak (macro-F1 <strong>0.349</strong>), so the paper presents
          this as feasibility evidence—not a new retrieval method or a
          production-ready verifier.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Scope and Limitations" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-blue-50 p-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
            <h3 className="font-heading text-2xl">
              What the benchmark establishes
            </h3>
            <p className="mt-3 leading-7">
              Annual-report RAG is a hierarchical localization problem spanning
              report selection, page localization, exact evidence objects, and
              complete multi-hop grounding. These retrieval differences have a
              measurable effect on answer correctness.
            </p>
          </div>
          <div className="rounded-2xl border bg-muted/20 p-6">
            <h3 className="font-heading text-2xl">What remains open</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              The resource is a controlled English-language case study of one
              company and 15 consecutive reports. Cross-company, multilingual,
              multimodal, broader generator/evaluator, and independent
              third-party validation remain future work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
