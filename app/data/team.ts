export interface TeamMember {
  name: string;
  role: string;
  image: string; // CDN image path
  twitter?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Brian Distelburger",
    role: "Co-Founder & CEO",
    image: "headshots/v1/brian.png",
    twitter: "https://x.com/bdistelburger",
    linkedin: "https://linkedin.com/in/bdistelburger",
  },
  {
    name: "Mark Tanner",
    role: "Co-Founder & CTO",
    image: "headshots/v1/mark.png",
    linkedin: "https://linkedin.com/in/marktanner",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    image: "headshots/v1/sarah.png",
    linkedin: "https://linkedin.com/in/sarahchen",
  },
  {
    name: "Jake Morrison",
    role: "Head of Engineering",
    image: "headshots/v1/jake.png",
    linkedin: "https://linkedin.com/in/jakemorrison",
  },
  {
    name: "Priya Sharma",
    role: "Senior Software Engineer",
    image: "headshots/v1/priya.png",
    linkedin: "https://linkedin.com/in/priyasharma",
  },
  {
    name: "Alex Rivera",
    role: "Product Designer",
    image: "headshots/v1/alex.png",
    twitter: "https://x.com/alexrivera",
    linkedin: "https://linkedin.com/in/alexrivera",
  },
  {
    name: "Jordan Lee",
    role: "Software Engineer",
    image: "headshots/v1/jordan.png",
    linkedin: "https://linkedin.com/in/jordanlee",
  },
  {
    name: "Emily Park",
    role: "Head of Sales",
    image: "headshots/v1/emily.png",
    linkedin: "https://linkedin.com/in/emilypark",
  },
  {
    name: "David Kim",
    role: "Machine Learning Engineer",
    image: "headshots/v1/david.png",
    linkedin: "https://linkedin.com/in/davidkim",
  },
  {
    name: "Rachel Torres",
    role: "Customer Success Lead",
    image: "headshots/v1/rachel.png",
    linkedin: "https://linkedin.com/in/racheltorres",
  },
  {
    name: "Marcus Johnson",
    role: "Growth Marketing",
    image: "headshots/v1/marcus.png",
    twitter: "https://x.com/marcusjohnson",
    linkedin: "https://linkedin.com/in/marcusjohnson",
  },
  {
    name: "Lena Vasquez",
    role: "People Operations",
    image: "headshots/v1/lena.png",
    linkedin: "https://linkedin.com/in/lenavasquez",
  },
];
