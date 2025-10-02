import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

const Consignados = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Consignados</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl mb-8 leading-relaxed">
              Deixe seu veículo conosco e venda com toda a estrutura e confiança da Duo Motors. Cuidamos de toda a negociação para você!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-bold mb-4 text-primary">Vantagens</h3>
                <ul className="text-left space-y-2">
                  <li>✓ Exposição em nossa loja</li>
                  <li>✓ Marketing digital</li>
                  <li>✓ Avaliação profissional</li>
                  <li>✓ Documentação facilitada</li>
                  <li>✓ Segurança na negociação</li>
                </ul>
              </div>
              
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-bold mb-4 text-primary">Como funciona</h3>
                <ol className="text-left space-y-2">
                  <li>1. Entre em contato conosco</li>
                  <li>2. Avaliamos seu veículo</li>
                  <li>3. Definimos o valor</li>
                  <li>4. Cuidamos da venda</li>
                  <li>5. Você recebe o pagamento</li>
                </ol>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <a href="https://wa.me/556196081413?text=Olá, tenho interesse em consignar meu veículo" target="_blank" rel="noopener noreferrer">
                Consignar meu veículo
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Consignados;
