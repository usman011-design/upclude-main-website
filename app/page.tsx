import Navbar from '@/components/Navbar';
import TechnologySupport from '@/components/TechnologySupport';
import Achievements from '@/components/Achievements';
import ProjectCarousel from '@/components/ProductShowcase';
import { ContactSection } from '@/components/contactForm/ContactSection';
import Footer from '@/components/Footer';
import Image from 'next/image';
import HeroWithServices from '@/components/Hero';

export default function Home() {
  return (
    <div className="relative bg-gradient-to-r from-[#4F1079] via-[#1C0860] to-[#000000] text-white">

      {/* ── HERO + SERVICE CARDS — exactly 100vh ── */}
      <div className="relative">
        {/* Logo — absolute over the hero section */}
        <header className="absolute top-0 left-0 w-full px-16 py-8 flex justify-start z-20">
          <Image
            src="/main-logo.png"
            alt="Company Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </header>

        {/* HeroWithServices fills 100vh internally */}
        <HeroWithServices />
      </div>

      {/* ── REST OF PAGE ── */}
      <main className="flex flex-col items-center w-full">
        <div className="w-full"><TechnologySupport /></div>
        <div className="w-full"><Achievements /></div>
        <div className="w-full"><ProjectCarousel /></div>
        <div className="w-full"><ContactSection /></div>
        <div className="w-full"><Footer /></div>
      </main>

      {/* Fixed Navbar */}
      <Navbar />
    </div>
  );
}