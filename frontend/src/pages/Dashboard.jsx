import { useEffect, useState } from "react";
import axios from "axios";
import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  const [decisions, setDecisions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/decisions?status=current", {
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      })
      .then((response) => {
        setDecisions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <main className="flex justify-center">
      <section id="current-decision" className="w-2/3 mt-24 mb-20">
        <h1 className="font-bold text-3xl text-blue-dianne pb-12 border-b-2">
          Décisions en cours
        </h1>
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          {decisions.map((decision) => (
            <DashboardCard
              key={decision.id}
              id={decision.id}
              decisionTitle={decision.title}
              author={`${decision.firstname} ${decision.lastname}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
