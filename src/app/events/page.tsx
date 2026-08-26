"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Header from "@/layouts/headers/Header"
import Footer from "@/layouts/footers/Footer"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"
import eventsData, { type EventDetail } from "@/data/EventsData"
import { loadMockDatabaseSnapshot } from "@/portal/lib/mockDatabase"

type EventCardData = {
    slug: string
    title: string
    tagline?: string
    date: string
    location: string
    attendees: string
    attendeesSuffix?: string
    description: string
    image: string
    href: string
    external?: boolean
}

/* ---- Icons ---- */
const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
)
const PinIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
)
const UsersIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)
const ExternalIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
)

function sanitizeImageUrl(url: string | undefined | null): string {
    if (!url) return '';
    try {
        const decoded = decodeURIComponent(url);
        return encodeURI(decoded);
    } catch {
        return encodeURI(url);
    }
}

function truncate(text: string, max = 155) {
    if (text.length <= max) return text
    return `${text.slice(0, max).trimEnd()}…`
}

function EventCard({ ev, imageHeight = 220 }: { ev: EventCardData; imageHeight?: number }) {
    const isCio100 = ev.slug === "cio-100-awards-conference";
    const meta = [
        { icon: <CalendarIcon />, text: ev.date },
        { icon: <PinIcon />, text: ev.location },
    ]
    const inner = (
        <div className="event-card" style={{
            background: "#fff", borderRadius: "18px", overflow: "hidden", height: "100%",
            border: "1px solid var(--tg-border-1)", boxShadow: "0 4px 20px rgba(11,26,74,0.05)",
            display: "flex", flexDirection: "column", transition: "all 0.3s ease",
        }}>
            <div style={{
                position: "relative",
                width: "100%",
                height: `${imageHeight}px`,
                overflow: "hidden",
                background: isCio100 ? "#060179" : "transparent"
            }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sanitizeImageUrl(ev.image)} alt={ev.title} className="event-card-img" loading="lazy" decoding="async"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: isCio100 ? "contain" : "cover",
                        transition: "transform 0.4s ease"
                    }} />
            </div>
            <div style={{ padding: "26px 26px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                {ev.tagline && (
                    <span style={{
                        background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", fontSize: "11.5px",
                        marginBottom: "10px", lineHeight: 1.4,
                    }}>
                        {ev.tagline}
                    </span>
                )}
                <h3 style={{ fontSize: "21px", fontWeight: 700, color: "var(--tg-heading-color)", lineHeight: 1.3, marginBottom: "16px" }}>
                    {ev.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "18px" }}>
                    {meta.map((m, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--tg-body-color)", fontSize: "14.5px" }}>
                            <span style={{ color: "var(--tg-theme-primary)", display: "flex", flexShrink: 0 }}>{m.icon}</span>
                            <span>{m.text}</span>
                        </div>
                    ))}
                </div>
                <p className="event-card-desc" style={{ fontSize: "14.5px", color: "var(--tg-body-color)", lineHeight: 1.65, marginBottom: "20px" }}>
                    {truncate(ev.description)}
                </p>
                <div style={{ marginTop: "auto", paddingTop: "18px", borderTop: "1px solid #eef0f5" }}>
                    <span className="event-learn-more"
                        style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--tg-heading-color)", fontWeight: 700, fontSize: "15px", transition: "gap 0.3s ease" }}>
                        Learn More <ExternalIcon />
                    </span>
                </div>
            </div>
        </div>
    )

    const linkStyle: React.CSSProperties = { display: "block", height: "100%", textDecoration: "none", color: "inherit" }
    return ev.external ? (
        <a href={ev.href} target="_blank" rel="noopener noreferrer" className="event-card-link" style={linkStyle}>{inner}</a>
    ) : (
        <Link href={ev.href} className="event-card-link" style={linkStyle}>{inner}</Link>
    )
}

import { USE_API_AUTH } from "@/portal/api/config"
import { listEventsApi } from "@/portal/api/events"
import { mapApiEventToEventDetail } from "@/portal/api/mappers"

