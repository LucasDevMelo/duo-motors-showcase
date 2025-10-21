import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";

// Imagens locais
import porsche1 from "@/assets/porsche1.png";
import porsche2 from "@/assets/porsche2.png";
import porsche3 from "@/assets/porsche3.png";
import porsche4 from "@/assets/porsche4.png";

const vehicleData = {
  brand: "PORSCHE",
  model: "718 BOXSTER GTS 4.0 2024",
  year: "2024",
  transmission: "Automático",
  price: "R$ 750.000",
  images: [porsche1, porsche2, porsche3, porsche4],
  specs: {
    fuel: "Gasolina",
    transmission: "Automática",
    drive: "RWD",
    maxSpeed: "296 km/h",
    acceleration: "4,0s",
    brand: "Porsche",
    model: "718 Boxster GTS 4.0",
    year: "2024",
    km: "10.000 km"
  },
  description: `Este Porsche 718 Boxster GTS 4.0 2024 representa a essência do prazer em dirigir. Com apenas 10.000 km, mantém toda sua originalidade e performance impecável.

Um roadster de alta potência e tradição Porsche que entrega esportividade, conforto e segurança para quem busca emoção ao dirigir.

Veículo com procedência comprovada, manutenções em dia e documentação regularizada.`
};

const VehicleDetails = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % vehicleData.images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + vehicleData.images.length) % vehicleData.images.length);
  };

  const handleProposal = () => {
    const message = `Olá, tenho interesse no ${vehicleData.model}`;
    window.open(`https://wa.me/556196081413?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background geométrico inspirado na imagem */}
      <div className="absolute inset-0 z-0 bg-white">
        <svg 
          className="absolute inset-0 w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1920 1080"
        >
          <defs>
            <linearGradient id="diag1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f9fafb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="diag2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#d1d5db', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f3f4f6', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="diag3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Base branca */}
          <rect width="1920" height="1080" fill="#ffffff"/>
          
          {/* Formas diagonais grandes - canto superior esquerdo */}
          <path d="M 0,0 L 1200,0 L 0,800 Z" fill="url(#diag1)" opacity="0.6"/>
          <path d="M 0,0 L 900,0 L 0,600 Z" fill="#f3f4f6" opacity="0.4"/>
          <path d="M 0,200 L 600,0 L 0,500 Z" fill="#e5e7eb" opacity="0.3"/>
          
          {/* Formas diagonais grandes - canto superior direito */}
          <path d="M 1920,0 L 1920,600 L 1200,0 Z" fill="url(#diag3)" opacity="0.5"/>
          <path d="M 1920,0 L 1920,400 L 1500,0 Z" fill="#d1d5db" opacity="0.3"/>
          
          {/* Formas diagonais grandes - canto inferior direito */}
          <path d="M 1920,1080 L 1920,400 L 1100,1080 Z" fill="url(#diag2)" opacity="0.5"/>
          <path d="M 1920,1080 L 1920,600 L 1400,1080 Z" fill="#e5e7eb" opacity="0.4"/>
          
          {/* Formas diagonais grandes - canto inferior esquerdo */}
          <path d="M 0,1080 L 700,1080 L 0,500 Z" fill="#f9fafb" opacity="0.4"/>
          
          {/* Detalhes menores para textura */}
          <path d="M 400,300 L 700,200 L 500,500 Z" fill="#e5e7eb" opacity="0.2"/>
          <path d="M 1500,700 L 1700,600 L 1600,900 Z" fill="#d1d5db" opacity="0.2"/>
          <path d="M 200,900 L 400,850 L 300,1000 Z" fill="#f3f4f6" opacity="0.25"/>
        </svg>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <WhatsAppButton />

        <main className="pt-24 pb-16 flex-1">
          <div className="container mx-auto px-4 max-w-7xl">
            <Link to="/catalogo" className="inline-flex items-center text-duo-gray-dark hover:text-primary transition-colors mb-6 md:mb-8">
              ← Voltar para todos os carros
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
              {/* Imagens */}
              <div>
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                      key={currentImage}
                      src={vehicleData.images[currentImage]}
                      alt={vehicleData.model}
                      className="w-full h-full object-cover absolute inset-0"
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
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
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {vehicleData.images.map((image, index) => (
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
                        alt={`${vehicleData.model} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Informações */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
                <p className="text-primary font-bold mb-2 text-sm md:text-base">{vehicleData.brand}</p>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{vehicleData.model}</h1>
                
                <div className="flex gap-4 md:gap-6 text-duo-gray-dark mb-6 text-sm md:text-base">
                  <span>{vehicleData.year}</span>
                  <span>{vehicleData.transmission}</span>
                </div>
                
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 md:mb-8">{vehicleData.price}</p>
                
                <Button 
                  onClick={handleProposal}
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-base md:text-lg"
                >
                  Fazer proposta
                </Button>
              </div>
            </div>
            
            {/* Detalhes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {/* Especificações */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">Motor e Performance</h2>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Combustível:</span>
                    <span className="font-medium">{vehicleData.specs.fuel}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Transmissão:</span>
                    <span className="font-medium">{vehicleData.specs.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Tração:</span>
                    <span className="font-medium">{vehicleData.specs.drive}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Velocidade máxima:</span>
                    <span className="font-medium">{vehicleData.specs.maxSpeed}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Aceleração 0–100 km/h:</span>
                    <span className="font-medium">{vehicleData.specs.acceleration}</span>
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold mt-6 md:mt-8 mb-3 md:mb-4">Especificações técnicas</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Marca:</span>
                    <span className="font-medium">{vehicleData.specs.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Modelo:</span>
                    <span className="font-medium">{vehicleData.specs.model}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Ano:</span>
                    <span className="font-medium">{vehicleData.specs.year}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b text-sm md:text-base">
                    <span className="text-duo-gray-dark">Quilometragem:</span>
                    <span className="font-medium">{vehicleData.specs.km}</span>
                  </div>
                </div>
              </div>
              
              {/* Descrição */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6">Sobre</h2>
                <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {vehicleData.description}
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
