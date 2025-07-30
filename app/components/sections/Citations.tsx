import Section from "../ui/Section";

const citations = [
  {
    href: "https://ieeexplore.ieee.org/document/10169703",
    text: "A. D. Murumkar, Anamika Singh, B. R. Chachar, B. D. Bagade, G. Zaware. “Artificial Intelligence (AI) based Nutrition Advisorusing an App”, 2023 International Conference on Sustainable Computing and Smart Systems (ICSCSS), DOI: 10.1109/ICSCSS57650.2023.10169703",
  },
  {
    href: "https://ieeexplore.ieee.org/document/10859953",
    text: "J. Kanjalkar, P. Kanjalkar, R. Khanke; R. Mane, K. Kharat, K. Kolhe. “An AI-Driven Framework for Personalized Diet Generation and Nutrition Suggestions Using Machine Learning, Computer Vision and NLP”, 2024 International Conference on Integrated Intelligence and Communication Systems (ICIICS), DOI: 10.1109/ICIICS63763.2024.10859953",
  },
  {
    href: "https://ieeexplore.ieee.org/document/10916135",
    text: "I-Cheng Chang, Nguyen Minh Trang, Ken Chang, Kenrick Albert. Diet advisor: an image-based food intake analysis and meal recommendation system ”, International Conference on Innovation, Communication and Engineering 2024 (ICICE 2024), DOI: 10.1049/icp.2025.0183",
  },
];

const Citations = () => {
  return (
    <Section id="citations">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-800 flex items-center justify-center">
        <span className="mr-3 text-2xl">📚</span>Citations
      </h2>
      <p className="text-center text-slate-500 max-w-3xl mx-auto mb-12">
        This work is inspired by and builds upon recent advancements in
        personalized nutrition and intelligent health systems.
      </p>
      <div className="max-w-3xl mx-auto space-y-6 text-slate-600 bg-white p-8 rounded-lg border border-slate-200">
        {citations.map((citation, index) => (
          <div key={index}>
            <p>
              [{index + 1}]&nbsp;
              <a
                href={citation.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                {citation.text}
              </a>
            </p>
            {index < citations.length - 1 && (
              <hr className="border-slate-200 mt-6" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Citations;
