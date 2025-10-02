import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Este componente detecta mudanças na rota da aplicação e,
 * a cada mudança, rola a janela para o topo (posição 0, 0).
 */
const ScrollToTop = () => {
  // O hook useLocation retorna o objeto de localização atual.
  const { pathname } = useLocation();

  // O useEffect é executado sempre que o `pathname` (a URL) muda.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente não precisa renderizar nada na tela.
  return null;
};

export default ScrollToTop;