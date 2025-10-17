import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const Venda = () => {
  const submissions = [
    {
      id: 1,
      image: "🚗",
      model: "TT",
      brand: "Audi",
      year: "2024",
      mileage: "14.000 km",
      version: "Roadster",
      owner: "Neymar Junior",
      phone: "(61)99999-9999",
    },
    {
      id: 2,
      image: "🚗",
      model: "RS7",
      brand: "Audi",
      year: "2022",
      mileage: "23.440 km",
      version: "Performance",
      owner: "Renan Nicolau",
      phone: "(61)99999-9999",
    },
    {
      id: 3,
      image: "🚗",
      model: "F Type",
      brand: "Jaguar",
      year: "2021",
      mileage: "40.338 km",
      version: "P300",
      owner: "John Godoi",
      phone: "(61)99999-9999",
    },
    {
      id: 4,
      image: "🚗",
      model: "500",
      brand: "Fiat",
      year: "2014",
      mileage: "100.878 km",
      version: "Sport",
      owner: "Vinícius Braga",
      phone: "(61)99999-9999",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Veículos recebidos no formulário da venda</h1>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Quilometragem</TableHead>
                <TableHead>Versão</TableHead>
                <TableHead>Nome do proprietário</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                  </TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.mileage}</TableCell>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.owner}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Venda;
