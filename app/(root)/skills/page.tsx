import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import SkillsCard from "@/components/skills/skills-card";
import { pagesConfig } from "@/config/pages";
import { skills } from "@/config/skills";

const technicalBackground = [
  "My technical background spans data analysis, machine learning, NLP, and research engineering. My previous experience as a data analyst provided a strong foundation in Python, SQL, R, statistical modelling, machine learning, and experimental design, together with practical experience working with real-world data and evaluating analytical results.",
  "During my MSc in Language Technology, I extended this foundation into NLP research, working with PyTorch and Hugging Face on transformer-based models, machine translation, large language models, information retrieval, and model adaptation methods such as LoRA and Mixture-of-Experts.",
  "My research places a strong emphasis on rigorous evaluation. I have experience with statistical testing, bootstrap confidence intervals, ablation studies, error analysis, and human evaluation, using these methods to understand model behaviour and assess the reliability of experimental findings.",
  "More recently, my work has moved toward data-centric research, including corpus analysis, data filtering, and training-data attribution with Shapley values. From an engineering perspective, I use Git, Linux, Docker, and HPC/GPU environments to support reproducible research and large-scale experimentation.",
];

export const metadata: Metadata = {
  title: pagesConfig.skills.metadata.title,
  description: pagesConfig.skills.metadata.description,
};

export default function SkillsPage() {
  return (
    <PageContainer
      title={pagesConfig.skills.title}
      description={pagesConfig.skills.description}
    >
      <section className="mb-6 rounded-lg border bg-background p-6">
        <h2 className="font-heading text-2xl">Technical Background</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          {technicalBackground.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <SkillsCard skills={skills} />
    </PageContainer>
  );
}
