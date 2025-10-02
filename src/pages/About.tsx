import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Importando imagens locais
import sobreNosBanner from "@/assets/sobrenos-banner.png";
import sobreNos1 from "@/assets/sobrenos-1.png";
import sobreNos2 from "@/assets/sobrenos-2.png";

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="relative h-[400px] mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${sobreNosBanner})`
          }}
        />
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white">Sobre nós</h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="inline-block text-duo-gray-dark hover:text-primary transition-colors mb-8">
            ← Voltar ao início
          </Link>
          
          <p className="text-center text-lg leading-relaxed">
            A Duo Motors nasceu com o propósito de unir qualidade e confiança no mercado automotivo, oferecendo veículos novos e seminovos de procedência comprovada. Desde sua fundação, ela se dedica a transformar a compra de um carro em uma experiência simples, transparente e personalizada, entendendo que cada cliente busca não apenas um veículo, mas também a realização de um sonho.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div 
              className="h-[400px] rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${sobreNos1})`
              }}
            />
            
            <div>
              <h2 className="text-3xl font-bold mb-4">Nossa missão</h2>
              <div className="w-20 h-1 bg-primary mb-6" />
              <p className="text-lg leading-relaxed">
                A nossa missão é oferecer soluções em mobilidade com qualidade, confiança e atendimento diferenciado, garantindo sempre a melhor experiência para nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4">Nossos valores</h2>
              <div className="w-20 h-1 bg-primary mb-6" />
              <ul className="space-y-4 text-lg">
                <li>
                  <strong>Transparência:</strong> conduzir cada negociação com clareza e honestidade.
                </li>
                <li>
                  <strong>Qualidade:</strong> disponibilizar veículos revisados e certificados.
                </li>
                <li>
                  <strong>Respeito:</strong> ouvir, valorizar e superar as expectativas dos clientes.
                </li>
                <li>
                  <strong>Inovação:</strong> adotar práticas e serviços modernos que tragam agilidade e comodidade.
                </li>
                <li>
                  <strong>Compromisso:</strong> trabalhar para que cada cliente se sinta seguro e satisfeito com sua escolha.
                </li>
              </ul>
            </div>
            
            <div 
              className="h-[400px] rounded-lg bg-cover bg-center order-1 md:order-2"
              style={{
                backgroundImage: `url(${sobreNos2})`
              }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
