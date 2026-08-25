const researchQuestions = [
  "Can synthetic data support low-resource petroleum translation?",
  "Do language-specific experts outperform a shared adapter?",
  "Does more accurate routing improve translation?",
];

const syntheticBleu = [
  { label: "Zero-shot NLLB", value: 33.8, color: "bg-slate-400" },
  { label: "Independent", value: 59.1, color: "bg-teal-500" },
  { label: "MT LoRA", value: 61.0, color: "bg-blue-600" },
];

const authenticBleu = [
  { label: "Independent", value: 42.1, color: "bg-teal-500" },
  { label: "MoE", value: 41.89, color: "bg-violet-600" },
  { label: "MT LoRA", value: 39.3, color: "bg-blue-600" },
];

const confusionMatrix = [
  [77.6, 0.2, 1.0, 21.2],
  [6.8, 40.1, 3.6, 49.4],
  [4.8, 0.9, 54.8, 39.5],
  [4.7, 4.6, 3.9, 86.8],
];

const crossExpertBleu = [
  [61.8, 57.0, 57.4, 57.8],
  [49.4, 58.2, 51.3, 53.9],
  [52.9, 52.9, 58.1, 53.7],
  [53.9, 56.2, 55.4, 59.5],
];

const languageLabels = ["EN", "DE", "FR", "NL"];

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
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
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

