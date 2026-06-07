import React, { useState } from 'react';
import { Newspaper, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  const handleSubmitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    
    // Trigger toast notification
    setShowStatus(true);
    setEmail('');
    
    setTimeout(() => {
      setShowStatus(false);
    }, 4500);
  };

  return (
    <footer className="w-full flex flex-col bg-editorial-light text-black border-t border-gray-300">
      
      {/* NEWSLETTER INTERACTIVE SECTION */}
      <section id="newsletter" className="bg-[#EAEAEA] py-12 px-6 text-black border-b border-gray-300">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand-orange font-sans font-bold text-xs uppercase tracking-widest block mb-2">
            NEWSLETTER SEMANAL
          </span>
          <h3 className="font-headline font-bold text-3.5xl mb-4 text-[#121212]">
            Inscreva-se na nossa Gazeta Digital
          </h3>
          <p className="text-gray-700 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Receba as principais análises de inteligência artificial, tendências globais do mercado de desenvolvimento web e descobertas da ciência diretamente na sua caixa de entrada.
          </p>
          
          <form onSubmit={handleSubmitNewsletter} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu melhor e-mail" 
              className="bg-white border border-gray-300 text-black placeholder-gray-500 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange flex-grow transition-all"
            />
            <button 
              type="submit" 
              className="bg-editorial-dark hover:bg-brand-orange text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-none transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 active:scale-95"
            >
              Garantir Acesso <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER GENERAL ROOT */}
      <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left side logo and subtitle */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-editorial-dark text-white px-2 py-0.5 rounded-none font-headline font-bold text-sm">
              GN
            </span>
            <span className="font-headline font-bold tracking-tight text-xl text-[#121212]">
              GAZETA NOTÍCIA
            </span>
          </div>
          <p className="text-xs text-gray-500 font-sans mt-3">
            © 2026 Gazeta Notícia Inc. Todos os direitos reservados.
          </p>
        </div>

        {/* Center navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600 font-sans">
          <a href="#hero" className="hover:text-brand-orange transition-colors">Destaque</a>
          <a href="#grid" className="hover:text-brand-orange transition-colors">Mais Notícias</a>
          <a href="#newsletter" className="hover:text-brand-orange transition-colors">Inscrição</a>
          <a href="https://gnews.io" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">Agências de Notícias</a>
        </div>

        {/* Right side with deployment status / github page info */}
        <div className="text-center md:text-right text-xs text-gray-500 font-sans">
          <p>Pronto para ser hospedado no <strong className="text-black font-semibold">GitHub Pages</strong></p>
          <p className="text-[10px] mt-1 text-gray-400">Edição Especial AI Studio</p>
        </div>

      </div>

      {/* FLOAT ANIMATED NOTIFICATION (TOAST) */}
      {showStatus && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-editorial-dark border-l-4 border-brand-orange text-white px-5 py-4 rounded-none shadow-2xl flex items-start gap-3 max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm font-sans mb-0.5 text-white">Inscrição Confirmada!</h4>
              <p className="text-xs text-gray-300">Seu e-mail está agora registrado na nossa base de leitores.</p>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
