import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/portal/components/ui/badge';
import { Button } from '@/portal/components/ui/button';
import { Card } from '@/portal/components/ui/card';
import { useAuth } from '@/portal/hooks/useAuth';
import { resolveEventLifecycle, parseEventDateTimestamp } from '@/portal/lib/eventLifecycle';
import { EventCardListSkeleton } from '@/portal/components/ui/admin-skeletons';

const STATUS_COLORS: Record<string, string> = {
  current: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  past: 'bg-slate-100 text-slate-600 hover:bg-slate-100',
  archived: 'bg-red-100 text-red-600 hover:bg-red-100',
};

export default function AdminEvents(): JSX.Element {
  const { events, catalogHydrated } = useAuth();

  const sorted = [...events].sort((a, b) => {
    const order = { current: 0, past: 1, archived: 2 };
    const sa = order[resolveEventLifecycle(a)] ?? 1;
    const sb = order[resolveEventLifecycle(b)] ?? 1;
    if (sa !== sb) return sa - sb;
    return parseEventDateTimestamp(b) - parseEventDateTimestamp(a);
  });

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Events ({events.length})</h1>
          <p className="text-sm text-slate-500">Manage all GCXO events, attendees, and settings.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/admin/events/new">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      {!catalogHydrated && events.length === 0 ? (
        <EventCardListSkeleton count={5} />
      ) : (
      <div className="space-y-4">
        {sorted.map((event) => {
          const status = resolveEventLifecycle(event);
          return (
            <Link key={event.slug} to={`/admin/events/${event.slug}`}>
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{event.title}</h3>
                    <Badge className={`${STATUS_COLORS[status] ?? STATUS_COLORS.past} shrink-0`}>
                      {status}
                    </Badge>
                    {event.registrationOpen && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 shrink-0">Registration Open</Badge>
                    )}
                  </div>
                  {event.tagline && (
                    <p className="text-sm text-slate-500">{event.tagline}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <Calendar className="h-3 w-3" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </span>
                    {event.attendees && (
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Users className="h-3 w-3" /> {event.attendees}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
        {catalogHydrated && events.length === 0 && (
          <p className="text-center text-slate-400 py-12">No events yet. Create your first event.</p>
        )}
      </div>
      )}
    </div>
  );
}
