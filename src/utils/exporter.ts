import { database } from "../data";

export function generateStaticHtml(): string {
  const jsonString = JSON.stringify(database, null, 2);
  
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal de Notícias - O Seu Jornal Diário</title>
  
  <!-- Tailwind CSS Play CDN for instantaneous styling and responsive fidelity -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Lucide Icons for premium visual language -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            editorialLight: '#EFEFEF',
            editorialDark: '#121212',
            brandOrange: '#FF6B00'
          },
          fontFamily: {
            headline: ['Times New Roman', 'Cheltenham', 'Franklin Gothic', 'serif'],
            bodyText: ['Minion Pro', 'Imperial', 'Georgia', 'serif']
          }
        }
      }
    }
  </script>

  <style>
    /* Custom font family sets with safety fallbacks */
    .font-headline {
      font-family: 'Times New Roman', 'Cheltenham', 'Franklin Gothic', serif;
    }
    .font-body-text {
      font-family: 'Minion Pro', 'Imperial', 'Georgia', serif;
    }
    
    html, body {
      background-color: #EFEFEF;
      color: #000000;
      font-family: 'Minion Pro', 'Imperial', 'Georgia', serif;
    }

    /* custom transitions and active selections */
    ::selection {
      background-color: #FF6B00;
      color: #FFFFFF;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #121212;
    }
    ::-webkit-scrollbar-thumb {
      background: #FF6B00;
      border-radius: 0px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #E05E00;
    }

    /* Modal Animation */
    .modal-backdrop {
      background-color: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(4px);
      transition: opacity 0.3s ease;
    }
  </style>
