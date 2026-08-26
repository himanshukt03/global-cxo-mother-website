"use client"
import React from "react"
import Link from "next/link"
import Header from "@/layouts/headers/Header"
import Footer from "@/layouts/footers/Footer"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"
import galleries from "@/data/GalleryData"

const PinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
)
const CameraIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2Z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
)

const GalleryPage = () => {
    return (
        <>
            <Header />
            <main className="main-area fix">
                {/* Hero */}
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
                                        Gallery
                                    </span>
                                    <h1 style={{ fontSize: "clamp(38px, 5vw, 56px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "18px", lineHeight: 1.12 }}>
                                        Moments from{" "}
                                        <span style={{ background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>the Circle</span>
                                    </h1>
                                    <p style={{ fontSize: "17px", color: "var(--tg-body-color)", lineHeight: 1.7, maxWidth: "620px", margin: "0 auto" }}>
                                        A look back at the conversations, connections, and moments that defined our gatherings.
                                    </p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Event gallery cards */}
                <section style={{ backgroundColor: "#f8f9fa", padding: "20px 0 120px" }}>
                    <div className="container">
                        <div className="row gutter-y-30 justify-content-center">
                            {galleries.map((g, i) => (
                                <div key={g.slug} className="col-lg-5 col-md-6">
                                    <AnimateOnScroll delay={0.08 * i}>
                                        <Link href={`/gallery/${g.slug}`} className="gallery-cover-link" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                                            <div className="gallery-cover-card" style={{
                                                position: "relative", borderRadius: "18px", overflow: "hidden",
                                                boxShadow: "0 6px 26px rgba(11,26,74,0.1)", transition: "all 0.3s ease",
                                                height: "340px",
                                            }}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={g.coverImage} alt={g.title} className="gallery-cover-img"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} />
                                                <div style={{
                                                    position: "absolute", inset: 0,
                                                    background: "linear-gradient(180deg, rgba(11,26,74,0) 35%, rgba(11,26,74,0.78) 100%)",
                                                }} />
                                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "26px 26px 24px" }}>
                                                    <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#fff", marginBottom: "8px", lineHeight: 1.25 }}>
                                                        {g.title}
                                                    </h3>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.85)", fontSize: "13.5px" }}>
                                                        <PinIcon /> {g.location} &middot; {g.dateRange}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </AnimateOnScroll>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .gallery-cover-link:hover .gallery-cover-card {
                    transform: translateY(-6px);
                    box-shadow: 0 22px 50px rgba(11,26,74,0.18) !important;
                }
                .gallery-cover-link:hover .gallery-cover-img {
                    transform: scale(1.06);
                }
            `}</style>
        </>
    )
}

export default GalleryPage
