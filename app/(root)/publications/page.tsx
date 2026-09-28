import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import PublicationCard from "@/components/publications/publication-card";
import { pagesConfig } from "@/config/pages";
import { publicationsByDate } from "@/config/publications";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pagesConfig.publications.metadata.title,
  description: pagesConfig.publications.metadata.description,
  alternates: { canonical: `${siteConfig.url}/publications` },
};

export default function PublicationsPage() {
  return (
    <PageContainer
      title={pagesConfig.publications.title}
      description={pagesConfig.publications.description}
    >
      <PublicationCard publications={publicationsByDate} variant="list" />
    </PageContainer>
  );
}
