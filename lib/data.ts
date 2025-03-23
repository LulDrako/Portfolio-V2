import { Briefcase, GraduationCap, Github, ExternalLink, Code } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiMongodb, SiGraphql, SiPhp, SiPostgresql } from "react-icons/si";

export const iconMap = {
  FaReact: FaReact,
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

export const aboutMe = {
  title: "Qui suis-je?",
  description: [
    "Étudiant en développement web, j'aime apprendre et explorer différentes technologies pour créer des applications modernes et efficaces. Mon parcours m'a permis de développer des compétences solides dans ce domaine.",
    "Inspiré par l'aéronautique, j'apprécie la rigueur et la précision dans mon travail. Je cherche toujours à m'améliorer et à découvrir de nouvelles approches techniques.",
    "Actuellement à la recherche d'une alternance en développement web pour septembre 2025, je suis prêt à relever de nouveaux défis et à contribuer à des projets ambitieux.",
  ],
};

export const technologies = [
  { name: "Node.js", icon: "FaNodeJs", color: "#339933" },
  { name: "PHP", icon: "SiPhp", color: "#777BB4" },
  { name: "React", icon: "FaReact", color: "#61DAFB" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
  { name: "GraphQL", icon: "SiGraphql", color: "#E10098" },
];

export const experiences = [
  {
    title: "Stage - Développeur Web",
    company: "OliveSoft",
    location: "Tunisie",
    date: "Mai 2023 - Juin 2023",
    description:
      "Développement d'interfaces utilisateur réactives avec React et TypeScript. Collaboration avec l'équipe de design pour implémenter des maquettes fidèles.",
    icon: "briefcase",
  },
  {
    title: "Bachelor Développement Web & Applications",
    company: "EFREI",
    location: "Villejuif",
    date: "Septembre 2022 - En cours",
    description:
      "Formation intensive en développement web et programmation. Projets pratiques en équipe et individuels.",
    icon: "graduation",
  },
  {
    title: "Stage - Conception Web",
    company: "Heracles Conseil",
    location: "Remote",
    date: "Mai 2024 - Juillet 2024",
    description:
      "Développement d'une boutique en ligne avec Next.js et Stripe.",
    icon: "briefcase",
  },
  {
    title: "Baccalauréat Général",
    company: "Lycée Richelieu",
    location: "Rueil-Malmaison",
    date: "2022",
    description:
      "Obtention du baccalauréat général avec spécialités NSI et SES.",
    icon: "graduation",
  },
];

export const projects = [
  {
    title: "KovoitGO",
    description:
      "Application de covoiturage en temps réel. Les utilisateurs peuvent proposer ou réserver des trajets via une interface fluide et responsive. Backend en Node.js avec Express et MongoDB, rendu côté serveur via EJS.",
    image: "https://media-hosting.imagekit.io//2b42f15a66b54f3d/kovoitGOO.png?Expires=1837376169&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XkdV8ggs2ZYv0tjL-1IXD29BZSjp8u91a0reyG0acdRhivm6aag4HWHaBYwox1UfJOWPrjhp21FsE~T~zT2v8YGwW2BV-dtb~NUTj42FDWnTOqJJgwXhYDzuff34pCCKiV47RebPBsDYRXekHZoOgF57vXXG8cuWbFteZWhGldrBB9Ac5kvbgB-BZDgjH9GsjrTSIoNRI7Txd7z8DM0SwMvclOFgA4BR7o9dq4fgUCUxMoBzujQvVO0piZVCxzxGfiz1ztLw~2n-1H6m~-S-6NQqP1xR85X9DTx5cxkY0hS8XfuVkNzjgL50esG8u1YmlwxgX~LbWHg8n6j382fwZQ__",
    technologies: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/LulDrako/CovoiturageNode",
    demo: "https://covoituragenode-production.up.railway.app/",
  },
  {
    title: "Fils Rouge PHP - Hackathon EFREI",
    description:
      "Application web réalisée en équipe lors d’un hackathon. Authentification, opérations CRUD et gestion des utilisateurs avec PHP et PostgreSQL. Interface claire et sécurisée.",
    image: "https://media-hosting.imagekit.io//5e2c17d6617f4ab8/myfigrine.png?Expires=1837375285&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=A~z2qLFfQw3pvU6ekeFzF051nlKb6~bdD3zPdxmW2bojluBvTK~kE~oHuuhx~OMU4WS2hLVW7U1Ti5rR03PKp~KJjdrhhU-w414zMlS9ys8rAfi~QBBH0Js191j56hinIS2RTBUx-zM2Zx7IPmyTInUr7Ipi854qGpjHS-zNHoVweMd6SHW8z~z3mAhlk5bN9E616cM1w100YvW-sLSBSJXLHCny5BUTh-7JQJ4NHvSRN9zL7o~Ql5B-CqQjeBLCoA7~zGcdnLoY9utuSVJkKodbDfdSSTmnqRWG2zpAKTuGohUOSLAHOw7DnvsZ0rlW4YXR3ajjxjFNK-Onx7kCIw__",
    technologies: ["PHP", "PostgreSQL", "JavaScript"],
    github: "https://github.com/LulDrako/PHP-Fils-Rouge-Hackton",
    demo: "https://karim-feki.infinityfreeapp.com/", // si t’as un lien, ajoute-le ici
  },
  {
    title: "Weather Dashboard",
    description:
      "Application météo avec visualisations de données avancées. Affiche les prévisions sur 7 jours avec graphiques interactifs.",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "Chart.js", "OpenWeather API", "Styled Components"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];
