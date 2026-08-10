export type PublicationStatus =
  | "Published"
  | "Under Review"
  | "Planned Submission";

export interface PublicationInterface {
  title: string;
  status: PublicationStatus;
  venue: string;
  date: string;
  role: string;
  description: string;
  link?: string;
}

export const publications: PublicationInterface[] = [
  {
    title:
      "LoRA Fine-Tuning of English-Norwegian NMT for the Oil & Gas Industry",
    status: "Published",
    venue: "EAMT",
    date: "June 2026",
    role: "Lead experimental contributor",
    description:
      "Investigates parameter-efficient adaptation of neural machine translation for the Norwegian oil and gas domain, covering LoRA fine-tuning, hyperparameter optimisation, data-quality assessment, and model-scale evaluation.",
    link: "https://github.com/Entropyobserver/mt",
  },
  {
    title:
      "Beyond Routing: Diagnosing Modular LoRA Experts for Low-Resource Multilingual Petroleum-Domain Translation",
    status: "Under Review",
    venue: "EMNLP 2026",
    date: "October 2026",
    role: "Framework design and experimental lead",
    description:
      "Studies modular expert architectures for low-resource, domain-specific NMT, including language-specific LoRA adapters, learned routing, target-anchored synthetic data, terminology-aware evaluation, and routing analysis.",
  },
  {
    title:
      "Structure-Aware Graph Retrieval for Evidence Grounding over Long Annual Reports",
    status: "Under Review",
    venue: "EMNLP 2026",
    date: "October 2026",
    role: "Retrieval framework and evaluation lead",
    description:
      "Evaluates how document structure, graph-based candidate expansion, and deterministic routing can improve evidence grounding over long financial reports, with robustness testing and held-out-year validation.",
  },
  {
    title:
      "Group-level Training Data Attribution with Exact Shapley Analysis: A Controlled Machine Translation Case Study",
    status: "Planned Submission",
    venue: "TBD",
    date: "December 2026",
    role: "Attribution framework and experiment lead",
    description:
      "Investigates group-level training-data attribution in neural machine translation using exact Shapley analysis, coalition training, size-matched baselines, bootstrap confidence intervals, and group-level statistical tests.",
  },
  {
    title:
      "Target-Standard Bias from Data Filtering in Norwegian Machine Translation",
    status: "Planned Submission",
    venue: "WMT",
    date: "December 2026",
    role: "Controlled experiment design and analysis lead",
    description:
      "Studies how target-side data filtering affects written-standard preferences in English-Norwegian machine translation using controlled LoRA-based NLLB experiments and paired statistical validation.",
  },
  {
    title:
      "A Human-Validated Benchmark for Long-Form Financial Document Question Answering",
    status: "Planned Submission",
    venue: "TBD",
    date: "December 2026",
    role: "Benchmark construction and retrieval evaluation lead",
    description:
      "Introduces a human-validated benchmark for long-form financial document question answering over annual reports, including evidence-object construction, retrieval evaluation, reranking, and statistical analysis.",
  },
];

export const featuredPublications: PublicationInterface[] =
  publications.slice(0, 3);
