import AdvancedFeatures from "./components/sections/AdvancedFeatures";
import AICore from "./components/sections/AICore";
import Algorithms from "./components/sections/Algorithms";
import Architecture from "./components/sections/Architecture";
import Citations from "./components/sections/Citations";
import DataJourney from "./components/sections/DataJourney";
import Hero from "./components/sections/Hero";
import { HeroYouTubeVideo } from "./components/sections/HeroYouTubeVideo";
import Team from "./components/sections/Team";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroYouTubeVideo />
      <Architecture />
      <DataJourney />
      <AICore />
      <Algorithms />
      <AdvancedFeatures />
      <Team />
      <Citations />
    </>
  );
}