function mergeWithStaticEvents(loaded: EventDetail[]): EventDetail[] {
    const staticMap = new Map(eventsData.map((e) => [e.slug, e]))
    const merged = new Map<string, EventDetail>()

    for (const ev of eventsData) {
        merged.set(ev.slug, ev)
    }
    for (const ev of loaded) {
        const staticEv = staticMap.get(ev.slug)
        if (staticEv) {
            merged.set(ev.slug, {
                ...staticEv,
                ...ev,
                lifecycleStatus: staticEv.lifecycleStatus ?? ev.lifecycleStatus,
                registrationOpen: staticEv.registrationOpen ?? ev.registrationOpen,
                galleryUrl: staticEv.galleryUrl || ev.galleryUrl,
                heroImage: staticEv.heroImage || ev.heroImage,
                heroImageMobile: staticEv.heroImageMobile || ev.heroImageMobile || staticEv.heroImage,
                cardImage: staticEv.cardImage || ev.cardImage || staticEv.heroImage,
                bannerImage: staticEv.bannerImage || ev.bannerImage,
                gallery: staticEv.gallery?.length ? staticEv.gallery : ev.gallery,
                speakers: staticEv.speakers?.length ? staticEv.speakers : ev.speakers,
                sponsors: staticEv.sponsors?.length ? staticEv.sponsors : ev.sponsors,
                itinerary: staticEv.itinerary?.length ? staticEv.itinerary : ev.itinerary,
                highlightCards: staticEv.highlightCards?.length ? staticEv.highlightCards : ev.highlightCards,
            })
        } else {
            merged.set(ev.slug, ev)
        }
    }
    return Array.from(merged.values())
}

function parseEventDateTimestamp(event: EventDetail): number {
    if ((event as any).date_start) {
        const t = new Date((event as any).date_start).getTime();
        if (!isNaN(t)) return t;
    }
    const raw = event.date || '';
    if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(raw)) {
        const firstPart = raw.split('–')[0].split('-')[0].trim();
        const [m, d, y] = firstPart.split('/');
        const t = new Date(Number(y), Number(m) - 1, Number(d)).getTime();
        if (!isNaN(t)) return t;
    }
    const cleaned = raw.replace(/^[A-Za-z]+,\s*/, '').split('·')[0].split('–')[0].split('-')[0].trim();
    const parsed = Date.parse(cleaned);
    if (!isNaN(parsed)) return parsed;
    return 0;
}

