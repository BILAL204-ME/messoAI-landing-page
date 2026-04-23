import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth.tsx";
import ErrorBoundary from "./components/error-boundary.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NewProject from "./pages/NewProject.tsx";
import AIBuilder from "./pages/AIBuilder.tsx";
import BookDeveloper from "./pages/BookDeveloper.tsx";
import BookingConfirmation from "./pages/BookingConfirmation.tsx";
import Settings from "./pages/Settings.tsx";
import MyProjects from "./pages/MyProjects.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              <Route path="/builder" element={<ProtectedRoute><AIBuilder /></ProtectedRoute>} />
              <Route path="/book" element={<ProtectedRoute><BookDeveloper /></ProtectedRoute>} />
              <Route path="/book/confirm" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
