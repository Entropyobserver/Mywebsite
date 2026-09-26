import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { PublicationInterface } from "@/config/publications";

interface PublicationCardProps {
  publications: PublicationInterface[];
  variant?: "cards" | "list";
}

const statusStyles: Record<PublicationInterface["status"], string> = {
  Published:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Thesis:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  "Under Review":
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "In Preparation":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

export default function PublicationCard({
  publications,
  variant = "cards",
}: PublicationCardProps) {
  if (variant === "list") {
    return (
      <div className="mx-auto divide-y divide-border">
        {publications.map((publication) => {
          const publicationLinks =
            publication.links ??
            (publication.link
              ? [{ label: "Open", href: publication.link }]
              : []);

          return (
            <article
              className="grid gap-3 py-5 first:pt-1 md:grid-cols-[130px_minmax(0,1fr)] md:gap-6"
              key={publication.title}
            >
              <div className="flex items-center gap-2 md:block md:space-y-2">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[publication.status]}`}
                >
                  {publication.status}
                </span>
                <p className="text-xs text-muted-foreground">
                  {publication.date}
                </p>
              </div>

              <div className="min-w-0">
                <h2 className="font-heading text-xl leading-snug text-foreground">
                  {publication.title}
                </h2>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {publication.authors}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {publication.description}
                </p>

                <div className="mt-3 grid gap-1 text-sm text-muted-foreground lg:grid-cols-2 lg:gap-4">
                  <p className="flex items-start gap-2">
                    <Icons.star className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{publication.venue}</span>
                  </p>
                  <p>{publication.role}</p>
                </div>

                {publicationLinks.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {publicationLinks.map((publicationLink) => (
                      <Link
                        href={publicationLink.href}
                        target="_blank"
                        key={publicationLink.href}
                        className="inline-flex items-center gap-1 rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <span>{publicationLink.label}</span>
                        <Icons.externalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {publications.map((publication) => {
        const publicationLinks =
          publication.links ??
          (publication.link ? [{ label: "Open", href: publication.link }] : []);

        return (
          <div
            className="relative h-full rounded-lg border bg-background p-6 hover:bg-accent hover:text-accent-foreground"
            key={publication.title}
          >
            <div className="flex h-full min-h-[300px] flex-col justify-between gap-5">
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
                {publicationLinks.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {publicationLinks.map((publicationLink) => (
                      <Link
                        href={publicationLink.href}
                        target="_blank"
                        key={publicationLink.href}
                        className="inline-flex items-center gap-1 rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <span>{publicationLink.label}</span>
                        <Icons.externalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
