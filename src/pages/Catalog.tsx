import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 1. Importe as imagens da sua pasta assets
import audiTTImage from "@/assets/audiTTroadster.png";
import bmwZ4Image from "@/assets/bmwz4.png";
import fTypeImage from "@/assets/ftype.png";
import porscheCayenneImage from "@/assets/cayenne.png";
import porscheBoxsterImage from "@/assets/porsche1.png"; // Usando porsche1.png para o Boxster
import porsche911Image from "@/assets/porsche911.png";

const vehicles = [
  {
    id: "1",
    name: "Audi TT Roadster",
    price: "R$ 518.000,00",
    year: "2020/2020",
    km: "27.000",
    transmission: "Automático",
    fuel: "Gasolina",
    // 2. Use a variável da imagem importada aqui
    image: audiTTImage 
  },
  {
    id: "2",
    name: "BMW Z4 30i M Sport",
    price: "R$ 348.900,00",
    year: "2019",
    km: "15.000",
    transmission: "Automático",
    fuel: "Gasolina",
    image: bmwZ4Image
  },
  {
    id: "3",
    name: "F-Type P300",
    price: "Consultar Valor",
    year: "2021",
    km: "8.000",
    transmission: "Automático",
    fuel: "Gasolina",
    image: fTypeImage
  },
  {
    id: "4",
    name: "Porsche Cayenne",
    price: "R$ 819.000,00",
    year: "2022",
    km: "5.000",
    transmission: "Automático",
    fuel: "Gasolina",
    image: porscheCayenneImage
  },
  {
    id: "5",
    name: "Porsche 718 Boxster",
    price: "Consultar Valor",
    year: "2023",
    km: "2.000",
    transmission: "Automático",
    fuel: "Gasolina",
    image: porscheBoxsterImage
  },
  {
    id: "6",
    name: "Porsche 911 Carrera",
    price: "R$ 916.000,00",
    year: "2021/2022",
    km: "11.859",
    transmission: "Automático",
    fuel: "Gasolina",
    image: porsche911Image
  }
];

const Catalog = () => {
  const [filters, setFilters] = useState({
    year: "",
    value: "",
    category: "",
    brand: "",
    model: "",
    passengers: "",
    km: "",
    state: ""
  });

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Catálogo</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          
          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
            <Input 
              placeholder="Ano" 
              value={filters.year}
              onChange={(e) => setFilters({...filters, year: e.target.value})}
            />
            <Input 
              placeholder="Valor" 
              value={filters.value}
              onChange={(e) => setFilters({...filters, value: e.target.value})}
            />
            <Input 
              placeholder="Categoria" 
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            />
            <Input 
              placeholder="Marca" 
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            />
            <Input 
              placeholder="Modelo" 
              value={filters.model}
              onChange={(e) => setFilters({...filters, model: e.target.value})}
            />
            <Input 
              placeholder="N° passageiros" 
              type="number"
              value={filters.passengers}
              onChange={(e) => setFilters({...filters, passengers: e.target.value})}
            />
            <Input 
              placeholder="KM" 
              type="number"
              value={filters.km}
              onChange={(e) => setFilters({...filters, km: e.target.value})}
            />
            <Select value={filters.state} onValueChange={(value) => setFilters({...filters, state: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo</SelectItem>
                <SelectItem value="seminovo">Seminovo</SelectItem>
                <SelectItem value="usado">Usado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Link 
                key={vehicle.id}
                to={`/veiculo/${vehicle.id}`}
                className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{vehicle.name}</h3>
                  {/* Pequena correção no className para remover lógica redundante */}
                  <p className="font-bold mb-4 text-primary">
                    {vehicle.price}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-duo-gray-dark">
                    <div>
                      <p className="text-xs">Ano</p>
                      <p className="font-medium text-foreground">{vehicle.year}</p>
                    </div>
                    <div>
                      <p className="text-xs">Km</p>
                      <p className="font-medium text-foreground">{vehicle.km} km</p>
                    </div>
                    <div>
                      <p className="text-xs">Câmbio</p>
                      <p className="font-medium text-foreground">{vehicle.transmission}</p>
                    </div>
                    <div>
                      <p className="text-xs">Combustível</p>
                      <p className="font-medium text-foreground">{vehicle.fuel}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;