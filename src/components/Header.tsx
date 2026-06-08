import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

export default function Header() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      
      const dateOptions: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const formattedDate = today.toLocaleDateString('pt-BR', dateOptions);
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formattedTime = today.toLocaleTimeString('pt-BR', timeOptions);
      
      setCurrentDate(`${capitalizedDate} • ${formattedTime}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="bg-editorial-light border-b border-gray-300 py-4 px-6 md:px-12 sticky top-0 z-40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo / Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="bg-brand-orange text-white p-2.5 rounded-none font-headline font-bold text-xl tracking-tighter transition-all duration-300 group-hover:bg-editorial-dark">
            GN
          </span>
          <div className="flex flex-col">
            <h1 className="font-headline font-bold text-2xl md:text-3.5xl tracking-tight text-black leading-none">
              GAZETA NOTÍCIA
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-sans mt-1">
              Imprensa Livre e Independente
            </span>
          </div>
        </a>

        {/* Date Display (Center) */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs uppercase font-sans text-gray-600 border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-gray-300 py-2 md:py-1 px-4 md:px-6">
          <Calendar className="w-4 h-4 text-brand-orange shrink-0" />
          <span className="font-semibold text-gray-800">{currentDate}</span>
        </div>

        {/* Right Menu */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-sans font-medium text-black">
          <a 
            href="#newsletter" 
            className="bg-editorial-dark text-white px-4 py-2 rounded-none text-xs uppercase tracking-wider transition-all hover:bg-brand-orange font-bold text-center"
          >
            Inscreva-se
          </a>
        </div>

      </div>
    </header>
  );
}
