import React, { useState, useEffect } from 'react';

// --- Dependências Simuladas para o Componente Header ---

// Simulação do react-router-dom
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
const useLocation = () => ({ pathname: '/consignados' });

// Simulação do componente Button de shadcn/ui (CORRIGIDO)
const Button = ({ children, asChild = false, ...props }) => {
  if (asChild && React.isValidElement(children)) {
    // Clona o elemento filho (<a>), mesclando as props.
    // A asserção de tipo 'as Record<string, unknown>' resolve o erro de espalhamento (spread) do TypeScript.
    const mergedProps = { ...(children.props as Record<string, unknown>), ...props };
    return React.cloneElement(children, mergedProps);
  }
  return <button {...props}>{children}</button>;
};

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

// --- O seu Componente Header.tsx Integrado ---

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
            <Button asChild className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded">
              <a href="https://wa.me/556196081413" target="_blank" rel="noopener noreferrer">
                Entrar em contato
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
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
            <Button asChild className="bg-lime-500 hover:bg-lime-600 mt-4 text-lg text-white px-4 py-2 rounded">
              <a href="https://wa.me/556196081413" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                Entrar em contato
              </a>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

// --- Componentes Placeholder (Footer, WhatsAppButton) ---

const Footer = () => (
  <footer className="bg-gray-800 text-white p-8 text-center">
    <p>&copy; 2023 Duo Motors. Todos os direitos reservados.</p>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8.4 8.4z"></path>
        </svg>
    </a>
);


// --- Componente Principal da Página Consignados ---

const Consignados = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <WhatsAppButton />

      {/* Adicionado um paddingTop para não ficar atrás do Header fixo */}
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

