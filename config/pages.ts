import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
    // featuredDescription: string;
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio website.",
    metadata: {
      title: "Home",
      description: "Xiaojing Yang's research portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "My technical background connects data analysis, machine learning, NLP research, rigorous evaluation, and research engineering for applied AI systems.",
    metadata: {
      title: "Skills",
      description:
        "Xiaojing Yang's skills in AI, machine learning, NLP, evaluation, and research engineering.",
    },
  },
  projects: {
    title: "Projects",
    description: "I have experience building and evaluating NLP and AI systems across machine translation, retrieval, RAG, and model evaluation, with projects ranging from research prototypes to applied AI applications.",
    metadata: {
      title: "Projects",
      description: "Xiaojing Yang's research and technical projects.",
    },
  },
  contact: {
    title: "Contact",
    description:
      "For research collaboration, PhD opportunities, academic questions, or technical discussion, feel free to reach out.",
    metadata: {
      title: "Contact",
      description:
        "Contact Xiaojing Yang for research collaboration, academic opportunities, and AI or NLP discussions.",
    },
  },
  publications: {
    title: "Publications",
    description: "I currently have one peer-reviewed publication, with several additional manuscripts under review and in preparation. My research outputs span multilingual NLP, machine translation, model adaptation, information retrieval, and data-centric evaluation, reflecting my broader interest in developing and understanding reliable language technologies.",
    metadata: {
      title: "Publications",
      description:
        "Xiaojing Yang's peer-reviewed publication, manuscripts under review, and research outputs in NLP, machine translation, retrieval, and data-centric evaluation.",
    },
  },
  resume: {
    title: "CV",
    description: "Xiaojing Yang's academic CV.",
    metadata: {
      title: "CV",
      description: "Xiaojing Yang's academic CV.",
    },
  },
  experience: {
    title: "Experience",
    description:
      "Research, work, and teaching experience across AI, NLP, data analysis, and machine learning.",
    metadata: {
      title: "Experience",
      description:
        "Xiaojing Yang's research, work, teaching, and mentoring experience.",
    },
  },
};
