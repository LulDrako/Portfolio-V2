"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "Stage - Développeur Frontend",
    company: "TechAero",
    location: "Paris",
    date: "Juin 2024 - Août 2024",
    description:
      "Développement d'interfaces utilisateur réactives avec React et TypeScript. Collaboration avec l'équipe de design pour implémenter des maquettes fidèles.",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: "Formation Développement Web",
    company: "École 42",
    location: "Paris",
    date: "2023 - Présent",
    description:
      "Formation intensive en développement web et programmation. Projets pratiques en équipe et individuels. Apprentissage de diverses technologies web modernes.",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    title: "Projet Freelance",
    company: "Client E-commerce",
    location: "Remote",
    date: "Janvier 2023 - Mars 2023",
    description:
      "Développement d'une boutique en ligne avec Next.js et Stripe. Implémentation de fonctionnalités de panier et de paiement sécurisé.",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: "Baccalauréat Scientifique",
    company: "Lycée International",
    location: "Toulouse",
    date: "2022",
    description:
      "Obtention du baccalauréat scientifique avec mention très bien. Spécialisation en mathématiques et sciences de l'ingénieur.",
    icon: <GraduationCap className="h-6 w-6" />,
  },
];

export default function ExperienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experiences" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">Expériences</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mon parcours professionnel et académique, représenté sous forme de plan de vol.
          </p>
        </motion.div>

        <div ref={targetRef} className="max-w-3xl mx-auto relative flight-path">
          <motion.div
            style={{ height: "100%", scaleY: pathLength }}
            className="absolute left-1/2 top-0 w-0.5 bg-primary origin-top -translate-x-1/2"
          ></motion.div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`mb-12 flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } waypoint`}
            >
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"
                }`}
              >
                <div
                  className={`bg-secondary p-6 rounded-lg shadow-lg takeoff-card ${
                    index % 2 === 0 ? "ml-auto" : "mr-auto"
                  }`}
                  style={{ maxWidth: "90%" }}
                >
                  <div className="flex items-center mb-2 text-primary">
                    {experience.icon}
                    <h3 className="text-xl font-semibold ml-2">{experience.title}</h3>
                  </div>
                  <h4 className="text-lg font-medium mb-1">{experience.company}</h4>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-3">{experience.date}</span>
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{experience.location}</span>
                  </div>
                  <p className="text-muted-foreground">{experience.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}