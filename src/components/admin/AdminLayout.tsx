import { ReactNode, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Car, Plus, FileText, Package, LogOut, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Painel de controle", path: "/admin/dashboard" },
    { icon: Plus, label: "Adicionar carros", path: "/admin/adicionar" },
    { icon: Car, label: "Gerenciar carros", path: "/admin/gerenciar" },
    { icon: FileText, label: "Venda", path: "/admin/venda" },
    { icon: Package, label: "Consignado", path: "/admin/consignado" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
        <img src={logo} alt="DUO MOTORS" className="h-8" />
      </header>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium">User</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium border-l-4 border-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
