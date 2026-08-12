import { Icons } from "@/components/common/icons";

export interface SkillEvidenceLink {
  label: string;
  href: string;
}

export interface SkillsInterface {
  name: string;
  description: string;
  skills: string[];
  evidence: SkillEvidenceLink[];
  icon: any;
  accent: "sky" | "emerald" | "violet" | "amber" | "rose" | "cyan" | "slate";
}

export const skillGroups: SkillsInterface[] = [
  {
    name: "AI & Machine Learning",
    description:
      "Deep learning, Transformer adaptation, fine-tuning workflows, and model evaluation for research and applied AI systems.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Transformers",
      "Fine-tuning",
      "LoRA / PEFT",
      "Model Evaluation",
    ],
    evidence: [
      { label: "LoRA NMT", href: "/projects/lora-nmt-petroleum" },
      { label: "Modular Experts", href: "/projects/modular-lora-experts" },
      { label: "SmartReview", href: "/projects/SmartReview" },
    ],
    icon: Icons.aurora,
    accent: "sky",
  },
  {
    name: "NLP & Language Technology",
    description:
      "Multilingual NLP, machine translation, retrieval, and language-technology systems for specialized domains.",
    skills: [
      "Machine Translation",
      "RAG",
      "Information Retrieval",
      "LLM Evaluation",
      "Multilingual NLP",
      "Terminology Analysis",
    ],
    evidence: [
      { label: "EAMT Publication", href: "/publications" },
      { label: "FinRAG", href: "/projects/finrag-equinor" },
      { label: "Graph Retrieval", href: "/projects/structure-aware-graph-rag" },
    ],
    icon: Icons.gitRepoIcon,
    accent: "emerald",
  },
  {
    name: "Responsible AI & Evaluation",
    description:
      "Bias evaluation, human validation, statistical testing, and model behavior analysis for social and linguistic AI risks.",
    skills: [
      "Bias Evaluation",
      "Human Annotation",
      "Bootstrap Testing",
      "Error Analysis",
      "Cohen's Kappa",
      "VLM Framing",
    ],
    evidence: [
      { label: "Bias Framework", href: "/projects/vlm-bias-evaluation" },
      { label: "Target-Standard Bias", href: "/projects/target-standard-bias" },
    ],
    icon: Icons.check,
    accent: "violet",
  },
  {
    name: "Data-Centric ML",
    description:
      "Dataset diagnostics, filtering, attribution, and quality control for understanding how training data shapes model behavior.",
    skills: [
      "Data Filtering",
      "Data Attribution",
      "Shapley Analysis",
      "Corpus Diagnostics",
      "Quality Control",
      "Data Auditing",
    ],
    evidence: [
      { label: "Shapley Attribution", href: "/projects/group-shapley-attribution" },
      { label: "Target-Standard Bias", href: "/projects/target-standard-bias" },
      { label: "LoRA NMT", href: "/projects/lora-nmt-petroleum" },
    ],
    icon: Icons.gitBranch,
    accent: "amber",
  },
  {
    name: "ML Engineering",
    description:
      "Research engineering skills for building reproducible model-training pipelines, experiments, demos, and deployments.",
    skills: [
      "PyTorch",
      "Hugging Face",
      "Python",
      "Docker",
      "Git",
      "Experiment Tracking",
    ],
    evidence: [
      { label: "Projects", href: "/projects" },
      { label: "GitHub", href: "https://github.com/Entropyobserver" },
    ],
    icon: Icons.laptop,
    accent: "rose",
  },
  {
    name: "Applied AI Systems",
    description:
      "User-facing AI tools, dashboards, and interactive prototypes that turn model outputs into usable workflows.",
    skills: [
      "Gradio",
      "Streamlit",
      "Dashboards",
      "Plotly",
      "SQLite",
      "User-facing AI Tools",
    ],
    evidence: [
      { label: "Sentiment Platform", href: "/projects/multilingual-sentiment" },
      { label: "SmartReview", href: "/projects/SmartReview" },
    ],
    icon: Icons.settings,
    accent: "cyan",
  },
  {
    name: "Data Analysis & Visualization",
    description:
      "Statistical analysis, visualization, and exploratory data work for experiments, reports, and decision support.",
    skills: [
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Statistical Analysis",
      "Data Visualization",
      "Reporting",
    ],
    evidence: [
      { label: "Experience", href: "/experience" },
      { label: "Research Projects", href: "/projects" },
    ],
    icon: Icons.plotly,
    accent: "slate",
  },
];

export const skills = skillGroups;
export const featuredSkills = skillGroups.slice(0, 4);
