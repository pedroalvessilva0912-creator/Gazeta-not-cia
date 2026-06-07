import React, { useState } from 'react';
import { Clock, ChevronRight, RotateCcw, Newspaper } from 'lucide-react';
import { Artigo } from '../types';

interface NewsGridProps {
  artigos: Artigo[];
  onSelectArticle: (artigo: Artigo) => void;
}

export default function NewsGrid({ artigos, onSelectArticle }: NewsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering based on search query over multiple attributes
  const filteredArtigos = artigos.filter((artigo) => {
    return (
      artigo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artigo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artigo.source.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <>
      {/* FILTER & HEADER BAR */}
      <div className="bg-editorial-light py-6 px-6 md:px-12 border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="font-headline font-bold text-2xl md:text-3xl text-black">
              ÚLTIMAS PUBLICAÇÕES
            </h2>
            <p className="text-xs text-gray-600 font-sans mt-1 leading-none">
              Cobertura jornalística independente atualizada em tempo real.
            </p>
          </div>
        </div>
      </div>

      {/* RENDER GRID CARDS */}
      <section id="grid" className="bg-editorial-dark py-12 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto">
          {filteredArtigos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 bg-zinc-800 border-t border-l border-zinc-800">
              {filteredArtigos.map((artigo, idx) => {
                const pubDateStr = new Date(artigo.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });

                return (
                  <div 
                    key={idx}
                    className="bg-editorial-dark overflow-hidden border-b border-r border-zinc-800 flex flex-col group hover:border-brand-orange transition-all duration-300 min-h-[460px]"
                  >
                    {/* Card Photo overlay */}
                    <div 
                      onClick={() => onSelectArticle(artigo)}
                      className="relative overflow-hidden cursor-pointer h-52 flex-shrink-0"
                    >
                      <img 
                        referrerPolicy="no-referrer"
                        src={artigo.image} 
                        alt={artigo.title} 
                        className="w-full h-full object-cover filter brightness-90 transition-transform duration-550 group-hover:scale-105 group-hover:brightness-100"
                      />
                      <span className="absolute bottom-3 left-3 bg-brand-orange text-white text-[10px] uppercase tracking-wider font-bold font-sans px-2.5 py-1 rounded-none">
                        {artigo.source.name}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-gray-500 font-sans text-xs mb-3 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-brand-orange" /> {pubDateStr}
                      </span>

                      <h3 
                        onClick={() => onSelectArticle(artigo)}
                        className="font-headline font-semibold text-lg md:text-xl text-white tracking-tight mb-3 hover:text-brand-orange transition-colors cursor-pointer leading-snug flex-grow"
                      >
                        {artigo.title}
                      </h3>

                      <p className="font-body-text text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
                        {artigo.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-zinc-950 flex justify-between items-center text-xs font-sans">
                        <button 
                          type="button"
                          onClick={() => onSelectArticle(artigo)}
                          className="text-brand-orange hover:text-white font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          LER ANÁLISE <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Newspaper className="w-12 h-12 text-brand-orange mx-auto mb-4 opacity-50" />
              <h3 className="font-headline text-2xl font-bold mb-2 text-white">
                Nenhuma notícia encontrada
              </h3>
              <p className="text-sm">
                Tente redefinir seu termo de busca para encontrar as publicações.
              </p>
              <button 
                onClick={handleReset}
                className="mt-6 inline-flex items-center gap-2 bg-brand-orange hover:bg-white hover:text-editorial-dark text-white text-xs uppercase tracking-wider font-sans font-bold px-4 py-2.5 rounded-none transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Mostrar Tudo
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
