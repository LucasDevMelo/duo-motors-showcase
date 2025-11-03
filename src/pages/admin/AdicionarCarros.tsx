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
import { X, Upload } from "lucide-react";

const AdicionarCarros = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (images.length + files.length > 10) {
      toast({
        title: "Limite de imagens excedido",
        description: "Você pode adicionar no máximo 10 imagens.",
        variant: "destructive",
      });
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images first
      const imageUrls: string[] = [];
      
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('vehicle-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('vehicle-images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }

      // Insert vehicle with images
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
        main_image_url: imageUrls[0] || null,
        image_urls: imageUrls.length > 0 ? imageUrls : null,
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

            <div>
              <Label>Imagens do Veículo (até 10)</Label>
              <div className="mt-2">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600">
                      Clique para adicionar imagens ou arraste aqui
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {images.length}/10 imagens adicionadas
                    </p>
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-1 left-1 bg-primary text-white text-xs px-2 py-1 rounded">
                          Principal
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
