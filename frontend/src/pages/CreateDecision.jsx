import { useState } from "react";
import PropTypes from "prop-types";
import rightchevron from "../assets/chevron-right.svg";
import DescriptionDecisionForm from "../components/DescriptionDecisionForm";
import InputDecisionForm from "../components/InputDecisionForm";

function CreateDecision({
  createDecision,
  setCreateDecision,
  dataId,
  setDataId,
}) {
  const [inputImpacted, setInputImpacted] = useState("");
  const [inputExpert, setInputExpert] = useState("");

  const [step, setStep] = useState(1);
  return (
    <main className="w-screen  flex md:justify-center md:items-start h-[calc(100vh_-_64px)]">
      <div className="h-full flex flex-col gap-2 md:gap-4 md:justify-start md:items-start">
        <span>
          <h1 className="font-bold text-2xl md:mt-16">Créer une décision</h1>
        </span>
        <ul className="flex gap-0 md:gap-4 items-center overflow-x-auto md:mb-10">
          <li>
            <h2 className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white">
              Décision
            </h2>
          </li>
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2
              className={`text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap border font-bold ${
                step >= 2
                  ? "bg-[#9B084F] text-white"
                  : "opacity-30 text-slate-600 border-slate-600"
              }`}
            >
              Impacts
            </h2>
          </li>
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2
              className={`text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap border font-bold ${
                step >= 3
                  ? "bg-[#9B084F] text-white"
                  : "opacity-30 font-bold text-slate-600 border-slate-600"
              }`}
            >
              Bénéfices
            </h2>
          </li>
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2
              className={`text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap border font-bold ${
                step === 4
                  ? "bg-[#9B084F] text-white"
                  : "opacity-30 font-bold text-slate-600 border-slate-600"
              }`}
            >
              Risques
            </h2>
          </li>
        </ul>
        <div className="md:flex md:justify-evenly w-full gap-4">
          {step === 1 && (
            <DescriptionDecisionForm
              inputImpacted={inputImpacted}
              setInputImpacted={setInputImpacted}
              inputExpert={inputExpert}
              setInputExpert={setInputExpert}
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <InputDecisionForm
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
              stepName="impacts"
            />
          )}
          {step === 3 && (
            <InputDecisionForm
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
              stepName="advantages"
            />
          )}
          {step === 4 && (
            <InputDecisionForm
              createDecision={createDecision}
              setCreateDecision={setCreateDecision}
              setStep={setStep}
              stepName="risks"
              redirectButton
              dataId={dataId}
              setDataId={setDataId}
            />
          )}
        </div>
      </div>
    </main>
  );
}

CreateDecision.propTypes = {
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
  setCreateDecision: PropTypes.func.isRequired,
  dataId: PropTypes.string.isRequired,
  setDataId: PropTypes.func.isRequired,
};

export default CreateDecision;
