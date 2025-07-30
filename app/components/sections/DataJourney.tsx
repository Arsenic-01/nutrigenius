import Section from "../ui/Section";
import Card from "../ui/Card";

const journeySteps = [
  {
    title: "Onboarding & Data Collection",
    description:
      "The user registers and provides profile data (biometrics, goals, medical history) via a guided wizard. Data quality is ensured with client and server-side validation.",
  },
  {
    title: "Secure Storage",
    description:
      "The validated profile is sent via secure HTTPS to the User Profile Service. Derived metrics like BMI are calculated and the profile is stored in the MongoDB database.",
  },
  {
    title: "Recommendation Request",
    description:
      "The API Gateway authenticates the user via JWT and forwards the request to the ML Inference Service.",
  },
  {
    title: "AI Generation",
    description:
      "The ML service fetches the user's profile and interaction history, feeding it into the hybrid model to generate a ranked list of suitable recipe IDs.",
  },
  {
    title: "Displaying Results",
    description:
      'Recipe IDs are "hydrated" with full details (name, image, nutrition). This rich data is sent to the frontend and rendered in an interactive dashboard.',
  },
];

const DataJourney = () => {
  return (
    <Section id="data-journey">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center">
        <span className="mr-3 text-2xl">🗺️</span>The Data Journey
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        Follow the path of data from user onboarding to receiving a personalized
        meal plan.
      </p>
      <div className="relative max-w-5xl mx-auto">
        <div
          className="absolute left-5 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-200"
          aria-hidden="true"
        ></div>
        <div className="space-y-12 md:space-y-16">
          {journeySteps.map((step, index) => (
            <div
              key={index}
              className="relative flex items-start md:items-center md:justify-normal md:odd:flex-row-reverse group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold text-lg shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                {index + 1}
              </div>
              <div className="ml-4 md:ml-0 md:w-[calc(50%-2.5rem)]">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default DataJourney;
