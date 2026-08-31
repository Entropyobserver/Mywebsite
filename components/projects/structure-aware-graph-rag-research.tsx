const studyQuestions = [
  "Can typed document structure recover exact evidence that strong lexical and dense retrieval miss?",
  "Which graph relations provide useful evidence bridges, and which introduce distracting structural proximity?",
  "Does path-guided candidate fusion outperform both local graph expansion and a strong hybrid reranked baseline?",
  "How do graph retrieval and lightweight routing behave on multi-hop and visual/layout questions?",
];

const mainResults = [
  ["Hybrid E5 + rerank", ".673", ".838", ".908", ".730"],
  ["Selected GraphRAG + rerank", ".668", ".826", ".871", ".724"],
  ["Path + Graph", ".667", ".845", ".905", ".729"],
  ["Path + Hybrid", ".674", ".871", ".935", ".742"],
  ["Path + All", ".674", ".874", ".933", ".743"],
] as const;

const edgeAblations = [
  { label: "Remove adjacent-page", delta: 5.6, note: "removes noise" },
  { label: "Remove same-page", delta: 0, note: "neutral for object R@10" },
  { label: "Remove same-metric", delta: -0.8, note: "metric links help" },
  { label: "Remove same-entity", delta: -2.0, note: "entity links help most" },
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

export default function StructureAwareGraphRagResearch() {
  return (
    <div className="space-y-16">
      <section>
        <SectionHeader title="Study Questions" />
        <div className="grid gap-3 md:grid-cols-2">
          {studyQuestions.map((question, index) => (
            <div
              key={question}
              className="flex gap-4 rounded-2xl border bg-background p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-heading text-sm text-white">
                {index + 1}
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
          eyebrow="Retrieval architecture"
          title="From Hybrid Search to Path-Guided GraphRAG"
          description="The graph is used to generate structured evidence candidates; semantic reranking still decides which candidates best answer the question."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["01", "Route", "Detect year, type, metric, and entity cues"],
            ["02", "Retrieve", "Fuse BM25 and E5 candidate rankings"],
            ["03", "Expand", "Follow selected typed graph neighbors"],
            ["04", "Trace paths", "Add query-relevant graph-path candidates"],
            ["05", "Rerank", "Order the fused pool with a cross-encoder"],
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
          title="A Typed Metadata Evidence Graph"
          description="The graph preserves the annual reports' containment hierarchy while adding cross-object relations for entities and financial metrics."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border bg-background p-5 sm:p-7">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white">
                15 reports · 15 years
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="rounded-xl border-2 border-blue-500 bg-blue-50 px-6 py-3 font-semibold text-blue-950 dark:bg-blue-950/40 dark:text-blue-100">
                4,108 retained pages
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="rounded-xl border bg-muted px-6 py-3 font-semibold">
                41,736 evidence objects
              </div>
              <div className="grid w-full grid-cols-3 gap-2 pt-2 text-xs font-semibold">
                <div className="rounded-lg bg-emerald-100 px-2 py-3 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-100">
                  same page
                </div>
                <div className="rounded-lg bg-violet-100 px-2 py-3 text-violet-950 dark:bg-violet-950/50 dark:text-violet-100">
                  same entity
                </div>
                <div className="rounded-lg bg-amber-100 px-2 py-3 text-amber-950 dark:bg-amber-950/50 dark:text-amber-100">
                  same metric
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["52,278", "total graph nodes"],
              ["310,796", "typed graph edges"],
              ["6,392", "entity nodes"],
              ["85.3%", "reference objects linked to a metric"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border bg-muted/20 p-5">
                <p className="font-heading text-3xl text-blue-700 dark:text-blue-300">
                  {value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Main result"
          title="Graph Paths Add Evidence Beyond Strong Hybrid Retrieval"
          description="Results on 660 answerable questions. Path + All fuses hybrid, selected-graph, and path candidates before the same cross-encoder reranking stage."
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Method</th>
                  <th className="px-5 py-4 text-right font-semibold">Obj R@1</th>
                  <th className="px-5 py-4 text-right font-semibold">Obj R@10</th>
                  <th className="px-5 py-4 text-right font-semibold">Page R@10</th>
                  <th className="px-5 py-4 text-right font-semibold">MRR</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mainResults.map((row, index) => (
                  <tr
                    key={row[0]}
                    className={
                      row[0] === "Path + All"
                        ? "bg-emerald-50 font-semibold dark:bg-emerald-950/25"
                        : index % 2
                          ? "bg-muted/35"
                          : ""
                    }
                  >
                    <td className="px-5 py-4">{row[0]}</td>
                    {row.slice(1).map((value) => (
                      <td
                        key={`${row[0]}-${value}`}
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
          Path + All raises exact-object Recall@10 from <strong>83.8%</strong>{" "}
          to <strong>87.4%</strong>, Page Recall@10 from <strong>90.8%</strong>{" "}
          to <strong>93.3%</strong>, and MRR from <strong>0.730</strong> to{" "}
          <strong>0.743</strong> over the strongest hybrid reranked baseline.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          eyebrow="Edge-type ablation"
          title="Not Every Structural Link Helps"
          description="Change in Object Recall@10 when each edge type is removed from the full graph. Positive values mean removal improved retrieval."
        />
        <div className="space-y-4 rounded-2xl border bg-background p-5 sm:p-7">
          {edgeAblations.map(({ label, delta, note }) => {
            const positive = delta > 0;
            const neutral = delta === 0;
            return (
              <div key={label} className="grid gap-2 sm:grid-cols-[180px_1fr_150px] sm:items-center">
                <span className="text-sm font-medium">{label}</span>
                <div className="relative h-9 overflow-hidden rounded-lg bg-muted">
                  <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
                  {!neutral && (
                    <div
                      className={`absolute top-1 h-7 rounded-md ${positive ? "left-1/2 bg-emerald-600" : "right-1/2 bg-red-500"}`}
                      style={{ width: `${Math.abs(delta) * 7}%` }}
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold">
                    {positive ? "+" : ""}{delta.toFixed(1)} pp
                  </span>
                </div>
                <span className="text-sm text-muted-foreground sm:text-right">{note}</span>
              </div>
            );
          })}
        </div>
        <EvidenceConclusion>
          Removing adjacent-page links improves Object Recall@10 from{" "}
          <strong>77.0%</strong> to <strong>82.6%</strong>. Repeated entities
          and metrics are useful evidence bridges; geographic proximity alone
          often introduces related but incorrect evidence.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          title="The Edge Policy Transfers to Later Reports"
          description="The no-adjacent-page policy was selected on reports from 2010–2021 and evaluated on held-out reports from 2022–2024."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">Held-out Object Recall@10</h3>
            <div className="mt-6 space-y-5">
              <MetricBar label="Full graph" value={0.713} color="bg-slate-500" />
              <MetricBar label="Without adjacent-page" value={0.84} color="bg-emerald-600" />
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">Held-out MRR</h3>
            <div className="mt-6 space-y-5">
              <MetricBar label="Full graph" value={0.644} color="bg-slate-500" />
              <MetricBar label="Without adjacent-page" value={0.728} color="bg-violet-600" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          The held-out gains are statistically detectable: +12.7 points in
          Object Recall@10 and +8.4 points in MRR (both p&lt;0.001).
        </p>
      </section>

      <section>
        <SectionHeader
          title="Where GraphRAG Helps—and Where It Still Struggles"
          description="Subset analysis separates complete multi-hop evidence coverage from visual and layout-aware localization."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">90 multi-hop questions</h3>
            <div className="mt-6 space-y-5">
              <MetricBar label="Hybrid E5 · all objects R@10" value={0.678} />
              <MetricBar label="Path + Hybrid · all objects R@10" value={0.767} color="bg-emerald-600" />
              <MetricBar label="Path + Hybrid · all pages R@10" value={0.778} color="bg-violet-600" />
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Path fusion improves complete evidence coverage; the lightweight
              router does not improve this subset because it cannot add new candidates.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">90 visual/layout questions</h3>
            <div className="mt-6 space-y-5">
              <MetricBar label="Hybrid E5 · object R@10" value={0.411} />
              <MetricBar label="Path + All · object R@10" value={0.5} color="bg-emerald-600" />
              <MetricBar label="Path + All · page R@10" value={0.778} color="bg-violet-600" />
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              Text and layout metadata remain insufficient for some chart cases;
              page-image encoders and multimodal rerankers are future work.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Conclusion and Scope" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-blue-50 p-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
            <h3 className="font-heading text-2xl">Main finding</h3>
            <p className="mt-3 leading-7">
              GraphRAG works best as a selective candidate source fused with
              strong hybrid retrieval. Typed paths broaden evidence coverage;
              cross-encoder reranking remains essential for precise ordering.
            </p>
          </div>
          <div className="rounded-2xl border bg-muted/20 p-6">
            <h3 className="font-heading text-2xl">Current scope</h3>
            <p className="mt-3 leading-7 text-muted-foreground">
              This is an English, single-company case study using a heuristic
              metadata graph—not a manually curated knowledge graph. The router
              is an interpretable baseline, not a full autonomous agent.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
