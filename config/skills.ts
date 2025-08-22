import { Icons } from "@/components/common/icons";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "Python",
    description:
      "The core programming language for AI and data science, supporting machine learning and deep learning development.",
    rating: 5,
    icon: Icons.python,
  },
  {
    name: "PyTorch",
    description:
      "Facebook's deep learning framework providing dynamic computation graphs and flexible model building.",
    rating: 5,
    icon: Icons.pytorch,
  },
  {
    name: "OpenCV",
    description:
      "Computer vision library for image processing, object detection, and multimodal AI applications.",
    rating: 4,
    icon: Icons.opencv,
  },
  {
    name: "Pandas",
    description:
      "Powerful data analysis and manipulation library, the go-to tool for handling structured data.",
    rating: 5,
    icon: Icons.pandas,
  },
  {
    name: "NumPy",
    description:
      "Fundamental package for scientific computing, providing high-performance multidimensional array operations.",
    rating: 5,
    icon: Icons.numpy,
  },
  {
    name: "SciPy",
    description:
      "Scientific computing library built on NumPy, providing algorithms for optimization, statistics, and signal processing.",
    rating: 4,
    icon: Icons.scipy,
  },
  {
    name: "Scikit-learn",
    description:
      "Machine learning library featuring classification, regression, clustering and dimensionality reduction algorithms.",
    rating: 4,
    icon: Icons.scikitlearn,
  },
  {
    name: "Jupyter",
    description:
      "Interactive computing environment for data analysis, prototyping, and collaborative research.",
    rating: 4,
    icon: Icons.jupyter,
  },
  {
    name: "Streamlit",
    description:
      "Open-source framework for building and deploying interactive web applications for machine learning and data science.",
    rating: 4,
    icon: Icons.streamlit,
  },
  {
  name: "Git/GitHub",
  description: "Version control system and collaborative development platform for managing code repositories.",
  rating: 5,
  icon: Icons.github,
  },
  {
    name: "MLflow",
    description:
      "Open-source platform for managing machine learning lifecycle including experimentation and deployment.",
    rating: 4,
    icon: Icons.mlflow,
  },
  {
    name: "Docker",
    description:
      "Containerization platform for packaging applications and ensuring consistent deployment across environments.",
    rating: 4,
    icon: Icons.docker,
  },
  {
    name: "Microsoft Azure",
    description:
      "Cloud computing platform providing AI services, machine learning tools, and scalable infrastructure.",
    rating: 3,
    icon: Icons.microsoftazure,
  },
  {
    name: "Vercel",
    description:
      "Frontend deployment platform optimized for modern web applications and AI-powered interfaces.",
    rating: 4,
    icon: Icons.vercel,
  },
  {
    name: "Plotly",
    description:
      "Interactive data visualization library for creating dynamic charts, dashboards, and analytical applications.",
    rating: 4,
    icon: Icons.plotly,
  },
];
export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
