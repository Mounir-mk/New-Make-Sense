import rightchevron from "../assets/chevron-right.svg";
import plusIcon from "../assets/plus.svg";

function CreateDecision() {
  return (
    <main className="w-screen bg-slate-100 flex md:justify-center md:items-start h-[calc(100vh_-_64px)]">
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
          <li>
            <img
              src={rightchevron}
              alt="Right chevron"
              className="max-h-6 w-auto"
            />
          </li>
          <li>
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              Les impacts
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
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              Les bénéfices
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
            <h2 className="font-bold text-sm rounded-xl px-2 md:text-xl whitespace-nowrap bg-slate-500">
              Les risques
            </h2>
          </li>
        </ul>
        <div className="md:flex md:justify-evenly w-full gap-4">
          <section className="flex gap-2 w-full justify-evenly">
            <div className="flex flex-col gap-1 items-center w-1/2">
              <h2 className="font-bold">Impactés</h2>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="@Impactés"
                  name="impacted"
                  className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 w-full"
                />
                <button className="absolute right-0 h-full" type="button">
                  <img src={plusIcon} alt="Plus" className="max-h-6 w-auto" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center w-1/2">
              <h2 className="font-bold">Experts</h2>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="@Experts"
                  name="expert"
                  className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2 w-full"
                />
                <button className="absolute right-0 h-full" type="button">
                  <img src={plusIcon} alt="Plus" className="max-h-6 w-auto" />
                </button>
              </div>
            </div>
          </section>
          <form className="flex flex-col gap-2 md:gap-4">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="decision">
                  <h2 className="font-bold text-center">
                    Titre de la décision
                  </h2>
                </label>
                <input
                  type="text"
                  name="decision"
                  id="decision"
                  className="border-2 border-slate-500 rounded-xl px-2 md:px-4 py-1 md:py-2"
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
            />
            <button
              type="submit"
              className="bg-slate-500 text-white rounded-xl font-bold text-sm md:text-xl px-2 md:px-4 py-1 md:py-2"
            >
              Suivant
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CreateDecision;
