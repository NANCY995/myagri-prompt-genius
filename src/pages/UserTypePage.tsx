
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, ShoppingBag, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function UserTypePage() {
  return (
    <div className="min-h-screen flex flex-col bg-agri-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-agri-green mb-2">MyAgri</h1>
            <p className="text-muted-foreground">
              Choisissez votre profil pour continuer
            </p>
          </div>
          
          <div className="space-y-6">
            <Link to="/register">
              <Card className="hover:border-agri-green/50 transition-all cursor-pointer">
                <CardContent className="flex items-center p-6">
                  <div className="mr-6 bg-agri-green/10 p-3 rounded-full">
                    <Sprout className="h-8 w-8 text-agri-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Agriculteur</h3>
                    <p className="text-sm text-muted-foreground">
                      Analysez vos cultures et obtenez des recommandations personnalisées
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/register">
              <Card className="hover:border-agri-green/50 transition-all cursor-pointer">
                <CardContent className="flex items-center p-6">
                  <div className="mr-6 bg-agri-green/10 p-3 rounded-full">
                    <ShoppingBag className="h-8 w-8 text-agri-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Consommateur</h3>
                    <p className="text-sm text-muted-foreground">
                      Découvrez des produits locaux et suivez leur production
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/register">
              <Button className="bg-agri-green hover:bg-agri-darkGreen text-white">
                Commencer <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
