import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import loginImage from "../assets/login_image.jpg";
import useLogin from "../hooks/useLogin";

function Login() {
  const [errorInput, setErrorInput] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberMeRef = useRef();

  const { login } = useLogin();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rememberMe = rememberMeRef.current.checked;

    const res = login(email, password, rememberMe);
    if (!res.status === 200) {
      setErrorInput(true);
    }
  };

  return (
    <main className="w-screen  flex justify-center items-center h-screen md:bg-blue-dianne">
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
            <form
              className="flex flex-col gap-4 px-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                type="email"
                autoComplete="username"
                name="email"
                id="email"
                className="border-2 border-black rounded-lg p-2"
                placeholder="Exemple : johndoe@email.com"
                ref={emailRef}
              />
              <label htmlFor="password" className="font-bold">
                Mot de passe
              </label>
              <input
                type="password"
                autoComplete="current-password"
                name="password"
                id="password"
                className="border-2 border-black rounded-lg p-2"
                placeholder="Exemple : 123456"
                ref={passwordRef}
              />
              <button
                type="submit"
                className="bg-black text-white rounded-lg p-2 text-center"
                onClick={handleLogin}
              >
                Se connecter
              </button>
              {errorInput && (
                <p className="text-red-500 text-center">
                  Email ou mot de passe incorrect
                </p>
              )}
              {/* rember me div */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="border-2 border-black rounded-lg p-2"
                    ref={rememberMeRef}
                  />
                  <label htmlFor="remember">Se souvenir de moi</label>
                </div>
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-center">Vous n'avez pas de compte ?</p>
              <NavLink
                to="/register"
                className="text-sm text-center text-[#9B084F] font-bold"
              >
                Créer un compte
              </NavLink>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Login;
