import { useEffect, useState } from "react";
import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  const [decisions, setDecisions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/decisions")
      .then((res) => res.json())
      .then((data) => setDecisions(data));
  }, []);
  return (
    <section>
      <h1>Décisions en cours</h1>
      <div className="running-decision-dashboard">
        {decisions.map((decision) => (
          <DashboardCard
            decisionTitle={decision.title}
            author={`${decision.user_id}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
