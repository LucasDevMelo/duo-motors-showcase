import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

const Venda = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Venda seu carro</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl mb-8 leading-relaxed">
              Quer vender seu carro de forma rápida e segura? A Duo Motors oferece a melhor avaliação e pagamento à vista!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-card rounded-lg border">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="font-bold mb-2">Avaliação Justa</h3>
                <p className="text-sm text-duo-gray-dark">
                  Avaliamos seu veículo com base no mercado
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg border">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold mb-2">Pagamento à Vista</h3>
                <p className="text-sm text-duo-gray-dark">
                  Receba o valor combinado imediatamente
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg border">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="font-bold mb-2">Documentação</h3>
                <p className="text-sm text-duo-gray-dark">
                  Cuidamos de toda a burocracia para você
                </p>
              </div>
            </div>
            
            <div className="bg-duo-gray p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">Como funciona?</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                  <p>Entre em contato</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                  <p>Avaliamos seu carro</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                  <p>Fazemos a proposta</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">4</div>
                  <p>Você recebe à vista</p>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <a href="https://wa.me/556196081613?text=Olá, tenho interesse em vender meu veículo" target="_blank" rel="noopener noreferrer">
                Vender meu carro agora
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Venda;
