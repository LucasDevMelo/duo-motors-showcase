import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // 1. Importando os ícones

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 2. Estado para controlar o menu

  const isActive = (path: string) => location.pathname === path;

  // 3. Efeito para bloquear o scroll do body quando o menu estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Função de limpeza para garantir que o overflow seja resetado se o componente for desmontado
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
      <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <span className="text-xl font-bold">
              DUO <span className="text-primary">MOTORS</span>
            </span>
          </Link>

          {/* Navegação para Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${isActive(link.to) ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botão de Contato para Desktop */}
          <div className="hidden md:block">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="https://wa.me/556196081613" target="_blank" rel="noopener noreferrer">
                Entrar em contato
              </a>
            </Button>
          </div>

          {/* 4. Botão Hambúrguer para Mobile */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* 5. Menu Mobile (Overlay) */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 md:hidden">
          <nav className="flex flex-col items-center justify-center h-full gap-8 text-xl">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${isActive(link.to) ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
                onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-primary hover:bg-primary/90 mt-4 text-lg">
              <a href="https://wa.me/556196081613" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                Entrar em contato
              </a>
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;