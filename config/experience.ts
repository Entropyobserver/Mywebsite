import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
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
    id: "saitisite",
    position: "Data Analyst",
    company: "SAITISITE CHENGDU E-COMMERCE CO., LTD",
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
    id: "freelance-ai",
    position: "Freelance AI / NLP Developer",
    company: "Independent Projects",
    location: "Remote",
    startDate: new Date("2024-06-01"),
    endDate: "Present",
    description: [
      "Led full-cycle development of multilingual sentiment analysis platform using BERT-family models, supporting full fine-tuning and LoRA parameter-efficient tuning.",
      "Developed Smart View Platform for review analysis: sentiment, topic classification, review quality, fake review detection, and ABSA.",
      "Built LLM-powered data assistant on Streamlit for automated EDA, data quality checks, and conversational summarization.",
      "Architected hybrid e-commerce search & recommendation engine (dense + sparse + cross-encoder re-ranking), improving nDCG@10 by 30%.",
      "Developed modular RAG system combining FAISS, CrossEncoder, and Flan-T5-large for natural language product search and comparison.",
    ],
    achievements: [
      "Achieved 93% accuracy in English binary sentiment classification; 70%+ in multilingual three-class tasks across six languages.",
      "Optimized NLP models with quantization and distillation for efficient deployment.",
      "Delivered interactive Gradio web apps for real-time and batch analysis with interpretability (SHAP, LIME).",
      "Built scalable web interfaces with configurable search strategies and intelligent metadata extraction.",
      "Demonstrated 0.73+ semantic similarity in RAG product retrieval, supporting e-commerce search and comparison.",
    ],
    skills: [
      "Python",
      "PyTorch",
      "Transformers",
      "Streamlit",
      "Gradio",
      "FAISS",
      "RAG",
      "NLP",
      "Machine Learning",
      "Data Analysis",
      "Information Retrieval",
      "Prompt Engineering",
    ],
  },
];
