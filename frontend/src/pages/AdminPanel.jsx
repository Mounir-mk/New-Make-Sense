import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HandleUsers from "../components/AdminPanelTabs/HandleUsers";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const tabs = ["Utilisateurs", "Statistiques"];
  return (
    <main className="flex h-screen bg-gray-200 relative">
      <aside className="w-64 h-full bg-white shadow-2xl static">
        <h1 className="px-4 py-4 bg-blue-dianne text-white font-bold text-2xl tracking-widest uppercase text-center">
          Panneau Admin
        </h1>
        {tabs.map((tab) => (
          <button
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`block text-left w-full capitalize px-4 py-3 text-base font-semibold text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:bg-indigo-100  ${
              activeTab === tab ? "bg-indigo-100" : ""
            }`}
          >
            {tab}
          </button>
        ))}
        <NavLink
          to="/"
          className="block py-3 px-4 text-base font-semibold text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:bg-indigo-100"
        >
          Retour aux décisions
        </NavLink>
      </aside>
      <section className="flex-1 h-full p-4">
        {activeTab === "users" && <HandleUsers />}
      </section>
    </main>
  );
}

export default AdminPanel;
