export type Awardee = {
    name: string
    year: number
    photo: string
    company: string
    citation: string
    linkedin?: string
    achievements: string[]
    highlights: string[]
}

export type AwardCategory = {
    slug: string
    label: string
    icon: string
    tagline: string
    description: string
    highlightsLabel: string
    awardees: Awardee[]
}

const awardsData: AwardCategory[] = [
    {
        slug: "lifetime-achievement",
        label: "Lifetime Achievement",
        icon: "flaticon-medal",
        tagline: "Career-Long Excellence",
        description: "Recognizing leaders who have built enduring legacies through sustained excellence, mentorship, and impact across decades of distinguished service.",
        highlightsLabel: "Career Highlights",
        awardees: [
            {
                name: "Aravinda De Silva",
                year: 2025,
                photo: "/assets/events/SriLanka/speakers/Aravinda_de_Silva.png",
                company: "Sri Lanka Cricket",
                citation: "Outstanding career as Sri Lankan cricketer, ICC Hall of Fame inductee and match-winning hero of the 1996 World Cup final.",
                achievements: [
                    "Sri Lanka's 1996 World Cup win: scored an unbeaten 107 and took 3 wickets in the final",
                    "Key influencer of Sri Lanka's technological and entrepreneurial scene",
                    "Outstanding philanthropist dedicated to community development and youth empowerment through sports and education",
                ],
                highlights: [
                    "International career: 1984–2003",
                    "Only player to score a century and take 3+ wickets in a men's Cricket World Cup final (1996)",
                    "Served on Sri Lanka Cricket's national selection committee post-retirement, including chairmanship in 2016–17",
                ],
            },
            {
                name: "K V Rao",
                year: 2025,
                photo: "/assets/events/SriLanka/speakers/KV_Rao.webp",
                company: "Tata International Singapore",
                citation: "Exceptional leadership as Resident Director ASEAN for Tata Sons, Chairman across Tata subsidiaries in Singapore, and Senior Advisor at BCG Asia.",
                linkedin: "https://www.linkedin.com/in/kvraosg",
                achievements: [
                    "Served as Resident Director – ASEAN for Tata Sons, leading regional strategy",
                    "Chaired Tata International Singapore, Tata Power International and Tata Capital Pte Ltd",
                    "Appointed Senior Advisor to BCG Asia after 40+ years in global leadership roles",
                    "Held board and advisory roles across industry, public bodies, and nonprofits in Singapore",
                ],
                highlights: [
                    "Resident Director – ASEAN, Tata Sons (four decades of regional experience)",
                    "Chairman – Tata International Singapore and other Tata subsidiaries",
                    "Senior Advisor – Boston Consulting Group Asia (appointed 2025)",
                    "Board and public service roles including SIIA, SINDA, SBF, SIFAS, CII-IBF",
                ],
            },
            {
                name: "J A Chowdary",
                year: 2025,
                photo: "/assets/startup_board/J A Chowdary.png",
                company: "International Startup Foundation (ISF)",
                citation: "Architect of India's IT revolution. Founding director of STPI and core architect behind Hyderabad's Hi-Tech City, now chairing the International Startup Foundation.",
                linkedin: "https://linkedin.com/in/jachowdary",
                achievements: [
                    "Founding Director of Software Technology Parks of India (STPI) across Bengaluru, Hyderabad & Chennai",
                    "Key architect of Hyderabad's HITECH City and Cyberabad infrastructure",
                    "Co-founder of PortalPlayer (first-generation iPod chip), acquired by Nvidia",
                    "Chairman roles at International Startup Foundation, shaping India's global startup ecosystem",
                ],
                highlights: [
                    "Founding Director – STPI, Bengaluru/Hyderabad/Chennai",
                    "Architect – Hyderabad's HITECH City & Cyberabad IT hub development",
                    "Co-Founder – PortalPlayer (acquired by Nvidia)",
                    "Chairman – International Startup Foundation (present)",
                ],
            },
            {
                name: "Penny Jayewardene",
                year: 2025,
                photo: "/assets/events/SriLanka/penny/penny.png",
                company: "Sri Sathya Sai Karuna Nilayam Foundation",
                citation: "Visionary humanitarian leader who dedicated four decades to welfare service in Sri Lanka, establishing the country's first free cardiac hospital and pioneering healthcare initiatives.",
                achievements: [
                    "Established Sri Lanka's first free cardiac hospital in Batticaloa (2022) — 3,000+ angiograms, 900+ stent procedures",
                    "Founded Sri Lanka's first residential drug rehabilitation centre with Sri Lanka Sumithryo",
                    "Led tsunami relief efforts across the eastern coast, serving thousands of affected families",
                    "Pioneered the first pediatric cardiac surgeries in the Eastern Province",
                ],
                highlights: [
                    "Chairperson – Sri Sathya Sai Karuna Nilayam Foundation (2016–present)",
                    "Founder – Sri Sathya Sai Sanjeevani Hospital Batticaloa",
                    "Chelation Therapy Clinic (1996–2021) — 1,600+ patients treated over 25 years",
                    "Four decades of drug rehabilitation and disaster relief work",
                ],
            },
            {
                name: "Gary Seaton",
                year: 2025,
                photo: "/assets/startup_board/Gary_Seaton.png",
                company: "G&G Group",
                citation: "Distinguished Australian entrepreneur and global leader in agribusiness and renewable energy, with four decades building enterprises across Asia-Pacific.",
                linkedin: "https://www.linkedin.com/in/gary-seaton-6623b139/",
                achievements: [
                    "Founded Oceanic Group (1998) and G&G Group, spanning Singapore, Malaysia, Sri Lanka, India, and Australia",
                    "CEO and Chairman of NASDAQ-listed Australian Oilseeds Holdings",
                    "Pioneered Asia-Pacific operations for Gardner Smith Group, launching its first overseas office in Singapore",
                    "Board member across renewable energy and agritech companies",
                ],
                highlights: [
                    "Founder & CEO – G&G Group of Companies (1998–present)",
                    "Chairman – Australian Oilseeds Holdings (NASDAQ-listed)",
                    "Director – Energreen Nutrition Australia and multiple renewable energy ventures",
                    "Investment Committee Member – Aditya Birla Sunlife Global Clean Energy Fund",
                ],
            },
        ],
    },
    {
        slug: "innovation-champions",
        label: "Innovation Champions",
        icon: "flaticon-idea",
        tagline: "Breakthrough Innovation",
        description: "Celebrating leaders who introduced game-changing innovations and pioneered technologies that set new standards for the industry.",
        highlightsLabel: "Key Innovations",
        awardees: [
            {
                name: "Karthik Chakkarapani",
                year: 2025,
                photo: "/assets/Founders/Karthik_Chakkarpani.png",
                company: "Zuora",
                citation: "SVP & CIO at Zuora who accelerates enterprise AI adoption and mentors startups, championing digital transformation that unlocks subscription-economy growth.",
                linkedin: "https://www.linkedin.com/in/chakraj/",
                achievements: [
                    "Orchestrated AI-powered digital transformation programs at Zuora, sharpening time-to-value for new products",
                    "Drove data-driven automation across Fortune 500 companies including Salesforce and Cisco",
                    "Named a Business Transformation 150 leader for catalyzing growth through tech-enabled operating models",
                    "Actively advises early-stage founders on go-to-market and product-ops as a Bay Area startup mentor",
                ],
                highlights: [
                    "Agentic-AI workplace framework that predicts issues and optimizes workflows in real time",
                    "Subscription-data cloud architecture enabling recurring-revenue acceleration",
                    "CXO mentor-circle playbook for first-time SaaS founders",
                    "Enterprise AI-literacy program seeding a culture of experimentation",
                ],
            },
            {
                name: "Archana Rao",
                year: 2025,
                photo: "/assets/startup_board/Archana_Rao.jpg",
                company: "Klaviyo",
                citation: "Three-time CIO, now at Klaviyo, who scales high-growth companies by fusing cloud agility with inclusive, founder-friendly technology cultures.",
                linkedin: "https://www.linkedin.com/in/archana-rao-880a43/",
                achievements: [
                    "Scaled Atlassian from $1B to $3B revenue by modernizing systems for hyper-growth",
                    "Drove global IT transformation at Unity Technologies",
                    "Appointed CIO at Klaviyo to chart the company's next growth horizon",
                    "Recognized among the Top 100 Women in Tech to Watch",
                ],
                highlights: [
                    "Cloud-first, API-rich architecture blueprint for scale-ups adding new revenue lines",
                    "AI-enabled IT operations model turning telemetry into predictive insights",
                    "Post-merger systems-integration playbook honed during the Symantec/Veritas separation",
                    "Inclusive-leadership framework nurturing cross-functional growth leaders",
                ],
            },
            {
                name: "Raj Kalahasthi",
                year: 2025,
                photo: "/assets/Founders/Raj_kalahasthi.JPG",
                company: "The Baldwin Group",
                citation: "Award-winning Chief Digital & Information Officer at The Baldwin Group, driving digital transformation across financial services.",
                linkedin: "https://www.linkedin.com/in/raj19",
                achievements: [
                    "Awarded 2025 National CIO ORBIE for Large Corporations",
                    "Named CIO of the Year 2024 by Inspire CIO ORBIE Awards",
                    "Recognized with the IDC Real Results Award for Digital Transformation in retail banking",
                    "Inventor with a patented GUI tool for web-based forms deployment",
                ],
                highlights: [
                    "Digital transformation framework accelerating customer acquisition and modernizing legacy systems",
                    "Cloud-native architecture enabling rapid scaling of digital banking platforms",
                    "AI-powered analytics infrastructure driving predictive customer engagement insights",
                    "Cross-platform integration connecting traditional banking with modern digital ecosystems",
                ],
            },
        ],
    },
    {
        slug: "hall-of-fame",
        label: "Hall of Fame",
        icon: "flaticon-certificate",
        tagline: "Outstanding Career",
        description: "Honoring leaders whose sustained excellence, mentorship, and transformative impact have shaped the industry across multiple decades.",
        highlightsLabel: "Career Highlights",
        awardees: [
            {
                name: "Gopalratnam VC",
                year: 2025,
                photo: "/assets/Founders/Gopal_VC.jpg",
                company: "Philips",
                citation: "Global CIO who turns cloud, data and talent into an engine for Philips' HealthTech growth while mentoring the next wave of tech founders.",
                linkedin: "https://www.linkedin.com/in/gopalratnam-vc-a050296",
                achievements: [
                    "Steered end-to-end IT & digital transformation for Philips across 100+ markets",
                    "Championed HealthSuite and other AWS-powered analytics stacks referenced by 500+ healthcare providers",
                    "Built a global CIO talent pipeline, mentoring hundreds of executives via Evanta and Atomicwork advisory boards",
                    "Previously ran Cisco's worldwide analytics practice across three continents",
                ],
                highlights: [
                    "Executive Vice President & Global CIO – Philips (2020–present)",
                    "Senior Vice President, IT International – Cisco Systems (2010–2020)",
                    "SVP & Business Leader, Global Analytics Practice – GE Capital (2000–2010)",
                    "Founding Member – Atomicwork CIO Advisory Board (2025–present)",
                ],
            },
            {
                name: "Karl Mosgofian",
                year: 2025,
                photo: "/assets/startup_board/Karl_Mosgofian.jpg",
                company: "Gainsight",
                citation: "Ex-Gainsight CIO who scaled IT from seed-stage to unicorn and now advises high-growth startups on data-driven customer success.",
                linkedin: "https://www.linkedin.com/in/karl-mosgofian-4594a2/",
                achievements: [
                    "Built Gainsight's IT foundation, supporting 10M+ monthly community visitors",
                    "Introduced AI-powered data-insight interfaces democratizing customer-success analytics",
                    "Authored a cost-optimization playbook adopted by 200+ SaaS scale-ups",
                    "Mentored 150+ IT leaders via Merritt College's cybersecurity program and fractional-CIO advisory work",
                ],
                highlights: [
                    "Chief Information Officer – Gainsight (2018–2023)",
                    "CIO – Harmonic Inc. (2010–2018)",
                    "Senior IT Leadership – Cadence & Apple (1993–2010)",
                    "Advisor & Fractional CIO to early-stage startups (2024–present)",
                ],
            },
            {
                name: "Gary J Ahwah",
                year: 2025,
                photo: "/assets/startup_board/Gary_Ahwah.jpeg",
                company: "Molina Healthcare",
                citation: "CTO who modernizes healthcare IT at Fortune 200 scale and shares his playbooks with emerging digital-health founders.",
                linkedin: "https://linkedin.com/in/garyjahwah",
                achievements: [
                    "Led Molina Healthcare's multi-year cloud transformation, delivering double-digit infrastructure savings",
                    "Instituted enterprise architecture governance later reused at Kaiser Permanente and City of Hope",
                    "Mentors peer CTOs through CXO/50 and global CXO circles",
                    "Pioneered patient-centric digital platforms recognized across the Fortune 500 health ecosystem",
                ],
                highlights: [
                    "Chief Technology Officer – Molina Healthcare (2021–present)",
                    "SVP, Information Technology – City of Hope (2015–2021)",
                    "Regional CIO – Kaiser Permanente Northwest (2008–2015)",
                    "VP & CIO – PacifiCare / UnitedHealth Group (1998–2008)",
                ],
            },
            {
                name: "Prasad Ramakrishnan",
                year: 2025,
                photo: "/assets/startup_board/Prasad_Ramakrishnan.png",
                company: "Freshworks",
                citation: "28 years of technology leadership excellence, driving innovation in customer experience platforms and establishing best practices for digital transformation.",
                linkedin: "https://www.linkedin.com/in/prasadramakrishnan/",
                achievements: [
                    "Orchestrated Freshworks' 2021 Nasdaq IPO while modernizing global IT and security operations",
                    "Scaled a cloud-native SaaS stack now serving 50,000+ customers across 120 countries",
                    "Launched Freddy AI initiatives that lifted agent productivity by 30%",
                    "Publishes and mentors through the Forbes Technology Council",
                ],
                highlights: [
                    "Chief Information Officer & SVP IT – Freshworks (2016–2023)",
                    "Chief Information Security Officer – Freshworks (2016–2023)",
                    "Advisor & Angel Mentor to SaaS startups (2023–present)",
                    "Contributor – Forbes Technology Council & InformationWeek columnist (2019–present)",
                ],
            },
        ],
    },
]

export default awardsData
