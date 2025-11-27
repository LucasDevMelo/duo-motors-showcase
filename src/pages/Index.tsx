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

import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Destaques reais do banco
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      setLoadingFeatured(true);

      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      setFeaturedCars(data || []);
    } catch (err) {
      console.error("Erro ao carregar destaques", err);
    } finally {
      setLoadingFeatured(false);
    }
  };

  // slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredCars.length - 1 : prev - 1
    );
  };

  // próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredCars.length - 1 ? 0 : prev + 1
    );
  };

  // troca automática
  useEffect(() => {
    if (!featuredCars.length) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentSlide, featuredCars]);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* HERO */}
      <section className="relative h-[90vh] sm:h-screen mt-16 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 max-w-2xl mx-auto sm:mx-0">
            Encontre seu novo carro na Duo Motors
          </h1>

          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 w-fit mx-auto sm:mx-0 font-bold shadow-black/50"
          >
            <Link to="/catalogo">Ver o catálogo completo</Link>
          </Button>
        </div>
      </section>

      {/* NAVEGAÇÃO RÁPIDA */}
      <section className="bg-background">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 pt-10 sm:pt-16">
          Explorar todos os carros ▸
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
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
              <h3 className="text-3xl sm:text-4xl font-bold text-white">
                Venda
              </h3>
            </div>
          </Link>

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

      {/* DESTAQUES — COM BANCO DE DADOS */}
      <section className="pt-16 sm:pt-24 pb-10 sm:pb-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Destaques
          </h2>

          {loadingFeatured ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : featuredCars.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              Nenhum veículo disponível no momento.
            </div>
          ) : (
            <div className="relative w-full aspect-video sm:aspect-auto sm:h-[750px] overflow-hidden">

              {/* slides */}
              {featuredCars.map((car: any, index: number) => (
                <div
                  key={car.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={car.main_image_url}
                    alt={car.name}
                    className={`w-full h-full object-cover transition-transform ease-in-out
                      ${index === currentSlide ? "scale-110 duration-[7000ms]" : "scale-100 duration-500"}
                    `}
                  />
                </div>
              ))}

              {/* Informações do carro */}
              <div className="relative z-20 flex flex-col justify-between h-full p-4 sm:p-10 pointer-events-none">
                <div className="text-white font-bold">
                  <p className="text-xl sm:text-3xl md:text-4xl uppercase">
                    {featuredCars[currentSlide].brand}
                  </p>
                  <p className="text-xl sm:text-3xl md:text-4xl uppercase">
                    {featuredCars[currentSlide].model}
                  </p>
                  <p className="text-xs sm:text-base md:text-lg uppercase mt-1">
                    {featuredCars[currentSlide].version}
                  </p>
                  <div className="w-24 sm:w-48 md:w-64 h-1 bg-green-500 mt-2"></div>
                </div>

                <div className="self-end text-right">
                  <div className="flex gap-6 text-white text-xs sm:text-base font-medium mb-2">
                    <div>
                      <div className="opacity-80 mb-1">Ano</div>
                      <div className="font-bold">{featuredCars[currentSlide].year}</div>
                    </div>
                    <div>
                      <div className="opacity-80 mb-1">Km</div>
                      <div className="font-bold">
                        {featuredCars[currentSlide].kilometers
                          ? `${featuredCars[currentSlide].kilometers.toLocaleString("pt-BR")} km`
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm sm:text-lg md:text-xl">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(featuredCars[currentSlide].price)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-green-500"></div>
                </div>
              </div>

              {/* botões */}
              <div className="hidden sm:flex absolute inset-0 z-30 items-center justify-between px-4">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-sm bg-black/60 hover:bg-black/80 transition text-white"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MAPA */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              ENDEREÇO DA LOJA
            </h2>
          </div>

          <div className="w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.7899445678!2d-48.0572066!3d-15.8141344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a33c895e6ab0b%3A0xc63066b59055fc3a!2sDUO%20MOTORS!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="eager"
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
