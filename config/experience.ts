import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  section: "Research Experience" | "Work Experience" | "Teaching & Mentoring";
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "research-language-technology",
    section: "Research Experience",
    position: "Research Projects in Language Technology",
    company: "Uppsala University / Independent Research",
    location: "Uppsala, Sweden",
    startDate: new Date("2024-08-01"),
    endDate: "Present",
    description: [
      "Designed and led research projects across multilingual NLP, machine translation, retrieval, data attribution, and bias evaluation.",
      "Developed parameter-efficient adaptation pipelines using LoRA, Mixture-of-Experts, NLLB-200, and controlled synthetic data generation.",
      "Built long-document retrieval and GraphRAG evaluation pipelines for evidence grounding over annual reports.",
      "Designed reusable evaluation workflows for language and vision-language model bias, including controlled prompts, metrics, annotation guidelines, and validation reports.",
      "Conducted statistical and robustness analyses using bootstrap confidence intervals, paired tests, ablations, and controlled baselines.",
    ],
    achievements: [
      "Published EAMT 2026 work on LoRA fine-tuning for English-Norwegian petroleum-domain NMT.",
      "Submitted an EMNLP 2026 manuscript on modular LoRA experts and prepared structure-aware graph retrieval work for the October 2026 ARR cycle, targeting COLING 2027.",
      "Developed ongoing work on group-level training data attribution using exact Shapley analysis.",
      "Released or prepared research code and demos for LoRA NMT, modular expert adaptation, and bias evaluation.",
    ],
    skills: [
      "Python",
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "LoRA",
      "NLLB-200",
      "PEFT",
      "RAG",
      "Information Retrieval",
      "Statistics",
      "Optuna",
    ],
  },
  {
    id: "saitisite",
    section: "Work Experience",
    position: "Data Analyst",
    company: "STST CHENGDU E-COMMERCE CO., LTD",
    location: "Chengdu, China",
    startDate: new Date("2020-06-01"),
    endDate: new Date("2024-05-31"),
    description: [
      "Completed various data analytics projects spanning customer intelligence, sales optimization, and predictive modeling across e-commerce, retail, and marketing domains.",
      "Built and deployed an interactive analytics platform using Streamlit, Pandas, and LLM APIs (OpenAI/Gemini) to automate multi-stage data workflows.",
      "Integrated a natural language AI assistant to summarize insights and support decision-making for non-technical users.",
      "Analyzed sales trends and product lifecycle across 800+ SKUs, implementing ABC classification and optimizing pricing strategies.",
      "Conducted RFM analysis and behavioral clustering to segment 150,000+ customers, identifying high-value segments and implementing targeted marketing campaigns.",
      "Developed ensemble forecasting methods (ARIMA, Prophet, LSTM) and integrated them into procurement planning for inventory optimization.",
      "Led 15+ A/B tests on product pages, pricing strategies, and user flows, providing actionable insights to product managers.",
      "Built automated Power BI dashboards and monthly/quarterly reporting templates for management decision-making.",
      "Collaborated with product, marketing, and operations teams to deliver measurable performance improvements.",
    ],
    achievements: [
      "Boosted category revenue by 12% through pricing optimization.",
      "Improved email open rates from 22% to 26% for priority customer segments.",
      "Achieved 30% success rate in customer churn retention efforts.",
      "Reduced excess inventory by 20% and stockouts by 15%, improving inventory turnover by 12%.",
      "Delivered automated dashboards and reporting templates, increasing management efficiency.",
    ],
    skills: [
      "Python",
      "Pandas",
      "Streamlit",
      "Power BI",
      "SQL",
      "Machine Learning",
      "ARIMA",
      "Prophet",
      "LSTM",
      "A/B Testing",
      "Data Visualization",
      "Customer Segmentation",
    ],
  },
  {
    id: "machine-translation-ta",
    section: "Teaching & Mentoring",
    position: "Teaching Assistant, Machine Translation",
    company: "Uppsala University",
    location: "Uppsala, Sweden",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-06-30"),
    description: [
      "Supported 25 students across assignment marking, lab sessions, and project supervision in a machine translation course.",
      "Guided students on translation model implementation, training pipelines, experimental design, and HPC cluster usage.",
      "Provided feedback on project methodology, evaluation setup, and reproducibility practices.",
    ],
    achievements: [
      "Helped students connect theoretical MT concepts with practical model training and evaluation.",
      "Supported project supervision around reproducible experiments and HPC workflows.",
    ],
    skills: [
      "Python",
      "PyTorch",
      "Transformers",
      "NLP",
      "Machine Learning",
      "Git",
      "Statistics",
    ],
  },
  {
    id: "data-analysis-mentor",
    section: "Teaching & Mentoring",
    position: "Data Analysis Mentor",
    company: "STST CHENGDU E-COMMERCE CO., LTD",
    location: "Chengdu, China",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    description: [
      "Mentored 3 junior team members in Python programming, machine learning model evaluation, and data analysis workflows.",
      "Prepared practical tutorials and explained statistical and technical concepts for applied business analytics tasks.",
      "Supported junior analysts in building reproducible Python and SQL workflows for reporting and model evaluation.",
    ],
    achievements: [
      "Improved team capability in Python-based analysis, reproducible reporting, and model evaluation.",
      "Helped junior analysts translate business questions into structured data analysis workflows.",
    ],
    skills: [
      "Python",
      "Pandas",
      "SQL",
      "Machine Learning",
      "Data Analysis",
      "Statistics",
    ],
  },
];
