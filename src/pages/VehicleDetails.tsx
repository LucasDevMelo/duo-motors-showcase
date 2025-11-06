import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import vehicleBg from "@/assets/vehicle-bg.png";
import { supabase } from "@/integrations/supabase/client";

const VehicleDetails = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const translateTransmission = (transmission: string) => {
    const translations: { [key: string]: string } = {
      'manual': 'Manual',
      'automatic': 'Automático',
      'semi_automatic': 'Semi-automático'
    };
    return translations[transmission] || transmission;
  };

  const translateFuel = (fuel: string) => {
    const translations: { [key: string]: string } = {
      'gasoline': 'Gasolina',
      'ethanol': 'Etanol',
      'diesel': 'Diesel',
      'flex': 'Flex',
      'electric': 'Elétrico',
      'hybrid': 'Híbrido'
    };
    return translations[fuel] || fuel;
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error('Erro ao buscar veículo:', error);
      } else {
        setVehicle(data);
      }
      setLoading(false);
    };

    fetchVehicle();
  }, [id]);

  const images = vehicle?.image_urls || [vehicle?.main_image_url].filter(Boolean);

  const nextImage = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleProposal = () => {
    const message = `Olá, tenho interesse no ${vehicle?.brand} ${vehicle?.model}`;
    window.open(`https://wa.me/556196081413?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${vehicleBg})` }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <WhatsAppButton />
          <main className="pt-24 pb-16 flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${vehicleBg})` }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <WhatsAppButton />
          <main className="pt-24 pb-16 flex-1">
            <div className="container mx-auto px-4">
              <Link to="/catalogo" className="inline-flex items-center text-duo-gray-dark hover:text-primary transition-colors mb-8">
                ← Voltar para todos os carros
              </Link>
              <p className="text-center text-lg">Veículo não encontrado.</p>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  const specs = vehicle.specifications || {};

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background sempre no fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${vehicleBg})` }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <WhatsAppButton />

        <main className="pt-24 pb-16 flex-1">
          <div className="container mx-auto px-4">
            <Link to="/catalogo" className="inline-flex items-center text-duo-gray-dark hover:text-primary transition-colors mb-8">
              ← Voltar para todos os carros
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Imagens */}
              <div>
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={currentImage}
                      src={images[currentImage]}
                      alt={vehicle.name}
                      className="w-full h-full object-cover absolute inset-0"
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full transition-colors z-10"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>
                
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentImage ? 1 : -1);
                          setCurrentImage(index);
                        }}
                        className={`flex-shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-colors ${
                          currentImage === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${vehicle.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Informações */}
              <div>
                <p className="text-primary font-bold mb-2">{vehicle.brand.toUpperCase()}</p>
                <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
                
                <div className="flex gap-6 text-duo-gray-dark mb-6">
                  <span>{vehicle.year}</span>
                  <span>{translateTransmission(vehicle.transmission)}</span>
                  {vehicle.kilometers && <span>{vehicle.kilometers.toLocaleString('pt-BR')} km</span>}
                </div>
                
                <p className="text-4xl font-bold text-primary mb-6">
                  R$ {Number(vehicle.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                
                <Button 
                  onClick={handleProposal}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Fazer proposta
                </Button>
              </div>
            </div>
            
            {/* Detalhes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Especificações */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Especificações</h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-duo-gray-dark">Marca:</span>
                    <span className="font-medium">{vehicle.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-duo-gray-dark">Modelo:</span>
                    <span className="font-medium">{vehicle.model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-duo-gray-dark">Ano:</span>
                    <span className="font-medium">{vehicle.year}</span>
                  </div>
                  {vehicle.kilometers && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-duo-gray-dark">Quilometragem:</span>
                      <span className="font-medium">{vehicle.kilometers.toLocaleString('pt-BR')} km</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-duo-gray-dark">Combustível:</span>
                    <span className="font-medium">{translateFuel(vehicle.fuel)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-duo-gray-dark">Transmissão:</span>
                    <span className="font-medium">{translateTransmission(vehicle.transmission)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-duo-gray-dark">Categoria:</span>
                    <span className="font-medium">{vehicle.category}</span>
                  </div>
                  
                  {specs && Object.keys(specs).length > 0 && (
                    <>
                      <h3 className="text-xl font-bold mt-8 mb-4">Detalhes Adicionais</h3>
                      {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b">
                          <span className="text-duo-gray-dark capitalize">{key.replace(/_/g, ' ')}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              
              {/* Descrição */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">Sobre</h2>
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {vehicle.description || 'Descrição não disponível.'}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer fixado ao final */}
        <Footer />
      </div>
    </div>
  );
};

export default VehicleDetails;