import { Facebook, Youtube, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 relative overflow-hidden">
      {/* Premium Purple Shine */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-[#3b0b73] blur-[120px] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-500 text-xs font-medium text-center md:text-left">
            <span className="text-white font-bold block md:inline mr-2">© 2026 Upclude</span>
            <span className="opacity-80 text-white">All rights reserved.</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-white hover:text-[#ff3b1f] transition-all transform hover:scale-110">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-white hover:text-[#ff3b1f] transition-all transform hover:scale-110">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-[#ff3b1f] transition-all transform hover:scale-110">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="text-white hover:text-[#ff3b1f] transition-all transform hover:scale-110">
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
