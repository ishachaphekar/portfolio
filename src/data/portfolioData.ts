export interface ProjectData {
  id: string;
  label: string;
  title: string;
  description: string;
  role: string;
  outcome: string;
  processStat: string;
  accentColor: string;
  tags: string[];
  imagePlaceholder: {
    title: string;
    subtitle: string;
    tag: string;
  };
}

export interface AnnotationData {
  word: string;
  note: string;
}

export interface PhilosophyData {
  question: string;
  answer: string;
}

export interface ExperienceData {
  role: string;
  company: string;
  duration: string;
}

export interface ResearchCardData {
  id: string;
  title: string;
  subtitle: string;
  detail?: string;
  badge?: string;
  imageSrc: string;
  externalUrl?: string;
}

export interface TestimonialData {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  avatarSrc: string;
}

export const HERO_DATA = {
  opportunityPill: "Open to work",
  personalIntro: "hi, I'm Isha",
  headline: "Curious about why designs are the way they are, and what to do about it",
  subline: "UI/UX Designer with a visual design foundation, specializing in the space where structure, empathy, and craft meet.",
  annotations: [] as AnnotationData[]
};

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "karmaquest",
    label: "PROJECT 01",
    title: "KarmaQuest",
    description: "A narrative-driven mobile gaming experience exploring cultural morals and player choices, translating complex ancient storytelling into interactive modern UI patterns.",
    role: "Lead UI/UX & Visual Designer · 21 Weeks",
    outcome: "Narrative mobile game (functional prototype), brand identity, research documentation.",
    processStat: "21-week deep dive",
    accentColor: "#ADEFD1",
    tags: ["Mobile Game", "UX Research", "Brand Identity", "Storyboarding"],
    imagePlaceholder: {
      title: "KarmaQuest Mobile Experience",
      subtitle: "Functional prototype screens, narrative branching UI, and visual asset system",
      tag: "Functional Prototype — Figma & Unity"
    }
  },
  {
    id: "beacon",
    label: "PROJECT 02",
    title: "Beacon",
    description: "A holistic student evaluation platform bringing intelligence, emotional balance, and physical wellness indicators together in one calm dashboard.",
    role: "Product & Interaction Designer · 4 Weeks",
    outcome: "Full end-to-end Figma prototype.",
    processStat: "4-week sprint",
    accentColor: "#FF6B4A",
    tags: ["EdTech", "Data Visualization", "Information Architecture", "Design Systems"],
    imagePlaceholder: {
      title: "Beacon Assessment Dashboard",
      subtitle: "End-to-end Figma prototype, student analytics flow, and component library",
      tag: "Interactive Prototype — Figma"
    }
  },
  {
    id: "nirogya",
    label: "PROJECT 03",
    title: "Nirogya",
    description: "Connecting tier-3 and rural patients to doctor consultations and licensed local pharmacies, from diagnosis to doorstep.",
    role: "Solo UX/UI designer and researcher · 2 Weeks",
    outcome: "An end-to-end healthcare platform prototype, spanning telemedicine and pharmacy fulfillment, along with its brand identity and supporting research.",
    processStat: "2-week sprint",
    accentColor: "#00817D",
    tags: ["Telemedicine", "Healthcare", "UX Research", "Pharmacy Fulfillment"],
    imagePlaceholder: {
      title: "Nirogya Healthcare Platform",
      subtitle: "Telemedicine consultations & pharmacy fulfillment prototype",
      tag: "Interactive Prototype — Figma"
    }
  }
];

