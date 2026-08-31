const researchQuestions = [
  "How does retrieval-unit granularity affect evidence coverage and localization precision?",
  "How much does knowing the reference report year improve evidence localization?",
  "How do sparse, dense, and hybrid retrieval strategies affect evidence coverage?",
  "What does hierarchical page-to-object retrieval reveal about fine-grained localization?",
  "Where do reranking and multi-hop retrieval expose remaining grounding failures?",
  "How do retrieval failures affect final answers, and can observable retrieval signals support selective recovery?",
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
    <div className="space-y-16">
      <section>
        <SectionHeader title="Research Questions" />
        <div className="grid gap-3 md:grid-cols-2">
          {researchQuestions.map((question, index) => (
            <div
              key={question}
              className="flex gap-4 rounded-2xl border bg-background p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-heading text-sm text-white">
                RQ{index + 1}
              </span>
              <p className="self-center font-medium leading-relaxed">
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Traceable by design"
          title="From PDFs to an Auditable Benchmark"
          description="Every retained unit preserves its source report, page, and layout-object identity, so errors can be traced through the full evidence pipeline."
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
          description="The evidence-first benchmark covers nine question types. All items underwent human screening, with separate audits for extraction quality and QA reliability."
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
          eyebrow="RQ1 · Retrieval granularity"
          title="More Context Improves Coverage"
          description="Using the same reference-year-filtered BM25 retriever, page-sized units recover more evidence than exact layout objects at rank 10."
        />
        <div className="space-y-5 rounded-2xl border bg-background p-5 sm:p-7">
          <MetricBar label="Object BM25-year · Chunk R@10" value={0.756} />
          <MetricBar
            label="Page BM25-year · Chunk R@10"
            value={0.905}
            color="bg-emerald-600"
          />
          <MetricBar label="Page-window · Chunk R@10" value={0.876} />
          <MetricBar label="Object-window · Chunk R@10" value={0.883} />
        </div>
        <EvidenceConclusion>
          Page-level context raises Chunk Recall@10 from <strong>75.6%</strong>{" "}
          to <strong>90.5%</strong>. Coverage improves with context, but strict
          page- and object-level metrics are still needed to measure precise
          evidence localization.
        </EvidenceConclusion>
      </section>

      <section id="rq2-rq4">
        <SectionHeader
          eyebrow="RQ2–RQ4 · Report routing and retrieval"
          title="The Correct Year Helps—But Does Not Solve Localization"
          description="Oracle year filtering removes cross-report competition. Dense and hybrid methods then improve exact-object coverage within the correct report."
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
        <EvidenceConclusion>
          Year filtering lifts BM25 object Recall@10 from <strong>51.5%</strong>{" "}
          to <strong>75.6%</strong>. The strongest filtered hybrid reaches{" "}
          <strong>83.8%</strong>, showing that report routing is a major hurdle
          while fine-grained localization remains unresolved.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="The Three-Level Grounding Funnel" />
        <div className="grid gap-8 rounded-2xl border bg-muted/20 p-5 sm:p-7 md:grid-cols-2">
          <GroundingFunnel
            title="BM25 · unrestricted"
            values={[91.2, 60.3, 51.5]}
          />
          <GroundingFunnel
            title="BM25 · reference year"
            values={[100, 85.0, 75.6]}
          />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Reference-year filtering closes the document-level gap by design, but
          the narrowing funnel shows continued losses from report to page and
          from page to exact evidence object.
        </p>
      </section>

      <section id="rq5">
        <SectionHeader
          eyebrow="RQ5 · Ranking and multi-hop grounding"
          title="Reranking Promotes Evidence; Missing Hops Remain"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">BM25-year reranking</h3>
            <div className="mt-6 space-y-5">
              <MetricBar label="Before · Object R@1" value={0.402} />
              <MetricBar
                label="After · Object R@1"
                value={0.636}
                color="bg-emerald-600"
              />
              <MetricBar
                label="After · Object R@10"
                value={0.756}
                color="bg-violet-600"
              />
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Reranking improves ordering when evidence is already in the
              candidate set; fixed-candidate Recall@10 cannot increase.
            </p>
          </div>
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
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Finding one relevant item can substantially overstate whether the
              complete evidence set needed for an answer was retrieved.
            </p>
          </div>
        </div>
      </section>

      <section id="rq6">
        <SectionHeader
          eyebrow="RQ6 · End-to-end impact"
          title="Better Retrieval Produces Better Answers"
          description="A fixed generator was evaluated under four evidence conditions on all 660 answerable questions."
        />
        <div className="space-y-5 rounded-2xl border bg-background p-5 sm:p-7">
          <MetricBar label="Closed-book" value={0.029} color="bg-slate-500" />
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
        <EvidenceConclusion>
          Hybrid reranking improves answer accuracy by{" "}
          <strong>12.4 points</strong> over BM25-year evidence, but remains{" "}
          <strong>11.1 points</strong> below oracle evidence. Retrieval quality
          has a clear downstream effect, and generation still accounts for part
          of the remaining error.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          title="Failure-Aware Retrieval Recovery"
          description="An interpretable detector uses observable retrieval signals to trigger targeted actions for likely wrong-report, wrong-page, wrong-object, and missing-hop failures."
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
          Selective recovery matches always-on object Recall@10 while using only
          <strong> 35% of the triggers</strong>. The gain is small and the
          held-out detector remains imperfect (macro-F1 <strong>0.349</strong>),
          so this is feasibility evidence rather than a production-ready
          recovery policy.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Conclusion and Scope" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-blue-50 p-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
            <h3 className="font-heading text-2xl">Main finding</h3>
            <p className="mt-3 leading-7">
              Annual-report RAG is a hierarchical evidence-localization problem.
              Correct report selection is necessary, but page, object, and
              complete multi-hop grounding determine whether the final answer is
              adequately supported.
            </p>
          </div>
          <div className="rounded-2xl border bg-muted/20 p-6">
            <h3 className="font-heading text-2xl">Current scope</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              The study is a controlled English-language case study of one
              company and 15 consecutive reports. Cross-company, multilingual,
              multimodal, and broader generator/evaluator validation remain
              future work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
