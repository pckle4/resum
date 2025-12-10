
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Award {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeData {
  // Personal
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  
  // Coding Profiles
  leetcode?: string;
  codeforces?: string;
  hackerrank?: string;
  hackerearth?: string;

  title: string;
  profileImage?: string; // Base64 or URL
  
  // Content
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  awards: Award[];
  
  // Lists
  skills: string[];
  languages: string[];
  interests: string[];
}

export enum TemplateType {
  MODERN = 'modern',
  MINIMALIST = 'minimalist',
  CREATIVE = 'creative',
}

export const INITIAL_RESUME_DATA: ResumeData = {
  fullName: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  website: "alexmorgan.dev",
  linkedin: "linkedin.com/in/alexmorgan",
  leetcode: "leetcode.com/alexmorgan",
  codeforces: "",
  hackerrank: "",
  hackerearth: "",
  title: "Senior Product Designer",
  profileImage: "",
  summary: "Creative and detail-oriented Product Designer with over 6 years of experience in building user-centric digital products. Proficient in translating complex requirements into intuitive and visually appealing designs. Passionate about improving user experience through data-driven design decisions.",
  experience: [
    {
      id: "1",
      company: "TechFlow Solutions",
      position: "Senior UI/UX Designer",
      startDate: "2021",
      endDate: "",
      current: true,
      description: "Led the redesign of the core SaaS platform, improving user retention by 25%. Collaborated with cross-functional teams to define product vision and roadmap. Mentored junior designers and established a unified design system."
    },
    {
      id: "2",
      company: "Creative Pulse Agency",
      position: "UX Designer",
      startDate: "2018",
      endDate: "2021",
      current: false,
      description: "Designed responsive websites and mobile apps for diverse clients in fintech and healthcare. Conducted user research, wireframing, and prototyping to validate design concepts."
    }
  ],
  education: [
    {
      id: "1",
      school: "University of Design Arts",
      degree: "Bachelor of Fine Arts in Interaction Design",
      year: "2018",
      location: "New York, NY"
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Redesign",
      description: "Led the UX overhaul of a major fashion retailer's mobile app, resulting in a 15% increase in conversion.",
      link: "behance.net/alex/ecommerce"
    }
  ],
  certifications: [
    {
      id: "1",
      name: "Google UX Design Professional Certificate",
      issuer: "Coursera",
      year: "2020"
    }
  ],
  awards: [
    {
      id: "1",
      name: "Best UI Design 2022",
      issuer: "Tech Design Weekly",
      year: "2022"
    }
  ],
  skills: ["Figma", "Adobe XD", "React", "HTML/CSS", "User Research", "Prototyping", "Agile", "Tailwind CSS"],
  languages: ["English (Native)", "Spanish (Professional)"],
  interests: ["Photography", "Traveling", "Tech Meetups"]
};

export const TEMPLATE_PREVIEW_DATA: ResumeData = {
  fullName: "YOUR NAME",
  email: "email@example.com",
  phone: "(555) 000-0000",
  location: "City, Country",
  website: "portfolio.com",
  linkedin: "linkedin/username",
  title: "PROFESSIONAL TITLE",
  profileImage: "",
  summary: "This is a placeholder summary to demonstrate the layout of this template. Your professional profile will appear here, highlighting your key skills and career objectives.",
  experience: [
    {
      id: "1",
      company: "Company Name",
      position: "Job Position",
      startDate: "2022",
      endDate: "Present",
      current: true,
      description: "• Key responsibility or achievement in this role.\n• Another significant contribution to the team or project."
    },
    {
      id: "2",
      company: "Previous Company",
      position: "Previous Role",
      startDate: "2020",
      endDate: "2022",
      current: false,
      description: "• Description of duties and accomplishments.\n• Highlighted success metric or project outcome."
    }
  ],
  education: [
    {
      id: "1",
      school: "University Name",
      degree: "Degree / Major",
      year: "2020",
      location: "City, State"
    }
  ],
  projects: [
    {
      id: "1",
      name: "Project Name",
      description: "Brief description of the project and technologies used.",
      link: "project-link.com"
    }
  ],
  certifications: [],
  awards: [],
  skills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  languages: ["Language 1", "Language 2"],
  interests: []
};

export const EMPTY_RESUME_DATA: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  leetcode: "",
  codeforces: "",
  hackerrank: "",
  hackerearth: "",
  title: "",
  profileImage: "",
  summary: "",
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  awards: [],
  skills: [],
  languages: [],
  interests: []
};
