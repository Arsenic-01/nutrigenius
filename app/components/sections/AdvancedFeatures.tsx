import Section from "../ui/Section";
import Card from "../ui/Card";

const features = [
  {
    icon: "🧠",
    title: "Dynamic Nutritional Analysis",
    description:
      "Leverages a focused dataset of Indian cuisine to enrich every recipe with accurate nutritional data, including calories, protein, and fiber. This allows for true health-based recommendations.",
  },
  {
    icon: "🎯",
    title: "Hyper-Personalized Ranking",
    description:
      "Goes beyond keywords to rank results based on a multi-factor score, considering your BMI, health goals, cooking skill, and even ingredients you already have in your pantry.",
  },
  {
    icon: "🍲",
    title: "Context-Aware Recommendations",
    description:
      "The model understands the difference between a snack and a main course. When you ask for dinner, it intelligently prioritizes proper meals over appetizers to give you more suitable results.",
  },
  {
    icon: "⚡️",
    title: "Optimized for Speed",
    description:
      "All heavy data processing and merging is done once at startup. This creates a single, efficient master dataset, ensuring your recommendations are generated almost instantly.",
  },
];

const AdvancedFeatures = () => {
  return (
    <Section id="advanced-features">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center">
        <span className="mr-3 text-2xl">✨</span>Advanced Features
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        Cutting-edge integrations transform the application from a simple tool
        into a dynamic and intelligent cooking companion.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="p-8 text-center">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-slate-800">
              {feature.title}
            </h3>
            <p className="text-slate-600">{feature.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default AdvancedFeatures;
