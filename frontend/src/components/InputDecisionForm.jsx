import React from "react";
import PropTypes from "prop-types";

function InputDecisionForm({
  createDecision,
  setCreateDecision,
  setStep,
  stepName,
}) {
  const changeStepName = () => {
    if (stepName === "risks") {
      return "risques";
    }
    if (stepName === "advantages") {
      return "bénéfices";
    }
    return stepName;
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-xl capitalize">{changeStepName()}</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="impacts" className="font-bold">
          {`Quels sont les ${changeStepName()} de cette décision ?`}
        </label>
        <textarea
          id="impacts"
          name="impacts"
          rows="4"
          className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 h-56 md:h-96 w-full mx-auto"
          value={createDecision[stepName]}
          onChange={(e) =>
            setCreateDecision((old) => ({
              ...old,
              [stepName]: e.target.value,
            }))
          }
        />
        <button
          type="submit"
          className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white"
          onClick={(e) => {
            e.preventDefault();
            setStep((old) => old + 1);
          }}
        >
          {stepName === "risks" ? "Créer la décision" : "Suivant"}
        </button>
      </div>
    </div>
  );
}

InputDecisionForm.propTypes = {
  createDecision: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    advantages: PropTypes.string.isRequired,
    risks: PropTypes.string.isRequired,
  }).isRequired,
  setCreateDecision: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  stepName: PropTypes.string.isRequired,
};

export default InputDecisionForm;
