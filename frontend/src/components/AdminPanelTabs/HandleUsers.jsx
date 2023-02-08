import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
import { AuthContext } from "../../_services/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

function HandleUsers() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const notifyUpdate = () =>
    toast("Rôle utilisateur modifié !", {
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
    toast.error("Utilisateur supprimé", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  const getUsersInformations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/users/decisions",
        config
      );
      console.warn(res.data);
      setUsers(res.data.map((user) => ({ ...user, isRoleUpdated: false })));
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = (event, user) => {
    // Mettre à jour l'état local de la balise select
    setData({ ...data, [user.id]: event.target.value });
  };

  const handleUpdateClick = (user) => {
    // Envoyer une requête axios pour mettre à jour le rôle de l'utilisateur dans la base de données
    axios
      .put(
        `http://localhost:5000/users/${user.id}`,
        { role: data[user.id] },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        notifyUpdate();
        getUsersInformations();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteClick = (user) => {
    axios
      .delete(`http://localhost:5000/users/${user.id}`, config)
      .then(() => {
        notifyDelete();
        getUsersInformations();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUsersInformations();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold pb-8 pt-4 text-blue-dianne border-b-2 border-blue-dianne w-96">
        Gestion des utilisateurs
      </h1>
      <table className="table-auto w-full text-left border-2 border-black mt-8">
        <thead>
          <tr className="bg-blue-dianne text-slate-200">
            <th className="px-4 py-2 border-r-2 border-slate-200">Id</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Nom</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Prénom</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Email</th>
            <th className="px-4 py-2 border-r-2 border-slate-200">
              Nbr de décisions
            </th>
            <th className="px-4 py-2 border-r-2 border-slate-200">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) => user.role !== "admin")
            .map((user) => (
              <tr key={user.id} className="hover:bg-gray-200">
                <td className="border-2 border-black px-4 py-2">{user.id}</td>
                <td className="border-2 border-black px-4 py-2">
                  {user.lastname}
                </td>
                <td className="border-2 border-black px-4 py-2">
                  {user.firstname}
                </td>
                <td className="border-2 border-black px-4 py-2">
                  {user.email}
                </td>
                <td className="border-2 border-black px-4 py-2">
                  {user.nb_decisions}
                </td>
                <td className="border-2 border-black px-4 py-2">
                  <select
                    value={data[user.id] || user.role}
                    onChange={(event) => {
                      handleRoleChange(event, user);
                      setUsers((oldState) => {
                        return oldState.map((u) =>
                          u.id === user.id ? { ...u, isRoleUpdated: true } : u
                        );
                      });
                    }}
                    className={`${
                      user.isRoleUpdated ? "bg-green-200" : "bg-white"
                    } border-2 border-black px-4 py-2 rounded-lg`}
                  >
                    <option value="admin">Admin</option>
                    <option value="visitor">Visiteur</option>
                    <option value="employee">Employé</option>
                  </select>
                </td>
                <td className="border-2 border-black px-4 py-2">
                  <div className="flex justify-around">
                    <button
                      type="button"
                      className={`${
                        user.isRoleUpdated
                          ? "bg-green-200 text-slate-900"
                          : "bg-blue-dianne text-slate-200"
                      } border-2 border-black px-4 py-2 rounded-lg`}
                      onClick={() => {
                        handleUpdateClick(user);
                        setUsers((oldState) => {
                          return oldState.map((u) =>
                            u.id === user.id
                              ? { ...u, isRoleUpdated: false }
                              : u
                          );
                        });
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="bg-blue-dianne text-slate-200 px-4 py-2 rounded-md"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Supprimer
                    </button>
                  </div>
                  <ToastContainer />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default HandleUsers;
