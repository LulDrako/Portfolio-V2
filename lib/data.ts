// lib/data.ts
import { Briefcase, GraduationCap } from "lucide-react";
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
  { name: "React", icon: "FaReact", color: "#61DAFB" },
  { name: "PHP", icon: "SiPhp", color: "#777BB4" },
  { name: "Node.js", icon: "FaNodeJs", color: "#339933" },
  { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "GraphQL", icon: "SiGraphql", color: "#DE33A6" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
];

export const experiences = [
  {
    title: "Stage - Développeur Frontend",
    company: "TechAero",
    location: "Paris",
    date: "Juin 2024 - Août 2024",
    description:
      "Développement d'interfaces utilisateur réactives avec React et TypeScript. Collaboration avec l'équipe de design pour implémenter des maquettes fidèles.",
    icon: "briefcase",
  },
  {
    title: "Formation Développement Web",
    company: "École 42",
    location: "Paris",
    date: "2023 - Présent",
    description:
      "Formation intensive en développement web et programmation. Projets pratiques en équipe et individuels.",
    icon: "graduation",
  },
  {
    title: "Projet Freelance",
    company: "Client E-commerce",
    location: "Remote",
    date: "Janvier 2023 - Mars 2023",
    description:
      "Développement d'une boutique en ligne avec Next.js et Stripe.",
    icon: "briefcase",
  },
  {
    title: "Baccalauréat Scientifique",
    company: "Lycée International",
    location: "Toulouse",
    date: "2022",
    description:
      "Obtention du baccalauréat scientifique avec mention très bien.",
    icon: "graduation",
  },
];