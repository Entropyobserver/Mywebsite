import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import GithubRedirectCard from "@/components/contact/github-redirect-card";
import { ContactForm } from "@/components/forms/contact-form";
import { pagesConfig } from "@/config/pages";

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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ContactForm />
        </div>
        <div className="flex-1">
          <div className="bg-muted/50 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-2">Response Time</h4>
                <p className="text-sm">Usually within 24 hours</p>
              </div>
              <div>
                <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-2">Services</h4>
                <ul className="text-sm space-y-1">
                  <li>• AI/ML Consulting</li>
                  <li>• Data Science Solutions</li>
                  <li>• Custom Software Development</li>
                  <li>• Technical Research</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
