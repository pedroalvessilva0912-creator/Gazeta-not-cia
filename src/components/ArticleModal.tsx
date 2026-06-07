import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { Artigo } from '../types';

interface ArticleModalProps {
  artigo: Artigo | null;
  onClose: () => void;
}

export default function ArticleModal({ artigo, onClose }: ArticleModalProps) {
  useEffect(() => {
    if (artigo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [artigo]);

  if (!artigo) return null;

  const publishedDate = new Date(artigo.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const fullContent = artigo.content || 
    `${artigo.description} Além do exposto, analistas do setor de inteligência artificial e economia apontam que novas parcerias no mercado de desenvolvimento web devem fomentar ecossistemas digitais ainda mais autônomos. Esta reportagem segue em andamento e será atualizada em tempo real conforme novos dados oficiais forem divulgados pelos comitês de inovação e agências de imprensa multilaterais.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className="bg-editorial-light text-black rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
        
        {/* Absolute Close Action button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-editorial-dark hover:bg-brand-orange text-white p-2.5 rounded-none transition-colors z-20 shadow cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Header Image Banner */}
          <div className="h-60 sm:h-80 w-full relative">
            <img 
              referrerPolicy="no-referrer"
              src={artigo.image} 
              alt={artigo.title} 
              className="w-full h-full object-cover filter brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-editorial-light via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-6 right-6">
              <span className="bg-brand-orange text-white px-3 py-1 rounded-none text-xs uppercase font-sans font-bold tracking-widest inline-block shadow">
                {artigo.source.name}
              </span>
            </div>
          </div>

          {/* Core Text Info */}
          <div className="px-6 py-6 sm:px-10">
            
            {/* Metadata line */}
            <div className="text-xs text-gray-500 font-sans mb-4 flex items-center gap-1.5 border-b border-gray-300 pb-3">
              <Calendar className="w-4 h-4 text-brand-orange" /> Publicado em {publishedDate}
            </div>

            {/* News Big Title */}
            <h2 className="font-headline font-bold text-2.5xl sm:text-3.5xl mb-4 text-black leading-tight">
              {artigo.title}
            </h2>

            {/* Highlighted Lead */}
            <p className="font-body-text italic text-md text-gray-700 border-l-3 border-brand-orange pl-4 py-1.5 mb-6 leading-relaxed bg-[#E8E8E8] pr-2 rounded-none">
              {artigo.description}
            </p>

            {/* Full Body Text content */}
            <div className="font-body-text text-sm sm:text-base text-zinc-950 leading-relaxed space-y-4">
              <p>{fullContent}</p>
              <p>
                Os impactos e a evolução contínua destas tendências e notícias são acompanhados de perto por especialistas do setor. Novos informes estarão disponíveis assim que houver atualizações relevantes.
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-gray-300 flex flex-col sm:flex-row justify-end items-center gap-4">
              <button 
                onClick={onClose}
                className="bg-editorial-dark hover:bg-brand-orange text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-2.5 rounded-none transition-colors self-stretch sm:self-auto text-center cursor-pointer"
              >
                Voltar ao Portal
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
