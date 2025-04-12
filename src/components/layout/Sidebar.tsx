
import { Home, Leaf, BarChart3, Newspaper, Settings, HelpCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navItems = [
    { label: "Accueil", icon: <Home size={18} />, path: "/" },
    { label: "Démarrer une analyse", icon: <Leaf size={18} />, path: "/analyse" },
    { label: "Simulation", icon: <BarChart3 size={18} />, path: "/simulation" },
    { label: "Agri Actu", icon: <Newspaper size={18} />, path: "/actualites" },
    { label: "Paramètres", icon: <Settings size={18} />, path: "/parametres" },
  ];
  
  const secondaryItems = [
    { label: "Aide & Support", icon: <HelpCircle size={18} />, path: "/aide" },
  ];

  if (!isOpen) return null;

  return (
    <aside className={`bg-white border-r border-border h-screen hidden md:block min-w-[250px] max-w-[250px] transition-all duration-300 overflow-hidden`}>
      <ScrollArea className="h-full py-4">
        <div className="px-4 pb-4">
          <div className="flex items-center justify-center mb-6">
            <span className="font-semibold text-xl text-agri-green">MyAgri</span>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
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
          
          <Separator className="my-6" />
          
          <nav className="space-y-1">
            {secondaryItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-agri-green text-white' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`
                }
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="px-4 mt-auto pt-6">
          <Button variant="outline" className="w-full border-dashed border-agri-green/50 text-agri-green hover:text-agri-darkGreen hover:bg-agri-green/10 hover:border-agri-green">
            Passer à Pro
          </Button>
        </div>
      </ScrollArea>
    </aside>
  );
}
