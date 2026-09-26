"use client";

import { LayoutGrid, List } from "lucide-react";
import * as React from "react";

import ProjectCard from "@/components/projects/project-card";
import ProjectListItem from "@/components/projects/project-list-item";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { ProjectInterface, Projects } from "@/config/projects";
import { cn } from "@/lib/utils";

type ViewMode = "cards" | "list";

const visibleProjects = Projects.filter(
  (project) =>
    project.id !== "multilingual-sentiment" && project.id !== "SmartReview"
);

const orderProjects = (projects: ProjectInterface[]) => {
  let ordered = [...projects];

  const shapleyIndex = ordered.findIndex(
    (project) => project.id === "group-shapley-attribution"
  );
  if (shapleyIndex !== -1) {
    const [shapleyProject] = ordered.splice(shapleyIndex, 1);
    ordered.splice(Math.min(2, ordered.length), 0, shapleyProject);
  }

  const aspectProjectIndex = ordered.findIndex(
    (project) => project.id === "aspect-controlled-biomedical-retrieval"
  );
  const graphRagIndex = ordered.findIndex(
    (project) => project.id === "structure-aware-graph-rag"
  );
  if (aspectProjectIndex !== -1 && graphRagIndex !== -1) {
    const [aspectProject] = ordered.splice(aspectProjectIndex, 1);
    const updatedGraphRagIndex = ordered.findIndex(
      (project) => project.id === "structure-aware-graph-rag"
    );
    ordered.splice(updatedGraphRagIndex + 1, 0, aspectProject);
  }

  return ordered;
};

const getProjects = (category: string) => {
  if (category === "research") {
    return orderProjects(
      visibleProjects.filter((project) => project.type === "Research")
    );
  }

  if (category === "applied") {
    return orderProjects(
      visibleProjects.filter(
        (project) =>
          project.type === "Data Science" ||
          project.type === "Technical Project" ||
          project.type === "AI"
      )
    );
  }

  return orderProjects(visibleProjects);
};

export default function ProjectDirectory() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("list");

  const renderProjects = (category: string) => {
    const projects = getProjects(category);

    return (
      <div>
        <div className="mb-3 flex justify-end">
          <div
            className="inline-flex rounded-md border border-border bg-background p-1"
            role="group"
            aria-label="Project view"
          >
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                viewMode === "cards" && "bg-accent text-foreground"
              )}
              aria-label="Card view"
              aria-pressed={viewMode === "cards"}
              title="Card view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                viewMode === "list" && "bg-accent text-foreground"
              )}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {viewMode === "cards" ? (
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                project={project}
                key={project.id}
                compact
                showMetrics={false}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <ProjectListItem project={project} key={project.id} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const tabItems = [
    {
      value: "all",
      label: "All Projects",
      content: renderProjects("all"),
    },
    {
      value: "research",
      label: "Research",
      content: renderProjects("research"),
    },
    {
      value: "applied",
      label: "Applied AI & Data Science",
      content: renderProjects("applied"),
    },
  ];

  return <ResponsiveTabs items={tabItems} defaultValue="research" />;
}
