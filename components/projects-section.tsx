'use client';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import projectImages from '@/lib/projectImages';
import { projects as projectsData } from '@/lib/data';

type Project = {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
};

export default function ProjectsSection() {
  const t = useTranslations('Projects');

  // Récupère les descriptions depuis i18n
  const i18nProjects = t.raw('items') as { description: string }[];

  // Combine les données de data.ts (noms + liens + technologies) avec i18n (descriptions)
  const projects: Project[] = projectsData.map((project, index) => {
    const i18nProject = i18nProjects[index];
    return {
      title: project.title, // Nom depuis data.ts
      description: i18nProject?.description || '', // Description depuis i18n
      technologies: project.technologies, // Technologies depuis data.ts
      github: project.github,
      demo: project.demo,
    };
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">{t('heading')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary rounded-lg overflow-hidden shadow-lg takeoff-card h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={projectImages[index]}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  quality={95}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-background text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex justify-between">
                  {project.github && (
                    <Link
                      href={project.github}
                      className="text-primary flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 mr-1" /> {t('code')}
                    </Link>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      className="text-primary flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-5 w-5 mr-1" /> {t('demo')}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
