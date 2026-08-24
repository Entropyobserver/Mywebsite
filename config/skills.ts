import { Icons } from "@/components/common/icons";

export interface SkillsInterface {
  name: string;
  description: string;
  skills: string[];
  icon: any;
  accent: "sky" | "emerald" | "violet" | "amber" | "rose" | "cyan" | "slate";
}

export const skillGroups: SkillsInterface[] = [
  {
    name: "Data Analysis & Visualization",
    description:
      "Statistical analysis, exploratory data work, and visualization for real-world datasets, experimental results, and decision support.",
    skills: [
      "Pandas",
      "NumPy",
      "scikit-learn",
      "SQL",
      "R",
      "Statistical Analysis",
      "Data Visualization",
      "Reporting",
    ],
    icon: Icons.plotly,
    accent: "slate",
  },
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
    icon: Icons.settings,
    accent: "cyan",
  },
];

export const skills = skillGroups;
export const featuredSkills = skillGroups.slice(0, 4);
