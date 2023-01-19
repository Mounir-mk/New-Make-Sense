import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../_services/AuthContext";
import ProfileModal from "../components/ProfileModal";

function ProfilePage() {
  const { auth } = useContext(AuthContext);
  const [modificationDone, setModificationDone] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  const [user, setUser] = useState({});

  const chnangeRoleName = (role) => {
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${auth.id}`, config)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [modificationDone]);

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
            Role: {chnangeRoleName(user.role)}
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
            src={
              user.image_url
                ? user.image_url
                : "https://via.placeholder.com/300"
            }
            alt="profile"
          />
        </div>
      </div>
      {openModal && (
        <ProfileModal
          setOpenModal={setOpenModal}
          setModificationDone={setModificationDone}
        />
      )}
    </main>
  );
}

export default ProfilePage;
