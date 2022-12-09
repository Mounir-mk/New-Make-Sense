import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  return (
    <section>
      <h1>Décisions en cours</h1>
      <div className="running-decision-dashboard">
        <DashboardCard decisionTitle="Lorem ipsum" author="John Doe" />
      </div>
    </section>
  );
}

export default Dashboard;
