import { useEffect, useState } from "react";
import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  const [decisions, setDecisions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users/1/decisions")
      .then((res) => res.json())
      .then((data) => setDecisions(data));
  }, []);
  return (
    <section>
      <h1>Décisions en cours</h1>
      <div className="running-decision-dashboard">
        {decisions.map((decision) => (
          <DashboardCard
            key={decision.id}
            decisionTitle={decision.title}
            author={`${decision.firstname} ${decision.lastname}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
