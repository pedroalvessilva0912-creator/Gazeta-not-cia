import React, { useState } from 'react';
import { Newspaper, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatusMessage(data.message || 'Inscrição Confirmada!');
        setEmail('');
      } else {
        setStatusMessage(data.error || 'Ocorreu um erro.');
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('Ocorreu um erro de rede. Tente novamente.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
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
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-editorial-dark hover:bg-brand-orange text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-none transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Garantir Acesso'} {!isSubmitting && <Send className="w-3.5 h-3.5" />}
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

        {/* Right side with deployment status / github page info */}
        <div className="text-center md:text-right text-xs text-gray-500 font-sans">
          <p className="text-[10px] mt-1 text-gray-400">Edição Especial AI Studio</p>
        </div>

      </div>

      {/* FLOAT ANIMATED NOTIFICATION (TOAST) */}
      {statusMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-editorial-dark border-l-4 border-brand-orange text-white px-5 py-4 rounded-none shadow-2xl flex items-start gap-3 max-w-sm">
            <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm font-sans mb-0.5 text-white">Mensagem</h4>
              <p className="text-xs text-gray-300">{statusMessage}</p>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}
