import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-duo-gray border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Descrição */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              DUO <span className="text-primary">MOTORS</span>
            </h3>
            <p className="text-sm text-duo-gray-dark">
              Sempre de compras e vendas oferecendo permutas com uma ampla seleção de veículos de alta qualidade e de luxo, para todos os estilos e necessidades de direção.
            </p>
          </div>
          
          {/* Guia Rápido */}
          <div>
            <h4 className="font-semibold mb-4">GUIA RÁPIDO</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-duo-gray-dark hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-sm text-duo-gray-dark hover:text-primary transition-colors">
                  Pesquisar
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="text-sm text-duo-gray-dark hover:text-primary transition-colors">
                  Inventário
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-duo-gray-dark hover:text-primary transition-colors">
                  Sobre nós
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contato + Instagram */}
          <div>
            <h4 className="font-semibold mb-4">CONTATO</h4>
            <p className="text-sm text-duo-gray-dark mb-2">
              Telefone: +55 (61) 99608-1613
            </p>
            <a 
              href="https://www.instagram.com/_duomotors/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-duo-gray-dark hover:text-primary transition-colors mt-2"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>
      
      {/* Barra inferior */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-duo-gray-dark text-center">
            © 2025 Duo Motors. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
