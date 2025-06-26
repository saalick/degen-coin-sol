
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DegenShrinkPage from "./pages/DegenShrinkPage";
import ConfessionsPage from "./pages/ConfessionsPage";
import BreathingPage from "./pages/BreathingPage";
import MetricsPage from "./pages/MetricsPage";
import ChatPage from "./pages/ChatPage";
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
          <Route path="/degen-shrink" element={<DegenShrinkPage />} />
          <Route path="/confessions" element={<ConfessionsPage />} />
          <Route path="/breathing" element={<BreathingPage />} />
          <Route path="/metrics" element={<MetricsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
