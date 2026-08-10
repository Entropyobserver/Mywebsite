import { Metadata } from "next";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import PageContainer from "@/components/common/page-container";
import { ContactForm } from "@/components/forms/contact-form";
import { pagesConfig } from "@/config/pages";
import { SocialLinks } from "@/config/socials";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <ContactForm />
        </div>
        <div className="flex-1">
          <div className="h-fit space-y-6 rounded-lg bg-muted/50 p-6">
            <div>
              <h3 className="mb-2 text-xl font-semibold">Direct Contact</h3>
              <Link
                href="mailto:sicper2011@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Icons.gmail className="h-4 w-4" />
                sicper2011@gmail.com
              </Link>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Research Interests
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Data attribution and model behaviour</li>
                <li>Responsible AI and bias evaluation</li>
                <li>Multilingual NLP and machine translation</li>
                <li>Retrieval, RAG, and evidence grounding</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Best For
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>Research collaboration</li>
                <li>PhD or academic opportunities</li>
                <li>Paper, project, or dataset discussion</li>
                <li>Technical ML/NLP conversations</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Profiles
              </h4>
              <div className="flex flex-wrap gap-2">
                {SocialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      href={social.link}
                      target={
                        social.link.startsWith("mailto:") ? undefined : "_blank"
                      }
                      key={social.name}
                      className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Icon className="h-4 w-4" />
                      {social.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
