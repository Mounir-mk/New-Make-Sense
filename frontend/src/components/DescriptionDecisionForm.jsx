import React from "react";
import PropTypes from "prop-types";
import plusIcon from "../assets/plus.svg";

function DescriptionDecisionForm({
  createDecision,
  setCreateDecision,
  inputImpacted,
  setInputImpacted,
  inputExpert,
  setInputExpert,
  setStep,
}) {
  return (
    <>
      <section className="flex gap-2 w-full justify-evenly">
        <div className="flex flex-col gap-1 items-center w-1/2">
          <h2 className="font-bold">Impactés</h2>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="@Impactés"
              name="impacted"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 w-full"
              value={inputImpacted}
              onChange={(event) => setInputImpacted(event.target.value)}
            />
            <button
              className="absolute right-0 h-full"
              type="button"
              onClick={() => {
                setCreateDecision({
                  ...createDecision,
                  impacted: [...createDecision.impacted, inputImpacted],
                });
                setInputImpacted("");
              }}
            >
              <img src={plusIcon} alt="Plus" className="max-h-6 w-auto" />
            </button>
          </div>
          <ul className="flex gap-1 flex-wrap self-start md:my-16 w-full">
            {createDecision.impacted.map((impactElement) => (
              <li
                className="text-[#0C3944] text-xl rounded-full text-center px-4 py-2 font-bold border border-black"
                key={impactElement}
              >
                {`#${
                  impactElement.charAt(0).toUpperCase() + impactElement.slice(1)
                }`}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-1 items-center w-1/2">
          <h2 className="font-bold">Experts</h2>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="@Experts"
              name="expert"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 w-full"
              value={inputExpert}
              onChange={(event) => setInputExpert(event.target.value)}
            />
            <button
              className="absolute right-0 h-full"
              type="button"
              onClick={() => {
                setCreateDecision({
                  ...createDecision,
                  experts: [...createDecision.experts, inputExpert],
                });
                setInputExpert("");
              }}
            >
              <img src={plusIcon} alt="Plus" className="max-h-6 w-auto" />
            </button>
          </div>
          <ul className="flex gap-1 flex-wrap self-start md:my-16 w-full">
            {createDecision.experts.map((expertElement) => (
              <li
                className="text-[#0C3944] text-xl rounded-full text-center px-4 py-2 font-bold border border-black"
                key={expertElement}
              >
                {`#${
                  expertElement.charAt(0).toUpperCase() + expertElement.slice(1)
                }`}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <form className="flex flex-col gap-2 md:gap-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="decision">
              <h2 className="font-bold text-center">Titre de la décision</h2>
            </label>
            <input
              type="text"
              name="decision"
              id="decision"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
              value={createDecision.title}
              onChange={(event) =>
                setCreateDecision((old) => ({
                  ...old,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="deadline">
              <h2 className="font-bold text-center">Date limite</h2>
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
              value={createDecision.date}
              onChange={(event) => {
                setCreateDecision((old) => ({
                  ...old,
                  date: event.target.value,
                }));
              }}
            />
          </div>
        </div>
        <label htmlFor="description">
          <h2 className="font-bold text-center">Description</h2>
        </label>
        <textarea
          name="description"
          id="description"
          className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 h-56 md:h-96 w-full"
          value={createDecision.description}
          onChange={(event) =>
            setCreateDecision((old) => ({
              ...old,
              description: event.target.value,
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
          Suivant
        </button>
      </form>
    </>
  );
}

DescriptionDecisionForm.propTypes = {
  createDecision: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    impacted: PropTypes.arrayOf(PropTypes.string),
    experts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setCreateDecision: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setInputExpert: PropTypes.func.isRequired,
  setInputImpacted: PropTypes.func.isRequired,
  inputImpacted: PropTypes.string.isRequired,
  inputExpert: PropTypes.string.isRequired,
};

export default DescriptionDecisionForm;