import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const featuredCars = [
  {
    brand: "PORSCHE",
    model: "911",
    version: "3.0 24V H6 GASOLINA CARRERA PDK",
    year: "2020/2021",
    km: "11.859 km",
    price: "R$ 756.750,00"
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="relative h-[600px] mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070')"
          }}
        />
        
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-2xl">
            Encontre seu novo carro na Duo Motors
          </h1>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 w-fit">
            <Link to="/catalogo">Ver o catálogo completo +</Link>
          </Button>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorar todos os carros ▸
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/catalogo" 
              className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1483')"
                }}
              />
              <div className="relative z-20 h-full flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Catálogo</h3>
              </div>
            </Link>

            <Link 
              to="/venda" 
              className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070')"
                }}
              />
              <div className="relative z-20 h-full flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Venda</h3>
              </div>
            </Link>

            <Link 
              to="/consignados" 
              className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2064')"
                }}
              />
              <div className="relative z-20 h-full flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Consignado</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-duo-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Destaques</h2>
          
          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070')"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-primary text-sm font-semibold mb-2">{featuredCars[0].brand}</p>
                <h3 className="text-3xl font-bold mb-2">{featuredCars[0].model}</h3>
                <p className="text-sm mb-4">{featuredCars[0].version}</p>
                <div className="flex gap-8 text-sm">
                  <span>{featuredCars[0].year}</span>
                  <span>{featuredCars[0].km}</span>
                  <span className="text-primary font-bold">{featuredCars[0].price}</span>
                </div>
              </div>
            </div>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              onClick={() => setCurrentSlide(Math.min(featuredCars.length - 1, currentSlide + 1))}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">OBTER ENDEREÇO</h2>
            <Button className="bg-primary hover:bg-primary/90">
              OBTER ENDEREÇO
            </Button>
          </div>
          
          <div className="w-full h-[400px] rounded-lg overflow-hidden border">
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
