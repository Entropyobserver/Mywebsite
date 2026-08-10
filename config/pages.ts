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
    description: "Methods, tools, and technical strengths supporting my research and applied AI work.",
    metadata: {
      title: "Skills",
      description:
        "Xiaojing Yang's skills in AI, machine learning, NLP, evaluation, and research engineering.",
    },
  },
  projects: {
    title: "Projects",
    description: "Selected research and technical projects in machine learning, NLP, retrieval, evaluation, and applied AI systems.",
    metadata: {
      title: "Projects",
      description: "Xiaojing Yang's research and technical projects.",
    },
  },
  contact: {
    title: "Contact",
    description: "Let's connect and explore collaborations.",
    metadata: {
      title: "Contact",
      description: "Contact Xiaojing Yang.",
    },
  },
  publications: {
    title: "Publications",
    description: "Published, submitted, and planned research outputs in machine learning, NLP, retrieval, and model evaluation.",
    metadata: {
      title: "Publications",
      description:
        "Xiaojing Yang's publications, submitted manuscripts, and planned research outputs.",
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
    description: "Professional journey and career timeline.",
    metadata: {
      title: "Experience",
      description:
        "Xiaojing Yang's research, teaching, and professional experience timeline.",
    },
  },
};
