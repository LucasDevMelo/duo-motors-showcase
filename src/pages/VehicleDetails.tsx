import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// --- NOVO BACKGROUND GEOMÉTRICO (Estilo Low-Poly) ---
const BackgroundPattern = () => (
  <div className="fixed inset-0 overflow-hidden -z-10 bg-[#f0f2f5]">
    {/* Base Gradient Suave */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#e6e9ef] to-[#dbe0e8]" />

    {/* Camadas de Formas Geométricas */}
    {/* Forma 1: Grande polígono superior esquerdo (claro) */}
    <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-white/40 skew-y-[-15deg] rotate-12 transform-gpu blur-[1px]" />
    
    {/* Forma 2: Polígono central direito (tom médio) */}
    <div className="absolute top-[10%] right-[-10%] w-[60%] h-[70%] bg-slate-200/30 skew-x-[-20deg] -rotate-6 transform-gpu" />
    
    {/* Forma 3: Forma de destaque brilhante inferior (branco forte) */}
    <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[60%] bg-white/70 skew-y-12 -rotate-[15deg] transform-gpu" />
    
    {/* Forma 4: Polígono de contraste mais escuro (para profundidade) */}
    <div className="absolute top-[30%] right-[20%] w-[40%] h-[50%] bg-slate-300/20 skew-y-[-8deg] rotate-[30deg] transform-gpu blur-[2px]" />

    {/* Forma 5: Preenchimento superior direito (claro) */}
    <div className="absolute -top-[10%] right-[10%] w-[40%] h-[40%] bg-white/50 skew-x-12 rotate-[20deg] transform-gpu" />
    
    {/* Forma 6: Forma grande inferior direita atravessando (tom médio) */}
    <div className="absolute bottom-[-20%] right-[-20%] w-[90%] h-[50%] bg-slate-100/40 skew-y-[-5deg] rotate-[-10deg] transform-gpu" />

    {/* Overlay de ruído sutil para textura (opcional, remove o aspecto "digital" chapado) */}
    <div className="absolute inset-0 bg-white opacity-[0.02] mix-blend-overlay pointer-events-none" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
    />
  </div>
);

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
        <BackgroundPattern />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <WhatsAppButton />
          <main className="pt-24 pb-16 flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col relative">
        <BackgroundPattern />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <WhatsAppButton />
          <main className="pt-24 pb-16 flex-1">
            <div className="container mx-auto px-4">
              <Link to="/catalogo" className="inline-flex items-center text-slate-600 hover:text-primary transition-colors mb-8 font-medium">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Voltar para todos os carros
              </Link>
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 text-center shadow-lg border border-white">
                <p className="text-xl text-slate-600">Veículo não encontrado.</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  const specs = vehicle.specifications || {};

  return (
    <div className="min-h-screen flex flex-col relative font-sans text-slate-800">
      {/* Background Fixado */}
      <BackgroundPattern />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <WhatsAppButton />

        <main className="pt-28 pb-16 flex-1">
          <div className="container mx-auto px-4">
            <Link to="/catalogo" className="inline-flex items-center text-slate-600 hover:text-black transition-colors mb-8 font-medium group">
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
              Voltar para todos os carros
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Coluna Esquerda: Imagens */}
              <div>
                <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden shadow-2xl bg-white/50 border border-white/50 backdrop-blur-sm">
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
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                  
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full transition-all shadow-lg hover:scale-110 z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full transition-all shadow-lg hover:scale-110 z-10"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  
                  {/* Badge de quantidade de fotos */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {currentImage + 1} / {images.length}
                  </div>
                </div>
                
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentImage ? 1 : -1);
                          setCurrentImage(index);
                        }}
                        className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                          currentImage === index 
                            ? 'border-slate-800 ring-2 ring-slate-800/20 scale-105 opacity-100' 
                            : 'border-white/50 opacity-70 hover:opacity-100 hover:scale-105 hover:border-white'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`${vehicle.name} mini ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Coluna Direita: Informações Principais */}
              <div className="flex flex-col justify-center">
                {/* Card de informações com fundo branco translúcido para leitura sobre o novo BG */}
                <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-xl">
                  <p className="text-primary font-bold mb-2 tracking-widest text-sm uppercase">{vehicle.brand}</p>
                  <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
                    {vehicle.name}
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="bg-white/80 text-slate-700 px-4 py-2 rounded-lg font-medium border border-slate-200/50 shadow-sm">
                      {vehicle.year}
                    </span>
                    <span className="bg-white/80 text-slate-700 px-4 py-2 rounded-lg font-medium border border-slate-200/50 shadow-sm">
                      {translateTransmission(vehicle.transmission)}
                    </span>
                    {vehicle.kilometers && (
                      <span className="bg-white/80 text-slate-700 px-4 py-2 rounded-lg font-medium border border-slate-200/50 shadow-sm">
                        {vehicle.kilometers.toLocaleString('pt-BR')} km
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-10 p-5 bg-slate-50/80 rounded-xl border border-slate-100/50">
                    <p className="text-sm text-slate-500 mb-1 font-medium">Preço à vista</p>
                    <p className="text-5xl font-bold text-slate-900 tracking-tight">
                      <span className="text-2xl font-normal text-slate-500 mr-1">R$</span>
                      {Number(vehicle.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleProposal}
                    size="lg" 
                    className="w-full h-16 text-lg font-bold bg-[#65D34E] hover:bg-[#5ac244] text-white shadow-lg shadow-green-200/50 transition-all hover:-translate-y-1"
                  >
                    Fazer proposta
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Seção Inferior: Grid de Detalhes e Descrição */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Especificações (Ocupa 5 colunas) */}
              <div className="lg:col-span-5">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/60 shadow-lg sticky top-24">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200/50">
                    Ficha Técnica
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 font-medium">Marca</span>
                      <span className="font-bold text-slate-900">{vehicle.brand}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-slate-50/50 px-3 rounded-lg">
                      <span className="text-slate-500 font-medium">Modelo</span>
                      <span className="font-bold text-slate-900">{vehicle.model}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 font-medium">Ano</span>
                      <span className="font-bold text-slate-900">{vehicle.year}</span>
                    </div>
                    {vehicle.kilometers && (
                      <div className="flex justify-between items-center py-2 bg-slate-50/50 px-3 rounded-lg">
                        <span className="text-slate-500 font-medium">Quilometragem</span>
                        <span className="font-bold text-slate-900">{vehicle.kilometers.toLocaleString('pt-BR')} km</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 font-medium">Combustível</span>
                      <span className="font-bold text-slate-900">{translateFuel(vehicle.fuel)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 bg-slate-50/50 px-3 rounded-lg">
                      <span className="text-slate-500 font-medium">Transmissão</span>
                      <span className="font-bold text-slate-900">{translateTransmission(vehicle.transmission)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 font-medium">Categoria</span>
                      <span className="font-bold text-slate-900">{vehicle.category}</span>
                    </div>
                    
                    {specs && Object.keys(specs).length > 0 && (
                      <>
                        <h3 className="text-lg font-bold mt-8 mb-4 text-slate-900 pt-4 border-t border-slate-200/50">Opcionais</h3>
                        {Object.entries(specs).map(([key, value], idx) => (
                          <div key={key} className={`flex justify-between items-center py-2 ${idx % 2 === 0 ? 'bg-slate-50/50 px-3 rounded-lg' : ''}`}>
                            <span className="text-slate-500 capitalize font-medium">{key.replace(/_/g, ' ')}</span>
                            <span className="font-bold text-slate-900">{String(value)}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Sobre o Veículo (Ocupa 7 colunas) */}
              <div className="lg:col-span-7">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/60 shadow-lg h-full">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200/50">
                    Sobre o veículo
                  </h2>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {vehicle.description || 'Nenhuma descrição fornecida para este veículo.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default VehicleDetails;