import Link from "next/link";
import Image from "next/image";

import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pipelineSteps = [
  {
    title: "Collect and Extract",
    description:
      "The pipeline collects public English and Norwegian web pages and PDFs from Equinor. It extracts the text and saves the title, language, URL, document ID, and other source information.",
  },
  {
    title: "Pair Bilingual Documents",
    description:
      "For the machine translation data, official language-switch links are used to identify matching English and Norwegian articles. Reciprocal links are checked to confirm that the two articles form a valid bilingual pair.",
  },
  {
    title: "Align Sentences",
    description:
      "The matched articles are divided into sentences. LaBSE is then used to find English and Norwegian sentences that are likely to be translations of each other.",
  },
  {
    title: "Filter Sentence Pairs",
    description:
      "The pipeline retains sentence pairs with similar meanings and reasonable lengths. Website noise and duplicate pairs are removed, and the Norwegian sentences are checked to ensure that they are written in Bokmal.",
  },
  {
    title: "Create Dataset Splits",
    description:
      "The final sentence pairs are divided into training, validation, and test sets by bilingual document pair. This prevents content from the same article from appearing in different sets.",
  },
] as const;

const researchOutputs = [
  ["English-Norwegian sentence pairs", "Machine translation"],
  ["Monolingual document records", "Language-model training and adaptation"],
  ["Traceable text chunks", "Information retrieval and RAG"],
] as const;

export default function NorwegianPetroleumCorpusResearch() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-heading text-3xl leading-tight">My Contributions</h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          As the project lead, I designed and implemented the complete
          corpus-construction pipeline, from source collection and text
          extraction to bilingual document pairing, sentence alignment,
          quality filtering, and dataset splitting. I also created traceable
          research outputs for machine translation, language-model research,
          and information retrieval.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">
          Project Highlights
        </h2>
        <h3 className="mt-5 font-heading text-2xl leading-tight">
          Reproducible Corpus Pipeline
        </h3>
        <a
          href="/projects/equinor-web-corpus/cover.svg"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Norwegian Petroleum Language Data Pipeline figure at full size"
          className="mt-6 block overflow-hidden rounded-md border bg-slate-50"
        >
          <Image
            src="/projects/equinor-web-corpus/cover.svg"
            alt="Norwegian Petroleum Language Data Pipeline"
            width={1440}
            height={810}
            className="h-auto w-full"
          />
        </a>
        <ol className="mt-6 divide-y border-y">
          {pipelineSteps.map((step, index) => (
            <li key={step.title} className="grid gap-3 py-6 sm:grid-cols-[3rem_1fr]">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-700 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h4 className="font-heading text-xl leading-tight">
                  {step.title}
                </h4>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-5 leading-7 text-muted-foreground">
          PDFs and web pages without a matching translation are used only for
          the language-model and retrieval data.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">
          Research Outputs
        </h2>
        <div className="mt-5 overflow-hidden rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Output
                  </th>
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Intended use
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {researchOutputs.map(([output, use]) => (
                  <tr key={output}>
                    <th scope="row" className="px-5 py-4 font-medium">
                      {output}
                    </th>
                    <td className="px-5 py-4 text-muted-foreground">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="font-heading text-2xl leading-tight">
          Research Connection
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          This corpus provides the new-domain data for a subsequent
          continual-adaptation study of new-source learning, old-source
          forgetting, and replay-based retention in petroleum-domain machine
          translation.
        </p>
        <Link
          href="/projects/continual-petroleum-mt"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-4"
          )}
        >
          View Continual Adaptation Study
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
