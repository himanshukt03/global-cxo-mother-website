export type GalleryPhoto = {
    thumb: string
    full: string
    alt: string
}

export type EventGallery = {
    slug: string
    title: string
    location: string
    dateRange: string
    coverImage: string
    photos: GalleryPhoto[]
}

const sriLankaFilenames = [
    "GIS_04th_C1-104.jpg",
    "GIS_04th_C1-151.jpg",
    "GIS_04th_C1-377.jpg",
    "GIS_04th_C1-41.jpg",
    "GIS_04th_C1-7.jpg",
    "GIS_05th_EC1-244.jpg",
    "GIS_05th_EC1-326.jpg",
    "GIS_2nd-140.jpg",
    "GIS_2nd-141.jpg",
    "GIS_2nd-193.jpg",
    "GIS_2nd-199.jpg",
    "GIS_2nd-215.jpg",
    "GIS_2nd-240.jpg",
    "GIS_2nd-28.jpg",
    "GIS_2nd-280.jpg",
    "GIS_2nd-285.jpg",
    "GIS_2nd-303.jpg",
    "GIS_2nd-32.jpg",
    "GIS_2nd-356.jpg",
    "GIS_2nd-362.jpg",
    "GIS_2nd-372.jpg",
    "GIS_2nd-377.jpg",
    "GIS_2nd-384.jpg",
    "GIS_2nd-389.jpg",
    "GIS_2nd-412.jpg",
    "GIS_2nd-444.jpg",
    "GIS_2nd-480.jpg",
    "GIS_2nd-500.jpg",
    "GIS_2nd-553.jpg",
    "GIS_2nd-559.jpg",
    "GIS_2nd-656.jpg",
    "GIS_2nd-671.jpg",
    "GIS_2nd-740.jpg",
    "GIS_3rd_C1-134.jpg",
    "GIS_3rd_C1-166.jpg",
    "GIS_3rd_C1-187.jpg",
    "GIS_3rd_C1-232.jpg",
    "GIS_3rd_C1-240.jpg",
    "GIS_3rd_C1-310.jpg",
    "GIS_3rd_C1-316.jpg",
    "GIS_3rd_C1-330.jpg",
    "GIS_3rd_C1-331.jpg",
    "GIS_3rd_C1-346.jpg",
    "GIS_3rd_C1-355.jpg",
    "GIS_3rd_C1-388.jpg",
    "GIS_3rd_C1-393.jpg",
    "GIS_3rd_C1-407.jpg",
    "GIS_3rd_C1-433.jpg",
    "GIS_3rd_C1-460.jpg",
    "GIS_3rd_C1-47.jpg",
    "GIS_3rd_C1-474.jpg",
    "GIS_3rd_C1-482.jpg",
    "GIS_3rd_C1-487.jpg",
    "GIS_3rd_C1-498.jpg",
    "GIS_3rd_C1-645.jpg",
    "GIS_3rd_C1-660.jpg",
    "GIS_3rd_C1-675.jpg",
    "GIS_3rd_C1-677.jpg",
    "GIS_3rd_C1-682.jpg",
    "GIS_3rd_C1-693.jpg",
    "GIS_3rd_C1-703.jpg",
    "GIS_3rd_C1-709.jpg",
    "GIS_5th-503.jpg",
]

const mlc2026Filenames = [
    "Global-CXO-10.jpg",
    "Global-CXO-100.jpg",
    "Global-CXO-108.jpg",
    "Global-CXO-11.jpg",
    "Global-CXO-114.jpg",
    "Global-CXO-115.jpg",
    "Global-CXO-118.jpg",
    "Global-CXO-12.jpg",
    "Global-CXO-121.jpg",
    "Global-CXO-124.jpg",
    "Global-CXO-128.jpg",
    "Global-CXO-129.jpg",
    "Global-CXO-145.jpg",
    "Global-CXO-152.jpg",
    "Global-CXO-16.jpg",
    "Global-CXO-165.jpg",
    "Global-CXO-174.jpg",
    "Global-CXO-176.jpg",
    "Global-CXO-195.jpg",
    "Global-CXO-197.jpg",
    "Global-CXO-199.jpg",
    "Global-CXO-2.jpg",
    "Global-CXO-210.jpg",
    "Global-CXO-212.jpg",
    "Global-CXO-222.jpg",
    "Global-CXO-226.jpg",
    "Global-CXO-232.jpg",
    "Global-CXO-26.jpg",
    "Global-CXO-3.jpg",
    "Global-CXO-34.jpg",
    "Global-CXO-6.jpg",
    "Global-CXO-67.jpg",
    "Global-CXO-68.jpg",
    "Global-CXO-69.jpg",
    "Global-CXO-79.jpg",
    "Global-CXO-84.jpg",
    "Global-CXO-93.jpg",
]

const SRI_LANKA_BASE = "/assets/events/SriLanka/photos"
const MLC_2026_BASE = "/assets/events/MLC 2026"

const galleries: EventGallery[] = [
    {
        slug: "cio-100-awards-conference",
        title: "CIO 100 Awards & Conference 2026",
        location: "Frisco, Texas",
        dateRange: "17-19 August, 2026",
        coverImage: "/events/CIO100-2026-312.jpg",
        photos: [
            { thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-154.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-154.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100-2026-542.jpg", full: "/events/cio100-gallery/CIO100-2026-542.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-66.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-66.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100-2026-491.jpg", full: "/events/cio100-gallery/CIO100-2026-491.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-60.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-60.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100-2026-553.jpg", full: "/events/cio100-gallery/CIO100-2026-553.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-2.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-2.jpg", alt: "CIO 100 Awards & Conference" },
            { thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-131.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-131.jpg", alt: "CIO 100 Awards & Conference" },
        ],
    },
    {
        slug: "mlc-oakland-2026",
        title: "Major League Cricket — Season 04 Final",
        location: "The Oakland Coliseum",
        dateRange: "Saturday, 18 July 2026 · 4:30 PM",
        coverImage: "/assets/events/MLC 2026/Global-CXO-108.jpg",
        photos: mlc2026Filenames.map((f) => ({
            thumb: `${MLC_2026_BASE}/${f}`,
            full: `${MLC_2026_BASE}/${f}`,
            alt: "Major League Cricket — Season 04 Final — Oakland, California",
        })),
    },
    {
        slug: "sri-lanka-2025",
        title: "Global Innovation Summit 2025",
        location: "Colombo, Sri Lanka",
        dateRange: "September 2–5, 2025",
        coverImage: "/assets/events/SriLanka/venue/colombo-picture.jpg",
        photos: sriLankaFilenames.map((f) => ({
            thumb: `${SRI_LANKA_BASE}/thumbs/${f}`,
            full: `${SRI_LANKA_BASE}/${f}`,
            alt: "Global Innovation Summit 2025 — Colombo, Sri Lanka",
        })),
    },
]

export default galleries