const EventsPageContent = () => {
    const searchParams = useSearchParams()
    const [tab, setTab] = useState<"upcoming" | "past">("upcoming")
    const [allEvents, setAllEvents] = useState<EventDetail[]>(eventsData)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        let isMounted = true;
        const loadEvents = async () => {
            try {
                let list: EventDetail[] = [];
                if (USE_API_AUTH) {
                    try {
                        const raw = await listEventsApi(200);
                        list = raw.map((e) => mapApiEventToEventDetail(e, 0));
                    } catch {}
                }
                if (!list.length) {
                    list = loadMockDatabaseSnapshot().events;
                }
                const cricket = eventsData.find((e) => e.slug === 'mlc-oakland');
                if (cricket && !list.some((e) => e.slug === cricket.slug)) {
                    list.unshift(cricket);
                }
                if (isMounted) {
                    setAllEvents(mergeWithStaticEvents(list.length > 0 ? list : eventsData));
                    setIsLoading(false);
                }
            } catch {
                if (isMounted) {
                    setAllEvents(eventsData);
                    setIsLoading(false);
                }
            }
        };
        void loadEvents();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (searchParams.get("tab") === "past") setTab("past");
    }, [searchParams]);

    const upcomingEvents: EventCardData[] = allEvents
        .filter((e) => e.registrationOpen !== false && e.lifecycleStatus !== 'past' && e.lifecycleStatus !== 'archived')
        .sort((a, b) => parseEventDateTimestamp(b) - parseEventDateTimestamp(a))
        .map((e) => ({
            slug: e.slug,
            title: e.title,
            tagline: e.tagline,
            date: e.date,
            location: e.location,
            attendees: e.attendees,
            description: e.description,
            image: e.cardImage || e.heroImage || e.bannerImage,
            href: `/events/${e.slug}`,
            external: false,
        }));

    const pastEvents: EventCardData[] = allEvents
        .filter((e) => e.lifecycleStatus === 'past' || (e.registrationOpen === false && e.lifecycleStatus !== 'archived'))
        .sort((a, b) => parseEventDateTimestamp(b) - parseEventDateTimestamp(a))
        .map((e) => ({
            slug: e.slug,
            title: e.title,
            tagline: e.tagline,
            date: e.date,
            location: e.location,
            attendees: e.attendees,
            description: e.description,
            image: e.cardImage || e.heroImage || e.bannerImage,
            href: `/events/${e.slug}`,
            external: false,
        }));

    const list = tab === "upcoming" ? upcomingEvents : pastEvents;

    return (
        <>
            <Header />
            <main>
                <section style={{ paddingTop: "120px", paddingBottom: "60px", backgroundColor: "#ffffff" }}>
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <AnimateOnScroll>
                                    <span style={{
                                        background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                        fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px",
                                        marginBottom: "16px", display: "inline-block",
                                    }}>
                                        Events
                                    </span>
                                    <h1 style={{ fontSize: "clamp(38px, 5vw, 56px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "18px", lineHeight: 1.12 }}>
                                        Where Leaders{" "}
                                        <span style={{ background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Convene</span>
                                    </h1>
                                    <p style={{ fontSize: "17px", color: "var(--tg-body-color)", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
                                        Discover past highlights and upcoming gatherings that bring together the world&apos;s most
                                        innovative technology leaders.
                                    </p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tabs + cards */}
                <section style={{ backgroundColor: "#f8f9fa", padding: "60px 0 120px" }}>
                    <div className="container">
                        <div className="d-flex justify-content-center" style={{ marginBottom: "56px" }}>
                            <div style={{
                                background: "#fff", borderRadius: "100px", padding: "6px",
                                boxShadow: "0 6px 24px rgba(11,26,74,0.08)", display: "flex", gap: "4px",
                                border: "1px solid var(--tg-border-1)",
                            }}>
                                {(["upcoming", "past"] as const).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTab(t)}
                                        style={{
                                            border: "none", cursor: "pointer", padding: "9px 22px", borderRadius: "100px",
                                            fontWeight: 700, fontSize: "13.5px", transition: "all 0.3s ease", whiteSpace: "nowrap",
                                            background: tab === t ? "var(--tg-color-gradient)" : "transparent",
                                            color: tab === t ? "#fff" : "var(--tg-body-color)",
                                            boxShadow: tab === t ? "0 6px 18px rgba(10,60,194,0.28)" : "none",
                                        }}
                                    >
                                        {t === "upcoming" ? "Upcoming Events" : "Past Events"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="row gutter-y-30 justify-content-center">
                                {[1, 2].map((n) => (
                                    <div key={n} className="col-lg-4 col-md-6">
                                        <div style={{
                                            background: "#fff", borderRadius: "18px", overflow: "hidden", height: "380px",
                                            border: "1px solid var(--tg-border-1)", opacity: 0.75,
                                        }}>
                                            <div style={{ width: "100%", height: "220px", background: "#f1f5f9" }} />
                                            <div style={{ padding: "26px 26px 22px" }}>
                                                <div style={{ width: "40%", height: "14px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "12px" }} />
                                                <div style={{ width: "80%", height: "22px", background: "#e2e8f0", borderRadius: "4px", marginBottom: "16px" }} />
                                                <div style={{ width: "60%", height: "14px", background: "#e2e8f0", borderRadius: "4px" }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : list.length === 0 ? (
                            <div className="text-center" style={{ padding: "60px 20px" }}>
                                <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "12px" }}>
                                    Next Gatherings Under Curation
                                </h3>
                                <p style={{ fontSize: "16px", color: "var(--tg-body-color)", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.6 }}>
                                    We are currently preparing our next round of exclusive CXO summits and leadership retreats. Check back soon for upcoming announcements, or explore our past event highlights.
                                </p>
                                <button
                                    onClick={() => setTab("past")}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        background: "var(--tg-color-gradient)",
                                        color: "#ffffff",
                                        border: "none",
                                        padding: "12px 28px",
                                        borderRadius: "100px",
                                        fontWeight: 700,
                                        fontSize: "14.5px",
                                        cursor: "pointer",
                                        boxShadow: "0 4px 16px rgba(10,60,194,0.25)",
                                    }}
                                >
                                    Explore Past Events →
                                </button>
                            </div>
                        ) : (
                            <div className="row gutter-y-30 justify-content-center">
                                {list.map((ev, i) => (
                                    <div key={ev.slug} className="col-lg-4 col-md-6">
                                        <AnimateOnScroll delay={0.08 * (i % 3)} className="h-100">
                                            <EventCard ev={ev} imageHeight={tab === "upcoming" ? 320 : undefined} />
                                        </AnimateOnScroll>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .event-card-link:hover .event-card {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 48px rgba(11,26,74,0.12) !important;
                    border-color: var(--tg-theme-primary) !important;
                }
                .event-card-link:hover .event-card-img {
                    transform: scale(1.06);
                }
                .event-card-link:hover .event-learn-more {
                    gap: 12px;
                    color: var(--tg-theme-primary);
                }
                .event-card-desc {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </>
    )
}

const EventsPage = () => (
    <React.Suspense fallback={null}>
        <EventsPageContent />
    </React.Suspense>
)

export default EventsPage
