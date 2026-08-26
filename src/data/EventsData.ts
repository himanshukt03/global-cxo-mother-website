// Import modular data structures
import {
  Speaker,
  globalInnovationSummitSpeakers,
} from './speakers';

import {
  ItineraryItem,
  globalInnovationSummitItinerary,
} from './itinerary';

import {
  globalInnovationSummitImages,
} from './images';

import {
  Sponsor,
  globalInnovationSummitSponsors,
} from './sponsors';

import {
  sfConferenceImages,
  sfConferenceSpeakers,
  sfConferenceSponsors,
  sfConferenceItinerary,
  sfConferenceHighlightCards,
} from './events/sfConference';

import {
  dubaiSummitImages,
  dubaiSummitSpeakers,
  dubaiSummitSponsors,
  dubaiSummitItinerary,
  dubaiSummitHighlightCards,
} from './events/dubaiSummit';

export interface HighlightCard {
  icon: string;
  title: string;
  text: string;
}

export interface CTAConfig {
  primaryLabel: string;
  primaryUrl: string;
  isExternal?: boolean;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

export interface EventMetadata {
  title: string;
  description: string;
  image: string;
}

export type EventLifecycleStatus = 'current' | 'past' | 'archived';

interface VenueInfo {
  name: string;
  address: string;
  description: string;
  image: string;
  mapEmbedUrl?: string;
}

export interface EventDetail {
  id: number;
  slug: string;
  title: string;
  tagline?: string;
  date: string;
  location: string;
  description: string;
  attendees: string;
  heroImage: string;
  heroImageMobile?: string;
  cardImage?: string;
  bannerImage: string;
  gallery: string[];
  overview: string;
  objectives: string[];
  speakers: Speaker[];
  sponsors: Sponsor[];
  itinerary: ItineraryItem[];
  highlights: string[];
  highlightCards: HighlightCard[];
  pastHighlights?: string;
  lifecycleStatus?: EventLifecycleStatus;
  registrationOpen?: boolean;
  showHeroPromo?: boolean;
  price?: string;
  isTeaser?: boolean;
  cta?: CTAConfig;
  metadata: EventMetadata;
  venue: VenueInfo;
  livestreamUrl?: string;
  brochureUrl?: string;
  galleryUrl?: string;
}

const sriLankaHighlightCards: HighlightCard[] = [
  {
    icon: '/assets/icons/global.png',
    title: 'Global Leaders',
    text: '75+ CIOs, CTOs, CISOs from enterprise innovators.',
  },
  {
    icon: '/assets/icons/founders.png',
    title: 'Founder Track',
    text: '30+ startups refining enterprise go-to-market.',
  },
  {
    icon: '/assets/icons/meetings.png',
    title: 'Curated 1-on-1s',
    text: 'Guaranteed executive matchmaking for every founder.',
  },
  {
    icon: '/assets/icons/vacation.png',
    title: 'Coastal Retreat',
    text: 'Immersive Sri Lankan hospitality in Colombo.',
  },
];

export const eventsData: EventDetail[] = [
  {
    id: 5,
    slug: 'cio-100-awards-conference',
    title: 'CIO 100',
    tagline: '100 Award Winners | Fortune 500 CIOs | 50+ Speakers | 3 Days | One CIO Community',
    date: '17-19 August, 2026',
    location: 'Frisco, Texas',
    description:
      'See what’s working inside leading enterprises as CIO Hall of Fame inductees, CIO 100 honorees, and technology leaders share how they’re scaling AI, accelerating transformation, and delivering measurable business results. Global CxO Circle is a sponsor and is bringing 3 top-funded startups.',
    attendees: '400+ CIOs and CxOs',
    heroImage: '/events/cio100-banner.png',
    heroImageMobile: '/events/cio100-banner.png',
    cardImage: '/events/cio100Step&Repeat Banner.png',
    bannerImage: '/events/cio100-banner.png',
    gallery: [
      '/events/cio100-banner.png',
      '/events/cio100Step&Repeat Banner.png',
      '/events/cio100flyer.png',
      '/events/cio100-hero.png',
    ],
    overview:
      'See what’s working inside leading enterprises as CIO Hall of Fame inductees, CIO 100 honorees, and technology leaders share how they’re scaling AI, accelerating transformation, and delivering measurable business results.\n\nFor more than four decades, the CIO 100 Awards has recognized organizations that use technology to drive business value, innovation, and competitive advantage. Today, the CIO 100 Awards & Conference brings together the leaders behind those achievements to share what’s working—and what’s next.',
    objectives: [
      'Celebrate top 100 IT organizations and visionary leaders.',
      'Unpack enterprise AI, cloud architecture, and cybersecurity trends.',
      'Network with 400+ enterprise executives, VCs, and founders.',
    ],
    speakers: [],
    sponsors: [],
    itinerary: [],
    highlights: [
      '400+ CIOs and CxOs',
      'Awards & Conference',
      'Thought Leadership Discussions',
      'Roundtables and Panels',
      'Networking Reception',
      'Photo Opportunities and Entertainment',
    ],
    highlightCards: [],
    registrationOpen: false,
    lifecycleStatus: 'past',
    showHeroPromo: false,
    brochureUrl: '/resources/gcxo-cio100-Brochure.pdf',
    galleryUrl: '/gallery/cio-100-awards-conference',
    cta: {
      primaryLabel: 'Download Media & Gallery',
      primaryUrl: '/gallery/cio-100-awards-conference',
      isExternal: false,
    },
    metadata: {
      title: 'Global CXO Circle | CIO 100 Awards & Conference',
      description:
        'See what’s working inside leading enterprises as CIO Hall of Fame inductees, CIO 100 honorees, and technology leaders share how they’re scaling AI, accelerating transformation, and delivering measurable business results.',
      image: '/events/cio100-hero.png',
    },
    venue: {
      name: 'Omni PGA Frisco Resort & Spa',
      address: '4341 PGA Parkway, Frisco, Texas 75033',
      description:
        'Omni PGA Frisco Resort & Spa is a premier golf-oriented destination located in the Fields development in Frisco, Texas — adjacent to the PGA of America’s headquarters.',
      image:
        'https://www.omnihotels.com/-/media/images/hotels/dalpga/photogallery/resort/omni_dalpga_exterior-1170x660.jpg?mw=1536&hash=A1D5BD9E622343C24ED00138BD0C4AF26A59D4B6',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Omni+PGA+Frisco+Resort&output=embed',
    },
  },
  {
    id: 5,
    slug: 'mlc-oakland',
    title: 'Major League Cricket Season 04 Final',
    tagline: '200+ CXOs & 100+ Founders for T20 Cricket, Networking & VIP Hospitality',
    date: 'Saturday, 18 July 2026 · 4:30 PM',
    location: 'The Oakland Coliseum · Oakland, California',
    description:
      'Global CXO Circle presents an exclusive executive gathering at the Season 04 Final of Major League Cricket (MLC). Experience premium glass-window balcony seating overlooking the field, restaurant-style dining with complimentary drinks, curated 1-on-1 networking between 200+ CXOs and 100+ tech founders, and a post-match trophy meet & greet.',
    attendees: '200+ CXOs & 100+ Startups',
    heroImage: '/events/mlc_main_banner.webp',
    heroImageMobile: '/events/mlc_main_banner.webp',
    cardImage: '/events/mlc_main_banner.webp',
    bannerImage: '/events/mlc_main_banner.webp',
    gallery: [],
    overview:
      'Major League Cricket (MLC) is America’s premier professional T20 cricket league, featuring world-class international stars and top US talent. For the Season 04 Championship Final, Global CXO Circle hosts a private VIP executive experience inside the Oakland Coliseum’s luxury suites.\n\nEnjoy prime balcony views of the field, all-inclusive food and beverages, and structured networking with enterprise tech leaders, VC partners, and high-growth startup founders. The event concludes with an exclusive trophy presentation photo opportunity and player meet & greet.',
    objectives: [
      'Bring together 200+ enterprise CXOs and 100+ startup founders for high-impact executive networking.',
      'Provide VIP hospitality including field-view balcony seating, full dining, and complimentary drinks.',
      'Facilitate curated 1-on-1 introductions between enterprise decision-makers and emerging tech leaders.',
      'Offer post-match trophy access and exclusive player meet & greet opportunities.',
    ],
    speakers: [],
    sponsors: [],
    itinerary: [
      {
        date: 'July 18, 2026',
        time: '04:30 PM',
        title: 'VIP Gate Arrival & Suite Check-In',
        description: 'Exclusive suite entrance access, badge pickup, and welcome refreshments.',
        type: 'arrival',
        timeOfDay: 'afternoon',
      },
      {
        date: 'July 18, 2026',
        time: '05:00 PM',
        title: 'Curated 1-on-1 CXO & Founder Networking',
        description: 'Structured introductions between enterprise executives, VCs, and startup leaders.',
        type: 'networking',
        timeOfDay: 'afternoon',
      },
      {
        date: 'July 18, 2026',
        time: '06:00 PM',
        title: 'Match Start & Restaurant-Style Dining',
        description: 'First innings action with premium hot buffet dining, craft beer, and wine.',
        type: 'dinner',
        timeOfDay: 'evening',
      },
      {
        date: 'July 18, 2026',
        time: '07:45 PM',
        title: 'Mid-Innings Executive Roundtable',
        description: 'Brief thought leadership discussion and dessert lounge networking.',
        type: 'panel',
        timeOfDay: 'evening',
      },
      {
        date: 'July 18, 2026',
        time: '08:15 PM',
        title: 'Second Innings & Championship Finish',
        description: 'Thrilling T20 second innings finish from field-view glass balcony seats.',
        type: 'networking',
        timeOfDay: 'evening',
      },
      {
        date: 'July 18, 2026',
        time: '09:45 PM',
        title: 'Post-Match Trophy Photo & Player Meet & Greet',
        description: 'Exclusive on-field / suite access for trophy photos and player interactions.',
        type: 'cultural',
        timeOfDay: 'evening',
      },
    ],
    highlights: [
      '200+ CIOs and CxOs',
      'Oakland Coliseum Luxury Suite',
      'Field-View Balcony Seating',
      'All-Inclusive Food & Drinks',
      'Trophy Photo & Player Meet & Greet',
    ],
    highlightCards: [
      {
        icon: '/assets/icons/global-summit.png',
        title: 'Field-View Suite',
        text: 'Restaurant-style hospitality with food, beer & wine included.',
      },
      {
        icon: '/assets/icons/founders.png',
        title: 'Balcony Seating',
        text: 'Glass windows overlooking the field with premium seating.',
      },
      {
        icon: '/assets/icons/meetings.png',
        title: 'Curated 1-on-1s',
        text: 'Startup introductions and networking with 200+ CXOs.',
      },
      {
        icon: '/assets/icons/vacation.png',
        title: 'Legends Meet & Greet',
        text: 'Trophy photo and exclusive meet & greet post-match.',
      },
    ],
    registrationOpen: false,
    lifecycleStatus: 'past',
    price: 'VIP Invite',
    cta: {
      primaryLabel: 'View Event Gallery',
      primaryUrl: '/gallery/mlc-oakland-2026',
      isExternal: false,
    },
    metadata: {
      title: 'Major League Cricket Season 04 Final VIP Experience | Global CXO Circle',
      description:
        'Join 200+ CXOs and 100+ startups for the T20 Cricket VIP Experience at the Oakland Coliseum.',
      image: '/events/mlc_main_banner.webp',
    },
    venue: {
      name: 'The Oakland Coliseum',
      address: '7000 S Coliseum Way, Oakland, CA 94621',
      description:
        'Historic Bay Area sports stadium featuring private luxury suites, field-view balcony lounges, and prime transport accessibility.',
      image: '/events/mlc_main_banner.webp',
      mapEmbedUrl: 'https://maps.google.com/maps?q=Oakland+Coliseum&output=embed',
    },
  },
  {
    id: 3,
    slug: 'dubai-summit-2026',
    title: 'Dubai Global Innovation Summit & Retreat 2026',
    tagline: 'Aspire • Transpire • Inspire',
    date: 'January 9-11, 2026',
    location: 'Dubai, United Arab Emirates',
    description:
      'At the Global Innovation Summit & Retreat in Dubai-created with ISF, AEIC (American University in Dubai), and Global cxo circle - we bring together the next generation of dreamers and the leaders who still are. It is where Junicorns aspire to change the world, founders transpire visions into reality, and unicorn founders and CxOs inspire the future of innovation.',
    attendees: '150+',
    heroImage: dubaiSummitImages.card,
    heroImageMobile: dubaiSummitImages.heroMobile || dubaiSummitImages.card,
    cardImage: dubaiSummitImages.card,
    bannerImage: dubaiSummitImages.banner,
    gallery: dubaiSummitImages.gallery,
    overview:
      'Join us for an extraordinary gathering that bridges ambition and achievement-where ideas meet experience and tomorrow’s breakthroughs begin today. This focused retreat brings CxOs, VCs, founders, and aspiring Junicorns from India, the US, and the Middle East together to go beyond the surface, understand the purpose and mission behind entrepreneurship, and co-create global companies. Senior executives share wisdom, pain points, and practical advice so founders can accelerate growth and achieve 10x outcomes, while CxOs explore advisory and investment opportunities.',
    objectives: [
      'Bridge Junicorns, Soonicorns, unicorn founders, and enterprise CxOs in a retreat setting built for mentorship and collaboration.',
      'Provide 30+ startups and 40+ aspiring founders with immersive workshops, pitches, and exhibition moments that convert into advisory relationships.',
      'Equip founders with guidance on strategic fundraising, pricing, AI go-to-market motions, and creating boards packed with CxO investors.',
      'Enable CxOs from India, the US, MEA, and beyond to evaluate investments, advisory roles, and partnerships that accelerate corridor innovation.',
    ],
    speakers: dubaiSummitSpeakers,
    sponsors: dubaiSummitSponsors,
    itinerary: dubaiSummitItinerary,
    highlights: [
      'Participating enterprises include Tabhi, Mondee, AEIC @ AUD, Grant Thornton, Alteryx, Philips, NTT, Oracle, Hitachi, JPMorgan, KPMG, AWS, Zoom, Meta, The Baldwin Group, Stanford Medicine, Global Ventures, SucSEED Ventures, Inclusive Ventures Group, Techinnova, Blitz India, and more.',
      '30+ startups and 40+ aspiring founders such as Potpie.ai, Atomicwork, Trupeer.ai, Lumif.ai, Featurely.ai, Thunai.ai, Hivel.ai, and WithJoy present pitches, workshops, and exhibits.',
      '100+ CxOs from the US, UK, EU, MEA, India, Singapore, and APAC attend for peer networking, advisory board creation, and investment opportunities.',
      'Partnership tiers (Entry through Platinum) cover lodging, transportation, primetime pitches, dedicated rooms, curated dining tables, and recognition across the retreat.',
    ],
    highlightCards: dubaiSummitHighlightCards,
    registrationOpen: false,
    lifecycleStatus: 'past',
    showHeroPromo: false,
    cta: {
      primaryLabel: 'Request VIP Invite',
      primaryUrl: 'https://lu.ma/globalcio-dubai',
      isExternal: true,
    },
    metadata: {
      title: 'Global cxo circle | Dubai Summit 2026',
      description:
        'Experience the Global Innovation Summit & Retreat in Dubai-where ISF, AEIC, and Global cxo circle unite Junicorns, founders, unicorns, VCs, and CxOs.',
      image: dubaiSummitImages.banner,
    },
    venue: {
      name: 'InterContinental Dubai Festival City',
      address: 'Dubai Festival City, Dubai, United Arab Emirates',
      description:
        'InterContinental Dubai Festival City overlooks Dubai Creek and offers purpose-built ballrooms, breakout lounges, and waterfront networking spaces for the Global Innovation Summit & Retreat.',
      image: dubaiSummitImages.venue || dubaiSummitImages.hero,
      mapEmbedUrl: 'https://maps.google.com/maps?q=InterContinental%20Dubai%20Festival%20City&output=embed',
    },
    livestreamUrl: 'https://www.youtube.com/embed/woI3-ARzql0?si=ySOHc-NRXa-wol_c',
  },
  {
    id: 2,
    slug: 'sf-conference-2025',
    title: 'Silicon Valley AI Thought Leadership Summit',
    tagline: 'Exploring AI-first Principles',
    date: 'December 8, 2025',
    location: 'Palo Alto Art Center, Palo Alto, CA',
    description:
      'Atomicwork, Global cxo circle, Okta Ventures, Tray.ai, and a coalition of startups and enterprises congregate as 150+ CxOs, VCs, and founders to examine the mission, purpose, and practical realities of building global AI-powered companies. Expect curated conversations, focused workshops, and an evening celebration that keeps the dialogue going well past the main event.',
    attendees: '100+',
    heroImage: sfConferenceImages.card,
    heroImageMobile: sfConferenceImages.heroMobile || sfConferenceImages.card,
    cardImage: sfConferenceImages.card,
    bannerImage: sfConferenceImages.banner,
    gallery: sfConferenceImages.gallery,
    overview:
      'Hosted by Atomicwork in collaboration with Global cxo circle, Okta Ventures, Tray.ai, selected startups, and enterprise innovation leaders to look beyond surface-level conversations. Together we will explore the deeper purpose, mission, and vision of entrepreneurship, the problems and solutions being addressed, and what it takes to build a global enterprise. Senior CxOs who lead large teams and navigate complex AI challenges will share wisdom, insights, and lessons learned for the benefits of founders and executives who wish to accelerate growth and achieve 10x outcomes. Join us for a full afternoon of panel discussions, hands-on workshops, and an evening celebration that showcases the best of the Bay Area ecosystem.',
    objectives: [
      'Dig into the purpose, mission, and vision behind building AI-first companies with guidance from seasoned global CxOs.',
      'Gather 150+ CxOs, VCs, and founders from the Bay Area, India, and the rest of the world for meaningful peer exchange.',
      'Translate on-stage insights into practical playbooks through expert panels, startup pitches, and a Securing AI Agents workshop.',
      'Foster long-term relationships during networking exhibits and the Atomicwork holiday celebration.',
    ],
    speakers: sfConferenceSpeakers,
    sponsors: sfConferenceSponsors,
    itinerary: sfConferenceItinerary,
    highlights: [
      'Atomicwork + Global cxo circle partnership with Okta Ventures, Tray.ai, and leading enterprises.',
      '150+ CxOs, VCs, and founders from the Bay Area, India, and across the globe.',
      'Panels on enterprise AI, CTO playbooks, founders in the AI era, and an immersive Securing AI Agents workshop.',
      'Networking lounges, startup exhibits, and the Atomicwork holiday party to keep conversations flowing.',
    ],
    highlightCards: sfConferenceHighlightCards,
    registrationOpen: false,
    lifecycleStatus: 'past',
    cta: {
      primaryLabel: 'Request Invite',
      primaryUrl: 'https://luma.com/qtfo7tkt',
      isExternal: true,
    },
    metadata: {
      title: 'Global cxo circle | Silicon Valley AI Thought Leadership Summit',
      description:
        'Join Atomicwork, Global cxo circle, Okta Ventures, and Tray.ai at the Palo Alto Art Center for a 150+ person summit on the deeper purpose of AI entrepreneurship.',
      image: sfConferenceImages.banner,
    },
    venue: {
      name: 'Palo Alto Art Center',
      address: '1313 Newell Rd, Palo Alto, CA 94303',
      description:
        'A creative venue in the heart of Palo Alto. The precise meeting rooms and access instructions are shared with confirmed guests during registration.',
      image: sfConferenceImages.venue || sfConferenceImages.hero,
      mapEmbedUrl: 'https://maps.google.com/maps?q=Palo Alto Art Center&output=embed',
    },
  },
  {
    id: 1,
    slug: 'sri-lanka-2025',
    title: 'Global Innovation Summit & Retreat',
    tagline: 'A seaside innovation retreat uniting CIOs and founders.',
    date: 'September 2-5, 2025',
    location: 'Colombo, Sri Lanka',
    description:
      'Where startup founders and enterprise innovators come together. Led by CIOs & CxOs for thought leadership, enterprise innovation, and advisory.',
    attendees: '150+',
    heroImage: globalInnovationSummitImages.heroImage,
    heroImageMobile: globalInnovationSummitImages.heroImage,
    cardImage: globalInnovationSummitImages.heroImage,
    bannerImage: '/assets/events/SriLanka/banner.png',
    gallery: globalInnovationSummitImages.gallery,
    overview:
      'This is a one-of-a-kind summit & retreat where startup founders and enterprise leaders unite to share common challenges and opportunities to develop a brighter future together. Bringing together more than 75 global enterprise leaders including CIOs, CISOs, CTOs, and CxOs with over 30 high-growth startups to explore the impact of AI initiatives, evaluate build-versus-buy strategies for enterprises, and equip founders to succeed in enterprise sales. Organized by current and former CIOs and CISOs, this exclusive event is being held in the stunning island nation of Sri Lanka, celebrated for its world-class hospitality, vibrant culture, and exceptional culinary experiences.',
    objectives: [
      'Connect 75+ global leading enterprise innovators (CIO/CISO, CTO, CxO) with 30+ startup founders',
      'Explore AI influence on enterprises, digital work experience, employee empowerment, and productivity',
      'Create collaborative innovation partnerships between startups and enterprises',
      'Build strategic relationships and advisory board opportunities',
    ],
    speakers: globalInnovationSummitSpeakers,
    sponsors: globalInnovationSummitSponsors,
    itinerary: globalInnovationSummitItinerary,
    highlights: [
      '75+ global leading enterprise innovators (CIOs, CTOs, CxOs) from mid to large enterprises with 1000+ employees',
      '30+ startup founders with revenue over $1M+ and raised Series A funding',
      'Guaranteed 1-on-1 meetings: Each founder meets at least 5 CxOs for quality relationship building',
      'Organized by former and current CIOs & CISOs for authentic peer-to-peer learning in beautiful Sri Lanka',
    ],
    highlightCards: sriLankaHighlightCards,
    registrationOpen: false,
    price: 'Contact for pricing',
    cta: {
      primaryLabel: 'Request Recap Deck',
      primaryUrl: 'mailto:hello@globalciocircle.com?subject=Sri Lanka 2025 Recap',
      secondaryLabel: 'Explore Gallery',
      secondaryUrl: '/gallery',
    },
    metadata: {
      title: 'Global cxo circle | Sri Lanka Innovation Summit 2025',
      description:
        'Go inside the four-day Sri Lanka retreat where 75+ CIOs and 30+ founders co-create the future of enterprise innovation.',
      image: globalInnovationSummitImages.heroImage,
    },
    venue: {
      name: 'Taj Samudra',
      address: '25 Galle Face Centre Road, Colombo 00300, Sri Lanka',
      description:
        "A seaside splendor overlooking the iconic Galle Face Green, Taj Samudra is Colombo's premier luxury hotel. Set within 11 acres of landscaped gardens with 300 rooms and suites, you'll enjoy stunning Indian Ocean views, exquisite accommodations, and authentic Sri Lankan hospitality.",
      image: globalInnovationSummitImages.venue,
      mapEmbedUrl:
        'https://maps.google.com/maps?q=Taj+Samudra+Hotel,+25+Galle+Face+Centre+Road,+Colombo,+Sri+Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
  },
];

export default eventsData;
