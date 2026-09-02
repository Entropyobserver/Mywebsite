const researchQuestions = [
  "Does finding the right report and the right page make it easier to find the exact evidence?",
  "Where does retrieval fail?",
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
          description="We start with 15 Equinor/Statoil annual reports covering 4,369 pages and turn them into a structured, traceable evidence corpus. The PDFs are first split into 100,150 layout objects, which are then filtered into 41,736 retrieval units, including paragraphs, headings, and tables. Each unit stays linked to its original report, page, and location. We then build a 720-item QA benchmark, with 660 answerable questions linked to reference evidence and 60 unanswerable questions."
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
          description="The benchmark covers nine question types, from direct factual and numerical questions to table-based, temporal, multi-hop, visual/layout, and unanswerable cases. We checked all 720 questions by hand and ran separate audits for PDF extraction and QA quality. The audits found that most extracted pages were suitable for RAG, and the QA items showed high agreement on overall quality, answer correctness, and evidence support."
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
          description="RQ1 is evaluated through two controlled comparisons. First, we compare searching all 15 reports with searching only the reference-year report. Second, while keeping BM25 and the reference-year filter fixed, we compare objects, pages, and context windows as retrieval units."
        />
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 1
              </p>
              <h3 className="font-heading text-2xl">
                Does searching the correct report help?
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">
                      BM25 setting
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Object R@10
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Page R@10
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-5 py-4 font-medium sm:px-6">
                      Unrestricted
                    </td>
                    <td className="px-5 py-4 text-right font-mono sm:px-6">
                      51.5%
                    </td>
                    <td className="px-5 py-4 text-right font-mono sm:px-6">
                      60.3%
                    </td>
                  </tr>
                  <tr className="bg-blue-50/70 dark:bg-blue-950/20">
                    <td className="px-5 py-4 font-semibold sm:px-6">
                      Reference-year filtered
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-blue-700 dark:text-blue-300 sm:px-6">
                      75.6%
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-blue-700 dark:text-blue-300 sm:px-6">
                      85.0%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Object Recall@10</strong>{" "}
                requires the exact reference evidence object to appear in the
                top 10.{" "}
                <strong className="text-foreground">Page Recall@10</strong>{" "}
                requires a result from the same report and page. Reference-year
                filtering uses the benchmark&apos;s known report year, so it is
                a controlled oracle setting rather than a learned report router.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                When BM25 searches all 15 reports, it finds the exact evidence
                in the top 10 for 51.5% of questions. When we give the system
                the correct report year, this rises to 75.6%. This shows that
                report-year information can substantially improve retrieval.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 2
              </p>
              <h3 className="font-heading text-2xl">
                Does retrieving more context help?
              </h3>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
                In this experiment, retrieval is restricted to the{" "}
                <strong className="text-foreground">correct report year</strong>
                , as in Experiment 1. We compare four retrieval units to see
                whether adding more context helps retrieve the reference
                evidence.
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
                      Chunk Recall@10
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Page Recall@10
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Object BM25-year", "75.6%", "85.0%"],
                    ["Page BM25-year", "90.5%", "90.5%"],
                    ["Page-window", "87.6%", "87.6%"],
                    ["Object-window", "88.3%", "91.7%"],
                  ].map(([unit, chunkRecall, pageRecall], index) => (
                    <tr key={unit} className={index % 2 ? "bg-muted/35" : ""}>
                      <td className="px-5 py-4 font-medium sm:px-6">{unit}</td>
                      <td
                        className={`px-5 py-4 text-right font-mono sm:px-6 ${index === 1 ? "font-bold text-blue-700 dark:text-blue-300" : ""}`}
                      >
                        {chunkRecall}
                      </td>
                      <td
                        className={`px-5 py-4 text-right font-mono sm:px-6 ${index === 3 ? "font-bold text-blue-700 dark:text-blue-300" : ""}`}
                      >
                        {pageRecall}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-2 border-t bg-muted/20 px-5 py-4 text-xs leading-5 text-muted-foreground sm:px-6 sm:text-sm sm:leading-6">
              <p>
                An <strong className="text-foreground">object</strong> is one
                paragraph, heading, or table. A{" "}
                <strong className="text-foreground">page</strong> contains all
                retrieval objects on one PDF page. A{" "}
                <strong className="text-foreground">page-window</strong>{" "}
                combines up to three consecutive pages: the previous, current,
                and next pages. An{" "}
                <strong className="text-foreground">object-window</strong>{" "}
                combines eight neighboring objects within the same report, with
                a two-object overlap.
              </p>
              <p>
                <strong className="text-foreground">Chunk Recall@10</strong>{" "}
                measures whether at least one of the top 10 retrieved chunks
                contains an annotated reference evidence object.{" "}
                <strong className="text-foreground">Page Recall@10</strong>{" "}
                measures whether at least one of the top 10 chunks covers the
                same report and page as a reference evidence object.
              </p>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p>
                Whole-page retrieval gets the highest Chunk Recall@10, giving
                the best observed evidence coverage. Expanding the unit to a
                three-page window does not improve this further. Object windows
                get the highest observed Page Recall@10.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                <strong>Conclusion:</strong> More context helps to a point, but
                bigger retrieval units are not always better—and finding the
                evidence in a chunk does not mean finding the exact supporting
                object.
              </p>
            </div>
          </div>
        </div>
        <EvidenceConclusion>
          Finding the correct report produces the largest improvement in exact
          evidence retrieval. Larger retrieval units improve evidence coverage,
          but finding a page that contains the evidence is not the same as
          retrieving the exact supporting object.
        </EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader
          title={`RQ2. ${researchQuestions[1]}`}
          description="Finding the correct report is only the first step. Even within the correct report, retrieval can still fail in different ways."
        />
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border bg-background lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6 lg:border-b-0 lg:border-r">
              <h3 className="font-heading text-2xl">
                Does it find the right evidence?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                We give each retrieval method the correct report and examine its
                top-10 results. This shows whether it finds the exact evidence
                or retrieves evidence from the right page or report but misses
                the correct object.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                BM25 represents sparse keyword retrieval, BGE-M3 represents
                dense semantic retrieval, and BM25 + E5 represents hybrid
                retrieval.
              </p>
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="px-5 py-3 font-semibold sm:px-6">
                        Retrieval method
                      </th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        Exact evidence found
                      </th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        Right page, wrong object
                      </th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        Right report, wrong page
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { method: "BM25", values: ["75.6%", "9.4%", "9.7%"] },
                      {
                        method: "BGE-M3",
                        values: ["82.1%", "6.8%", "8.2%"],
                      },
                      {
                        method: "BM25 + E5",
                        values: ["83.8%", "7.0%", "5.9%"],
                      },
                    ].map(({ method, values }, rowIndex) => (
                      <tr
                        key={method}
                        className={
                          rowIndex === 2
                            ? "bg-blue-50/70 dark:bg-blue-950/20"
                            : ""
                        }
                      >
                        <td className="px-5 py-4 font-semibold sm:px-6">
                          {method}
                        </td>
                        {values.map((value, columnIndex) => {
                          const isBest =
                            (rowIndex === 1 && columnIndex === 1) ||
                            (rowIndex === 2 &&
                              (columnIndex === 0 || columnIndex === 2));
                          return (
                            <td
                              key={`${method}-${columnIndex}`}
                              className={`px-5 py-4 text-right font-mono sm:px-6 ${isBest ? "font-bold text-blue-700 dark:text-blue-300" : ""}`}
                            >
                              {value}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mx-5 mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100 sm:mx-6">
                Dense and hybrid retrieval find the exact evidence more often
                than BM25. BM25 + E5 achieves the highest exact-evidence rate
                and the lowest wrong-page rate, while BGE-M3 has the lowest
                same-page wrong-object rate.
              </p>
              <p className="mx-5 mb-5 mt-3 text-xs italic leading-5 text-muted-foreground sm:mx-6">
                Note: Rates use all 660 answerable questions. Adjacent-page
                cases are not shown.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6 lg:border-b-0 lg:border-r">
              <h3 className="font-heading text-2xl">
                Is the right evidence ranked first?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Even when the correct evidence is retrieved, it may not appear
                at the top. We therefore compare how often the exact evidence is
                ranked first before and after reranking.
              </p>
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] text-left text-sm">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="px-5 py-3 font-semibold sm:px-6">
                        Measure
                      </th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        Before reranking
                      </th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        After reranking
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-5 py-4 font-medium sm:px-6">
                        Exact evidence ranked first
                      </td>
                      <td className="px-5 py-4 text-right font-mono sm:px-6">
                        40.2%
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-blue-700 dark:text-blue-300 sm:px-6">
                        63.6%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="m-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100 sm:m-6">
                Reranking moves the correct evidence higher, but cannot recover
                evidence that was not retrieved.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border bg-background lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6 lg:border-b-0 lg:border-r">
              <h3 className="font-heading text-2xl">
                Can it find all the evidence?
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Some questions require multiple pieces of evidence. For these
                multi-hop questions, finding one relevant piece is not enough;
                the retrieval method needs to find all the evidence required to
                answer the question.
              </p>
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px] text-left text-sm">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="px-5 py-3 font-semibold sm:px-6">
                        Multi-hop outcome
                      </th>
                      <th className="px-5 py-3 text-right font-semibold sm:px-6">
                        Recall@10
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-5 py-4 font-medium sm:px-6">
                        At least one required evidence item
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-blue-700 dark:text-blue-300 sm:px-6">
                        91.1%
                      </td>
                    </tr>
                    <tr className="bg-muted/35">
                      <td className="px-5 py-4 font-medium sm:px-6">
                        All required evidence
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-blue-700 dark:text-blue-300 sm:px-6">
                        53.3%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mx-5 mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold leading-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100 sm:mx-6">
                Finding some evidence is much easier than finding all the
                evidence needed.
              </p>
              <p className="mx-5 mb-5 mt-3 text-xs italic leading-5 text-muted-foreground sm:mx-6">
                Note: Multi-hop evaluation covers 90 questions.
              </p>
            </div>
          </div>
        </div>
        <EvidenceConclusion>
          Retrieval can fail at three stages:{" "}
          <strong>finding the right evidence</strong>,{" "}
          <strong>ranking it high enough</strong>, and{" "}
          <strong>retrieving the complete evidence set</strong>.
        </EvidenceConclusion>
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold sm:px-6">
                    Evidence given to the generator
                  </th>
                  <th className="px-5 py-3 text-right font-semibold sm:px-6">
                    Answer accuracy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Question only (closed-book)", "2.9%"],
                  ["BM25-year evidence", "58.5%"],
                  ["Hybrid + reranked evidence", "70.9%"],
                  ["Annotated reference evidence", "82.0%"],
                ].map(([evidence, accuracy], index) => (
                  <tr key={evidence} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium sm:px-6">
                      {evidence}
                    </td>
                    <td
                      className={`px-5 py-4 text-right font-mono sm:px-6 ${index >= 2 ? "font-bold text-blue-700 dark:text-blue-300" : ""}`}
                    >
                      {accuracy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          Hybrid + reranked evidence improves answer accuracy by{" "}
          <strong>12.4 percentage points</strong> over BM25-year, but remains{" "}
          <strong>11.1 points</strong> below annotated reference evidence.
          Better evidence leads to more accurate answers; the remaining gap
          shows that both retrieval and generation can still improve.
        </EvidenceConclusion>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          RQ2&apos;s multi-hop results explain part of this gap: retrieval may
          find relevant evidence while still missing information required for a
          complete answer.
        </p>
      </section>

      <section>
        <SectionHeader title="Exploratory Recovery" />
        <h3 className="font-heading text-2xl">
          Can the system recover when retrieval goes wrong?
        </h3>
        <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">
          All 720 questions are retrieved once. The system then checks which
          results look unreliable. If a likely problem is detected, it tries a
          more targeted search; otherwise, it keeps the original result.
        </p>
        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-center font-semibold text-blue-950 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100">
          Retrieve → Check → Recover if needed → Keep the improved result
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-background">
          <div className="border-b bg-muted/30 px-5 py-4 sm:px-6">
            <h4 className="font-heading text-xl">
              Different problems trigger different recovery actions
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold sm:px-6">Problem</th>
                  <th className="px-5 py-3 font-semibold sm:px-6">
                    What the system does
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Wrong report", "Search the year or most likely reports"],
                  ["Wrong page", "Search likely pages and nearby pages"],
                  ["Wrong object", "Search again within the likely pages"],
                  ["Missing hop", "Split the question and search each part"],
                ].map((row, index) => (
                  <tr key={row[0]} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium sm:px-6">{row[0]}</td>
                    <td className="px-5 py-4 sm:px-6">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 max-w-4xl leading-7 text-muted-foreground">
          The detector flags{" "}
          <strong className="text-foreground">250 of 720 questions</strong> for
          recovery. We compare this selective strategy with no recovery and with
          applying recovery to every question.
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold sm:px-6">Policy</th>
                  <th className="px-5 py-3 text-right font-semibold sm:px-6">
                    Object Recall@10
                  </th>
                  <th className="px-5 py-3 text-right font-semibold sm:px-6">
                    Recovery triggered
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-5 py-4 font-medium sm:px-6">No recovery</td>
                  <td className="px-5 py-4 text-right font-mono tabular-nums sm:px-6">
                    70.2%
                  </td>
                  <td className="px-5 py-4 text-right font-mono tabular-nums sm:px-6">
                    0
                  </td>
                </tr>
                <tr className="bg-muted/35">
                  <td className="px-5 py-4 font-medium sm:px-6">
                    Selective recovery
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold tabular-nums text-blue-700 sm:px-6 dark:text-blue-300">
                    71.7%
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold tabular-nums text-blue-700 sm:px-6 dark:text-blue-300">
                    250
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium sm:px-6">
                    Always-on recovery
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold tabular-nums text-blue-700 sm:px-6 dark:text-blue-300">
                    71.7%
                  </td>
                  <td className="px-5 py-4 text-right font-mono tabular-nums sm:px-6">
                    720
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="border-t bg-muted/20 px-5 py-4 text-sm leading-6 text-muted-foreground sm:px-6">
            All 720 questions are retrieved initially. Object Recall@10 is
            measured on the 660 answerable questions.
          </p>
        </div>
      </section>
    </div>
  );
}
