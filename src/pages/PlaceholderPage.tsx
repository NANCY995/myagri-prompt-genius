
import { AlertCircle, Play, Pause, RefreshCcw, Settings, DownloadCloud } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { toast } from "@/components/ui/use-toast";

export default function PlaceholderPage() {
  const location = useLocation();
  const path = location.pathname.slice(1); // Remove leading slash
  const pageName = path.charAt(0).toUpperCase() + path.slice(1);
  
  // État pour le contrôle de la simulation
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState([1]);
  const [day, setDay] = useState(1);
  const [dataPoints, setDataPoints] = useState(generateInitialData());
  
  // Fonction pour générer des données simulées
  function generateInitialData() {
    const data = [];
    for (let i = 1; i <= 30; i++) {
      data.push({
        day: i,
        rendement: Math.round(35 + Math.random() * 15),
        parasites: Math.round(5 + Math.random() * 10),
        nutriments: Math.round(70 + Math.random() * 20),
      });
    }
    return data;
  }

  // Fonction pour avancer la simulation d'un jour
  function advanceSimulation() {
    if (day < 30) {
      setDay(prev => prev + 1);
    } else {
      setIsRunning(false);
      toast({
        title: "Simulation terminée",
        description: "La période de 30 jours est terminée",
      });
    }
  }

  // Effet pour gérer l'avancement automatique de la simulation
  function handlePlayPause() {
    if (day >= 30) {
      resetSimulation();
      return;
    }
    
    setIsRunning(!isRunning);
    
    if (!isRunning) {
      // Démarrer l'intervalle uniquement si on n'est pas déjà en train de simuler
      const interval = setInterval(() => {
        advanceSimulation();
      }, 2000 / speed[0]); // Vitesse de simulation ajustable
      
      // Stocker l'ID de l'intervalle - correction du typage ici
      window.simulationInterval = interval as unknown as number;
    } else {
      // Si on met en pause, effacer l'intervalle
      clearInterval(window.simulationInterval);
    }
  }

  // Réinitialiser la simulation
  function resetSimulation() {
    clearInterval(window.simulationInterval);
    setDay(1);
    setIsRunning(false);
    setDataPoints(generateInitialData());
    toast({
      title: "Simulation réinitialisée",
      description: "Les données ont été régénérées",
    });
  }

  // Configuration des données pour le graphique
  const chartConfig = {
    rendement: { 
      label: "Rendement", 
      theme: { light: '#10b981', dark: '#10b981' } 
    },
    parasites: { 
      label: "Parasites", 
      theme: { light: '#ef4444', dark: '#f87171' } 
    },
    nutriments: { 
      label: "Nutriments", 
      theme: { light: '#3b82f6', dark: '#60a5fa' } 
    },
  };

  // Données visibles jusqu'au jour actuel
  const visibleData = dataPoints.slice(0, day);

  return (
    <div className="space-y-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{pageName}</h1>
        <p className="text-muted-foreground">
          Simulez l'évolution de vos cultures sur une période de 30 jours
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Panneau de contrôle */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Contrôles de simulation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Jour de simulation: {day}/30</span>
                <span className="text-sm font-medium">Vitesse: x{speed}</span>
              </div>
              
              <div className="flex items-center gap-2 pb-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePlayPause}
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resetSimulation}
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
                <div className="flex-1 px-2">
                  <Slider
                    defaultValue={[1]}
                    min={1}
                    max={5}
                    step={1}
                    value={speed}
                    onValueChange={setSpeed}
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-md p-3 bg-muted/30">
              <h3 className="font-medium mb-2">Résumé du jour {day}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rendement:</span>
                  <span className="font-medium text-green-600">{visibleData[day-1]?.rendement} %</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Parasites:</span>
                  <span className="font-medium text-red-600">{visibleData[day-1]?.parasites} %</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nutriments:</span>
                  <span className="font-medium text-blue-600">{visibleData[day-1]?.nutriments} %</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => {
                toast({
                  title: "Rapport téléchargé",
                  description: "Le rapport de simulation a été généré",
                });
              }}
            >
              <DownloadCloud className="mr-2 h-4 w-4" />
              Télécharger le rapport
            </Button>
          </CardFooter>
        </Card>
        
        {/* Graphique de simulation */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Évolution sur 30 jours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={visibleData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorRendement" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorParasites" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorNutriments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="rendement"
                      name="Rendement"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorRendement)"
                    />
                    <Area
                      type="monotone"
                      dataKey="parasites"
                      name="Parasites"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorParasites)"
                    />
                    <Area
                      type="monotone"
                      dataKey="nutriments"
                      name="Nutriments"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorNutriments)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Cartes d'informations diverses */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rendement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {visibleData[day-1]?.rendement}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Le rendement représente la productivité estimée de vos cultures basée sur les conditions actuelles.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Infestations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {visibleData[day-1]?.parasites}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Le niveau d'infestation par des parasites qui peut affecter négativement vos cultures.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nutriments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {visibleData[day-1]?.nutriments}%
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Le niveau de nutriments disponibles dans le sol pour nourrir vos cultures.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Alert className="bg-agri-green/5 border-agri-green mt-6">
        <AlertCircle className="h-4 w-4 text-agri-green" />
        <AlertTitle className="text-agri-green">Simulation éducative</AlertTitle>
        <AlertDescription>
          Cette simulation est destinée à des fins éducatives. Pour des prévisions plus précises, 
          utilisez nos outils d'analyse avancés basés sur vos données réelles.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    simulationInterval: number;
  }
}
