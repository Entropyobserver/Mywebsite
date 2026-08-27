import Image from "next/image";

const researchQuestions = [
  "How do different training-data groups contribute to translation quality, terminology performance, and written-standard behavior?",
  "To what extent can group size alone explain these contributions?",
  "How do these attribution patterns compare across encoder–decoder and decoder-only architectures?",
];

const groups = [
  {
    name: "High-Bokmål",
    size: "10,113",
    rule: "Strong Bokmål signal and weak Nynorsk signal",
    tone: "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30",
  },
  {
    name: "Boundary",
    size: "880",
    rule: "Both classifier scores cross the activation threshold",
    tone: "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
  },
  {
    name: "Nynorsk-like",
    size: "2,645",
    rule: "Nynorsk signal crosses the threshold; Bokmål does not",
    tone: "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30",
  },
  {
    name: "Uncertain-other",
    size: "297",
    rule: "All remaining classifier-score combinations",
    tone: "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/30",
  },
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
  ["High-Bokmål → BLEU", 19.83, 15.31],
  ["High-Bokmål → High-Bokmål rate", 0.381, 0.391],
  ["Nynorsk-like → BLEU", 3.21, 1.56],
  ["Nynorsk-like → High-Bokmål rate", -0.459, -0.459],
  ["Nynorsk-like → Nynorsk-like rate", 0.469, 0.478],
  ["Uncertain-other → BLEU", 0.61, -1.3],
] as const;

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

