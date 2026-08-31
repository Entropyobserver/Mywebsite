import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import FinragEquinorResearch from "@/components/projects/finrag-equinor-research";
import GroupShapleyResearch from "@/components/projects/group-shapley-research";
import ModularLoraResearch from "@/components/projects/modular-lora-research";
import ProjectDescription from "@/components/projects/project-description";
import StructureAwareGraphRagResearch from "@/components/projects/structure-aware-graph-rag-research";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-avatar.png";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function Project({ params }: ProjectPageProps) {
  let project = Projects.find((val) => val.id === params.projectId);
  if (!project) {
    redirect("/projects");
  }

  return (
    <article
      className={cn(
        "container relative py-6 lg:py-10",
        project.id === "modular-lora-experts" ||
          project.id === "finrag-equinor" ||
          project.id === "group-shapley-attribution" ||
          project.id === "structure-aware-graph-rag"
          ? "max-w-5xl"
          : "max-w-3xl"
      )}
    >
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        All Projects
      </Link>
      <div>
        <time
          dateTime={Date.now().toString()}
          className="block text-sm text-muted-foreground"
        >
          {formatDateFromObj(project.startDate)}
        </time>
        <h1 className="flex items-center justify-between mt-2 font-heading text-4xl leading-tight lg:text-5xl">
          {project.companyName}
          <div className="flex items-center">
            {project.githubLink && (
              <CustomTooltip text="Link to the source code.">
                <Link href={project.githubLink} target="_blank">
                  <Icons.gitHub className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                </Link>
              </CustomTooltip>
            )}
            {project.websiteLink && (
              <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                <Link href={project.websiteLink} target="_blank">
                  <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground " />
                </Link>
              </CustomTooltip>
            )}
          </div>
        </h1>
        <ChipContainer textArr={project.category} />
        <div className="mt-4 flex space-x-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={profileImg}
              alt={siteConfig.authorName}
              width={42}
              height={42}
              className="rounded-full bg-background"
            />

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{siteConfig.authorName}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Image
        src={project.companyLogoImg}
        alt={project.companyName}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
        priority
      />

      {project.keyMetrics && (
        <div className="mb-8 grid grid-cols-3 gap-3">
          {project.keyMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-border bg-muted/30 px-3 py-4 text-center"
            >
              <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Tech Stack
        </h2>
        <ChipContainer textArr={project.techStack} />
      </div>

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Description
        </h2>
        {/* {<project.descriptionComponent />} */}
        <ProjectDescription
          paragraphs={project.descriptionDetails.paragraphs}
          bullets={project.descriptionDetails.bullets}
        />
      </div>

      {project.id === "modular-lora-experts" ? (
        <ModularLoraResearch />
      ) : project.id === "finrag-equinor" ? (
        <FinragEquinorResearch />
      ) : project.id === "group-shapley-attribution" ? (
        <GroupShapleyResearch />
      ) : project.id === "structure-aware-graph-rag" ? (
        <StructureAwareGraphRagResearch />
      ) : (
        <div className="mb-7 ">
          <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">
            Project Highlights
          </h2>
          {project.pagesInfoArr.map((page, ind) => (
            <div key={ind}>
              <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
                <Icons.star className="h-5 w-5 mr-2" /> {page.title}
              </h3>
              <div>
                <p className="whitespace-pre-line">{page.description}</p>
                {page.imgArr.map((img, ind) => (
                  <a
                    key={ind}
                    href={img}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${page.title} image at full size`}
                    className={cn(
                      "block",
                      page.imageLayout === "portrait" && "mx-auto w-fit"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${page.title} figure`}
                      width={page.imageLayout === "portrait" ? 435 : 720}
                      height={page.imageLayout === "portrait" ? 749 : 405}
                      className={cn(
                        "my-4 rounded-md border bg-muted transition-colors",
                        page.imageLayout === "portrait" &&
                          "max-h-[650px] w-auto max-w-full object-contain"
                      )}
                      priority
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
