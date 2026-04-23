import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  ChevronRight,
  Globe,
  DollarSign,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";

interface Developer {
  id: number;
  fullname: string;
  specialty: string;
  bio: string;
  photo_url: string;
  hourly_rate: number;
  currency: string;
}

interface Slot {
  id: number;
  slot_date: string;
  slot_time: string;
  duration_minutes: number;
}

const BUDGET_RANGES = [
  { value: "500-2000", label: "500 DA – 2,000 DA" },
  { value: "2000-5000", label: "2,000 DA – 5,000 DA" },
  { value: "5000-10000", label: "5,000 DA – 10,000 DA" },
  { value: "10000-25000", label: "10,000 DA – 25,000 DA" },
  { value: "25000+", label: "25,000 DA+" },
];

const LANGUAGES = [
  { value: "ar", label: "العربية" },
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
];

const BookDeveloper = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [projectIdea, setProjectIdea] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const data = await apiPost<{ developers: Developer[] }>(
          API_ENDPOINTS.DEVELOPERS_LIST,
          {},
          { public: true }
        );
        setDevelopers(data.developers || []);
      } catch (error) {
        console.error("Failed to fetch developers:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  // Load slots when developer is selected
  useEffect(() => {
    if (!selectedDev) return;
    const fetchSlots = async () => {
      try {
        const data = await apiPost<{ slots: Slot[] }>(
          API_ENDPOINTS.DEVELOPERS_GET,
          { developerId: selectedDev.id },
          { public: true }
        );
        setSlots(data.slots || []);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      }
    };
    fetchSlots();
  }, [selectedDev]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  // Get available dates from slots
  const availableDates = [...new Set(slots.map((s) => s.slot_date))];

  // Get time slots for selected date
  const timeSlotsForDate = selectedDate
    ? slots.filter(
        (s) => s.slot_date === selectedDate.toISOString().split("T")[0]
      )
    : [];

  const handleSubmit = async () => {
    if (!selectedDev || !selectedSlot || !projectIdea || !budgetRange || !preferredLanguage) return;
    setIsSubmitting(true);

    try {
      const data = await apiPost<{ booking: { id: number } }>(
        API_ENDPOINTS.BOOKINGS_CREATE,
        {
          developerId: selectedDev.id,
          slotId: selectedSlot.id,
          projectIdea,
          budgetRange,
          preferredLanguage,
        }
      );

      navigate(`/book/confirm?bookingId=${data.booking.id}`);
    } catch (error) {
      console.error("Failed to create booking:", error);
      setIsSubmitting(false);
    }
  };

  // Developer selection view
  if (!selectedDev) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
              {t("bookDev.title", "Book a Developer")}
            </h1>
            <p className="text-muted-foreground mt-1">
              {t("bookDev.subtitle", "Choose a developer to work with on your project")}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-32 rounded-xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {developers.map((dev, index) => (
                <motion.div
                  key={dev.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedDev(dev)}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {getInitials(dev.fullname)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-foreground">
                          {dev.fullname}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {dev.hourly_rate} {dev.currency}/hr
                        </Badge>
                      </div>
                      <p className="text-sm text-primary font-medium mb-2">{dev.specialty}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{dev.bio}</p>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Developer booking view
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => {
            setSelectedDev(null);
            setSelectedSlot(null);
            setSelectedDate(undefined);
          }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          {t("bookDev.backToList", "Back to developers")}
        </button>

        {/* Developer header */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
              {getInitials(selectedDev.fullname)}
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground text-lg">{selectedDev.fullname}</h2>
              <p className="text-sm text-primary">{selectedDev.specialty}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarIcon size={18} className="text-primary" />
              {t("bookDev.selectDate", "Select a Date")}
            </h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
              disabled={(date) => {
                const dateStr = date.toISOString().split("T")[0];
                return !availableDates.includes(dateStr);
              }}
              className="rounded-lg border"
            />

            {/* Time slots */}
            <AnimatePresence>
              {selectedDate && timeSlotsForDate.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-primary" />
                    {t("bookDev.availableSlots", "Available Times")}
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlotsForDate.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          selectedSlot?.id === slot.id
                            ? "bg-primary text-white shadow-md"
                            : "bg-muted text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {slot.slot_time.slice(0, 5)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Form */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              {t("bookDev.projectDetails", "Project Details")}
            </h3>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                {t("bookDev.projectIdea", "Project Idea")}
              </label>
              <Textarea
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                placeholder={t("bookDev.ideaPlaceholder", "Describe your project idea, goals, and any specific requirements...")}
                className="min-h-[100px]"
                id="booking-project-idea"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                <DollarSign size={14} className="text-primary" />
                {t("bookDev.budget", "Budget Range")}
              </label>
              <Select value={budgetRange} onValueChange={setBudgetRange}>
                <SelectTrigger id="booking-budget-select">
                  <SelectValue placeholder={t("bookDev.selectBudget", "Select budget range")} />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block flex items-center gap-1.5">
                <Globe size={14} className="text-primary" />
                {t("bookDev.language", "Preferred Language")}
              </label>
              <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                <SelectTrigger id="booking-language-select">
                  <SelectValue placeholder={t("bookDev.selectLanguage", "Select language")} />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedSlot || !projectIdea || !budgetRange || !preferredLanguage || isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg mt-4"
              size="lg"
              id="booking-confirm-btn"
            >
              {isSubmitting
                ? t("bookDev.submitting", "Booking...")
                : t("bookDev.confirm", "Confirm Booking")}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookDeveloper;
