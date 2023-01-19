import React, { useContext, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../_services/AuthContext";

function ProfileModal({ setOpenModal, setModificationDone }) {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/users/${auth.id}`,
        {
          firstname: firstnameRef.current.value,
          lastname: lastnameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          id: auth.id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then(() => {
        setOpenModal(false);
        setModificationDone((oldModificationDone) => !oldModificationDone);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-slate-600 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-slate-900 pb-10">
          Modifier le profil
        </h1>
        <form
          className="flex flex-col items-center justify-center w-full p-6 gap-2"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstname" className="text-xl text-slate-900">
            Prénom
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="w-64 h-10 rounded shadow-lg border p-2"
            ref={firstnameRef}
          />
          <label htmlFor="lastname" className="text-xl text-slate-900">
            Nom
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="w-64 h-10 rounded shadow-lg border p-2"
            ref={lastnameRef}
          />
          <label htmlFor="email" className="text-xl text-slate-900">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-64 h-10 rounded shadow-lg border p-2"
            ref={emailRef}
          />
          <label htmlFor="password" className="text-xl text-slate-900">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-64 h-10 rounded shadow-lg border p-2"
            ref={passwordRef}
          />
          <div className="flex gap-4">
            <button
              type="button"
              className="bg-slate-900 text-white font-bold p-2 mt-16 px-4 rounded"
              onClick={() => setOpenModal(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white font-bold p-2 mt-16 px-4 rounded"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

ProfileModal.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  setModificationDone: PropTypes.func.isRequired,
};

export default ProfileModal;
