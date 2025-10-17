import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const Dashboard = () => {
  const recentCars = [
    { name: "Audi TT Roadster", id: "01/0123" },
    { name: "Bmw Z4 30i M Sport", id: "01/0123" },
    { name: "F Type P300", id: "01/0123" },
    { name: "Porsche Cayenne", id: "01/0123" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Painel de controle</h1>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Número de veículos</h2>
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div className="text-5xl font-bold mb-2">8</div>
        </Card>

        <Card className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-6">Adicionados recentemente</h2>
          <div className="space-y-3">
            {recentCars.map((car, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{car.name}</p>
                    <p className="text-sm text-gray-500">{car.id}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
