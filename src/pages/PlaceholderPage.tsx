
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";

export default function PlaceholderPage() {
  const location = useLocation();
  const path = location.pathname.slice(1); // Remove leading slash
  const pageName = path.charAt(0).toUpperCase() + path.slice(1);
  
  return (
    <div className="space-y-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{pageName}</h1>
        <p className="text-muted-foreground">
          Cette fonctionnalité sera bientôt disponible
        </p>
      </div>
      
      <Alert className="bg-agri-green/5 border-agri-green">
        <AlertCircle className="h-4 w-4 text-agri-green" />
        <AlertTitle className="text-agri-green">En développement</AlertTitle>
        <AlertDescription>
          Cette section est en cours de développement et sera disponible dans une prochaine mise à jour.
        </AlertDescription>
      </Alert>
    </div>
  );
}
