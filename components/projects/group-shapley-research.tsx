import Image from "next/image";

const researchQuestions = [
  "How do different training-data groups contribute to translation quality, terminology performance, and written-standard behavior?",
  "To what extent can group size alone explain these contributions?",
  "How do these attribution patterns compare across encoder–decoder and decoder-only architectures?",
];

const shapleyRows = [
  ["High-Bokmål", 19.83, 13.56, 0.273, 0.381, -0.338],
  ["Boundary", 2.04, 1.08, 0.038, -0.016, -0.008],
  ["Nynorsk-like", 3.21, 2.6, -0.028, -0.459, 0.469],
  ["Uncertain-other", 0.61, 0.56, 0.028, 0.012, -0.007],
] as const;

const metricMaxAbs = [19.83, 13.56, 0.273, 0.459, 0.469] as const;

const subsetRows = [
  { reference: "High-Bokmål", overlap: "Low", n: 373, bleu: -5.17 },
  { reference: "High-Bokmål", overlap: "Mid", n: 678, bleu: -2.92 },
  { reference: "High-Bokmål", overlap: "High", n: 262, bleu: -3.47 },
  { reference: "Nynorsk-like", overlap: "Low", n: 32, bleu: 3.87 },
  { reference: "Nynorsk-like", overlap: "Mid", n: 99, bleu: 22.52 },
  { reference: "Nynorsk-like", overlap: "High", n: 159, bleu: 41.97 },
];

const architectureRows = [
  ["High-Bokmål → BLEU", "+19.83", "+15.31"],
  ["High-Bokmål → TermF1", "+0.273", "+0.148"],
  ["High-Bokmål → Bokmål output", "+38.1 pp", "+39.1 pp"],
  ["Nynorsk-like → BLEU", "+3.21", "+1.56"],
  ["Nynorsk-like → TermF1", "−0.028", "−0.092"],
  ["Nynorsk-like → Bokmål output", "−45.9 pp", "−45.9 pp"],
  ["Nynorsk-like → Nynorsk-like output", "+46.9 pp", "+47.8 pp"],
  ["Uncertain-other → BLEU", "+0.61", "−1.30"],
] as const;

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
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

function HeatmapCell({
  value,
  maxAbs,
  label,
  digits,
}: {
  value: number;
  maxAbs: number;
  label: string;
  digits?: number;
}) {
  const positive = value > 0;
  const displayDigits = digits ?? (Math.abs(value) < 1 ? 3 : 2);
  const intensity = 0.12 + 0.68 * (Math.abs(value) / maxAbs);

  return (
    <div
      role="cell"
      aria-label={`${label}: ${positive ? "positive" : "negative"} ${Math.abs(value).toFixed(displayDigits)}`}
      className="flex min-h-[64px] items-center justify-center rounded-xl px-3 py-3 text-center font-mono text-sm font-semibold tabular-nums text-slate-950 dark:text-white sm:text-base"
      style={{
        backgroundColor: positive
          ? `rgba(59, 130, 246, ${intensity})`
          : `rgba(239, 68, 68, ${intensity})`,
      }}
    >
      {positive ? "+" : ""}
      {value.toFixed(displayDigits)}
    </div>
  );
}

