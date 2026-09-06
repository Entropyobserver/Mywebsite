import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const designRows = [
  [
    "NPD-only adaptation",
    "How well the original adapted model performs on the earlier NPD source.",
  ],
  [
    "Equinor-full adaptation",
    "How much performance improves when adapting directly to the newer Equinor source.",
  ],
  [
    "Mixed-full training",
    "A full retraining baseline using both NPD and Equinor data.",
  ],
  [
    "Continual NPD to Equinor",
    "Whether updating the NPD adapter on Equinor improves new-source performance but causes old-source forgetting.",
  ],
  [
    "Continual + 5% / 10% replay",
    "Whether adding a small amount of NPD data during the Equinor update reduces forgetting.",
  ],
] as const;

const resultRows = [
  [
    "NPD-only",
    "61.16",
    "34.03",
    "Strong earlier-source performance, weak Equinor transfer.",
  ],
  [
    "Equinor-full",
    "50.37",
    "42.29",
    "Strong newer-source performance, weaker NPD retention.",
  ],
  [
    "Mixed-full",
    "59.92",
    "42.26",
    "Strong full-retraining baseline across both sources.",
  ],
  [
    "Continual NPD to Equinor",
    "54.73",
    "42.72",
    "Best Equinor score, but clear NPD performance loss.",
  ],
  [
    "Continual + 5% replay",
    "58.21",
    "42.11",
    "Recovers much of the NPD loss with small Equinor cost.",
  ],
  [
    "Continual + 10% replay",
    "59.22",
    "41.85",
    "Best replay retention, close to mixed-full on NPD.",
  ],
] as const;

function ResultsTable({
  headers,
  rows,
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-blue-700 text-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={cn(
                    "px-5 py-4 font-semibold",
                    index > 0 && index < headers.length - 1 && "text-right"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={cell} scope="row" className="px-5 py-4 font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={`${row[0]}-${cell}`}
                      className={cn(
                        "px-5 py-4 text-muted-foreground",
                        index < row.length - 1 &&
                          "text-right font-mono tabular-nums text-foreground"
                      )}
                    >
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ContinualPetroleumMtResearch() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-heading text-3xl leading-tight">
          Research Question
        </h2>
        <p className="mt-4 max-w-3xl text-xl font-medium leading-8">
          How should an English-Norwegian petroleum MT system be updated when
          new data from a different source become available?
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          This project studies this question in a source-update setting: an MT
          model is first adapted to an earlier NPD petroleum corpus and then
          updated with newer Equinor data. The goal is to compare different
          update strategies and understand the trade-off between learning from
          the newer source and retaining performance on the earlier source.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">
          Experimental Design
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          The study starts from an NPD-adapted English-Norwegian petroleum MT
          model and uses newer Equinor data as the update source. It compares
          update strategies under the same NLLB-200 distilled 600M backbone,
          LoRA configuration, three random seeds, and fixed NPD and Equinor
          test sets.
        </p>
        <ResultsTable
          headers={["Strategy", "What it tests"]}
          rows={designRows}
        />
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">Main Finding</h2>
        <div className="mt-5 rounded-r-md border-l-4 border-blue-700 bg-blue-50 px-5 py-4 leading-7 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
          Replay-based continual adaptation gives the best practical update
          strategy. Continual adaptation improves performance on newer Equinor
          data but reduces performance on the earlier NPD source. Adding 5-10%
          NPD replay recovers much of the NPD loss while preserving most of the
          Equinor gain.
        </div>
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">Evidence</h2>
        <ResultsTable
          headers={["Update strategy", "NPD BLEU", "Equinor BLEU", "Takeaway"]}
          rows={resultRows}
        />
      </section>

      <section className="border-t pt-8">
        <h2 className="font-heading text-2xl leading-tight">Short Summary</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
          The results show that replay is a lightweight alternative to full
          mixed retraining: 10% NPD replay recovers NPD BLEU from 54.73 to
          59.22 while keeping Equinor BLEU high at 41.85.
        </p>
        <Link
          href="/projects/equinor-web-corpus"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-4"
          )}
        >
          View Corpus Pipeline
          <Icons.chevronRight className="ml-2 h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
