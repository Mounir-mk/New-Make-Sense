import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
import { AuthContext } from "../../_services/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

function HandleDecisions() {
  const [loading, setLoading] = useState(true);
  //   const [data, setData] = useState({});
  const { auth } = useContext(AuthContext);
  const [decisions, setDecisions] = useState([]);
  const [data, setData] = useState({});

  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  const getDecisions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/decisions", config);
      setDecisions(
        res.data.map((decision) => ({ ...decision, isStatusUpdated: false }))
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleUpdateClick = (decision) => {
    // Envoyer une requête axios pour mettre à jour le rôle de l'utilisateur dans la base de données
    axios
      .put(
        `http://localhost:5000/decisions/${decision.id}`,
        { status: data[decision.id] },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        notifyUpdate();
        getDecisions();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteClick = (decision) => {
    axios
      .delete(`http://localhost:5000/decisions/${decision.id}`, config)
      .then(() => {
        notifyDelete();
        getDecisions();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDecisions();
  }, []);

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
                    decision.isStatusUpdated ? "bg-green-200" : "bg-white"
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
