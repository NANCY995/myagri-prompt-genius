
import { ArrowRight, Leaf, BarChart3, Newspaper, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Démarrer une analyse",
      description: "Identifiez rapidement les maladies et parasites de vos cultures à partir de photos.",
      icon: <Leaf className="h-10 w-10 text-agri-green" />,
      path: "/analyse"
    },
    {
      title: "Simulation compte d'exploitation",
      description: "Estimez les impacts financiers des maladies et solutions sur votre exploitation.",
      icon: <BarChart3 className="h-10 w-10 text-agri-green" />,
      path: "/simulation"
    },
    {
      title: "Actualités agricoles",
      description: "Restez informé des dernières actualités et alertes pour votre région.",
      icon: <Newspaper className="h-10 w-10 text-agri-green" />,
      path: "/actualites"
    }
  ];

  const tips = [
    "Photographiez plusieurs zones affectées pour une analyse plus précise",
    "Ajoutez des informations sur le contexte de culture pour des résultats optimaux",
    "Consultez régulièrement le calendrier agricole pour anticiper les risques"
  ];

  return (
    <div className="space-y-8 py-6">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-agri-green mb-2">
          Bienvenue sur MyAgri
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          L'assistant intelligent pour diagnostiquer et traiter les problèmes de vos cultures
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <Card key={i} className="overflow-hidden border-t-4 border-t-agri-green">
            <CardHeader className="pb-3">
              <div className="mb-3">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="ghost" 
                className="text-agri-green hover:text-agri-darkGreen hover:bg-agri-green/10 p-0"
                onClick={() => navigate(feature.path)}
              >
                Accéder
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>

      <Card className="bg-agri-green/5 border-agri-green">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-agri-green">
            <Lightbulb className="mr-2 h-5 w-5" />
            Conseils pour de meilleurs résultats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-center text-sm">
                <span className="bg-agri-green text-white rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-xs">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
