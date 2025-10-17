import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdicionarCarros = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Carro adicionado!",
      description: "O veículo foi adicionado com sucesso.",
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Adicionar novo carro</h1>
        <p className="text-gray-600 mb-8">Preencha os detalhes para listar um novo carro.</p>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Imagem</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Clique para fazer upload</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="marca">Marca</Label>
                <Input id="marca" placeholder="e.g. BMW, Mercedes, Audi..." className="mt-1" />
              </div>
              <div>
                <Label htmlFor="modelo">Modelo</Label>
                <Input id="modelo" placeholder="e.g. M3, C-Class, A4..." className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="ano">Ano</Label>
                <Input id="ano" type="number" placeholder="2025" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="valor">Valor</Label>
                <Input id="valor" placeholder="100" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Input id="categoria" placeholder="Sedan" className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="transmissao">Transmissão</Label>
                <Input id="transmissao" placeholder="Automático" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="combustivel">Tipo de combustível</Label>
                <Input id="combustivel" placeholder="Diesel" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="passageiros">Número de passageiros</Label>
                <Input id="passageiros" type="number" placeholder="5" className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Label htmlFor="condicao">Condição</Label>
                <Input id="condicao" placeholder="Usado" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="quilometragem">Quilometragem</Label>
                <Input id="quilometragem" placeholder="1000 Km" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="portas">Número de portas</Label>
                <Input id="portas" type="number" placeholder="4" className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva mais sobre o carro, como acessórios e outros itens..."
                className="mt-1 min-h-32"
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm font-medium text-yellow-800">
                FALTA O CAMPO DE VERSÃO!!!!!!!!!!!!!!
              </p>
            </div>

            <Button type="submit" className="bg-primary hover:bg-primary/90">
              ✓ Adicionar carro
            </Button>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdicionarCarros;
