"use client"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"

const mission_pillars = [
   { title: "Thought Leadership", desc: "Bringing together the brightest minds from enterprises and startups.", icon: "flaticon-idea" },
   { title: "Advancing Innovation", desc: "Helping startups find the right enterprise partner for their product.", icon: "flaticon-start-up" },
   { title: "Startup Advisory", desc: "Bridging enterprise wisdom with entrepreneurial innovation.", icon: "flaticon-handshake" },
]

const About = () => {
   return (
      <>
      <section id="about" className="about__area-six section-py-130" style={{ backgroundColor: "#ffffff" }}>
         <div className="container">
            {/* Top Row: Image (left) + Description & Origin Story (right) */}
            <div className="row align-items-center">
               <div className="col-lg-5 mb-4 mb-lg-0">
                  <AnimateOnScroll direction="left">
                     <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", boxShadow: "0 14px 40px rgba(11,26,74,0.12)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src="/assets/events/SriLanka/photos/GIS_2nd-193 - Copy.jpg"
                           alt="Leaders convening at the Global Innovation Summit"
                           style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", aspectRatio: "4 / 3" }}
                        />
                     </div>
                  </AnimateOnScroll>
               </div>

               <div className="col-lg-6">
                  <AnimateOnScroll direction="right">
                     <div>
                        <span style={{
                           background: "var(--tg-color-gradient)",
                           WebkitBackgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           fontWeight: 700,
                           textTransform: "uppercase",
                           letterSpacing: "2px",
                           fontSize: "13px",
                           marginBottom: "12px",
                           display: "inline-block",
                        }}>About The Platform</span>
                        <h2 style={{
                           fontSize: "clamp(26px, 3.2vw, 38px)",
                           color: "var(--tg-heading-color)",
                           lineHeight: 1.15,
                           marginBottom: "18px",
                           fontWeight: 700,
                        }}>Built for Outcomes, Not Just Conversations.</h2>
                        <p style={{ fontSize: "16px", color: "var(--tg-body-color)", lineHeight: 1.75, marginBottom: "32px" }}>
                           Global CXO Circle brings together enterprise leaders, founders, and investors to turn conversations into real results — through advisory, introductions, and partnerships that move business forward. It&apos;s not another networking group. It&apos;s a place built to get things done.
                        </p>

                        <div className="timeline-wrap" style={{ position: "relative", paddingLeft: "30px" }}>
                           <div style={{
                              position: "absolute",
                              top: "8px",
                              bottom: "8px",
                              left: "9px",
                              width: "2px",
                              background: "var(--tg-color-gradient)",
                              opacity: 0.3
                           }}></div>

                           <div className="timeline-item mb-4" style={{ position: "relative" }}>
                              <div style={{
                                 position: "absolute",
                                 left: "-30px",
                                 top: "4px",
                                 width: "20px",
                                 height: "20px",
                                 borderRadius: "50%",
                                 background: "var(--tg-color-gradient)",
                                 border: "4px solid #fff"
                              }}></div>
                              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "8px" }}>Global CXO Circle</h4>
                              <p style={{ fontSize: "15px", color: "var(--tg-body-color)", margin: 0 }}>
                                 We started as a community for CIOs, built on trust and honest conversation.
                              </p>
                           </div>

                           <div className="timeline-item" style={{ position: "relative" }}>
                              <div style={{
                                 position: "absolute",
                                 left: "-30px",
                                 top: "4px",
                                 width: "20px",
                                 height: "20px",
                                 borderRadius: "50%",
                                 background: "var(--tg-color-gradient)",
                                 border: "4px solid #fff"
                              }}></div>
                              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "8px" }}>Global CXO Circle</h4>
                              <p style={{ fontSize: "15px", color: "var(--tg-body-color)", margin: 0 }}>
                                 As enterprise challenges became more cross-functional, the platform expanded into a unified CXO ecosystem — enabling alignment across leadership roles and accelerating outcomes.
                              </p>
                           </div>
                        </div>
                     </div>
                  </AnimateOnScroll>
               </div>
            </div>
         </div>
      </section>

      {/* Our Mission — its own section with a tinted background so the white cards stand out */}
      <section className="section-py-130" style={{ backgroundColor: "#eef2fb" }}>
         <div className="container">
            <div className="row justify-content-center text-center" style={{ marginBottom: "50px" }}>
               <div className="col-lg-5">
                  <AnimateOnScroll>
                     <span style={{
                        background: "var(--tg-color-gradient)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        fontSize: "13px",
                        marginBottom: "6px",
                        display: "inline-block",
                     }}>Our Mission</span>
                     <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "16px", lineHeight: 1.25 }}>
                        A Brighter Future for Enterprises and Startups — Together.
                     </h3>
                     <p style={{ fontSize: "16px", color: "var(--tg-body-color)", lineHeight: 1.75, margin: 0 }}>
                        We&apos;re building a trusted global ecosystem where CXO leaders connect, collaborate, and turn ideas into outcomes.
                     </p>
                  </AnimateOnScroll>
               </div>
            </div>

            <div className="row gutter-y-30 justify-content-center">
               {mission_pillars.map((item, i) => (
                  <div key={item.title} className="col-lg-3">
                     <AnimateOnScroll delay={0.1 * i} className="h-100">
                        <div className="pillar-card" style={{
                           background: "#fff",
                           borderRadius: "16px",
                           padding: "32px",
                           height: "100%",
                           boxShadow: "0 2px 8px rgba(11,26,74,0.06)",
                           transition: "transform 0.3s ease, box-shadow 0.3s ease",
                           textAlign: "center",
                        }}>
                           <div style={{
                              width: "56px",
                              height: "56px",
                              background: "var(--tg-color-gradient)",
                              color: "#fff",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "24px",
                              margin: "0 auto 20px",
                           }}>
                              <i className={item.icon}></i>
                           </div>
                           <h4 style={{
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "var(--tg-heading-color)",
                              marginBottom: "10px",
                              lineHeight: 1.3,
                              // Reserve two lines of height and vertically centre the
                              // text, so a single-line title (e.g. "Startup Advisory")
                              // sits centred in the same space a two-line title fills —
                              // keeping every card's description aligned on the same row.
                              minHeight: "2.6em",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                           }}>{item.title}</h4>
                           <p style={{ fontSize: "14.5px", color: "var(--tg-body-color)", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                        </div>
                     </AnimateOnScroll>
                  </div>
               ))}
            </div>
         </div>
         <style jsx>{`
            .about-card:hover, .pillar-card:hover {
               transform: translateY(-3px);
               box-shadow: 0 8px 24px rgba(11,26,74,0.1) !important;
            }
         `}</style>
      </section>
      </>
   )
}

export default About
