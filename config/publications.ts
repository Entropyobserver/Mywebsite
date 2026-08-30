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
    title:
      "LoRA Fine-Tuning of English-Norwegian NMT for the Oil & Gas Industry",
    authors: "Xiaojing Yang, Zhihan Li, Gege Sun, Mengyue Li, Meriem Beloucif",
    status: "Published",
    venue:
      "Proceedings of the 26th Annual Conference of the European Association for Machine Translation (Volume 1)",
    date: "June 2026",
    role: "First author; lead experimental contributor",
    description:
      "Pages 385-398. Tilburg, The Netherlands. European Association for Machine Translation. ISBN 9789403901411.",
    links: [
      {
        label: "ACL Anthology",
        href: "https://aclanthology.org/2026.eamt-1.25/",
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
    title:
      "Modular Expert Architectures for Multilingual Domain Adaptation: Parameter-Efficient Norwegian Petroleum Translation with LoRA and Gated Routing",
    authors: "Xiaojing Yang",
    status: "Thesis",
    venue: "MSc Thesis, Uppsala University, 46 pages",
    date: "June 2026",
    role: "Thesis author; framework design and experimental lead",
    description:
      "Master's thesis presenting a parameter-efficient multilingual adaptation framework that combines language-specific LoRA experts, gated routing, and target-anchored synthetic data for Norwegian petroleum-domain translation.",
    links: [
      {
        label: "DiVA Record",
        href: "https://urn.kb.se/resolve?urn=urn:nbn:se:uu:diva-592985",
      },
      {
        label: "Thesis PDF",
        href: "https://uu.diva-portal.org/smash/get/diva2:2081638/FULLTEXT01.pdf",
      },
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
      "Studies modular LoRA experts for low-resource petroleum NMT, showing that shared adaptation leads on controlled synthetic sources while learned-routing MoE generalises better to authentic source text.",
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
      "When Data Cleaning Becomes Bias: Target-Standard Specialization in Norwegian Machine Translation",
    authors: "Zhihan Li, Xiaojing Yang",
    status: "In Preparation",
    venue: "TBD",
    date: "December 2026",
    role: "Co-author; controlled experiment design and analysis lead",
    description:
      "Uses size-controlled LoRA-based NLLB experiments to show how Bokmål filtering changes output standards and reverses BLEU and chrF rankings across reference standards, framing implicit specialization as an MT audit problem.",
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

export const featuredPublications: PublicationInterface[] = publications.slice(
  0,
  3
);
