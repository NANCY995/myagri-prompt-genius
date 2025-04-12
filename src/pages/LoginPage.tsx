
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, ArrowLeft, Lock, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    // Simulation d'une connexion
    setTimeout(() => {
      setIsLoading(false);
      
      // Pour démo, simulons une authentification réussie
      if (email && password) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur MyAgri",
        });
        // Redirection vers la page d'accueil
        window.location.href = "/";
      } else {
        setError("Veuillez remplir tous les champs");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-agri-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <Link to="/user-type">
              <Button variant="ghost" className="text-agri-green hover:bg-transparent p-0">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour
              </Button>
            </Link>
          </div>
          
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Connexion</CardTitle>
              <CardDescription>
                Accédez à votre compte MyAgri
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nom@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </label>
                    <Link to="/forgot-password" className="text-sm text-agri-green hover:underline">
                      Oublié?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-agri-green hover:bg-agri-darkGreen"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-muted-foreground">ou</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mb-2">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="mr-2 h-4 w-4" />
                Continuer avec Google
              </Button>
              
              <Link to="/login-otp">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Continuer avec un code OTP
                </Button>
              </Link>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas de compte ?{" "}
                  <Link to="/register" className="text-agri-green hover:underline">
                    Inscrivez-vous
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
