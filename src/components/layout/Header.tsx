
import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MobileNav from "./MobileNav";

interface HeaderProps {
  toggleSidebar?: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  return (
    <header className="bg-agri-green text-white p-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {toggleSidebar && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="text-white hover:bg-agri-darkGreen mr-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center">
            <span className="text-xl font-bold">MyAgri</span>
            <span className="bg-white text-agri-green px-1 ml-1 text-xs rounded">ALPHA</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-agri-darkGreen">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-agri-darkGreen">
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-agri-darkGreen md:hidden"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </header>
  );
}
