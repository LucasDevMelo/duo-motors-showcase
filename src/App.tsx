import { Link } from "react-router-dom";
import { MapPin, Clock, ChevronLeft, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      {/* Voltar */}
      <div className="container mx-auto px-4 mt-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-duo-gray-dark hover:text-primary transition-colors"
        >
          <ChevronLeft size={20} /> Voltar ao início
        </Link>
      </div>

      {/* Contato */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Contato</h2>
        <div className="w-24 h-1 bg-primary mb-8"></div>

        <div className="bg-green-100 rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Endereço e horário */}
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="text-primary mt-1" size={22} />
              <p className="text-lg">
                C.A Samambaia Rua 01, St. Hab. Vicente Pires lote 01,
                Colônia Agrícola Samambaia A, Brasília, Brasília - DF, 72002-495
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-primary mt-1" size={22} />
              <p className="text-lg">De 8h às 18h</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="mb-3 font-medium">
              Fale com um de nossos especialistas via WhatsApp:
            </p>
            <a
              href="https://wa.me/5591996081415"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-5 transition-colors"
            >
              <Phone size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Localização</h2>
        <div className="w-24 h-1 bg-primary mb-8"></div>

        <div className="w-full h-[400px] rounded-lg overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1725289480496!6m8!1m7!1sAF1QipOkF3uPYJb1sBhkp-xWnc-7RGRlc8jHwJq5gpPO!2m2!1d-15.8142507!2d-48.0546248!3f75!4f0!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
