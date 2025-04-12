
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpLoginPage() {
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError("Veuillez entrer votre adresse email");
      return;
    }
    
    setIsLoading(true);
    
    // Simulation d'envoi d'OTP
    setTimeout(() => {
      setIsLoading(false);
      setShowOtpInput(true);
      toast({
        title: "Code envoyé",
        description: "Un code de vérification a été envoyé à votre adresse email",
      });
    }, 1500);
  };
  
  const handleVerifyOtp = () => {
    setError(null);
    
    if (!otp || otp.length !== 6) {
      setError("Veuillez entrer le code à 6 chiffres");
      return;
    }
    
    setIsLoading(true);
    
    // Simulation de vérification d'OTP
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur MyAgri",
      });
      // Redirection vers la page d'accueil
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-agri-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-6">
            <Link to="/login">
              <Button variant="ghost" className="text-agri-green hover:bg-transparent p-0">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour
              </Button>
            </Link>
          </div>
          
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-2xl">Connexion avec OTP</CardTitle>
              <CardDescription>
                {!showOtpInput 
                  ? "Recevez un code de vérification par email"
                  : "Entrez le code reçu par email"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {!showOtpInput ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
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
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-agri-green hover:bg-agri-darkGreen"
                    disabled={isLoading}
                  >
                    {isLoading ? "Envoi en cours..." : "Envoyer le code"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Code de vérification
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Nous avons envoyé un code à {email}
                    </p>
                    
                    <div className="flex justify-center my-6">
                      <InputOTP 
                        maxLength={6}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <Button 
                      onClick={handleVerifyOtp} 
                      className="w-full bg-agri-green hover:bg-agri-darkGreen"
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? "Vérification..." : "Vérifier"}
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    
                    <div className="text-center mt-4">
                      <button 
                        type="button" 
                        onClick={() => {
                          setShowOtpInput(false);
                          setOtp("");
                        }} 
                        className="text-sm text-agri-green hover:underline"
                      >
                        Changer d'email
                      </button>
                    </div>
                    
                    <div className="text-center mt-2">
                      <button 
                        type="button" 
                        onClick={handleSendOtp} 
                        className="text-sm text-agri-green hover:underline"
                        disabled={isLoading}
                      >
                        {isLoading ? "Envoi en cours..." : "Renvoyer le code"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
