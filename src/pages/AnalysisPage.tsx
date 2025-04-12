
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/analysis/ImageUploader";
import DiagnosisResult, { AnalysisResult } from "@/components/analysis/DiagnosisResult";
import ContextForm, { CropContext } from "@/components/analysis/ContextForm";
import { useToast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AnalysisPage = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [cropContext, setCropContext] = useState<CropContext | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleImageSelected = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setAnalysisResult(null); // Reset previous results
  };

  const handleContextSubmit = (context: CropContext) => {
    setCropContext(context);
    toast({
      title: "Contexte enregistré",
      description: `Culture: ${context.cropType}, Stade: ${context.growthStage}, Localisation: ${context.location}`,
    });
  };

  const handleAnalyze = () => {
    if (!selectedImageUrl) {
      toast({
        title: "Aucune image sélectionnée",
        description: "Veuillez sélectionner une image à analyser.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock response
      const mockResult: AnalysisResult = {
        problem: {
          scientificName: "Puccinia triticina",
          commonName: "Rouille brune du blé",
          description: "La rouille brune est une maladie fongique affectant principalement le blé. Elle se développe dans des conditions de température modérée (15-25°C) et d'humidité élevée.",
          symptoms: [
            "Pustules de couleur orange-brun sur les feuilles",
            "Lésions circulaires ou ovales de 1-2mm",
            "Tissus chlorotiques autour des pustules",
            "Réduction de la photosynthèse"
          ],
          stage: "intermediate",
          impactPercent: 45
        },
        solutions: {
          biological: [
            "Application de Bacillus subtilis (4kg/ha) en pulvérisation foliaire",
            "Rotation des cultures avec des espèces non-hôtes",
            "Utilisation de variétés résistantes lors du prochain semis"
          ],
          conventional: [
            "Traitement au tébuconazole (250g/ha)",
            "Application d'azoxystrobine (200g/ha) si infection sévère",
            "Pulvérisation de prothioconazole (125g/ha) préventive aux stades sensibles"
          ],
          preventive: [
            "Rotation des cultures sur 2-3 ans minimum",
            "Élimination des résidus de culture après la récolte",
            "Espacement adéquat entre les plants pour réduire l'humidité foliaire"
          ]
        },
        timeline: "Intervention urgente recommandée dans les 3-5 jours. Application en matinée par temps sec avec au moins 2 heures sans pluie après traitement.",
        costs: {
          biological: 65,
          conventional: 42
        }
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analyse terminée",
        description: "Le diagnostic est disponible ci-dessous.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Analyse de culture</h1>
        <p className="text-muted-foreground">
          Identifiez les problèmes de vos cultures et obtenez des solutions adaptées
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ImageUploader onImageSelected={handleImageSelected} isLoading={isAnalyzing} />
          
          {selectedImageUrl && !analysisResult && (
            <div className="mt-6">
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing} 
                className="w-full bg-agri-green hover:bg-agri-darkGreen"
              >
                Lancer l'analyse
              </Button>
            </div>
          )}
          
          {analysisResult && <DiagnosisResult result={analysisResult} />}
        </div>
        
        <div className="space-y-6">
          <ContextForm onSubmit={handleContextSubmit} />
          
          <Accordion type="single" collapsible className="bg-white rounded-lg border shadow-sm">
            <AccordionItem value="help">
              <AccordionTrigger className="px-6 py-4">Comment obtenir les meilleurs résultats ?</AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <ul className="space-y-2 text-sm">
                  <li>• Prenez des photos en pleine lumière, sans ombre portée</li>
                  <li>• Capturez à la fois des zones saines et infectées pour comparaison</li>
                  <li>• Incluez différentes parties de la plante (feuilles, tiges, racines si pertinent)</li>
                  <li>• Remplissez le formulaire de contexte avec précision</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
