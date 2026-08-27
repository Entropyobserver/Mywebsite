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
    companyName: "FinRAG-Equinor: Evidence-Grounded RAG Benchmark",
    type: "Research",
    category: ["Research", "RAG", "Information Retrieval", "Evaluation"],
    shortDescription:
      "A reliability-audited benchmark candidate for evidence-grounded RAG over 15 Equinor/Statoil annual reports, focusing on traceable report, page, and object-level evidence.",
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
    pagesInfoArr: [
      {
        title: "PDF-to-Benchmark Pipeline",
        description:
          "The benchmark turns annual-report PDFs into traceable retrieval units, candidate questions, answers, evidence metadata, audit labels, and evaluation scripts.",
        imgArr: ["/projects/finrag-equinor/cover.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project builds a benchmark candidate for evidence-grounded RAG over long financial and annual-report PDFs. Instead of treating retrieval as generic passage search, it asks whether a system can reach the correct report year, localize the relevant page, and identify the exact supporting evidence object.",
        "The benchmark covers 15 Equinor/Statoil annual reports from 2010 to 2024 and contains 720 questions across numerical extraction, table lookup, temporal comparison, multi-hop reasoning, visual/layout questions, and unanswerable cases. Retrieval experiments compare sparse, dense, hybrid, hierarchical, and reranked settings.",
        "My contribution was the benchmark design and retrieval evaluation pipeline: parsing report structure into retrieval units, designing evidence metadata, building QA and hard-negative diagnostics, running retrieval baselines, and analyzing failure modes across report selection, page localization, and object grounding.",
      ],
      bullets: [
        "Built a controlled annual-report QA benchmark with page- and object-level evidence metadata.",
        "Evaluated BM25, dense retrieval, hybrid fusion, hierarchical page-to-object retrieval, and cross-encoder reranking.",
        "Analyzed retrieval failures by report/year mismatch, same-page wrong-object errors, same-report wrong-page errors, and adjacent-page confusions.",
        "Framed evidence-grounded RAG as a hierarchical localization problem rather than a single retrieval score.",
        "Kept the public portfolio description high-level while the manuscript remains under review or preparation.",
      ],
    },
  },
  {
    id: "structure-aware-graph-rag",
    companyName: "Structure-Aware Graph Retrieval for Long Annual Reports",
    type: "Research",
    category: ["Research", "RAG", "Information Retrieval", "Evaluation"],
    shortDescription:
      "Under-review research showing when typed document-structure graphs help evidence retrieval over long annual reports, and when naive structural proximity introduces noise.",
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
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/graph-rag-evidence/cover.png",
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
        "This project studies structure-aware retrieval for evidence grounding over long annual reports. The key question is not only whether retrieved text is semantically similar, but whether the system can navigate document structure to find the exact evidence supporting an answer.",
        "The method builds a typed metadata evidence graph over reports, pages, retrieval objects, entities, and metric categories. Graph expansion is used as a candidate-generation step, followed by cross-encoder reranking. The analysis shows that structure helps selectively: same-page and entity links can bridge evidence, same-metric links help modestly, and adjacent-page links can introduce distracting neighbors.",
        "My contribution was to design the GraphRAG retrieval experiments, implement the typed graph expansion and edge ablations, evaluate object Recall@10, page Recall@10, MRR, and validation splits, and interpret the trade-off between relaxed page localization and exact evidence-object grounding.",
      ],
      bullets: [
        "Constructed a typed evidence graph connecting reports, years, pages, objects, entities, and metric categories.",
        "Tested graph expansion as retrieval candidate generation rather than as final ranking.",
        "Ran edge-type ablations to separate useful structure from noisy proximity links.",
        "Added a lightweight structure-aware routing and ordering layer for interpretable retrieval control.",
        "Presented the work as under review, with enough method clarity for portfolio readers but without exposing the full manuscript.",
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
      "Data-Centric ML",
      "Machine Translation",
      "Evaluation",
    ],
    shortDescription:
      "A data-centric ML project using exact group-level Shapley values to study which training-data groups shape translation quality, terminology behavior, and written-standard output.",
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
    companyName: "Target-Standard Bias from Data Filtering in Norwegian MT",
    type: "Research",
    category: [
      "Research",
      "Responsible AI",
      "Machine Translation",
      "Evaluation",
    ],
    shortDescription:
      "A controlled English-Norwegian MT study showing that Bokmål filtering improves scores against Bokmål references but lowers BLEU and chrF on mixed-standard data while nearly eliminating Nynorsk-only output.",
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
          "RQ1. Does Bokmål filtering improve performance on in-domain Bokmål test data?\n\nRQ2. Are the observed effects caused by filtering itself rather than the smaller size of the filtered dataset?\n\nRQ3. Does Bokmål filtering reduce robustness to the original mixed-standard distribution?\n\nRQ4. Does filtering change the written-standard distribution of generated outputs?\n\nRQ5. Do in-domain gains transfer to general-domain FLORES evaluation?\n\nRQ6. Does the size-controlled evaluation pattern persist across larger NLLB-200 model sizes?",
        imgArr: [],
      },
      {
        title: "Data Filtering and Size-Controlled Design",
        description:
          "The original petroleum-domain split contains 13,935 training pairs. SLIDE filtering retains targets with Bokmål score at least 0.80 and Nynorsk score below 0.30, producing 10,114 training pairs. A deterministic original-subsampled condition uses the same 10,114/1,305/1,313 train/validation/test sizes, isolating written-standard filtering from data-volume effects. Nearby thresholds retain 71.2-73.3% of the original training set, placing the selected threshold in a stable region of the score distribution.",
        imgArr: ["/projects/target-standard-bias/study-design.svg"],
      },
      {
        title: "LoRA Fine-Tuning and Evaluation Protocol",
        description:
          "The main experiments fine-tune NLLB-200 distilled 600M with LoRA using rank 8, alpha 64, zero dropout, three epochs, learning rate 5e-4, beam size 5, and seeds 42, 123, and 456. The size-controlled in-domain comparison is replicated with 1.3B and 3.3B NLLB-200 models. Evaluation uses BLEU, chrF, Bokmål-oriented TermR/TermP/TermF1, SLIDE written-standard labels, 1,000-sample paired bootstrap tests, and exact McNemar tests. The paper deliberately does not use COMET because transparent form-sensitive metrics are central to the evaluation-bias analysis.",
        imgArr: [],
      },
      {
        title: "In-Domain Result: Reference Choice Reverses the Ranking",
        description:
          "With the same 10,114 training examples, Bokmål filtering improves BLEU from 0.5937 to 0.6128 and chrF from 78.02 to 79.34 on the Bokmål test set. On the original mixed-standard test set, the same intervention lowers BLEU from 0.6177 to 0.5849 and chrF from 79.12 to 77.43. Bokmål-oriented TermF1 rises on both test sets, from 0.7702 to 0.7912 and from 0.7309 to 0.7908. The result is specialization, not a uniform quality gain.",
        imgArr: ["/projects/target-standard-bias/in-domain-results.svg"],
      },
      {
        title: "Written-Standard Shift on the Same Test Set",
        description:
          "The original mixed-standard references contain 76.2% Bokmål-only, 17.2% Nynorsk-only, and 6.0% mixed sentences. The size-matched original-subsampled model approximately preserves this distribution with 79.0% Bokmål-only and 14.2% Nynorsk-only output. In contrast, the filtered model produces 93.4% Bokmål-only and only 0.7% Nynorsk-only output. Across seeds, every paired McNemar comparison is significant at p < 0.001.",
        imgArr: ["/projects/target-standard-bias/written-standard-shift.svg"],
      },
      {
        title: "The Pattern Persists from 600M to 3.3B",
        description:
          "Larger backbones improve absolute translation scores but do not remove the evaluation reversal. Across 600M, 1.3B, and 3.3B models, Bokmål filtering consistently improves BLEU against Bokmål references while lowering it against the original mixed-standard references. On the original test set, filtered models produce 93.7-94.6% Bokmål-only output versus 79.1-79.8% for the size-controlled baseline, while Nynorsk-only output falls to 0.08-0.17%.",
        imgArr: ["/projects/target-standard-bias/model-scale-results.svg"],
      },
      {
        title: "Out-of-Domain FLORES Check",
        description:
          "The zero-shot 600M NLLB model remains stronger on general-domain FLORES NB than every fine-tuned system: BLEU 0.3059 and chrF 59.22 versus 0.2726-0.2766 and 56.35-56.63. Filtering therefore does not improve English-Norwegian MT in general. FLORES NN is used only as an evaluation-mismatch test because every system decodes with the Bokmål-oriented nob_Latn code; it is not an evaluation of Nynorsk generation ability.",
        imgArr: ["/projects/target-standard-bias/flores-results.svg"],
      },
      {
        title: "Human Validation Separates Adequacy from Conformity",
        description:
          "Two annotators blindly evaluated 50 shift-enriched and 50 control items. Filtering changes adequacy only slightly (+0.01 to +0.02 on a 0-2 scale) but increases Bokmål conformity by +0.79 to +0.98. Preference agreement on 99 shared valid items is 85.9% with Cohen's kappa 0.751. SLIDE's shift margin correlates strongly with human-rated Bokmål conformity gain (Spearman rho 0.762), supporting the interpretation that the detected shift is human-perceptible rather than only a classifier artifact.",
        imgArr: ["/projects/target-standard-bias/human-evaluation.svg"],
      },
      {
        title: "Interpretation, Scope, and Responsible Deployment",
        description:
          "Bokmål specialization is appropriate when the deployment target is explicitly Bokmål petroleum translation; the problem is silent specialization under a generic Norwegian label. The evidence is limited to one direction and domain, all systems decode with nob_Latn, terminology metrics use Bokmål forms, and human evaluation is diagnostic rather than population-representative. The practical recommendation is to document the intended standard, report output-standard distributions beside BLEU and chrF, and use standard-specific or dual-standard references and terminology resources where possible.",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This research project, titled 'When Data Cleaning Becomes Bias: Target-Standard Specialization in Norwegian Machine Translation,' studies how filtering a mixed Bokmål/Nynorsk petroleum corpus toward Bokmål changes both model output and evaluation outcomes.",
        "Using LoRA-adapted NLLB-200 models, the study compares full original data, a SLIDE-filtered Bokmål subset, and a random original subset of exactly the same size. Results are measured against Bokmål and mixed-standard references, replicated across 600M, 1.3B, and 3.3B backbones, checked on FLORES, and triangulated with blind human evaluation.",
        "As co-author and controlled-experiment analysis lead, I contributed to the size-controlled design, model-scale replication, statistical analysis, written-standard diagnostics, and interpretation of reference and terminology bias.",
      ],
      bullets: [
        "Controlled for data size with matched 10,114-pair filtered and original-subsampled training conditions.",
        "Demonstrated a reference-dependent metric reversal across three NLLB-200 model scales.",
        "Measured the output shift from 79.0% to 93.4% Bokmål-only and from 14.2% to 0.7% Nynorsk-only on the same mixed-standard test set.",
        "Validated the interpretation with paired bootstrap tests, McNemar tests, SLIDE-human comparison, and blind diagnostic human evaluation.",
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
