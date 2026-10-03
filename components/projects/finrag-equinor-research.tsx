import Image from "next/image";

const researchQuestions = [
  "How do the year filter and retrieval-unit size affect evidence retrieval?",
  "Where and how does retrieval fail?",
  "Does retrieving better evidence lead to more accurate answers?",
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
  highlight = false,
}: {
  label: string;
  value: number;
  color?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-end justify-between gap-4 text-sm">
        <span className="font-medium">{label}</span>
        <span
          className={`font-mono tabular-nums ${
            highlight ? "font-bold text-blue-700 dark:text-blue-300" : ""
          }`}
        >
          {value.toFixed(1)}%
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
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
          description="We turn annual-report PDFs into retrieval units that remain linked to their original report, page, and location, then use them to build an audited QA benchmark."
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
              <p className="font-mono text-2xl font-bold leading-none text-blue-600 dark:text-blue-400">
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
          description="The benchmark covers nine question types. We manually checked all 720 QA items and separately audited PDF extraction and QA quality."
        />
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <table className="w-full text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold">Question type</th>
                  <th className="px-5 py-3 text-right font-semibold">Items</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Direct factual", 90],
                  ["Numerical extraction", 90],
                  ["Definition / policy", 60],
                  ["Causal explanation", 75],
                  ["Temporal, year-specific", 75],
                  ["Table-grounded", 90],
                  ["Multi-evidence", 90],
                  ["Layout-sensitive", 90],
                  ["Unanswerable", 60],
                ].map(([label, count], index) => (
                  <tr key={String(label)} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-2.5">{label}</td>
                    <td className="px-5 py-2.5 text-right font-mono tabular-nums">
                      {count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      <section id="evaluation">
        <SectionHeader
          title="How We Evaluate LongFinRAG"
          description="We evaluate LongFinRAG in two ways: evidence retrieval and end-to-end question answering. The first tests whether the system can find the right evidence, while the second tests whether better evidence leads to better answers."
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <Image
            src="/projects/finrag-equinor/paper-evaluation-framework.svg"
            alt="LongFinRAG evaluation pipeline showing evidence retrieval for RQ1 and RQ2 and end-to-end question answering for RQ3"
            width={1600}
            height={600}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section id="rq1">
        <SectionHeader
          title={`RQ1. ${researchQuestions[0]}`}
          description="We test two things. First, we compare Without year filter with With reference-year filter. Second, we compare objects, pages, page-windows, and object-windows as retrieval units."
        />
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 1
              </p>
              <h3 className="font-heading text-2xl">
                Does the reference-year filter help?
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                Without year filter searches all 15 reports. With
                reference-year filter searches only the correct report.
              </p>
            </div>
            <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-2">
              {[
                {
                  title: "Find the exact evidence",
                  metric: "Object Recall@10",
                  values: [
                    ["BM25", 52.4, 76.5],
                    ["BGE-M3", 71.5, 83.0],
                    ["BM25 + E5", 67.1, 84.5],
                  ],
                },
                {
                  title: "Find the correct page",
                  metric: "Page Recall@10",
                  values: [
                    ["BM25", 61.2, 85.8],
                    ["BGE-M3", 79.1, 89.8],
                    ["BM25 + E5", 75.5, 91.4],
                  ],
                },
              ].map(({ title, metric, values }) => (
                <div key={title}>
                  <div className="text-center">
                    <h4 className="font-semibold">{title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{metric}</p>
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-3 border-b border-slate-300 px-2 dark:border-slate-700">
                    {values.map(([method, withoutFilter, withFilter]) => (
                      <div key={String(method)} className="text-center">
                        <div className="flex h-40 items-end justify-center gap-1.5">
                          {[
                            [withoutFilter, "bg-blue-300 dark:bg-blue-500"],
                            [withFilter, "bg-emerald-500"],
                          ].map(([value, color]) => (
                            <div
                              key={`${method}-${value}`}
                              className={`relative w-8 sm:w-10 ${color}`}
                              style={{ height: `${Number(value)}%` }}
                            >
                              <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[11px] font-semibold text-foreground sm:text-xs">
                                {Number(value).toFixed(1)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="py-3 text-xs font-medium sm:text-sm">{method}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground lg:col-span-2">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-blue-300 dark:bg-blue-500" />
                  Without year filter
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-emerald-500" />
                  With reference-year filter
                </span>
              </div>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="font-semibold">
                Without year filter → With reference-year filter
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Exact evidence:</strong>{" "}
                the paragraph or table that contains the answer.
                <br />
                <strong className="text-foreground">Correct page:</strong>{" "}
                the page where that evidence appears.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                The reference-year filter improves both results for all three
                methods. BM25 + E5 gives the highest results: 84.5% for exact
                evidence and 91.4% for the correct page.
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: The reference-year filter makes it easier to find
                  both the correct page and the exact evidence.
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 2
              </p>
              <h3 className="font-heading text-2xl">Does more context help?</h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                We use the <strong>With reference-year filter</strong> setting
                and compare four retrieval units.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">
                      Retrieval unit
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Evidence found @10
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Correct page found @10
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Object", "76.5%", "85.8%"],
                    ["Page", "91.2%", "91.2%"],
                    ["Page-window", "88.5%", "88.5%"],
                    ["Object-window", "89.2%", "92.4%"],
                  ].map(([unit, chunkRecall, pageRecall], index) => (
                    <tr key={unit} className={index % 2 ? "bg-muted/35" : ""}>
                      <td className="px-5 py-4 font-medium sm:px-6">{unit}</td>
                      <td
                        className={`px-5 py-4 text-right font-mono sm:px-6 ${
                          index === 1
                            ? "font-bold text-blue-700 dark:text-blue-300"
                            : ""
                        }`}
                      >
                        {chunkRecall}
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-mono sm:px-6 ${
                          index === 3
                            ? "font-bold text-blue-700 dark:text-blue-300"
                            : ""
                        }`}
                      >
                        {pageRecall}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-5 border-t bg-muted/20 px-5 py-5 text-xs leading-5 text-muted-foreground sm:grid-cols-2 sm:px-6 sm:text-sm sm:leading-6">
              <div>
                <h4 className="mb-2 font-semibold text-foreground">
                  What does each unit contain?
                </h4>
                <ul className="list-disc space-y-1 pl-4">
                  <li><strong className="text-foreground">Object:</strong> one paragraph, heading, or table</li>
                  <li><strong className="text-foreground">Page:</strong> all objects on one PDF page</li>
                  <li><strong className="text-foreground">Page-window:</strong> up to three nearby pages</li>
                  <li><strong className="text-foreground">Object-window:</strong> eight nearby objects</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-foreground">Metrics</h4>
                <ul className="list-disc space-y-1 pl-4">
                  <li><strong className="text-foreground">Evidence found:</strong> a top-10 result contains the needed evidence</li>
                  <li><strong className="text-foreground">Correct page found:</strong> a top-10 result reaches the correct page</li>
                </ul>
              </div>
            </div>
            <div className="border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                <strong>
                  Whole-page retrieval works best for finding the evidence
                  (91.2%). Object-window retrieval works best for finding the
                  correct page (92.4%).
                </strong>
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: One page works best for finding the exact evidence,
                  while adding nearby objects helps find the correct page.
                  Adding more pages does not improve the results.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="rq2">
        <SectionHeader
          title={`RQ2. ${researchQuestions[1]}`}
          description="Retrieval can fail in three ways: it may search in the wrong place, rank the correct evidence too low, or miss some of the required evidence."
        />
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 1
              </p>
              <h3 className="font-heading text-2xl">Where does retrieval fail?</h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                We compare the top-10 results with the reference evidence.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">
                      Retrieval outcome
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Without year filter
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      With reference-year filter
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Exact object", "52.4%", "76.5%"],
                    ["Right page, wrong object", "8.8%", "9.2%"],
                    ["Nearby page", "6.7%", "5.0%"],
                    ["Right report, wrong page", "23.6%", "9.2%"],
                    ["Wrong report", "8.5%", "0%"],
                  ].map(([outcome, withoutFilter, withFilter], index) => (
                    <tr key={outcome} className={index % 2 ? "bg-muted/35" : ""}>
                      <td className="px-5 py-3.5 font-medium sm:px-6">
                        {outcome}
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono tabular-nums sm:px-6">
                        {withoutFilter}
                      </td>
                      <td
                        className={`px-5 py-3.5 text-right font-mono tabular-nums sm:px-6 ${
                          index === 0 || index === 4
                            ? "font-bold text-blue-700 dark:text-blue-300"
                            : ""
                        }`}
                      >
                        {withFilter}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                If a question has multiple reference evidence objects, finding
                at least one counts as an exact-object hit. The five categories
                do not overlap, so each row adds up to 100%.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: Providing the year information helps BM25 find the
                  right report, but it does not always find the right page or
                  object.
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 2
              </p>
              <h3 className="font-heading text-2xl">
                Can reranking fix ranking errors?
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                The correct evidence may be in the top 10 but ranked too low.
                Two cross-encoders, MiniLM and BGE, reorder the same top-10
                results.
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold sm:text-sm">
                <span className="rounded-full bg-muted px-3 py-1.5">Retrieve top 10</span>
                <span className="text-muted-foreground">→</span>
                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
                  MiniLM / BGE rerank
                </span>
                <span className="text-muted-foreground">→</span>
                <span className="rounded-full bg-muted px-3 py-1.5">Check rank 1</span>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="min-w-[560px]">
                  <div className="mb-5 flex justify-center gap-6 text-xs font-semibold text-muted-foreground">
                    {[
                      ["Before", "bg-slate-400"],
                      ["MiniLM", "bg-blue-500"],
                      ["BGE", "bg-emerald-500"],
                    ].map(([label, color]) => (
                      <span key={label} className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-sm ${color}`} />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="relative ml-10 h-[205px] border-b border-l border-slate-300 dark:border-slate-700">
                    {[0, 20, 40, 60, 80].map((tick) => (
                      <div
                        key={tick}
                        className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-800"
                        style={{ bottom: `${tick * 2.25}px` }}
                      >
                        <span className="absolute -left-8 -translate-y-1/2 font-mono text-[11px] text-muted-foreground">
                          {tick}
                        </span>
                      </div>
                    ))}

                    <div className="absolute inset-x-10 bottom-0 top-0 flex items-end justify-around">
                      {[
                        ["BM25", 41.1, 64.7, 63.6],
                        ["BM25 + BGE", 49.8, 68.3, 68.0],
                      ].map(([method, before, miniLm, bge]) => (
                        <div key={String(method)} className="flex h-full items-end gap-3">
                          {[
                            [before, "bg-slate-400"],
                            [miniLm, "bg-blue-500"],
                            [bge, "bg-emerald-500"],
                          ].map(([value, color], index) => (
                            <div key={index} className="flex h-full w-12 flex-col justify-end">
                              <span className="mb-1 text-center font-mono text-xs font-bold tabular-nums">
                                {Number(value).toFixed(1)}
                              </span>
                              <div
                                className={`w-full rounded-t-md ${color} shadow-sm`}
                                style={{ height: `${Number(value) * 2.25}px` }}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ml-10 grid grid-cols-2 px-10 pt-3 text-center text-sm font-semibold">
                    <span>BM25</span>
                    <span>BM25 + BGE</span>
                  </div>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Object Recall@1 · Higher is better
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                Object Recall@1 measures how often the first result is an exact
                reference object. MRR also improves with both rerankers.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                Reranking improves the top result for both candidate sets.
                MiniLM is slightly better in both cases.
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: Reranking cannot find evidence that is not already
                  in the top 10.
                </span>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 3
              </p>
              <h3 className="font-heading text-2xl">
                Can retrieval find all the evidence?
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                Some questions need several pieces of evidence. We compare
                finding any required evidence with finding the complete set.
              </p>
            </div>
            <div className="p-5 sm:p-6">
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[720px]">
                  <div className="mb-6 flex justify-center gap-6 text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm bg-blue-500" />
                      Any evidence Recall@10
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm bg-emerald-500" />
                      All evidence Recall@10
                    </span>
                  </div>

                  <div className="relative ml-12 h-[250px] border-b border-l border-slate-300 dark:border-slate-700">
                    {[0, 25, 50, 75, 100].map((tick) => (
                      <div
                        key={tick}
                        className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-800"
                        style={{ bottom: `${tick * 2.1}px` }}
                      >
                        <span className="absolute -left-10 -translate-y-1/2 font-mono text-[11px] text-muted-foreground">
                          {tick}
                        </span>
                      </div>
                    ))}

                    <div className="absolute inset-x-4 bottom-0 top-0 flex items-end justify-around">
                      {[
                        ["Object BM25", 91.1, 53.3],
                        ["Page BM25", 95.6, 63.3],
                        ["Object Qwen3", 95.6, 61.1],
                        ["BM25 + BGE hybrid", 98.9, 74.4],
                        ["BM25 + E5 hybrid", 100.0, 67.8],
                      ].map(([method, anyEvidence, allEvidence]) => (
                        <div
                          key={String(method)}
                          className="flex h-full items-end gap-2"
                          title={`${method}: any evidence ${Number(anyEvidence).toFixed(1)}%, all evidence ${Number(allEvidence).toFixed(1)}%`}
                        >
                          {[
                            [anyEvidence, "bg-blue-500"],
                            [allEvidence, "bg-emerald-500"],
                          ].map(([value, color], barIndex) => (
                            <div
                              key={barIndex}
                              className="flex h-full w-10 flex-col justify-end"
                            >
                              <span
                                className={`mb-1 text-center font-mono text-[11px] font-bold tabular-nums ${
                                  Number(value) === 100 || Number(value) === 74.4
                                    ? "text-blue-700 dark:text-blue-300"
                                    : "text-foreground"
                                }`}
                              >
                                {Number(value).toFixed(1)}
                              </span>
                              <div
                                className={`w-full rounded-t-md ${color} shadow-sm`}
                                style={{ height: `${Number(value) * 2.1}px` }}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ml-12 grid grid-cols-5 px-4 pt-3 text-center text-xs font-semibold leading-4">
                    {[
                      "Object BM25",
                      "Page BM25",
                      "Object Qwen3",
                      "BM25 + BGE hybrid",
                      "BM25 + E5 hybrid",
                    ].map((method) => (
                      <span key={method} className="px-2">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                Results cover 90 multi-evidence questions. All methods use
                reference-year filtering, and the hybrid results use RRF
                fusion.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                Finding one evidence item is common, but retrieving the
                complete set remains difficult because the required evidence
                can be spread across different pages, sections, or object
                types.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="rq3">
        <SectionHeader
          title={`RQ3. ${researchQuestions[2]}`}
          description="To answer RQ3, we use an end-to-end experiment: the same answer generator is given different evidence, and we compare the resulting answer accuracy."
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
            <h3 className="font-heading text-2xl">
              Answer accuracy on 660 questions
            </h3>
          </div>
          <div className="space-y-6 p-5 sm:p-6">
            {[
              ["Question only (closed-book)", 3.2],
              ["BM25-year evidence", 58.9],
              ["Hybrid + reranked evidence", 71.4],
              ["Annotated reference evidence", 82.4],
            ].map(([evidence, accuracy], index) => (
              <MetricBar
                key={String(evidence)}
                label={String(evidence)}
                value={Number(accuracy)}
                color={index === 3 ? "bg-teal-600" : "bg-blue-600"}
                highlight={index >= 2}
              />
            ))}
          </div>
          <div className="border-t bg-muted/20 px-5 py-4 text-sm leading-6 sm:px-6">
            <p className="text-muted-foreground">
              <strong className="text-foreground">
                Question only (closed-book)
              </strong>{" "}
              means that the model receives no retrieved evidence.{" "}
              <strong className="text-foreground">BM25-year</strong> and{" "}
              <strong className="text-foreground">Hybrid + reranked</strong> use
              automatically retrieved evidence.{" "}
              <strong className="text-foreground">
                Annotated reference evidence
              </strong>{" "}
              gives the model the evidence linked to each question in the
              benchmark.
            </p>
          </div>
        </div>
        <EvidenceConclusion>
          Better retrieved evidence leads to more accurate answers. However,
          even annotated reference evidence does not solve every question,
          especially layout-sensitive questions.
        </EvidenceConclusion>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          For multi-evidence questions, retrieval may find one useful evidence
          item while still missing the complete evidence set.
        </p>
      </section>

      <section>
        <SectionHeader title="What We Learned" />
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 dark:border-blue-900 dark:bg-blue-950/20">
            <p className="leading-7 text-blue-950 dark:text-blue-100">
              LongFinRAG shows that reliable financial RAG requires more than
              finding a relevant report. A system must locate the correct
              page, retrieve the complete evidence, and use that evidence
              correctly.
            </p>
          </div>
          <div className="rounded-2xl border bg-muted/20 p-6">
            <h3 className="font-heading text-xl">Scope</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              This is a controlled longitudinal study of one company and 15
              English annual reports. Cross-company, multilingual, and fully
              multimodal evaluation remain future work.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
