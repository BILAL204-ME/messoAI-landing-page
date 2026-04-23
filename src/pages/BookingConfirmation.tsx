import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  Mail,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { apiPost } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-config";

interface BookingDetail {
  id: number;
  developer_name: string;
  developer_specialty: string;
  developer_photo: string;
  slot_date: string;
  slot_time: string;
  duration_minutes: number;
  project_idea: string;
  budget_range: string;
  preferred_language: string;
  status: string;
  created_at: string;
}

const BookingConfirmation = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      try {
        const data = await apiPost<{ booking: BookingDetail }>(
          API_ENDPOINTS.BOOKINGS_GET,
          { bookingId: Number(bookingId) }
        );
        setBooking(data.booking);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const buildGoogleCalendarUrl = () => {
    if (!booking) return "#";
    const startDate = new Date(`${booking.slot_date}T${booking.slot_time}`);
    const endDate = new Date(startDate.getTime() + booking.duration_minutes * 60000);

    const formatGCal = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `Meeting with ${booking.developer_name}`,
      dates: `${formatGCal(startDate)}/${formatGCal(endDate)}`,
      details: booking.project_idea,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="h-80 rounded-xl bg-muted animate-pulse" />
        </div>
      </DashboardLayout>
    );
  }

  if (!booking) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-muted-foreground">{t("bookConfirm.notFound", "Booking not found")}</p>
          <Link to="/dashboard" className="text-primary underline mt-4 block">
            {t("bookConfirm.backToDashboard", "Back to Dashboard")}
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle2 size={40} className="text-emerald-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            {t("bookConfirm.title", "Booking Confirmed!")}
          </h1>
          <p className="text-muted-foreground">
            {t("bookConfirm.subtitle", "Your meeting has been scheduled successfully")}
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-xl p-6 mb-6 space-y-5"
        >
          {/* Developer */}
          <div className="flex items-center gap-4 pb-5 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
              {getInitials(booking.developer_name)}
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">{booking.developer_name}</h3>
              <p className="text-sm text-primary">{booking.developer_specialty}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarIcon size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{formatDate(booking.slot_date)}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock size={12} />
                {booking.slot_time.slice(0, 5)} · {booking.duration_minutes} {t("bookConfirm.minutes", "minutes")}
              </p>
            </div>
          </div>

          {/* Project Brief */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
              {t("bookConfirm.projectBrief", "Project Brief")}
            </p>
            <p className="text-sm text-foreground">{booking.project_idea}</p>
          </div>
        </motion.div>

        {/* Email Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center gap-3 mb-6"
        >
          <Mail size={20} className="text-primary shrink-0" />
          <p className="text-sm text-foreground">
            {t("bookConfirm.emailSent", "A confirmation email has been sent with the meeting details.")}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            asChild
            variant="outline"
            className="flex-1"
            id="add-to-gcal-btn"
          >
            <a href={buildGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} className="mr-2" />
              {t("bookConfirm.addToCalendar", "Add to Google Calendar")}
            </a>
          </Button>
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white"
            id="back-to-dashboard-btn"
          >
            <Link to="/dashboard">
              {t("bookConfirm.backToDashboard", "Back to Dashboard")}
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default BookingConfirmation;
