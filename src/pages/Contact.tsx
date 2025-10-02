import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Clock, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WhatsAppButton />

      {/* Hero Back Link */}
      <section className="mt-20 container mx-auto px-4">
        <Link
          to="/"
          className="inline-block text-duo-gray-dark hover:text-primary transition-colors mb-8"
        >
          ← Voltar ao início
        </Link>
      </section>

      {/* Contact Info */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b-4 border-primary w-fit">
          Contato
        </h2>

        <div className="bg-green-100 p-6 sm:p-10 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6 shadow">
          {/* Endereço e horário */}
          <div className="flex flex-col gap-6 text-duo-gray-dark">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <p>
                C.A Samambaia Rua 01, St. Hab. Vicente Pires lote 01, Colônia
                Agrícola Samambaia A, Brasília, Brasília - DF, 72002-495
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-primary" />
              <p>De 8h às 18h</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center justify-center">
            <p className="mb-2 text-center md:text-right">
              Fale com um de nossos especialistas via WhatsApp:
            </p>
            <a
              href="https://wa.me/5591996081415"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 transition"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b-4 border-primary w-fit">
          Localização
        </h2>

        <div className="w-full h-[400px] rounded-lg overflow-hidden border shadow relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1727900000!6m8!1m7!1sAF1QipOkF3uPYJb1sBhkp-xWnc-7RGRlc8jHwJq5gpPO!2m2!1d-15.8142507!2d-48.0546248!3f90!4f0!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Footer do mapa com botão */}
          <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm flex justify-between items-center p-4">
            <button className="text-primary font-bold text-lg">
              OBTER ENDEREÇO
            </button>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Insira seu endereço"
                className="border border-gray-300 rounded px-3 py-2 text-sm w-48"
              />
              <button className="bg-primary text-white font-medium rounded px-4 py-2">
                OBTER ENDEREÇO
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