export default function GroupShapleyResearch() {
  return (
    <div className="space-y-16">
      <section>
        <SectionHeader title="Research Questions" />
        <div className="space-y-3">
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

      <section id="training-data-groups">
        <SectionHeader title="Training-Data Groups" />
        <div className="mb-6 max-w-3xl space-y-4 leading-7 text-muted-foreground">
          <p>
            We use{" "}
            <strong className="font-semibold text-foreground">
              SLIDE scores
            </strong>{" "}
            to divide the 13,935 training pairs into four mutually exclusive
            groups. These groups are used as the{" "}
            <strong className="font-semibold text-foreground">
              units for Shapley attribution
            </strong>
            .
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Group</th>
                  <th className="px-5 py-4 font-semibold">Rule</th>
                  <th className="px-5 py-4 text-right font-semibold">Pairs</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-5 py-4 font-semibold">High-Bokmål</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="italic">
                      s<sub>NB</sub>
                    </span>{" "}
                    ≥ 0.80 and{" "}
                    <span className="italic">
                      s<sub>NN</sub>
                    </span>{" "}
                    &lt; 0.30
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-semibold tabular-nums">
                    10,113
                  </td>
                </tr>
                <tr className="bg-muted/35">
                  <td className="px-5 py-4 font-semibold">Boundary</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="italic">
                      s<sub>NB</sub>
                    </span>{" "}
                    ≥ 0.50 and{" "}
                    <span className="italic">
                      s<sub>NN</sub>
                    </span>{" "}
                    ≥ 0.50
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-semibold tabular-nums">
                    880
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-semibold">Nynorsk-like</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="italic">
                      s<sub>NN</sub>
                    </span>{" "}
                    ≥ 0.50 and{" "}
                    <span className="italic">
                      s<sub>NB</sub>
                    </span>{" "}
                    &lt; 0.50
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-semibold tabular-nums">
                    2,645
                  </td>
                </tr>
                <tr className="bg-muted/35">
                  <td className="px-5 py-4 font-semibold">Uncertain-other</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    All remaining cases
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-semibold tabular-nums">
                    297
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Here,{" "}
          <span className="italic">
            s<sub>NB</sub>
          </span>{" "}
          and{" "}
          <span className="italic">
            s<sub>NN</sub>
          </span>{" "}
          are independent SLIDE scores ranging from 0 to 1.
        </p>
        <div className="mt-6">
          <h3 className="font-heading text-2xl">What is in each group?</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-background p-5">
              <p className="font-semibold">High-Bokmål</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Mostly complete Bokmål sentences about petroleum production,
                drilling, licences, fields, and geology.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="font-semibold">Nynorsk-like</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Mostly complete petroleum-domain sentences containing
                recognizable Nynorsk words and grammatical forms.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="font-semibold">Boundary</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A mixture of ordinary Bokmål sentences and short items such as
                contact lines, captions, dates, measurements, and headings.
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-5">
              <p className="font-semibold">Uncertain-other</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Mostly short metadata-like items: dates, coordinates, company
                names, headings, links, labels, and text fragments.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>
            These are operational units for Shapley attribution, not gold
            linguistic categories.
          </strong>{" "}
          The Boundary group mainly reflects classifier uncertainty rather than
          a clear written-standard category.
        </p>
      </section>

      <section id="coalition-space">
        <SectionHeader title="All 16 Training-Data Combinations" />
        <div className="overflow-hidden rounded-2xl border bg-muted/20 lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center p-5 sm:p-6 lg:border-r">
            <a
              href="/projects/group-shapley-attribution/coalition-space.svg"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the full 16-coalition diagram"
              className="mx-auto block w-full max-w-[92%] overflow-hidden rounded-xl border bg-background"
            >
              <Image
                src="/projects/group-shapley-attribution/coalition-space.svg"
                alt="All sixteen coalitions formed from the four training-data groups, organized by coalition size"
                width={1600}
                height={1040}
                className="h-auto w-full"
              />
            </a>
            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              The empty coalition uses the base model; the other 15 are
              fine-tuned separately.
            </p>
          </div>

          <div className="flex flex-col justify-center border-t p-5 sm:p-6 lg:border-t-0">
            <p className="leading-7 text-muted-foreground">
              A{" "}
              <strong className="font-semibold text-foreground">
                coalition
              </strong>{" "}
              is one possible selection of the four groups. Each group is either
              included or excluded.
            </p>
            <div className="my-4 rounded-xl border border-blue-200 bg-blue-50 px-5 py-2.5 text-center dark:border-blue-900 dark:bg-blue-950/30">
              <p className="font-heading text-2xl text-blue-700 dark:text-blue-300 sm:text-3xl">
                2<sup className="text-base">4</sup> = 16 coalitions
              </p>
            </div>

            <h3 className="font-heading text-xl">Exact Shapley Value</h3>
            <div className="mt-3 rounded-xl border bg-background px-4 py-4">
              <div
                className="text-center font-serif text-foreground"
                role="math"
                aria-label="phi sub g of m equals the sum over coalitions S not containing g of the Shapley weight multiplied by the change in utility caused by adding group g"
              >
                <div className="text-lg sm:text-xl">
                  φ<sub>g</sub>(m) = ∑ w(S,g) Δ<sub>g</sub>v<sub>m</sub>(S)
                </div>
                <div className="mt-1 font-sans text-[11px] text-muted-foreground">
                  S ⊆ G ∖ {"{g}"}
                </div>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/40 px-3 py-3">
                    <div className="mb-2 text-xs text-muted-foreground">
                      Shapley weight
                    </div>
                    <span>
                      w(S,g) ={" "}
                      <span className="inline-flex flex-col align-middle text-center">
                        <span className="border-b border-foreground px-1 pb-0.5">
                          |S|!(|G| − |S| − 1)!
                        </span>
                        <span className="pt-0.5">|G|!</span>
                      </span>
                    </span>
                  </div>
                  <div className="rounded-lg bg-muted/40 px-3 py-3">
                    <div className="mb-2 text-xs text-muted-foreground">
                      Marginal contribution
                    </div>
                    <span>
                      Δ<sub>g</sub>v<sub>m</sub>(S) =
                    </span>
                    <span className="mt-1 block whitespace-nowrap">
                      v<sub>m</sub>(S ∪ {"{g}"}) − v<sub>m</sub>(S)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              For each group <span className="italic">g</span>, its exact
              Shapley value is the weighted average change in metric{" "}
              <span className="italic">m</span> when that group is added across
              every possible coalition.
            </p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              <span className="font-serif italic text-foreground">G</span> = all
              groups ·{" "}
              <span className="font-serif italic text-foreground">S</span> = a
              coalition without g ·{" "}
              <span className="font-serif italic text-foreground">
                v<sub>m</sub>(S)
              </span>{" "}
              = S’s score on metric m
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Experimental Pipeline" />
        <div className="grid gap-7 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <a
              href="/projects/group-shapley-attribution/attribution-overview.png"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the full experimental pipeline"
              className="block"
            >
              <Image
                src="/projects/group-shapley-attribution/attribution-overview.png"
                alt="Full group-level attribution protocol from corpus grouping and coalition construction through model training, evaluation, exact Shapley attribution, cross-branch comparison, and robustness checks"
                width={2720}
                height={3200}
                className="mx-auto h-auto max-h-[760px] w-auto max-w-full rounded-xl object-contain"
              />
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Complete group-level attribution pipeline.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              {
                title: "Group the corpus",
                primary: "13,935 training pairs → 4 operational groups",
                secondary: "SLIDE-based grouping · 200-item manual audit",
              },
              {
                title: "Enumerate coalitions",
                primary: "4 groups → 2⁴ = 16 coalitions",
                secondary: "including the empty coalition",
              },
              {
                title: "Train and evaluate",
                primary: "15 non-empty coalitions · 3 seeds · 2 architectures",
                secondary: "NLLB-600M · NorMistral-7B-warm",
              },
              {
                title: "Compute exact Shapley values",
                primary: "Use all 16 coalition scores",
                secondary: "→ one contribution value per group and metric",
              },
              {
                title: "Stress-test the results",
                primary:
                  "Size-matched random groups · test subsets · bootstrap CIs",
                secondary: "training-schedule and grouping-threshold checks",
              },
            ].map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-heading text-lg leading-6 text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-6 text-foreground">
                    {step.primary}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {step.secondary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader
          title={"RQ1. " + researchQuestions[0]}
          description={
            <span className="italic">
              Exact Shapley attribution · NLLB-600M · all 16 coalitions ·
              three-seed average
            </span>
          }
        />
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border bg-background p-3 sm:p-5">
          <div className="overflow-x-auto pb-2">
            <div
              role="table"
              aria-label="Exact Shapley contributions by training group and evaluation metric"
              className="grid min-w-[860px] grid-cols-[170px_repeat(5,minmax(120px,1fr))] gap-2"
            >
              {[
                "Training group",
                "BLEU",
                "chrF",
                "TermF1",
                "High-Bokmål output change (pp)",
                "Nynorsk-like output change (pp)",
              ].map((heading, index) => (
                <div
                  key={heading}
                  role="columnheader"
                  className={`flex min-h-[48px] items-center px-3 py-2 text-sm font-semibold text-muted-foreground ${index === 0 ? "justify-start" : "justify-center text-center"}`}
                >
                  {heading}
                </div>
              ))}

              {shapleyRows.map(([name, ...values]) => (
                <div className="contents" role="row" key={name}>
                  <div
                    role="rowheader"
                    className="flex min-h-[64px] items-center px-3 py-3 text-sm font-semibold sm:text-base"
                  >
                    {name}
                  </div>
                  {values.map((value, index) => (
                    <HeatmapCell
                      key={`${name}-${index}`}
                      value={index >= 3 ? value * 100 : value}
                      maxAbs={
                        index >= 3
                          ? metricMaxAbs[index] * 100
                          : metricMaxAbs[index]
                      }
                      digits={index >= 3 ? 1 : undefined}
                      label={`${name}, ${["BLEU", "chrF", "TermF1", "High-Bokmål output change", "Nynorsk-like output change"][index]}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span
                className="h-4 w-7 rounded bg-blue-400"
                aria-hidden="true"
              />
              Positive contribution
            </span>
            <span className="flex items-center gap-2">
              <span className="h-4 w-7 rounded bg-red-400" aria-hidden="true" />
              Negative contribution
            </span>
            <span>
              pp = percentage points · Intensity normalized within each metric
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-5xl">
          <EvidenceConclusion>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
              Key Finding
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-bold">High-Bokmål → broad gains</p>
                <p className="mt-1 text-sm font-normal">
                  ↑ Translation quality · ↑ terminology · ↑ High-Bokmål output
                </p>
              </div>
              <div>
                <p className="font-bold">Nynorsk-like → mixed effects</p>
                <p className="mt-1 text-sm font-normal">
                  ↑ Translation quality · ↓ terminology · ↑ Nynorsk-like output
                </p>
              </div>
            </div>
            <p className="mt-4 border-t border-blue-200 pt-4 font-bold dark:border-blue-900">
              The same training data can improve one aspect of model behavior
              while harming another.
            </p>
          </EvidenceConclusion>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-3xl leading-tight lg:text-4xl">
              Why does Nynorsk-like data have positive value?
            </h2>
          </div>
          <p className="shrink-0 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm dark:border-blue-900 dark:bg-blue-950/30">
            Overall contribution on the full test set:{" "}
            <strong className="text-blue-700 dark:text-blue-300">
              +3.21 BLEU
            </strong>
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border bg-background p-4">
            <h3 className="font-heading text-lg">
              1. Group the test references
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use the SLIDE classifier to retain two reference groups:
            </p>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm font-semibold">
              <li className="rounded-full bg-muted px-3 py-1">High-Bokmål</li>
              <li className="rounded-full bg-muted px-3 py-1">Nynorsk-like</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <h3 className="font-heading text-lg">2. Measure source overlap</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              For each English test source, find the most similar English
              training source.
            </p>
            <p className="mt-3 text-center font-serif text-sm">
              overlap = max(token Jaccard, 5-gram Jaccard, 5-gram containment)
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
              <span className="rounded-full bg-muted px-3 py-1">
                <strong>Low:</strong> &lt;0.30
              </span>
              <span className="rounded-full bg-muted px-3 py-1">
                <strong>Mid:</strong> 0.30≤s&lt;0.70
              </span>
              <span className="rounded-full bg-muted px-3 py-1">
                <strong>High:</strong> ≥0.70
              </span>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-4">
            <h3 className="font-heading text-lg">
              3. Recompute attribution within each subset
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Using the saved predictions from all 16 coalitions, recompute the
              Nynorsk-like group’s BLEU Shapley value for each reference ×
              overlap subset. No models are retrained.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl border bg-background">
          <div className="grid min-w-[680px] grid-cols-[1.2fr_repeat(3,1fr)] text-sm">
            {[
              "Reference standard",
              "Low overlap",
              "Mid overlap",
              "High overlap",
            ].map((heading) => (
              <div
                key={heading}
                className="border-b bg-muted/40 px-4 py-3 font-semibold text-muted-foreground"
              >
                {heading}
              </div>
            ))}
            {["High-Bokmål", "Nynorsk-like"].flatMap((reference) => [
              <div
                key={`${reference}-label`}
                className="border-b px-4 py-4 font-semibold last:border-b-0"
              >
                {reference}
              </div>,
              ...subsetRows
                .filter((row) => row.reference === reference)
                .map((row) => (
                  <div
                    key={`${reference}-${row.overlap}`}
                    className="border-b px-4 py-4 last:border-b-0"
                  >
                    <span
                      className={`font-mono font-semibold tabular-nums ${row.bleu > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                    >
                      {row.bleu > 0 ? "+" : ""}
                      {row.bleu.toFixed(2)}
                    </span>{" "}
                    <span className="text-xs italic text-muted-foreground">
                      (n={row.n})
                    </span>
                  </div>
                )),
            ])}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="font-heading text-lg">Key Finding</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              High-Bokmål references → negative at every overlap level
            </p>
            <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              Nynorsk-like references → positive at every overlap level
            </p>
            <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              Within Nynorsk-like references, higher source overlap is
              associated with substantially larger gains.
            </p>
          </div>
        </div>
      </section>

      <section id="rq2">
        <SectionHeader title={"RQ2. " + researchQuestions[1]} />
        <div className="space-y-6 rounded-2xl border bg-muted/20 p-5 sm:p-7">
          <div>
            <a
              href="/projects/group-shapley-attribution/random-baseline-barchart.png"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the size-matched baseline chart at full size"
            >
              <Image
                src="/projects/group-shapley-attribution/random-baseline-barchart.png"
                alt="True High-Bokmål group compared with random same-size groups across quality, terminology, and written-standard Shapley values"
                width={1600}
                height={900}
                className="mx-auto h-auto w-full rounded-xl border bg-white"
              />
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              True High-Bokmål group versus random same-size groups.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["BLEU", "19.83", "11.85"],
              ["chrF", "13.56", "7.88"],
              ["TermF1", ".273", ".088"],
            ].map(([metric, actual, random]) => (
              <div key={metric} className="rounded-xl border bg-background p-4">
                <p className="text-sm font-semibold">{metric}</p>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">True group</span>
                    <p className="font-mono text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {actual}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Random</span>
                    <p className="font-mono text-xl font-semibold">{random}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 max-w-3xl space-y-4 leading-7 text-muted-foreground">
          <p>
            If group size alone drives the attribution, random groups with the
            same size should produce similar Shapley values.
          </p>
          <p>
            We compare the true High-Bokmål group with{" "}
            <strong className="font-semibold text-foreground">
              three random groups of the same size
            </strong>
            . The random groups contain the same number of training examples,
            but different examples.
          </p>
          <p>
            The true High-Bokmål group has substantially higher Shapley values
            than the random groups across{" "}
            <strong className="font-semibold text-foreground">
              translation quality and terminology
            </strong>
            . Thus, simply having the same amount of training data does not
            reproduce the contribution of the true group.
          </p>
        </div>
        <EvidenceConclusion>
          <strong>
            Group size matters, but the identity of the training examples
            matters more.
          </strong>
        </EvidenceConclusion>
      </section>

      <section id="rq3">
        <SectionHeader
          title={"RQ3. " + researchQuestions[2]}
          description={
            <>
              We compare the group-level Shapley effects in{" "}
              <strong className="font-semibold text-foreground">
                NLLB-600M (encoder–decoder)
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-foreground">
                NorMistral-7B-warm (decoder-only)
              </strong>
              . The table shows representative results for{" "}
              <strong className="font-semibold text-foreground">
                translation quality, terminology, and written-standard behavior
              </strong>
              .
            </>
          }
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    Attribution effect
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">NLLB</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    NorMistral
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {architectureRows.map(([effect, nllb, mistral], index) => (
                  <tr key={effect} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium">{effect}</td>
                    {[nllb, mistral].map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className={`px-5 py-4 text-right font-mono font-semibold tabular-nums ${value.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t px-5 py-4 text-sm italic leading-6 text-muted-foreground">
            Output-rate values are Shapley contributions to output proportions,
            reported in percentage points (pp).
          </p>
        </div>
        <div className="mt-6 max-w-3xl space-y-4 leading-7 text-muted-foreground">
          <p>
            The main effects are similar in both architectures.{" "}
            <strong className="font-semibold text-foreground">
              High-Bokmål data makes the largest positive contribution to BLEU
              and also increases Bokmål output. Nynorsk-like data shows the
              opposite written-standard effect: it reduces Bokmål output and
              increases Nynorsk-like output in both models.
            </strong>
          </p>
          <p>
            Some smaller effects differ between the models. For example,{" "}
            <strong className="font-semibold text-foreground">
              Uncertain-other contributes +0.61 BLEU in NLLB but −1.30 BLEU in
              NorMistral.
            </strong>
          </p>
        </div>
        <EvidenceConclusion>
          <strong>
            Overall, both architectures show the same main attribution patterns,
            but some smaller group effects differ.
          </strong>
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Robustness and Data Audit" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1,000", "sentence-level bootstrap samples", ""],
            ["3", "training seeds per architecture", ""],
            ["200", "manually audited examples", ""],
            ["94.5%", "annotator agreement", "Cohen’s κ = 0.918"],
          ].map(([value, label, detail]) => (
            <div
              key={label}
              className="rounded-2xl border bg-background p-5 text-center"
            >
              <p className="font-heading text-2xl text-blue-600 dark:text-blue-400">
                {value}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {label}
              </p>
              {detail && (
                <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-4 rounded-2xl border bg-muted/20 p-5 leading-7 text-muted-foreground sm:p-6">
          <p>
            We test the reliability of the attribution results using{" "}
            <strong className="font-semibold text-foreground">
              multiple training seeds, sentence-level bootstrap resampling, an
              alternative training schedule, and manual group auditing
            </strong>
            .
          </p>
          <p>
            The main effects remain stable under test-set resampling.
            High-Bokmål has a BLEU Shapley value of{" "}
            <strong className="font-semibold text-foreground">19.83</strong>{" "}
            (95% bootstrap CI:{" "}
            <strong className="font-semibold text-foreground">
              [18.89, 20.76]
            </strong>
            ), while the Nynorsk-like contribution to High-Bokmål output is{" "}
            <strong className="font-semibold text-foreground">−0.459</strong>{" "}
            (95% bootstrap CI:{" "}
            <strong className="font-semibold text-foreground">
              [−0.471, −0.447]
            </strong>
            ).
          </p>
          <p>
            A seed-42 NLLB rerun with{" "}
            <strong className="font-semibold text-foreground">
              proportional warmup and epoch-level evaluation
            </strong>{" "}
            preserves the BLEU and chrF contribution signs and group rankings.
            Manual auditing shows high annotator agreement and indicates that
            the{" "}
            <strong className="font-semibold text-foreground">
              boundary group should be treated as a classifier-boundary group
              rather than a stable linguistic category
            </strong>
            .
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-9 sm:py-10 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
          Final takeaway
        </p>
        <p className="mt-4 max-w-4xl font-heading text-2xl leading-snug sm:text-3xl">
          Training-data value is not fixed. It depends on the behavior,
          evaluation data, and model architecture.
        </p>
      </section>
    </div>
  );
}
