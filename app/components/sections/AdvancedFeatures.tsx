import Section from "../ui/Section";
import Card from "../ui/Card";

const features = [
  {
    icon: "🔍",
    title: "Content Filtering Engine",
    description:
      "The User can filter recipes based on their time frame, health goals, dietary preferences, cuisine and allergies.",
  },
  {
    icon: "📅",
    title: "Meal History Tracking",
    description:
      "The User can track their meal history and view their past recipes, helping them make informed choices for their meals.",
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
