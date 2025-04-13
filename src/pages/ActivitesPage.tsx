
import { useState } from "react";
import { Calendar, Clock, Filter, Plus, Search, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Types pour les activités
type ActivityType = "task" | "event" | "note";
type ActivityPriority = "high" | "medium" | "low";
type ActivityStatus = "pending" | "in-progress" | "completed";

interface Activity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  priority: ActivityPriority;
  status: ActivityStatus;
  date: string;
  tags: string[];
}

export default function ActivitesPage() {
  // États pour gérer les activités et filtres
  const [activities, setActivities] = useState<Activity[]>(generateSampleActivities());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<ActivityType | "all">("all");
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState("");
  
  // Fonction pour générer des activités d'exemple
  function generateSampleActivities(): Activity[] {
    return [
      {
        id: "1",
        title: "Inspection des cultures de maïs",
        description: "Vérifier l'état de santé des plants de maïs dans le secteur Nord",
        type: "task",
        priority: "high",
        status: "pending",
        date: "2025-04-15",
        tags: ["maïs", "inspection", "nord"]
      },
      {
        id: "2",
        title: "Commander des semences pour la saison prochaine",
        description: "Effectuer la commande des semences de blé et d'orge pour la prochaine saison",
        type: "task",
        priority: "medium",
        status: "completed",
        date: "2025-04-10",
        tags: ["commande", "semences", "blé", "orge"]
      },
      {
        id: "3",
        title: "Formation sur les nouvelles techniques d'irrigation",
        description: "Participer à la formation organisée par la chambre d'agriculture sur les techniques d'irrigation économes en eau",
        type: "event",
        priority: "medium",
        status: "pending",
        date: "2025-04-20",
        tags: ["formation", "irrigation", "économie d'eau"]
      },
      {
        id: "4",
        title: "Préparation du sol pour les plantations de printemps",
        description: "Labourer et préparer le terrain du secteur Est pour les plantations de printemps",
        type: "task",
        priority: "high",
        status: "in-progress",
        date: "2025-04-12",
        tags: ["labour", "préparation", "printemps"]
      },
      {
        id: "5",
        title: "Note sur l'apparition de taches sur les feuilles de tomates",
        description: "Observation de taches brunes sur les feuilles de tomates de la serre 2. À surveiller attentivement.",
        type: "note",
        priority: "high",
        status: "pending",
        date: "2025-04-13",
        tags: ["tomates", "maladie", "observation"]
      },
    ];
  }
  
  // Filtrer les activités en fonction des critères de recherche
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => activity.tags.includes(tag));
    
    const matchesType = selectedType === "all" || activity.type === selectedType;
    
    return matchesSearch && matchesTags && matchesType;
  });
  
  // Toutes les balises uniques dans les activités
  const allTags = Array.from(
    new Set(activities.flatMap(activity => activity.tags))
  ).sort();
  
  // Fonction pour ajouter une nouvelle activité
  const handleAddActivity = () => {
    if (!newActivityTitle.trim()) {
      toast({
        title: "Titre requis",
        description: "Veuillez saisir un titre pour l'activité",
        variant: "destructive"
      });
      return;
    }
    
    const newActivity: Activity = {
      id: `${Date.now()}`,
      title: newActivityTitle,
      description: "Nouvelle activité à compléter",
      type: "task",
      priority: "medium",
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      tags: ["nouvelle"]
    };
    
    setActivities([newActivity, ...activities]);
    setNewActivityTitle("");
    setIsAddingActivity(false);
    
    toast({
      title: "Activité ajoutée",
      description: "Votre nouvelle activité a été créée avec succès"
    });
  };
  
  // Fonction pour marquer une activité comme terminée
  const markAsCompleted = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id 
        ? { ...activity, status: "completed" } 
        : activity
    ));
    
    toast({
      title: "Activité terminée",
      description: "L'activité a été marquée comme terminée"
    });
  };
  
  // Fonction pour supprimer une activité
  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
    
    toast({
      title: "Activité supprimée",
      description: "L'activité a été supprimée avec succès"
    });
  };
  
  return (
    <div className="space-y-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Activités</h1>
        <p className="text-muted-foreground">
          Gérez vos tâches, événements et notes liées à votre exploitation agricole
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        {/* Barre de recherche */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des activités..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Menu de filtre par type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4 mr-1" />
                {selectedType === "all" ? "Tous types" : 
                  selectedType === "task" ? "Tâches" :
                  selectedType === "event" ? "Événements" : "Notes"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrer par type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedType("all")}>
                Tous types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("task")}>
                Tâches
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("event")}>
                Événements
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedType("note")}>
                Notes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Menu de filtre par tag */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Tag className="h-4 w-4 mr-1" />
                Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
              <DropdownMenuLabel>Filtrer par tag</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allTags.map(tag => (
                <DropdownMenuItem 
                  key={tag}
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  className="flex items-center justify-between"
                >
                  {tag}
                  {selectedTags.includes(tag) && <span className="text-green-500">✓</span>}
                </DropdownMenuItem>
              ))}
              {selectedTags.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setSelectedTags([])}
                    className="text-red-500"
                  >
                    Effacer les filtres
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Bouton d'ajout d'activité */}
          <Button className="bg-agri-green hover:bg-agri-darkGreen" onClick={() => setIsAddingActivity(true)}>
            <Plus className="mr-1 h-4 w-4" /> Ajouter
          </Button>
        </div>
      </div>
      
      {/* Filtres actifs */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer ml-1" 
                onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
              />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={() => setSelectedTags([])}
          >
            Effacer tous
          </Button>
        </div>
      )}
      
      {/* Formulaire d'ajout d'activité */}
      {isAddingActivity && (
        <Card className="border-dashed border-2 border-agri-green/30 bg-agri-green/5 mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Nouvelle activité</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setIsAddingActivity(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Titre
                </label>
                <Input 
                  id="title"
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  placeholder="Titre de l'activité"
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddActivity} className="bg-agri-green hover:bg-agri-darkGreen">
                  Ajouter l'activité
                </Button>
                <Button variant="outline" onClick={() => setIsAddingActivity(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Liste des activités */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 w-full md:w-fit">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">À faire</TabsTrigger>
          <TabsTrigger value="in-progress">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <ActivityList 
            activities={filteredActivities} 
            onComplete={markAsCompleted}
            onDelete={deleteActivity}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <ActivityList 
            activities={filteredActivities.filter(a => a.status === "pending")} 
            onComplete={markAsCompleted}
            onDelete={deleteActivity}
          />
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-0">
          <ActivityList 
            activities={filteredActivities.filter(a => a.status === "in-progress")} 
            onComplete={markAsCompleted}
            onDelete={deleteActivity}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <ActivityList 
            activities={filteredActivities.filter(a => a.status === "completed")} 
            onComplete={markAsCompleted}
            onDelete={deleteActivity}
          />
        </TabsContent>
      </Tabs>
      
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune activité ne correspond à vos critères de recherche</p>
          <Button 
            variant="link" 
            onClick={() => {
              setSearchQuery("");
              setSelectedTags([]);
              setSelectedType("all");
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
}

// Composant pour afficher une liste d'activités
function ActivityList({ 
  activities, 
  onComplete, 
  onDelete 
}: { 
  activities: Activity[]; 
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (activities.length === 0) {
    return (
      <Alert className="bg-muted/50">
        <AlertTitle>Aucune activité trouvée</AlertTitle>
        <AlertDescription>
          Aucune activité ne correspond à ces critères.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <Card key={activity.id} className={`
          ${activity.status === "completed" ? "bg-muted" : ""} 
          ${activity.priority === "high" ? "border-l-4 border-l-red-500" : 
            activity.priority === "medium" ? "border-l-4 border-l-yellow-500" : 
            "border-l-4 border-l-green-500"}
        `}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className={`text-lg ${activity.status === "completed" ? "line-through text-muted-foreground" : ""}`}>
                  {activity.title}
                </CardTitle>
                <div className="flex gap-2 mt-1">
                  <Badge variant={activity.type === "task" ? "default" : 
                               activity.type === "event" ? "secondary" : "outline"}
                  >
                    {activity.type === "task" ? "Tâche" : 
                     activity.type === "event" ? "Événement" : "Note"}
                  </Badge>
                  <Badge variant={activity.status === "pending" ? "outline" : 
                                 activity.status === "in-progress" ? "secondary" : 
                                 "default"}
                  >
                    {activity.status === "pending" ? "À faire" : 
                     activity.status === "in-progress" ? "En cours" : "Terminée"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {activity.status !== "completed" && (
                      <DropdownMenuItem onClick={() => onComplete(activity.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Marquer comme terminée
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600" onClick={() => onDelete(activity.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-600">
                        <path d="M3 6h18" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                      </svg>
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {activity.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              <span>{new Date(activity.date).toLocaleDateString()}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