export const ABOUT_DATA = {
  heading: "About",
  introText: "There's a version of me that can't scroll past a clumsy font or drive by a confusing billboard without wanting to know why - hi, I'm Isha, by the way. I studied Visual Communication at UID, Gandhinagar, then spent a year in graphic design learning craft, typography, and visual systems, and now I'm moving into UX, chasing the 'why' instead of just the 'how it looks.' That's basically how I design too; I research before I jump in, get deep into the details, and in a team, I'd rather listen first and speak second.",

  philosophy: [
    {
      question: "What is good design?",
      answer: "Good design lives in the smallest details — the right font on a brochure, a satisfying animation, the feeling of enjoying a website or app."
    },
    {
      question: "What frustrates you?",
      answer: "Seeing bad design, and knowing it didn't have to be that way."
    },
    {
      question: "What excites you?",
      answer: "Brainstorming and ideating — sitting with a problem until it starts coming together, like a 1000-piece puzzle."
    },
    {
      question: "What do you enjoy making?",
      answer: "Platforms that solve real, current problems — increasingly, anything at the intersection of UX and AI."
    }
  ] as PhilosophyData[],

  skills: [
    "UX Research",
    "Wireframing & Prototyping",
    "Information Architecture",
    "Visual & UI Design",
    "Problem Solving",
    "Interaction Design",
    "Design Systems"
  ],

  tools: [
    "Figma",
    "Adobe Illustrator",
    "Photoshop",
    "InDesign",
    "Procreate",
    "Generative AI Tools"
  ],

  experience: [
    {
      role: "Junior Graphic Designer",
      company: "Clean Slate Agency",
      duration: "Apr 2026 – Jul 2026"
    },
    {
      role: "Associate Graphic Designer",
      company: "Repos Energy",
      duration: "Aug 2025 – Mar 2026"
    },
    {
      role: "Graphic Design Intern",
      company: "Bhavishyavani Future Company",
      duration: "May 2024 – Aug 2024"
    }
  ] as ExperienceData[],

  researchAndAchievements: [
    {
      id: "award-2025",
      title: "Best Paper Presentation Award",
      subtitle: "ICETDA International Conference",
      detail: "Recognized for outstanding academic contribution in digital game design & ethics at Poornima University, Jaipur.",
      badge: "Award 2025",
      imageSrc: "/cert-1.png"
    },
    {
      id: "taylor-francis",
      title: "Research Paper Publication",
      subtitle: "\"Reimagining Mahapuranic Morals in the Context of Digital Game Design\"",
      detail: "Presented at ICETDA 2025 and published as a book chapter by Taylor & Francis / CRC Press.",
      badge: "Taylor & Francis",
      imageSrc: "/cert-2.png",
      externalUrl: "https://www.routledge.com/Emerging-Trends-in-Design-and-Arts-A-Multidisciplinary-Approach-to-Aesthetics-Media-and-Innovation/Sharma-Rai-Mamodiya-Soni-Saxena/p/book/9781041326755"
    },
    {
      id: "copyright-2025",
      title: "Copyright Registration",
      subtitle: "Original Creative Work: \"KarmaQuest\"",
      detail: "Official copyright registration (SW-2025021571) for game concepts and visual design assets by Government of India.",
      badge: "Copyright 2025",
      imageSrc: "/cert-3.png"
    }
  ] as ResearchCardData[],

  testimonials: [
    {
      id: "kushagra",
      quote: "“Isha is one of the brightest team members we’ve had in our design team at Repos. She exhibits proactiveness, willingness to learn and accept feedback positively wherever needed. Having her as one of the most reliable team members was in a very genuine manner a great addition to the team. Wishing her continued success for her future endeavours!”",
      authorName: "Kushagra Bhargava",
      authorRole: "Senior Associate, Repos Energy",
      avatarSrc: "/avatar-kushagra.png"
    },
    {
      id: "preet",
      quote: "“As the Creative Director at Sangam India, I had the opportunity to work with Isha Chaphekar on the 13th and 14th June edition of The 11:11 Flea. Over the course of a month, she worked with us on multiple social media and offline marketing collaterals, adapting remarkably quickly to our creative language and brand identity despite tight timelines. What stood out was her openness to feedback, ability to understand the intent behind it, and the ownership she brought to the work. Her hand-drawn, illustrative direction was particularly memorable and reflected the thought and genuine effort she put into the project. I found Isha to be a dependable, thoughtful, and creatively driven collaborator. Her ability to push ideas while remaining receptive to direction made the collaboration seamless, and we look forward to working with her again at Sangam India.”",
      authorName: "Preet Parmar",
      authorRole: "Creative Director, Sangam India",
      avatarSrc: "/avatar-preet.png"
    },
    {
      id: "parth",
      quote: "“A year and a half ago, Isha design packaging for my food brand. I loved the way she understood the vision of my brand and then started the work. Her designs were elegant and really eye-catching. Today, as we take customer feedback, everyone mentions the quality and design of our packaging. Thanks to Isha! I am sure that one the reason for our good sales figures is design of the packaging.”",
      authorName: "Parth Kulkarni",
      authorRole: "Founder, Ruchkar Foods",
      avatarSrc: "/avatar-parth.png"
    }
  ] as TestimonialData[]
};
