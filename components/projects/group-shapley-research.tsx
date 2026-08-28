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
}: {
  value: number;
  maxAbs: number;
  label: string;
}) {
  const positive = value > 0;
  const digits = Math.abs(value) < 1 ? 3 : 2;
  const intensity = 0.12 + 0.68 * (Math.abs(value) / maxAbs);

  return (
    <div
      role="cell"
      aria-label={`${label}: ${positive ? "positive" : "negative"} ${Math.abs(value).toFixed(digits)}`}
      className="flex min-h-[72px] items-center justify-center rounded-xl px-3 py-4 text-center font-mono text-base font-semibold tabular-nums text-slate-950 dark:text-white"
      style={{
        backgroundColor: positive
          ? `rgba(59, 130, 246, ${intensity})`
          : `rgba(239, 68, 68, ${intensity})`,
      }}
    >
      {positive ? "+" : ""}
      {value.toFixed(digits)}
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
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>
            These are attribution groups, not linguistic categories.
          </strong>{" "}
          The Boundary group mainly reflects classifier uncertainty rather than
          a clear written-standard category.
        </p>
      </section>

      <section>
        <SectionHeader title="Exact Group-Level Attribution Overview" />
        <div className="grid gap-7 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <a
              href="/projects/group-shapley-attribution/attribution-overview.png"
              target="_blank"
              rel="noreferrer"
              aria-label="Open the full attribution protocol overview"
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
              Complete group-level attribution protocol.
            </p>
          </div>
          <div className="space-y-4 leading-7 text-muted-foreground">
            <p>
              We divide{" "}
              <strong className="font-semibold text-foreground">
                13,935 English–Norwegian petroleum-domain training pairs
              </strong>{" "}
              into four groups using SLIDE scores:{" "}
              <strong className="font-semibold text-foreground">
                high-Bokmål, boundary, Nynorsk-like, and uncertain-other
              </strong>
              .
            </p>
            <p>
              We manually check{" "}
              <strong className="font-semibold text-foreground">
                200 examples
              </strong>{" "}
              , with 50 from each group. Two annotators label the written
              standard without seeing the SLIDE labels. They agree on{" "}
              <strong className="font-semibold text-foreground">
                94.5% of the examples (Cohen’s κ = 0.918)
              </strong>
              . The check shows that the{" "}
              <strong className="font-semibold text-foreground">
                boundary group mainly reflects classifier uncertainty rather
                than a clear linguistic category
              </strong>
              .
            </p>
            <p>
              The four groups give{" "}
              <strong className="font-semibold text-foreground">
                16 possible combinations
              </strong>
              , including the empty one. We fine-tune every non-empty
              combination with{" "}
              <strong className="font-semibold text-foreground">
                three seeds
              </strong>
              , using the original base model for the empty one. We run the
              experiment with{" "}
              <strong className="font-semibold text-foreground">
                NLLB-600M
              </strong>{" "}
              and repeat it with{" "}
              <strong className="font-semibold text-foreground">
                NorMistral-7B-warm
              </strong>
              .
            </p>
            <p>
              We evaluate all combinations on the same{" "}
              <strong className="font-semibold text-foreground">
                1,742-example test set
              </strong>{" "}
              using{" "}
              <strong className="font-semibold text-foreground">
                BLEU, chrF, terminology F1, high-Bokmål output rate (percentage
                of outputs classified as high-Bokmål), and Nynorsk-like output
                rate (percentage of outputs classified as Nynorsk-like)
              </strong>
              . We then calculate{" "}
              <strong className="font-semibold text-foreground">
                exact Shapley values
              </strong>{" "}
              to measure each group’s contribution to each metric.
            </p>
            <p>
              We also compare the real groups with{" "}
              <strong className="font-semibold text-foreground">
                three random groupings of the same sizes
              </strong>{" "}
              and use{" "}
              <strong className="font-semibold text-foreground">
                test-subset, bootstrap, training-schedule, and threshold checks
              </strong>{" "}
              to assess the results.
            </p>
          </div>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader
          title={"RQ1. " + researchQuestions[0]}
          description={
            <>
              Exact Shapley values from all 16 NLLB coalitions, averaged over
              three training seeds.{" "}
              <strong className="font-semibold text-foreground">
                Blue indicates positive contributions; red indicates negative
                contributions.
              </strong>
            </>
          }
        />
        <div className="overflow-hidden rounded-2xl border bg-background p-3 sm:p-5">
          <div className="overflow-x-auto pb-2">
            <div
              role="table"
              aria-label="Exact Shapley contributions by training group and evaluation metric"
              className="grid min-w-[920px] grid-cols-[190px_repeat(5,minmax(130px,1fr))] gap-2"
            >
              {[
                "Training group",
                "BLEU",
                "chrF",
                "TermF1",
                "High-Bokmål rate",
                "Nynorsk-like rate",
              ].map((heading, index) => (
                <div
                  key={heading}
                  role="columnheader"
                  className={`flex min-h-[54px] items-center px-3 py-2 text-sm font-semibold text-muted-foreground ${index === 0 ? "justify-start" : "justify-center text-center"}`}
                >
                  {heading}
                </div>
              ))}

              {shapleyRows.map(([name, ...values]) => (
                <div className="contents" role="row" key={name}>
                  <div
                    role="rowheader"
                    className="flex min-h-[72px] items-center px-3 py-4 text-sm font-semibold sm:text-base"
                  >
                    {name}
                  </div>
                  {values.map((value, index) => (
                    <HeatmapCell
                      key={`${name}-${index}`}
                      value={value}
                      maxAbs={metricMaxAbs[index]}
                      label={`${name}, ${["BLEU", "chrF", "TermF1", "High-Bokmål rate", "Nynorsk-like rate"][index]}`}
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
            <span>Color intensity is normalized within each metric.</span>
          </div>
        </div>
        <EvidenceConclusion>
          High-Bokmål data is the main contributor to translation quality,
          terminology accuracy, and Bokmål consistency. Nynorsk-like data has a
          smaller positive effect on overall translation quality, but hurts
          terminology accuracy and strongly increases Nynorsk-like outputs.{" "}
          <strong>
            The key point: a training-data group can improve one aspect of model
            behavior while harming another.
          </strong>
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Why does Nynorsk-like data have positive value?" />
        <div className="mb-6 max-w-3xl space-y-4 leading-7 text-muted-foreground">
          <p>
            The Nynorsk-like group has an overall{" "}
            <strong className="font-semibold text-foreground">
              +3.21 BLEU
            </strong>{" "}
            contribution. But where does this gain come from?
          </p>
          <p>We break the test set down by two factors:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="font-semibold text-foreground">
                Reference standard:
              </strong>{" "}
              whether the Norwegian reference is{" "}
              <strong className="font-semibold text-foreground">
                High-Bokmål
              </strong>{" "}
              or{" "}
              <strong className="font-semibold text-foreground">
                Nynorsk-like
              </strong>
            </li>
            <li>
              <strong className="font-semibold text-foreground">
                Source overlap:
              </strong>{" "}
              how similar the English test sentence is to the English sentences
              in the training data
            </li>
          </ul>
          <p>
            We then examine the Nynorsk-like group’s Shapley contribution within
            each subset.
          </p>
        </div>
        <div className="grid gap-4 rounded-2xl border bg-background p-5 sm:p-6 lg:grid-cols-2">
          {["High-Bokmål", "Nynorsk-like"].map((reference) => (
            <div key={reference} className="rounded-xl bg-muted/25 p-4">
              <p className="mb-4 font-semibold">{reference} references</p>
              <div className="space-y-4">
                {subsetRows
                  .filter((row) => row.reference === reference)
                  .map((row) => {
                    const width = Math.max(9, (Math.abs(row.bleu) / 42) * 100);
                    return (
                      <div key={`${row.reference}-${row.overlap}`}>
                        <div className="mb-1.5 flex items-center justify-between gap-4 text-xs">
                          <span>
                            {row.overlap} overlap · n={row.n}
                          </span>
                          <span
                            className={`font-mono font-semibold tabular-nums ${row.bleu > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                          >
                            {row.bleu > 0 ? "+" : ""}
                            {row.bleu.toFixed(2)} BLEU
                          </span>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${row.bleu > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                            style={{ width: `${width}%` }}
                            role="img"
                            aria-label={`${row.overlap} overlap: ${row.bleu} BLEU Shapley value`}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
        <EvidenceConclusion>
          The pattern is clear:{" "}
          <strong>
            Nynorsk-like training data helps Nynorsk-like references but hurts
            High-Bokmål references.
          </strong>{" "}
          Within the Nynorsk-like subsets, the positive contribution also
          increases with source overlap.
          <br />
          <br />
          <strong>
            The overall +3.21 BLEU contribution therefore comes from its strong
            positive effect on Nynorsk-like test examples, while its effect on
            High-Bokmål examples is negative.
          </strong>
        </EvidenceConclusion>
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
