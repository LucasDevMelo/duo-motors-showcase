import AdminLayout from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [vehicleCount, setVehicleCount] = useState(0);
  const [recentCars, setRecentCars] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Get vehicle count
    const { count } = await supabase
      .from('vehicles')
      .select('*', { count: 'exact', head: true });
    
    setVehicleCount(count || 0);

    // Get recent vehicles
    const { data } = await supabase
      .from('vehicles')
      .select('id, name, brand, model')
      .order('created_at', { ascending: false })
      .limit(4);
    
    setRecentCars(data || []);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Painel de controle</h1>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Número de veículos</h2>
            <Car className="w-6 h-6 text-primary" />
          </div>
          <div className="text-5xl font-bold mb-2">{vehicleCount}</div>
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
                    <p className="text-sm text-gray-500">{car.brand} {car.model}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/veiculo/${car.id}`)}
                >
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