</head>
<body class="bg-editorialLight min-h-screen flex flex-col font-body-text">

  <!-- HEADER -->
  <header class="bg-[#EFEFEF] border-b border-gray-300 py-4 px-6 md:px-12 sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Left: Brand / Logo -->
      <a href="#" class="flex items-center gap-3 group">
        <span class="bg-[#FF6B00] text-white p-2 rounded-none font-headline font-bold text-xl tracking-tighter transition-all duration-300 group-hover:bg-[#121212]">
          GT
        </span>
        <div class="flex flex-col">
          <h1 class="font-headline font-bold text-2xl md:text-3xl tracking-tight text-black leading-none">
            GAZETA TECH
          </h1>
          <span class="text-xs uppercase tracking-widest text-gray-500 font-sans mt-0.5">Imprensa Livre de Inovação</span>
        </div>
      </a>

      <!-- Center: Date Display -->
      <div class="hidden lg:flex items-center gap-2 text-xs uppercase font-sans text-gray-600 border-l border-r border-gray-300 px-6 py-1">
        <i data-lucide="calendar" class="w-4 h-4 text-[#FF6B00]"></i>
        <span id="current-date-node">Setembro, 2026</span>
      </div>

      <!-- Right: Responsive Navigation Menu -->
      <nav class="flex flex-wrap items-center justify-center gap-6 text-sm font-sans font-medium text-black">
        <a href="#hero" class="transition-colors hover:text-[#FF6B00]">Destaque</a>
        <a href="#grid" class="transition-colors hover:text-[#FF6B00]">Mais Notícias</a>
        <a href="https://gnews.io" target="_blank" class="transition-colors hover:text-[#FF6B00]">Parceiros</a>
        <a href="#newsletter" class="bg-[#121212] text-white px-4 py-2 rounded-none text-xs uppercase tracking-wider transition-all hover:bg-[#FF6B00]">Assinar</a>
      </nav>

    </div>
  </header>

  <!-- SECONDARY TOP TAPE INFO -->
  <div class="bg-[#121212] text-white py-2 px-6">
    <div class="max-w-7xl mx-auto flex justify-between items-center text-xs font-sans">
      <div class="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
        <span class="bg-[#FF6B00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-none uppercase tracking-wider animate-pulse flex-shrink-0">Destaque</span>
        <span class="text-gray-300 overflow-hidden text-ellipsis">Avanço da Inteligência Artificial revoluciona o mercado de desenvolvimento web</span>
      </div>
      <div class="hidden md:block text-gray-400">
        Edição #1,462 • 100% Digital e Aberta
      </div>
    </div>
  </div>

  <main class="flex-grow">
    
    <!-- HERO SECTION (MANCHETE PRINCIPAL) -->
    <section id="hero" class="bg-[#121212] py-8 md:py-16 px-6 md:px-12 text-white border-b-4 border-[#FF6B00] transition-colors duration-300">
      <div class="max-w-7xl mx-auto" id="hero-content">
        <!-- Rendered Dynamically via JS -->
      </div>
    </section>

    <!-- MIDDLE DIVIDER & GRID TITLE -->
    <div class="bg-[#EFEFEF] py-6 px-6 md:px-12 border-b border-gray-300">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="font-headline font-bold text-2xl md:text-3xl text-black">ÚLTIMAS PUBLICAÇÕES</h2>
          <p class="text-xs text-gray-600 font-sans mt-1">Cobertura jornalística independente atualizada em tempo real.</p>
        </div>
        <div class="flex gap-2">
          <input type="text" id="search-input" placeholder="Buscar notícias..." class="bg-white border border-gray-300 text-black placeholder-gray-500 rounded-none px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]">
          <button onclick="filterNews()" class="bg-[#121212] hover:bg-[#FF6B00] text-white px-4 py-1.5 rounded-none text-sm transition-colors font-sans">Ok</button>
        </div>
      </div>
    </div>

    <!-- GRID DE NOTÍCIAS -->
    <section id="grid" class="bg-[#121212] py-12 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <div id="news-grid-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 bg-zinc-800 border-t border-l border-zinc-800">
          <!-- Rendered Dynamically via JS -->
        </div>
        
        <!-- Empty query status -->
        <div id="empty-state" class="hidden text-center py-16 text-gray-400">
          <i data-lucide="newspaper" class="w-12 h-12 text-[#FF6B00] mx-auto mb-4 opacity-50"></i>
          <h3 class="font-headline text-xl font-bold mb-2 text-white">Nenhuma notícia encontrada</h3>
          <p class="text-sm">Tente redefinir seu termo de busca para encontrar publicações.</p>
          <button onclick="resetSearch()" class="mt-4 inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-none text-xs uppercase tracking-wider font-sans hover:bg-white hover:text-black transition-colors">
            Mostrar Tudo
          </button>
        </div>
      </div>
    </section>

    <!-- INTERACTIVE NEWSLETTER FORM -->
    <section id="newsletter" class="bg-[#EFEFEF] border-t border-b border-gray-300 py-12 px-6 text-black">
      <div class="max-w-3xl mx-auto text-center">
        <span class="text-[#FF6B00] font-sans font-bold text-xs uppercase tracking-widest block mb-2">NEWSLETTER SEMANAL</span>
        <h3 class="font-headline font-bold text-3xl mb-4">Inscreva-se na nossa Gazeta Digital</h3>
        <p class="text-gray-700 text-sm mb-6 max-w-lg mx-auto">Receba as principais análises de inteligência artificial, tendências globais do mercado de desenvolvimento web e descobertas da ciência diretamente na sua caixa de entrada.</p>
        <form onsubmit="handleNewsletter(event)" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input type="email" required placeholder="Digite seu melhor e-mail" class="bg-white border border-gray-300 text-black placeholder-gray-500 rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] flex-grow">
          <button type="submit" class="bg-[#121212] hover:bg-[#FF6B00] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-none transition-colors whitespace-nowrap">
            Garantir Acesso
          </button>
        </form>
      </div>
    </section>

  </main>

  <!-- FOOTER -->
  <footer class="bg-[#EFEFEF] text-black border-t border-gray-300 py-12 px-6 md:px-12">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      
      <!-- Left side logo -->
      <div class="flex flex-col items-center md:items-start">
        <div class="flex items-center gap-2">
          <span class="bg-[#121212] text-white px-1.5 py-0.5 rounded-none font-headline font-bold text-sm">GT</span>
          <span class="font-headline font-bold tracking-tight text-xl">GAZETA TECH</span>
        </div>
        <p class="text-xs text-gray-500 font-sans mt-2 text-center md:text-left">
          © 2026 Gazeta Tech Inc. Todos os direitos reservados.
        </p>
      </div>

      <!-- Center navigation -->
      <div class="flex flex-wrap justify-center gap-6 text-xs text-gray-600 font-sans">
        <a href="#hero" class="hover:text-[#FF6B00] transition-colors">Destaque</a>
        <a href="#grid" class="hover:text-[#FF6B00] transition-colors">Termos de Uso</a>
        <a href="#grid" class="hover:text-[#FF6B00] transition-colors">Privacidade</a>
        <a href="https://gnews.io" target="_blank" class="hover:text-[#FF6B00] transition-colors">Agências de Notícias</a>
      </div>

      <!-- Right custom signature -->
      <div class="text-center md:text-right text-xs text-gray-500 font-sans">
        <p>Pronto para ser hospedado no <strong class="text-black font-semibold">GitHub Pages</strong></p>
        <p class="text-[10px] mt-1 text-gray-400">Edição Especial AI Studio</p>
      </div>

    </div>
  </footer>

  <!-- NOTIFICATION CONTAINER -->
  <div id="toast-container" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <!-- ARTICLE LIGHTBOX MODAL -->
  <div id="news-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/90 backdrop-blur-md" onclick="closeModal()"></div>
    
    <!-- Modal Box -->
    <div class="bg-[#EFEFEF] text-black rounded-none w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
      <!-- Close button overlay on image -->
      <button onclick="closeModal()" class="absolute top-4 right-4 bg-[#121212] hover:bg-[#FF6B00] text-white p-2 rounded-none transition-colors z-20 shadow">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="overflow-y-auto" id="modal-content-area">
        <!-- Dynamically injected modal content -->
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT PROGRAMMABLE LAYER (DATABASE & DYNAMIC RENDER) -->
  <script>
    // BASE DE DADOS DO SITE (JSON EXATO FORNECIDO PELO USUÁRIO)
    const database = ${jsonString};

    // Current Date formatter helper
    function setupDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const today = new Date();
      const formatted = today.toLocaleDateString('pt-BR', options);
      // Capitalize first letter
      const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);
      document.getElementById('current-date-node').innerText = capitalized;
    }

    // Dynamic renderer functions
    function renderApp() {
      const artigos = database.artigos;
      if (!artigos || artigos.length === 0) return;

      // 1. Render HERO (index 0)
      renderHero(artigos[0]);

      // 2. Render GRID (index 1 do 9)
      renderGrid(artigos.slice(1));

      // Re-initialize icons
      lucide.createIcons();
    }

    function renderHero(heroArticle) {
      const container = document.getElementById('hero-content');
      if (!container) return;

      const dateStr = new Date(heroArticle.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      container.innerHTML = \`
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Text Core Column -->
          <div class="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            <div class="flex flex-wrap items-center gap-3 mb-6">
              <span class="bg-[#FF6B00] text-white text-xs font-bold font-sans tracking-widest uppercase px-3 py-1 rounded-none">
                \${heroArticle.source.name}
              </span>
              <span class="text-gray-400 font-sans text-xs flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5"></i> \${dateStr}
              </span>
            </div>
            
            <h2 class="font-headline font-bold text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight hover:text-[#FF6B00] transition-colors cursor-pointer mb-6" onclick="openArticleModal(0)">
              \${heroArticle.title}
            </h2>
            
            <p class="font-body-text text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
              \${heroArticle.description}
            </p>
            
            <div class="flex flex-wrap gap-4">
              <button onclick="openArticleModal(0)" class="bg-[#FF6B00] hover:bg-white hover:text-[#121212] text-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-none transition-all flex items-center gap-2">
                Ler Mais <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </button>
              <a href="\${heroArticle.url}" target="_blank" class="border border-gray-600 hover:border-[#FF6B00] hover:text-[#FF6B00] text-white font-sans font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-none transition-colors flex items-center gap-1.5">
                Abrir Fonte original <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>

          <!-- Highlight Image Column -->
          <div class="lg:col-span-5 order-1 lg:order-2 group cursor-pointer overflow-hidden rounded-none shadow-2xl relative border-2 border-zinc-800" onclick="openArticleModal(0)">
            <img 
              referrerpolicy="no-referrer" 
              src="\${heroArticle.image}" 
              alt="\${heroArticle.title}" 
              class="w-full h-[300px] md:h-[400px] object-cover filter brightness-90 transition-transform duration-700 group-hover:scale-105 group-hover:brightness-100"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
      \`;
    }

    function renderGrid(artigos) {
      const container = document.getElementById('news-grid-container');
      const emptyState = document.getElementById('empty-state');
      if (!container) return;

      container.innerHTML = '';

      if (artigos.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
      }

      container.classList.remove('hidden');
      emptyState.classList.add('hidden');

      artigos.forEach((artigo) => {
        // Encontra o index global correto para o modal
        const globalIndex = database.artigos.findIndex(a => a.title === artigo.title);

        const dateStr = new Date(artigo.publishedAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        const card = document.createElement('div');
        card.className = "bg-[#121212] overflow-hidden border-b border-r border-zinc-800 flex flex-col group hover:border-[#FF6B00] transition-all duration-300 min-h-[460px]";
        card.innerHTML = \`
          <!-- Image -->
          <div class="relative overflow-hidden cursor-pointer h-52 flex-shrink-0" onclick="openArticleModal(\${globalIndex})">
            <img 
              referrerpolicy="no-referrer" 
              src="\${artigo.image}" 
              alt="\${artigo.title}" 
              class="w-full h-full object-cover filter brightness-90 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100"
            />
            <!-- Badge -->
            <span class="absolute bottom-3 left-3 bg-[#FF6B00] text-white text-[10px] uppercase tracking-wider font-bold font-sans px-2.5 py-1 rounded-none">
              \${artigo.source.name}
            </span>
          </div>

          <!-- Content body -->
          <div class="p-6 flex flex-col flex-grow">
            <!-- Metadata line -->
            <span class="text-gray-500 font-sans text-xs mb-3 flex items-center gap-1">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-[#FF6B00]"></i> \${dateStr}
            </span>

            <!-- Title -->
            <h3 onclick="openArticleModal(\${globalIndex})" class="font-headline font-semibold text-lg md:text-xl text-white tracking-tight mb-3 hover:text-[#FF6B00] transition-colors cursor-pointer leading-snug flex-grow">
              \${artigo.title}
            </h3>

            <!-- Description -->
            <p class="font-body-text text-sm text-gray-400 mb-6 leading-relaxed line-clamp-3">
              \${artigo.description}
            </p>

            <!-- Bottom action buttons -->
            <div class="mt-auto pt-4 border-t border-zinc-950 flex justify-between items-center text-xs font-sans">
              <button onclick="openArticleModal(\${globalIndex})" class="text-[#FF6B00] hover:text-white font-bold flex items-center gap-1 transition-colors">
                LER ANÁLISE <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
              <a href="\${artigo.url}" target="_blank" class="text-gray-400 hover:text-white transition-colors flex items-center gap-0.5">
                gnews.io <i data-lucide="arrow-up-right" class="w-3 select-none"></i>
              </a>
            </div>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    // Modal Operations
    function openArticleModal(index) {
      const artigo = database.artigos[index];
      if (!artigo) return;

      const area = document.getElementById('modal-content-area');
      const modal = document.getElementById('news-modal');

      const fullContent = artigo.content || 
        artigo.description + " Além disso, especialistas apontam que novas políticas públicas em colaboração com consórcios internacionais devem acelerar os avanços tecnológicos e de ecossistemas nos próximos meses.";

      const dateStr = new Date(artigo.publishedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      area.innerHTML = \`
        <!-- Modal Top Photo Banner -->
        <div class="h-64 sm:h-80 w-full relative">
          <img referrerpolicy="no-referrer" src="\${artigo.image}" alt="\${artigo.title}" class="w-full h-full object-cover filter brightness-75">
          <div class="absolute inset-0 bg-gradient-to-t from-[#EFEFEF] via-[#EFEFEF]/45 to-transparent"></div>
          
          <div class="absolute bottom-4 left-6 right-6">
            <span class="bg-[#FF6B00] text-white px-2.5 py-1 rounded-none text-xs uppercase font-sans font-bold tracking-widest inline-block mb-2">
              \${artigo.source.name}
            </span>
          </div>
        </div>

        <!-- Article Content -->
        <div class="px-6 py-6 sm:px-8 text-black">
          <div class="text-xs text-gray-500 font-sans mb-4 flex items-center gap-1.5 border-b border-gray-300 pb-3">
            <i data-lucide="calendar" class="w-4 h-4 text-[#FF6B00]"></i> Publicado em \${dateStr}
          </div>

          <h2 class="font-headline font-bold text-2xl sm:text-3.5xl mb-4 leading-tight">
            \${artigo.title}
          </h2>

          <p class="font-body-text italic text-md text-gray-700 border-l-2 border-[#FF6B00] pl-4 py-1 mb-6 leading-relaxed">
            \${artigo.description}
          </p>

          <div class="font-body-text text-sm sm:text-base text-zinc-950 leading-relaxed space-y-4">
            <p>\${fullContent}</p>
            <p>O monitoramento contínuo destas novidades permanece ativo por novas agências especializadas de notícias. Esta reportagem segue em constante atualização conforme novos relatórios e comunicados de imprensa forem obtidos.</p>
          </div>

          <!-- Actions -->
          <div class="mt-8 pt-6 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center gap-4">
            <a href="\${artigo.url}" target="_blank" class="bg-[#121212] hover:bg-[#FF6B00] text-white font-sans text-xs uppercase tracking-wider font-bold px-6 py-3 rounded-none transition-colors inline-flex items-center gap-1.5 self-stretch sm:self-auto justify-center">
              Aceder Conteúdo Original <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
            <button onclick="closeModal()" class="text-gray-600 hover:text-black font-sans text-xs uppercase tracking-wider font-bold">
              Fechar Janela
            </button>
          </div>
        </div>
      \`;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }

    function closeModal() {
      const modal = document.getElementById('news-modal');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    // Action Helpers
    function filterNews() {
      const val = document.getElementById('search-input').value.toLowerCase().trim();
      if (!val) {
        // Se vazio, renderiza o grid completo
        renderGrid(database.artigos.slice(1));
        lucide.createIcons();
        return;
      }

      // Filtra nos artigos do grid (index 1 ao fim)
      const matching = database.artigos.slice(1).filter(artigo => {
        return artigo.title.toLowerCase().includes(val) || 
               artigo.description.toLowerCase().includes(val) || 
               artigo.source.name.toLowerCase().includes(val);
      });

      renderGrid(matching);
      lucide.createIcons();
    }

    // Interactive Newsletter toast alert
    function handleNewsletter(event) {
      event.preventDefault();
      const email = event.target.querySelector('input').value;
      event.target.reset();

      // Spawn toast alert inside container
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = "bg-[#121212] border-l-4 border-[#FF6B00] text-white px-5 py-4 rounded-none shadow-2xl pointer-events-auto flex items-start gap-3 transition-all duration-300 translate-y-4 opacity-0 max-w-sm";
      toast.innerHTML = \`
        <i data-lucide="check-circle-2" class="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5"></i>
        <div>
          <h4 class="font-bold text-sm font-sans mb-0.5">Inscrição Confirmada!</h4>
          <p class="text-xs text-gray-400">Sucesso em registrar o e-mail: \${email}</p>
        </div>
      \`;

      container.appendChild(toast);
      
      // Animate in
      setTimeout(() => {
        toast.className = toast.className.replace('translate-y-4 opacity-0', 'translate-y-0 opacity-100');
      }, 50);

      // Animate and remove out after 5 seconds
      setTimeout(() => {
        toast.className = toast.className.replace('translate-y-0 opacity-100', 'translate-y-4 opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 5000);

      lucide.createIcons();
    }

    // Init script on window load
    window.onload = () => {
      setupDate();
      renderApp();

      // Listen to search keyup trigger
      document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          filterNews();
        }
      });
    };
  </script>
</body>
</html>`;
}
