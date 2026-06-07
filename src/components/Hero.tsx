import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Artigo } from '../types';

interface HeroProps {
  artigo: Artigo;
  onSelect: () => void;
}

export default function Hero({ artigo, onSelect }: HeroProps) {
  const publishedDate = new Date(artigo.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <section id="hero" className="bg-editorial-dark py-8 md:py-16 px-6 md:px-12 text-white border-b-4 border-brand-orange transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Info Column */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-brand-orange text-white text-xs font-bold font-sans tracking-widest uppercase px-3 py-1 rounded-none">
                {artigo.source.name}
              </span>
            </div>
            
            <h2 
              onClick={onSelect}
              className="font-headline font-bold text-3.5xl md:text-5xl lg:text-5.5xl text-white tracking-tight leading-tight hover:text-brand-orange transition-colors cursor-pointer mb-6"
            >
              {artigo.title}
            </h2>
            
            <p className="font-body-text text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
              {artigo.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onSelect}
                className="bg-brand-orange hover:bg-white hover:text-editorial-dark text-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-none transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
              >
                Ler Mais <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Image Column */}
          <div 
            onClick={onSelect}
            className="lg:col-span-5 order-1 lg:order-2 group cursor-pointer overflow-hidden rounded-none shadow-2xl relative border-2 border-zinc-800"
          >
            <img 
              referrerPolicy="no-referrer"
              src={artigo.image} 
              alt={artigo.title} 
              className="w-full h-[280px] md:h-[400px] object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
