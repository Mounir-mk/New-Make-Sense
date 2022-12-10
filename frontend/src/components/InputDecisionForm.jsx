import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

function InputDecisionForm({
  createDecision,
  setCreateDecision,
  setStep,
  stepName,
  redirectButton,
  setDataId,
  dataId,
}) {
  const postDecision = async () => {
    const decision = {
      title: createDecision.title,
      deadline: createDecision.date,
      content: createDecision.description,
      impact: createDecision.impacts,
      risk: createDecision.risks,
      advantage: createDecision.advantages,
      userId: 1,
    };
    // post the decision to the database with axios and console.log the id of the decision created
    const response = await axios.post(
      "http://localhost:5000/decisions",
      decision
    );
    setDataId(response.data.insertId);
  };

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
        {redirectButton ? (
          <Link
            to={`/decision/${dataId}`}
            className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white text-center"
            onClick={async () => {
              await postDecision();
            }}
          >
            Créer la décision
          </Link>
        ) : (
          <button
            type="submit"
            className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white"
            onClick={async (e) => {
              e.preventDefault();
              setStep((old) => old + 1);
            }}
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
}

InputDecisionForm.propTypes = {
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
  setStep: PropTypes.func.isRequired,
  stepName: PropTypes.string.isRequired,
  redirectButton: PropTypes.bool.isRequired,
  setDataId: PropTypes.func.isRequired,
  dataId: PropTypes.number.isRequired,
};

export default InputDecisionForm;

//   const response = await fetch("http://localhost:5000/decisions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(decision, null, 2),
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
