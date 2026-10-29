import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xiaojing Yang | Research Portfolio",
    short_name: "Xiaojing Yang",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
    categories: ["portfolio", "research", "education"],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
