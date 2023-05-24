import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useFetch from "../hooks/useFetch";

function DashboardCard({ decisionTitle, author, id, avatar }) {
  const navigate = useNavigate();

  const { fetch: getDecision } = useFetch(
    `decisions/${id}`,
    "GET",
    false,
    true
  );
  const handleClick = async () => {
    const res = await getDecision();
    navigate(`/decision/${res.data.id}`);
  };

  return (
    <section className="bg-white rounded-xl p-4 flex flex-col justify-evenly shadow-slate-300 shadow-lg my-4 w-full md:w-72 h-56">
      <h1 className="font-bold text-blue-dianne text-lg">{`${decisionTitle
        .charAt(0)
        .toUpperCase()}${decisionTitle.slice(1)}`}</h1>
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
            onClick={() => {
              handleClick();
            }}
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
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default DashboardCard;
