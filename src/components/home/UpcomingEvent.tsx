"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"
import { loadMockDatabaseSnapshot } from "@/portal/lib/mockDatabase"

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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 1 0 7.75" />
    </svg>
)

import { USE_API_AUTH } from "@/portal/api/config"
import { listEventsApi } from "@/portal/api/events"
import { mapApiEventToEventDetail } from "@/portal/api/mappers"
import eventsData from "@/data/EventsData"

const UpcomingEvent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [event, setEvent] = useState<{
        slug: string;
        title: string;
        tagline?: string;
        date: string;
        location: string;
        attendees: string;
        description: string;
        heroImage: string;
        bannerImage?: string;
    } | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchEvents = async () => {
            try {
                let events: any[] = [];
                if (USE_API_AUTH) {
                    try {
                        const raw = await listEventsApi(50);
                        events = raw.map((e) => mapApiEventToEventDetail(e, 0));
                    } catch {}
                }
                if (!events.length) {
                    events = loadMockDatabaseSnapshot().events;
                }
                const cricket = eventsData.find((e) => e.slug === 'mlc-oakland');
                if (cricket && !events.some((e) => e.slug === cricket.slug)) {
                    events.unshift(cricket);
                }
                const found = events.find(
                    (e: any) => e.registrationOpen !== false && e.lifecycleStatus !== 'past' && e.lifecycleStatus !== 'archived'
                );
                if (found && isMounted) {
                    setEvent({
                        slug: found.slug,
                        title: found.title,
                        tagline: found.tagline || "VIP Experience · CXO Networking",
                        date: found.date,
                        location: found.location,
                        attendees: `${found.attendees} attendees expected`,
                        description: found.description,
                        heroImage: found.heroImage || found.cardImage || found.bannerImage || "",
                    });
                }
            } catch {} finally {
                if (isMounted) setIsLoading(false);
            }
        };
        void fetchEvents();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="section-py-130" style={{ backgroundColor: "#fff" }}>
            <div className="container">
                <AnimateOnScroll>
                    <div className="row justify-content-center text-center" style={{ marginBottom: "36px" }}>
                        <div className="col-lg-7">
                            <span style={{
                                background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px",
                                marginBottom: "6px", display: "inline-block",
                            }}>
                                Upcoming Events
                            </span>
                            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 700, color: "var(--tg-heading-color)" }}>
                                Join Us at Our Next Gathering
                            </h2>
                        </div>
                    </div>
                </AnimateOnScroll>

                {isLoading ? (
                    <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px", textAlign: "center", background: "#f8fafc", borderRadius: "20px", border: "1px solid var(--tg-border-1)" }}>
                        <div className="spinner-border text-primary" role="status" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <span className="visually-hidden">Loading upcoming event...</span>
                        </div>
                    </div>
                ) : event ? (
                    <AnimateOnScroll delay={0.1}>
                        <Link href={`/events/${event.slug}`} className="upcoming-event-link" style={{ display: "block", textDecoration: "none", color: "inherit", maxWidth: "560px", margin: "0 auto" }}>
                            <div className="upcoming-event-card" style={{
                                background: "#fff", borderRadius: "20px", overflow: "hidden",
                                border: "1px solid var(--tg-border-1)", boxShadow: "0 6px 28px rgba(11,26,74,0.06)",
                                transition: "all 0.3s ease",
                            }}>
                                {(event.heroImage || event.bannerImage) && (
                                    <div className="upcoming-event-banner-wrap" style={{ position: "relative", width: "100%", aspectRatio: event.slug === 'cio-100-awards-conference' ? "1502 / 711" : "16 / 10", overflow: "hidden", background: event.slug === 'cio-100-awards-conference' ? "#060179" : "#0b1020" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={event.slug === 'cio-100-awards-conference' ? '/events/cio100Step&Repeat Banner.png' : (event.heroImage || event.bannerImage || '')} alt={event.title}
                                            className="upcoming-event-img"
                                            style={{ width: "100%", height: "100%", objectFit: event.slug === 'cio-100-awards-conference' ? "contain" : "cover", display: "block", transition: "transform 0.4s ease" }} />
                                    </div>
                                )}
                                <div className="upcoming-event-card-body" style={{ padding: "clamp(26px, 3.6vw, 42px)" }}>
                                    {event.tagline && (
                                        <span style={{
                                            background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                            fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", fontSize: "12px",
                                            marginBottom: "12px", display: "inline-block",
                                        }}>
                                            {event.tagline}
                                        </span>
                                    )}
                                    <h3 style={{ fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 700, color: "var(--tg-heading-color)", lineHeight: 1.3, marginBottom: "18px" }}>
                                        {event.title}
                                    </h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 26px", marginBottom: "18px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--tg-body-color)", fontSize: "14.5px" }}>
                                            <span style={{ color: "var(--tg-theme-primary)", display: "flex" }}><CalendarIcon /></span>
                                            <span>{event.date}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--tg-body-color)", fontSize: "14.5px" }}>
                                            <span style={{ color: "var(--tg-theme-primary)", display: "flex" }}><PinIcon /></span>
                                            <span>{event.location}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--tg-body-color)", fontSize: "14.5px" }}>
                                            <span style={{ color: "var(--tg-theme-primary)", display: "flex" }}><UsersIcon /></span>
                                            <span>{event.attendees}</span>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: "15px", color: "var(--tg-body-color)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "680px" }}>
                                        {event.description}
                                    </p>
                                    <span className="upcoming-event-cta" style={{
                                        display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--tg-heading-color)",
                                        fontWeight: 700, fontSize: "15px", transition: "gap 0.3s ease",
                                    }}>
                                        Learn More <span aria-hidden="true">→</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </AnimateOnScroll>
                ) : (
                    <AnimateOnScroll delay={0.1}>
                        <div className="text-center" style={{ maxWidth: "600px", margin: "0 auto 20px" }}>
                            <p style={{ fontSize: "16px", color: "var(--tg-body-color)", lineHeight: 1.6 }}>
                                Our upcoming executive summits and retreats are currently being curated. Stay tuned for upcoming announcements — in the meantime, explore highlights from our past events.
                            </p>
                        </div>
                    </AnimateOnScroll>
                )}

                <AnimateOnScroll delay={0.2}>
                    <div className="text-center" style={{ marginTop: "40px" }}>
                        <Link href="/events?tab=past" className="see-past-events-btn" style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "transparent", color: "var(--tg-theme-primary)", border: "1.5px solid var(--tg-theme-primary)",
                            padding: "13px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "15px", textDecoration: "none",
                            transition: "all 0.3s ease",
                        }}>
                            See Past Events <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </AnimateOnScroll>
            </div>

            <style jsx>{`
                .upcoming-event-link:hover .upcoming-event-card {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 48px rgba(11,26,74,0.12) !important;
                    border-color: var(--tg-theme-primary) !important;
                }
                .upcoming-event-link:hover .upcoming-event-img {
                    transform: scale(1.05);
                }
                .upcoming-event-link:hover .upcoming-event-cta {
                    gap: 12px;
                    color: var(--tg-theme-primary);
                }
                .see-past-events-btn:hover {
                    background: var(--tg-color-gradient) !important;
                    color: #fff !important;
                    border-color: transparent !important;
                    box-shadow: 0 8px 24px rgba(10,60,194,0.3) !important;
                }
                @media (max-width: 767px) {
                    :global(.upcoming-event-banner-wrap) {
                        aspect-ratio: 16 / 9 !important;
                        max-height: 210px !important;
                    }
                    :global(.upcoming-event-img) {
                        object-fit: contain !important;
                        background: #0b1020;
                    }
                    :global(.upcoming-event-card-body) {
                        padding: 20px 18px !important;
                    }
                }
            `}</style>
        </section>
    )
}

export default UpcomingEvent
