import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import catalogoCar from "@/assets/catalogo-car.png";
import vendaCar from "@/assets/venda-car.png";
import consignadoCar from "@/assets/consignado-car.png";
import porsche911Image from "@/assets/porsche911.png";
import bmwZ4Image from "@/assets/bmwz4.png";
import fTypeImage from "@/assets/ftype.png";

const featuredCars = [
  {
    brand: "PORSCHE",
    model: "911",
    version: "3.0 24V H6 GASOLINA CARRERA PDK",
    year: "2020/2021",
    km: "11.859 km",
    price: "R$ 756.750,00",
    image: porsche911Image,
  },
  {
    brand: "BMW",
    model: "M4",
    version: "3.0 I6 Biturbo",
    year: "2019/2020",
    km: "25.000 km",
    price: "R$ 589.900,00",
    image: bmwZ4Image,
  },
  {
    brand: "JAGUAR",
    model: "F-Type",
    version: "5.0 V8 Supercharged",
    year: "2021/2022",
    km: "5.500 km",
    price: "R$ 659.000,00",
    image: fTypeImage,
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Força o play do vídeo ao carregar a página, especialmente útil para mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented by browser:", error);
      });
    }
  }, []);

  // --- LÓGICA SIMPLIFICADA ---
  // Função para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredCars.length - 1 : prev - 1));
  };

  // Função para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredCars.length - 1 ? 0 : prev + 1));
  };

  // Troca automática de slide a cada 7 segundos (aumentado para apreciar a animação)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000); // Duração aumentada para o efeito de zoom ser mais perceptível
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero e Quick Navigation */}
      <section className="relative h-[90vh] sm:h-screen mt-16 overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo de fundo.
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-2xl mx-auto sm:mx-0">
            Encontre seu novo carro na Duo Motors
          </h1>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 w-fit mx-auto sm:mx-0 font-bold [text-shadow:1px_1px_2px_var(--tw-shadow-color)] shadow-black/50"
          >
            <Link to="/catalogo">Ver o catálogo completo </Link>
          </Button>
        </div>
      </section>

      <section className="bg-background">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 pt-10 sm:pt-16">
          Explorar todos os carros ▸
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
          <Link to="/catalogo" className="relative h-[300px] sm:h-[450px] overflow-hidden group cursor-pointer">
            <img src={catalogoCar} alt="Catálogo" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="relative z-20 h-full flex items-center justify-center"><h3 className="text-3xl sm:text-4xl font-bold text-white">Catálogo</h3></div>
          </Link>
          <Link to="/venda" className="relative h-[300px] sm:h-[450px] overflow-hidden group cursor-pointer">
            <img src={vendaCar} alt="Venda" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="relative z-20 h-full flex items-center justify-center"><h3 className="text-3xl sm:text-4xl font-bold text-white">Venda</h3></div>
          </Link>
          <Link to="/consignados" className="relative h-[300px] sm:h-[450px] overflow-hidden group cursor-pointer">
            <img src={consignadoCar} alt="Consignado" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="relative z-20 h-full flex items-center justify-center"><h3 className="text-3xl sm:text-4xl font-bold text-white">Consignado</h3></div>
          </Link>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="pt-16 sm:pt-24 pb-10 sm:pb-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Destaques
          </h2>

          <div className="relative w-full aspect-video sm:aspect-auto sm:h-[750px] overflow-hidden rounded-none">
            {/* --- NOVA ESTRUTURA PARA ANIMAÇÃO --- */}
            {/* Renderizamos todas as imagens empilhadas e controlamos a visibilidade com opacidade */}
            {featuredCars.map((car, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                  ${index === currentSlide ? 'opacity-100' : 'opacity-0'}
                `}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className={`w-full h-full object-cover transition-transform ease-in-out
                    ${index === currentSlide ? 'scale-110 duration-[7000ms]' : 'scale-100 duration-500'}
                  `}
                />
              </div>
            ))}

            {/* O conteúdo (texto) agora fica em um container separado, sempre visível */}
            <div className="relative z-20 flex flex-col justify-between h-full p-4 sm:p-10 pointer-events-none">
              <div className="text-white font-bold">
                <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight">
                  {featuredCars[currentSlide].brand}
                </p>
                <p className="text-xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight">
                  {featuredCars[currentSlide].model}
                </p>
                <p className="text-xs sm:text-base md:text-lg uppercase mt-1 tracking-wide leading-tight">
                  {featuredCars[currentSlide].version}
                </p>
                <div className="w-24 sm:w-48 md:w-64 h-1 bg-green-500 mt-2"></div>
              </div>

              <div className="self-end text-right">
                <div className="flex gap-4 sm:gap-10 md:gap-12 text-white text-xs sm:text-base font-medium mb-2">
                  <div>
                    <div className="opacity-80 mb-1">Ano</div>
                    <div className="font-bold">{featuredCars[currentSlide].year}</div>
                  </div>
                  <div>
                    <div className="opacity-80 mb-1">Km</div>
                    <div className="font-bold">{featuredCars[currentSlide].km}</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-lg md:text-xl">
                      {featuredCars[currentSlide].price}
                    </div>
                  </div>
                </div>
                <div className="w-full h-1 bg-green-500"></div>
              </div>
            </div>

            {/* Container das setas em desktop/tablet */}
            <div className="hidden sm:flex absolute inset-0 z-30 items-center justify-between px-4">
              <button onClick={prevSlide} className="p-2 sm:p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white">
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button onClick={nextSlide} className="p-2 sm:p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white">
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Container das setas em celular */}
          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <button onClick={prevSlide} className="p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">ENDEREÇO DA LOJA</h2>
          </div>
          <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border">
            {/* CORREÇÃO AQUI: loading="lazy" em vez de eager */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.7899445678!2d-48.0572066!3d-15.8141344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a33c895e6ab0b%3A0xc63066b59055fc3a!2sDUO%20MOTORS!5e0!3m2!1spt-BR!2sbr!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade" 
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;