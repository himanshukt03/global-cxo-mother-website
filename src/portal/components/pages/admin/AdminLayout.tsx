import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useIsFetching, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/portal/api/client";
import { Badge } from "@/portal/components/ui/badge";
import {
  Award,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  CalendarDays,
  LayoutDashboard,
  Mail,
  Menu,
  MessageCircle,
  MessageSquare,
  PanelLeft,
  PanelLeftClose,
  QrCode,
  Radar,
  Settings,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import BackendConnectionAlert from "@/portal/components/BackendConnectionAlert";
import FeedbackWidget from "@/portal/components/FeedbackWidget";
import { useAuth } from "@/portal/hooks/useAuth";
import { cn } from "@/portal/lib/utils";

export type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; end: boolean };
export type NavSection = { section: string; items: NavItem[] };

export const navSections: NavSection[] = [
  {
    section: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/admin/alerts", label: "Alerts", icon: Bell, end: false },
    ],
  },
  {
    section: "People",
    items: [
      { to: "/admin/members", label: "Members", icon: Users, end: false },
      { to: "/admin/newcomers", label: "Memberships", icon: UserPlus, end: false },
      { to: "/admin/onboarding", label: "Onboarding", icon: BookOpen, end: false },
      { to: "/admin/startups", label: "Startups", icon: Building2, end: false },
    ],
  },
  {
    section: "Programs & Sessions",
    items: [
      { to: "/admin/programs", label: "Programs", icon: Award, end: false },
      { to: "/admin/meetings", label: "Sessions", icon: MessageSquare, end: false },
      { to: "/admin/calendar", label: "Calendar", icon: Calendar, end: false },
      { to: "/admin/boomerang", label: "Boomerang", icon: Radar, end: false },
    ],
  },
  {
    section: "Events",
    items: [
      { to: "/admin/events", label: "Events", icon: CalendarDays, end: false },
    ],
  },
  {
    section: "Tools",
    items: [
      { to: "/admin/email-studio", label: "Email Studio", icon: Mail, end: false },
      { to: "/admin/qr-generator", label: "QR Codes", icon: QrCode, end: false },
      { to: "/admin/settings", label: "Settings", icon: Settings, end: false },
    ],
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { backendCatalogWarning, useApiAuth } = useAuth();

  const { data: alertCounts } = useQuery({
    queryKey: ['admin', 'alert-counts'],
    queryFn: async () => {
      try {
        const [intentRes, membershipRes] = await Promise.all([
          apiFetch<any[]>('/admin/intent-requests?status_filter=pending'),
          apiFetch<any[]>('/admin/membership-requests?status_filter=pending'),
        ]);
        return {
          pendingIntents: intentRes.length,
          pendingMemberships: membershipRes.length,
          total: intentRes.length + membershipRes.length,
        };
      } catch {
        return { pendingIntents: 0, pendingMemberships: 0, total: 0 };
      }
    },
    staleTime: 60_000,
    enabled: useApiAuth,
  });

  // Global "data in flight" signal — true whenever any React Query
  // request is fetching anywhere in the admin console. Drives the
  // Material-style linear progress bar at the top of the viewport.
  const fetchingCount = useIsFetching();
  const isFetching = fetchingCount > 0;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Top linear progress bar — Google Material loading-state guidance:
          1px indeterminate stripe at the very top of the viewport whenever
          a network request is in flight. Disappears the moment all queries
          settle. Higher z-index than the sidebar so it survives the mobile
          overlay backdrop. */}
      {isFetching && (
        <div
          className="fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-blue-100"
          role="progressbar"
          aria-label="Loading"
        >
          <div className="h-full w-1/3 animate-[admin-progress_1.4s_ease-in-out_infinite] rounded-full bg-blue-600" />
        </div>
      )}
      {/* Mobile overlay backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "flex flex-col border-r bg-white transition-all duration-200 z-40",
          // Desktop: normal sidebar
          "hidden md:flex",
          sidebarOpen ? "md:w-64" : "md:w-14",
          // Mobile: overlay
          mobileMenuOpen && "fixed inset-y-0 left-0 flex w-64 shadow-xl z-50"
        )}
        onMouseEnter={() => !sidebarOpen && setSidebarOpen(true)}
      >
        <div className={cn("flex h-16 items-center border-b", sidebarOpen ? "justify-between px-4" : "justify-center px-2")}>
          {sidebarOpen ? (
            <>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-gray-900">
                  Admin Console
                </span>
                <a
                  href="/"
                  className="text-xs font-medium text-sky-500 hover:text-sky-600 hover:underline transition-colors"
                  title="Exit to website"
                >
                  back home &rarr;
                </a>
              </div>
              <button
                onClick={() => {
                  // On mobile the sidebar is an overlay (mobileMenuOpen); this
                  // button should dismiss it entirely. On desktop it collapses
                  // the sidebar to the icon rail.
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                  else setSidebarOpen(false);
                }}
                title={mobileMenuOpen ? "Close menu" : "Collapse sidebar"}
                aria-label={mobileMenuOpen ? "Close menu" : "Collapse sidebar"}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              title="Expand sidebar"
              aria-label="Expand sidebar"
              className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <PanelLeft className="h-5 w-5" />
            </button>
          )}
        </div>
        <nav className={cn("flex flex-1 flex-col justify-between", sidebarOpen ? "p-4" : "p-2")}>
          <div>
            {navSections.map((group, gi) => (
              <div key={group.section} className={gi > 0 ? "mt-4" : ""}>
                {sidebarOpen && (
                  <div className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {group.section}
                  </div>
                )}
                {!sidebarOpen && gi > 0 && (
                  <div className="mx-2 mb-1 border-t border-gray-200" />
                )}
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      title={!sidebarOpen ? item.label : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center rounded-lg text-sm font-medium transition-colors",
                          sidebarOpen ? "gap-3 px-3 py-2" : "justify-center px-2 py-2",
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )
                      }
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {sidebarOpen && item.label}
                      {sidebarOpen && item.label === 'Alerts' && (alertCounts?.total ?? 0) > 0 && (
                        <Badge className="ml-auto bg-red-100 text-red-700 text-[10px] px-1.5">
                          {alertCounts!.total}
                        </Badge>
                      )}
                      {sidebarOpen && item.label === 'Memberships' && (alertCounts?.total ?? 0) > 0 && (
                        <Badge className="ml-auto bg-red-100 text-red-700 text-[10px] px-1.5">
                          {alertCounts!.total}
                        </Badge>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Feedback Button — positioned at bottom of sidebar (under Settings) */}
          <div className={cn("pt-3 mt-4 border-t border-gray-200", sidebarOpen ? "px-1" : "px-0")}>
            <button
              onClick={() => {
                setFeedbackOpen(true);
                setMobileMenuOpen(false);
              }}
              title={!sidebarOpen ? "Submit Feedback" : undefined}
              className={cn(
                "flex w-full items-center rounded-lg text-sm font-medium transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                sidebarOpen ? "gap-3 px-3 py-2" : "justify-center px-2 py-2"
              )}
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-slate-500" />
              {sidebarOpen && <span>Submit Feedback</span>}
            </button>
          </div>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header bar */}
        <div className="flex md:hidden items-center justify-between h-14 px-4 border-b bg-white shrink-0">
          <div className="flex items-center">
            <button onClick={() => { setSidebarOpen(true); setMobileMenuOpen((v) => !v); }} className="p-2">
              <Menu className="h-5 w-5" />
            </button>
            <span className="ml-2 font-semibold text-gray-900">Admin Console</span>
          </div>
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-slate-500" />
            <span>Feedback</span>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div>
            {useApiAuth && backendCatalogWarning && (
              <div className="p-4 pb-0 sm:p-6 sm:pb-0 lg:p-8 lg:pb-0">
                <BackendConnectionAlert warning={backendCatalogWarning} />
              </div>
            )}
            <Outlet />
          </div>
        </main>
      </div>

      <FeedbackWidget
        showFloatingButton={false}
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </div>
  );
};

export default AdminLayout;
