import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GerenciarCarros = () => {
  const { toast } = useToast();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar veículos",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setCars(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (car: any) => {
    setEditingCar(car);
    setExistingImages(car.image_urls || []);
    setNewImages([]);
    setNewImagePreviews([]);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erro ao deletar veículo",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Veículo deletado com sucesso",
      });
      fetchCars();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (existingImages.length + newImages.length + files.length > 10) {
      toast({
        title: "Limite de imagens excedido",
        description: "Você pode adicionar no máximo 10 imagens.",
        variant: "destructive",
      });
      return;
    }

    setNewImages(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      // Upload new images
      const newImageUrls: string[] = [];
      
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i];
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

        newImageUrls.push(publicUrl);
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls];

      // Update vehicle
      const { error } = await supabase
        .from('vehicles')
        .update({
          name: editingCar.name,
          brand: editingCar.brand,
          model: editingCar.model,
          year: parseInt(editingCar.year),
          price: parseFloat(editingCar.price),
          category: editingCar.category,
          status: editingCar.status,
          kilometers: editingCar.kilometers ? parseInt(editingCar.kilometers) : null,
          transmission: editingCar.transmission,
          fuel: editingCar.fuel,
          description: editingCar.description,
          main_image_url: allImages[0] || null,
          image_urls: allImages.length > 0 ? allImages : null,
        })
        .eq('id', editingCar.id);

      if (error) throw error;

      toast({
        title: "Veículo atualizado com sucesso!",
      });

      setIsEditOpen(false);
      fetchCars();
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar veículo",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      available: "default",
      sold: "destructive",
      reserved: "secondary",
    };

    const labels: Record<string, string> = {
      available: "Disponível",
      sold: "Vendido",
      reserved: "Reservado",
    };

    return (
      <Badge
        variant={variants[status] || "default"}
        className={
          status === "available"
            ? "bg-green-100 text-green-800 hover:bg-green-200"
            : status === "sold"
            ? "bg-red-100 text-red-800 hover:bg-red-200"
            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
        }
      >
        {labels[status] || status}
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      sedan: "Sedan",
      suv: "SUV",
      coupe: "Coupé",
      roadster: "Roadster",
      hatchback: "Hatchback",
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gerenciar carros</h1>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciar carros</h1>
          <p className="text-gray-600">Veja todos os carros listados, atualize seus detalhes ou remova-os.</p>
        </div>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Foto</TableHead>
                <TableHead>Carro</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhum veículo cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                cars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                        {car.main_image_url ? (
                          <img 
                            src={car.main_image_url} 
                            alt={car.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            Sem foto
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{car.name}</p>
                        <p className="text-sm text-gray-500">{car.brand}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryLabel(car.category)}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(car.price)}
                    </TableCell>
                    <TableCell>{getStatusBadge(car.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(car)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(car.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
          <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Editar Veículo</SheetTitle>
            </SheetHeader>
            
            {editingCar && (
              <form onSubmit={handleEditSubmit} className="space-y-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Nome Completo</Label>
                    <Input 
                      id="edit-name" 
                      value={editingCar.name}
                      onChange={(e) => setEditingCar({...editingCar, name: e.target.value})}
                      required
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-brand">Marca</Label>
                    <Input 
                      id="edit-brand" 
                      value={editingCar.brand}
                      onChange={(e) => setEditingCar({...editingCar, brand: e.target.value})}
                      required
                      className="mt-1" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-model">Modelo</Label>
                    <Input 
                      id="edit-model" 
                      value={editingCar.model}
                      onChange={(e) => setEditingCar({...editingCar, model: e.target.value})}
                      required
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-year">Ano</Label>
                    <Input 
                      id="edit-year" 
                      type="number" 
                      value={editingCar.year}
                      onChange={(e) => setEditingCar({...editingCar, year: e.target.value})}
                      required
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-price">Valor (R$)</Label>
                    <Input 
                      id="edit-price" 
                      type="number" 
                      step="0.01"
                      value={editingCar.price}
                      onChange={(e) => setEditingCar({...editingCar, price: e.target.value})}
                      required
                      className="mt-1" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Categoria</Label>
                    <Select value={editingCar.category} onValueChange={(value) => setEditingCar({...editingCar, category: value})} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
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
                    <Label htmlFor="edit-transmission">Transmissão</Label>
                    <Select value={editingCar.transmission} onValueChange={(value) => setEditingCar({...editingCar, transmission: value})} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="automatic">Automático</SelectItem>
                        <SelectItem value="semi-automatic">Semi-automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-fuel">Combustível</Label>
                    <Select value={editingCar.fuel} onValueChange={(value) => setEditingCar({...editingCar, fuel: value})} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-kilometers">Quilometragem</Label>
                    <Input 
                      id="edit-kilometers" 
                      type="number"
                      value={editingCar.kilometers || ''}
                      onChange={(e) => setEditingCar({...editingCar, kilometers: e.target.value})}
                      className="mt-1" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select value={editingCar.status} onValueChange={(value) => setEditingCar({...editingCar, status: value})} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
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
                  <Label htmlFor="edit-description">Descrição</Label>
                  <Textarea
                    id="edit-description"
                    value={editingCar.description || ''}
                    onChange={(e) => setEditingCar({...editingCar, description: e.target.value})}
                    className="mt-1 min-h-32"
                  />
                </div>

                <div>
                  <Label>Imagens do Veículo</Label>
                  
                  {existingImages.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-2">Imagens existentes:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {existingImages.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Existente ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-1 left-1 bg-primary text-white text-xs px-1 py-0.5 rounded">
                                Principal
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <label htmlFor="edit-image-upload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Adicionar mais imagens
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {existingImages.length + newImages.length}/10 imagens
                        </p>
                      </div>
                    </label>
                    <input
                      id="edit-image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  {newImagePreviews.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Novas imagens:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {newImagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Nova ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={editLoading} className="flex-1">
                    {editLoading ? "Salvando..." : "Salvar alterações"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditOpen(false)}
                    disabled={editLoading}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
};

export default GerenciarCarros;
