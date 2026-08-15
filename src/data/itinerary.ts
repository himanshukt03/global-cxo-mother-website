export interface SubEvent {
  time: string;
  title: string;
  description: string;
  speakers?: string[];
  moderators?: string[];
  duration?: string;
}

export interface ItineraryItem {
  date: string;
  time: string;
  title: string;
  description: string;
  type: 'keynote' | 'panel' | 'workshop' | 'networking' | 'break' | 'cultural' | 'travel' | 'arrival' | 'breakfast' | 'pitch' | 'lunch' | 'cocktails' | 'dinner' | 'announcements';
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  sponsors?: string[];
  speakers?: string[];
  moderators?: string[];
  workshopLeaders?: string[];
  subEvents?: SubEvent[];
}

export const globalInnovationSummitItinerary: ItineraryItem[] = [
  {
    date: "September 1",
    time: "01:00 pm - 11:55 pm",
    title: "Early Arrival",
    description: "Arrivals on this day are optional and must be arranged in advance with the organizers.",
    type: "arrival",
    timeOfDay: "afternoon"
  },
  {
    date: "September 2",
    time: "12:00 pm - 06:00 pm",
    title: "Arrival & Check-in",
    description: "Guests arrive and check in. Spend the day at leisure, enjoying the scenic views of the Indian Ocean.",
    type: "arrival",
    timeOfDay: "afternoon"
  },
  {
    date: "September 2",
    time: "05:30 pm - 10:00 pm",
    title: "Gala Reception Dinner, Fireside Chats and Keynotes",
    description: "An elegant dinner highlighted with keynotes and panels by distinguished guests. Features welcome addresses, lifetime achievement awards, and panel discussions on mission impossible achievements. Located at Cinnamon Life's Cumulus Ballroom.",
    type: "dinner",
    timeOfDay: "evening",
    speakers: ["H.E. Santosh Jha", "Honorable Dr. Hans Wijayasuriya", "Venerable Amadassana Thero", "Aravinda De Silva", "Krishan Balendra", "J A Chowdary", "K V Rao", "Gary Seaton", "Penne Jayewardene"],
    subEvents: [
      {
        time: "5:30 PM - 6:15 PM",
        title: "Networking & Cocktails",
        description: "Welcome reception and networking with cocktails"
      },
      {
        time: "6:10 PM - 6:15 PM", 
        title: "MC Introduction",
        description: "MC introduces the event, the guests, the agenda, and the logistics",
        speakers: ["Dino Corera"]
      },
      {
        time: "6:15 PM - 6:30 PM",
        title: "Kick-Off Celebrations",
        description: "Opening Acts"
      },
      {
        time: "6:30 PM - 6:35 PM",
        title: "Candle Lighting Kick Off",
        description: "Traditional candle lighting ceremony"
      },
      {
        time: "6:35 PM - 6:45 PM",
        title: "Host Welcome Address",
        description: "Founder & CEO welcome address",
        speakers: ["Lenin Gali - Founder & CEO, Global cxo circle"]
      },
      {
        time: "6:45 PM - 7:00 PM",
        title: "Honorary Host Welcome",
        description: "A spotlight on Aravinda and Sri Lanka. How technology and tourism can be a great combination to attract global events like this, putting Sri Lanka in the spotlight",
        speakers: ["Aravinda De Silva - Legendary Cricketer"]
      },
      {
        time: "7:00 PM - 7:15 PM",
        title: "Host Country Welcome & Remarks",
        description: "Sharing new initiatives by the Government to help technology companies do business in Sri Lanka",
        speakers: ["Honorable Dr. Hans Wijayasuriya - Chief Advisor to the President of Sri Lanka"]
      },
      {
        time: "7:15 PM - 7:30 PM",
        title: "Chief Guest Address",
        description: "Sharing India and Sri Lanka's relationship, technology partnerships, and strategic initiatives on innovation",
        speakers: ["His Excellency Indian High Commissioner Santosh Jha"]
      },
      {
        time: "7:30 PM - 7:45 PM",
        title: "Welcome Address: Monetary Video & Venerable Amadassana Thero",
        description: "Special welcome address"
      },
      {
        time: "7:45 PM - 8:00 PM",
        title: "State of Sri Lanka Business",
        description: "On the topic of State of Sri Lanka Businesses and Opportunities for Enterprises and Startups",
        speakers: ["Krishan Balendra - Chairman of John Keels Holdings"]
      },
      {
        time: "7:30 PM - 8:30 PM",
        title: "Dinner Service",
        description: "Elegant dinner service during presentations"
      },
      {
        time: "8:30 PM - 10:00 PM",
        title: "Lifetime Achievement Award & Panel",
        description: "Celebrating exceptional individuals with Lifetime Achievement Awards followed by Panel on Mission Impossible: What are some of the most impossible tasks that these outstanding guests have done in their lifetime?",
        speakers: [
          "Aravinda De Silva - Hall of Fame Cricketer and Entrepreneur",
          "J A Chowdary - Chairman, ISF, Architect of Indian Technology",
          "KV RAO - Chairman, Tata International, Sr Advisor BCG", 
          "Penny Jayewardene - Satya Sai Karuna Nilayam Foundation",
          "Gary Seaton - Founder Oceanic Group & G&G groups, Chairman Australian Oilseeds Holdings"
        ],
        moderators: ["Lenin Gali"]
      }
    ]
  },
  {
    date: "September 3",
    time: "07:00 am - 08:30 am",
    title: "Networking Breakfast",
    description: "Kick off the day with a dynamic networking breakfast, offering an assortment of breakfast options and refreshments. A great opportunity to connect informally with fellow delegates, founders, and CxOs.",
    type: "breakfast",
    timeOfDay: "morning"
  },
  {
    date: "September 3",
    time: "08:35 am - 09:00 am",
    title: "Welcome Address",
    description: "A formal welcome to the Global cxo circle and the Global Innovation Summit. The session will outline the purpose of the summit - bridging the gap between visionary founders and experienced CxOs. Includes an overview of the summit agenda, key logistics, strategic goals, and the collaborative opportunities ahead.",
    type: "keynote",
    timeOfDay: "morning",
    speakers: ["Lenin Gali"]
  },
  {
    date: "September 3",
    time: "09:00 am - 09:25 am",
    title: "Opening Keynote",
    description: "Going to Market with AWS: A keynote focused on AWS ecosystem and support they provide to founders, enterprises and partnerships. At this session, AWS, Atomicwork and AIVAR announce a partnership showcasing ecosystem strength and opportunities for startups and enterprises.",
    type: "keynote",
    timeOfDay: "morning",
    speakers: ["Chris Casey", "Lenin Gali", "Kousik Rajendran"]
  },
  {
    date: "September 3",
    time: "09:30 am - 10:00 am",
    title: "Fire Side Chat with Hall Of Fame CIOs",
    description: "Recognition for Hall Of Fame legends and their contributions to the CIO community. Discussion topics include defining moments, leadership philosophy, turning challenges into legacy, and passing the torch.",
    type: "keynote",
    timeOfDay: "morning",
    moderators: ["Lenin Gali"],
    speakers: ["Gopalratnam VC", "Gary J Ahwah", "Prasad Ramakrishnan", "Karl Mosgofian"]
  },
  {
    date: "September 3",
    time: "10:00 am - 10:15 am",
    title: "Break",
    description: "Break",
    type: "break",
    timeOfDay: "morning"
  },
  {
    date: "September 3",
    time: "10:15 am - 11:15 am",
    title: "Workshop - Partnerships, ISV, Channels for Startups",
    description: "Workshop on partnerships including ISVs and channel partners. Topics include strategic fit, go-to-market impact, value exchange, and partnership scalability.",
    type: "workshop",
    timeOfDay: "morning",
    sponsors: ["AWS"],
    workshopLeaders: ["Dr. Michael Lewrick"]
  },
  {
    date: "September 3",
    time: "11:20 am - 12:30 pm",
    title: "Startup Pitch Session",
    description: "Selected startups pitch their groundbreaking solutions to an audience of investors, executives, and innovators. A showcase of fresh ideas and entrepreneurial energy.",
    type: "pitch",
    timeOfDay: "morning",
    moderators: ["Lenin Gali", "Rakshita Vishakh"]
  },
  {
    date: "September 3",
    time: "12:30 pm - 01:30 pm",
    title: "Lunch & Pitch Session",
    description: "Lunch break",
    type: "lunch",
    timeOfDay: "afternoon"
  },
  {
    date: "September 3",
    time: "01:35 pm - 02:25 pm",
    title: "Partnerships for Accelerating Growth and Scale - Panel Discussion",
    description: "Deep dive into the partnership workshop with insights from panelists and attendees.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["AIVAR"],
    moderators: ["Lenin Gali"],
    speakers: ["Chris Casey", "Kousik Rajendran", "Nikhil Sud", "Prasad Ramakrishnan"]
  },
  {
    date: "September 3",
    time: "02:25 pm - 02:30 pm",
    title: "Announcements",
    description: "Event announcements",
    type: "announcements",
    timeOfDay: "afternoon"
  },
  {
    date: "September 3",
    time: "02:30 pm - 03:00 pm",
    title: "State of Business, Startups and Opportunities - A view from Singapore",
    description: "Experts, residents and business leaders from Singapore share opportunities for startups, businesses, and the role Sri Lanka and India could play.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["AWS"],
    moderators: ["Nikhil Dinesh"],
    speakers: ["K V Rao", "Imal Kalutotage", "Philip Madgwick", "Sanjay Mohottala"]
  },
  {
    date: "September 3",
    time: "03:05 pm - 04:00 pm",
    title: "CxO Advisory Boards - Why, When & How to create, effectively operate, and benefit from them",
    description: "Session on creating and leveraging a CxO Advisory Board, moving beyond theory to transform influential names into powerful strategic assets for startup growth.",
    type: "workshop",
    timeOfDay: "afternoon",
    sponsors: ["Trupeer"],
    workshopLeaders: ["Dr. Michael Lewrick"]
  },
  {
    date: "September 3",
    time: "04:00 pm - 04:15 pm",
    title: "Break",
    description: "Break",
    type: "break",
    timeOfDay: "afternoon"
  },
  {
    date: "September 3",
    time: "04:15 pm - 04:45 pm",
    title: "Fire Side Chat with Entrepreneurs, Technology & Innovation Enablers",
    description: "Candid conversation with CEOs of prominent organizations dedicated to helping founders, enterprises, environment and government goals.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["ISF"],
    moderators: ["J A Chowdary"],
    speakers: ["Joginder Tanikella", "Ananth Kanoi", "Gary Seaton", "Vikrant Varshney"]
  },
  {
    date: "September 3",
    time: "04:50 pm - 05:45 pm",
    title: "Panel Discussion: CxO Advisory Boards - Why, When & How",
    description: "Discussion on creating and leveraging CxO Advisory Boards, covering outcomes derived from the workshop.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["Trupeer"],
    moderators: ["Karthik Chakkarapani"],
    speakers: ["Gopalratnam VC", "Vishal Gupta", "Raj Kalahasthi", "Karl Mosgofian"]
  },
  {
    date: "September 3",
    time: "05:45 pm - 06:30 pm",
    title: "Networking & 1-1 Meetings",
    description: "Startups and Executives have 1-1 meetings for networking and business discussions.",
    type: "networking",
    timeOfDay: "evening"
  },
  {
    date: "September 3",
    time: "06:30 pm - 07:00 pm",
    title: "Cocktails",
    description: "Networking Cocktails",
    type: "cocktails",
    timeOfDay: "evening",
    sponsors: ["Sprinto", "Atomicwork"]
  },
  {
    date: "September 3",
    time: "07:00 pm - 08:30 pm",
    title: "Awards Dinner",
    description: "Recognition dinner for amazing leaders dedicated to the profession. Inducting leaders into the CIO Hall Of Fame and recognizing CIOs taking risks by introducing startups and supporting founders' vision.",
    type: "dinner",
    timeOfDay: "evening",
    sponsors: ["Global cxo circle"],
    subEvents: [
      {
        time: "7:00 PM - 7:15 PM",
        title: "Welcome Reception & Dinner Service",
        description: "Elegant dinner reception begins with networking and dinner service for all attendees"
      },
      {
        time: "7:15 PM - 7:25 PM",
        title: "Opening Remarks & Awards Introduction",
        description: "Welcome address and introduction to the evening's recognition ceremonies celebrating innovation leadership",
        speakers: ["Lenin Gali, Founder & CEO, Global cxo circle"]
      },
      {
        time: "7:25 PM - 7:45 PM",
        title: "Speaker Excellence Awards",
        description: "Recognition of outstanding speakers who shared invaluable insights and expertise throughout the summit. Honoring those who contributed to knowledge sharing and thought leadership in technology innovation",
        speakers: ["Selected Summit Speakers", "Award Recipients"]
      },
      {
        time: "7:45 PM - 8:05 PM",
        title: "Hall of Fame Induction Ceremony",
        description: "Prestigious induction of exceptional CIOs and technology leaders into the Global cxo circle Hall of Fame. Celebrating careers of outstanding achievement, innovation, and leadership that have shaped the technology landscape",
        speakers: ["Hall of Fame Inductees", "Recognition Committee"]
      },
      {
        time: "8:05 PM - 8:25 PM",
        title: "Innovation Champions Awards",
        description: "Honoring visionary leaders who are driving technological transformation and pioneering innovation initiatives. Recognizing those who are taking calculated risks, supporting startup ecosystems, and fostering next-generation solutions",
        speakers: ["Innovation Champions Recipients", "Innovation Award Panel"]
      },
      {
        time: "8:25 PM - 8:30 PM",
        title: "Closing Remarks & Networking",
        description: "Final remarks celebrating the achievements of all honorees and encouraging continued collaboration within the Global cxo circle community",
        speakers: ["Lenin Gali"]
      }
    ]
  },
  {
    date: "September 3",
    time: "09:30 pm - 10:30 pm",
    title: "Latenight Cocktails",
    description: "Optional",
    type: "cocktails",
    timeOfDay: "evening"
  },
  {
    date: "September 4",
    time: "07:00 am - 08:00 am",
    title: "Networking Breakfast",
    description: "Jump start the day with connections and a diverse array of breakfast and beverages.",
    type: "breakfast",
    timeOfDay: "morning"
  },
  {
    date: "September 4",
    time: "08:00 am - 08:55 am",
    title: "Agentic AI in Enterprises: Fireside Chat with Bipul Sinha & Arvind Jain",
    description: "Discover how Zuora is leveraging AI to reshape its business, enhance products, and improve customer experiences. Features a fireside chat discussing important AI and security topics that worry enterprise CIOs, CISOs, and CTOs.",
    type: "keynote",
    timeOfDay: "morning",
    sponsors: ["Atomicwork"],
    speakers: ["Karthik Chakkarapani", "Bipul Sinha", "Arvind Jain"]
  },
  {
    date: "September 4",
    time: "09:00 am - 09:25 am",
    title: "VC Panel - AI Investments: India and US Corridor Startups",
    description: "Panel discussion on AI investments and startup opportunities in the India-US corridor, with highlights on opportunities and guidelines for Founders.",
    type: "panel",
    timeOfDay: "morning",
    sponsors: ["Neon Fund", "WeFounderCircle"],
    moderators: ["Pranay Desai"],
    speakers: ["Siddhartha Ahluwalia", "Arpit Agarwal", "Abhishek Gupta", "Sanjay Mohottala"]
  },
  {
    date: "September 4",
    time: "09:30 am - 10:25 am",
    title: "Monetization in the AI Era: Value and Outcome-Based Pricing for AI vs Traditional Consumption Based Pricing (Pros and Cons)",
    description: "Generic pricing workshop on new approaches to pricing in AI Era, covering usage, value, and outcome-based pricing.",
    type: "workshop",
    timeOfDay: "morning",
    sponsors: ["Zuora"],
    workshopLeaders: ["Ken Houseman", "Dr. Michael Lewrick"]
  },
  {
    date: "September 4",
    time: "10:25 am - 10:35 am",
    title: "Break",
    description: "Break",
    type: "break",
    timeOfDay: "morning"
  },
  {
    date: "September 4",
    time: "10:35 am - 11:15 am",
    title: "Founders Panel - Building a Global Startup from Groundup",
    description: "Deep dive into the arduous & life altering journey of renowned Founders",
    type: "panel",
    timeOfDay: "morning",
    sponsors: ["Linen.Cloud"],
    moderators: ["Siddhartha Ahluwalia"],
    speakers: ["Pritish Gupta", "Krishna Namasivayam", "Jacob Mathew", "Anoothi Kumar"]
  },
  {
    date: "September 4",
    time: "11:20 am - 12:30 pm",
    title: "Pricing Strategy: Total Monetization and Pricing in AI Era",
    description: "In-depth exploration of workshop takeaways, moderators' observations and emerging themes, and attendee-led discussion.",
    type: "panel",
    timeOfDay: "morning",
    sponsors: ["Zuora"],
    moderators: ["Ken Houseman"],
    speakers: ["Aparna Chugh", "Vishal Gupta", "Philip Madgwick", "Pritish Gupta"]
  },
  {
    date: "September 4",
    time: "12:30 pm - 01:30 pm",
    title: "Lunch",
    description: "Lunch break",
    type: "lunch",
    timeOfDay: "afternoon"
  },
  {
    date: "September 4",
    time: "01:35 pm - 02:30 pm",
    title: "Workshop: How to Sell to CIOs / CxOs in the AI Era",
    description: "Working session with attendees sharing insights on how startups and SaaS companies can effectively engage with CxOs in today's AI-driven landscape.",
    type: "workshop",
    timeOfDay: "afternoon",
    sponsors: ["Alteryx"],
    workshopLeaders: ["Dr. Michael Lewrick"]
  },
  {
    date: "September 4",
    time: "02:35 pm - 03:00 pm",
    title: "Sri Lanka Startups, Partners and VC Ecosystem: A deep discussion about the ecosystem for founders, entrepreneurs, and VCs",
    description: "Panel discussion with local founders, VCs, and entrepreneurs about opportunities, struggles, and external influence from summits.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["VCs of Sri Lanka"],
    moderators: ["Sanjay Mohottala"],
    speakers: ["Shevan Goonetilleke", "Chalinda Abeykoon", "Imal Kalutotage"]
  },
  {
    date: "September 4",
    time: "03:00 pm - 03:10 pm",
    title: "Break",
    description: "",
    type: "break",
    timeOfDay: "afternoon"
  },
  {
    date: "September 4",
    time: "03:10 pm - 03:35 pm",
    title: "Innovation MENA: The Middle East's Perspectives on Innovation",
    description: "Exploring how emerging technologies are reshaping transportation and logistics in the Middle East and North Africa, with focus on cross-sector collaboration to drive innovation and create sustainable, efficient, and interconnected urban environments.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["Mondee"],
    moderators: ["Dr. Karthik Ramesh"],
    speakers: ["Dr. Bu Abdullah", "Dr. Vishwannath Hiremath", "Mohammad Y Helmi"]
  },
  {
    date: "September 4",
    time: "03:40 pm - 04:30 pm",
    title: "Deep Dive: Selling to CxOs in Enterprises",
    description: "Building on the earlier workshop, this session explores key themes and provides real-time feedback, offering actionable insights for engaging enterprise decision-makers.",
    type: "panel",
    timeOfDay: "afternoon",
    sponsors: ["Atomicwork"],
    moderators: ["Arvind Mathur"],
    speakers: ["Archana Rao", "Deepika Rayala", "Namo Tiwari", "David Williamson"]
  },
  {
    date: "September 4",
    time: "04:30 pm - 05:00 pm",
    title: "CIOs of Sri Lanka: A perspective on Innovation, Challenges, and Opportunities for Startups",
    description: "Sri Lankan CIOs share insights on innovation stories, enterprise challenges and opportunities, and their risk appetite to work with startups.",
    type: "panel",
    timeOfDay: "afternoon",
    moderators: ["Lenin Gali"],
    speakers: ["Shanaka Rabel", "Druvi Vaidyakularatne", "Vindya Solangaarachchi"]
  },
  {
    date: "September 4",
    time: "05:00 pm - 05:15 pm",
    title: "Closing Keynote Session by Aravinda De Silva",
    description: "Thanking the delegation for spending time in Sri Lanka, helping the economy and bringing life to Technology Tourism. Sharing opportunities and incentives to bring global events, startups, and businesses to Sri Lanka.",
    type: "keynote",
    timeOfDay: "evening",
    speakers: ["Aravinda De Silva"]
  },
  {
    date: "September 4",
    time: "05:00 pm - 06:00 pm",
    title: "Networking & 1-1 Meetings",
    description: "Networking and one-on-one meetings between participants",
    type: "networking",
    timeOfDay: "evening"
  },
  {
    date: "September 4",
    time: "06:00 pm - 07:00 pm",
    title: "Evening Cocktails",
    description: "Relax and Network",
    type: "cocktails",
    timeOfDay: "evening"
  },
  {
    date: "September 4",
    time: "07:00 pm - 08:30 pm",
    title: "Main Event Closing Dinner",
    description: "",
    type: "dinner",
    timeOfDay: "evening"
  },
  {
    date: "September 4",
    time: "09:30 pm - 10:30 pm",
    title: "Sponsored Cocktails",
    description: "Optional attendance",
    type: "cocktails",
    timeOfDay: "evening"
  },
  {
    date: "September 5",
    time: "07:00 am - 08:00 am",
    title: "Networking Breakfast",
    description: "Jump start the day by building connections and enjoying a diverse array of breakfast and beverages.",
    type: "breakfast",
    timeOfDay: "morning"
  },
  {
    date: "September 5",
    time: "08:00 am - 05:30 pm",
    title: "Excursions",
    description: "Explore Sri Lankan culture and architecture at <strong>Kelaniya Raja Maha Viharaya</strong> and the multi-cultural <strong>Gangaramaya Temple</strong>. Enjoy elegant High Tea at the historic <strong>Galle Face Hotel</strong>, panoramic city views from the <strong> Nelum Kuluna</strong>, and premium shopping at <strong>One Galle Face Mall</strong>.",
    type: "cultural",
    timeOfDay: "morning"
  },
  {
    date: "September 5",
    time: "05:30 pm - 09:30 pm",
    title: "Farewell Dinner",
    description: "A memorable dinner and farewell to Sri Lanka's beauty and hospitality. Extending thanks to the organizers, sponsors and partners who made it all happen. Located at Ocean Front, Taj Samudra.",
    type: "dinner",
    timeOfDay: "evening"
  }
];
