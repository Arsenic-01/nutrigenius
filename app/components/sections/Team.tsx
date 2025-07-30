import Section from "../ui/Section";
import Card from "../ui/Card";

const teamMembers = [
  { name: "Vedant Bhor", role: "Project Lead", icon: "👨‍💻", color: "teal" },
  { name: "Tanay Hingane", role: "AI/ML Specialist", icon: "🧠", color: "sky" },
  { name: "Adarsh Tile", role: "Backend Lead", icon: "⚙️", color: "emerald" },
  { name: "Yadnesh Udar", role: "UI/UX Designer", icon: "🎨", color: "rose" },
];

const Team = () => {
  const colorClasses = {
    teal: { bg: "bg-teal-100", text: "text-teal-600", ring: "ring-teal-200" },
    sky: { bg: "bg-sky-100", text: "text-sky-600", ring: "ring-sky-200" },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      ring: "ring-emerald-200",
    },
    rose: { bg: "bg-rose-100", text: "text-rose-600", ring: "ring-rose-200" },
  };

  return (
    <Section id="team">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center">
        <span className="mr-3 text-2xl">👥</span>Meet the Team
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        The dedicated individuals behind NutriGenius AI.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {teamMembers.map((member) => {
          const colors =
            colorClasses[member.color as keyof typeof colorClasses];
          return (
            <Card key={member.name} className="text-center p-8">
              <div
                className={`w-24 h-24 rounded-full mx-auto ${colors.bg} flex items-center justify-center mb-4 border-4 border-white ring-2 ${colors.ring}`}
              >
                <span className={`text-4xl ${colors.text}`}>{member.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                {member.name}
              </h3>
              <p className={`${colors.text} font-semibold`}>{member.role}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};

export default Team;
