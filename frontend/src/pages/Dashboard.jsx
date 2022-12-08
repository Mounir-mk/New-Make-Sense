import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  return (
    <section>
      <h1>Décisions en cours</h1>
      <div className="running-decision-dashboard">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
    </section>
  );
}

export default Dashboard;
