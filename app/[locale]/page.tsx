// app/[locale]/page.tsx
'use client';

export const dynamic = 'force-static'; // SSG pur (ISR possible)
import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import ParcoursSection from '@/components/parcours-section';
import ProjectsSection from '@/components/projects-section';
import AlternanceSection from '@/components/alternance-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ParcoursSection />
      <ProjectsSection />
      <AlternanceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
