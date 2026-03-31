'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar';
const HeroSection = dynamic(() => import('@/components/hero-section'));
const AboutSection = dynamic(() => import('@/components/about-section'));
const ParcoursSection = dynamic(() => import('@/components/parcours-section'));
const ProjectsSection = dynamic(() => import('@/components/projects-section'));
// import AlternanceSection from '@/components/alternance-section'; // Masqué temporairement
const ContactSection = dynamic(() => import('@/components/contact-section'));
const Footer = dynamic(() => import('@/components/footer'));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ParcoursSection />
      <ProjectsSection />
      {/* <AlternanceSection /> */}
      <ContactSection />
      <Footer />
    </main>
  );
}
