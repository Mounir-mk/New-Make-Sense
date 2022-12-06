import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_makesense.png";
import homeIcon from "../assets/home.svg";
import calendarIcon from "../assets/calendar.svg";
import smileIcon from "../assets/smile.svg";
import menuIcon from "../assets/menu.svg";
import userIcon from "../assets/sampleprofile.png";
import plusIcon from "../assets/plus.svg";

function Header() {
  return (
    <header className="w-screen flex items-center justify-around border-solid border-2 h-16">
      <img src={logo} alt="MakeSense" className="max-h-4 md:max-h-8 w-auto" />
      <nav>
        <ul className="flex gap-4">
          <li className="group border rounded-full h-8 w-8 flex items-center justify-center relative">
            <Link to="/decisions/create">
              <img
                src={plusIcon}
                alt="Plus"
                className="max-h-4 w-auto group-hover:animate-spin"
              />
              <p className="hidden absolute top-full group-hover:block text-xs whitespace-nowrap mx-auto bg-slate-600 text-white px-2 rounded-md">
                Créer une décision
              </p>
            </Link>
          </li>
          <li className="flex flex-col hover:underline justify-center">
            <img src={homeIcon} alt="Home" className="max-h-4 w-auto" />
            <span className="hidden md:inline font-bold text-xs">
              Parcourir les décisions
            </span>
          </li>
          <li className="flex flex-col hover:underline justify-center">
            <Link to="/decision">
              <img
                src={calendarIcon}
                alt="Calendar"
                className="max-h-4 w-auto"
              />
              <span className="hidden md:inline font-bold text-xs">
                Mes décisions
              </span>
            </Link>
          </li>
          <li className="flex flex-col hover:underline justify-center">
            <img src={smileIcon} alt="Smile" className="max-h-4 w-auto" />
            <span className="hidden md:inline font-bold text-xs">
              Notifications
            </span>
          </li>
          <li className="w-20 h-8 rounded-full bg-slate-400 flex justify-around items-center">
            <img src={menuIcon} alt="Menu" className="max-h-4 w-auto" />
            <img
              src={userIcon}
              alt="User"
              className="h-8 w-8 rounded-full object-cover"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
