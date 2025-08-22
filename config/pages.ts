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
      description: "Jean Young's portfolio website.",
    },
  },
  skills: {
    title: "Skills",
    description: "Key skills that define my professional identity.",
    metadata: {
      title: "Skills",
      description:
        "Jean Young's key skills that define his professional identity.",
    },
  },
  projects: {
    title: "Projects",
    description: "Completed 20+ real-world projects involving text classification, sequence labeling (NER, POS), semantic search, information retrieval, Retrieval-Augmented Generation (RAG), LLM fine-tuning, and prompt engineering.",
    metadata: {
      title: "Projects",
      description: "Jean Young's projects in building web applications.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: "Contact",
      description: "Contact Jean Young.",
    },
  },
  contributions: {
    title: "Contributions",
    description: "Open-source contributions and community involvement.",
    metadata: {
      title: "Contributions",
      description:
        "Jean Young's open-source contributions and community involvement.",
    },
  },
  resume: {
    title: "Resume",
    description: "Jean Young's resume.",
    metadata: {
      title: "Resume",
      description: "Jean Young's resume.",
    },
  },
  experience: {
    title: "Experience",
    description: "Professional journey and career timeline.",
    metadata: {
      title: "Experience",
      description:
        "Jean Young's professional journey and experience timeline.",
    },
  },
};
