import PropTypes from "prop-types";
import avatar from "../assets/profile_pic_default.svg";

function DashboardCard({ decisionTitle, author }) {
  return (
    <section className="bg-white rounded-xl p-4 flex flex-col justify-evenly shadow-2xl my-4 w-72 h-56">
      <h1 className="font-bold text-blue-dianne text-lg">{decisionTitle}</h1>
      <div className="flex flex-col">
        <figure className="flex justify-between mt-4 items-center gap-2">
          <img
            src={avatar}
            alt="avatar"
            className="max-h-12 w-auto rounded-full"
          />
          <figcaption className="text-sm text-slate-600 font-bold">{`par ${author}`}</figcaption>
          <button
            type="button"
            className="bg-[#9B084F] text-white rounded-md px-4 py-2 ml-auto"
          >
            Voir
          </button>
        </figure>
      </div>
    </section>
  );
}

DashboardCard.propTypes = {
  decisionTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default DashboardCard;
