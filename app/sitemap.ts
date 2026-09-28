import { MetadataRoute } from "next";

import { experiences } from "@/config/experience";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const lastModified = new Date();
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/publications`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const hiddenProjectIds = new Set(["multilingual-sentiment", "SmartReview"]);
  const projectRoutes: MetadataRoute.Sitemap = Projects.filter(
    (project) => !hiddenProjectIds.has(project.id)
  ).map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const experienceRoutes: MetadataRoute.Sitemap = experiences.map(
    (experience) => ({
      url: `${baseUrl}/experience/${experience.id}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    })
  );

  return [...routes, ...projectRoutes, ...experienceRoutes];
}
