
import { Leaf, Shield, AreaChart, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface DiagnosisResultProps {
  result: AnalysisResult | null;
}

export interface AnalysisResult {
  problem: {
    scientificName: string;
    commonName: string;
    description: string;
    symptoms: string[];
    stage: "initial" | "intermediate" | "advanced";
    impactPercent: number;
  };
  solutions: {
    biological: string[];
    conventional: string[];
    preventive: string[];
  };
  timeline: string;
  costs: {
    biological: number;
    conventional: number;
  };
}

export default function DiagnosisResult({ result }: DiagnosisResultProps) {
  if (!result) return null;

  const stageColor = {
    initial: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500"
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold flex items-center text-agri-green">
          <Leaf className="mr-2 h-6 w-6" />
          Diagnostic
        </CardTitle>
        <CardDescription>
          Analyse complète de la situation
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="problem" className="w-full">
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="problem">Problème</TabsTrigger>
            <TabsTrigger value="solutions">Solutions</TabsTrigger>
            <TabsTrigger value="costs">Coûts & Timing</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="problem" className="space-y-4 p-6 pt-4">
          <div>
            <h3 className="font-semibold text-lg">{result.problem.commonName}</h3>
            <p className="text-sm text-muted-foreground italic">{result.problem.scientificName}</p>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`${stageColor[result.problem.stage]} text-white`}>
              Stade {result.problem.stage}
            </Badge>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1 text-xs">
                <span>Impact sur les rendements</span>
                <span className="font-medium">{result.problem.impactPercent}%</span>
              </div>
              <Progress value={result.problem.impactPercent} className="h-2" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm">{result.problem.description}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Symptômes</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {result.problem.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="solutions" className="p-6 pt-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-600" />
              Solutions biologiques
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {result.solutions.biological.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-blue-600" />
              Solutions conventionnelles
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {result.solutions.conventional.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-purple-600" />
              Prévention future
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {result.solutions.preventive.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="costs" className="p-6 pt-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Calendrier d'action
            </h4>
            <p className="text-sm">{result.timeline}</p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium mb-2 flex items-center">
              <AreaChart className="h-4 w-4 mr-2" />
              Estimation des coûts
            </h4>
            
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Solution biologique</p>
                    <p className="text-lg font-semibold">{result.costs.biological} €/ha</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Solution conventionnelle</p>
                    <p className="text-lg font-semibold">{result.costs.conventional} €/ha</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
