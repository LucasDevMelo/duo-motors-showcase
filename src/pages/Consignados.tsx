import React, { useState, useEffect } from 'react';

// --- Dependências Simuladas ---

// Simulação do react-router-dom
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
const useLocation = () => ({ pathname: '/consignados' }); 

// Simulação dos ícones de lucide-react
const Menu = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const X = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Componente Header Integrado (Refatorado para Simplicidade) ---

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/catalogo", label: "Catálogo" },
    { to: "/contato", label: "Contato" },
    { to: "/sobre", label: "Sobre nós" },
    { to: "/consignados", label: "Consignados" },
    { to: "/venda", label: "Venda" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl font-bold">
              DUO <span className="text-lime-500">MOTORS</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${isActive(link.to) ? "text-lime-500 font-medium" : "text-gray-800 hover:text-lime-500"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <a 
              href="https://wa.me/556196081413" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Entrar em contato
            </a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>
      
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${isActive(link.to) ? "text-lime-500 font-medium" : "text-gray-800 hover:text-lime-500"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="https://wa.me/556196081413" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-lime-500 hover:bg-lime-600 mt-4 text-lg text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Entrar em contato
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

// --- Componentes Placeholder (Footer, WhatsAppButton) ---

const Footer = () => (
  <footer className="bg-gray-100 text-gray-600 text-sm">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
            <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold text-xs">DUO</span>
            </div>
            <span className="font-bold text-gray-800">DUO MOTORS</span>
        </div>
        
        <a href="https://www.instagram.com/_duomotors/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-lime-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>@_duomotors</span>
        </a>

        <p className="text-center md:text-left max-w-xs">
          C.A Samambaia Rua 01, St. Hab. Vicente Pires lote 01, Colônia Agrícola Samambaia-A, Brasília, - DF, 72002-495
        </p>
        
        <p>
          Telefone: +55 61 99608-1413
        </p>
      </div>
      
      <div className="border-t border-gray-300 mt-8 pt-6 text-center md:text-left">
        <p>&copy; 2025 Duo Motors. Todos os direitos reservados</p>
      </div>
    </div>
  </footer>
);

const WhatsAppButton = () => (
    <a 
        href="https://wa.me/556196081413" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50"
        aria-label="Fale conosco no WhatsApp"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.75 13.96c.25.13.41.2.46.3.05.1.03.48-.18.69a1.49 1.49 0 0 1-1.03.42 2.94 2.94 0 0 1-1.76-.64 8.29 8.29 0 0 1-2.9-2.91c-.39-.63-.79-1.32-.72-1.99.08-.67.48-1.09.65-1.26.17-.17.35-.21.49-.21.15 0 .29.01.41.03.15.02.26.04.39.29.13.25.46.8.51 1.05.05.25.08.55-.02.82-.1-.27-.22-.4-.38-.54a.49.49 0 0 0-.44-.19c-.14,0-.28.04-.39.11-.11.07-.18.15-.24.24-.06.09-.12.19-.17.29s-.07.2-.07.3c0 .1.01.2.03.3.02.1.04.19.07.28.03.09.06.17.1.25.29.47.66.91 1.09 1.29s.92.73 1.41 1.02c.16.1.3.18.47.25.17.07.33.12.5.15.17.03.34.03.5.02.16-.01.32-.05.47-.13.15-.08.28-.19.4-.33.09-.1.17-.22.23-.34.06-.12.1-.25.13-.39a.57.57 0 0 1 .03-.26c.02-.12.03-.24.03-.37 0-.14-.02-.28-.05-.42a1.8 1.8 0 0 0-.25-.41c-.08-.12-.18-.21-.29-.29-.11-.08-.24-.13-.38-.15s-.28,0-.42.05c-.14.05-.28.13-.41.23-.13.1-.25.23-.36.37l-.13.15c-.09.1-.19.17-.3.22-.11.05-.22.08-.34.08-.12,0-.24-.02-.35-.07-.11-.05-.22-.12-.31-.21-.1-.09-.18-.2-.25-.33s-.13-.27-.18-.43a4.8 4.8 0 0 1-.22-1.29c.04-.3.14-.58.29-.82.15-.24.34-.45.58-.61.24-.16.51-.26.8-.29.29-.03.58,0,.86.08.28.08.54.22.77.42.23.2.41.45.55.73.14.28.23.59.26.91l.03.46zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
    </a>
);


// --- Componente Principal da Página Consignados ---

const Consignados = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <WhatsAppButton />

      <main
        className="flex-grow flex flex-col items-center justify-center p-4 pt-24" 
        style={{
          backgroundImage: 'url(src/assets/vehicle-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-lg mb-8">

          <div className="text-center mb-8">
            <div className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Consignado
              </h1>
              <div className="h-1 bg-lime-500 mt-2 mx-auto rounded"></div>
            </div>

            <div className="mt-4">
              <p className="text-xl md:text-2xl text-gray-800">Compramos seu carro,</p>
              <p className="text-xl md:text-2xl text-gray-800">Saiba agora quanto ele vale!</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Preencha o formulário:</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Marca"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Modelo"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Ano"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Versão"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Quilometragem"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold p-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                Enviar 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Consignados;

