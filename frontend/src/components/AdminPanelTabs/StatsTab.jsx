import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../_services/AuthContext";
import Loader from "../Loader";

function StatsTab() {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [decisions, setDecisions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/decisions", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setDecisions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const getDecisionCreatedLastMonth = (decision) => {
    const days = Math.floor(
      (new Date() - new Date(decision.publish_date)) / (1000 * 60 * 60 * 24)
    );
    return days < 30;
  };

  const getDecisionFinishedLastMonth = (decision) => {
    if (new Date(decision.deadline) > new Date()) {
      return false;
    }
    const days = Math.floor(
      (new Date() - new Date(decision.deadline)) / (1000 * 60 * 60 * 24)
    );
    return days < 30;
  };

  const decisionsCreatedLastMonth = decisions.filter((decision) =>
    getDecisionCreatedLastMonth(decision)
  );

  const decisionsFinishedLastMonth = decisions.filter((decision) =>
    getDecisionFinishedLastMonth(decision)
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pb-8 pt-4 text-blue-dianne border-b-2 border-blue-dianne w-96">
        Statistiques du mois
      </h1>
      <table className="table-auto w-full text-left border-2 border-black mt-8">
        <thead>
          <tr className="bg-blue-dianne text-slate-200">
            <th className="px-4 py-2 border-r-2 border-slate-200">
              Décisions créées le mois dernier
            </th>
            <th className="px-4 py-2 border-r-2 border-slate-200">
              Décisions terminées le mois dernier
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-slate-200">
            <td className="px-4 py-2 border-r-2 border-slate-200">
              {decisionsCreatedLastMonth.length}
            </td>
            <td className="px-4 py-2 border-r-2 border-slate-200">
              {decisionsFinishedLastMonth.length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StatsTab;
