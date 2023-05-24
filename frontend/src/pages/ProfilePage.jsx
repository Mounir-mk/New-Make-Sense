import React, { useState, useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import ProfileModal from "../components/ProfileModal";
import Loader from "../components/Loader";
import useFetch from "../hooks/useFetch";

function ProfilePage() {
  const { auth } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const {
    data: user,
    loading,
    invalidate,
  } = useFetch(`users/${auth.id}`, "GET", true, true);

  const changeRoleName = (role) => {
    if (role === "admin") {
      return "Administrateur";
    }
    if (role === "visitor") {
      return "Visiteur";
    }
    if (role === "employee") {
      return "Employé";
    }
    return false;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex items-center justify-center w-full my-6 md:mt-20 ">
      <div className="flex flex-col-reverse gap-4 md:flex-row items-center justify-center md:justify-evenly w-5/6 md:w-2/3 p-5 md:p-10 bg-slate-100 rounded shadow relative">
        <div className="flex flex-col items-start justify-center w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-slate-900 pb-20">
            Page de Profil
          </h1>
          <p className="text-xl text-slate-900">
            Nom d'utilisateur: {user.firstname}
          </p>
          <p className="text-xl text-slate-900">Nom: {user.lastname}</p>
          <p className="text-xl text-slate-900">Email: {user.email}</p>
          <p className="text-xl text-slate-900">
            Role: {changeRoleName(user.role)}
          </p>
          <div>
            <button
              type="button"
              className="bg-slate-900 text-white font-bold p-2 mt-16 px-4 rounded"
              onClick={() => setOpenModal(true)}
            >
              Modifier
            </button>
          </div>
        </div>
        <div>
          <img
            className="w-64 h-64 rounded-full"
            src={`${import.meta.env.VITE_BACKEND_URL}/${user.image_url}`}
            alt="profile"
          />
        </div>
      </div>
      {openModal && (
        <ProfileModal
          setOpenModal={setOpenModal}
          invalidate={invalidate}
          user={user}
        />
      )}
    </main>
  );
}

export default ProfilePage;
