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
      "Application web réalisée en équipe lors d’un hackathon. Authentification, opérations CRUD et gestion des utilisateurs avec PHP et PostgreSQL. Ce projet a été conçu dans des délais courts, avec une forte collaboration entre les membres de l’équipe.",
    image: "https://media-hosting.imagekit.io//5e2c17d6617f4ab8/myfigrine.png?Expires=1837375285&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=A~z2qLFfQw3pvU6ekeFzF051nlKb6~bdD3zPdxmW2bojluBvTK~kE~oHuuhx~OMU4WS2hLVW7U1Ti5rR03PKp~KJjdrhhU-w414zMlS9ys8rAfi~QBBH0Js191j56hinIS2RTBUx-zM2Zx7IPmyTInUr7Ipi854qGpjHS-zNHoVweMd6SHW8z~z3mAhlk5bN9E616cM1w100YvW-sLSBSJXLHCny5BUTh-7JQJ4NHvSRN9zL7o~Ql5B-CqQjeBLCoA7~zGcdnLoY9utuSVJkKodbDfdSSTmnqRWG2zpAKTuGohUOSLAHOw7DnvsZ0rlW4YXR3ajjxjFNK-Onx7kCIw__",
    technologies: ["PHP", "PostgreSQL", "JavaScript", "HTML/CSS"],
    github: "https://github.com/LulDrako/PHP-Fils-Rouge-Hackton",
    demo: "https://karim-feki.infinityfreeapp.com/", // si t’as un lien, ajoute-le ici
  },
  {
    title: "O.C.A Voitures",
    description:
      "Plateforme e-commerce développée avec Symfony pour la vente et la location de voitures. Gestion des utilisateurs, panier, paiements, historique des transactions et authentification sécurisée. Le site propose une interface claire pour la navigation.",
    image: "https://media-hosting.imagekit.io/57d9bec406ad4d0c/Capture%20d'%C3%A9cran%202025-03-27%20010547.png?Expires=1837642017&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=ycbAcnL6Fv4hsclvw6hzZQX7qebLpSSt4iMq0wt19oJCNMwLVldh16IFC0AjmhL4FlmY6VikkDuiw05OfmZW9jNjVQugpO9lkWBqCz3Mvmd4S~p84e-pRx5Qqtg9d9z3~ABgH~LmoCpxC4KYDZG-OLBhTWr6UDgJ4VR~jUoDqC1DCNCe044rIufiLkJfWiRAGbyqWeMzZfPEIXQag~I7gVTfv5SqiBLC5Hq1TCNai2k2dNoIt60UfoS3hGhaLwWFZGMlRcNzr5EF8rYIppHjZyQT8-I8klFahxPuXlz5~47f3rBcd-FkwbqMW7~VucWZ56aXo2mTEW1HuwS6fim8hA__",
    technologies: ["Symfony", "PostgreSQL", "JWT", "Twig"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];
