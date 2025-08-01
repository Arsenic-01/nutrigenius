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
    imageUrl: "/team/user_pfp/vedant.jpeg",
    tasks: [
      "Data Preprocessing & Cleaning",
      "Next.js Backend Architecture",
      "Frontend Development with Next.js",
    ],
    links: {
      github: "https://github.com/Arsenic-01/",
      linkedin: "https://www.linkedin.com/in/vedant-bhor-39287828b/",
      discord: "https://discord.com/users/862682607162359819",
      portfolio: "https://vedantbhor.vercel.app/",
    },
  },
  {
    name: "Tanay Hingane",
    role: "AI & Authentication Specialist",
    imageUrl: "/team/user_pfp/tanay.jpeg",
    tasks: [
      "Core Algorithm Selection",
      "Dataset Imputation & Encoding",
      "User Authentication with Clerk",
      "Meal History Feature Logic",
    ],
    links: {
      github: "https://github.com/TanayHingane",
      linkedin: "http://www.linkedin.com/in/TanayHingane",
      discord: "https://discord.com/users/1198554997386915880",
      portfolio:
        "https://www.snapchat.com/add/tanay.h03?share_id=L1uzTRlecFo&locale=en-IN",
    },
  },
  {
    name: "Adarsh Tile",
    role: "Backend & API Lead",
    imageUrl: "/team/user_pfp/adarsh.jpeg",
    tasks: [
      "Developing FastAPI Backend",
      "ML Model & API Integration",
      "API Endpoint Management",
    ],
    links: {
      github: "https://github.com/AdarshSanskar",
      linkedin: "http://www.linkedin.com/in/tile-adarsh",
      discord: "#",
    },
  },
  {
    name: "Sushrut Deshmukh",
    role: "Machine Learning Engineer",
    imageUrl: "/team/user_pfp/sushrut.jpeg",
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
    imageUrl: "/team/user_pfp/yadnesh.png",
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
            <Image
              src={member.imageUrl}
              alt={member.name}
              width={200}
              height={200}
              className="w-32 h-32 rounded-full"
            />
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
