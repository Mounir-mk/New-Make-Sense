import React from "react";
import { NavLink } from "react-router-dom";
import loginImage from "../assets/login_image.jpg";

function Login() {
  return (
    <main className="w-screen  flex justify-center items-center h-[calc(100vh_-_64px)] md:bg-blue-dianne">
      <div className="h-[80%] w-[80%] rounded-lg flex justify-center items-center p-4">
        <section className="h-full w-full flex gap-10 flex-col md:flex-row">
          <article
            id="login_image"
            className="h-full md:w-1/2 pb-4 md:pb-0 hidden md:flex md:justify-center md:items-center"
          >
            <img
              src={loginImage}
              alt="Login"
              className="h-max-full w-auto rounded-2xl"
            />
          </article>
          <article
            id="login"
            className="bg-white h-full md:w-1/2 flex flex-col md:gap-4 md:p-4 rounded-lg justify-evenly"
          >
            <h1 className="text-2xl font-bold text-center">Connexion</h1>
            <form className="flex flex-col gap-4 px-6">
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border-2 border-black rounded-lg p-2"
                placeholder="Exemple : johndoe@email.com"
              />
              <label htmlFor="password" className="font-bold">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border-2 border-black rounded-lg p-2"
                placeholder="Exemple : 123456"
              />
              <NavLink
                to="/"
                className="bg-black text-white rounded-lg p-2 text-center"
              >
                Se connecter
              </NavLink>
            </form>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-center">Vous n'avez pas de compte ?</p>
              <a
                href="/register"
                className="text-sm text-center text-[#9B084F] font-bold"
              >
                Créer un compte
              </a>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Login;
