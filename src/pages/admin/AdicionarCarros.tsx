import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AdicionarCarros = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    category: "",
    status: "available",
    kilometers: "",
    transmission: "",
    fuel: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('vehicles').insert([{
        name: formData.name,
        brand: formData.brand,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        category: formData.category as any,
        status: formData.status as any,
        kilometers: formData.kilometers ? parseInt(formData.kilometers) : null,
        transmission: formData.transmission as any,
        fuel: formData.fuel as any,
        description: formData.description,
      }]);

      if (error) throw error;

      toast({
        title: "Carro adicionado com sucesso!",
        description: "O veículo foi cadastrado no sistema.",
      });

      navigate("/admin/gerenciar");
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar carro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Adicionar novo carro</h1>
        <p className="text-gray-600 mb-8">Preencha os detalhes para listar um novo carro.</p>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: Audi TT Roadster" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input 
                  id="marca" 
                  placeholder="Ex: Audi" 
                  value={formData.brand}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  required
                  className="mt-1" 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Input 
                  id="modelo" 
                  placeholder="Ex: TT" 
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  required
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="ano">Ano</Label>
                <Input 
                  id="ano" 
                  type="number" 
                  placeholder="2025" 
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  required
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input 
                  id="valor" 
                  type="number" 
                  step="0.01"
                  placeholder="238800" 
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                  className="mt-1" 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange('category', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="coupe">Coupé</SelectItem>
                    <SelectItem value="roadster">Roadster</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmissao">Transmissão</Label>
                <Select value={formData.transmission} onValueChange={(value) => handleChange('transmission', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="automatic">Automático</SelectItem>
                    <SelectItem value="semi-automatic">Semi-automático</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="combustivel">Tipo de combustível</Label>
                <Select value={formData.fuel} onValueChange={(value) => handleChange('fuel', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasolina</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Elétrico</SelectItem>
                    <SelectItem value="hybrid">Híbrido</SelectItem>
                    <SelectItem value="flex">Flex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="quilometragem">Quilometragem</Label>
                <Input 
                  id="quilometragem" 
                  type="number"
                  placeholder="15000" 
                  value={formData.kilometers}
                  onChange={(e) => handleChange('kilometers', e.target.value)}
                  className="mt-1" 
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)} required>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="sold">Vendido</SelectItem>
                    <SelectItem value="reserved">Reservado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva mais sobre o carro, como acessórios e outros itens..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="mt-1 min-h-32"
              />
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? "Adicionando..." : "✓ Adicionar carro"}
            </Button>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdicionarCarros;
