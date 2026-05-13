import { Calendar, Clock, MapPin, QrCode } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Booking } from "@/lib/bookings";

export function BookingTicketCard({ booking }: { booking: Booking }) {
  const { t } = useTranslation();
  const isUpcoming = booking.status === "upcoming";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      {/* notches */}
      <span className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-background sm:block" />
      <span className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-background sm:block" />

      <div className="flex flex-col sm:flex-row">
        {/* Main */}
        <div className="flex-1 p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t("ticket.eTicket")}
              </p>
              <h3 className="mt-0.5 text-lg font-bold leading-tight">{booking.clinicName}</h3>
            </div>
            <Badge
              className={cn(
                "shrink-0",
                isUpcoming
                  ? "bg-success text-success-foreground hover:bg-success"
                  : "bg-muted text-muted-foreground hover:bg-muted",
              )}
            >
              {isUpcoming ? t("ticket.statusUpcoming") : t("ticket.statusCompleted")}
            </Badge>
          </div>

          <div className="mb-4">
            <p className="text-xs text-muted-foreground">{t("ticket.service")}</p>
            <p className="font-semibold">{booking.serviceName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">{t("ticket.date")}</p>
              <p className="flex items-center gap-1 font-medium">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {booking.date}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t("ticket.time")}</p>
              <p className="flex items-center gap-1 font-medium">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {booking.time}
              </p>
            </div>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="relative border-t border-dashed border-border sm:border-l sm:border-t-0" />

        {/* Stub */}
        <div className="flex flex-col items-center justify-center gap-2 bg-muted/40 p-5 sm:w-44">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-background">
            <QrCode className="h-14 w-14 text-foreground" />
          </div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {t("ticket.ref")}
          </p>
          <p className="font-mono text-sm font-semibold">{booking.bookingId}</p>
        </div>
      </div>
    </div>
  );
}

export function EmptyTicketState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
        <MapPin className="h-8 w-8" />
      </div>
      <p className="font-semibold">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
