
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnalysisPage from "./pages/AnalysisPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import WelcomePage from "./pages/WelcomePage";
import UserTypePage from "./pages/UserTypePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OtpLoginPage from "./pages/OtpLoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Pages d'authentification et d'onboarding */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/user-type" element={<UserTypePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login-otp" element={<OtpLoginPage />} />
          
          {/* Pages de l'application avec layout principal */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Index />} />
            <Route path="/analyse" element={<AnalysisPage />} />
            <Route path="/simulation" element={<PlaceholderPage />} />
            <Route path="/actualites" element={<PlaceholderPage />} />
            <Route path="/parametres" element={<PlaceholderPage />} />
            <Route path="/aide" element={<PlaceholderPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
