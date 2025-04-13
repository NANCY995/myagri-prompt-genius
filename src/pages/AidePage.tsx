
import { useState } from "react";
import { Search, ChevronRight, MessageSquare, FileText, HelpCircle, VideoIcon, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export default function AidePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Questions fréquentes
  const faqs = [
    {
      id: "1",
      question: "Comment démarrer une analyse d'image de culture ?",
      answer: "Pour commencer une analyse, accédez à la page 'Analyse' depuis le menu principal, puis cliquez sur le bouton 'Nouvelle analyse'. Vous pourrez ensuite télécharger une photo de votre culture et suivre les instructions à l'écran pour obtenir un diagnostic.",
      category: "analyse"
    },
    {
      id: "2",
      question: "Quels formats d'image sont pris en charge ?",
      answer: "MyAgri prend en charge les formats d'image courants : JPG, PNG et HEIC. Pour de meilleurs résultats, utilisez des images bien éclairées avec une résolution d'au moins 1280x720 pixels.",
      category: "analyse"
    },
    {
      id: "3",
      question: "Comment modifier mon profil utilisateur ?",
      answer: "Vous pouvez modifier votre profil en accédant à la page 'Paramètres' depuis le menu principal, puis en sélectionnant l'onglet 'Profil'. Vous pourrez y mettre à jour vos informations personnelles et les détails de votre exploitation.",
      category: "compte"
    },
    {
      id: "4",
      question: "Comment interpréter les résultats d'une analyse ?",
      answer: "Les résultats d'analyse affichent les problèmes potentiels détectés dans votre culture, le niveau de confiance de la détection, ainsi que des recommandations de traitement. Les zones problématiques sont mises en évidence sur l'image avec un code couleur indiquant la gravité.",
      category: "analyse"
    },
    {
      id: "5",
      question: "Quelle est la différence entre un compte gratuit et un compte premium ?",
      answer: "Un compte gratuit vous permet d'effectuer jusqu'à 5 analyses par mois avec des fonctionnalités de base. Un compte premium offre des analyses illimitées, des recommandations personnalisées plus détaillées, l'historique complet des analyses et un accès prioritaire à l'assistance client.",
      category: "compte"
    },
    {
      id: "6",
      question: "Comment fonctionne l'outil de simulation de culture ?",
      answer: "L'outil de simulation vous permet de visualiser l'évolution potentielle de vos cultures sur une période de 30 jours en fonction de différents paramètres. Vous pouvez ajuster la vitesse de la simulation et observer l'impact de différents facteurs comme les parasites et les nutriments sur votre rendement.",
      category: "outils"
    },
    {
      id: "7",
      question: "Comment contacter le support technique ?",
      answer: "Vous pouvez contacter notre équipe de support technique en utilisant le formulaire de contact dans l'onglet 'Contact' de cette page d'aide. Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 à 48 heures. Les utilisateurs premium bénéficient d'une assistance prioritaire.",
      category: "support"
    },
    {
      id: "8",
      question: "Est-ce que MyAgri fonctionne hors ligne ?",
      answer: "L'application principale nécessite une connexion internet pour effectuer des analyses et accéder à vos données. Cependant, les utilisateurs premium peuvent télécharger certaines informations pour une consultation hors ligne et synchroniser les nouvelles analyses une fois la connexion rétablie.",
      category: "technique"
    },
  ];
  
  // Articles du centre de ressources
  const resources = [
    {
      id: "1",
      title: "Guide complet de l'analyse d'images",
      description: "Apprenez à prendre des photos optimales pour obtenir les meilleurs résultats d'analyse.",
      type: "guide",
      icon: <FileText className="h-5 w-5" />,
      url: "#",
    },
    {
      id: "2",
      title: "Maladies communes des céréales",
      description: "Découvrez les parasites et maladies les plus fréquents qui touchent les cultures céréalières.",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      url: "#",
    },
    {
      id: "3",
      title: "Optimisation des traitements phytosanitaires",
      description: "Stratégies pour réduire l'utilisation de produits tout en maintenant la santé des cultures.",
      type: "guide",
      icon: <FileText className="h-5 w-5" />,
      url: "#",
    },
    {
      id: "4",
      title: "Tutoriel vidéo : Utiliser l'outil de simulation",
      description: "Apprenez à tirer le meilleur parti de l'outil de simulation de MyAgri.",
      type: "video",
      icon: <VideoIcon className="h-5 w-5" />,
      url: "#",
    },
    {
      id: "5",
      title: "Agriculture de précision pour les petites exploitations",
      description: "Comment appliquer les techniques d'agriculture de précision même à petite échelle.",
      type: "article",
      icon: <FileText className="h-5 w-5" />,
      url: "#",
    },
    {
      id: "6",
      title: "Calendrier agricole interactif",
      description: "Planifiez vos activités agricoles tout au long de l'année avec notre calendrier interactif.",
      type: "outil",
      icon: <FileText className="h-5 w-5" />,
      url: "#",
    },
  ];
  
  // Filtrer les FAQs en fonction de la recherche et de la catégorie
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery.trim() === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filtrer les ressources en fonction de la recherche
  const filteredResources = resources.filter(resource => 
    searchQuery.trim() === "" || 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Fonction pour soumettre une question
  const handleSubmitQuestion = () => {
    toast({
      title: "Question envoyée",
      description: "Nous avons reçu votre question et vous répondrons dans les meilleurs délais.",
    });
  };
  
  return (
    <div className="space-y-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Aide & Support</h1>
        <p className="text-muted-foreground">
          Trouvez des réponses à vos questions et accédez à nos ressources d'aide
        </p>
      </div>
      
      {/* Barre de recherche globale */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10 pr-4 py-6 text-lg rounded-lg border border-input bg-background shadow-sm"
          placeholder="Rechercher une question ou un sujet..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Onglets de la page d'aide */}
      <Tabs defaultValue="faq" className="space-y-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-3 lg:w-fit">
          <TabsTrigger value="faq">
            <HelpCircle className="mr-2 h-4 w-4" /> FAQ
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="mr-2 h-4 w-4" /> Ressources
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="mr-2 h-4 w-4" /> Contact
          </TabsTrigger>
        </TabsList>
        
        {/* Section FAQ */}
        <TabsContent value="faq" className="space-y-6">
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-agri-green hover:bg-agri-darkGreen" : ""}
            >
              Tout
            </Button>
            <Button
              variant={activeCategory === "analyse" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("analyse")}
              className={activeCategory === "analyse" ? "bg-agri-green hover:bg-agri-darkGreen" : ""}
            >
              Analyse
            </Button>
            <Button
              variant={activeCategory === "compte" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("compte")}
              className={activeCategory === "compte" ? "bg-agri-green hover:bg-agri-darkGreen" : ""}
            >
              Compte
            </Button>
            <Button
              variant={activeCategory === "outils" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("outils")}
              className={activeCategory === "outils" ? "bg-agri-green hover:bg-agri-darkGreen" : ""}
            >
              Outils
            </Button>
            <Button
              variant={activeCategory === "technique" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("technique")}
              className={activeCategory === "technique" ? "bg-agri-green hover:bg-agri-darkGreen" : ""}
            >
              Technique
            </Button>
            <Button
              variant={activeCategory === "support" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("support")}
              className={activeCategory === "support" ? "bg-agri-green hover:bg-agri-darkGreen" : ""}
            >
              Support
            </Button>
          </div>
          
          {/* Liste des FAQs */}
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-2">
                      <Badge className="mt-1" variant={
                        faq.category === "analyse" ? "default" :
                        faq.category === "compte" ? "secondary" :
                        faq.category === "outils" ? "outline" :
                        "default"
                      }>
                        {faq.category}
                      </Badge>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 border-l-2 border-muted mt-2">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Alert className="bg-muted/50">
              <AlertTitle>Aucun résultat trouvé</AlertTitle>
              <AlertDescription>
                Essayez de modifier votre recherche ou de changer de catégorie.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        
        {/* Section Ressources */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-agri-green/10 rounded-md">
                      {resource.icon}
                    </div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{resource.description}</CardDescription>
                </CardContent>
                <CardFooter className="bg-muted/10 pt-2">
                  <Button variant="link" className="text-agri-green hover:text-agri-darkGreen p-0" asChild>
                    <a href={resource.url} className="flex items-center gap-1">
                      Voir la ressource <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <Alert className="bg-muted/50">
              <AlertTitle>Aucune ressource trouvée</AlertTitle>
              <AlertDescription>
                Essayez de modifier votre recherche.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-center pt-4">
            <Button variant="outline" asChild>
              <a href="#" className="flex items-center gap-1">
                Explorer toutes nos ressources <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </TabsContent>
        
        {/* Section Contact */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contactez notre équipe de support</CardTitle>
              <CardDescription>
                Nous répondons généralement dans un délai de 24 à 48 heures.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium mb-1 block">
                  Nom complet
                </label>
                <Input id="contact-name" placeholder="Votre nom" />
              </div>
              
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium mb-1 block">
                  Adresse email
                </label>
                <Input id="contact-email" placeholder="votre@email.com" type="email" />
              </div>
              
              <div>
                <label htmlFor="contact-subject" className="text-sm font-medium mb-1 block">
                  Sujet
                </label>
                <Input id="contact-subject" placeholder="Sujet de votre message" />
              </div>
              
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium mb-1 block">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Décrivez votre problème en détail..."
                  className="w-full min-h-32 p-3 border rounded-md border-input bg-background text-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button className="bg-agri-green hover:bg-agri-darkGreen" onClick={handleSubmitQuestion}>
                <MessageSquare className="mr-2 h-4 w-4" /> Envoyer le message
              </Button>
            </CardFooter>
          </Card>
          
          <Separator className="my-8" />
          
          {/* Autres façons de contacter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Autres façons de nous joindre</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Chat en direct</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Discutez avec un agent du support en temps réel (Disponible en semaine de 9h à 17h)
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" /> Démarrer un chat
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Support téléphonique</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Appelez notre équipe de support pour une assistance immédiate
                  </p>
                  <p className="font-medium mt-1">+33 1 23 45 67 89</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:+33123456789">Appeler</a>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Centre de documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Explorez notre base de connaissances et guides détaillés
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Bookmark className="mr-2 h-4 w-4" /> Voir la documentation
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      {/* Section d'aide rapide */}
      <div>
        <h3 className="text-lg font-medium mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <VideoIcon className="h-6 w-6" />
            <span>Tutoriels vidéo</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <FileText className="h-6 w-6" />
            <span>Guides pratiques</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <MessageSquare className="h-6 w-6" />
            <span>Forum communautaire</span>
          </Button>
          
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <HelpCircle className="h-6 w-6" />
            <span>Diagnostic système</span>
          </Button>
        </div>
      </div>
      
      {/* Bannière feedback */}
      <Card className="bg-agri-green/5 border-agri-green/30 mt-8">
        <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Votre avis nous intéresse</h3>
            <p className="text-muted-foreground">
              Aidez-nous à améliorer MyAgri en partageant votre expérience
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-agri-green hover:bg-agri-darkGreen">
            Donner mon avis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
