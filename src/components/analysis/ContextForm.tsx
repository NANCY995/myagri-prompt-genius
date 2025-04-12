
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface CropContext {
  cropType: string;
  growthStage: string;
  location: string;
}

interface ContextFormProps {
  onSubmit: (context: CropContext) => void;
}

export default function ContextForm({ onSubmit }: ContextFormProps) {
  const [cropType, setCropType] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cropType,
      growthStage,
      location
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Contexte de culture</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="crop-type">Type de culture</Label>
            <Select value={cropType} onValueChange={setCropType} required>
              <SelectTrigger id="crop-type" className="w-full">
                <SelectValue placeholder="Sélectionner une culture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Blé</SelectItem>
                <SelectItem value="corn">Maïs</SelectItem>
                <SelectItem value="barley">Orge</SelectItem>
                <SelectItem value="soybean">Soja</SelectItem>
                <SelectItem value="rapeseed">Colza</SelectItem>
                <SelectItem value="sunflower">Tournesol</SelectItem>
                <SelectItem value="potato">Pomme de terre</SelectItem>
                <SelectItem value="vineyard">Vigne</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="growth-stage">Stade de croissance</Label>
            <Select value={growthStage} onValueChange={setGrowthStage} required>
              <SelectTrigger id="growth-stage" className="w-full">
                <SelectValue placeholder="Sélectionner un stade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="germination">Germination</SelectItem>
                <SelectItem value="seedling">Plantule</SelectItem>
                <SelectItem value="tillering">Tallage</SelectItem>
                <SelectItem value="stem-extension">Extension des tiges</SelectItem>
                <SelectItem value="heading">Épiaison</SelectItem>
                <SelectItem value="flowering">Floraison</SelectItem>
                <SelectItem value="ripening">Maturation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input 
              id="location"
              placeholder="Département ou région"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-agri-green hover:bg-agri-darkGreen">
            Appliquer le contexte
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
