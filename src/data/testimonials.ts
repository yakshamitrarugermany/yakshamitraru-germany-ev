export type TestimonialRole =
  | "Host"
  | "Audience"
  | "Organiser"
  | "Fellow artist"
  | "Other";

export interface Testimonial {
  id: string;
  name: string;
  role: TestimonialRole;
  title?: string;
  event: string;
  city: string;
  date: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "katharina-vogel",
    name: "Dr. Katharina Vogel",
    role: "Host",
    title: "Programme Director, Haus der Kulturen",
    event: "Devi Mahatme",
    city: "Berlin",
    date: "October 2024",
    text: "A revelation. Yakshamitraru brought a form most of our audience had never seen — and held them for two hours without a word of German.",
  },
  {
    id: "marco-bellini",
    name: "Marco Bellini",
    role: "Organiser",
    title: "Artistic Lead, Festival Oriente",
    event: "Festival Oriente",
    city: "Milano",
    date: "June 2024",
    text: "Impeccably prepared, generous with context, and utterly compelling on stage. We would host them again tomorrow.",
  },
  {
    id: "anouk-meijer",
    name: "Anouk Meijer",
    role: "Host",
    title: "Head of Programming, Muziekgebouw",
    event: "Sudhanva Moksha",
    city: "Amsterdam",
    date: "November 2024",
    text: "The rider was clean, the ensemble punctual, and the performance singular. A pleasure from first email to curtain call.",
  },
  {
    id: "raghavendra-bhat",
    name: "Raghavendra Bhat",
    role: "Audience",
    event: "Yaksha Sankranthi",
    city: "Frankfurt",
    date: "January 2025",
    text: "Growing up in coastal Karnataka, Yakshagana nights were the heartbeat of our winters. Sitting in a packed hall in Frankfurt and hearing the first strike of the chende gave me goosebumps I had not felt in fifteen years.\n\nMy children, born and raised in Germany, leaned forward through every scene. To see our heritage staged with such dignity and fire here in Europe is a gift to the entire community.",
  },
  {
    id: "claire-dubois",
    name: "Claire Dubois",
    role: "Audience",
    event: "Chudamani Prasanga",
    city: "Paris",
    date: "March 2025",
    text: "I came knowing nothing about Yakshagana and left completely spellbound. The brief introduction and English synopsis gave just enough context, and from the moment the crowned performers entered, the rhythm, colour and expressive storytelling needed no translation.",
  },
  {
    id: "vidwan-suresh-hegde",
    name: "Vidwan Suresh Hegde",
    role: "Fellow artist",
    event: "Yaksha Sankranthi",
    city: "Munich",
    date: "January 2024",
    text: "What moves me most about Yakshamitraru Germany is their devotion to the grammar of the art. From the precision of the vesha and headgear to the interplay between the bhagavata and mummela, nothing is watered down for convenience.\n\nThey carry the true spirit of the Karnataka coast onto European stages while welcoming every audience member with warmth and humility.",
  },
];
