import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectDirectory from "@/components/projects/project-directory";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
  alternates: { canonical: `${siteConfig.url}/projects` },
};

export default function ProjectsPage() {
  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <ProjectDirectory />
    </PageContainer>
  );
}
