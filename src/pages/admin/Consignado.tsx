import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import audiTTImage from "@/assets/audiTTroadster.png";
import bmwZ4Image from "@/assets/bmwz4.png";
import fTypeImage from "@/assets/ftype.png";
import porscheCayenneImage from "@/assets/cayenne.png";
import porscheBoxsterImage from "@/assets/porsche1.png"; // Usando porsche1.png para o Boxster
import porsche911Image from "@/assets/porsche911.png";

const Consignado = () => {
  const submissions = [
    {
      id: 1,
      image: audiTTImage,
      model: "TT",
      brand: "Audi",
      value: "R$ -",
      owner: "Neymar Junior",
      phone: "(61)99999-9999",
    },
    {
      id: 2,
      image: audiTTImage,
      model: "RS7",
      brand: "Audi",
      value: "R$ -",
      owner: "Renan Nicolas",
      phone: "(61)99999-9999",
    },
    {
      id: 3,
      image: fTypeImage,
      model: "F Type",
      brand: "Jaguar",
      value: "R$ -",
      owner: "John Godoi",
      phone: "(61)99999-9999",
    },
    {
      id: 4,
      image: "🚗",
      model: "500",
      brand: "Fiat",
      value: "R$ -",
      owner: "Vinícius Braga",
      phone: "(61)99999-9999",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Veículos recebidos no formulário da consignação</h1>

        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Valor desejado</TableHead>
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
                  <TableCell>{item.value}</TableCell>
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

export default Consignado;
