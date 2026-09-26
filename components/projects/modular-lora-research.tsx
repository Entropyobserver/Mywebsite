const researchQuestions = [
  "Can Target-Anchored Synthesis provide useful training data?",
  "Do language-specific LoRA experts specialise, and how much do they overlap?",
  "When does expert selection improve translation quality, and does more accurate routing lead to better translations?",
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
        <SectionHeader title="System Overview" />
        <div className="grid gap-6 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <Image
              src="/projects/modular-lora-experts/fig1_system_architecture_updated.png"
              alt="Figure 1: language-specific LoRA expert training, router training on a frozen NLLB backbone, and top-1 expert inference"
              width={766}
              height={805}
              className="mx-auto h-auto w-full max-w-md rounded-xl bg-white object-contain"
            />
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Figure 1. Expert training, router training, and top-1 inference.
            </p>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              The system uses a frozen{" "}
              <strong className="font-semibold text-foreground">
                NLLB-200-distilled-600M
              </strong>{" "}
              backbone with four language-specific LoRA experts. The EN expert
              is trained on authentic EN–NO data, while the DE, NL, and FR
              experts are trained on synthetic source sentences paired with
              Norwegian targets.
            </p>
            <p>
              After training the experts, we train a gated MLP router on mixed
              multilingual data, while keeping the backbone and experts frozen.
              At inference, the router selects one expert for each input
              sentence and uses that expert to generate the Norwegian
              translation.
            </p>
            <p>
              We compare three settings:{" "}
              <strong className="font-semibold text-foreground">
                Independent Experts
              </strong>
              , which directly use the expert corresponding to the source
              language;{" "}
              <strong className="font-semibold text-foreground">
                Multitask LoRA
              </strong>
              , which uses one shared LoRA adapter for all languages; and{" "}
              <strong className="font-semibold text-foreground">MoE</strong>,
              which uses the router to automatically select an expert.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader title="Target-Anchored Synthesis" />
        <div className="grid gap-6 rounded-2xl border bg-muted/20 p-5 sm:p-7 lg:grid-cols-[minmax(320px,480px)_minmax(0,1.1fr)] lg:items-center">
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
          <div className="self-center space-y-4 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              We start with authentic English–Norwegian petroleum data from the
              Norwegian Petroleum Directorate (NPD). The Norwegian sentences
              are kept unchanged as reliable target anchors.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Step one is generation.
              </strong>{" "}
              We scan the NPD glossary and inject 70 validated terminology
              pairs into the prompt as hard constraints. GPT-4o-mini then
              generates German, Dutch, and French source sentences from the
              corresponding English sources.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Step two is quality checking.
              </strong>{" "}
              We use LaBSE similarity to check whether the meaning is preserved,
              and FTA to check terminology accuracy.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Step three is a round-trip check.
              </strong>{" "}
              We back-translate the generated sources into English and use BLEU
              as a diagnostic only, without a hard threshold.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Step four is the final quality gate.
              </strong>{" "}
              A pair is discarded only when both the LaBSE and FTA checks fail.
              Otherwise, it is retained.
            </p>
            <p>
              The final corpus contains{" "}
              <strong className="font-semibold text-foreground">
                51,890 synthetic pairs
              </strong>{" "}
              across the training, development, and test splits, including{" "}
              <strong className="font-semibold text-foreground">
                41,527 training pairs
              </strong>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader title={`RQ1 · ${researchQuestions[0]}`} />
        <p className="mb-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          We first test whether models trained on the synthetic data learn a
          useful translation signal. We then use human evaluation to assess the
          quality of the generated source sentences.
        </p>

        <h3 className="mb-3 text-lg font-semibold">
          Translation results — Does the synthetic data work for training?
        </h3>
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-5 py-4 font-semibold">Language pair</th>
                  <th className="px-5 py-4 text-right font-semibold">BLEU</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    % of EN–NO BLEU
                  </th>
                  <th className="px-5 py-4 text-right font-semibold">
                    FTA gain vs Google Translate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["DE–NO", "57.7", "93.5%", "+0.013"],
                  ["NL–NO", "59.3", "96.1%", "+0.121*"],
                  ["FR–NO", "57.8", "93.7%", "+0.062*"],
                ].map(([pair, bleu, retained, gain], index) => (
                  <tr key={pair} className={index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4 font-medium">{pair}</td>
                    <td className="px-5 py-4 text-right tabular-nums">
                      {bleu}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums">
                      {retained}
                    </td>
                    <td className="px-5 py-4 text-right font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                      {gain}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t px-5 py-4 text-sm leading-6 text-muted-foreground">
            <strong className="font-semibold text-foreground">
              EN–NO benchmark: 61.7 BLEU.
            </strong>{" "}
            Synthetic-data experts reach <strong>93.5–96.1%</strong> of the
            benchmark, with statistically significant terminology gains for
            NL–NO and FR–NO. * Statistically significant improvement over
            Google Translate.
          </p>
        </div>

        <h3 className="mb-3 mt-8 text-lg font-semibold">
          Human validation — Are the generated sources reliable?
        </h3>
        <div className="rounded-2xl border bg-background p-5 sm:p-6">
          <p className="mb-5 text-sm leading-6 text-muted-foreground sm:text-base">
            <strong className="font-semibold text-foreground">
              300 source sentences
            </strong>{" "}
            were manually evaluated—100 each in German, Dutch, and French.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Adequacy", "4.86 / 5"],
              ["Fluency", "4.70 / 5"],
              ["Terminology accuracy", "94.4%"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-muted/40 p-4 text-center">
                <p className="text-2xl font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                  {value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base">
            The generated sources generally preserve the intended meaning,
            remain fluent, and use the required petroleum terminology
            correctly.
          </p>
        </div>

        <EvidenceConclusion>
          <strong>
            Overall, Target-Anchored Synthesis provides a useful controlled
            training signal for low-resource translation.
          </strong>{" "}
          Transfer to naturally occurring source text is examined separately
          under RQ3.
        </EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader title={`RQ2 · ${researchQuestions[1]}`} />
        <div className="grid gap-6 rounded-2xl border bg-background p-5 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="overflow-hidden rounded-xl border">
            <p className="border-b bg-muted/30 px-5 py-3 text-sm font-semibold">
              Overall comparison
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-left text-sm">
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
                    <td className="px-5 py-4 font-medium">
                      Independent Experts
                    </td>
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
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>
              Multitask LoRA gets the highest average BLEU, while Independent
              Experts get the highest average FTA. MoE hard routing is lower on
              both metrics.
            </p>
            <p className="rounded-xl bg-blue-50 p-4 font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              Here, we use the MoE mainly to study what the experts learn and
              how routing works.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold">
                Cross-expert analysis
              </p>
              <CrossExpertMatrix />
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Bold cells show each language with its matching expert.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl bg-muted/35 p-4">
                <p className="font-semibold text-foreground">Specialisation</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  The matching expert gets the highest BLEU for all four
                  languages.
                </p>
                <p className="mt-2 font-semibold text-foreground">
                  → The experts learn language-specific skills.
                </p>
              </div>
              <div className="rounded-xl bg-muted/35 p-4">
                <p className="font-semibold text-foreground">Overlap</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  Other experts can also perform quite well. For example, the
                  DE expert gets <strong>56.2 BLEU</strong> on the Dutch test
                  data, compared with <strong>59.5 BLEU</strong> from the NL
                  expert.
                </p>
                <p className="mt-2 font-semibold text-foreground">
                  → The experts still share some capabilities.
                </p>
              </div>
            </div>
          </div>
          <p className="border-t border-blue-200 bg-blue-50 px-5 py-4 font-medium leading-7 text-blue-950 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100 sm:px-6">
            <strong>Conclusion:</strong> The experts are specialised, but they
            are not completely separate. This helps explain why choosing the
            wrong expert does not always cause a large drop in BLEU.
          </p>
        </div>
      </section>

      <section id="rq3">
        <SectionHeader title={`RQ3 · ${researchQuestions[2]}`} />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="flex flex-wrap items-center justify-center gap-2 border-b bg-muted/25 px-5 py-4 text-sm font-semibold text-muted-foreground sm:gap-4">
            <span className="text-foreground">Routing</span>
            <span aria-hidden="true">→</span>
            <span className="text-foreground">What drives it</span>
            <span aria-hidden="true">→</span>
            <span className="text-foreground">When it helps</span>
          </div>

          <div className="border-b p-5 sm:p-7">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              01 · Does better routing improve translation?
            </p>
            <div className="grid gap-7 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-4 text-sm font-semibold">
                Hard-routing confusion matrix
              </p>
              <ConfusionMatrix />
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Rows show source languages; columns show selected experts.
                Diagonal cells are correct routes.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                The router gets <strong>64.8%</strong> of routes correct
                overall. German is the hardest to route correctly (
                <strong>40.1%</strong>), while Dutch is the easiest (
                <strong>86.8%</strong>).
              </p>
            </div>
              <div>
                <p className="mb-4 text-sm font-semibold">
                  Learned router vs. LangID router
                </p>
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full min-w-[460px] text-sm">
                    <thead className="bg-blue-700 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">
                          Router
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                          Routing accuracy
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                          BLEU
                        </th>
                        <th className="px-4 py-3 text-right font-semibold">
                          FTA
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        ["Learned", "64.8%", "58.4", ".711", false],
                        ["LangID", "77.5%", "58.9", ".720", true],
                      ].map(([router, accuracy, bleu, fta, highlighted]) => (
                        <tr
                          key={String(router)}
                          className={highlighted ? "bg-muted/35" : ""}
                        >
                          <td className="px-4 py-3 font-medium">{router}</td>
                          <td
                            className={
                              "px-4 py-3 text-right font-mono tabular-nums " +
                              (highlighted
                                ? "font-semibold text-blue-600 dark:text-blue-400"
                                : "")
                            }
                          >
                            {accuracy}
                          </td>
                          <td
                            className={
                              "px-4 py-3 text-right font-mono tabular-nums " +
                              (highlighted
                                ? "font-semibold text-blue-600 dark:text-blue-400"
                                : "")
                            }
                          >
                            {bleu}
                          </td>
                          <td
                            className={
                              "px-4 py-3 text-right font-mono tabular-nums " +
                              (highlighted
                                ? "font-semibold text-blue-600 dark:text-blue-400"
                                : "")
                            }
                          >
                            {fta}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                  Replacing the learned router with LangID improves routing
                  accuracy by <strong>12.7 points</strong>, but BLEU increases
                  by only <strong>0.5</strong> and FTA by <strong>.009</strong>.
                </p>
              </div>
            </div>
            <p className="mt-6 rounded-xl bg-blue-50 px-5 py-4 font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              More accurate routing does not automatically lead to much better
              translation.
            </p>
          </div>

          <div className="border-b p-5 sm:p-7">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              02 · What information does the router use?
            </p>
            <Image
              src="/projects/modular-lora-experts/fig_representation_interventions.png"
              alt="Controlled routing interventions showing layer-wise language-subspace removal and router hidden-unit ablation"
              width={1655}
              height={540}
              className="h-auto w-full rounded-xl bg-white object-contain"
            />
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Controlled routing interventions averaged over three runs. The
              left plot removes language information from different encoder
              layers. The right plot removes important or random hidden units
              from the router. These runs use a separate 63.4% mean routing
              baseline.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">
                  Language information
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  We removed language information from different encoder layers
                  and checked whether the router selected a different expert.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li>Layer 12: routing accuracy <strong>−22.6 points</strong></li>
                  <li><strong>33.5%</strong> of routes change</li>
                  <li>Random removal: only about <strong>0.4 points</strong></li>
                </ul>
                <p className="mt-3 font-semibold text-foreground">
                  The router uses language information to choose an expert.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Important router units
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                  We removed the 16 hidden units that were most important to
                  the router and compared them with 16 random units.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
                  <li>Top 16 units: routing accuracy <strong>−6.64 points</strong></li>
                  <li>Random 16 units: <strong>no clear reduction</strong></li>
                </ul>
                <p className="mt-3 font-semibold text-foreground">
                  A small number of hidden units are especially important for
                  choosing the expert.
                </p>
              </div>
            </div>

            <p className="mb-3 mt-6 text-sm font-semibold">
              Does changing the expert change translation?
            </p>
            <div className="grid items-center gap-4 rounded-xl bg-muted/35 p-5 text-center sm:grid-cols-[1fr_auto_1fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Routing accuracy
                </p>
                <p className="mt-1 text-2xl font-semibold">−22.6 points</p>
              </div>
              <span className="text-2xl text-muted-foreground" aria-hidden="true">
                →
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  BLEU
                </p>
                <p className="mt-1 text-2xl font-semibold">only −0.74</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              This result fits the expert overlap seen in RQ2.
            </p>
            <p className="mt-5 rounded-xl bg-blue-50 px-5 py-4 font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              The router uses language information to pick an expert. But a
              different expert often gives a similar translation.
            </p>
          </div>
          <div className="border-b p-5 sm:p-7">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
              03 · When does expert selection help?
            </p>
            <div className="grid gap-5 lg:grid-cols-2">
              {[
                {
                  title: "Synthetic-source test",
                  rows: [
                    ["Multitask LoRA", "61.0", true],
                    ["Independent Experts", "59.1", false],
                    ["MoE", "58.4", false],
                  ],
                },
                {
                  title: "Authentic-source test",
                  rows: [
                    ["Oracle Experts", "42.10", true],
                    ["MoE", "41.89", false],
                    ["Multitask LoRA", "39.30", false],
                  ],
                },
              ].map(({ title, rows }) => (
                <div key={title} className="overflow-hidden rounded-xl border">
                  <p className="border-b bg-muted/30 px-5 py-3 font-semibold">
                    {title}
                  </p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="px-5 py-3 text-left font-medium">System</th>
                        <th className="px-5 py-3 text-right font-medium">BLEU</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {rows.map(([system, score, best]) => (
                        <tr key={String(system)}>
                          <td className="px-5 py-3 font-medium">{system}</td>
                          <td
                            className={
                              "px-5 py-3 text-right font-mono tabular-nums " +
                              (best
                                ? "font-semibold text-blue-600 dark:text-blue-400"
                                : "")
                            }
                          >
                            {score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Independent/Oracle Experts use the expert matching the known
              source language. BLEU scores should be compared within each test
              setting, not directly across the two datasets.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              On the synthetic-source test, Multitask LoRA performs best. On
              authentic petroleum text, Oracle Experts perform best, while MoE
              comes close and outperforms Multitask LoRA by{" "}
              <strong>2.59 BLEU</strong> and <strong>2.00 chrF</strong> (
              <code className="text-sm text-foreground">p = .0002</code>).
            </p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              The authentic-source test contains{" "}
              <strong>180 naturally occurring petroleum sentences</strong>,
              with 60 sentences for each language. The Norwegian references
              were machine-assisted and manually reviewed.
            </p>
            <p className="mt-5 rounded-xl bg-blue-50 px-5 py-4 font-semibold text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
              Expert selection is more useful on authentic source text.
            </p>
          </div>

          <div className="bg-slate-950 px-5 py-6 text-white sm:px-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              RQ3 · Answer
            </p>
            <p className="mt-2 text-base font-medium leading-7 sm:text-lg">
              Better routing alone produces only small translation gains. The
              router uses language-related information, but the experts
              overlap, so changing the selected expert often has a limited
              effect. Expert selection becomes more useful on authentic source
              text.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
import Image from "next/image";
