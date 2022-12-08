import cat from "../images/cat.jpg";
import Louen from "../images/Louen.jpg";
import Tracteur from "../images/Tracteur.jpg";
import Heri from "../images/Heri.jpg";
import Marty from "../images/Marty.jpg";
import Rick from "../images/Rick.jpg";
import chevron from "../assets/chevron-right.svg";
import DescriptionDecisionDetails from "../components/DescriptionDecisionDetails";

export default function Decision() {
  return (
    <div className="flex w-2/3 mx-auto">
      <main className="flex flex-col md:my-16">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0C3944]">
          Title of the decision
        </h1>
        <section id="author" className="flex items-center gap-2">
          <img src={cat} alt="cat" className="w-12 h-12 rounded-full" />
          <h2 className="text-sm font-bold">par Cat</h2>
        </section>
        <DescriptionDecisionDetails title="Les détails de la décision" />
        <DescriptionDecisionDetails title="Impact sur l'organisation" />
        <DescriptionDecisionDetails title="Bénéfices 👍" />
        <DescriptionDecisionDetails title="Risques potentiels 🚨" />
      </main>
      <aside />
    </div>
  );
}