function HorizontalBars({
  data,
  max,
}: {
  data: { label: string; value: number; color: string }[];
  max: number;
}) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
            <span className="font-medium">{item.label}</span>
            <span className="font-mono font-semibold">
              {item.value.toFixed(item.value % 1 ? 2 : 1)}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${item.color}`}
              style={{ width: `${(item.value / max) * 100}%` }}
              role="img"
              aria-label={`${item.label}: ${item.value} BLEU`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ConfusionMatrix() {
  return (
    <div>
      <p className="mb-3 text-center text-sm font-semibold">Hard routing</p>
      <div className="grid grid-cols-[auto_repeat(4,minmax(0,1fr))] gap-1 text-center text-xs">
        <div />
        {languageLabels.map((label) => (
          <div key={label} className="pb-1 font-semibold text-muted-foreground">
            {label}
          </div>
        ))}
        {confusionMatrix.map((row, rowIndex) => (
          <div className="contents" key={languageLabels[rowIndex]}>
            <div className="flex items-center pr-2 font-semibold text-muted-foreground">
              {languageLabels[rowIndex]}
            </div>
            {row.map((value, columnIndex) => {
              const isDiagonal = rowIndex === columnIndex;
              const tone = isDiagonal
                ? "bg-emerald-600 text-white"
                : value >= 35
                  ? "bg-red-300 text-red-950 dark:bg-red-800 dark:text-red-50"
                  : value >= 20
                    ? "bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-200"
                    : "bg-muted text-muted-foreground";
              return (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className={`rounded-md px-1 py-3 font-mono ${tone}`}
                >
                  {value.toFixed(1)}%
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        True source → routed expert
      </p>
    </div>
  );
}

function CrossExpertMatrix() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px]">
        <div className="grid grid-cols-[1.15fr_repeat(4,1fr)] gap-1 text-center text-xs">
          <div className="pb-2 text-left font-semibold text-muted-foreground">
            Test source
          </div>
          {languageLabels.map((label) => (
            <div
              key={label}
              className="pb-2 font-semibold text-muted-foreground"
            >
              {label} expert
            </div>
          ))}
          {crossExpertBleu.map((row, rowIndex) => (
            <div className="contents" key={languageLabels[rowIndex]}>
              <div className="flex items-center font-semibold">
                {languageLabels[rowIndex]}–NO
              </div>
              {row.map((value, columnIndex) => (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  className={`rounded-md px-2 py-3 font-mono ${
                    rowIndex === columnIndex
                      ? "bg-violet-600 font-semibold text-white"
                      : "bg-violet-100 text-violet-950 dark:bg-violet-950/50 dark:text-violet-100"
                  }`}
                >
                  {value.toFixed(1)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ModularLoraResearch() {
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
        <SectionHeader eyebrow="Approach" title="Target-Anchored Synthesis" />
        <div className="grid gap-6 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:items-start">
          <div className="self-center">
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              We use authentic Norwegian NPD text as a semantic anchor and
              generate German, Dutch, and French source sentences while keeping
              the Norwegian targets unchanged. Validated terminology is injected
              as generation constraints, and the resulting pairs are filtered
              using LaBSE similarity and FTA-based quality checks. The final
              dataset contains{" "}
              <strong className="font-semibold text-foreground">
                41,527 high-quality synthetic pairs
              </strong>{" "}
              from{" "}
              <strong className="font-semibold text-foreground">
                51,890 generated pairs
              </strong>{" "}
              across DE–NO, NL–NO, and FR–NO.
            </p>
          </div>
          <div>
            <Image
              src="/projects/modular-lora-experts/fig4_synthesis_pipeline.png"
              alt="Figure 4: Target-Anchored Synthesis pipeline from English source and Norwegian anchor through glossary-constrained generation and quality gates"
              width={700}
              height={969}
              className="mx-auto h-auto w-full max-w-sm rounded-xl bg-white object-contain"
            />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Figure 4. Target-Anchored Synthesis and filtering stages.
            </p>
          </div>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader
          eyebrow="RQ1 · Evidence + Answer"
          title="Is synthetic training useful?"
          description="Human validation checks the generated source text; controlled translation results test whether it supplies a useful adaptation signal."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-6">
            <p className="text-sm font-semibold">Human validation</p>
            <p className="mt-1 text-sm text-muted-foreground">
              300 human-checked source sentences
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                ["4.86 / 5", "Adequacy"],
                ["4.70 / 5", "Fluency"],
                ["94.4%", "Terminology"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-muted/60 p-3">
                  <p className="font-heading text-lg sm:text-xl">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Two annotators rated 100 DE, 100 FR, and 100 NL synthetic sources
              without access to the automatic quality scores.
            </p>
          </div>
          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Adaptation gain</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Four-language average
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                BLEU
              </span>
            </div>
            <HorizontalBars data={syntheticBleu} max={65} />
          </div>
        </div>
        <EvidenceConclusion>
          Synthetic training provides a strong in-domain adaptation signal,
          although synthetic-source evaluation does not establish real-world
          generalisation.
        </EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader
          eyebrow="RQ2 · Core Result"
          title="Independent experts or shared LoRA?"
          description="The system ranking changes when evaluation moves from controlled synthetic sources to naturally occurring petroleum text."
        />
        <div className="rounded-3xl border-2 border-blue-200 bg-blue-50/30 p-5 dark:border-blue-900/70 dark:bg-blue-950/10 sm:p-7">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-5">
                <p className="text-sm font-semibold">
                  Synthetic-source evaluation
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Held-out synthetic DE / FR / NL sources plus authentic EN
                </p>
              </div>
              <HorizontalBars
                data={syntheticBleu.filter(
                  (item) => item.label !== "Zero-shot NLLB"
                )}
                max={65}
              />
              <p className="mt-5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
                Shared MT LoRA ranks first: 61.0 BLEU
              </p>
            </div>
            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-5">
                <p className="text-sm font-semibold">
                  Authentic-source evaluation
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  180 natural DE / FR / NL petroleum sentences
                </p>
              </div>
              <HorizontalBars data={authenticBleu} max={45} />
              <p className="mt-5 rounded-lg bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-900 dark:bg-violet-950/40 dark:text-violet-100">
                MoE vs MT LoRA: +2.59 BLEU, p=.0002
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl border bg-background p-4">
              <p className="font-heading text-xl">180</p>
              <p className="mt-1 text-muted-foreground">authentic sources</p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="font-heading text-xl">60 × 3</p>
              <p className="mt-1 text-muted-foreground">DE / FR / NL</p>
            </div>
            <div className="rounded-xl border bg-background p-4">
              <p className="font-heading text-xl">10,000</p>
              <p className="mt-1 text-muted-foreground">bootstrap samples</p>
            </div>
          </div>
        </div>
        <EvidenceConclusion>
          Shared adaptation performs best on synthetic-source tests, whereas
          modular experts generalise better to authentic source text.
        </EvidenceConclusion>
      </section>

      <section id="rq3">
        <SectionHeader
          eyebrow="RQ3 · Evidence + Answer"
          title="Does better routing improve translation?"
          description="Explicit language identity makes routing substantially more accurate, but downstream gains remain modest on the controlled benchmark."
        />
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border bg-background p-6">
            <div className="space-y-4">
              {[
                ["Routing accuracy", "64.8%", "77.5%", "+12.7 pp"],
                ["BLEU", "58.4", "58.9", "+0.5"],
                ["FTA", ".711", ".720", "+.009"],
              ].map(([label, before, after, delta], index) => (
                <div key={label}>
                  <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 rounded-xl border bg-muted/30 p-4">
                    <p className="font-medium">{label}</p>
                    <span className="font-mono text-muted-foreground">
                      {before}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="font-mono font-semibold text-blue-700 dark:text-blue-300">
                      {after}
                    </span>
                  </div>
                  <p className="mt-1 text-right text-xs font-semibold text-orange-600 dark:text-orange-400">
                    {delta}
                  </p>
                  {index < 2 && <div className="mx-auto h-3 w-px bg-border" />}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-background p-5">
            <ConfusionMatrix />
            <div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm">
              <div className="rounded-lg bg-orange-50 p-3 text-orange-950 dark:bg-orange-950/30 dark:text-orange-100">
                <strong className="block text-lg">40.1%</strong>
                DE routing accuracy
              </div>
              <div className="rounded-lg bg-red-50 p-3 text-red-950 dark:bg-red-950/30 dark:text-red-100">
                <strong className="block text-lg">49.4%</strong>
                DE → NL misrouting
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border bg-background p-5 sm:p-6">
          <div className="mb-5">
            <p className="text-sm font-semibold">Cross-expert BLEU</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Rows are test languages; columns are the expert used for decoding.
            </p>
          </div>
          <CrossExpertMatrix />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Matching experts are consistently strongest, but non-matching
            experts remain competitive. Functional overlap reduces the aggregate
            penalty of imperfect routing.
          </p>
          <a
            href="/projects/modular-lora-experts/tsne_encoder_features.png"
            target="_blank"
            rel="noreferrer"
            className="mt-6 block overflow-hidden rounded-xl border bg-white"
            aria-label="Open the original t-SNE representation diagnostic at full size"
          >
            <Image
              src="/projects/modular-lora-experts/tsne_encoder_features.png"
              alt="Original paper t-SNE projection of NLLB encoder representations for English, German, French, and Dutch"
              width={1917}
              height={1604}
              className="h-auto w-full"
            />
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            Original paper diagnostic: partial overlap in encoder space is
            consistent with routing ambiguity, but is not treated as causal
            proof.
          </p>
        </div>

        <EvidenceConclusion>
          Better routing helps, but functional overlap limits its aggregate
          benefit.
        </EvidenceConclusion>
      </section>

      <section>
        <SectionHeader
          eyebrow="Conclusions"
          title="Three research questions, three evidence-backed answers"
        />
        <div className="space-y-3">
          {[
            [
              "RQ1",
              "Synthetic data provides an effective controlled training signal.",
            ],
            [
              "RQ2",
              "Shared and modular adaptation perform differently under synthetic and authentic source distributions.",
            ],
            [
              "RQ3",
              "Routing accuracy matters, but expert specialisation and overlap also determine translation quality.",
            ],
          ].map(([label, conclusion]) => (
            <div
              key={label}
              className="flex gap-4 rounded-2xl border bg-background p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-heading text-xs text-white">
                {label}
              </span>
              <p className="self-center leading-relaxed">{conclusion}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-center text-lg font-medium leading-relaxed text-white dark:bg-blue-950">
          Learned routing is useful when language-specific experts generalise
          better than a shared adapter, not merely when the router is more
          accurate.
        </div>
      </section>
    </div>
  );
}
import Image from "next/image";
