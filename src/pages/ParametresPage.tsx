
import { useState } from "react";
import { User, Mail, Lock, Bell, Shield, Globe, Save, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ParametresPage() {
  const { toast } = useToast();
  
  // États pour les paramètres utilisateur
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [language, setLanguage] = useState("fr");
  const [region, setRegion] = useState("EU");
  const [theme, setTheme] = useState("system");
  
  // Récupérer les informations de l'utilisateur connecté
  const userInfo = JSON.parse(localStorage.getItem("myagri_user") || "{}");
  
  // Schéma de validation pour le formulaire du profil
  const profileSchema = z.object({
    fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    phone: z.string().optional(),
    farm: z.string().optional(),
    location: z.string().optional(),
  });
  
  // Schéma de validation pour le formulaire de mot de passe
  const passwordSchema = z.object({
    currentPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    newPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
  
  // Configuration du formulaire de profil
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userInfo.name || "",
      email: userInfo.email || "",
      phone: userInfo.phone || "",
      farm: userInfo.farm || "",
      location: userInfo.location || "",
    },
  });
  
  // Configuration du formulaire de mot de passe
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  // Fonction pour enregistrer les modifications du profil
  const onSubmitProfile = (values: z.infer<typeof profileSchema>) => {
    // Dans une application réelle, cela enverrait les données au serveur
    const updatedUser = {
      ...userInfo,
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      farm: values.farm,
      location: values.location,
    };
    
    localStorage.setItem("myagri_user", JSON.stringify(updatedUser));
    
    toast({
      title: "Profil mis à jour",
      description: "Vos informations personnelles ont été mises à jour avec succès.",
    });
  };
  
  // Fonction pour changer le mot de passe
  const onSubmitPassword = (values: z.infer<typeof passwordSchema>) => {
    // Dans une application réelle, cela enverrait les données au serveur
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    
    passwordForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  
  // Fonction pour enregistrer les paramètres de notification
  const saveNotificationSettings = () => {
    toast({
      title: "Paramètres de notification enregistrés",
      description: "Vos préférences de notification ont été mises à jour.",
    });
  };
  
  // Fonction pour enregistrer les paramètres régionaux
  const saveRegionalSettings = () => {
    toast({
      title: "Paramètres régionaux enregistrés",
      description: "Vos préférences régionales ont été mises à jour.",
    });
  };
  
  // Fonction pour supprimer le compte
  const handleDeleteAccount = () => {
    // Dans une application réelle, cela afficherait une boîte de dialogue de confirmation
    toast({
      title: "Action non disponible",
      description: "La suppression du compte n'est pas disponible dans cette version de démonstration.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez votre compte et vos préférences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 md:grid-cols-4 lg:w-fit">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>
        
        {/* Onglet Profil */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles et les détails de votre exploitation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="Votre nom" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="votre@email.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="+33 6 12 34 56 78" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="col-span-1 md:col-span-2">
                      <Separator className="my-4" />
                      <h3 className="text-lg font-medium mb-4">Informations de l'exploitation</h3>
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="farm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de l'exploitation</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom de votre exploitation" {...field} />
                          </FormControl>
                          <FormDescription>
                            Ce nom sera utilisé dans les rapports et analyses
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Localisation</FormLabel>
                          <FormControl>
                            <Input placeholder="Région / département" {...field} />
                          </FormControl>
                          <FormDescription>
                            Aide à personnaliser les recommandations selon votre région
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="submit" className="bg-agri-green hover:bg-agri-darkGreen">
                      <Save className="mr-2 h-4 w-4" /> Enregistrer les modifications
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>
                Gérez votre mot de passe et la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-9"
                              type="password"
                              placeholder="Votre mot de passe actuel"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Nouveau mot de passe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirmer le nouveau mot de passe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="submit" className="bg-agri-green hover:bg-agri-darkGreen">
                      <Lock className="mr-2 h-4 w-4" /> Changer le mot de passe
                    </Button>
                  </div>
                </form>
              </Form>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Supprimer le compte</h3>
                <p className="text-muted-foreground mb-4">
                  Une fois que vous supprimez votre compte, toutes vos données seront définitivement effacées. Cette action est irréversible.
                </p>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  className="flex items-center"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Supprimer mon compte
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>
                Configurez comment et quand vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Méthodes de notification</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col">
                    <Label htmlFor="email-notifications" className="mb-1">Notifications par email</Label>
                    <span className="text-sm text-muted-foreground">Recevez des mises à jour par email</span>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex flex-col">
                    <Label htmlFor="sms-notifications" className="mb-1">Notifications SMS</Label>
                    <span className="text-sm text-muted-foreground">Recevez des alertes par SMS</span>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium">Types de notification</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <Label className="mb-1">Alertes météorologiques</Label>
                      <span className="text-sm text-muted-foreground">Soyez informé des conditions météorologiques extrêmes</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <Label className="mb-1">Résultats d'analyse</Label>
                      <span className="text-sm text-muted-foreground">Notifications lorsqu'une analyse est terminée</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <Label className="mb-1">Rappels de tâches</Label>
                      <span className="text-sm text-muted-foreground">Soyez notifié des tâches à venir</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <Label htmlFor="marketing-emails" className="mb-1">Emails marketing</Label>
                      <span className="text-sm text-muted-foreground">Recevez des informations sur les nouveaux produits et services</span>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-agri-green hover:bg-agri-darkGreen ml-auto"
                onClick={saveNotificationSettings}
              >
                <Save className="mr-2 h-4 w-4" /> Enregistrer les préférences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Onglet Préférences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Préférences régionales</CardTitle>
              <CardDescription>
                Personnalisez l'application selon vos préférences régionales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    La langue utilisée dans l'application
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Région</Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger id="region" className="w-full">
                      <SelectValue placeholder="Sélectionner une région" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EU">Europe</SelectItem>
                      <SelectItem value="NA">Amérique du Nord</SelectItem>
                      <SelectItem value="SA">Amérique du Sud</SelectItem>
                      <SelectItem value="AF">Afrique</SelectItem>
                      <SelectItem value="AS">Asie</SelectItem>
                      <SelectItem value="OC">Océanie</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Détermine les unités de mesure et les données régionales
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="theme">Thème de l'application</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue placeholder="Sélectionner un thème" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Clair</SelectItem>
                    <SelectItem value="dark">Sombre</SelectItem>
                    <SelectItem value="system">Automatique (système)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choisissez le thème visuel de l'application
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="units">Unités de mesure</Label>
                <Select defaultValue="metric">
                  <SelectTrigger id="units" className="w-full">
                    <SelectValue placeholder="Sélectionner des unités" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Métrique (hectares, kg, °C)</SelectItem>
                    <SelectItem value="imperial">Impérial (acres, lb, °F)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Unités utilisées pour les mesures dans l'application
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor="currency">Devise</Label>
                <Select defaultValue="eur">
                  <SelectTrigger id="currency" className="w-full">
                    <SelectValue placeholder="Sélectionner une devise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="usd">Dollar US ($)</SelectItem>
                    <SelectItem value="gbp">Livre Sterling (£)</SelectItem>
                    <SelectItem value="cad">Dollar Canadien (C$)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Devise utilisée pour les calculs financiers
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="bg-agri-green hover:bg-agri-darkGreen ml-auto"
                onClick={saveRegionalSettings}
              >
                <Globe className="mr-2 h-4 w-4" /> Enregistrer les préférences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
