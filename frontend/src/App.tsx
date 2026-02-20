import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import VariableQuest from "./pages/VariableQuest";
import Learning from "./pages/Learning";
import CommentsDashboard from "./pages/CommentsDashboard";
import NotFound from "./pages/NotFound";
import { FloatingButton } from "./components/comments/FloatingButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Index />} />
          <Route path="/variable-quest" element={<VariableQuest />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:topicId" element={<Learning />} />
          <Route path="/comments-dashboard" element={<CommentsDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
