import PropTypes from "prop-types";
import avatar from "../assets/profile_pic_default.svg";

function DashboardCard({ decisionTitle, author }) {
  return (
    <section className="decision-card">
      <h1>{decisionTitle}</h1>
      <figure className="decision-maker-info">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={avatar}
          alt="profil"
        />
        <figcaption>par {author}</figcaption>
      </figure>
    </section>
  );
}
DashboardCard.propTypes = {
  decisionTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
export default DashboardCard;
