export type PublicationStatus =
  | "Published"
  | "Thesis"
  | "Under Review"
  | "In Preparation";

export interface PublicationLinkInterface {
  label: string;
  href: string;
}

export interface PublicationInterface {
  title: string;
  authors: string;
  status: PublicationStatus;
  venue: string;
  date: string;
  role: string;
  description: string;
  link?: string;
  links?: PublicationLinkInterface[];
}

export const publications: PublicationInterface[] = [
  {
    title: "LoRA Fine-Tuning of English-Norwegian NMT for the Oil & Gas Industry",
    authors:
      "Xiaojing Yang, Zhihan Li, Gege Sun, Mengyue Li, Meriem Beloucif",
    status: "Published",
    venue: "EAMT 2026, Proceedings Volume 2",
    date: "June 2026",
    role: "First author; lead experimental contributor",
    description:
      'Published in the official EAMT 2026 proceedings. The ACL Anthology entry is forthcoming; to locate the paper in the proceedings PDF, search for the title "LoRA Fine-Tuning of English-Norwegian NMT for the Oil & Gas Industry".',
    links: [
      {
        label: "Official Proceedings PDF",
        href: "https://eamt2026.org/assets/pdfs/EAMT2026_proceedings_Vol_2.pdf",
      },
      {
        label: "Code",
        href: "https://github.com/Entropyobserver/lora-nmt-petroleum",
      },
      {
        label: "Demo",
        href: "https://huggingface.co/spaces/entropy25/mt",
      },
    ],
  },
  {
    title: "Modular Expert Architectures for Multilingual Domain Adaptation",
    authors: "Xiaojing Yang",
    status: "Thesis",
    venue: "MSc Thesis, Uppsala University",
    date: "May 2026",
    role: "Thesis author; framework design and experimental lead",
    description:
      "Master's thesis on modular LoRA expert architectures for low-resource multilingual petroleum-domain NMT. Publicly summarized at a high level because the work forms the basis of an ongoing manuscript revision.",
    links: [
      {
        label: "Code",
        href: "https://github.com/Entropyobserver/lora-moe-petroleum",
      },
      {
        label: "Demo",
        href: "https://huggingface.co/spaces/entropy25/mt_moe",
      },
    ],
  },
  {
    title:
      "Beyond Routing: Diagnosing Modular LoRA Experts for Low-Resource Multilingual Petroleum-Domain Translation",
    authors: "Xiaojing Yang, Zhihan Li, Meriem Beloucif",
    status: "Under Review",
    venue: "EMNLP 2026",
    date: "October 2026",
    role: "First author; framework design and experimental lead",
    description:
      "Studies modular expert architectures for low-resource, domain-specific NMT, including language-specific LoRA adapters, learned routing, target-anchored synthetic data, terminology-aware evaluation, and routing analysis.",
  },
  {
    title:
      "Structure-Aware Graph Retrieval for Evidence Grounding over Long Annual Reports",
    authors: "Xiaojing Yang, Zhihan Li, Meriem Beloucif",
    status: "Under Review",
    venue: "EMNLP 2026",
    date: "October 2026",
    role: "First author; retrieval framework and evaluation lead",
    description:
      "Evaluates how document structure, graph-based candidate expansion, and deterministic routing can improve evidence grounding over long financial reports, with robustness testing and held-out-year validation.",
  },
  {
    title:
      "Group-level Training Data Attribution with Exact Shapley Analysis: A Controlled Machine Translation Case Study",
    authors: "Xiaojing Yang, Zhihan Li",
    status: "In Preparation",
    venue: "TBD",
    date: "December 2026",
    role: "First author; attribution framework and experiment lead",
    description:
      "Investigates group-level training-data attribution in neural machine translation using exact Shapley analysis, coalition training, size-matched baselines, bootstrap confidence intervals, and group-level statistical tests.",
  },
  {
    title:
      "Target-Standard Bias from Data Filtering in Norwegian Machine Translation",
    authors: "Zhihan Li, Xiaojing Yang",
    status: "In Preparation",
    venue: "TBD",
    date: "December 2026",
    role: "Co-author; controlled experiment design and analysis lead",
    description:
      "Studies how target-side data filtering affects written-standard preferences in English-Norwegian machine translation using controlled LoRA-based NLLB experiments and paired statistical validation.",
  },
  {
    title:
      "A Human-Validated Benchmark for Long-Form Financial Document Question Answering",
    authors: "Xiaojing Yang, Zhihan Li, Meriem Beloucif",
    status: "In Preparation",
    venue: "TBD",
    date: "December 2026",
    role: "First author; benchmark construction and retrieval evaluation lead",
    description:
      "Introduces a human-validated benchmark for long-form financial document question answering over annual reports, including evidence-object construction, retrieval evaluation, reranking, and statistical analysis.",
  },
];

export const featuredPublications: PublicationInterface[] =
  publications.slice(0, 3);
