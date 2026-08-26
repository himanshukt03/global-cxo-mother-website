"use client"
import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Header from "@/layouts/headers/Header"
import Footer from "@/layouts/footers/Footer"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"
import type { EventGallery } from "@/data/GalleryData"
import CIO100MediaAccess from "../events/CIO100MediaAccess"

const GRID_COLUMNS = 4
const ROWS_INITIAL = 3
const PHOTOS_INITIAL = GRID_COLUMNS * ROWS_INITIAL

const PinIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
)
const ArrowLeftIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
)
const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
    </svg>
)
const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
)

function Lightbox({ photos, index, onClose, onPrev, onNext }: {
    photos: EventGallery["photos"]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void
}) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") onPrev()
            if (e.key === "ArrowRight") onNext()
        }
        window.addEventListener("keydown", onKey)
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = ""
        }
    }, [onClose, onPrev, onNext])

    const photo = photos[index]

    return (
        <div onClick={onClose} style={{
            position: "fixed", inset: 0, zIndex: 9999, background: "rgba(6,10,26,0.94)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        }}>
            <button onClick={onClose} aria-label="Close" style={{
                position: "absolute", top: "22px", right: "22px", width: "44px", height: "44px", borderRadius: "50%",
                border: "none", background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <CloseIcon />
            </button>

            <span style={{
                position: "absolute", top: "26px", left: "26px", color: "rgba(255,255,255,0.7)",
                fontSize: "13.5px", fontWeight: 600, letterSpacing: "0.5px",
            }}>
                {index + 1} / {photos.length}
            </span>

            <button onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous photo" style={{
                position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)",
                width: "48px", height: "48px", borderRadius: "50%", border: "none",
                background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <ChevronIcon direction="left" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next photo" style={{
                position: "absolute", right: "18px", top: "50%", transform: "translateY(-50%)",
                width: "48px", height: "48px", borderRadius: "50%", border: "none",
                background: "rgba(255,255,255,0.1)", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <ChevronIcon direction="right" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={photo.full}
                alt={photo.alt}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "min(90vw, 1100px)", maxHeight: "86vh", objectFit: "contain", borderRadius: "6px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            />
        </div>
    )
}

const GalleryDetail = ({ gallery }: { gallery: EventGallery }) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
    const [showAll, setShowAll] = useState(false)

    const close = useCallback(() => setLightboxIndex(null), [])
    const prev = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + gallery.photos.length) % gallery.photos.length)), [gallery.photos.length])
    const next = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % gallery.photos.length)), [gallery.photos.length])

    const visiblePhotos = showAll ? gallery.photos : gallery.photos.slice(0, PHOTOS_INITIAL)
    const hasMore = !showAll && gallery.photos.length > PHOTOS_INITIAL

    return (
        <>
            <Header />
            <main className="main-area fix">
                {/* Header */}
                <section style={{ paddingTop: "120px", paddingBottom: "40px", backgroundColor: "#ffffff" }}>
                    <div className="container">
                        <AnimateOnScroll>
                            <Link href="/gallery" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none",
                                color: "var(--tg-theme-primary)", fontWeight: 700, fontSize: "14px", marginBottom: "22px",
                            }}>
                                <ArrowLeftIcon /> All Galleries
                            </Link>
                            <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "12px", lineHeight: 1.2 }}>
                                {gallery.title}
                            </h1>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--tg-body-color)", fontSize: "15px", fontWeight: 600 }}>
                                <PinIcon /> {gallery.location} &middot; {gallery.dateRange}
                            </div>
                        </AnimateOnScroll>
                    </div>
                </section>

                {/* Grid or Gated CIO100 Access */}
                {gallery.slug === "cio-100-awards-conference" ? (
                    <CIO100MediaAccess />
                ) : (
                    <section style={{ backgroundColor: "#f8f9fa", padding: "20px 0 120px" }}>
                        <div className="container">
                            <AnimateOnScroll>
                                <div className="gallery-grid">
                                {visiblePhotos.map((photo, i) => (
                                    <button
                                        key={photo.thumb}
                                        onClick={() => setLightboxIndex(i)}
                                        className="gallery-item"
                                        style={{
                                            border: "none", padding: 0, cursor: "pointer",
                                            borderRadius: "10px", overflow: "hidden", position: "relative",
                                            boxShadow: "0 2px 10px rgba(11,26,74,0.06)", aspectRatio: "1 / 1",
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={photo.thumb}
                                            alt={photo.alt}
                                            loading="lazy"
                                            className="gallery-item-img"
                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                                        />
                                        <span className="gallery-item-overlay" style={{
                                            position: "absolute", inset: 0,
                                            background: "linear-gradient(180deg, rgba(11,26,74,0) 55%, rgba(11,26,74,0.55) 100%)",
                                            opacity: 0, transition: "opacity 0.3s ease",
                                        }} />
                                    </button>
                                ))}
                            </div>
                        </AnimateOnScroll>

                        {hasMore && (
                            <div className="text-center" style={{ marginTop: "44px" }}>
                                <button onClick={() => setShowAll(true)} className="gallery-show-more-btn" style={{
                                    display: "inline-flex", alignItems: "center", gap: "8px",
                                    background: "transparent", color: "var(--tg-theme-primary)", border: "1.5px solid var(--tg-theme-primary)",
                                    padding: "13px 32px", borderRadius: "100px", fontWeight: 700, fontSize: "15px", cursor: "pointer",
                                    transition: "all 0.3s ease",
                                }}>
                                    Show All {gallery.photos.length} Photos
                                </button>
                            </div>
                        )}
                    </div>
                </section>
                )}
            </main>
            <Footer />

            {lightboxIndex !== null && (
                <Lightbox photos={gallery.photos} index={lightboxIndex} onClose={close} onPrev={prev} onNext={next} />
            )}

            <style jsx>{`
                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 14px;
                }
                @media (min-width: 576px) {
                    .gallery-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (min-width: 992px) {
                    .gallery-grid { grid-template-columns: repeat(4, 1fr); }
                }
                .gallery-item:hover .gallery-item-img {
                    transform: scale(1.08);
                }
                .gallery-item:hover .gallery-item-overlay {
                    opacity: 1;
                }
                .gallery-show-more-btn:hover {
                    background: var(--tg-color-gradient);
                    color: #fff;
                    border-color: transparent;
                    box-shadow: 0 8px 22px rgba(10,60,194,0.25);
                }
            `}</style>
        </>
    )
}

export default GalleryDetail
