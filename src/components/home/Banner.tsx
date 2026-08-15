"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { motion } from "framer-motion"
import { loadMockDatabaseSnapshot } from "@/portal/lib/mockDatabase"

import { USE_API_AUTH } from "@/portal/api/config"
import { listEventsApi } from "@/portal/api/events"
import { mapApiEventToEventDetail } from "@/portal/api/mappers"
import eventsData from "@/data/EventsData"

function mergeWithStaticEvents(loaded: any[]): any[] {
    const staticMap = new Map(eventsData.map((e) => [e.slug, e]))
    const merged = new Map<string, any>()

    for (const ev of eventsData) {
        merged.set(ev.slug, ev)
    }
    for (const ev of loaded) {
        const staticEv = staticMap.get(ev.slug)
        if (staticEv) {
            merged.set(ev.slug, {
                ...staticEv,
                ...ev,
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

function formatCardDate(rawDate: string): string {
    if (!rawDate) return '';
    return rawDate.split('·')[0].split(' - ')[0].trim();
}

const Banner = () => {
    const [showToast, setShowToast] = useState<boolean>(true);
    const [isPromoLoading, setIsPromoLoading] = useState<boolean>(true);
    const [upcoming, setUpcoming] = useState({
        slug: "cio-100-awards-conference",
        title: "CIO 100 Awards & Conference 2026",
        date: "17-19 August, 2026",
        location: "Frisco, Texas",
        heroImage: "",
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const checkToastSetting = () => {
            const val = localStorage.getItem("gcio_show_hero_toast");
            if (val !== null) {
                setShowToast(val === "true");
            }
        };
        checkToastSetting();
        window.addEventListener("storage", checkToastSetting);
        window.addEventListener("gcio_hero_toast_change", checkToastSetting);
        return () => {
            window.removeEventListener("storage", checkToastSetting);
            window.removeEventListener("gcio_hero_toast_change", checkToastSetting);
        };
    }, []);

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
                const found = mergeWithStaticEvents(events).find(
                    (e: any) =>
                        e.registrationOpen !== false &&
                        e.lifecycleStatus !== 'past' &&
                        e.lifecycleStatus !== 'archived' &&
                        e.showHeroPromo !== false
                );
                if (isMounted) {
                    if (found) {
                        setUpcoming({
                            slug: found.slug,
                            title: found.title,
                            date: found.date,
                            location: found.location,
                            heroImage: found.heroImage || '',
                        });
                        setShowToast(true);
                    } else {
                        setShowToast(false);
                    }
                    setIsPromoLoading(false);
                }
            } catch {
                if (isMounted) setIsPromoLoading(false);
            }
        };
        void fetchEvents();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="hero-section" style={{ minHeight: "clamp(760px, 100vh, 1040px)", position: "relative", overflow: "hidden", marginTop: "0" }}>
            {/* Mobile gradient blobs - hidden on desktop, animated on mobile */}
            <div className="mobile-blobs">
                <div className="mobile-blob mobile-blob--1"></div>
                <div className="mobile-blob mobile-blob--2"></div>
                <div className="mobile-blob mobile-blob--3"></div>
                <div className="mobile-blob mobile-blob--4"></div>
            </div>

            <div className="orbit-scene" aria-hidden="true">
                <div className="orbit-core"></div>
                <div className="orbit-ring orbit-ring-one">
                    <span className="planet planet-one"></span>
                </div>
                <div className="orbit-ring orbit-ring-two orbit-reverse">
                    <span className="planet planet-two"></span>
                </div>
                <div className="orbit-ring orbit-ring-three">
                    <span className="planet planet-three"></span>
                </div>
            </div>
            <AuroraBackground className="hero-aurora-wrap" style={{ minHeight: "100vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="container hero-container" style={{ position: "relative", zIndex: 2 }}
                >
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-10 col-md-10">
                            <div className="hero-content-wrap">
                                <span className="hero-subtitle" style={{
                                    background: "var(--tg-color-gradient)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "2.5px",
                                    fontSize: "12px",
                                    marginBottom: "26px",
                                    display: "inline-block",
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                    border: "1px solid rgba(10, 60, 194, 0.15)"
                                }}>
                                    ONE GLOBAL ECOSYSTEM
                                </span>
                                <h1 className="hero-title" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: "1.2", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "20px", marginInline: "auto", maxWidth: "800px", textTransform: "none" }}>
                                    <span className="hero-title-line-one">Where Global CXOs</span>
                                    <span className="hero-title-line-two"><span className="hero-title-gradient">Converge</span></span>
                                </h1>
                                <p className="hero-desc" style={{ fontSize: "16px", color: "var(--tg-body-color)", lineHeight: 1.7, marginBottom: "36px", marginInline: "auto", maxWidth: "640px" }}>
                                    Conferences, roundtables, and a year-round peer network for<br className="d-none d-md-block" /> visionary technology leaders.
                                </p>
                                
                                <div className="hero-btn-group">
                                    <Link href="/membership" className="tg-btn tg-btn-seven hero-btn-main" style={{ padding: "14px 30px", fontSize: "14px", color: "#fff", border: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                        Request Membership
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                                            <path d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                    <Link href="/circles" className="tg-btn tg-btn-seven hero-btn-main" style={{ padding: "14px 30px", fontSize: "14px", color: "#fff", border: "none" }}>
                                        Explore Circles
                                    </Link>
                                </div>

                                <div className="mt-5 hero-stats">
                                    <div className="hero-stat-card">
                                        <h3>500+</h3>
                                        <span>Enterprise CXOs</span>
                                    </div>
                                    <div className="hero-stat-card">
                                        <h3>60+</h3>
                                        <span>Startups</span>
                                    </div>
                                    <div className="hero-stat-card">
                                        <h3>40+</h3>
                                        <span>Countries</span>
                                    </div>
                                </div>

                                {/* Subtle Scroll to Continue indicator */}
                                <div
                                    className="hero-scroll-indicator"
                                    onClick={() => {
                                        const hero = document.querySelector('.hero-section');
                                        if (hero && hero.nextElementSibling) {
                                            (hero.nextElementSibling as HTMLElement).scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                    style={{
                                        marginTop: "22px",
                                        display: "inline-flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "5px",
                                        cursor: "pointer",
                                        zIndex: 10,
                                        opacity: 0.65,
                                        transition: "opacity 0.25s ease",
                                    }}
                                >
                                    <span style={{
                                        fontSize: "10.5px",
                                        fontWeight: 600,
                                        letterSpacing: "1.8px",
                                        textTransform: "uppercase",
                                        color: "rgba(10, 60, 194, 0.75)",
                                    }}>Scroll to continue</span>
                                    <div className="scroll-arrow-bounce" style={{ color: "#0a3cc2" }}>
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AuroraBackground>

            {/* Event promo card — desktop: absolute bottom-left; mobile: flows at top */}
            {isPromoLoading ? (
                <div className="hero-event-card hero-event-card--skeleton" style={{ opacity: 0.75, pointerEvents: "none" }}>
                    <div className="hero-event-top" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <span style={{ width: "85px", height: "16px", background: "rgba(255,255,255,0.22)", borderRadius: "100px", display: "inline-block" }} />
                        <span style={{ width: "65px", height: "14px", background: "rgba(255,255,255,0.15)", borderRadius: "4px", display: "inline-block" }} />
                    </div>
                    <div style={{ width: "180px", height: "18px", background: "rgba(255,255,255,0.25)", borderRadius: "4px", marginTop: "8px" }} />
                    <div style={{ width: "120px", height: "12px", background: "rgba(255,255,255,0.15)", borderRadius: "4px", marginTop: "6px" }} />
                </div>
            ) : showToast && (
                <Link href={`/events/${upcoming.slug}`} className="hero-event-card" aria-label={`${upcoming.title} — view event details`}>
                    <span className="hero-event-arrow" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </span>
                    <div className="hero-event-top">
                        <span className="hero-event-badge">Upcoming Event</span>
                        <span className="hero-event-date">{formatCardDate(upcoming.date)}</span>
                    </div>
                    <span className="hero-event-title">{upcoming.title}</span>
                    <span className="hero-event-meta">{upcoming.location}</span>
                </Link>
            )}

            <style jsx>{`
                .hero-section {
                    margin-top: 0;
                    min-height: 100vh;
                }
                @media (min-width: 992px) {
                    .hero-section {
                        height: 100vh;
                        min-height: auto;
                    }
                    .hero-aurora-wrap {
                        min-height: 100vh !important;
                        height: 100vh !important;
                    }
                }
                .orbit-scene {
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    pointer-events: none;
                    opacity: 0.52;
                }
                .orbit-core {
                    position: absolute;
                    left: 50%;
                    top: 56%;
                    width: 96px;
                    height: 96px;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(120, 150, 235, 0.22) 0%, rgba(120, 150, 235, 0.08) 45%, rgba(120, 150, 235, 0) 75%);
                    filter: blur(0.2px);
                }
                .orbit-ring {
                    position: absolute;
                    left: 50%;
                    top: 56%;
                    width: var(--orbit-size);
                    height: var(--orbit-size);
                    margin-left: calc(var(--orbit-size) / -2);
                    margin-top: calc(var(--orbit-size) / -2);
                    border-radius: 50%;
                    border: 2px solid var(--orbit-border);
                    animation: orbit-spin var(--orbit-duration) linear infinite;
                    box-shadow:
                        inset 0 0 0 1px rgba(255,255,255,0.05),
                        0 0 24px rgba(10, 60, 194, 0.10);
                }
                .orbit-reverse {
                    animation-name: orbit-spin-reverse;
                }
                .orbit-ring-one {
                    --orbit-size: 400px;
                    --orbit-duration: 22s;
                    --orbit-border: rgba(11, 26, 74, 0.20);
                }
                .orbit-ring-two {
                    --orbit-size: 560px;
                    --orbit-duration: 30s;
                    --orbit-border: rgba(10, 60, 194, 0.22);
                }
                .orbit-ring-three {
                    --orbit-size: 720px;
                    --orbit-duration: 42s;
                    --orbit-border: rgba(159, 181, 237, 0.32);
                }
                .planet {
                    position: absolute;
                    left: 50%;
                    top: -10px;
                    transform: translateX(-50%);
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    box-shadow: 0 0 0 3px rgba(255,255,255,0.14), 0 0 18px rgba(10, 60, 194, 0.25);
                }
                .planet::after {
                    content: "";
                    position: absolute;
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    right: -14px;
                    top: 16px;
                    background: rgba(255,255,255,0.45);
                }
                .planet-one {
                    background: linear-gradient(145deg, #0B1A4A, #0A3CC2);
                }
                .planet-two {
                    background: linear-gradient(145deg, #0A3CC2, #9FB5ED);
                }
                .planet-three {
                    background: linear-gradient(145deg, #9FB5ED, #0B1A4A);
                }
                .scroll-arrow-bounce {
                    animation: scroll-bounce 2s ease-in-out infinite;
                }
                @keyframes scroll-bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(6px); }
                }
                @keyframes orbit-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes orbit-spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .hero-btn-group {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: clamp(10px, 1.4vw, 16px);
                    flex-wrap: wrap;
                }
                .hero-btn-main {
                    background: var(--tg-color-gradient) !important;
                    background-image: var(--tg-color-gradient) !important;
                    background-color: transparent !important;
                }
                .hero-btn-main::before {
                    background: var(--tg-color-gradient) !important;
                }
                .hero-btn-main:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(10, 60, 194, 0.24);
                }
                .hero-btn-outline:hover {
                    background: var(--tg-theme-primary) !important;
                    color: #fff !important;
                }
                .hero-stats {
                    display: flex;
                    justify-content: center;
                    align-items: stretch;
                    gap: clamp(14px, 1.8vw, 22px);
                    flex-wrap: wrap;
                    max-width: 660px;
                    margin-inline: auto;
                }
                .hero-stat-card {
                    flex: 1 1 0;
                    min-width: 150px;
                    text-align: center;
                    background: rgba(255,255,255,0.7);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(0,0,0,0.06);
                    border-radius: 14px;
                    padding: clamp(18px, 2vw, 24px) clamp(14px, 1.8vw, 22px);
                    box-shadow: 0 4px 18px rgba(11,26,74,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hero-stat-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 30px rgba(11,26,74,0.1);
                }
                .hero-stat-card h3 {
                    font-size: clamp(24px, 2.6vw, 30px);
                    font-weight: 700;
                    line-height: 1.05;
                    margin-bottom: 5px;
                    background: var(--tg-color-gradient);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .hero-stat-card span {
                    font-size: clamp(12.5px, 0.95vw, 14px);
                    color: var(--tg-body-color);
                    font-weight: 400;
                }

                .hero-content-wrap {
                    width: 100%;
                    max-width: 920px;
                    margin-inline: auto;
                }

                .hero-subtitle {
                    font-size: clamp(10px, 0.9vw, 12px) !important;
                    padding: clamp(5px, 0.7vw, 6px) clamp(12px, 1.5vw, 16px) !important;
                    letter-spacing: clamp(1.6px, 0.25vw, 2.5px) !important;
                }

                .hero-title {
                    font-size: clamp(38px, 5.6vw, 70px) !important;
                    line-height: 1.08 !important;
                    letter-spacing: -0.5px;
                    max-width: min(100%, 900px) !important;
                    margin-bottom: clamp(20px, 2.4vw, 28px) !important;
                }
                .hero-title-line-one,
                .hero-title-line-two {
                    display: block;
                    white-space: nowrap;
                }
                .hero-title-line-two {
                    margin-top: 6px;
                }
                .hero-title-gradient {
                    background: var(--tg-color-gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-desc {
                    font-size: clamp(17px, 1.65vw, 21px) !important;
                    line-height: 1.65 !important;
                    max-width: min(100%, 680px) !important;
                    margin-bottom: clamp(28px, 3vw, 36px) !important;
                }

                .hero-btn-main {
                    padding: clamp(13px, 1.4vw, 16px) clamp(24px, 2.8vw, 34px) !important;
                    font-size: clamp(13px, 1vw, 15px) !important;
                }

                .mt-5 {
                    margin-top: clamp(0.9rem, 1.8vw, 1.6rem) !important;
                }

                /* Desktop: scale the CONTENT down so the vertically-centered
                   block stays compact and clears the absolute bottom-left promo card
                   (which remains pinned/visible on wide screens). Deliberately touches
                   only the inner elements — never .hero-section or .hero-aurora-wrap
                   padding/min-height — so the aurora keeps filling the section and no
                   white gap can appear. */
                @media (min-width: 992px) {
                    .hero-subtitle {
                        margin-bottom: 16px !important;
                    }
                    .hero-title {
                        font-size: clamp(30px, 4.2vw, 50px) !important;
                        margin-bottom: 14px !important;
                    }
                    .hero-desc {
                        font-size: 16px !important;
                        margin-bottom: 20px !important;
                    }
                    .hero-btn-main {
                        padding: 12px 26px !important;
                        font-size: 13.5px !important;
                    }
                    .mt-5 {
                        margin-top: 0.9rem !important;
                    }
                    .hero-stat-card {
                        padding: 14px 16px !important;
                    }
                    .hero-stat-card h3 {
                        font-size: 24px !important;
                    }
                    .hero-stat-card span {
                        font-size: 12.5px !important;
                    }
                }

                /* Mobile Responsive Styles */
                @media (max-width: 991px) {
                    .hero-section {
                        margin-top: 0 !important;
                        min-height: auto !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: flex-start !important;
                    }
                    .hero-aurora-wrap {
                        flex: 1 !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: flex-start !important;
                        align-items: center !important;
                        min-height: auto !important;
                        padding-top: 68px !important;
                        padding-bottom: 16px !important;
                        margin-top: 0 !important;
                    }
                    .hero-container {
                        margin: 0 auto !important;
                    }
                    .hero-scroll-indicator {
                        display: inline-flex !important;
                        margin-top: 18px !important;
                    }
                    .orbit-scene {
                        opacity: 0.48;
                    }
                    .orbit-core {
                        top: 50%;
                        width: 76px;
                        height: 76px;
                    }
                    .orbit-ring-one {
                        --orbit-size: 340px;
                    }
                    .orbit-ring-two {
                        --orbit-size: 460px;
                    }
                    .orbit-ring-three {
                        --orbit-size: 600px;
                    }
                    .hero-title-line-one,
                    .hero-title-line-two {
                        white-space: normal;
                    }
                }
                @media (max-width: 768px) {
                    .hero-section {
                        min-height: auto !important;
                        margin-top: 0 !important;
                        padding-bottom: 12px !important;
                        background: linear-gradient(160deg, #f0f4ff 0%, #f5f7ff 50%, #f0f2ff 100%);
                    }
                    .orbit-scene {
                        display: block;
                        opacity: 0.3;
                    }
                    .orbit-core {
                        top: 50%;
                        width: 60px;
                        height: 60px;
                    }
                    .orbit-ring {
                        top: 50%;
                    }
                    .orbit-ring-one {
                        --orbit-size: 260px;
                    }
                    .orbit-ring-two {
                        --orbit-size: 360px;
                    }
                    .orbit-ring-three {
                        --orbit-size: 480px;
                    }
                    .planet {
                        width: 9px;
                        height: 9px;
                        box-shadow: 0 0 0 2px rgba(255,255,255,0.14), 0 0 14px rgba(10, 60, 194, 0.22);
                    }
                    .hero-aurora-wrap {
                        flex: 1 !important;
                        min-height: auto !important;
                        padding-top: 68px !important;
                        padding-bottom: 12px !important;
                        margin-top: 0 !important;
                        background: transparent !important;
                    }
                    .hero-content-wrap {
                        padding: 0 6px;
                    }
                     .hero-subtitle {
                        font-size: 10px !important;
                        letter-spacing: 2px !important;
                        margin-bottom: 10px !important;
                        padding: 5px 14px !important;
                        border: 1px solid rgba(10, 60, 194, 0.2) !important;
                        color: #0A3CC2 !important; /* Fallback */
                     }
                     @supports (background-clip: text) or (-webkit-background-clip: text) {
                        .hero-subtitle {
                           background: var(--tg-color-gradient) !important;
                           -webkit-background-clip: text !important;
                           background-clip: text !important;
                           -webkit-text-fill-color: transparent !important;
                        }
                     }
                    .hero-title {
                        font-size: 28px !important;
                        text-align: center !important;
                        max-width: 100% !important;
                        line-height: 1.2 !important;
                        margin-bottom: 12px !important;
                        color: #0f172a !important;
                     }
                     .hero-title .hero-title-gradient {
                        display: inline-block;
                        margin-top: 2px !important;
                        background: var(--tg-color-gradient) !important;
                        -webkit-background-clip: text !important;
                        background-clip: text !important;
                        -webkit-text-fill-color: transparent !important;
                     }
                    .hero-title-line-one,
                    .hero-title-line-two {
                        white-space: normal;
                    }
                    .hero-desc {
                        font-size: 14.5px !important;
                        margin-bottom: 20px !important;
                        text-align: center !important;
                        color: #475569 !important;
                        line-height: 1.6 !important;
                        padding: 0 8px;
                    }
                    .hero-btn-group {
                        flex-direction: row !important;
                        flex-wrap: nowrap;
                        width: auto;
                        gap: 12px;
                        justify-content: center;
                    }
                    .hero-btn-main {
                        width: auto !important;
                        padding: 12px 22px !important;
                        font-size: 13px !important;
                        white-space: nowrap;
                        border-radius: 10px !important;
                        box-shadow: 0 4px 15px rgba(10, 60, 194, 0.25) !important;
                    }
                    .hero-stats {
                        gap: 10px;
                        flex-wrap: nowrap !important;
                        margin-top: 0.75rem !important;
                    }
                    .hero-stat-card {
                        min-width: 0 !important;
                        padding: 14px 10px !important;
                        border-radius: 14px !important;
                        background: rgba(255,255,255,0.85) !important;
                        border: 1px solid rgba(10, 60, 194, 0.08) !important;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
                    }
                    .hero-stat-card h3 {
                        font-size: 21px !important;
                    }
                    .hero-stat-card span {
                        font-size: 11px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .hero-aurora-wrap {
                        padding-top: 2px !important;
                        padding-bottom: 16px !important;
                    }
                     .hero-subtitle {
                        margin-bottom: 8px !important;
                     }
                     .hero-title {
                        font-size: 25px !important;
                        margin-bottom: 10px !important;
                     }
                     .hero-title .hero-title-gradient {
                        font-size: 26px !important;
                     }
                    .hero-desc {
                        font-size: 13.5px !important;
                        margin-bottom: 16px !important;
                    }
                    .hero-btn-main {
                        padding: 11px 18px !important;
                        font-size: 12px !important;
                    }
                    .hero-stats {
                        gap: 8px !important;
                    }
                    .hero-stat-card {
                        padding: 12px 6px !important;
                    }
                    .hero-stat-card h3 {
                        font-size: 18px !important;
                    }
                    .hero-stat-card span {
                        font-size: 10px !important;
                    }
                }
                
                @media (max-width: 360px) {
                    .hero-aurora-wrap {
                        padding-top: 2px !important;
                    }
                     .hero-title {
                        font-size: 23px !important;
                     }
                     .hero-title .hero-title-gradient {
                        font-size: 24px !important;
                     }
                    .hero-btn-group {
                        flex-direction: column !important;
                        gap: 10px !important;
                    }
                    .hero-btn-main {
                        width: 100% !important;
                        text-align: center;
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    )
}

export default Banner
