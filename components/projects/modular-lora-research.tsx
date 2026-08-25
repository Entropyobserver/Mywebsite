const researchQuestions = [
  "Can synthetic data support low-resource petroleum translation from German, French, and Dutch into Norwegian?",
  "How do language-specific experts compare with a shared multitask adapter in translation quality and terminology accuracy?",
  "Does more accurate expert routing improve translation quality?",
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
        <SectionHeader title="Target-Anchored Synthesis" />
        <div className="grid gap-6 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,480px)] lg:items-start">
          <div className="self-center">
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              We use authentic Norwegian NPD text as a semantic anchor and use{" "}
              <strong className="font-semibold text-foreground">
                English sentences as an intermediate source to generate German,
                Dutch, and French sentences with GPT-4o-mini
              </strong>
              , while keeping the Norwegian targets unchanged. Validated
              terminology is injected as generation constraints, and the
              resulting pairs are filtered using LaBSE similarity and FTA-based
              quality checks. The final dataset contains{" "}
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
              width={800}
              height={1107}
              className="mx-auto h-auto w-full max-w-md rounded-xl bg-white object-contain"
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
          title={researchQuestions[0]}
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Language pair</th>
                  <th className="px-5 py-4 text-right font-semibold">BLEU</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    EN–NO BLEU retained
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    FTA gain vs GT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["EN–NO (real)", "61.7 ± 0.0", "100%", "−0.124"],
                  ["DE–NO (synthetic)", "57.7 ± 0.8", "93.5%", "+0.013"],
                  ["NL–NO (synthetic)", "59.3 ± 0.1", "96.1%", "+0.121*"],
                  ["FR–NO (synthetic)", "57.8 ± 0.6", "93.7%", "+0.062*"],
                ].map(([pair, bleu, retained, gain], index) => (
                  <tr key={pair} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium">{pair}</td>
                    <td className="px-5 py-4 text-right tabular-nums">
                      {bleu}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums">
                      {retained}
                    </td>
                    <td
                      className={
                        gain.startsWith("+")
                          ? "px-5 py-4 text-right font-medium tabular-nums text-emerald-600 dark:text-emerald-400"
                          : "px-5 py-4 text-right font-medium tabular-nums text-red-600 dark:text-red-400"
                      }
                    >
                      {gain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t px-5 py-3 text-xs text-muted-foreground">
            * Significant terminology gain over Google Translate.
          </p>
        </div>
        <EvidenceConclusion>
          Experts trained on synthetic DE–NO, NL–NO, and FR–NO data reach{" "}
          <strong>93.5–96.1% of the BLEU</strong> of the authentic-data EN–NO
          expert. NL–NO and FR–NO also achieve significant terminology gains
          over Google Translate.{" "}
          <strong>
            So, the synthetic data works as a useful training signal—but we
            still need to test how well it transfers to real-world source text.
          </strong>
        </EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader
          eyebrow="RQ2 · Core Result"
          title={researchQuestions[1]}
        />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">System</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    BLEU (avg)
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    FTA (avg)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-5 py-4 font-medium">Independent Experts</td>
                  <td className="px-5 py-4 text-right tabular-nums">59.1</td>
                  <td className="px-5 py-4 text-right font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                    .726
                  </td>
                </tr>
                <tr className="bg-muted/35">
                  <td className="px-5 py-4 font-medium">Multitask LoRA</td>
                  <td className="px-5 py-4 text-right font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                    61.0
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums">.713</td>
                </tr>
                <tr>
                  <td className="px-5 py-4 font-medium">MoE hard routing</td>
                  <td className="px-5 py-4 text-right tabular-nums">58.4</td>
                  <td className="px-5 py-4 text-right tabular-nums">.711</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <EvidenceConclusion>
          On the synthetic-source benchmark, Multitask LoRA gets the highest
          average BLEU (<strong>61.0</strong>), while Independent Experts get
          the highest terminology accuracy (<strong>FTA .726</strong>). MoE hard
          routing is lower on both (<strong>58.4 BLEU, .711 FTA</strong>).{" "}
          <strong>
            Rather than being the best-performing model, we use the MoE as a
            diagnostic tool to understand how routing and expert specialisation
            affect translation quality.
          </strong>
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
    </div>
  );
}
import Image from "next/image";
