import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo_makesense.png";
import homeIcon from "../assets/home.svg";
import calendarIcon from "../assets/calendar.svg";
import menuIcon from "../assets/menu.svg";
import plusIcon from "../assets/plus.svg";
import user from "../assets/user.svg";
import logout from "../assets/log-out.svg";
import adminLogo from "../assets/admin-panel.png";
import { AuthContext } from "../_services/AuthContext";
import Loader from "./Loader";

function Header() {
  const [userProfilePicture, setUserProfilePicture] = useState();
  const { auth, setAuth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const handleLogout = () => {
    setAuth((oldAuth) => ({
      ...oldAuth,
      isAuthenticated: false,
      token: null,
    }));
  };
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:5000/users/${auth.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setUserProfilePicture(response.data.image_url);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <header className="w-full flex items-center justify-around border-solid border-b-2 h-16 bg-white">
      <NavLink to="/">
        <img src={logo} alt="MakeSense" className="max-h-4 md:max-h-8 w-auto" />
      </NavLink>
      <nav>
        <ul className="flex gap-4">
          <li>
            {auth.role === "admin" && (
              <NavLink
                to="admin"
                className="group border rounded-full h-8 w-8 hidden md:flex items-center justify-center relative"
              >
                <img src={adminLogo} alt="Plus" className="max-h-4 w-auto" />
                <p className="hidden absolute top-full group-hover:block text-xs whitespace-nowrap mx-auto bg-slate-600 text-white px-2 rounded-md">
                  Panneau Admin
                </p>
              </NavLink>
            )}
          </li>
          <li>
            {auth.role !== "visitor" && (
              <NavLink
                to="/decisions/create"
                className="group border rounded-full h-8 w-8 flex items-center justify-center relative"
              >
                <img src={plusIcon} alt="Plus" className="max-h-4 w-auto" />
                <p className="hidden absolute top-full group-hover:block text-xs whitespace-nowrap mx-auto bg-slate-600 text-white px-2 rounded-md">
                  Créer une décision
                </p>
              </NavLink>
            )}
          </li>
          <li className="flex flex-col hover:underline justify-center">
            <NavLink
              to="/"
              className="flex flex-col hover:underline justify-center"
            >
              <img src={homeIcon} alt="Home" className="max-h-4 w-auto" />
              <span className="hidden md:inline font-bold text-xs">
                Parcourir les décisions
              </span>
            </NavLink>
          </li>
          {auth.role !== "visitor" && (
            <li className="flex flex-col hover:underline justify-center">
              <NavLink
                to="/mydecisions"
                className="flex flex-col hover:underline justify-center"
              >
                <img
                  src={calendarIcon}
                  alt="Calendar"
                  className="max-h-4 w-auto"
                />
                <span className="hidden md:inline font-bold text-xs">
                  Mes décisions
                </span>
              </NavLink>
            </li>
          )}
          <li>
            <button
              type="button"
              className="w-20 h-8 rounded-full bg-slate-400 flex justify-around items-center relative"
              onClick={() => setIsMenuOpen((old) => !old)}
            >
              <img src={menuIcon} alt="Menu" className="max-h-4 w-auto" />
              <img
                src={
                  userProfilePicture
                    ? `${
                        import.meta.env.VITE_BACKEND_URL
                      }/${userProfilePicture}`
                    : `${import.meta.env.VITE_BACKEND_URL}/default.png`
                }
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              {isMenuOpen && (
                <div className="absolute top-full w-32 z-20">
                  <ul className="bg-white border border-solid border-gray-300 rounded-md shadow-md">
                    <li className="p-2 hover:bg-gray-200 text-blue-dianne text-left border-b-2 text-sm font-bold">
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-1"
                      >
                        <img
                          src={user}
                          alt="User"
                          className="max-h-4 w-auto inline-block"
                        />
                        <p>Mon Profil</p>
                      </NavLink>
                    </li>
                    <li className="p-2 hover:bg-gray-200 text-blue-dianne text-left text-sm font-bold">
                      <NavLink
                        to="/login"
                        className="flex items-center gap-1 "
                        onClick={handleLogout}
                      >
                        <img
                          src={logout}
                          alt="Logout"
                          className="max-h-4 w-auto inline-block"
                        />
                        <p>Déconnexion</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
