
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  
  // Simulation d'une vérification d'authentification simplifiée
  // Dans une application réelle, vous utiliseriez un système d'auth complet
  useEffect(() => {
    // Cette vérification est simpliste à des fins de démonstration
    // Normalement vous utiliseriez un token JWT ou une session
    const isLoggedIn = localStorage.getItem("myagri_user");
    
    if (!isLoggedIn) {
      // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
      navigate("/login");
      return;
    }
  }, [navigate]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 overflow-auto bg-agri-background leaf-pattern p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
