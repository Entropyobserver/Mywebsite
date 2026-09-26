import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";

interface ProjectCardProps {
  project: ProjectInterface;
  compact?: boolean;
}

export default function ProjectCard({
  project,
  compact = false,
}: ProjectCardProps) {
  return (
    <article
      className={`relative h-full bg-background border border-border rounded-lg ${
        compact ? "max-w-none p-4" : "max-w-sm p-6"
      }`}
    >
      <div className={`relative w-full ${compact ? "h-[148px]" : "h-[200px]"}`}>
        <Image
          className="rounded-lg border border-border object-cover"
          src={project.companyLogoImg}
          alt="img"
          fill
        />
      </div>
      <div className={compact ? "space-y-2 pt-4" : "space-y-3 pt-5"}>
        <h5
          className={`font-bold tracking-tight text-foreground ${
            compact ? "text-xl leading-snug" : "text-2xl"
          }`}
        >
          {project.companyName}
        </h5>
        <p
          className={`${compact ? "line-clamp-2 text-sm" : "line-clamp-3"} font-normal text-muted-foreground`}
        >
          {project.shortDescription}
        </p>
        {project.keyMetrics && (
          <div
            className={`grid grid-cols-3 gap-2 border-y border-border ${
              compact ? "py-2" : "py-3"
            }`}
          >
            {project.keyMetrics.map((metric) => (
              <div key={metric.label} className="min-w-0 text-center">
                <p
                  className={`${compact ? "text-sm" : "text-sm sm:text-base"} font-bold text-foreground`}
                >
                  {metric.value}
                </p>
                <p
                  className={`${compact ? "text-[10px]" : "text-[10px] sm:text-xs"} leading-tight text-muted-foreground`}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        )}
        <ChipContainer
          textArr={project.category}
          compact={compact}
          maxItems={compact ? 3 : undefined}
        />
        <Link href={`/projects/${project.id}`}>
          <Button
            variant={compact ? "ghost" : "default"}
            size={compact ? "sm" : "default"}
            className={compact ? "-ml-3 mt-1" : "mt-2"}
          >
            Read more
            <Icons.chevronRight className="w-4 ml-1" />
          </Button>
        </Link>
      </div>
      {!compact && (
        <div className="absolute bottom-4 right-4 p-3 rounded-full bg-background border border-border">
          {project.type === "AI" ? (
            <Icons.userFill className="h-4 w-4" />
          ) : (
            <Icons.work className="h-4 w-4" />
          )}
        </div>
      )}
    </article>
  );
}
