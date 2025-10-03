import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Venda = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <WhatsAppButton />

      <main
        className="flex-grow flex flex-col items-center justify-center p-4 pt-24"
        style={{
          backgroundImage:  'url(src/assets/vehicle-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="w-full max-w-lg mb-8">

          <div className="text-center mb-8">
            <div className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Venda seu Carro
              </h1>
              <div className="h-1 bg-lime-500 mt-2 mx-auto rounded"></div>
            </div>

            <div className="mt-4">
              <p className="text-xl md:text-2xl text-gray-800">Quer vender seu carro de forma rápida e segura?</p>
              <p className="text-xl md:text-2xl text-gray-800">A Duo Motors oferece a melhor avaliação!</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl w-full">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Preencha o formulário:</h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Marca"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Modelo"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Ano"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Versão"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Quilometragem"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold p-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                Enviar
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Venda;