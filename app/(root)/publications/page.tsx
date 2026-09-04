import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import PublicationCard from "@/components/publications/publication-card";
import { pagesConfig } from "@/config/pages";
import { publicationsByDate } from "@/config/publications";

export const metadata: Metadata = {
  title: pagesConfig.publications.metadata.title,
  description: pagesConfig.publications.metadata.description,
};

export default function PublicationsPage() {
  return (
    <PageContainer
      title={pagesConfig.publications.title}
      description={pagesConfig.publications.description}
    >
      <PublicationCard publications={publicationsByDate} />
    </PageContainer>
  );
}
