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
  let projectArr = Projects;
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

  const groupShapleyIndex = projectArr.findIndex(
    (project) => project.id === "group-shapley-attribution"
  );
  if (groupShapleyIndex !== -1) {
    projectArr = [...projectArr];
    const [groupShapleyProject] = projectArr.splice(groupShapleyIndex, 1);
    projectArr.splice(2, 0, groupShapleyProject);
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
      label: "All",
      content: renderContent("all"),
    },
    {
      value: "research",
      label: "Research",
      content: renderContent("research"),
    },
    {
      value: "applied",
      label: "Applied AI & Data",
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
