import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 relative overflow-hidden">
      {/* Premium Purple Shine */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#3b0b73] blur-[120px] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col text-zinc-500 text-xs font-medium text-center md:text-left">
          <span className="text-white font-bold">© 2026 Upclude</span>
          <span className="opacity-80 text-white">All rights reserved.</span>
        </div>
          
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/company/upclude"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#ff3b1f] transition-all transform hover:scale-110"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}