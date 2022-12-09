import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo_makesense.png";
import homeIcon from "../assets/home.svg";
import calendarIcon from "../assets/calendar.svg";
import smileIcon from "../assets/smile.svg";
import menuIcon from "../assets/menu.svg";
import userIcon from "../assets/sampleprofile.png";
import plusIcon from "../assets/plus.svg";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <header className="w-screen flex items-center justify-around border-solid border-2 h-16 bg-white">
      <img src={logo} alt="MakeSense" className="max-h-4 md:max-h-8 w-auto" />
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink
              to="/decisions/create"
              className="group border rounded-full h-8 w-8 flex items-center justify-center relative"
            >
              <img
                src={plusIcon}
                alt="Plus"
                className="max-h-4 w-auto group-hover:animate-spin"
              />
              <p className="hidden absolute top-full group-hover:block text-xs whitespace-nowrap mx-auto bg-slate-600 text-white px-2 rounded-md">
                Créer une décision
              </p>
            </NavLink>
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
          <li className="flex flex-col hover:underline justify-center">
            <NavLink
              to="/decision"
              className="flex flex-col hover:underline justify-center items-center"
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
          <li className="flex flex-col hover:underline justify-center">
            <img src={smileIcon} alt="Smile" className="max-h-4 w-auto" />
            <span className="hidden md:inline font-bold text-xs">
              Notifications
            </span>
          </li>
          <li>
            <button
              type="button"
              className="w-20 h-8 rounded-full bg-slate-400 flex justify-around items-center relative"
              onClick={() => setIsMenuOpen((old) => !old)}
            >
              <img src={menuIcon} alt="Menu" className="max-h-4 w-auto" />
              <img
                src={userIcon}
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              {isMenuOpen && (
                <div className="absolute top-full">
                  <ul className="bg-white border border-solid border-gray-300 rounded-md shadow-md">
                    <li className="p-2 hover:bg-gray-200">
                      <NavLink to="/profile">Mon profil</NavLink>
                    </li>
                    <li className="p-2 hover:bg-gray-200">
                      <NavLink to="/logout">Déconnexion</NavLink>
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
