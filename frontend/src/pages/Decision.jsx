import PropTypes from "prop-types";
import cat from "../images/cat.jpg";
import DescriptionDecisionDetails from "../components/DescriptionDecisionDetails";

export default function Decision({ createDecision }) {
  return (
    <div className="flex flex-col md:flex-row md:w-2/3 mx-auto">
      <main className="flex flex-col md:my-16 w-full md:w-2/3 border-r-2">
        <h1 className="text-2xl md:text-5xl font-bold text-[#0C3944]">
          {createDecision.title}
        </h1>
        <section id="author" className="flex items-center gap-2">
          <img src={cat} alt="cat" className="w-12 h-12 rounded-full" />
          <div className="flex gap-1">
            <p className="text-sm">par</p>
            <h2 className="text-sm font-bold">Cat</h2>
          </div>
        </section>
        <DescriptionDecisionDetails
          title="Les détails de la décision"
          content={createDecision.description}
        />
        <DescriptionDecisionDetails
          title="Impact sur l'organisation"
          content={createDecision.impacts}
        />
        <DescriptionDecisionDetails
          title="Bénéfices 👍"
          content={createDecision.advantages}
        />
        <DescriptionDecisionDetails
          title="Risques potentiels 🚨"
          content={createDecision.risks}
        />
      </main>
      <aside className="md:my-16 flex flex-col ml-2 gap-3 bg-white">
        <div id="timeline" className="flex flex-col">
          <h1 className="font-bold text-base">Date à retenir</h1>
          <ol className="border-l border-gray-300">
            <li>
              <div className="flex flex-start items-center pt-3">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                <p className="text-gray-500 text-sm">{createDecision.date}</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 1
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                <p className="text-gray-500 text-sm">13.09.2021</p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 2
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3" />
                <p className="text-gray-500 text-sm">25.11.2021</p>
              </div>
              <div className="mt-0.5 ml-4 pb-5">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Title of section 3
                </h4>
              </div>
            </li>
          </ol>
        </div>
        <div id="impacted">
          <h1 className="font-bold text-base mb-4">Personnes impactées</h1>
          <ul className="flex gap-1 flex-wrap self-start">
            {createDecision.impacted.map((oneImpacted) => (
              <li className="text-[#0C3944] text-xl rounded-full text-center px-4 py-2 font-bold border border-black">
                {`#${
                  oneImpacted.charAt(0).toUpperCase() + oneImpacted.slice(1)
                }`}
              </li>
            ))}
          </ul>
        </div>
        <div id="experts">
          <h1 className="font-bold text-base mb-4">Personnes expertes</h1>
          <ul className="flex gap-1 flex-wrap self-start">
            {createDecision.experts.map((expert) => (
              <li className="text-[#0C3944] text-xl rounded-full text-center px-4 py-2 font-bold border border-black">
                {`#${expert.charAt(0).toUpperCase() + expert.slice(1)}`}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

Decision.propTypes = {
  createDecision: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    impacted: PropTypes.arrayOf(PropTypes.string),
    experts: PropTypes.arrayOf(PropTypes.string),
    impacts: PropTypes.string,
    advantages: PropTypes.string,
    risks: PropTypes.string,
  }).isRequired,
};
