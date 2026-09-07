import Image from "next/image";

const researchQuestions = [
  "Which structural relations are useful for evidence retrieval, and which introduce noise?",
  "What do selected-graph expansion and graph-path retrieval contribute beyond a strong hybrid retriever under controlled conditions?",
  "How do structure-aware retrieval methods behave on multi-hop and visual/layout-sensitive questions?",
];

const fusionRows = [
  ["Hybrid E5", "83.8%", "90.8%"],
  ["+ Selected Graph", "85.6%", "90.3%"],
  ["+ Graph Paths", "85.0%", "91.4%"],
  ["+ Graph + Paths", "85.9%", "91.8%"],
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
              <p className="mt-4">The system combines evidence from three sources: <strong>hybrid retrieval</strong> provides the original results, <strong>selected-graph expansion</strong> finds related evidence from those results, and <strong>graph paths</strong> independently find evidence using cues from the question. All candidates are then combined and reranked.</p>
            </>
          }
        />
        <PaperFigure src="/projects/graph-rag-evidence/paper-controlled-fusion.png" alt="Simplified controlled GraphRAG fusion pipeline" height={1150} caption="Simplified web illustration of the controlled fusion pipeline." />
      </section>

      <section id="rq1">
        <SectionHeader title="RQ1. Which Graph Connections Help?" description={<><p>The graph connects evidence in four ways: evidence can appear on the <strong>same page</strong>, mention the <strong>same entity</strong>, refer to the <strong>same financial metric</strong>, or appear on <strong>adjacent pages</strong>.</p><p className="mt-4">We test these connections one at a time to see <strong>which ones help GraphRAG find the right evidence and which ones introduce noise</strong>.</p></>} />
        <PaperFigure src="/projects/graph-rag-evidence/paper-graph-schema.png" alt="Simplified typed metadata graph schema" height={1050} caption="Evidence is connected through document structure, shared entities, and shared financial metrics." />
        <div className="mt-8">
          <PaperFigure src="/projects/graph-rag-evidence/paper-edge-ablation.png" alt="Edge-type ablation for Object Recall at 10" height={900} caption="Each relation is removed in turn to measure how it affects retrieval." />
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">The results show that <strong className="text-foreground">same-entity connections are the most useful, while same-metric connections provide a smaller benefit. Same-page connections have limited impact. Adjacent-page connections are harmful because they bring in distracting evidence from nearby pages.</strong></p>
        <EvidenceConclusion><strong>Key finding:</strong> More graph connections are not always better. <strong>What matters is connecting evidence that is meaningfully related.</strong></EvidenceConclusion>
      </section>

      <section>
        <SectionHeader title="Does This Finding Hold in Later Reports?" description={<p>Our main analysis shows that <strong>adjacent-page links can introduce noise and hurt retrieval</strong>. We repeat the comparison on reports from <strong>2022–2024</strong> to see whether the same finding holds in later years.</p>} />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-blue-700 text-white"><tr><th scope="col" className="px-5 py-4 font-semibold">Metric</th><th scope="col" className="px-5 py-4 text-right font-semibold">With adjacent-page links</th><th scope="col" className="px-5 py-4 text-right font-semibold">Without adjacent-page links</th></tr></thead>
              <tbody className="divide-y">
                <tr><th scope="row" className="px-5 py-4 font-medium">Object Recall@10</th><td className="px-5 py-4 text-right font-mono tabular-nums">70.0%</td><td className="px-5 py-4 text-right font-mono tabular-nums"><strong>84.7%</strong></td></tr>
                <tr className="bg-muted/35"><th scope="row" className="px-5 py-4 font-medium">MRR</th><td className="px-5 py-4 text-right font-mono tabular-nums">0.633</td><td className="px-5 py-4 text-right font-mono tabular-nums"><strong>0.729</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">Removing adjacent-page links again improves retrieval, suggesting that this effect is <strong>consistent across different years within the Equinor reports</strong>. This check does not test generalization to other companies or document collections.</p>
      </section>

      <section id="rq2">
        <SectionHeader title="RQ2. What Does Each Graph Source Add?" description={<p>We compare the original hybrid retrieval with two graph-based methods: <strong>Selected Graph</strong> and <strong>Graph Paths</strong>. The original hybrid results are kept, and each graph method adds additional evidence before the final ranking.</p>} />
        <div className="overflow-hidden rounded-2xl border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-blue-700 text-white"><tr><th className="px-5 py-4 font-semibold">Method</th><th className="px-5 py-4 text-right font-semibold">Object Recall@10</th><th className="px-5 py-4 text-right font-semibold">Page Recall@10</th></tr></thead>
              <tbody className="divide-y">
                {fusionRows.map((row, index) => (
                  <tr key={row[0]} className={index === fusionRows.length - 1 ? "bg-emerald-50 dark:bg-emerald-950/25" : index % 2 ? "bg-muted/35" : ""}>
                    <td className="px-5 py-4">{row[0]}</td>
                    {row.slice(1).map((value, valueIndex) => <td key={`${row[0]}-${valueIndex}`} className={`px-5 py-4 text-right font-mono tabular-nums ${index === fusionRows.length - 1 ? "font-bold" : ""}`}>{value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">The two graph methods help in different ways. <strong className="text-foreground">Selected Graph improves the retrieval of specific evidence</strong>, increasing Object Recall@10 from 83.8% to 85.6%. <strong className="text-foreground">Graph Paths mainly help find relevant pages</strong>: when added to Selected Graph, Page Recall@10 increases from 90.3% to 91.8%.</p>
        <p className="mt-4 leading-7 text-muted-foreground">Together, <strong className="text-foreground">Graph + Paths gives the best overall coverage</strong>, reaching 85.9% Object Recall@10 and 91.8% Page Recall@10.</p>
      </section>

      <section id="rq3">
        <SectionHeader title="RQ3. Coverage and Precise Grounding Remain Different Problems" description={<p>Some questions require more than finding a single relevant evidence object. <strong>Multi-hop questions require complete evidence coverage</strong>, while <strong>visual and layout questions often require locating the right evidence within a relevant page</strong>.</p>} />
        <div>
          <h3 className="font-heading text-2xl">Multi-Hop Questions</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-blue-700 text-white"><tr><th scope="col" className="px-5 py-4 font-semibold">Retrieval result</th><th scope="col" className="px-5 py-4 text-right font-semibold">Hybrid E5</th><th scope="col" className="px-5 py-4 text-right font-semibold">Retained E5 + Graph + Paths</th></tr></thead>
                <tbody className="divide-y">
                  <tr><th scope="row" className="px-5 py-4 font-medium">At least one evidence object found</th><td className="px-5 py-4 text-right font-mono font-bold tabular-nums">100.0%</td><td className="px-5 py-4 text-right font-mono font-bold tabular-nums">100.0%</td></tr>
                  <tr className="bg-muted/35"><th scope="row" className="px-5 py-4 font-medium">All evidence objects found</th><td className="px-5 py-4 text-right font-mono tabular-nums">67.8%</td><td className="px-5 py-4 text-right font-mono font-bold tabular-nums">72.2%</td></tr>
                  <tr><th scope="row" className="px-5 py-4 font-medium">All evidence pages found</th><td className="px-5 py-4 text-right font-mono tabular-nums">71.1%</td><td className="px-5 py-4 text-right font-mono font-bold tabular-nums">74.4%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">The baseline finds at least one relevant object for every multi-hop question, but complete evidence recovery is much harder. Graph and path candidates improve coverage of the full evidence set.</p>
          <EvidenceConclusion><strong>Key finding:</strong> Finding part of the evidence is easier than finding <strong>all evidence required to support an answer</strong>.</EvidenceConclusion>
        </div>
        <div className="mt-10">
          <h3 className="font-heading text-2xl">Visual and Layout Questions</h3>
          <div className="mt-5 overflow-hidden rounded-2xl border bg-background">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="bg-blue-700 text-white"><tr><th scope="col" className="px-5 py-4 font-semibold">Retrieval result</th><th scope="col" className="px-5 py-4 text-right font-semibold">Hybrid E5</th><th scope="col" className="px-5 py-4 text-right font-semibold">Retained E5 + Graph + Paths</th></tr></thead>
                <tbody className="divide-y">
                  <tr><th scope="row" className="px-5 py-4 font-medium">Evidence object found</th><td className="px-5 py-4 text-right font-mono tabular-nums">41.1%</td><td className="px-5 py-4 text-right font-mono font-bold tabular-nums">50.0%</td></tr>
                  <tr className="bg-muted/35"><th scope="row" className="px-5 py-4 font-medium">Evidence page found</th><td className="px-5 py-4 text-right font-mono tabular-nums">73.3%</td><td className="px-5 py-4 text-right font-mono font-bold tabular-nums">78.9%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-5 leading-7 text-muted-foreground">Graph and path candidates improve both object and page coverage, but a substantial gap remains between finding the correct page and locating the exact evidence object within it.</p>
          <EvidenceConclusion><strong>Key finding:</strong> For visual and layout questions, reaching the right page does not guarantee <strong>precise evidence grounding</strong>. Richer visual or multimodal retrieval may be needed to close this gap.</EvidenceConclusion>
        </div>
      </section>

    </div>
  );
}
