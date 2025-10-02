import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import catalogoCar from "@/assets/catalogo-car.png";
import vendaCar from "@/assets/venda-car.png";
import consignadoCar from "@/assets/consignado-car.png";
import destaquePorsche from "@/assets/destaque-porsche.jpg";
import destaqueBMW from "@/assets/destaque-bmw.jpg";
import destaqueJaguar from "@/assets/destaque-jaguar.jpg";

// Array de carros em destaque
const featuredCars = [
  {
    brand: "PORSCHE",
    model: "911",
    version: "3.0 24V H6 GASOLINA CARRERA PDK",
    year: "2020/2021",
    km: "11.859 km",
    price: "R$ 756.750,00",
    image: destaquePorsche,
  },
  {
    brand: "BMW",
    model: "M4",
    version: "3.0 I6 Biturbo",
    year: "2019/2020",
    km: "25.000 km",
    price: "R$ 589.900,00",
    image: destaqueBMW,
  },
  {
    brand: "JAGUAR",
    model: "F-Type",
    version: "5.0 V8 Supercharged",
    year: "2021/2022",
    km: "5.500 km",
    price: "R$ 659.000,00",
    image: destaqueJaguar,
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Troca automática de slide a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredCars.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative h-[90vh] sm:h-screen mt-16 overflow-hidden">
        {/* Vídeo de fundo */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo de fundo.
        </video>

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Conteúdo */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-2xl mx-auto sm:mx-0">
            Encontre seu novo carro na Duo Motors
          </h1>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 w-fit mx-auto sm:mx-0"
          >
            <Link to="/catalogo">Ver o catálogo completo </Link>
          </Button>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-background">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 pt-10 sm:pt-16">
          Explorar todos os carros ▸
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
          {/* Catálogo */}
          <Link
            to="/catalogo"
            className="relative h-[300px] sm:h-[450px] overflow-hidden group cursor-pointer"
          >
            <img
              src={catalogoCar}
              alt="Catálogo"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="relative z-20 h-full flex items-center justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Catálogo
              </h3>
            </div>
          </Link>

          {/* Venda */}
          <Link
            to="/venda"
            className="relative h-[300px] sm:h-[450px] overflow-hidden group cursor-pointer"
          >
            <img
              src={vendaCar}
              alt="Venda"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="relative z-20 h-full flex items-center justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">Venda</h3>
            </div>
          </Link>

          {/* Consignado */}
          <Link
            to="/consignados"
            className="relative h-[300px] sm:h-[450px] overflow-hidden group cursor-pointer"
          >
            <img
              src={consignadoCar}
              alt="Consignado"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
            <div className="relative z-20 h-full flex items-center justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Consignado
              </h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="pt-16 sm:pt-24 pb-10 sm:pb-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Destaques
          </h2>

          <div className="relative w-full h-[600px] sm:h-[750px] overflow-hidden rounded-none">
            {/* Imagem de fundo */}
            <img
              src={featuredCars[currentSlide].image}
              alt={featuredCars[currentSlide].model}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />

            {/* Overlay escuro sutil */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-10" />

            {/* Conteúdo sobre a imagem */}
            <div className="relative z-20 flex flex-col justify-between h-full p-6 sm:p-10">
              {/* Texto superior esquerdo */}
              <div className="text-white font-bold">
                <p className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight">
                  {featuredCars[currentSlide].brand}
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight">
                  {featuredCars[currentSlide].model}
                </p>
                <p className="text-sm sm:text-base md:text-lg uppercase mt-1 tracking-wide leading-tight">
                  {featuredCars[currentSlide].version}
                </p>
                {/* Linha verde sublinhando */}
                <div className="w-32 sm:w-48 md:w-64 h-1 bg-green-500 mt-2"></div>
              </div>

              {/* Informações inferiores direita */}
              <div className="self-end">
                <div className="flex gap-6 sm:gap-10 md:gap-12 text-white text-sm sm:text-base font-medium mb-2">
                  <div className="text-right">
                    <div className="text-xs opacity-80 mb-1">Ano</div>
                    <div className="font-bold">{featuredCars[currentSlide].year}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-80 mb-1">Km</div>
                    <div className="font-bold">{featuredCars[currentSlide].km}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg md:text-xl">
                      {featuredCars[currentSlide].price}
                    </div>
                  </div>
                </div>
                {/* Linha verde sublinhando as informações */}
                <div className="w-full h-1 bg-green-500"></div>

                {/* Botões de navegação */}
                <div className="flex gap-3 mt-4 justify-end">
                  <button
                    className="p-2 sm:p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white"
                    onClick={() =>
                      setCurrentSlide(
                        currentSlide === 0
                          ? featuredCars.length - 1
                          : currentSlide - 1
                      )
                    }
                  >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                  </button>

                  <button
                    className="p-2 sm:p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white"
                    onClick={() =>
                      setCurrentSlide(
                        currentSlide === featuredCars.length - 1
                          ? 0
                          : currentSlide + 1
                      )
                    }
                  >
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              OBTER ENDEREÇO
            </h2>
            <Button className="bg-primary hover:bg-primary/90 text-sm sm:text-base">
              OBTER ENDEREÇO
            </Button>
          </div>

          <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border">
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
