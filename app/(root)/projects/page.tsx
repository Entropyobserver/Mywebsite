import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/projects/project-card";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { pagesConfig } from "@/config/pages";
import { Projects } from "@/config/projects";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

const renderContent = (tabVal: string) => {
  let projectArr = Projects.filter(
    (project) =>
      project.id !== "multilingual-sentiment" && project.id !== "SmartReview"
  );
  if (tabVal === "research") {
    projectArr = projectArr.filter((val) => val.type === "Research");
  } else if (tabVal === "applied") {
    projectArr = projectArr.filter(
      (val) =>
        val.type === "Data Science" ||
        val.type === "Technical Project" ||
        val.type === "AI"
    );
  }

  const shapleyIndex = projectArr.findIndex(
    (project) => project.id === "group-shapley-attribution"
  );
  if (shapleyIndex !== -1) {
    projectArr = [...projectArr];
    const [shapleyProject] = projectArr.splice(shapleyIndex, 1);
    projectArr.splice(Math.min(2, projectArr.length), 0, shapleyProject);
  }

  const aspectProjectIndex = projectArr.findIndex(
    (project) => project.id === "aspect-controlled-biomedical-retrieval"
  );
  const graphRagIndex = projectArr.findIndex(
    (project) => project.id === "structure-aware-graph-rag"
  );
  if (aspectProjectIndex !== -1 && graphRagIndex !== -1) {
    projectArr = [...projectArr];
    const [aspectProject] = projectArr.splice(aspectProjectIndex, 1);
    const updatedGraphRagIndex = projectArr.findIndex(
      (project) => project.id === "structure-aware-graph-rag"
    );
    projectArr.splice(updatedGraphRagIndex + 1, 0, aspectProject);
  }

  return (
    <div className="mx-auto my-4 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 static">
      {projectArr.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default function ProjectsPage() {
  const tabItems = [
    {
      value: "all",
      label: "All Projects",
      content: renderContent("all"),
    },
    {
      value: "research",
      label: "Research",
      content: renderContent("research"),
    },
    {
      value: "applied",
      label: "Applied AI & Data Science",
      content: renderContent("applied"),
    },
  ];

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <ResponsiveTabs items={tabItems} defaultValue="all" />
    </PageContainer>
  );
}
