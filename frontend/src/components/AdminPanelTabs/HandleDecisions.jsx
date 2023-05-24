import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import useFetch from "../../hooks/useFetch";

function HandleDecisions() {
  const [data, setData] = useState({});
  const [decisions, setDecisions] = useState([]);

  const notifyUpdate = () =>
    toast("Statut de la décision modifié !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "toast-green",
    });

  const notifyDelete = () =>
    toast.error("Décision supprimée", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleStatusChange = (event, decision) => {
    // Mettre à jour l'état local de la balise select
    setData({ ...data, [decision.id]: event.target.value });
  };

  // Utilisez le hook useFetch pour obtenir les décisions.
  const {
    data: decisionsData,
    loading,
    fetch: fetchDecisions,
  } = useFetch("decisions", "GET", true, true);

  useEffect(() => {
    if (decisionsData) {
      setDecisions(
        decisionsData.map((decision) => ({
          ...decision,
          isStatusUpdated: false,
        }))
      );
    }
  }, [decisionsData]);

  // Utilisez le hook useFetch pour mettre à jour une décision.
  const { fetch: updateDecision } = useFetch("", "PUT", false, true);

  const handleUpdateClick = (decision) => {
    updateDecision(
      {
        status: data[decision.id],
      },
      `decisions/${decision.id}`
    ).then(() => {
      notifyUpdate();
      fetchDecisions();
    });
  };

  // Utilisez le hook useFetch pour supprimer une décision.
  const { fetch: deleteDecision } = useFetch("", "DELETE", false, true);

  const handleDeleteClick = (decision) => {
    deleteDecision(null, `decisions/${decision.id}`).then(() => {
      notifyDelete();
      fetchDecisions();
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pb-8 pt-4 text-blue-dianne border-b-2 border-blue-dianne w-96">
        Gestion des décisions
      </h1>
      <table className="table-auto w-full text-left border-2 border-black mt-8">
        <thead>
          <tr className="bg-blue-dianne text-slate-200">
            <th className="px-4 py-2 border-r-2 border-slate-200">Auteur</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Titre</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">
              Date de création
            </th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Deadline</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Statut</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((decision) => (
            <tr key={decision.id}>
              <td className="border-2 border-black px-4 py-2">{`${decision.firstname} ${decision.lastname}`}</td>
              <td className="border-2 border-black px-4 py-2">
                {decision.title}
              </td>
              <td className="border-2 border-black px-4 py-2">
                {decision.publish_date.slice(0, 10)}
              </td>
              <td className="border-2 border-black px-4 py-2">
                {decision.deadline.slice(0, 10)}
              </td>
              <td className="border-2 border-black px-4 py-2">
                <select
                  value={data[decision.id] || decision.status}
                  onChange={(event) => {
                    if (decision.status !== "finished") {
                      handleStatusChange(event, decision);
                      setDecisions(
                        decisions.map((d) =>
                          d.id === decision.id
                            ? { ...d, isStatusUpdated: true }
                            : d
                        )
                      );
                    }
                  }}
                  className={`${
                    decision.isStatusUpdated || decision.status === "finished"
                      ? "bg-green-200"
                      : "bg-white"
                  } border-2 border-black px-4 py-2 rounded-lg`}
                >
                  <option value="in_progress">En cours</option>
                  <option value="finished">Terminée</option>
                </select>
              </td>
              <td className="border-2 border-black px-4 py-2">
                <div className="flex justify-around">
                  <button
                    type="button"
                    className={`${
                      decision.isStatusUpdated
                        ? "bg-green-200 text-slate-900"
                        : "bg-blue-dianne text-slate-200"
                    } border-2 border-black px-4 py-2 rounded-lg`}
                    onClick={() => {
                      handleUpdateClick(decision);
                      setDecisions(
                        decisions.map((d) =>
                          d.id === decision.id
                            ? { ...d, isStatusUpdated: false }
                            : d
                        )
                      );
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="bg-blue-dianne text-slate-200 px-4 py-2 rounded-md"
                    onClick={() => handleDeleteClick(decision)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default HandleDecisions;
