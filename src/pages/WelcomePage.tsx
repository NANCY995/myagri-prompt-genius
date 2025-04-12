
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function WelcomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Bienvenue sur MyAgri",
      description: "Votre assistant intelligent pour l'agriculture de précision",
      image: ""
    },
    {
      title: "Analyse d'images avancée",
      description: "Identifiez rapidement les maladies et parasites de vos cultures",
      image: ""
    },
    {
      title: "Base de données complète",
      description: "Accédez à des datasets de référence et personnalisez vos analyses",
      image: ""
    }
  ];
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-agri-background">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-agri-green mb-2">MyAgri</h1>
            <span className="bg-white text-agri-green px-2 py-0.5 text-xs rounded">ALPHA</span>
          </div>
          
          <div className="relative mb-10 h-64">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <h2 className="text-xl font-semibold mb-2">{slide.title}</h2>
                  <p className="text-muted-foreground">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === currentSlide ? 'bg-agri-green' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="ghost" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="text-agri-green hover:text-agri-darkGreen"
            >
              Précédent
            </Button>
            
            {currentSlide < slides.length - 1 ? (
              <Button 
                onClick={nextSlide}
                className="bg-agri-green hover:bg-agri-darkGreen text-white"
              >
                Suivant
              </Button>
            ) : (
              <Link to="/user-type">
                <Button className="bg-agri-green hover:bg-agri-darkGreen text-white">
                  Commencer <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
