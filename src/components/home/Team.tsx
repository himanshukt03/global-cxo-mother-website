"use client"
import React from "react"
import Link from "next/link"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"

const Team = () => {
    return (
        <section id="membership" className="section-py-130" style={{ backgroundColor: "#f7f8fc", position: "relative", overflow: "hidden", paddingBottom: "90px" }}>
            <div className="container" style={{ position: "relative", zIndex: 2 }}>
                <AnimateOnScroll>
                    <div className="row justify-content-center text-center" style={{ marginBottom: "36px" }}>
                        <div className="col-lg-8">
                            <span style={{
                                background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, textTransform: "uppercase",
                                letterSpacing: "2px",
                                fontSize: "12px",
                                marginBottom: "6px",
                                display: "inline-block",
                            }}>
                                MEMBERSHIP
                            </span>
                            <h2 style={{
                                fontSize: "clamp(28px, 3.5vw, 40px)",
                                fontWeight: 700,
                                color: "var(--tg-heading-color)",
                                marginBottom: "0",
                            }}>
                                Curated. Invite-Only. Outcome-Focused.
                            </h2>
                        </div>
                    </div>
                </AnimateOnScroll>

                <div className="row justify-content-center">
                    {/* Column 1 - Who Can Join */}
                    <div className="col-lg-3 mb-4">
                        <AnimateOnScroll delay={0.1} direction="left" className="h-100">
                            <div className="membership-card" style={{
                                background: "#fff",
                                borderRadius: "16px",
                                padding: "26px 28px",
                                boxShadow: "0 1px 3px rgba(11,26,74,0.06)",
                                border: "1px solid var(--tg-border-1)",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "all 0.3s ease"
                            }}>
                                <div style={{ marginBottom: "20px", color: "var(--tg-theme-primary)", fontSize: "32px" }}>
                                    <i className="flaticon-personal"></i>
                                </div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "16px" }}>Who Can Join</h3>
                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px 0" }}>
                                    {["CXO-level executives", "Senior enterprise leaders", "Founders & Entrepreneurs", "Select ecosystem partners"].map((item, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", fontSize: "15px", color: "var(--tg-body-color)" }}>
                                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--tg-color-gradient)", flexShrink: 0 }}></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ padding: "16px", background: "#f7f8fc", borderRadius: "8px", fontSize: "13px", color: "var(--tg-body-color)", lineHeight: 1.5, marginTop: "auto" }}>
                                    <strong>Note:</strong> Membership is strictly curated to ensure relevance, seniority, and shared values.
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>

                    {/* Column 2 - What Members Get (Featured) */}
                    <div className="col-lg-4 mb-4 membership-col-featured">
                        <AnimateOnScroll delay={0.2} className="h-100">
                            <div className="membership-card featured-card" style={{
                                background: "var(--tg-color-gradient)", borderRadius: "16px", padding: "26px 28px", boxShadow: "0 12px 40px rgba(11,26,74,0.12)",
                                height: "100%",
                                color: "#fff",
                                display: "flex",
                                flexDirection: "column",
                                transition: "all 0.3s ease"
                            }}>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Member Benefits</h3>
                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 auto 0", flexGrow: 1 }}>
                                    {[
                                        "Access to specialized Leadership Circles",
                                        "Structured advisory & mentorship",
                                        "Warm enterprise introductions",
                                        "Private roundtables & curated interactions",
                                        "Cross-functional collaboration"
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "13px", fontSize: "15px" }}>
                                            <div style={{ color: "#fff", marginTop: "2px" }}>✓</div>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div style={{ marginTop: "24px" }}>
                                    <Link href="/membership" style={{
                                        display: "block",
                                        textAlign: "center",
                                        background: "#fff",
                                        color: "var(--tg-theme-primary)",
                                        padding: "14px 24px",
                                        borderRadius: "8px",
                                        fontWeight: 700,
                                        fontSize: "15px",
                                        textDecoration: "none",
                                        transition: "all 0.3s ease"
                                    }} className="benefit-btn">
                                        Request Membership
                                    </Link>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>

                    {/* Column 3 - Application Process */}
                    <div className="col-lg-3 mb-4">
                        <AnimateOnScroll delay={0.3} direction="right" className="h-100">
                            <div className="membership-card" style={{
                                background: "#fff",
                                borderRadius: "16px",
                                padding: "26px 28px",
                                boxShadow: "0 1px 3px rgba(11,26,74,0.06)",
                                border: "1px solid var(--tg-border-1)",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                transition: "all 0.3s ease"
                            }}>
                                <div style={{ marginBottom: "20px", color: "var(--tg-theme-primary)", fontSize: "32px" }}>
                                    <i className="flaticon-idea"></i>
                                </div>
                                <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "20px" }}>Application Process</h3>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "space-between", flexGrow: 1, position: "relative" }}>
                                    <div style={{
                                        position: "absolute",
                                        left: "15px",
                                        top: "20px",
                                        bottom: "20px",
                                        width: "2px",
                                        borderLeft: "2px dashed var(--tg-border-1)"
                                    }}></div>
                                    
                                    {[
                                        "Submit Interest",
                                        "Review & Curation",
                                        "Introductory Conversation",
                                        "Membership Confirmation"
                                    ].map((step, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative", zIndex: 1 }}>
                                            <div style={{
                                                width: "32px",
                                                height: "32px",
                                                background: "var(--tg-theme-primary)",
                                                color: "#fff",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                flexShrink: 0
                                            }}>
                                                {i + 1}
                                            </div>
                                            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--tg-heading-color)" }}>
                                                {step}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .benefit-btn:hover {
                    box-shadow: 0 4px 12px rgba(255,255,255,0.2);
                    transform: translateY(-2px);
                }
                .membership-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 30px rgba(11,26,74,0.1) !important;
                }
                .featured-card:hover {
                    box-shadow: 0 16px 48px rgba(11,26,74,0.18) !important;
                }
                /* Featured column: a touch wider than the 25% side columns so the
                   benefit lines don't wrap, but not the full 33% of col-lg-4. */
                @media (min-width: 992px) {
                    .membership-col-featured {
                        flex: 0 0 28%;
                        max-width: 28%;
                    }
                }
            `}</style>
        </section>
    )
}

export default Team
