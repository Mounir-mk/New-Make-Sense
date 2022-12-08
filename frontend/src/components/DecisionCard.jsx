import avatar from "../assets/profile_pic_default.svg";

function DashboardCard() {
  return (
    <div className="decision-card">
      <h3>Lorem ipsum</h3>
      <div className="decision-maker-info">
        <img
          className="h-8 w-8 rounded-full object-cover"
          src={avatar}
          alt="profil"
        />
        <p>par John Doe</p>
      </div>
    </div>
  );
}

export default DashboardCard;
