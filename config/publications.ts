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
    status: "In Preparation",
    venue: "COLING 2027 via ACL Rolling Review (ARR)",
    date: "October 2026",
    role: "First author; framework design and experimental lead",
    description:
      "Studies modular LoRA experts for low-resource petroleum NMT, showing that shared adaptation leads on controlled synthetic sources while learned-routing MoE generalises better to authentic source text.",
  },
  {
    title:
      "Structure-Aware Graph Retrieval for Evidence Grounding over Long Annual Reports",
    authors: "Xiaojing Yang, Zhihan Li",
    status: "In Preparation",
    venue: "TBD",
    date: "TBD",
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
    role: "First author; attribution framework, experimental design, and analysis lead",
    description:
      "Introduces exact group-level Shapley attribution over all 16 training-data coalitions across encoder-decoder and decoder-only machine translation models. The results show that data value depends on both the measured behaviour and the evaluation distribution: high-Bokmål data contributes most consistently, while Nynorsk-like data creates trade-offs across translation quality, terminology performance, and written-standard behaviour that size-matched baselines do not explain.",
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
      "FinRAG-Equinor: From Annual Report PDFs to a Reliability-Audited Benchmark for Evidence-Grounded RAG",
    authors: "Xiaojing Yang, Zhihan Li, Meriem Beloucif",
    status: "In Preparation",
    venue: "COLING 2027 via ACL Rolling Review (ARR)",
    date: "October 2026",
    role: "First author; benchmark construction and retrieval evaluation lead",
    description:
      "Introduces a reliability-audited, 720-item benchmark built from 15 consecutive Equinor/Statoil annual reports, with traceable report-, page-, and object-level evidence. The work evaluates hierarchical evidence grounding, retrieval and reranking failures, multi-hop completeness, and end-to-end answer reliability.",
  },
];

export const featuredPublications: PublicationInterface[] = publications.slice(
  0,
  3
);
