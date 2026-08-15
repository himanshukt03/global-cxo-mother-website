"use client"
import React from "react"
import Link from "next/link"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"

const partners_data = [
    { id: 1, title: "Enterprises", desc: "Fortune 500s and global organizations driving industry standards.", icon: "flaticon-real-estate" },
    { id: 2, title: "Venture Partners", desc: "Top-tier funds aligning capital with strategic execution.", icon: "flaticon-briefcase" },
    { id: 3, title: "Strategic Partners", desc: "Consultancies and service providers enabling scale.", icon: "flaticon-handshake" },
];

const Brand = () => {
    return (
        <section id="partners" className="section-py-130" style={{ backgroundColor: "#f7f8fc" }}>
            <div className="container">
                <AnimateOnScroll>
                    <div className="row justify-content-center text-center" style={{ marginBottom: "36px" }}>
                        <div className="col-lg-8">
                            <span style={{
                                background: "var(--tg-color-gradient)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                fontSize: "12px",
                                marginBottom: "12px",
                                display: "inline-block",
                            }}>
                                PARTNERS & ECOSYSTEM
                            </span>
                            <h2 style={{
                                fontSize: "clamp(28px, 3.5vw, 42px)",
                                fontWeight: 700,
                                color: "var(--tg-heading-color)",
                            }}>
                                Built with the Best. For the Best.
                            </h2>
                        </div>
                    </div>
                </AnimateOnScroll>

                <div className="row justify-content-center gutter-y-30 mb-50">
                    {partners_data.map((item, idx) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                            <AnimateOnScroll delay={idx * 0.12}>
                                <div className="partner-card" style={{
                                    background: "#fff",
                                    borderRadius: "16px",
                                    padding: "32px",
                                    boxShadow: "0 1px 3px rgba(11,26,74,0.06)",
                                    height: "100%",
                                    border: "1px solid var(--tg-border-1)",
                                    textAlign: "center",
                                    transition: "all 0.3s ease"
                                }}>
                                    <div className="partner-icon" style={{
                                        width: "64px",
                                        height: "64px",
                                        background: "var(--tg-color-gradient)",
                                        color: "#fff",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "32px",
                                        marginBottom: "24px",
                                        transition: "transform 0.3s ease",
                                        boxShadow: "0 4px 16px rgba(123, 31, 255, 0.2)"
                                    }}>
                                        <i className={item.icon}></i>
                                    </div>
                                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "12px" }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ fontSize: "15px", color: "var(--tg-body-color)", margin: 0, lineHeight: 1.6 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    ))}
                </div>

                <AnimateOnScroll delay={0.2}>
                    <div className="text-center mt-5">
                        <Link href="/membership" style={{
                            display: "inline-block",
                            background: "var(--tg-color-gradient)",
                            color: "#fff",
                            padding: "16px 36px",
                            borderRadius: "100px",
                            fontWeight: 700,
                            fontSize: "15px",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                            marginBottom: "16px",
                            border: "none",
                            boxShadow: "0 4px 20px rgba(10, 60, 194, 0.25)"
                        }} className="partner-cta-btn">
                            Become a Partner <span>→</span>
                        </Link>
                        <p style={{ fontSize: "14px", color: "var(--tg-body-color)" }}>
                            All partnerships are aligned with driving meaningful CXO engagement and outcomes.
                        </p>
                    </div>
                </AnimateOnScroll>
            </div>
            <style jsx>{`
                .partner-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 30px rgba(11,26,74,0.08) !important;
                    border-color: var(--tg-theme-primary) !important;
                }
                .partner-card:hover .partner-icon {
                    transform: scale(1.1);
                }
                .partner-cta-btn:hover {
                    background: var(--tg-color-gradient) !important;
                    color: #fff !important;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 24px rgba(123, 31, 255, 0.3) !important;
                }
            `}</style>
        </section>
    )
}

export default Brand
