
import { X, Home, Leaf, BarChart3, Newspaper, Settings, HelpCircle, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { toast } = useToast();

  const navItems = [
    { label: "Accueil", icon: <Home size={18} />, path: "/home" },
    { label: "Démarrer une analyse", icon: <Leaf size={18} />, path: "/analyse" },
    { label: "Simulation", icon: <BarChart3 size={18} />, path: "/simulation" },
    { label: "Agri Actu", icon: <Newspaper size={18} />, path: "/actualites" },
    { label: "Paramètres", icon: <Settings size={18} />, path: "/parametres" },
    { label: "Aide & Support", icon: <HelpCircle size={18} />, path: "/aide" },
  ];
  
  // Récupérer les informations de l'utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem("myagri_user") || "{}");
  
  const handleLogout = () => {
    // Démonstration de déconnexion
    localStorage.removeItem("myagri_user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    onClose();
    window.location.href = "/";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[80%] sm:w-[350px] border-l border-agri-green/20 bg-background">
        <SheetHeader className="flex justify-end mb-4">
          <button onClick={onClose} className="text-agri-green hover:text-agri-darkGreen">
            <X size={24} />
          </button>
        </SheetHeader>
        
        {userInfo.name && (
          <div className="mb-6 px-3">
            <div className="flex items-center space-x-3 p-3 rounded-md bg-agri-green/5">
              <div className="w-10 h-10 rounded-full bg-agri-green flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium">{userInfo.name}</p>
                <p className="text-sm text-muted-foreground">{userInfo.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => 
                `flex items-center space-x-3 p-3 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-agri-green text-white' 
                    : 'hover:bg-agri-green/10 text-foreground'
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <Separator className="my-4" />
        
        <button 
          className="w-full flex items-center space-x-3 p-3 rounded-md text-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Se déconnecter</span>
        </button>
      </SheetContent>
    </Sheet>
  );
}
