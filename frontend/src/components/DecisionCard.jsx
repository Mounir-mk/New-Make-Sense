import avatar from "../assets/profile_pic_default.svg";

function DashboardCard() {
  return (
    <section className="decision-card">
      <h1>Lorem ipsum</h1>
      <figure className="decision-maker-info">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={avatar}
          alt="profil"
        />
        <figcaption>par John Doe</figcaption>
      </figure>
    </section>
  );
}

export default DashboardCard;
