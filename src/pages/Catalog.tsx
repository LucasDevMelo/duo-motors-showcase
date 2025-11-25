import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Catalog = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: "",
    maxPrice: "",
    category: "",
    brand: "",
    model: ""
  });

  const translateTransmission = (transmission: string) => {
    const translations: Record<string, string> = {
      'manual': 'Manual',
      'automatic': 'Automático',
      'semi-automatic': 'Semi-automático'
    };
    return translations[transmission.toLowerCase()] || transmission;
  };

  const translateFuel = (fuel: string) => {
    const translations: Record<string, string> = {
      'gasoline': 'Gasolina',
      'diesel': 'Diesel',
      'electric': 'Elétrico',
      'hybrid': 'Híbrido',
      'flex': 'Flex'
    };
    return translations[fuel.toLowerCase()] || fuel;
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: "Erro ao carregar veículos",
        description: "Não foi possível carregar os veículos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (filters.year && !vehicle.year.toString().includes(filters.year)) return false;
      if (filters.maxPrice && vehicle.price > parseFloat(filters.maxPrice)) return false;
      if (filters.category && vehicle.category !== filters.category) return false;
      if (filters.brand && !vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
      if (filters.model && !vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) return false;
      return true;
    });
  }, [vehicles, filters]);

  const clearFilters = () => {
    setFilters({
      year: "",
      maxPrice: "",
      category: "",
      brand: "",
      model: ""
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <WhatsAppButton />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">Catálogo</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          
          {/* Filters */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Filtrar Veículos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input 
                placeholder="Ano" 
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
              />
              <Input 
                placeholder="Valor máximo (R$)" 
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              />
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="coupe">Coupé</SelectItem>
                  <SelectItem value="convertible">Conversível</SelectItem>
                  <SelectItem value="sports">Esportivo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="Audi">Audi</SelectItem>
                  <SelectItem value="BMW">BMW</SelectItem>
                  <SelectItem value="BYD">BYD</SelectItem>
                  <SelectItem value="Chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="Fiat">Fiat</SelectItem>
                  <SelectItem value="Jaguar">Jaguar</SelectItem>
                  <SelectItem value="Lexus">Lexus</SelectItem>
                  <SelectItem value="Mercedes">Mercedes</SelectItem>
                  <SelectItem value="Peugeot">Peugeot</SelectItem>
                  <SelectItem value="Porsche">Porsche</SelectItem>
                  <SelectItem value="Toyota">Toyota</SelectItem>
                  <SelectItem value="Volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="Volvo">Volvo</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Modelo" 
                value={filters.model}
                onChange={(e) => setFilters({...filters, model: e.target.value})}
              />
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="md:col-span-2 lg:col-span-1"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
          
          {/* Vehicle Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Nenhum veículo encontrado</p>
              {Object.values(filters).some(f => f !== "") && (
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Link 
                  key={vehicle.id}
                  to={`/veiculo/${vehicle.id}`}
                  className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    {vehicle.main_image_url ? (
                      <img 
                        src={vehicle.main_image_url} 
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{vehicle.name}</h3>
                    <p className="font-bold mb-4 text-primary">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(vehicle.price)}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>
                        <p className="text-xs">Ano</p>
                        <p className="font-medium text-foreground">{vehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-xs">Km</p>
                        <p className="font-medium text-foreground">
                          {vehicle.kilometers ? `${vehicle.kilometers.toLocaleString('pt-BR')} km` : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs">Câmbio</p>
                        <p className="font-medium text-foreground">{translateTransmission(vehicle.transmission)}</p>
                      </div>
                      <div>
                        <p className="text-xs">Combustível</p>
                        <p className="font-medium text-foreground">{translateFuel(vehicle.fuel)}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;