import Image from "next/image";

const researchQuestions = [
  "What helps the system find the right evidence?",
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

      <section>
        <SectionHeader
          title="How We Evaluate LongFinRAG"
          description="We evaluate LongFinRAG in two ways: evidence retrieval and end-to-end question answering. The first tests whether the system can find the right evidence, while the second tests whether better evidence leads to better answers."
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <Image
            src="/projects/finrag-equinor/evaluation-pipeline.png"
            alt="LongFinRAG evaluation pipeline showing evidence retrieval for RQ1 and RQ2 and end-to-end question answering for RQ3"
            width={1600}
            height={560}
            className="h-auto w-full"
          />
        </div>
      </section>

      <section id="rq1">
        <SectionHeader
          title={`RQ1. ${researchQuestions[0]}`}
          description="We test two things. First, we search all 15 reports or only the correct report. Second, we compare different amounts of retrieved content."
        />
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border bg-background">
            <div className="border-b bg-muted/30 px-5 py-5 sm:px-6">
              <p className="mb-1 font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                EXPERIMENT 1
              </p>
              <h3 className="font-heading text-2xl">
                Does knowing the correct report help?
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                We compare searching all 15 reports with searching only the
                correct report.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">Method</th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Find the exact evidence
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Find the correct page
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["BM25", "52.4%", "76.5%", "61.2%", "85.8%"],
                    ["BGE-M3", "71.5%", "83.0%", "79.1%", "89.8%"],
                    ["BM25 + E5", "67.1%", "84.5%", "75.5%", "91.4%"],
                  ].map(
                    (
                      [method, exactBefore, exactAfter, pageBefore, pageAfter],
                      index
                    ) => (
                      <tr
                        key={method}
                        className={index % 2 ? "bg-muted/35" : ""}
                      >
                        <td className="px-5 py-4 font-semibold sm:px-6">
                          {method}
                        </td>
                        <td className="px-5 py-4 text-right font-mono sm:px-6">
                          {exactBefore} <span aria-hidden="true">→</span>{" "}
                          <span
                            className={
                              index === 2
                                ? "font-bold text-blue-700 dark:text-blue-300"
                                : ""
                            }
                          >
                            {exactAfter}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-mono sm:px-6">
                          {pageBefore} <span aria-hidden="true">→</span>{" "}
                          <span
                            className={
                              index === 2
                                ? "font-bold text-blue-700 dark:text-blue-300"
                                : ""
                            }
                          >
                            {pageAfter}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Exact evidence</strong>{" "}
                means finding the paragraph or table that contains the answer.{" "}
                <strong className="text-foreground">Correct page</strong> means
                finding the page where that evidence appears.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                Searching only the correct report improves both results for all
                three methods. BM25 + E5 gives the highest results: 84.5% for
                the exact evidence and 91.4% for the correct page.
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: Knowing the correct report makes it easier to find
                  both the right page and the exact evidence.
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
                We search only within the correct report and compare objects,
                pages, page-windows, and object-windows.
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
                      Evidence found
                    </th>
                    <th className="px-5 py-3 text-right font-semibold sm:px-6">
                      Correct page found
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
                the objects on one PDF page. A{" "}
                <strong className="text-foreground">page-window</strong>{" "}
                contains up to three nearby pages. An{" "}
                <strong className="text-foreground">object-window</strong>{" "}
                contains eight nearby objects.
              </p>
              <p>
                <strong className="text-foreground">Evidence found</strong>{" "}
                means that one of the top 10 results contains the needed
                evidence.{" "}
                <strong className="text-foreground">Correct page found</strong>{" "}
                means that one of the top 10 results reaches the correct page.
              </p>
            </div>
            <div className="border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                Whole-page retrieval gives the best result for finding the
                evidence. For 91.2% of the questions, one of the top 10 results
                contains the needed evidence. Object-window retrieval gives the
                best result for finding the correct page, reaching it for 92.4%
                of the questions.
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: The best choice depends on what we want to find.
                  More context can help, but bigger is not always better.
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
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold sm:px-5">Method</th>
                    <th className="px-4 py-3 text-right font-semibold sm:px-5">
                      Exact object
                    </th>
                    <th className="px-4 py-3 text-right font-semibold sm:px-5">
                      Right page, wrong object
                    </th>
                    <th className="px-4 py-3 text-right font-semibold sm:px-5">
                      Adjacent page
                    </th>
                    <th className="px-4 py-3 text-right font-semibold sm:px-5">
                      Right report, wrong page
                    </th>
                    <th className="px-4 py-3 text-right font-semibold sm:px-5">
                      Wrong report
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["BM25", "52.4%", "8.8%", "6.7%", "23.6%", "8.5%"],
                    ["BM25-year", "76.5%", "9.2%", "5.0%", "9.2%", "0.0%"],
                    ["BGE-M3-year", "83.0%", "6.8%", "2.9%", "7.3%", "0.0%"],
                    ["E5-year", "80.0%", "7.9%", "4.8%", "7.3%", "0.0%"],
                    ["BM25 + BGE", "84.2%", "7.1%", "2.9%", "5.8%", "0.0%"],
                    ["BM25 + E5", "84.5%", "6.8%", "3.3%", "5.3%", "0.0%"],
                  ].map(([method, ...values], rowIndex) => (
                    <tr
                      key={method}
                      className={
                        rowIndex === 5
                          ? "bg-blue-50/70 dark:bg-blue-950/20"
                          : rowIndex % 2
                            ? "bg-muted/25"
                            : ""
                      }
                    >
                      <td className="px-4 py-4 font-semibold sm:px-5">{method}</td>
                      {values.map((value, columnIndex) => {
                        const isBest =
                          rowIndex === 5 && [0, 1, 3].includes(columnIndex);
                        return (
                          <td
                            key={`${method}-${columnIndex}`}
                            className={`px-4 py-4 text-right font-mono sm:px-5 ${isBest ? "font-bold text-blue-700 dark:text-blue-300" : ""}`}
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
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                For questions with several evidence objects, an exact-object
                hit means that at least one reference object is found. All
                methods except BM25 use reference-year filtering.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                BM25 can retrieve evidence from the wrong report. Searching
                only the correct report removes this error. BGE-M3, E5-large,
                and the hybrid methods find the exact evidence more often than
                BM25, but they can still select the wrong page or object.
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: Report filtering removes wrong-report errors, but
                  errors within the correct report remain.
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
                A cross-encoder reorders the same top-10 results.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Method</th>
                      <th className="px-5 py-3 text-right font-semibold">
                        <span className="block">Object Recall@1</span>
                        <span className="mt-0.5 block text-xs font-medium text-blue-100">
                          Before → After
                        </span>
                      </th>
                      <th className="px-5 py-3 text-right font-semibold">
                        <span className="block">MRR</span>
                        <span className="mt-0.5 block text-xs font-medium text-blue-100">
                          Before → After
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ["BM25", "41.1%", "64.7%", "0.524", "0.689"],
                      ["BGE-M3", "52.6%", "67.3%", "0.628", "0.728"],
                      ["E5-large", "48.6%", "64.7%", "0.590", "0.701"],
                      ["Qwen3-0.6B", "43.8%", "62.7%", "0.542", "0.675"],
                      ["BM25 + BGE", "49.8%", "68.3%", "0.616", "0.740"],
                      ["BM25 + E5", "46.8%", "68.2%", "0.595", "0.739"],
                      ["BM25 + Qwen3", "45.9%", "67.1%", "0.583", "0.725"],
                    ].map(([method, rankBefore, rankAfter, mrrBefore, mrrAfter], rowIndex) => (
                      <tr
                        key={method}
                        className={
                          rowIndex === 4
                            ? "bg-blue-50/70 dark:bg-blue-950/20"
                            : rowIndex % 2
                              ? "bg-muted/25"
                              : ""
                        }
                      >
                        <td className="px-5 py-4 font-semibold">{method}</td>
                        <td className="px-5 py-4 text-right font-mono">
                          {rankBefore} →{" "}
                          <span className={rowIndex === 4 ? "font-bold text-blue-700 dark:text-blue-300" : ""}>
                            {rankAfter}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-mono">
                          {mrrBefore} →{" "}
                          <span className={rowIndex === 4 ? "font-bold text-blue-700 dark:text-blue-300" : ""}>
                            {mrrAfter}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                Object Recall@1 measures how often the first result is an exact
                reference object. MRR summarizes the overall ranking.
              </p>
              <p className="border-l-4 border-blue-600 pl-4 font-medium">
                Reranking improves both the top result and the overall ranking
                for every retriever.
                <span className="mt-2 block font-semibold text-blue-700 dark:text-blue-300">
                  Takeaway: It cannot recover evidence that was not retrieved.
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
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                  <thead className="bg-blue-700 text-white">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Method</th>
                      <th className="px-5 py-3 text-right font-semibold">
                        Any evidence R@10
                      </th>
                      <th className="px-5 py-3 text-right font-semibold">
                        All evidence R@10
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ["Object BM25", "91.1%", "53.3%"],
                      ["Page BM25", "95.6%", "63.3%"],
                      ["Object Qwen3", "95.6%", "61.1%"],
                      ["BM25 + BGE hybrid", "98.9%", "74.4%"],
                      ["BM25 + E5 hybrid", "100.0%", "67.8%"],
                    ].map(([method, anyEvidence, allEvidence], rowIndex) => (
                      <tr
                        key={method}
                        className={
                          rowIndex === 3
                            ? "bg-blue-50/70 dark:bg-blue-950/20"
                            : rowIndex % 2
                              ? "bg-muted/25"
                              : ""
                        }
                      >
                        <td className="px-5 py-4 font-semibold">{method}</td>
                        <td className="px-5 py-4 text-right font-mono">
                          {anyEvidence}
                        </td>
                        <td
                          className={`px-5 py-4 text-right font-mono ${rowIndex === 3 ? "font-bold text-blue-700 dark:text-blue-300" : ""}`}
                        >
                          {allEvidence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
            </div>
            <div className="space-y-4 border-t px-5 py-5 text-sm leading-6 sm:px-6">
              <p className="text-muted-foreground">
                Results cover 90 multi-evidence questions. All methods use
                reference-year filtering.
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
                  ["Question only (closed-book)", "3.2%"],
                  ["BM25-year evidence", "58.9%"],
                  ["Hybrid + reranked evidence", "71.4%"],
                  ["Annotated reference evidence", "82.4%"],
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
          <strong>about 11 points</strong> below annotated reference evidence.
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
        <SectionHeader title="Scope" />
        <p className="max-w-4xl leading-7 text-muted-foreground">
          This is a controlled longitudinal study of one company and 15 English
          annual reports. Cross-company, multilingual, and fully multimodal
          evaluation remain future work.
        </p>
      </section>
    </div>
  );
}
