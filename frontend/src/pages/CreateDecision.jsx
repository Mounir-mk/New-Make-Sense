import rightchevron from "../assets/chevron-right.svg";

function CreateDecision() {
  return (
    <main className="w-screen bg-slate-100 flex md:justify-center md:items-start h-[60%] md:h-[90%]">
      <div className="h-full flex flex-col gap-2 md:gap-4 md:justify-start md:items-start">
        <span>
          <h1 className="font-bold text-2xl">Créer une décision</h1>
        </span>
        <ul className="flex gap-0 md:gap-4 items-center overflow-x-auto md:mb-10">
          <li>
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              La décision
            </h2>
          </li>
          <img
            src={rightchevron}
            alt="Right chevron"
            className="max-h-6 w-auto"
          />
          <li>
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              Les impacts
            </h2>
          </li>
          <img
            src={rightchevron}
            alt="Right chevron"
            className="max-h-6 w-auto"
          />
          <li>
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              Les bénéfices
            </h2>
          </li>
          <img
            src={rightchevron}
            alt="Right chevron"
            className="max-h-6 w-auto"
          />
          <li>
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              Les risques
            </h2>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default CreateDecision;
