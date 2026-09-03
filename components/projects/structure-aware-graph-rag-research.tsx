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
        <SectionHeader eyebrow="Method overview" title="GraphRAG as Controlled Evidence Navigation" description={<p>We first retrieve evidence using the same hybrid search for every question. The original retrieval results are kept, while graph connections and paths add additional evidence candidates. This makes it possible to measure what the graph contributes beyond standard retrieval.</p>} />
        <PaperFigure src="/projects/graph-rag-evidence/paper-controlled-fusion.png" alt="Controlled GraphRAG fusion pipeline" height={1150} caption="Controlled GraphRAG fusion. The original retrieval results are preserved, while graph expansion and graph paths add complementary evidence before final reranking." />
        <div className="mt-6">
          <h3 className="font-heading text-2xl">Why this design?</h3>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">GraphRAG does not replace the original retrieval results. Instead, it adds evidence that standard retrieval may have missed. This allows a direct comparison between standard retrieval and retrieval with graph-based evidence.</p>
        </div>
      </section>

      <section id="rq1">
        <SectionHeader title="RQ1. Which Graph Links Help Evidence Retrieval?" description={<p>The graph preserves report → year → page → object containment and adds same-page, same-entity, same-metric, and adjacent-page relations. A leave-one-edge-out experiment isolates their observed effects.</p>} />
        <PaperFigure src="/projects/graph-rag-evidence/paper-graph-schema.png" alt="Typed metadata evidence graph schema" height={1050} caption="Web rendering of paper Figure 2. Containment edges preserve provenance; typed relations connect evidence through page-local and cross-page structure." />
        <div className="mt-8">
          <PaperFigure src="/projects/graph-rag-evidence/paper-edge-ablation.png" alt="Edge-type ablation for Object Recall at 10" height={900} caption="Web rendering of paper Figure 3. Positive values mean retrieval improves when that relation is removed." />
        </div>
        <EvidenceConclusion>Removing adjacent-page links raises Object Recall@10 from <strong>77.0%</strong> to <strong>82.6%</strong>. Removing same-entity links lowers it to <strong>75.0%</strong>, while removing same-metric links lowers it to <strong>76.2%</strong>. Structure helps selectively; physical proximity alone introduces plausible noise.</EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Does the Edge Policy Transfer to Later Reports?" description={<p>The no-adjacent-page policy was selected on reports from 2010–2021 and evaluated on held-out reports from 2022–2024.</p>} />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">Object Recall@10</h3>
            <div className="mt-6 space-y-5"><MetricBar label="Full graph" value={0.713} color="bg-slate-500" /><MetricBar label="Without adjacent-page" value={0.84} color="bg-emerald-600" /></div>
          </div>
          <div className="rounded-2xl border bg-background p-5 sm:p-6">
            <h3 className="font-heading text-2xl">MRR</h3>
            <div className="mt-6 space-y-5"><MetricBar label="Full graph" value={0.644} color="bg-slate-500" /><MetricBar label="Without adjacent-page" value={0.728} color="bg-violet-600" /></div>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">On 150 held-out questions, Object Recall@10 improves by 12.7 points and MRR by 8.4 points; both differences have p&lt;0.001 in the paired-bootstrap analysis.</p>
      </section>

      <section id="rq2">
        <SectionHeader title="RQ2. Selected Graph Expansion Drives Object Recovery" description={<p>Every fusion row retains the same reranked E5 output and uses the same cross-encoder with a maximum 80-candidate budget. Only the added graph candidate source changes.</p>} />
        <PaperFigure src="/projects/graph-rag-evidence/paper-controlled-fusion-results.png" alt="Controlled GraphRAG fusion results" height={950} caption="Visualization of paper Table 4. Selected-graph candidates provide most of the exact-object gain; paths mainly add complementary page coverage." />
        <div className="mt-8 overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-blue-700 text-white"><tr><th className="px-5 py-4 font-semibold">Method</th><th className="px-5 py-4 text-right font-semibold">Obj R@1</th><th className="px-5 py-4 text-right font-semibold">Obj R@10</th><th className="px-5 py-4 text-right font-semibold">Page R@10</th><th className="px-5 py-4 text-right font-semibold">MRR</th></tr></thead>
              <tbody className="divide-y">
                {fusionRows.map((row, index) => (
                  <tr key={row[0]} className={index === fusionRows.length - 1 ? "bg-emerald-50 font-semibold dark:bg-emerald-950/25" : index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4">{row[0]}</td>
                    {row.slice(1).map((value, valueIndex) => <td key={`${row[0]}-${valueIndex}`} className="px-5 py-4 text-right font-mono tabular-nums">{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <EvidenceConclusion>Adding selected-graph candidates improves Object Recall@10 from <strong>83.8%</strong> to <strong>85.8%</strong> (p=0.013). Adding paths on top changes object recall only to 85.9%, but raises Page Recall@10 from <strong>90.5%</strong> to <strong>91.7%</strong> (p=0.037). These uncorrected marginal results should be interpreted cautiously.</EvidenceConclusion>
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

      <section>
        <SectionHeader title="Conclusion and Scope" />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border bg-blue-50 p-6 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100"><h3 className="font-heading text-2xl">Main finding</h3><p className="mt-3 leading-7">Graph structure is most useful as a selective complement to strong semantic retrieval. Selected relations recover exact objects; paths add page coverage; reranking remains essential.</p></div>
          <div className="rounded-2xl border bg-muted/20 p-6"><h3 className="font-heading text-2xl">Current scope</h3><p className="mt-3 leading-7 text-muted-foreground">The study covers one English annual-report archive. The graph is heuristic metadata—not a manually curated knowledge graph—and the ordering layer is a diagnostic baseline rather than an autonomous agent.</p></div>
        </div>
      </section>
    </div>
  );
}
