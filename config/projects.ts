import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
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
      "Low-Resource Petroleum-Domain Machine Translation with LoRA",
    type: "Research",
    category: ["Research", "Machine Translation", "NLP", "Evaluation"],
    shortDescription:
      "Published EAMT research on parameter-efficient English-Norwegian petroleum-domain NMT, showing how LoRA can adapt NLLB-200 with strong quality gains while updating less than 0.4% of model parameters.",
    websiteLink: "https://huggingface.co/spaces/entropy25/mt",
    githubLink: "https://github.com/Entropyobserver/mt",
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
        title: "Project Overview: Corpus to Evaluation",
        description:
          "The website overview summarizes the main experimental workflow: corpus diagnostics, data-scaling analysis, dual-track LoRA hyperparameter search, final benchmarking, and automatic evaluation with BLEU, chrF, COMET, and terminology review.",
        imgArr: ["/projects/lora-nmt-petroleum/framework_v3.png"],
      },
      {
        title: "Corpus Diagnostics",
        description:
          "The raw EN-NO petroleum corpus was checked before modeling to understand alignment quality, completeness, duplication, length behavior, and domain coverage. This step motivates why data cleaning and diagnostics are part of the contribution, not just preprocessing.",
        imgArr: ["/projects/lora-nmt-petroleum/sanity.png"],
      },
      {
        title: "Experiment 1: Data Scaling and Training Budget",
        description:
          "The analysis identifies an efficient training subset before expensive hyperparameter search, showing that 8,000 samples recover most of the full-data performance in this domain.",
        imgArr: ["/projects/lora-nmt-petroleum/data_scaling_analysis.png"],
      },
      {
        title: "Experiment 2a: Grid Search Hyperparameter Landscape",
        description:
          "The grid search maps how LoRA rank, scaling factor, and dropout interact, providing a systematic view of the hyperparameter landscape before selecting final candidates.",
        imgArr: ["/projects/lora-nmt-petroleum/hyperparameter_heatmaps.png"],
      },
      {
        title: "Experiment 2b: LoRA Hyperparameter Main Effects",
        description:
          "This figure isolates the average effect of rank, alpha, and dropout on validation BLEU. It shows that the scaling factor alpha is the strongest driver of performance in the searched configuration space.",
        imgArr: ["/projects/lora-nmt-petroleum/parameter_importance.png"],
      },
      {
        title: "Experiment 2c: Optuna fANOVA Importance",
        description:
          "The Optuna study confirms the grid-search pattern with fANOVA: LoRA alpha dominates relative hyperparameter importance, while rank and dropout contribute much less.",
        imgArr: ["/projects/lora-nmt-petroleum/optuna_importance.png"],
      },
      {
        title: "Experiment 2d: Pareto Front for Final Configuration Selection",
        description:
          "The Pareto front compares BLEU and chrF from the Optuna study. Pareto-optimal candidates are highlighted, and the selected configuration balances both metrics rather than optimizing only one score.",
        imgArr: ["/projects/lora-nmt-petroleum/pareto_front.png"],
      },
      {
        title: "Experiment 3: Final Model Performance",
        description:
          "The optimized LoRA model is compared with the zero-shot NLLB baseline and commercial MT systems. It achieves 61.48 BLEU and 79.19 chrF++, outperforming evaluated commercial systems on lexical metrics while reaching comparable COMET semantic adequacy.",
        imgArr: ["/projects/lora-nmt-petroleum/final_model_performance.png"],
      },
      {
        title: "Experiment 4: LoRA vs. Full Fine-Tuning",
        description:
          "This comparison evaluates whether the parameter-efficient LoRA setup remains competitive against full fine-tuning across training sizes. The maximum observed gap stays below one BLEU point, supporting LoRA as an efficient alternative for this resource-constrained domain.",
        imgArr: ["/projects/lora-nmt-petroleum/lora_vs_full_ft.png"],
      },
      {
        title: "Human Error Analysis",
        description:
          "After the automatic experiments, the paper adds a separate human error analysis: 50 stratified test sentences were manually reviewed across error categories and severity levels, with two annotators and reported Cohen's kappa agreement. This final step shows why BLEU, chrF, and COMET need to be complemented by domain-aware inspection for critical terminology, numeric, and directional errors.",
        imgArr: ["/projects/lora-nmt-petroleum/human-error-analysis.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project investigated how parameter-efficient fine-tuning can adapt multilingual neural machine translation to a specialized low-resource domain. The case study focused on English-to-Norwegian petroleum translation, where noisy parallel corpora, specialized terminology, and limited domain data make direct adaptation difficult.",
        "Using NLLB-200 with LoRA adapters, the study combined corpus diagnostics, data scaling, hyperparameter optimization, final benchmarking, and human error analysis. The adapted model achieved competitive translation quality while updating fewer than 0.4% of model parameters.",
      ],
      bullets: [
        "Designed a data-quality assessment and cleaning pipeline for noisy parallel corpora, evaluating alignment, completeness, uniqueness, and domain coverage.",
        "Optimized LoRA configurations using grid search and Optuna/ASHA, with fANOVA identifying the scaling factor as a key driver of performance.",
        "Evaluated model-scale robustness and compared LoRA with full fine-tuning and commercial MT systems.",
        "Analyzed translation quality using BLEU, chrF, COMET, terminology-oriented review, and a 50-sentence human error analysis with annotator agreement.",
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
      "A responsible AI project studying how target-side data filtering can silently specialize Norwegian MT systems toward one written standard and change metric interpretation.",
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
    companyLogoImg:
      "/projects/target-standard-bias/random-baseline-barchart.png",
    pagesInfoArr: [
      {
        title: "Written-Standard Data Diagnostics",
        description:
          "The project treats filtering as a modeling decision, not a neutral preprocessing step, and evaluates how written-standard distributions affect MT scores and output behavior.",
        imgArr: ["/projects/target-standard-bias/random-baseline-barchart.png"],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This project studies target-standard bias in Norwegian machine translation. The core question is whether target-side filtering toward Bokmal changes both model behavior and the way automatic metrics reward that behavior.",
        "The method compares original, filtered, and size-controlled training conditions across NLLB-200 model scales. It combines automatic MT metrics, terminology evaluation, written-standard identification, out-of-domain FLORES checks, and diagnostic human assessment.",
        "My contribution was to connect data filtering with responsible evaluation: I helped frame filtering as an auditable source of target-standard specialization, designed the size-controlled comparison, analyzed written-standard output shifts, and translated the result into practical safeguards for MT evaluation.",
      ],
      bullets: [
        "Designed a size-controlled comparison between original mixed-standard data and Bokmal-filtered data.",
        "Evaluated translation quality, terminology behavior, written-standard output rates, and robustness across model scales.",
        "Showed why reference-based metrics can encode target-standard preferences in multi-standard languages.",
        "Added human-evaluation and deployment-interpretation framing to avoid treating all specialization as either good or bad.",
        "Kept the project summary high-level until the manuscript path is settled.",
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
      "/projects/vlm-bias-evaluation/vlm-image-review-contact-sheet.jpg",
    pagesInfoArr: [
      {
        title: "Image Review and Validation Workflow",
        description:
          "The VLM case study uses reviewed image sets, metadata, captioning instructions, automatic framing metrics, and human validation sheets.",
        imgArr: [
          "/projects/vlm-bias-evaluation/vlm-image-review-contact-sheet.jpg",
        ],
      },
    ],
    descriptionDetails: {
      paragraphs: [
        "This technical research framework evaluates whether language and vision-language models introduce systematic framing differences across social, political, or cultural groups.",
        "The framework supports both text-only matched prompts and image-instruction VLM tasks. It separates case-specific resources from shared code for data loading, prompt construction, model execution, metric scoring, group disparity analysis, bootstrap summaries, annotation sheet creation, and agreement analysis.",
        "My contribution was to design the reusable framework, implement the shared evaluation modules, structure three case studies, and define a validation boundary: automatic metrics are screening signals, while strong bias claims require human annotation and agreement analysis.",
      ],
      bullets: [
        "Built a configuration-driven framework for geographic, gender-occupation, and VLM political/moral bias case studies.",
        "Implemented matched-prompt generation, model inference wrappers, automatic framing metrics, and group disparity summaries.",
        "Extended the framework from text-only variables to image-instruction VLM description tasks.",
        "Added human annotation sheet generation and Cohen's kappa support for validation.",
        "Positioned the project as a reusable research tool and case-study platform rather than a finished benchmark claim.",
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
