import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@Entropyobserver",
    icon: Icons.gitHub,
    link: "https://github.com/Entropyobserver",
  },
  {
    name: "LinkedIn",
    username: "Jean Young",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/jean-young-3a36912a0/",
  },
  {
    name: "Twitter",
    username: "@Entropyobserver",
    icon: Icons.twitter,
    link: "https://twitter.com/Entropyobserver",
  },
  {
    name: "Gmail",
    username: "Entropyobserver",
    icon: Icons.gmail,
    link: "mailto:sicper2011@gmail.com",
  },
];
