/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { database } from './data';
import { Artigo } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsGrid from './components/NewsGrid';
import ArticleModal from './components/ArticleModal';
import Footer from './components/Footer';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Artigo | null>(null);

  // Split database: Hero is index 0, rest are index 1 to 9
  const heroArticle = database.artigos[0];
  const gridArticles = database.artigos.slice(1);

  return (
    <div className="min-h-screen bg-editorial-light text-black flex flex-col font-body-text selection:bg-brand-orange selection:text-white">

      {/* HEADER SECTION */}
      <Header />

      {/* MAIN LAYOUT WRAPPER */}
      <main className="flex-grow">

        {/* HERO SECTION DESTAQUE (Index 0) */}
        <Hero 
          artigo={heroArticle} 
          onSelect={() => setSelectedArticle(heroArticle)} 
        />

        {/* NEWS GRID SECTION (Index 1-9) */}
        <NewsGrid 
          artigos={gridArticles} 
          onSelectArticle={(artigo) => setSelectedArticle(artigo)} 
        />

      </main>

      {/* THE FOOTER */}
      <Footer />

      {/* DETAILED ARTICLE MODAL VIEWER */}
      <ArticleModal 
        artigo={selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
      />

    </div>
  );
}
