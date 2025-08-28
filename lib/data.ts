import { Briefcase, GraduationCap, Github, ExternalLink, Code } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiMongodb, SiGraphql, SiPhp, SiPostgresql, SiNextdotjs } from "react-icons/si";

export const iconMap = {
  SiNextdotjs: SiNextdotjs,
  SiPhp: SiPhp,
  FaNodeJs: FaNodeJs,
  SiTypescript: SiTypescript,
  SiTailwindcss: SiTailwindcss,
  SiMongodb: SiMongodb,
  SiGraphql: SiGraphql,
  SiPostgresql: SiPostgresql,
  briefcase: Briefcase,
  graduation: GraduationCap,
};


export const technologies = [
  { name: "Node.js", icon: "FaNodeJs", color: "#339933" },
  { name: "PHP", icon: "SiPhp", color: "#777BB4" },
  { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFF" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
  { name: "GraphQL", icon: "SiGraphql", color: "#E10098" },
];

export const companyLinks = {
  "OliveSoft": "https://www.olivesoft.fr/fr",
  "EFREI": "https://www.efrei.fr/programmes-experts/bachelor-concepteur-developpeur/",
  "Heracles Conseil": "https://www.heracles-conseil.com/main-home/",
  "Lycée Richelieu": "https://lyc-richelieu-rueil.ac-versailles.fr/",
};

export const projectLinks = {
  "KovoitGO": {
    github: "https://github.com/LulDrako/CovoiturageNode",
    demo: "https://covoiturage-node.vercel.app/",
  },
  "Fils Rouge PHP - Hackathon EFREI": {
    github: "https://github.com/LulDrako/PHP-Fils-Rouge-Hackton",
    demo: "https://karim-feki.infinityfreeapp.com/",
  },
  "O.C.A Voitures": {
    github: "https://github.com/LulDrako/Symfony",
    demo: "",
  },
};