import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Influencer from "./pages/Influencer";
import Brand from "./pages/Brand";
import LoginBrand from "./components/loginBrand";
import LoginInfluencer from "./components/loginInfluencer";
import InfluencerDashboard from "./pages/InfluencerDashboard";
import BrandDashboard from "./pages/BrandDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/influencer" element={<Influencer />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/loginB" element={<LoginBrand />} />
          <Route path="/loginI" element={<LoginInfluencer />} />
          <Route path="/influencer-dashboard" element={<InfluencerDashboard />} />
          <Route path="/brand-dashboard" element={<BrandDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
