import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../_services/AuthContext";
import Editor from "./Editor/Editor";

function InputDecisionForm({
  createDecision,
  setCreateDecision,
  setStep,
  stepName,
  redirectButton,
  usersConcerned,
}) {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const postDecision = async () => {
    const decision = {
      title: createDecision.title,
      deadline: createDecision.date,
      start_content: createDecision.description,
      impact: createDecision.impacts,
      risk: createDecision.risks,
      advantage: createDecision.advantages,
      userId: auth.id,
      users: usersConcerned,
    };
    axios
      .post("http://localhost:5000/decisions", decision, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        navigate(`/decision/${res.data}`);
      });
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
  function handleClick(step, decision, redirect) {
    if (step === "impacts" && decision.impacts.length < 1) {
      setMessage("Veuillez définir les impacts de la décision");
    } else if (step === "risks" && decision.risks.length < 1) {
      setMessage("Veuillez définir les risques de la décision");
    } else if (step === "advantages" && decision.advantages.length < 1) {
      setMessage("Veuillez définir les bénéfices de la décision");
    } else {
      setMessage("");
      if (redirect) {
        postDecision();
      } else {
        setStep((old) => old + 1);
      }
    }
  }
  return (
    <div className="flex flex-col gap-4 flex-1 w-full">
      <h2 className="font-bold text-xl capitalize">{changeStepName()}</h2>
      <div className="flex-1 flex flex-col gap-2">
        <label htmlFor="impacts" className="font-bold">
          {`Quels sont les ${changeStepName()} de cette décision ?`}
        </label>
        <Editor
          setValue={(value) =>
            setCreateDecision((old) => ({
              ...old,
              [stepName]: value,
            }))
          }
          value={createDecision[stepName]}
        />
        <button
          type="submit"
          className="font-bold text-sm rounded-full px-3 py-1 md:text-xl whitespace-nowrap bg-[#9B084F] text-white ml-auto mt-4"
          onClick={() => handleClick(stepName, createDecision, redirectButton)}
        >
          {redirectButton ? "Créer la décision" : "Suivant"}
        </button>
        {message.length > 0 && (
          <p className="text-lg text-red-600 text-center">{message}</p>
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
  }),
  setCreateDecision: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  stepName: PropTypes.string.isRequired,
  redirectButton: PropTypes.bool,
  usersConcerned: PropTypes.arrayOf(
    PropTypes.shape({
      user_status: PropTypes.string,
      user_id: PropTypes.number,
    })
  ),
};

InputDecisionForm.defaultProps = {
  redirectButton: undefined,
  usersConcerned: undefined,
  createDecision: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    impacted: undefined,
    experts: undefined,
    impacts: PropTypes.string,
    advantages: PropTypes.string,
    risks: PropTypes.string,
  }),
};

export default InputDecisionForm;
