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
      "EAMT 2026 research on LoRA adaptation for low-resource petroleum-domain machine translation.",
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
      "A diagnostic study of modular LoRA experts for low-resource petroleum translation.",
  },
  {
    title:
      "Structure-Aware Graph Retrieval for Evidence Grounding over Long Annual Reports",
    authors: "Xiaojing Yang, Zhihan Li",
    status: "In Preparation",
    venue: "TBD",
    date: "December 2026",
    role: "First author; retrieval framework and evaluation lead",
    description:
      "Controlled GraphRAG research showing that selected graph expansion improves exact evidence recovery, while graph paths add complementary page coverage over long annual reports.",
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
      "Exact Shapley analysis of how training groups shape machine-translation behavior.",
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
      "A controlled English-Norwegian MT study showing how Bokmål filtering creates target-standard specialization—and how reference choice can turn that specialization into an evaluation-bias problem.",
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
      "A reliability-audited benchmark for evidence-grounded RAG on 15 long annual reports, with 720 QA items and traceable report-, page-, and object-level evidence.",
  },
];

const fixedPublications = publications.filter(
  ({ status }) => status === "Published" || status === "Thesis"
);

const manuscriptsInPreparation = publications
  .filter(({ status }) => status !== "Published" && status !== "Thesis")
  .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

export const publicationsByDate: PublicationInterface[] = [
  ...fixedPublications,
  ...manuscriptsInPreparation,
];

export const featuredPublications: PublicationInterface[] =
  publicationsByDate.slice(0, 3);
