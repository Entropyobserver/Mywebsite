import Image from "next/image";

const researchQuestions = [
  "Which structural relations are useful for evidence retrieval, and which introduce noise?",
  "What do selected-graph expansion and graph-path retrieval contribute beyond a strong hybrid retriever under controlled conditions?",
  "How do structure-aware retrieval methods behave on multi-hop and visual/layout-sensitive questions?",
];

const fusionRows = [
  ["Hybrid E5 + rerank", ".673", ".838", ".908", ".730"],
  ["Retained E5 + selected graph", ".673", ".858", ".905", ".737"],
  ["Retained E5 + graph paths", ".668", ".850", ".914", ".733"],
  ["Retained E5 + graph + paths", ".670", ".859", ".917", ".736"],
] as const;

function SectionHeader({ eyebrow, title, description }: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{eyebrow}</p>}
      <h2 className="font-heading text-3xl leading-tight lg:text-4xl">{title}</h2>
      {description && <div className="mt-3 max-w-3xl leading-7 text-muted-foreground">{description}</div>}
    </div>
  );
}

function PaperFigure({ src, alt, height, caption }: {
  src: string;
  alt: string;
  height: number;
  caption: string;
}) {
  return (
    <figure>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Open ${alt} at full size`} className="block overflow-hidden rounded-2xl border bg-slate-50">
        <Image src={src} alt={alt} width={1600} height={height} className="h-auto w-full" />
      </a>
      <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function EvidenceConclusion({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 rounded-r-xl border-l-4 border-blue-600 bg-blue-50 px-5 py-4 font-medium leading-relaxed text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">{children}</div>;
}

function MetricBar({ label, value, color = "bg-blue-600" }: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono font-semibold tabular-nums">{(value * 100).toFixed(1)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value * 100}%` }} role="img" aria-label={`${label}: ${(value * 100).toFixed(1)}%`} />
      </div>
    </div>
  );
}

