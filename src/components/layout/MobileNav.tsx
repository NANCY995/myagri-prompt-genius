
import { X, Home, Leaf, BarChart3, Newspaper, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const navItems = [
    { label: "Accueil", icon: <Home size={18} />, path: "/" },
    { label: "Démarrer une analyse", icon: <Leaf size={18} />, path: "/analyse" },
    { label: "Simulation", icon: <BarChart3 size={18} />, path: "/simulation" },
    { label: "Agri Actu", icon: <Newspaper size={18} />, path: "/actualites" },
    { label: "Paramètres", icon: <Settings size={18} />, path: "/parametres" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[80%] sm:w-[350px] border-l border-agri-green/20 bg-background">
        <SheetHeader className="flex justify-end mb-4">
          <button onClick={onClose} className="text-agri-green hover:text-agri-darkGreen">
            <X size={24} />
          </button>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
  );
}
