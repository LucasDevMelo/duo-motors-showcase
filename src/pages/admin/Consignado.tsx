import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Consignado = () => {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('consignment_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Erro ao carregar submissões",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('consignment_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erro ao deletar submissão",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Submissão deletada com sucesso",
      });
      fetchSubmissions();
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Veículos recebidos no formulário da consignação</h1>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Veículos recebidos no formulário da consignação</h1>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Modelo</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Quilometragem</TableHead>
                <TableHead>Valor desejado</TableHead>
                <TableHead>Nome do proprietário</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Nenhuma submissão de consignado recebida
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.model}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.year}</TableCell>
                    <TableCell>{item.kilometers ? `${item.kilometers} km` : '-'}</TableCell>
                    <TableCell>{item.desired_value || 'Não informado'}</TableCell>
                    <TableCell>{item.owner_name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(item.id)}
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

export default Consignado;
