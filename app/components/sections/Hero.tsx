import { Button } from "../ui/Button";

const Hero = () => {
  return (
    <header className="py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
        Meal Planning Made <span className="text-teal-500">Simple.</span>
      </h1>
      <p className="text-lg text-slate-500 max-w-3xl mx-auto">
        Discover recipes customized to your dietary needs with NutriGenius AI —
        your smart companion for finding the perfect meal.
      </p>
      <Button className="mt-8" size="lg">
        Get Started
      </Button>
    </header>
  );
};

export default Hero;
