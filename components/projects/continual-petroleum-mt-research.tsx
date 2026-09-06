import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const designRows = [
  [
    "NPD only",
    "Performance before the model is updated with Equinor data.",
  ],
  [
    "Equinor only",
    "Performance when the model is trained directly on Equinor data.",
  ],
  [
    "Mixed training",
    "Performance when all NPD and Equinor data are used together.",
  ],
  [
    "Continual adaptation",
    "What happens when the NPD model is updated using only Equinor data.",
  ],
  [
    "Continual + replay",
    "Whether adding a small amount of NPD data during the Equinor update reduces forgetting.",
  ],
] as const;

const resultRows = [
  [
    "NPD only",
    "61.16",
    "34.03",
    "Strong on NPD but weak on Equinor.",
  ],
  [
    "Equinor only",
    "50.37",
    "42.29",
    "Strong on Equinor but weak on NPD.",
  ],
  [
    "Mixed training",
    "59.92",
    "42.26",
    "Strong overall results using all data.",
  ],
  [
    "Continual adaptation",
    "54.73",
    "42.72",
    "Learns Equinor well but forgets some NPD knowledge.",
  ],
  [
    "Continual + 5% replay",
    "58.21",
    "42.11",
    "Reduces forgetting using a small amount of NPD data.",
  ],
  [
    "Continual + 10% replay",
    "59.22",
    "41.85",
    "Gives the best lightweight balance across both sources.",
  ],
] as const;

function ResultsTable({
  headers,
  rows,
  highlightCells = {},
  highlightRows = {},
}: {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
  highlightCells?: Record<string, string>;
  highlightRows?: Record<string, string>;
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
              <tr key={row[0]} className={highlightRows[row[0]]}>
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
                          "text-right font-mono tabular-nums text-foreground",
                        highlightCells[`${row[0]}-${headers[index]}`]
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
          How can an MT model learn from a new data source without forgetting
          what it learned from the previous source?
        </p>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          The answer is evaluated through a controlled comparison of
          single-source, mixed-source, continual, and replay-based update
          strategies.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">
          Experimental Design
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          The experiments compare single-source training, mixed-source
          training, continual adaptation, and replay-based continual adaptation.
          All settings use fixed NPD and Equinor test sets. In total, 27 LoRA
          adapters were trained across three random seeds.
        </p>
        <ResultsTable
          headers={["Strategy", "What it tests"]}
          rows={designRows}
        />
      </section>

      <section>
        <h2 className="font-heading text-3xl leading-tight">Results</h2>
        <ResultsTable
          headers={["Update strategy", "NPD BLEU", "Equinor BLEU", "What it shows"]}
          rows={resultRows}
          highlightRows={{
            "Continual + 10% replay": "bg-emerald-50/70 dark:bg-emerald-950/20",
          }}
          highlightCells={{
            "NPD only-NPD BLEU": "font-bold text-emerald-700 dark:text-emerald-300",
            "Continual adaptation-Equinor BLEU":
              "font-bold text-blue-700 dark:text-blue-300",
            "Continual + 10% replay-NPD BLEU":
              "font-bold text-emerald-700 dark:text-emerald-300",
            "Continual + 10% replay-Equinor BLEU":
              "font-semibold text-foreground",
          }}
        />
        <div className="mt-6 rounded-r-md border-l-4 border-blue-700 bg-blue-50 px-5 py-4 leading-7 text-blue-950 dark:bg-blue-950/30 dark:text-blue-100">
          <h3 className="font-heading text-xl leading-tight">Main Finding</h3>
          <p className="mt-3">
            Replay-based continual adaptation gives the best practical update
            strategy. Continual adaptation improves performance on newer
            Equinor data but reduces performance on the earlier NPD source.
            Adding 5-10% NPD replay recovers much of the NPD loss while
            preserving most of the Equinor gain.
          </p>
        </div>
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
