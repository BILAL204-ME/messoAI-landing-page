import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth.tsx";
import ErrorBoundary from "./components/error-boundary.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import Index from "./pages/Index.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NewProject from "./pages/NewProject.tsx";
import AIBuilder from "./pages/AIBuilder.tsx";
import BookDeveloper from "./pages/BookDeveloper.tsx";
import BookingConfirmation from "./pages/BookingConfirmation.tsx";
import Settings from "./pages/Settings.tsx";
import MyProjects from "./pages/MyProjects.tsx";
import NotFound from "./pages/NotFound.tsx";
import Features from "./pages/Features.tsx";
import AIBuilderPage from "./pages/AIBuilderPage.tsx";
import MarketplacePage from "./pages/MarketplacePage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import CareersPage from "./pages/CareersPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import CookiesPage from "./pages/CookiesPage.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminUsers from "./pages/admin/AdminUsers.tsx";
import AdminDevelopers from "./pages/admin/AdminDevelopers.tsx";
import AdminProjects from "./pages/admin/AdminProjects.tsx";
import AdminBookings from "./pages/admin/AdminBookings.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import AdminAudit from "./pages/admin/AdminAudit.tsx";

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
              <Route path="/features" element={<Features />} />
              <Route path="/ai-builder" element={<AIBuilderPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
              <Route path="/builder" element={<ProtectedRoute><AIBuilder /></ProtectedRoute>} />
              <Route path="/book" element={<ProtectedRoute><BookDeveloper /></ProtectedRoute>} />
              <Route path="/book/confirm" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
              <Route path="/admin/developers" element={<AdminRoute><AdminDevelopers /></AdminRoute>} />
              <Route path="/admin/projects" element={<AdminRoute><AdminProjects /></AdminRoute>} />
              <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
              <Route path="/admin/settings" element={<AdminRoute><AdminSettings /></AdminRoute>} />
              <Route path="/admin/audit" element={<AdminRoute><AdminAudit /></AdminRoute>} />
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
