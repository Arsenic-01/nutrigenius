import Section from "../ui/Section";
import Card from "../ui/Card";
import DiscordIcon from "@/public/team/social_icons/discord.svg";
import GithubIcon from "@/public/team/social_icons/github.svg";
import LinkedinIcon from "@/public/team/social_icons/linkedin.svg";
import PortfolioIcon from "@/public/team/social_icons/portfolio.svg";
import Image from "next/image";

const teamMembers = [
  {
    name: "Vedant Bhor",
    role: "Project & Full-Stack Lead",
    imageUrl: "/placeholder-user.svg",
    tasks: [
      "Data Preprocessing & Cleaning",
      "Next.js Backend Architecture",
      "Frontend Development with Next.js",
    ],
    links: {
      github: "#",
      linkedin: "#",
      discord: "#",
      portfolio: "#",
    },
  },
  {
    name: "Tanay Hingane",
    role: "AI & Authentication Specialist",
    imageUrl: "/placeholder-user.svg",
    tasks: [
      "Core Algorithm Selection",
      "Dataset Imputation & Encoding",
      "User Authentication with Clerk",
      "Meal History Feature Logic",
    ],
    links: {
      github: "#",
      linkedin: "#",
      discord: "#",
      portfolio: "#",
    },
  },
  {
    name: "Adarsh Tile",
    role: "Backend & API Lead",
    imageUrl: "/placeholder-user.svg",
    tasks: [
      "Developing FastAPI Backend",
      "ML Model & API Integration",
      "API Endpoint Management",
    ],
    links: {
      github: "#",
      linkedin: "#",
      discord: "#",
    },
  },
  {
    name: "Sushrut Deshmukh",
    role: "Machine Learning Engineer",
    imageUrl: "/placeholder-user.svg",
    tasks: [
      "Training & Tuning ML Models",
      "Model Performance Optimization",
      "Implementing Core Algorithms",
    ],
    links: {
      github: "#",
      linkedin: "#",
      discord: "#",
    },
  },
  {
    name: "Yadnesh Udar",
    role: "QA & Testing Lead",
    imageUrl: "/placeholder-user.svg",
    tasks: [
      "End-to-End Project Testing",
      "Unit & Integration Test Cases",
      "Overall Quality Assurance",
    ],
    links: {
      github: "#",
      linkedin: "#",
      discord: "#",
    },
  },
];

const UserPlaceholder = () => (
  <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-slate-400"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </div>
);

const Team = () => {
  return (
    <Section id="team">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
          Meet the Team
        </h2>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          The dedicated individuals bringing NutriGenius AI to life.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            className="p-8 text-center flex flex-col items-center"
          >
            <UserPlaceholder />
            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              {member.name}
            </h3>
            <p className="mt-1 text-base font-semibold text-teal-600">
              {member.role}
            </p>

            <ul className="mt-6 text-left space-y-2 text-slate-600 list-disc list-inside text-sm flex-grow">
              {member.tasks.map((task) => (
                <div key={task}>- {task}</div>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-slate-200 w-full flex justify-center space-x-5">
              <a
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={GithubIcon.src}
                  alt="GitHub"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={LinkedinIcon.src}
                  alt="LinkedIn"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href={member.links.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={DiscordIcon.src}
                  alt="Discord"
                  className="w-6 h-6"
                  width={24}
                  height={24}
                />
              </a>
              {member.links.portfolio && (
                <a
                  href={member.links.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={PortfolioIcon.src}
                    alt="Portfolio"
                    className="w-6 h-6"
                    width={24}
                    height={24}
                  />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Team;
