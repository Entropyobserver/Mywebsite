import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
  imageLayout?: "landscape" | "portrait";
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

interface KeyMetricInterface {
  value: string;
  label: string;
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  keyMetrics?: KeyMetricInterface[];
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "lora-nmt-petroleum",
    companyName:
      "LoRA Fine-Tuning of English-Norwegian NMT for the Oil & Gas Industry",
    type: "Research",
    category: [
      "Research",
      "Machine Translation",
      "LoRA / PEFT",
      "Low-Resource NLP",
      "Domain Adaptation",
      "Data Quality",
      "Hyperparameter Optimization",
      "Human Evaluation",
    ],
    shortDescription:
      "EAMT 2026 research on LoRA adaptation for low-resource petroleum-domain machine translation.",
    websiteLink: "https://huggingface.co/spaces/entropy25/mt",
    githubLink: "https://github.com/Entropyobserver/lora-nmt-petroleum",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "NLLB-200",
      "LoRA",
      "PEFT",
      "Optuna",
      "SacreBLEU",
      "COMET",
      "chrF",
      "Pandas",
      "Statistics",
      "Weights & Biases",
    ],
    startDate: new Date("2025-09-01"),
    endDate: new Date("2026-06-01"),
    companyLogoImg: "/projects/lora-nmt-petroleum/cover.png",
    pagesInfoArr: [
      {
        title: "Research Questions",
        description:
          "RQ1. Can we adapt a general-purpose model to this domain without a lot of data or heavy computation?\n\nRQ2. How much training data do we actually need?\n\nRQ3. Can we further improve results through hyperparameter optimization?\n\nRQ4. How can we rigorously evaluate the final model on the held-out test set?",
        imgArr: [],
      },
      {
        title: "Experimental Framework",
        description:
          "To answer these research questions, we designed a three-stage framework covering data scaling, dual-track LoRA hyperparameter optimization, and final benchmarking.",
        imgArr: ["/projects/lora-nmt-petroleum/framework_vertical_paper.png"],
        imageLayout: "portrait",
      },
      {
        title: "Corpus Source, Diagnostics, and Cleaning",
        description:
          "The dataset comes from the Norwegian Petroleum Directorate translation memory released through ELRC. Before training, I built a diagnostic and cleaning pipeline to understand the quality of the raw EN-NO data and prepare it for domain adaptation. The pipeline checks alignment, completeness, duplicates, and domain relevance, then cleans the corpus and creates fixed train/dev/test splits.",
        imgArr: ["/projects/lora-nmt-petroleum/corpus-source-pipeline.png"],
      },
      {
        title: "Experiment 1: How Much Training Data Do We Need?",
        description:
          "We trained LoRA models with nine different subsets of training data, ranging from 100 to 13,935 sentence pairs, using three random seeds for each setting. The learning curve shows three stages: rapid gains up to 2,000 pairs, diminishing returns from 2,000 to 8,000, and little additional improvement beyond 8,000. The 8,000-pair subset used 57% of the full training data while retaining 96% of the maximum BLEU, so we selected it as the training budget for subsequent hyperparameter optimization.",
        imgArr: ["/projects/lora-nmt-petroleum/experiment-1-data-scaling.png"],
      },
      {
        title: "Experiment 2a: Grid Search Hyperparameter Landscape",
        description:
          "We tested 27 combinations of LoRA rank, alpha, and dropout. Higher alpha generally improved validation BLEU, while increasing rank showed no consistent benefit. Models without dropout tended to perform slightly better. The best observed setting was r = 8, alpha = 64, and dropout = 0. Since grid search tests only fixed values, better settings may exist between or beyond them.",
        imgArr: ["/projects/lora-nmt-petroleum/hyperparameter_heatmaps.png"],
      },
      {
        title: "Experiment 2b: Optuna with ASHA Pruning",
        description:
          "We ran 50 Optuna trials on a 2,000-pair subset to explore a wider range of LoRA configurations. Optuna proposed new parameter combinations, while ASHA stopped poorly performing trials early. The most promising configurations were then selected for further evaluation on the 8,000-pair subset. An fANOVA analysis attributed 97.3% of the observed performance variation to alpha, compared with 1.9% for rank and 0.8% for dropout.",
        imgArr: ["/projects/lora-nmt-petroleum/optuna_importance.png"],
      },
      {
        title:
          "Experiment 2c: Multi-Objective Selection and Stability Validation",
        description:
          "We used Optuna to optimize both BLEU and chrF. We identified Pareto-optimal configurations, meaning configurations where improving one metric would require sacrificing the other. We then selected the top three candidates and retrained them on the 8,000-pair subset with three different random seeds. The selected configuration, r = 8, alpha = 64, and dropout = 0, achieved BLEU scores of 60.33, 60.61, and 60.11 across the three runs. The similar scores suggest that the configuration was stable.",
        imgArr: ["/projects/lora-nmt-petroleum/pareto_front.png"],
      },
      {
        title: "Experiment 3: Final Model Performance",
        description:
          "We then compared the final LoRA model with the zero-shot NLLB baseline and commercial MT systems. In this petroleum-domain setting, it achieved comparable performance on BLEU, chrF++, and COMET. These sentence-level results should not be taken as representative of real-world petroleum-domain performance, given the limited data available in this study.",
        imgArr: ["/projects/lora-nmt-petroleum/final_model_performance.png"],
      },
      {
        title: "Experiment 4: LoRA vs. Full Fine-Tuning",
        description:
          "We then compared LoRA with full fine-tuning across different training sizes. The BLEU difference between the two methods remained below one point, showing that LoRA can achieve similar performance to full fine-tuning while using fewer trainable parameters and less computation.",
        imgArr: ["/projects/lora-nmt-petroleum/lora_vs_full_ft.png"],
      },
      {
        title: "Human Evaluation Protocol",
        description:
          "We also conducted a human error analysis to complement BLEU, chrF, and COMET. We sampled 50 sentences from low-, mid-, and high-BLEU groups in the 1,742-sentence held-out NPD test set. Two reviewers annotated errors using eight categories and three severity levels, and we used Cohen's kappa to measure their agreement before combining the results.",
        imgArr: ["/projects/lora-nmt-petroleum/human_eval_process_flow.png"],
      },
      {
        title: "Human Error Analysis: Findings",
        description:
          "We found 62 errors in 41 of the 50 sentences. Most errors were minor, but 12% were critical and changed the factual or technical meaning. The most common errors were word choice and mixing Norwegian variants. Importantly, some critical errors also appeared in high-BLEU translations, showing that automatic metrics alone may miss important domain-specific errors.",
        imgArr: [
          "/projects/lora-nmt-petroleum/human-error-analysis-results.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project investigates low-resource machine translation for the petroleum industry. Using the multilingual NLLB-200 model with LoRA-based adaptation, we study how data quality, training-set size, and LoRA hyperparameters affect translation performance. We evaluate the models using automatic metrics and terminology-focused human evaluation.",
        "As first author and lead experimental contributor, I led the experimental design, corpus diagnostics, LoRA optimization, and benchmarking, while jointly conducting the terminology-focused human evaluation.",
      ],
      bullets: [
        "Designed a data-quality assessment and cleaning pipeline for noisy parallel corpora, assessing alignment quality, completeness, duplication, and domain-specific terminology coverage.",
        "Optimized LoRA configurations using grid search and Optuna/ASHA, with fANOVA identifying the LoRA scaling factor as a major contributor to adaptation performance.",
        "Benchmarked the final LoRA model against full fine-tuning and commercial MT systems using automatic translation metrics.",
        "Jointly conducted terminology-focused review and a 50-sentence human evaluation, including inter-annotator agreement analysis, alongside automatic evaluation using BLEU, chrF++, and COMET.",
      ],
    },
  },
  {
    id: "modular-lora-experts",
    companyName:
      "Beyond Routing: Diagnosing Modular LoRA Experts for Low-Resource Multilingual Petroleum-Domain Translation",
    type: "Research",
    category: [
      "Research",
      "Machine Translation",
      "Petroleum-Domain MT",
      "Mixture-of-Experts",
      "LoRA / PEFT",
      "Routing Diagnostics",
      "Low-Resource NLP",
      "Evaluation",
    ],
    shortDescription:
      "A diagnostic study of modular LoRA experts for low-resource petroleum translation.",
    websiteLink: "https://huggingface.co/spaces/entropy25/mt_moe",
    githubLink: "https://github.com/Entropyobserver/lora-moe-petroleum",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "NLLB-200",
      "LoRA",
      "PEFT",
      "SacreBLEU",
      "COMET",
      "chrF",
      "LaTeX",
      "Data Curation",
      "Statistics",
    ],
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/modular-lora-experts/cover.png",
    pagesInfoArr: [
      {
        title: "Research Questions",
        description:
          "RQ1. How effective is Target-Anchored Synthesis as a training signal for low-resource petroleum-domain translation in German–Norwegian, French–Norwegian, and Dutch–Norwegian?\n\nRQ2. How do independent language-specific LoRA experts compare with shared multitask LoRA in translation quality and terminology accuracy?\n\nRQ3. What do routing behavior and cross-expert transfer reveal about expert specialization and shared capacity in modular multilingual adaptation?",
        imgArr: [],
      },
      {
        title: "Modular Adaptation Framework",
        description:
          "The system uses a frozen NLLB-200-distilled-600M backbone with four source-language-specific LoRA experts for English, German, French, and Dutch into Norwegian. Each rank-16 expert adds about 4.7 million parameters, or 0.76% of the backbone. A lightweight two-layer router maps mean-pooled encoder states to expert weights, adding only about 263,000 trainable parameters.",
        imgArr: ["/projects/modular-lora-experts/cover.png"],
      },
      {
        title: "Two-Phase Expert and Router Training",
        description:
          "In Phase 1, each LoRA expert is trained independently on its language–Norwegian corpus while the multilingual backbone remains frozen. In Phase 2, the experts and backbone are frozen and only the router is trained on balanced multilingual data with entropy regularization. Hard routing selects one expert at inference; oracle language selection provides the independent-expert upper bound.",
        imgArr: [],
      },
      {
        title: "Target-Anchored Synthesis",
        description:
          "Authentic petroleum-domain parallel data are available only for English–Norwegian. For German, French, and Dutch, GPT-4o-mini generates synthetic source sentences from authentic English–Norwegian pairs while validated Norwegian targets act as semantic anchors. LaBSE similarity and terminology accuracy provide dual quality checks. The pipeline produces 41,527 synthetic training pairs and 51,890 synthetic pairs across train, development, and test splits.",
        imgArr: [],
      },
      {
        title: "Human Validation of Synthetic Sources",
        description:
          "Two annotators reviewed 100 synthetic source sentences per language without seeing the automatic quality scores. Across 300 items, mean adequacy was 4.862/5, fluency was 4.703/5, and terminology accuracy was 94.4%. These results support sentence-level quality, but they do not establish equivalence with naturally occurring petroleum documents.",
        imgArr: [
          "/projects/modular-lora-experts/synthetic-data-validation.png",
        ],
      },
      {
        title: "Experimental Comparison",
        description:
          "We compare the zero-shot NLLB backbone, Google Translate, independent language experts, one shared multitask LoRA adapter, and the learned-router MoE. Evaluation combines BLEU, chrF, COMET, sentence-level Formal Terminology Accuracy, terminology precision, paired bootstrap tests, and controlled cross-expert diagnostics across four source languages.",
        imgArr: [],
      },
      {
        title: "Main Results: Fluency–Terminology Trade-Off",
        description:
          "All adapted systems substantially outperform the zero-shot backbone. Shared multitask LoRA achieves the strongest average BLEU at 61.0, while independent experts achieve the strongest average terminology recall at 0.726. The learned-router MoE reaches 58.4 BLEU and 0.711 terminology recall, so it is best understood as a diagnostic and deployment-oriented configuration rather than the strongest overall system.",
        imgArr: ["/projects/modular-lora-experts/system-performance.png"],
      },
      {
        title: "Synthetic-Source Translation Results",
        description:
          "The German, French, and Dutch experts reach 93–96% of the authentic English–Norwegian expert's BLEU. On the controlled synthetic-source tests, adapted models exceed Google Translate in BLEU across all four pairs, while independent experts improve terminology accuracy over Google Translate for German–Norwegian and Dutch–Norwegian. These comparisons are controlled synthetic-source evidence, not field-performance claims.",
        imgArr: [],
      },
      {
        title: "Hard-Routing Behavior",
        description:
          "The learned router reaches 64.8% top-1 accuracy overall. Dutch–Norwegian is routed most accurately at 86.8%, while German–Norwegian is lowest at 40.1%. Several errors select the Dutch expert: 49.4% of German, 39.5% of French, and 21.2% of English inputs are routed there. The pattern is broader language-dependent ambiguity rather than a single isolated failure mode.",
        imgArr: ["/projects/modular-lora-experts/routing-diagnostics.png"],
      },
      {
        title: "Why Better Routing Is Not Enough",
        description:
          "Adding explicit language identity raises routing accuracy from 64.8% to 77.6%, but average BLEU rises by only 0.5 and terminology recall by 0.009. Closing the remaining gap to oracle routing adds just 0.2 BLEU. Better routing helps individual terminology and named-entity cases, but it is not the sole aggregate bottleneck.",
        imgArr: [],
      },
      {
        title: "Language Representation Diagnostics",
        description:
          "A t-SNE projection of mean-pooled NLLB encoder representations shows partial overlap among the four source languages, including a visible German–Dutch overlap region. This is a qualitative diagnostic consistent with routing ambiguity; it is not treated as causal proof or a formal separability test.",
        imgArr: ["/projects/modular-lora-experts/tsne_encoder_features.png"],
      },
      {
        title: "Cross-Expert Transfer and Shared Capacity",
        description:
          "The matching expert is strongest for every source language, confirming genuine specialization. Yet non-matching experts remain competitive: the Dutch expert reaches 53.9 BLEU on German inputs, and the German expert reaches 56.2 BLEU on Dutch inputs. This shared Norwegian petroleum target-side capacity explains why routing errors can be locally costly without producing a large aggregate performance gap.",
        imgArr: [],
      },
      {
        title: "Conclusion and Limitations",
        description:
          "The central finding is that routing precision is not the only bottleneck in modular low-resource adaptation. Shared multitask LoRA maximizes surface quality, while independent experts recover more expected terminology. Because German, French, and Dutch training and evaluation sources are synthetic, broader claims require authentic non-English petroleum documents, additional domains, more diverse languages, and larger backbones.",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project is a diagnostic study of modular LoRA adaptation for multilingual petroleum-domain translation. We investigate how routing accuracy, expert specialisation, and source distribution affect the benefits of language-specific LoRA experts.",
        "The experiments show that routing accuracy alone does not explain modular performance. Cross-expert and authentic-source evaluations reveal the roles of expert specialisation, overlap, and source distribution.",
        "As first author and experimental lead, I designed the modular framework, synthetic-data pipeline, routing experiments, and authentic-source evaluation. I also led the cross-expert and terminology-aware analyses.",
      ],
      bullets: [
        "Designed a Mixture-of-Experts (MoE) framework with language-specific LoRA adapters and a learned router for parameter-efficient multilingual NMT adaptation.",
        "Developed Target-Anchored Synthesis, an LLM-based pipeline for generating and filtering domain-specific parallel data for low-resource translation.",
        "Conducted routing ablations and cross-expert analyses to investigate routing accuracy, expert specialisation, and shared target-side capacity.",
        "Evaluated modular adaptation on synthetic-source and authentic petroleum-domain text using BLEU, COMET, and terminology-aware metrics.",
      ],
    },
  },
  {
    id: "finrag-equinor",
    companyName:
      "FinRAG-Equinor: From Annual Report PDFs to a Reliability-Audited Benchmark for Evidence-Grounded RAG",
    type: "Research",
    category: [
      "Research",
      "RAG",
      "Information Retrieval",
      "Evaluation",
      "Data Quality",
      "Human Evaluation",
    ],
    shortDescription:
      "A 720-item, reliability-audited benchmark for evidence-grounded RAG over 15 Equinor/Statoil annual reports, with traceable report-, page-, and object-level evidence.",
    techStack: [
      "Python",
      "RAG",
      "Information Retrieval",
      "BM25",
      "E5",
      "Cross-encoder",
      "Reranking",
      "Pandas",
      "Benchmarking",
      "Bootstrap",
      "Cohen's Kappa",
    ],
    startDate: new Date("2026-02-01"),
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/finrag-equinor/cover.png",
    keyMetrics: [
      { value: "720", label: "QA items" },
      { value: "15", label: "Annual reports" },
      { value: "41,736", label: "Retrieval units" },
    ],
    pagesInfoArr: [
      {
        title: "PDF-to-Benchmark Pipeline",
        description:
          "The pipeline converts 4,369 annual-report pages into 41,736 traceable retrieval units and a 720-item benchmark with report-, page-, and object-level evidence identifiers.",
        imgArr: ["/projects/finrag-equinor/cover.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "FinRAG-Equinor is a PDF-to-benchmark pipeline and 720-item benchmark for evidence-grounded RAG over long, structured annual reports. It treats retrieval as a hierarchical localization problem: first selecting the correct report, then locating the right page, and finally identifying the exact supporting evidence object.",
        "The benchmark covers 15 Equinor/Statoil annual reports from 2010 to 2024, including 660 answerable and 60 unanswerable questions across nine evidence types. Every answerable item is linked to traceable report-, page-, and object-level evidence, and all 720 items underwent human screening.",
        "I designed the benchmark and retrieval evaluation pipeline, including PDF structure parsing, evidence metadata, QA construction and audit, hard-negative mining, sparse/dense/hybrid baselines, reranking, end-to-end QA evaluation, and failure-aware retrieval recovery.",
      ],
      bullets: [
        "Built a traceable corpus from 4,369 PDF pages, retaining 41,736 paragraph, heading, and table retrieval units from 100,150 layout objects.",
        "Designed and reliability-audited a 720-question benchmark spanning factual, numerical, policy, causal, temporal, table, multi-hop, visual/layout, and unanswerable cases.",
        "Evaluated BM25, three dense retrievers, reciprocal-rank fusion, hierarchical page-to-object retrieval, and cross-encoder reranking with paired significance tests.",
        "Connected retrieval quality to end-to-end answer accuracy and tested selective recovery for wrong-report, wrong-page, wrong-object, and missing-hop failures.",
      ],
    },
  },
  {
    id: "structure-aware-graph-rag",
    companyName:
      "Structure-Aware Graph Retrieval for Evidence Grounding over Long Annual Reports",
    type: "Research",
    category: ["Research", "RAG", "Information Retrieval", "Evaluation"],
    shortDescription:
      "Path-guided GraphRAG research showing how selected entity and metric links improve evidence localization over long annual reports while naive adjacent-page expansion introduces noise.",
    techStack: [
      "Python",
      "GraphRAG",
      "RAG",
      "Information Retrieval",
      "BM25",
      "E5",
      "Cross-encoder",
      "Reranking",
      "Pandas",
      "Bootstrap",
      "Statistics",
    ],
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-08-31"),
    companyLogoImg: "/projects/graph-rag-evidence/cover.png",
    keyMetrics: [
      { value: "87.4%", label: "Object Recall@10" },
      { value: "93.3%", label: "Page Recall@10" },
      { value: "52,278", label: "Graph nodes" },
    ],
    pagesInfoArr: [
      {
        title: "Typed Evidence Graph",
        description:
          "A high-level view of the retrieval design: annual reports are parsed into pages and evidence objects, linked through typed relations, expanded through graph neighborhoods, and reranked for object-level grounding.",
        imgArr: ["/projects/graph-rag-evidence/cover.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project studies structure-aware retrieval for evidence grounding over long annual reports. The goal is not merely to retrieve topically similar text, but to locate the correct report, page, and exact evidence object in a repetitive multi-year archive.",
        "The method builds a typed metadata graph over reports, years, pages, retrieval objects, entities, and financial metric categories. It combines strong hybrid retrieval with selected graph expansion, explicit graph-path candidates, and cross-encoder reranking. Path-guided fusion improves Object Recall@10 from 0.838 to 0.874 and Page Recall@10 from 0.908 to 0.933 over the strongest hybrid reranked baseline.",
        "I designed the GraphRAG experiments, typed edge ablations, year-split validation, path-guided candidate fusion, and structure-aware routing analyses. The results show that graph structure is useful selectively: entity and metric links create valuable evidence bridges, while broad adjacent-page expansion adds plausible but distracting context.",
      ],
      bullets: [
        "Constructed a 52,278-node, 310,796-edge metadata graph over 41,736 retrieval objects from 15 annual reports.",
        "Introduced path-guided fusion that combines hybrid, selected-graph, and typed-path candidates before reranking.",
        "Used leave-one-edge-out ablations to show that entity and metric links help exact grounding, while adjacent-page links reduce retrieval quality.",
        "Validated the edge-selection decision on held-out 2022–2024 reports, improving Object Recall@10 from 0.713 to 0.840 over the full graph.",
        "Separated candidate recovery from question-aware ordering through an interpretable rule-based routing analysis.",
      ],
    },
  },
  {
    id: "group-shapley-attribution",
    companyName:
      "Group-Level Training Data Attribution with Exact Shapley Analysis",
    type: "Research",
    category: [
      "Research",
      "Shapley Attribution",
      "Training Data",
      "Machine Translation",
      "Data Auditing",
      "Robustness Analysis",
      "LoRA / PEFT",
    ],
    shortDescription:
      "Exact Shapley analysis of how training groups shape machine-translation behavior.",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "NLLB-200",
      "LoRA",
      "PEFT",
      "SacreBLEU",
      "chrF",
      "Data Curation",
      "Bootstrap",
      "Statistics",
      "SLIDE",
    ],
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/group-shapley-attribution/cover.png",
    pagesInfoArr: [
      {
        title: "Size-Matched Baseline Diagnostic",
        description:
          "The project compares true linguistically defined groups with random size-matched baselines to separate group identity effects from group-size effects.",
        imgArr: [
          "/projects/group-shapley-attribution/random-baseline-barchart.png",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project asks a data-centric question: Which types of training data contribute to shaping model behavior after fine-tuning?",
        "We divide an English–Norwegian petroleum-domain corpus into four groups based on written-standard classifier scores and evaluate all 16 possible combinations using exact Shapley values.",
        "Instead of using a single score for data value, we separately measure translation quality, terminology performance, and written-standard behavior.",
        "As the first author, I led the research and experiments for this project. My contributions included:",
      ],
      bullets: [
        "Designed the group-level Shapley attribution framework, including the coalition setup, evaluation metrics, and attribution procedure.",
        "Led the experiments across NLLB and decoder-only models, including LoRA fine-tuning, coalition training, evaluation, and size-matched random baselines.",
        "Evaluated the robustness of the attribution results using bootstrap confidence intervals and group-level statistical tests.",
        "Analyzed how different training groups contribute to translation quality, terminology accuracy, and written-standard behavior.",
      ],
    },
  },
  {
    id: "target-standard-bias",
    companyName:
      "When Data Cleaning Becomes Bias: Target-Standard Specialization in Norwegian MT",
    type: "Research",
    category: [
      "Research",
      "Responsible AI",
      "Machine Translation",
      "Evaluation",
    ],
    shortDescription:
      "A controlled English-Norwegian MT study showing how Bokmål filtering creates target-standard specialization—and how reference choice can turn that specialization into an evaluation-bias problem.",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "Hugging Face",
      "NLLB-200",
      "LoRA",
      "SacreBLEU",
      "chrF",
      "Data Curation",
      "Bootstrap",
      "Statistics",
      "SLIDE",
    ],
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/target-standard-bias/cover.svg",
    pagesInfoArr: [
      {
        title: "Research Questions",
        description:
          "RQ1. How does Bokmål filtering affect in-domain MT performance under Bokmål references?\n\nRQ2. Are the effects separable from the reduced training-data size?\n\nRQ3. Does filtering change the written-standard distribution of model outputs?\n\nRQ4. How does evaluation against different written standards affect automatic MT scores?",
        imgArr: [],
      },
      {
        title: "Data Filtering and Size-Controlled Design",
        description:
          "The original petroleum-domain split contains 13,935 training pairs. SLIDE filtering retains targets with Bokmål score at least 0.80 and Nynorsk score below 0.30, producing 10,114 training pairs. A deterministic original-subsampled condition uses the same 10,114/1,305/1,313 train/validation/test sizes, isolating written-standard filtering from data-volume effects. Nearby thresholds retain 71.2-73.3% of the original training set, placing the selected threshold in a stable region of the score distribution.",
        imgArr: [],
      },
      {
        title: "LoRA Fine-Tuning and Evaluation Protocol",
        description:
          "The main experiments fine-tune NLLB-200 distilled 600M with LoRA using rank 8, alpha 64, zero dropout, three epochs, learning rate 5e-4, beam size 5, and seeds 42, 123, and 456. The size-controlled in-domain comparison is replicated with 1.3B and 3.3B NLLB-200 models. Evaluation uses BLEU, chrF, Bokmål-oriented TermR/TermP/TermF1, SLIDE written-standard labels, 1,000-sample paired bootstrap tests, and exact McNemar tests. The paper deliberately does not use COMET because transparent form-sensitive metrics are central to the evaluation-bias analysis.",
        imgArr: [],
      },
      {
        title:
          "RQ1 · How does Bokmål filtering affect in-domain MT performance under Bokmål references?",
        description:
          "Experiment: compare the Bokmål-filtered model with the equally sized original-subsampled baseline on the in-domain Bokmål test set. Result: filtering raises BLEU from 59.37 to 61.28, chrF from 78.02 to 79.34, and Bokmål-oriented TermF1 from 0.7702 to 0.7912. Paired bootstrap testing gives a sentence-level chrF change of +1.0585 (95% CI +0.8561 to +1.2522, p < 0.001) and a TermF1 change of +0.0210 (95% CI +0.0147 to +0.0282, p < 0.001). The BLEU gain also appears at 1.3B (60.78 to 63.13) and 3.3B (62.71 to 64.47). Answer: under Bokmål references, filtering consistently improves in-domain Bokmål-conforming performance.",
        imgArr: ["/projects/target-standard-bias/model-scale-results.svg"],
      },
      {
        title:
          "RQ2 · Are the effects separable from reduced training-data size?",
        description:
          "Experiment: hold data volume constant by comparing Bokmål-filtered and original-subsampled conditions with exactly 10,114/1,305/1,313 train/validation/test examples. Result: despite identical sizes, the filtered model improves Bokmål-test BLEU by 1.91 points and chrF by 1.32 points, while its output on the original test becomes 93.4% Bokmål-only versus 79.0% for the matched baseline; Nynorsk-only output falls from 14.2% to 0.7%. The direction persists across 600M, 1.3B, and 3.3B models. Answer: yes—the effect is associated with which examples are retained, not merely with having less training data.",
        imgArr: ["/projects/target-standard-bias/study-design.svg"],
      },
      {
        title:
          "RQ3 · Does filtering change the written-standard distribution of model outputs?",
        description:
          "Experiment: apply SLIDE to references and paired model outputs on the same original mixed-standard test set, then test sentence-level label changes with exact McNemar tests. Result: references are 76.2% Bokmål-only, 17.2% Nynorsk-only, and 6.0% mixed. Original-subsampled outputs remain close at 79.0%, 14.2%, and 5.7%, whereas filtered outputs shift to 93.4% Bokmål-only, 0.7% Nynorsk-only, and 4.8% mixed. Across seeds, Bokmål-only rises by 13.8-15.2 points and Nynorsk-only falls by 13.1-14.2 points, with p < 0.001 in every comparison. A one-reviewer diagnostic sample finds +0.79 Bokmål conformity but only +0.01 adequacy. Answer: filtering produces a large, human-perceptible shift toward Bokmål.",
        imgArr: ["/projects/target-standard-bias/written-standard-shift.svg"],
      },
      {
        title:
          "RQ4 · How does evaluation against different written standards affect automatic MT scores?",
        description:
          "Experiment: evaluate the same size-controlled systems against Bokmål and original mixed-standard references, then use FLORES NB/NN as an out-of-domain reference-mismatch check. Result: the filtered model wins on the Bokmål test (BLEU 61.28 vs. 59.37; chrF 79.34 vs. 78.02) but loses on the original mixed test (BLEU 58.49 vs. 61.77; chrF 77.43 vs. 79.12). The original-test sentence-level chrF change is -1.7956 (95% CI -2.0872 to -1.5148, p < 0.001), even though Bokmål-oriented TermF1 increases from 0.7309 to 0.7908. On FLORES, the filtered model scores BLEU 27.66 against NB references but 15.37 against NN references; all systems decode with nob_Latn, so the NN result measures reference-standard mismatch, not Nynorsk generation. Answer: reference choice can reverse the apparent system ranking and can reward conformity to the dominant standard rather than language-neutral quality.",
        imgArr: [
          "/projects/target-standard-bias/in-domain-results.svg",
          "/projects/target-standard-bias/flores-results.svg",
        ],
      },
      {
        title: "Human Review Separates Adequacy from Conformity",
        description:
          "One human reviewer blindly evaluated 100 items: 50 shift-enriched cases and 50 controls. One item was invalid, leaving 99 valid comparisons. Filtering changes mean adequacy by only +0.01 on a 0-2 scale but increases mean Bokmål conformity by +0.79. The reviewer preferred the filtered output in 55 cases, the original-subsampled output in 11, and marked 33 ties. Because the sample is deliberately enriched for predicted shifts and uses one reviewer, these results are diagnostic rather than population-level estimates.",
        imgArr: ["/projects/target-standard-bias/human-evaluation.svg"],
      },
      {
        title: "SLIDE Measurement Validation",
        description:
          "A separate stratified review of 120 outputs by one human reviewer finds 60.8% exact agreement with SLIDE, macro-F1 0.552, and Cohen's kappa 0.478. Bokmål precision is 0.900 and Nynorsk recall is 0.957. This supports SLIDE as a useful written-standard diagnostic while requiring caution for mixed or uncertain cases. AI-assisted annotation passes are excluded from the reported human evidence.",
        imgArr: ["/projects/target-standard-bias/slide-validation.svg"],
      },
      {
        title: "Interpretation, Scope, and Responsible Deployment",
        description:
          "Target-standard specialization is not inherently harmful: Bokmål specialization is appropriate when the deployment target is explicitly Bokmål petroleum translation. The broader bias problem arises when that specialization is implicit, reinforced by a single-standard evaluation, or presented under a generic Norwegian label. Evidence is limited to one direction and domain; all systems decode with nob_Latn; terminology metrics use Bokmål forms; FLORES, significance tests, and human review are scoped mainly to 600M; and the one-reviewer diagnostic samples do not provide inter-annotator reliability or population estimates. Deployment should document the intended standard and report output-standard distributions beside BLEU and chrF.",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This research project, titled 'When Data Cleaning Becomes Bias: Target-Standard Specialization in Norwegian Machine Translation,' studies how filtering a mixed Bokmål/Nynorsk petroleum corpus toward Bokmål changes both model output and evaluation outcomes. It treats target-standard specialization as the observable shift and target-standard bias as the broader audit problem when that shift is hidden or rewarded by a narrow evaluation setup.",
        "Using LoRA-adapted NLLB-200 models, the study compares full original data, a SLIDE-filtered Bokmål subset, and a random original subset of exactly the same size. Results are measured against Bokmål and mixed-standard references, replicated across 600M, 1.3B, and 3.3B backbones, checked on FLORES, and triangulated with two explicitly scoped one-reviewer studies: SLIDE measurement validation and blind diagnostic MT comparison.",
        "As co-author and controlled-experiment analysis lead, I contributed to the size-controlled design, model-scale replication, statistical analysis, written-standard diagnostics, and interpretation of reference and terminology bias.",
      ],
      bullets: [
        "Controlled for data size with matched 10,114-pair filtered and original-subsampled training conditions.",
        "Demonstrated a reference-dependent metric reversal across three NLLB-200 model scales.",
        "Measured the output shift from 79.0% to 93.4% Bokmål-only and from 14.2% to 0.7% Nynorsk-only on the same mixed-standard test set.",
        "Validated the interpretation with paired bootstrap tests, exact McNemar tests, a 120-item one-reviewer SLIDE audit, and a separate 99-valid-item blind diagnostic MT comparison.",
      ],
    },
  },
  {
    id: "vlm-bias-evaluation",
    companyName: "Reusable Bias Evaluation Framework for LMs and VLMs",
    type: "Technical Project",
    category: ["Technical Project", "Responsible AI", "NLP", "Evaluation"],
    shortDescription:
      "A reusable evaluation framework for matched-prompt and image-instruction bias studies, covering geographic, gender-occupation, and political/moral VLM framing cases.",
    techStack: [
      "Python",
      "Transformers",
      "Hugging Face",
      "VLM",
      "Prompt Engineering",
      "Pandas",
      "Data Analysis",
      "Bootstrap",
      "Cohen's Kappa",
      "Statistics",
    ],
    startDate: new Date("2025-11-01"),
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/vlm-bias-evaluation/cover.svg",
    pagesInfoArr: [
      {
        title: "Evaluation Questions",
        description:
          "RQ1. Can matched prompts reveal systematic framing differences while keeping the task context fixed?\n\nRQ2. Can the same evaluation architecture support both language-only and vision-language studies?\n\nRQ3. Which automatic signals are useful for screening, and where is human judgment required?\n\nRQ4. How should uncertainty, reviewer agreement, and study limitations constrain the final claim?",
        imgArr: [],
      },
      {
        title: "Configuration-Driven Evaluation Framework",
        description:
          "The framework separates case-specific resources from shared evaluation code. Each study defines its controlled variable, prompt or image set, group labels, and metric configuration; the shared engine handles inference, disparity summaries, bootstrap uncertainty, error slices, and exports for human review.",
        imgArr: ["/projects/vlm-bias-evaluation/framework.svg"],
      },
      {
        title: "Three Case Studies, One Evaluation Discipline",
        description:
          "The current project spans geographic framing, gender–occupation associations, and political or moral framing in VLM descriptions. Their inputs differ, but each uses matched conditions, explicit analysis units, pre-defined comparison groups, and a human-validation target.",
        imgArr: ["/projects/vlm-bias-evaluation/case-study-matrix.svg"],
      },
      {
        title: "Reviewed VLM Image Set",
        description:
          "For the vision-language case study, images are organized and reviewed before inference so that file identity, group labels, and visible context can be audited. The contact sheet supports coverage checks and helps identify duplicates, ambiguous scenes, or category leakage before model outputs are compared.",
        imgArr: [
          "/projects/vlm-bias-evaluation/vlm-image-review-contact-sheet.jpg",
        ],
        imageLayout: "portrait",
      },
      {
        title: "Human Validation Boundary",
        description:
          "Automatic metrics are used to locate candidate disparities, not to make a final diagnosis. Selected outputs move through structured annotation, context and severity review, and inter-annotator agreement analysis. Claims are then limited to what the reviewed evidence can support.",
        imgArr: ["/projects/vlm-bias-evaluation/validation-boundary.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This technical research project builds a reusable way to test whether language and vision-language models produce systematic framing differences across social, political, or cultural groups.",
        "Instead of treating bias evaluation as a collection of ad hoc prompts, the framework makes the comparison design explicit: controlled inputs, reproducible model runs, group-level screening metrics, uncertainty estimates, and auditable human validation. It supports both text-only matched prompts and image-instruction VLM tasks.",
        "My contribution was to design the framework, implement the shared evaluation modules, structure three case studies, and define the evidence boundary. Automatic scores are treated as screening signals; stronger interpretations require reviewed examples, annotation guidelines, and agreement analysis.",
      ],
      bullets: [
        "Built a configuration-driven framework for geographic, gender–occupation, and VLM political or moral framing studies.",
        "Implemented matched-prompt construction, reusable inference wrappers, metric screening, group-disparity summaries, bootstrap intervals, and error-slice exports.",
        "Extended the same controlled-comparison logic from text-only variables to reviewed image-instruction VLM tasks.",
        "Added annotation-sheet generation and Cohen's kappa analysis so automatic patterns can be checked by human reviewers.",
        "Documented the boundary between exploratory signals and evidence-backed claims, keeping the project useful without overstating unfinished case-study results.",
      ],
    },
  },
  {
    id: "ecommerce-business-overview",
    companyName:
      "E-commerce Sales Analytics: From Raw Transactions to Reliable Business Metrics",
    type: "Data Science",
    category: ["Data Science", "Business Analytics", "Data Quality"],
    shortDescription:
      "An analysis of 99K+ orders answering how sales changed, which categories and sellers drive value, and whether recorded payments can be trusted.",
    techStack: [
      "Python",
      "SQL",
      "SQLite",
      "Pandas",
      "Matplotlib",
      "Data Analysis",
      "Data Visualization",
    ],
    startDate: new Date("2026-08-01"),
    endDate: new Date("2026-08-31"),
    companyLogoImg: "/projects/ecommerce-business-overview/cover.svg",
    keyMetrics: [
      { value: "99,441", label: "Orders" },
      { value: "6", label: "Source tables" },
      { value: "99.58%", label: "Payment match" },
    ],
    pagesInfoArr: [
      {
        title: "Q1. How Did Sales Performance Change Over Time?",
        description:
          "Question: How did merchandise value and valid order volume change over time?\n\nAnalysis: I aggregated valid order items by purchase month. Because the boundary months are sparse, I used January–August for the like-for-like annual comparison.\n\nFinding: Merchandise value increased from BRL 3.08M in January–August 2017 to BRL 7.34M in the same period of 2018, an increase of 138.28%. Valid orders increased by 137.26%. This describes what happened in the dataset; it does not establish what caused the increase.",
        imgArr: [
          "/projects/ecommerce-business-overview/monthly-sales-orders.png",
        ],
      },
      {
        title: "Q2. Are Sales Concentrated in a Few Product Categories?",
        description:
          "Question: Do a small number of product categories account for most merchandise value?\n\nAnalysis: I aggregated merchandise value by product category, ranked the categories, and calculated their individual and cumulative contribution shares.\n\nFinding: The largest category contributes 9.31% of merchandise value, the top five contribute 39.83%, and the top ten contribute 62.38%. The portfolio has meaningful category concentration but is not dependent on a single category.",
        imgArr: [
          "/projects/ecommerce-business-overview/category-contribution.png",
        ],
      },
      {
        title: "Q3. Is the Marketplace Dependent on a Few Sellers?",
        description:
          "Question: Is merchandise value heavily concentrated among a small number of sellers?\n\nAnalysis: I aggregated merchandise value at seller level, ranked sellers by contribution, and plotted the distribution on logarithmic axes so that both high-volume sellers and the long tail remain visible.\n\nFinding: The top ten sellers contribute approximately 13.20% of merchandise value, while the largest seller contributes about 1.70%. This suggests a relatively distributed seller base rather than dependence on one or two sellers.",
        imgArr: [
          "/projects/ecommerce-business-overview/seller-scale-distribution.png",
        ],
      },
      {
        title: "Q4. Can We Trust the Reported Transaction Totals?",
        description:
          "Question: Do recorded payments reconcile with merchandise value plus freight?\n\nAnalysis: An order can contain multiple item rows and multiple payment records. I first aggregated payments to order level, separately summed merchandise value and freight, and then compared the two order-level totals. This prevents one-to-many joins from inflating revenue.\n\nFinding: Among 98,665 reconcilable orders, 99.58% have an absolute difference of no more than BRL 0.01. Remaining exceptions are preserved for investigation rather than silently corrected.",
        imgArr: [
          "/projects/ecommerce-business-overview/payment-reconciliation.svg",
        ],
      },
      {
        title: "Business Value",
        description:
          "The analysis turns raw e-commerce transactions into reliable metrics that can be used to monitor sales performance and investigate business patterns.\n\nIt helps decision-makers answer four practical questions:\n\n• Where is merchandise value growing? — through monthly performance analysis.\n• Which categories contribute most to sales? — through category and product analysis.\n• How dependent is the marketplace on a small number of sellers? — through seller concentration analysis.\n• Which transactions may require investigation? — through payment reconciliation and data-quality checks.\n\nThe current dataset does not contain product costs, advertising spend, or behavioral-event data. Therefore, the project does not estimate profitability, marketing ROI, or conversion rates. These would be natural extensions of the same analytical pipeline if the required data were available.",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project analyzes e-commerce transaction data to understand sales performance and verify that the reported metrics are reliable.",
        "Starting from six relational tables containing orders, order items, payments, customers, products, and sellers, it answers four practical questions: How did sales change over time? Which categories drive merchandise value? How concentrated is seller contribution? Do recorded payments reconcile with order totals?",
        "The final result is a reproducible SQL and Python analytics workflow rather than a static dashboard. The pipeline validates source relationships, controls the analytical grain, builds reusable tables, and produces business-ready metrics and visualizations.",
      ],
      bullets: [
        "99,441 orders and 112,650 order-item rows across six related source tables.",
        "Four decision-oriented analyses covering time, categories, sellers, and payment consistency.",
        "Order-level payment aggregation prevents duplicate totals across one-to-many relationships.",
        "Automated key, relationship, missing-category, and payment-reconciliation checks.",
        "Explicit limitations separate measured findings from unsupported profit, funnel, and causal claims.",
      ],
    },
  },
  {
    id: "ecommerce-retention-segmentation",
    companyName: "Customer Segmentation: Which Groups Behave Differently?",
    type: "Data Science",
    category: ["Data Science", "Customer Analytics", "AI/ML"],
    shortDescription:
      "A five-segment customer analysis comparing K-Means, hierarchical clustering, Gaussian Mixture, and HDBSCAN with future-behavior validation.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Customer Segmentation",
      "Machine Learning",
      "Statistics",
      "Matplotlib",
      "Seaborn",
      "Data Analysis",
      "Data Visualization",
    ],
    startDate: new Date("2026-09-01"),
    endDate: new Date("2026-09-01"),
    companyLogoImg: "/projects/ecommerce-retention-segmentation/cover.svg",
    githubLink:
      "https://github.com/Entropyobserver/Mywebsite/tree/master/project_materials/ecommerce_analytics_portfolio/projects/04_customer_analytics",
    keyMetrics: [
      { value: "4,335", label: "Customers" },
      { value: "0.974", label: "Stability ARI" },
      { value: "87.1%", label: "Top repurchase" },
    ],
    pagesInfoArr: [
      {
        title: "Q1. Can the transactions support reliable customer segmentation?",
        description:
          "Question:\n\nCan two years of transaction history be converted into a trustworthy customer-level analysis table?\n\nAnalysis:\n\nI audited 1,067,371 transaction lines, separated successful purchases from cancellations, and used a fixed 365-day observation window ending on 1 September 2011. Customers needed at least one successful purchase during that window. Fifteen features capture value, frequency, lifecycle, purchase cadence, product breadth, recent trend, and cancellation behavior.\n\nFinding:\n\nThe final clustering population contains 4,335 customers. Missing purchase intervals are treated as expected single-order behavior, while extreme values are clipped rather than deleting customers. The following 90 days remain completely outside the clustering features.",
        imgArr: [
          "/projects/ecommerce-retention-segmentation/data-to-features.svg",
        ],
      },
      {
        title: "Q2. How many customer segments are useful?",
        description:
          "Question:\n\nWhich cluster count balances statistical quality, stability, and operational usability?\n\nAnalysis:\n\nI evaluated K-Means solutions from two to eight clusters using silhouette, Davies–Bouldin, Calinski–Harabasz, perturbation stability, and minimum segment share. The operational choice was restricted to four to six clusters with no segment smaller than 3%.\n\nFinding:\n\nThe five-cluster solution provides the best combined rank within the operational range. Its perturbation stability ARI is 0.974 and its smallest segment contains 9.5% of customers. The silhouette score is only 0.225, so the segments are presented as a stable operational simplification—not five strongly separated natural customer types.",
        imgArr: [
          "/projects/ecommerce-retention-segmentation/k-selection.svg",
        ],
      },
      {
        title: "Q3. Does another clustering method produce a better operational solution?",
        description:
          "Question:\n\nHow do K-Means, Ward hierarchical clustering, Gaussian Mixture, and HDBSCAN compare on the same features?\n\nAnalysis:\n\nEvery algorithm uses the same clipped, transformed, imputed, and standardized feature matrix. I compare separation, cluster balance, and noise share, then use adjusted Rand index to measure agreement between K-Means and Ward labels.\n\nFinding:\n\nK-Means retains five operationally sized segments. Ward creates a 1.6% micro-segment, while HDBSCAN labels 68.3% of customers as noise. K-Means and Ward have moderate agreement (ARI 0.532). K-Means is selected because it is stable, reproducible, and can assign future customers to the nearest center; hierarchical clustering remains a structural cross-check.",
        imgArr: [
          "/projects/ecommerce-retention-segmentation/algorithm-comparison.svg",
        ],
      },
      {
        title: "Q4. Who are the five customer groups?",
        description:
          "Question:\n\nDo the cluster profiles translate into distinct, auditable customer strategies?\n\nAnalysis:\n\nI profile each cluster in original business units and assign names through reproducible relative rules. Names summarize value, recency, tenure, recent activity, and cancellation behavior; they are operational labels rather than model-discovered personalities.\n\nFinding:\n\nThe five groups are high-value loyal, stable repeat, new / high-potential, high-cancellation / low-engagement, and dormant risk. High-value loyal customers have median 365-day spend of GBP 3,828 and nine orders. Dormant-risk customers represent the largest group at 36.7%, while the high-cancellation group has a 50% median cancellation-invoice rate and should be investigated before promotional outreach.",
        imgArr: [
          "/projects/ecommerce-retention-segmentation/segment-profiles.svg",
        ],
      },
      {
        title: "Q5. Do the segments predict different future behavior?",
        description:
          "Question:\n\nDo customers in different historical clusters behave differently during the following 90 days?\n\nAnalysis:\n\nFuture purchases were excluded from clustering and used only for external validation. I compare 90-day repurchase rates, order counts, spend, and Wilson confidence intervals across the five segments.\n\nFinding:\n\nHigh-value loyal customers repurchase at 87.1%, compared with 60.4% for stable repeat, 48.6% for new / high-potential, 35.3% for high-cancellation / low-engagement, and 27.9% for dormant-risk customers. This supports prioritization, but it does not prove that coupons or outreach will cause retention; that requires a randomized experiment with margin and treatment-cost data.",
        imgArr: [
          "/projects/ecommerce-retention-segmentation/future-validation.svg",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project turns real public retail transactions into an operational customer segmentation workflow. It directly demonstrates the K-Means and hierarchical-clustering methodology highlighted in my data-analyst experience.",
        "The analysis goes beyond a static RFM table. It defines a point-in-time feature window, compares four clustering families, tests sensitivity to small feature perturbations, and reserves the following 90 days for external business validation.",
        "The public dataset has 4,335 eligible customers at the selected cutoff. It demonstrates the same methodology as my professional work, but it is not presented as the 150,000+ sample dataset described in my resume. Segment membership is predictive and descriptive—not evidence that a marketing intervention will cause retention.",
      ],
      bullets: [
        "Audited 1,067,371 transaction lines and constructed 15 leakage-safe customer features.",
        "Selected five K-Means segments with 0.974 perturbation-stability ARI and a 9.5% minimum segment share.",
        "Compared K-Means, Ward hierarchical clustering, Gaussian Mixture, and HDBSCAN on identical inputs.",
        "Reported the modest 0.225 silhouette score instead of overstating natural cluster separation.",
        "Validated segment usefulness with untouched future behavior: 87.1% versus 27.9% repurchase at the two extremes.",
      ],
    },
  },
  {
    id: "marketing-ab-testing",
    companyName: "Marketing Conversion A/B Testing: Does Advertising Increase Conversion?",
    type: "Data Science",
    category: ["Data Science", "Experimentation", "Business Analytics"],
    shortDescription:
      "A 588K-user experiment analysis asking whether ads improve conversion, how large the lift is, and whether the evidence is decision-ready.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "A/B Testing",
      "Statistics",
      "Data Analysis",
      "Matplotlib",
      "Seaborn",
      "Data Visualization",
    ],
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-18"),
    companyLogoImg: "/projects/marketing-ab-testing/cover.svg",
    keyMetrics: [
      { value: "588,101", label: "Users" },
      { value: "+0.769 pp", label: "Absolute lift" },
      { value: "1.71e-13", label: "p-value" },
    ],
    pagesInfoArr: [
      {
        title: "Q1. Is the experiment data analysis-ready?",
        description:
          "Question:\n\nCan the file support a trustworthy user-level comparison?\n\nAnalysis:\n\nI checked the analysis unit, missing values, duplicate users, duplicate rows, outcome validity, and observed group allocation.\n\nFinding:\n\nAll 588,101 users are unique and the analytical fields are complete. Allocation is highly uneven—96.0% ad and 4.0% PSA. Without the planned ratio, this is not enough to declare a sample-ratio mismatch, but assignment logs must be validated before rollout.",
        imgArr: ["/projects/marketing-ab-testing/experiment-quality.svg"],
      },
      {
        title: "Q2. Does advertising increase conversion?",
        description:
          "Question:\n\nIs conversion higher for users assigned to advertising than for users shown a PSA?\n\nAnalysis:\n\nI estimated both group rates with Wilson confidence intervals, then measured absolute and relative lift.\n\nFinding:\n\nAdvertising converted at 2.555% versus 1.785% for PSA: an absolute lift of 0.769 percentage points and a relative lift of 43.1%. The 95% confidence interval for absolute lift is 0.595 to 0.943 percentage points.",
        imgArr: ["/projects/marketing-ab-testing/conversion-lift.svg"],
      },
      {
        title: "Q3. Is the result statistically and commercially meaningful?",
        description:
          "Question:\n\nIs the observed difference reliable enough—and valuable enough—to support a business decision?\n\nAnalysis:\n\nA two-sided two-proportion z-test evaluates uncertainty, while Cohen's h and users per extra conversion translate the effect into practical scale.\n\nFinding:\n\nThe evidence is strong (z = 7.37, p = 1.71e-13), but the standardized effect is small (h = 0.053). At the observed lift, approximately 130 additional users correspond to one extra conversion. Positive ROI cannot be claimed without advertising cost and conversion-value data.",
        imgArr: ["/projects/marketing-ab-testing/decision-value.svg"],
      },
      {
        title: "Q4. Do results vary by weekday?",
        description:
          "Question:\n\nDo weekday slices reveal where a follow-up experiment may be most useful?\n\nAnalysis:\n\nI estimated ad-versus-PSA lift within each weekday and controlled the false-discovery rate with Benjamini–Hochberg correction.\n\nFinding:\n\nTuesday has the largest observed lift at 1.60 percentage points. Tuesday, Monday, Wednesday, Saturday, and Friday remain significant after correction; Sunday and Thursday do not. These are exploratory slices, so they guide a pre-registered timing experiment rather than immediate budget reallocation.",
        imgArr: ["/projects/marketing-ab-testing/weekday-uplift.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project evaluates an anonymized marketing experiment in which the treatment group saw an advertisement and the control group saw a public-service announcement. The goal is to determine whether advertising increases conversion and whether the evidence is ready for a business decision.",
        "The analysis is organized around four stakeholder questions: data readiness, conversion lift, statistical and commercial significance, and exploratory weekday variation. Each answer connects a reproducible statistical method to a concrete decision boundary.",
        "The result supports a real conversion effect, but it does not claim ROI. A rollout decision still requires confirmation of the planned allocation and assignment logs, plus advertising cost, conversion value, and guardrail metrics.",
      ],
      bullets: [
        "Validated 588,101 user-level observations and surfaced the 96%/4% allocation risk.",
        "Estimated a 0.769 percentage-point lift with a 95% confidence interval of 0.595 to 0.943 points.",
        "Applied a two-proportion z-test, standardized effect size, and practical effect translation.",
        "Controlled multiple exploratory weekday comparisons with Benjamini–Hochberg correction.",
        "Separated statistical evidence from ROI and documented the additional data required for rollout.",
      ],
    },
  },
  {
    id: "retail-sales-forecasting",
    companyName: "Retail Demand Forecasting: Which Model Generalizes Best?",
    type: "Data Science",
    category: ["Data Science", "Forecasting", "AI/ML", "Business Analytics"],
    shortDescription:
      "A seven-model retail forecast comparing classical statistics, Gradient Boosting, Meta Prophet, and Google TimesFM through rolling validation.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "Time Series",
      "Prophet",
      "Machine Learning",
      "Transformers",
      "PyTorch",
      "ARIMA",
      "Statistics",
      "Matplotlib",
      "Data Analysis",
      "Data Visualization",
    ],
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-06"),
    companyLogoImg: "/projects/retail-sales-forecasting/cover.svg",
    keyMetrics: [
      { value: "3,049", label: "Items in scope" },
      { value: "5.89%", label: "Rolling WAPE" },
      { value: "5.75%", label: "Final-test WAPE" },
    ],
    pagesInfoArr: [
      {
        title: "Q1. Is the data suitable for demand forecasting?",
        description:
          "Question:\n\nCan the source tables support a reliable store-level 28-day forecast?\n\nAnalysis:\n\nI reconciled daily unit sales, weekly prices, calendar events, benefit-program dates, and the store-category hierarchy. The selected store contains 3,049 items across three categories and 1,941 continuous historical days.\n\nFinding:\n\nThe series has no missing sales dates or negative values, and it shows both changing sales levels and strong weekly seasonality. The target is observed store sales—not unconstrained demand—because inventory-on-hand and lost-sales fields are unavailable.",
        imgArr: ["/projects/retail-sales-forecasting/data-readiness.svg"],
      },
      {
        title: "Q2. Which model is most stable across historical windows?",
        description:
          "Question:\n\nWhich method performs most reliably when the forecast origin moves through time?\n\nAnalysis:\n\nSeven models face the same four rolling 28-day validation windows: two seasonal baselines, Exponential Smoothing, SARIMA, Gradient Boosting, Meta Prophet, and Google TimesFM 3.0. Selection is based on mean WAPE before viewing the final test month.\n\nFinding:\n\nMeta Prophet ranks first at 5.89% mean WAPE, closely followed by zero-shot TimesFM at 5.98% and Gradient Boosting at 6.56%. Prophet is selected as the historical champion under the pre-defined rule.",
        imgArr: ["/projects/retail-sales-forecasting/rolling-validation.svg"],
      },
      {
        title: "Q3. Which model generalizes best to the unseen final month?",
        description:
          "Question:\n\nDoes the rolling-validation winner remain best on a completely untouched 28-day period?\n\nAnalysis:\n\nAfter model selection, I evaluate every candidate once on the reserved final month using MAE, RMSE, WAPE, and signed bias.\n\nFinding:\n\nGoogle TimesFM 3.0 ranks first at 5.75% WAPE, almost tied with Gradient Boosting at 5.77%; Prophet records 6.77%. The ranking shift supports champion–challenger monitoring rather than a claim that one model always wins. TimesFM is presented only as a non-commercial research benchmark under its current weight license.",
        imgArr: ["/projects/retail-sales-forecasting/final-holdout.svg"],
      },
      {
        title: "Q4. What volume should the store plan for?",
        description:
          "Question:\n\nHow should the selected forecast be translated into a usable 28-day planning range?\n\nAnalysis:\n\nFollowing the pre-defined rolling-validation decision, Prophet is refit on all 1,941 historical days. Horizon-specific errors from the four backtests form an empirical 80% interval.\n\nFinding:\n\nThe forecast is 132,211 units over 28 days, averaging 4,722 per day, with summed daily bounds of 128,002 to 142,035 units. This is a capacity and purchasing-budget input—not a final order quantity—until inventory, inbound supply, lead time, and service level are added.",
        imgArr: ["/projects/retail-sales-forecasting/forecast-plan.svg"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project demonstrates the time-series forecasting and systematic cross-validation work highlighted in my resume through a reproducible retail demand-planning workflow.",
        "The central comparison spans simple seasonal baselines, classical statistical models, feature-driven machine learning, Meta Prophet, and Google TimesFM 3.0. Every model uses the same rolling forecast origins, 28-day horizon, and error definitions.",
        "The project separates model selection from final testing. Prophet is the historical rolling-validation champion, while zero-shot TimesFM performs best on the newest untouched month. The difference becomes a monitoring decision rather than a misleading winner-takes-all claim.",
      ],
      bullets: [
        "Built a continuous 1,941-day store series across 3,049 items with calendar and price signals.",
        "Engineered leakage-safe lags and rolling features for a direct 28-day machine-learning forecast.",
        "Compared seven models across four rolling windows with MAE, RMSE, WAPE, and signed bias.",
        "Benchmarked Google TimesFM 3.0 zero-shot against Meta Prophet, Gradient Boosting, and statistical baselines.",
        "Translated the selected forecast into a 132,211-unit planning baseline with explicit uncertainty and inventory limitations.",
      ],
    },
  },
  {
    id: "ecommerce-churn-prediction",
    companyName: "E-commerce Customer Churn Prediction",
    type: "Data Science",
    category: ["Data Science", "Customer Analytics", "AI/ML"],
    shortDescription:
      "An imbalanced-classification study comparing four models and sampling strategies with F1, ROC-AUC, and feature importance.",
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Machine Learning",
      "SHAP",
      "Statistics",
      "Matplotlib",
      "Seaborn",
      "Data Analysis",
    ],
    startDate: new Date("2025-07-01"),
    endDate: new Date("2025-07-31"),
    companyLogoImg: "/projects/ecommerce-churn-prediction/cover.svg",
    pagesInfoArr: [
      {
        title: "Imbalanced Classification Setup",
        description:
          "The source dataset contains 5,630 customers with a 16.84% churn rate and missing values across behavioral and service variables. The workflow performs preprocessing, stratified splitting, scaling where appropriate, and explicit imbalance handling.",
        imgArr: [],
      },
      {
        title: "Model and Sampling Comparison",
        description:
          "Logistic regression, KNN, SVM, and random forest models are compared under no sampling, oversampling, undersampling, and SMOTE. The recorded no-sampling random forest result reaches F1 = 0.8715 and ROC-AUC = 0.9905 on the held-out split.",
        imgArr: [],
      },
      {
        title: "Drivers and Actionability",
        description:
          "Feature-importance and SHAP-oriented analysis turns prediction into a diagnostic workflow. Satisfaction relative to tenure, tenure, order value, cashback amount, and warehouse distance emerge as leading candidate drivers for retention investigation.",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project connects business-facing customer retention questions with a careful machine-learning evaluation workflow. It complements the descriptive retention project by asking which customers are most likely to churn and which variables drive that risk signal.",
        "The analysis compares multiple model families and multiple class-imbalance strategies rather than presenting a single favorable accuracy number. F1 and ROC-AUC are emphasized because the churn class represents only 16.84% of customers.",
        "Feature importance and SHAP-compatible analysis support investigation and prioritization, while the page avoids treating predictive associations as causal explanations.",
      ],
      bullets: [
        "Profiled 5,630 customers, a 16.84% churn rate, and 1,856 missing values before modeling.",
        "Compared logistic regression, KNN, SVM, and random forest classifiers.",
        "Evaluated no sampling, oversampling, undersampling, and SMOTE under consistent metrics.",
        "Recorded F1 = 0.8715 and ROC-AUC = 0.9905 for the best documented held-out result.",
        "Added feature-importance and SHAP-oriented interpretation for retention investigation.",
      ],
    },
  },
  {
    id: "multilingual-sentiment",
    companyName: "Multilingual Sentiment Analysis Platform",
    type: "Technical Project",
    category: ["Technical Project", "AI/ML", "NLP"],
    shortDescription:
      "An applied NLP platform for multilingual sentiment analysis with Transformer models, batch processing, and explainability views.",
    websiteLink:
      "https://huggingface.co/spaces/entropy25/multilingual-sentiment-analyzer",
    techStack: [
      "Python",
      "BERT",
      "DistilBERT",
      "RoBERTa",
      "Fine-tuning",
      "LoRA",
      "Gradio",
      "SHAP",
      "Lime",
      "Pandas",
    ],
    startDate: new Date("2024-09-01"),
    endDate: new Date("2025-03-01"),
    companyLogoImg: "/projects/Multilingual-Sentiment-Analyzer/logo.png",
    pagesInfoArr: [
      {
        title: "Single and Batch Analysis",
        description:
          "The interface supports direct text analysis and file-based batch processing, returning sentiment probabilities and downloadable outputs.",
        imgArr: [
          "/projects/Multilingual-Sentiment-Analyzer/landing_1.webp",
          "/projects/Multilingual-Sentiment-Analyzer/landing_2.webp",
        ],
      },
      {
        title: "Explainable AI View",
        description:
          "SHAP and LIME views help users inspect which tokens contribute most to a prediction.",
        imgArr: [
          "/projects/Multilingual-Sentiment-Analyzer/cli_dashboard_1.webp",
          "/projects/Multilingual-Sentiment-Analyzer/cli_dashboard_2.webp",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This applied NLP project turns sentiment classification into a usable analysis platform. The focus is not only model accuracy, but also batch usability, result export, and interpretability.",
        "The system uses BERT-family Transformer models through the Hugging Face ecosystem and exposes single-text, batch, and explainability workflows through a Gradio interface.",
        "My contribution covered model integration, interface design, batch processing, prediction history, export logic, and SHAP/LIME explainability support.",
      ],
      bullets: [
        "Integrated BERT, DistilBERT, and RoBERTa-style sentiment models into a multilingual analysis workflow.",
        "Built single-input and batch-file workflows for practical analysis use.",
        "Added SHAP and LIME explainability views to make predictions inspectable.",
        "Implemented history and export features for CSV/JSON result reuse.",
      ],
    },
  },
  {
    id: "SmartReview",
    companyName: "SmartReview Pro",
    type: "Technical Project",
    category: ["Technical Project", "AI/ML", "NLP"],
    shortDescription:
      "An AI review-intelligence platform that analyzes e-commerce feedback across sentiment, emotion, quality, and suspicious-review signals.",
    websiteLink: "https://huggingface.co/spaces/entropy25/SmartReview",
    techStack: [
      "Python",
      "RoBERTa",
      "DistilBERT",
      "Transformers",
      "PyTorch",
      "Gradio",
      "Plotly",
      "Pandas",
      "SQLite",
    ],
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-07-01"),
    companyLogoImg: "/projects/smartreview/logo.png",
    pagesInfoArr: [
      {
        title: "Review Intelligence Workflow",
        description:
          "The platform combines multiple NLP modules into a single workflow for e-commerce review understanding and reporting.",
        imgArr: ["/projects/smartreview/logo.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "SmartReview Pro is an applied AI platform for turning raw e-commerce reviews into structured business signals. It combines multiple NLP modules so users can move beyond a single sentiment label.",
        "The system uses Transformer-based classifiers, a modular analysis pipeline, SQLite-backed caching, and interactive Plotly/Gradio visualizations.",
        "My contribution was to design the multi-module analysis workflow, integrate model inference, optimize repeated analysis with caching, and build the user-facing dashboard for review-level and aggregate insights.",
      ],
      bullets: [
        "Built analysis modules for sentiment, emotion, review quality, and suspicious-review signals.",
        "Integrated RoBERTa/DistilBERT-family models through a modular Python pipeline.",
        "Used lazy loading and SQLite caching to improve responsiveness for repeated review analysis.",
        "Designed interactive Gradio and Plotly views for interpretable business-facing outputs.",
      ],
    },
  },
];

export const featuredProjects = Projects.slice(0, 3);
