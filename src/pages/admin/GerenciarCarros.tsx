import AdminLayout from "@/components/admin/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import audiTTImage from "@/assets/audiTTroadster.png";
import bmwz4Image from "@/assets/bmwz4.png";
import fTypeImage from "@/assets/ftype.png";
import cayenneImage from "@/assets/cayenne.png";

const GerenciarCarros = () => {
  const cars = [
    {
      id: 1,
      name: "TT Roadster",
      brand: "Audi",
      category: "Coupé",
      price: "R$238.800,00",
      status: "Disponível",
      image: audiTTImage,
    },
    {
      id: 2,
      name: "Bmw Z4 30i M Sport",
      brand: "BMW",
      category: "Coupé",
      price: "R$498.800,00",
      status: "Indisponível",
      image: bmwz4Image,
    },
    {
      id: 3,
      name: "F Type P300 Automático",
      brand: "Jaguar",
      category: "Coupé",
      price: "-",
      status: "Disponível",
      image: fTypeImage,
    },
    {
      id: 4,
      name: "PORSCHE CAYENNE Automático",
      brand: "Porsche",
      category: "SUV",
      price: "R$498.800,00",
      status: "Disponível",
      image: cayenneImage,
    },
  ];

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
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.name}`}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{car.name}</p>
                        <p className="text-sm text-gray-500">{car.brand}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{car.category}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={car.status === "Disponível" ? "default" : "destructive"}
                      className={
                        car.status === "Disponível"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {car.status}
                    </Badge>
                  </TableCell>
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

export default GerenciarCarros;
