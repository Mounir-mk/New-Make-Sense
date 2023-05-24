import React, { useEffect, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Loader";
import { AuthContext } from "../../services/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import useFetch from "../../hooks/useFetch";

function HandleUsers() {
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

  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({});

  const {
    data: usersData,
    loading,
    fetch: fetchUsers,
  } = useFetch("users/decisions", "GET", true, true);

  const { error: updateError, fetch: fetchUpdateUser } = useFetch(
    "",
    "PUT",
    false,
    true
  );

  const { error: deleteError, fetch: fetchDeleteUser } = useFetch(
    "",
    "DELETE",
    false,
    true
  );

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.map((user) => ({ ...user, isRoleUpdated: false })));
    }
  }, [usersData]);

  const handleRoleChange = (event, user) => {
    setData({ ...data, [user.id]: event.target.value });
  };

  const handleUpdateClick = async (user) => {
    const updateUserEndpoint = `users/${user.id}`;
    await fetchUpdateUser({ role: data[user.id] }, updateUserEndpoint);
    if (!updateError) {
      notifyUpdate();
      await fetchUsers();
    }
  };

  const handleDeleteClick = async (user) => {
    const deleteUserEndpoint = `users/${user.id}`;
    await fetchDeleteUser(null, deleteUserEndpoint);
    if (!deleteError) {
      notifyDelete();
      await fetchUsers();
    } else {
      console.error(deleteError);
    }
  };

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
            .filter((user) => user.id !== auth.id)
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
