import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { PublicationInterface } from "@/config/publications";

interface PublicationCardProps {
  publications: PublicationInterface[];
}

const statusStyles: Record<PublicationInterface["status"], string> = {
  Published: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "Under Review": "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "Planned Submission":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

export default function PublicationCard({
  publications,
}: PublicationCardProps) {
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {publications.map((publication) => {
        const card = (
          <div className="relative h-full rounded-lg border bg-background p-6 hover:bg-accent hover:text-accent-foreground">
            {publication.link && (
              <Icons.externalLink
                size={35}
                className="absolute bottom-3 right-3 rounded-full border bg-background p-2 text-muted-foreground"
              />
            )}
            <div className="flex h-full min-h-[260px] flex-col justify-between gap-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[publication.status]}`}
                  >
                    {publication.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {publication.date}
                  </span>
                </div>
                <h3 className="font-heading text-xl leading-snug">
                  {publication.title}
                </h3>
                <p className="text-sm font-medium text-foreground">
                  {publication.authors}
                </p>
                <p className="text-sm text-muted-foreground">
                  {publication.description}
                </p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icons.star className="h-4 w-4" />
                  <span>{publication.venue}</span>
                </p>
                <p>{publication.role}</p>
              </div>
            </div>
          </div>
        );

        return publication.link ? (
          <Link href={publication.link} target="_blank" key={publication.title}>
            {card}
          </Link>
        ) : (
          <div key={publication.title}>{card}</div>
        );
      })}
    </div>
  );
}
