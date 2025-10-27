import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const GerenciarCarros = () => {
  const { toast } = useToast();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum veículo cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                cars.map((car) => (
                  <TableRow key={car.id}>
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
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(car.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GerenciarCarros;