function ProtocolStep({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="min-w-0 flex-1 rounded-xl border bg-background px-4 py-4 text-center shadow-sm">
      <p className="font-heading text-lg">{label}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>
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

      <section>
        <SectionHeader
          title="Exact Group-Level Attribution"
          description="Rather than removing one group from the full dataset, the protocol evaluates every possible group combination. A group’s Shapley value is its average marginal contribution across all coalition contexts."
        />
        <div className="rounded-2xl border bg-muted/20 p-5 sm:p-7">
          <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            <ProtocolStep
              label="13,935 training pairs"
              detail="English–Norwegian petroleum corpus"
            />
            <span className="text-center text-xl text-muted-foreground lg:rotate-0">
              →
            </span>
            <ProtocolStep
              label="4 operational groups"
              detail="Auditable written-standard partitions"
            />
            <span className="text-center text-xl text-muted-foreground">→</span>
            <ProtocolStep
              label="16 coalitions"
              detail="Complete 2⁴ space, including the empty coalition"
            />
            <span className="text-center text-xl text-muted-foreground">→</span>
            <ProtocolStep
              label="2 architectures"
              detail="NLLB-600M and NorMistral-7B-warm"
            />
            <span className="text-center text-xl text-muted-foreground">→</span>
            <ProtocolStep
              label="5 utility measures"
              detail="BLEU, chrF, TermF1, and two standard rates"
            />
          </div>
          <div className="mt-5 grid gap-3 text-center sm:grid-cols-3">
            {[
              ["3", "training seeds"],
              ["3", "size-matched random partitions"],
              ["200", "manually audited examples"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl bg-background px-4 py-3">
                <p className="font-heading text-2xl text-blue-600 dark:text-blue-400">
                  {value}
                </p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader
          title="Auditable Training-Data Groups"
          description="SLIDE scores define four mutually exclusive operational groups. They are attribution units—not gold linguistic categories."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div
              key={group.name}
              className={`rounded-2xl border p-5 ${group.tone}`}
            >
              <p className="font-heading text-xl">{group.name}</p>
              <p className="mt-2 font-mono text-2xl font-semibold tabular-nums">
                {group.size}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {group.rule}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          Manual validation found that the boundary group reflects classifier
          uncertainty rather than a stable, human-interpretable mixed-standard
          category. The cautious name is therefore intentional.
        </p>
      </section>

      <section id="rq1">
        <SectionHeader
          eyebrow="RQ1 · Contribution depends on the measured behavior"
          title={researchQuestions[0]}
          description="Exact Shapley values from all 16 NLLB coalitions, averaged over three seeds. Blue cells are positive contributions; red cells are negative."
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
          <strong>High-Bokmål data is the dominant contributor</strong> to
          translation quality, terminology F1, and Bokmål output consistency.
          Nynorsk-like data provides a smaller aggregate quality gain, but
          decreases terminology F1 and strongly shifts outputs away from Bokmål.{" "}
          <strong>
            A data group can therefore help one behavior while harming another.
          </strong>
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          eyebrow="RQ1 · Distribution-sensitive follow-up"
          title="Where does the Nynorsk-like quality gain occur?"
          description="The aggregate +3.21 BLEU contribution hides opposite effects across reference written standards. Bars show the Nynorsk-like group’s BLEU Shapley value."
        />
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
          Nynorsk-like data is positive on Nynorsk-like references at every
          overlap level, reaching <strong>+41.97 BLEU</strong> in the
          high-overlap subset. It is negative on High-Bokmål references at every
          overlap level.{" "}
          <strong>
            The group’s apparent value changes with the evaluation distribution;
            high source overlap alone does not explain the gain.
          </strong>
        </EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader
          eyebrow="RQ2 · Identity matters beyond size"
          title={researchQuestions[1]}
          description="Three random partitions preserve the original group sizes while changing which examples belong to each group."
        />
        <div className="grid gap-6 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                className="h-auto w-full rounded-xl border bg-white"
              />
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              True High-Bokmål group versus random same-size groups.
            </p>
          </div>
          <div className="space-y-4">
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
        <EvidenceConclusion>
          Size explains part of the aggregate benefit of seeing more training
          data, but <strong>it does not explain the attribution profile</strong>
          . Random same-size groups contribute less to quality and terminology,
          and they fail to reproduce the true group’s written-standard effects.
          <strong>
            More data helps; group identity determines which behaviors change.
          </strong>
        </EvidenceConclusion>
      </section>

      <section id="rq3">
        <SectionHeader
          eyebrow="RQ3 · Cross-architecture comparison"
          title={researchQuestions[2]}
          description="The strongest effects recur in NLLB-600M and NorMistral-7B-warm, while smaller groups show architecture-dependent behavior."
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
                        className={`px-5 py-4 text-right font-mono font-semibold tabular-nums ${value > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                      >
                        {value > 0 ? "+" : ""}
                        {Math.abs(value) < 1
                          ? value.toFixed(3)
                          : value.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <EvidenceConclusion>
          <strong>
            The large effects generalize across both model families.
          </strong>{" "}
          High-Bokmål remains the dominant positive contributor, and
          Nynorsk-like data produces an almost identical shift away from Bokmål
          and toward Nynorsk-like output. Boundary and uncertain-other effects
          are less stable, so the results support shared dominant patterns—not
          complete architecture invariance.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          title="Robustness and Data Audit"
          description="The main interpretation is supported by uncertainty checks, a training-schedule rerun, and manual validation of the automatically created groups."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["1,000", "sentence-level bootstrap samples"],
            ["3", "random seeds in both architecture branches"],
            ["94.5%", "exact agreement between two annotators"],
            ["κ = .918", "Cohen’s kappa for the manual audit"],
          ].map(([value, label]) => (
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
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border bg-muted/20 p-5 leading-7 text-muted-foreground">
          An alternative NLLB training schedule preserves every reported sign
          and the complete BLEU/chrF group ranking. The largest selected
          bootstrap intervals are also narrow: High-Bokmål BLEU is 19.83 with a
          95% CI of [18.89, 20.76], while the Nynorsk-like shift in High-Bokmål
          output rate is −0.459 with a 95% CI of [−0.471, −0.447].
        </div>
      </section>

      <section className="rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-9 sm:py-10 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
          Final takeaway
        </p>
        <p className="mt-4 max-w-4xl font-heading text-2xl leading-snug sm:text-3xl">
          Training-data value is not a single property of a group. It depends on
          the measured behavior, the evaluation distribution, and—especially for
          smaller effects—the model architecture.
        </p>
      </section>
    </div>
  );
}