export default function StructureAwareGraphRagResearch() {
  return (
    <div className="space-y-16">
      <section>
        <SectionHeader title="Research Questions" />
        <div className="space-y-3">
          {researchQuestions.map((question, index) => (
            <div key={question} className="flex gap-4 rounded-2xl border bg-background p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-heading text-sm text-white">RQ{index + 1}</span>
              <p className="self-center font-medium leading-relaxed">{question}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Method overview"
          title="GraphRAG as Controlled Evidence Navigation"
          description={
            <>
              <p>Standard retrieval finds evidence mainly through <strong>text similarity</strong>. Our GraphRAG approach also uses <strong>document structure</strong>, connecting evidence through shared pages, entities, and financial metrics. The goal is to test whether these graph connections can recover useful evidence that standard retrieval misses.</p>
              <p className="mt-4">For each question, the benchmark provides the reference report and year. We first run BM25 + E5 hybrid retrieval within this scope and retain its reranked top-10 results. Two graph-based methods then add evidence in different ways: <strong>selected-graph expansion</strong> starts from the hybrid top-10 and follows same-page, same-entity, and same-metric links, while <strong>graph-path retrieval</strong> independently uses entity and metric cues from the question to navigate the graph. The original hybrid results and graph candidates are then combined, deduplicated, and reranked with the same cross-encoder.</p>
            </>
          }
        />
        <PaperFigure src="/projects/graph-rag-evidence/paper-controlled-fusion.png" alt="Controlled GraphRAG fusion pipeline" height={1150} caption="Controlled GraphRAG fusion. Selected-graph expansion builds on hybrid retrieval, while graph paths provide an independent, query-guided source of evidence." />
        <div className="mt-6">
          <h3 className="font-heading text-2xl">Why this design?</h3>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">By retaining the original hybrid results, we can directly test whether graph-based retrieval finds <strong>additional useful evidence</strong> that standard retrieval missed, rather than simply replacing a strong baseline.</p>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader title="RQ1. Which Graph Connections Help?" description={<><p>The graph connects evidence through four types of relations: <strong>same-page, same-entity, same-metric, and adjacent-page</strong>. But adding more connections does not necessarily improve retrieval.</p><p className="mt-4">To understand which relations actually help, we remove one relation at a time while keeping the rest of the retrieval pipeline unchanged.</p></>} />
        <PaperFigure src="/projects/graph-rag-evidence/paper-graph-schema.png" alt="Typed metadata evidence graph schema" height={1050} caption="The graph connects evidence based on document structure, shared entities, and financial metrics." />
        <div className="mt-8">
          <PaperFigure src="/projects/graph-rag-evidence/paper-edge-ablation.png" alt="Edge-type ablation for Object Recall at 10" height={900} caption="Positive values mean retrieval improves when a relation is removed." />
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">The results show clear differences between relation types. <strong className="text-foreground">Same-entity links provide the strongest useful signal, while same-metric links provide a smaller benefit. Same-page links show little clear effect on object retrieval. In contrast, adjacent-page links introduce noise: removing them improves retrieval.</strong></p>
        <EvidenceConclusion><strong>Key finding:</strong> GraphRAG benefits from <strong>meaningful connections</strong>, not simply more connections.</EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Does This Pattern Hold Across Reporting Years?" description={<p>As an additional <strong>temporal robustness check</strong>, we repeat the adjacent-page comparison on later reports from <strong>2022–2024</strong>. The same pattern remains: removing adjacent-page links improves both object retrieval and ranking quality.</p>} />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-blue-700 text-white"><tr><th scope="col" className="px-5 py-4 font-semibold">Metric</th><th scope="col" className="px-5 py-4 text-right font-semibold">Full graph</th><th scope="col" className="px-5 py-4 text-right font-semibold">Without adjacent-page</th></tr></thead>
              <tbody className="divide-y">
                <tr><th scope="row" className="px-5 py-4 font-medium">Object Recall@10</th><td className="px-5 py-4 text-right font-mono tabular-nums">71.3%</td><td className="px-5 py-4 text-right font-mono tabular-nums"><strong>84.0%</strong></td></tr>
                <tr className="bg-muted/35"><th scope="row" className="px-5 py-4 font-medium">MRR</th><td className="px-5 py-4 text-right font-mono tabular-nums">0.644</td><td className="px-5 py-4 text-right font-mono tabular-nums"><strong>0.728</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">This provides additional evidence that the negative effect of adjacent-page expansion is <strong>consistent across reporting years within the Equinor collection</strong>.</p>
        <EvidenceConclusion><strong>Scope:</strong> This is a robustness check within one company&apos;s reports, not a separate train/test evaluation or evidence of generalization to other companies or industries.</EvidenceConclusion>
      </section>

      <section id="rq2">
        <SectionHeader title="RQ2. What Does Each Graph Source Add?" description={<p>We compare the same hybrid baseline with <strong>selected-graph candidates, graph-path candidates, and both together</strong>.</p>} />
        <PaperFigure src="/projects/graph-rag-evidence/paper-controlled-fusion-results.png" alt="Controlled GraphRAG fusion results" height={950} caption="Visualization of paper Table 4. Selected-graph candidates provide most of the exact-object gain; paths mainly add complementary page coverage." />
        <div className="mt-8 overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-blue-700 text-white"><tr><th className="px-5 py-4 font-semibold">Method</th><th className="px-5 py-4 text-right font-semibold">Obj R@1</th><th className="px-5 py-4 text-right font-semibold">Obj R@10</th><th className="px-5 py-4 text-right font-semibold">Page R@10</th><th className="px-5 py-4 text-right font-semibold">MRR</th></tr></thead>
              <tbody className="divide-y">
                {fusionRows.map((row, index) => (
                  <tr key={row[0]} className={index === fusionRows.length - 1 ? "bg-emerald-50 dark:bg-emerald-950/25" : index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4">{row[0]}</td>
                    {row.slice(1).map((value, valueIndex) => {
                      const isBest = (index === 0 && valueIndex === 0)
                        || (index === 1 && (valueIndex === 0 || valueIndex === 3))
                        || (index === 3 && (valueIndex === 1 || valueIndex === 2));
                      return <td key={`${row[0]}-${valueIndex}`} className={`px-5 py-4 text-right font-mono tabular-nums ${isBest ? "font-bold" : ""}`}>{value}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 leading-7 text-muted-foreground"><strong className="text-foreground">Selected-graph expansion provides most of the object-recovery gain</strong>, improving Object Recall@10 from <strong className="text-foreground">83.8% to 85.8%</strong>. Adding graph paths on top changes object recall very little (<strong className="text-foreground">85.8% → 85.9%</strong>), but increases Page Recall@10 from <strong className="text-foreground">90.5% to 91.7%</strong>.</p>
        <EvidenceConclusion><strong>Key finding:</strong> Selected graph mainly helps recover missing evidence objects, while graph paths contribute more to <strong>page-level coverage</strong> than exact-object recovery.</EvidenceConclusion>
      </section>

      <section id="rq3">
        <SectionHeader title="RQ3. Coverage and Precise Grounding Remain Different Problems" description={<p>Multi-hop questions require every supporting item, while visual questions may require page context that text-only object retrieval cannot fully represent.</p>} />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">90 multi-hop questions</h3>
            <div className="mt-6 space-y-5"><MetricBar label="Hybrid E5 · any object R@10" value={1} color="bg-slate-500" /><MetricBar label="Hybrid E5 · all objects R@10" value={0.678} /><MetricBar label="Retained E5 + both · all objects R@10" value={0.722} color="bg-emerald-600" /><MetricBar label="Retained E5 + both · all pages R@10" value={0.744} color="bg-violet-600" /></div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Finding at least one evidence item is easy here; retrieving the complete evidence set remains substantially harder.</p>
          </div>
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">90 visual/layout questions</h3>
            <div className="mt-6 space-y-5"><MetricBar label="Hybrid E5 · object R@10" value={0.411} /><MetricBar label="Retained E5 + graph + paths · object R@10" value={0.5} color="bg-emerald-600" /><MetricBar label="Retained E5 + graph + paths · page R@10" value={0.778} color="bg-violet-600" /><MetricBar label="Rule-routed GraphRAG · MRR" value={0.32} color="bg-amber-500" /></div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Fusion retrieves more supporting objects, while diagnostic ordering improves top-rank quality. Page-image encoders and multimodal rerankers remain future work.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
