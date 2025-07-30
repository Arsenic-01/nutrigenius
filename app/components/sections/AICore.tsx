import Section from "../ui/Section";
import Card from "../ui/Card";
import DataSourcesChart from "../charts/DataSourcesChart";
import ModelComparisonChart from "../charts/ModelComparisonChart";

const AICore = () => {
  return (
    <Section id="ai-core">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center">
        <span className="mr-3 text-2xl">🧠</span>The AI Core
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        The system&apos;s intelligence is built on a foundation of high-quality
        data and a hybrid recommendation strategy. Explore the components below.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-center mb-4 text-slate-800">
            Data Corpus Sources
          </h3>
          <p className="text-center text-slate-500 mb-6">
            The system integrates multiple datasets to build a comprehensive and
            culturally diverse recipe knowledge base.
          </p>
          <div className="relative w-full max-w-[500px] mx-auto h-[350px] md:h-[400px]">
            <DataSourcesChart />
          </div>
        </Card>
        <Card className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-center mb-4 text-slate-800">
            Hybrid Recommendation Model
          </h3>
          <p className="text-center text-slate-500 mb-6">
            The engine blends two methods to provide recommendations that are
            both relevant and novel, overcoming the &apos;cold start&apos;
            problem.
          </p>
          <div className="relative w-full max-w-[500px] mx-auto h-[350px] md:h-[400px]">
            <ModelComparisonChart />
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default AICore;
