import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";

interface ProjectListItemProps {
  project: ProjectInterface;
}

export default function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <article className="group flex items-center gap-3 rounded-lg border border-border bg-background p-3 transition-colors hover:border-foreground/20 sm:gap-4 sm:p-4">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md border border-border sm:h-24 sm:w-36">
        <Image
          className="object-cover"
          src={project.companyLogoImg}
          alt=""
          fill
        />
      </div>

      <div className="min-w-0 flex-1">
        <Link href={`/projects/${project.id}`} className="block">
          <h2 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
            {project.companyName}
          </h2>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {project.shortDescription}
        </p>
        <ChipContainer textArr={project.category} compact maxItems={3} />
      </div>

      {project.keyMetrics && (
        <div className="hidden w-[270px] shrink-0 grid-cols-3 gap-3 border-l border-border pl-4 lg:grid">
          {project.keyMetrics.map((metric) => (
            <div key={metric.label} className="min-w-0 text-center">
              <p className="text-sm font-bold text-foreground">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <Link
        href={`/projects/${project.id}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label={`Read more about ${project.companyName}`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
