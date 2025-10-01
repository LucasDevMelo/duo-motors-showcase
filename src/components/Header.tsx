import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">
            DUO <span className="text-primary">MOTORS</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`transition-colors ${isActive("/") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
          >
            Início
          </Link>
          <Link 
            to="/catalogo" 
            className={`transition-colors ${isActive("/catalogo") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
          >
            Catálogo
          </Link>
          <Link 
            to="/sobre" 
            className={`transition-colors ${isActive("/sobre") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
          >
            Sobre nós
          </Link>
          <Link 
            to="/consignados" 
            className={`transition-colors ${isActive("/consignados") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
          >
            Consignados
          </Link>
          <Link 
            to="/venda" 
            className={`transition-colors ${isActive("/venda") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`}
          >
            Venda
          </Link>
        </nav>
        
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="https://wa.me/556196081613" target="_blank" rel="noopener noreferrer">
            Entrar em contato
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
