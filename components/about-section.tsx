"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiMongodb, SiGraphql, SiPhp, SiPostgresql} from "react-icons/si";

const technologies = [
  { name: "React", icon: <FaReact size={48} className="text-[#61DAFB]" /> },
  { name: "PHP", icon: <SiPhp size={48} className="text-[#777BB4]" /> },
  { name: "Node.js", icon: <FaNodeJs size={48} className="text-[#339933]" /> },
  { name: "TypeScript", icon: <SiTypescript size={48} className="text-[#3178C6]" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={48} className="text-[#06B6D4]" /> },
  { name: "MongoDB", icon: <SiMongodb size={48} className="text-[#47A248]" /> },
  { name: "GraphQL", icon: <SiGraphql size={48} className="text-[#DE33A6]" /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={48} className="text-[#336791]" /> },
];

export default function AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">À propos</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Qui suis-je?</h3>
            <p className="text-muted-foreground mb-4">
            Étudiant en développement web, j&apos;aime apprendre et explorer différentes technologies pour créer des applications modernes et efficaces. Mon parcours m&apos;a permis de développer des compétences solides dans ce domaine.
            </p>
            <p className="text-muted-foreground mb-4">
            Inspiré par l&apos;aéronautique, j&apos;apprécie la rigueur et la précision dans mon travail. Je cherche toujours à m&apos;améliorer et à découvrir de nouvelles approches techniques.
            </p>
            <p className="text-muted-foreground">
              Actuellement à la recherche d&apos;une alternance en développement web pour septembre 2025, je suis prêt à relever de nouveaux défis et à contribuer à des projets ambitieux.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={item}
                className="flex flex-col items-center"
              >
                <div className="mb-2 transform transition-transform hover:scale-110">
                  {tech.icon}
                </div>
                <span className="text-sm text-muted-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}