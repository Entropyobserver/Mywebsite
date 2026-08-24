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
    category: ["Research", "Machine Translation", "NLP", "Evaluation"],
    shortDescription:
      "Published EAMT research on parameter-efficient English-Norwegian petroleum-domain NMT, showing how LoRA can adapt NLLB-200 with strong quality gains while updating less than 0.4% of model parameters.",
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
        imgArr: [
          "/projects/lora-nmt-petroleum/framework_vertical_paper.png",
        ],
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
        title: "Experiment 2c: Multi-Objective Selection and Stability Validation",
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
      "Modular LoRA Experts for Multilingual Domain Translation",
    type: "Research",
    category: ["Research", "Machine Translation", "NLP", "Evaluation"],
    shortDescription:
      "Research-in-progress summary on modular parameter-efficient adaptation for multilingual petroleum-domain MT, focusing on expert specialization, routing behavior, and terminology-aware evaluation.",
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
      "Data Curation",
      "Statistics",
    ],
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-08-01"),
    companyLogoImg: "/projects/modular-lora-experts/cover.png",
    pagesInfoArr: [
      {
        title: "High-Level Modular Adaptation Framework",
        description:
          "The public version presents the research design at a high level: domain data construction, language-specific LoRA experts, router diagnostics, and terminology-aware evaluation. Detailed paper-level results are intentionally limited while the manuscript is being revised.",
        imgArr: ["/projects/modular-lora-experts/cover.png"],
      },
      {
        title: "Language Representation Diagnostics",
        description:
          "Encoder representation analysis is used as one diagnostic lens for understanding whether multilingual source languages form separable routing signals before expert selection is evaluated.",
        imgArr: ["/projects/modular-lora-experts/tsne_encoder_features.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project explores modular parameter-efficient adaptation for multilingual domain machine translation. It asks whether source-language-specific LoRA experts and routing mechanisms can support terminology-sensitive translation when direct parallel data is scarce.",
        "The current public summary is intentionally high-level while the manuscript is being revised for a future review cycle. It emphasizes the research question, system design, diagnostic methods, and evaluation logic rather than exposing full experimental results or manuscript details.",
      ],
      bullets: [
        "Designed a modular LoRA expert setup with source-language-specific adapters over a frozen multilingual backbone.",
        "Developed a target-anchored synthetic data construction strategy for low-resource multilingual petroleum-domain training signals.",
        "Implemented router and cross-expert diagnostics to analyze expert specialization, capacity sharing, and terminology-sensitive behavior.",
        "Evaluated translation quality and terminology behavior using automatic metrics and controlled comparisons.",
        "Kept the public website version conservative: full paper-level results and manuscript links can be added after the review process.",
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
    companyName: "Group-Level Training Data Attribution with Exact Shapley Analysis",
    type: "Research",
    category: ["Research", "Data-Centric ML", "Machine Translation", "Evaluation"],
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
    companyLogoImg:
      "/projects/group-shapley-attribution/random-baseline-barchart.png",
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
        "This project asks a data-centric question: which interpretable groups of training examples are responsible for different aspects of model behavior after fine-tuning?",
        "The method defines auditable training-data groups based on written-standard labels, enumerates all feasible data coalitions, trains models across the coalition space, and computes exact group-level Shapley values for multiple utility functions. The evaluation separates translation quality, terminology accuracy, and written-standard behavior instead of reducing data contribution to one scalar score.",
        "My contribution was the research framing, coalition protocol, Shapley computation design, model training setup, metric design, random size-matched baselines, and cross-architecture validation plan. Because the work is still manuscript-stage, the site presents the method and contribution at a high level.",
      ],
      bullets: [
        "Formulated group-level data attribution as an exact Shapley analysis over interpretable data groups.",
        "Enumerated all 16 coalitions for four written-standard groups and evaluated multiple behavior-specific utility functions.",
        "Compared true groups with repeated random size-matched groups to test whether attribution patterns are reducible to group size.",
        "Extended the protocol from encoder-decoder MT to decoder-only instruction-format LoRA validation.",
        "Used bootstrap confidence intervals and manual audit planning to make the attribution analysis more robust.",
      ],
    },
  },
  {
    id: "target-standard-bias",
    companyName: "Target-Standard Bias from Data Filtering in Norwegian MT",
    type: "Research",
    category: ["Research", "Responsible AI", "Machine Translation", "Evaluation"],
    shortDescription:
      "A controlled responsible-AI study of how target-side filtering can specialize Norwegian MT toward Bokmål, shift reported scores, and complicate evaluation in a multi-standard language.",
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
          "RQ1. Does target-side filtering toward Bokmål change translation quality or mainly change the written standard a model produces?\n\nRQ2. Are apparent gains caused by the linguistic identity of the retained examples, or simply by differences in training-set size?\n\nRQ3. Do filtering effects persist across NLLB-200 model scales and evaluation domains?\n\nRQ4. How should automatic scores be interpreted when the reference itself reflects one accepted written standard?",
        imgArr: [],
      },
      {
        title: "Controlled Experimental Framework",
        description:
          "We treat filtering as the experimental intervention. Models are trained under original mixed-standard, Bokmål-filtered, and size-controlled conditions while holding the adaptation recipe and evaluation protocol fixed. The comparison is repeated across NLLB-200 scales so that a preprocessing choice is not mistaken for a model-size effect.",
        imgArr: ["/projects/target-standard-bias/study-design.svg"],
      },
      {
        title: "Filtering Is a Modeling Decision",
        description:
          "Target-side language identification is often introduced as corpus cleaning, but removing examples also changes which legitimate Norwegian forms the model sees. We therefore audit label distributions before and after filtering, retain the original condition as a reference point, and record what the filter removes rather than assuming that every excluded sentence is noise.",
        imgArr: [],
      },
      {
        title: "Evaluation Across Quality, Terminology, and Standard Use",
        description:
          "The evaluation separates several behaviors that a single score can collapse. BLEU and chrF track reference overlap; terminology F1 checks domain terms; written-standard identification measures high-Bokmål and Nynorsk-like output; and FLORES provides an out-of-domain robustness check. Paired comparisons and bootstrap uncertainty are used wherever the same test items are shared across systems.",
        imgArr: ["/projects/target-standard-bias/evaluation-matrix.svg"],
      },
      {
        title: "Size-Matched Baseline Diagnostic",
        description:
          "A companion diagnostic compares the linguistically defined high-Bokmål group with random groups of the same size. The true group produces a much stronger and directionally coherent pattern across BLEU, chrF, terminology F1, high-Bokmål rate, and Nynorsk-like rate. This does not by itself establish causality, but it shows why group identity must be tested separately from sample count.",
        imgArr: ["/projects/target-standard-bias/random-baseline-barchart.png"],
      },
      {
        title: "Cross-Scale and Out-of-Domain Robustness",
        description:
          "The same controlled conditions are evaluated across multiple NLLB-200 scales and on both the in-domain petroleum test set and an out-of-domain FLORES slice. This design asks whether written-standard specialization is stable, model-dependent, or tied to the domain and reference distribution used to measure it.",
        imgArr: [],
      },
      {
        title: "Interpreting Metric Gains in a Multi-Standard Language",
        description:
          "A higher reference-based score can indicate better translation, closer alignment with the reference's written standard, or both. The analysis therefore reports translation quality and output-standard behavior side by side, and avoids treating a Bokmål shift as a universal quality improvement when Nynorsk is also a valid target standard.",
        imgArr: ["/projects/target-standard-bias/interpretation-boundary.svg"],
      },
      {
        title: "Human Review and Responsible-Use Safeguards",
        description:
          "Diagnostic human review checks whether automatic standard labels match the actual output, whether terminology changes preserve meaning, and whether apparent metric improvements hide unwanted normalization. The practical safeguard is simple: document the filter, publish pre/post-filter distributions, evaluate each intended standard explicitly, and align deployment claims with the users and language varieties the system is meant to serve.",
        imgArr: [],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "Norwegian machine translation is evaluated in a setting where Bokmål and Nynorsk are both legitimate written standards. This project asks what happens when target-side filtering, presented as data cleaning, systematically favors Bokmål before LoRA adaptation of NLLB-200.",
        "The study compares original mixed-standard data, Bokmål-filtered data, and size-controlled baselines across model scales. It evaluates reference-based translation quality, domain terminology, written-standard output behavior, out-of-domain robustness, and diagnostic human judgments instead of relying on one aggregate score.",
        "As co-author and controlled-experiment analysis lead, I helped frame filtering as an auditable modeling intervention, designed the size-matched comparisons, analyzed output-standard shifts, and translated the evaluation findings into practical safeguards for multilingual MT development.",
      ],
      bullets: [
        "Designed controlled original, filtered, and size-matched training conditions for LoRA-based NLLB adaptation.",
        "Evaluated BLEU, chrF, terminology F1, written-standard output rates, and out-of-domain robustness across model scales.",
        "Separated linguistic group identity from sample-size effects using random size-matched diagnostics and paired statistical validation.",
        "Developed an interpretation framework and human-review safeguards for reference-based evaluation in multi-standard languages.",
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
    companyLogoImg:
      "/projects/vlm-bias-evaluation/cover.svg",
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
