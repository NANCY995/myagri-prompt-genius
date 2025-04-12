
import { useState, useRef } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  onImageSelected: (imageUrl: string) => void;
  isLoading: boolean;
}

export default function ImageUploader({ onImageSelected, isLoading }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Validate file type
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      toast({
        title: "Format non supporté",
        description: "Veuillez sélectionner une image au format JPG ou PNG.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-4 transition-colors
            ${dragActive ? "border-agri-green bg-agri-green/5" : "border-border"}
            ${previewUrl ? "h-auto" : "h-64"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 rounded-md">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 text-agri-green animate-spin" />
                <p className="text-sm text-muted-foreground">Analyse en cours...</p>
              </div>
            </div>
          )}

          {previewUrl ? (
            <div className="relative w-full">
              <img 
                src={previewUrl} 
                alt="Aperçu de l'image" 
                className="w-full h-auto max-h-[500px] object-contain rounded-md" 
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPreviewUrl(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
              >
                Changer
              </Button>
            </div>
          ) : (
            <>
              <div className="rounded-full bg-muted p-6">
                <Upload className="h-8 w-8 text-agri-green" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Glissez une image ici</h3>
                <p className="text-sm text-muted-foreground">
                  Formats supportés: JPG, PNG
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={handleTriggerFileInput}>
                  Parcourir
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" /> 
                  Caméra
                </Button>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}
