import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HandleUsers from "../components/AdminPanelTabs/HandleUsers";
import StatsTab from "../components/AdminPanelTabs/StatsTab";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("users");
  const tabs = ["Utilisateurs", "Statistiques"];

  const inactiveClass =
    "pl-4 border-l-2 text-slate-200 border-slate-200 hover:border-l-2 hover:border-cerise-dark hover:text-cerise-dark h-12 flex items-center text-xl font-semibold";
  const activeClass =
    "pl-4 border-l-2 text-cerise-dark border-cerise-dark h-12 flex items-center text-xl font-semibold";

  return (
    <main className="flex h-screen bg-white relative">
      <aside className="w-64 h-full bg-blue-dianne shadow-2xl flex flex-col">
        <h1 className="px-4 py-4 text-white font-bold text-2xl tracking-widest uppercase text-center border-b-2">
          Panneau Admin
        </h1>
        <nav className="flex-1 pl-4 mt-8 mb-20 flex flex-col justify-between">
          <ul className="flex flex-col">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab ? activeClass : inactiveClass
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 items-center">
            <NavLink
              to="/"
              className="px-4 border-2 bg-white text-blue-dianne hover:border-cerise-dark hover:text-white hover:bg-cerise-dark h-12 flex items-center text-4xl font-black rounded-xl hover:no-underline"
            >
              ←
            </NavLink>
          </div>
        </nav>
      </aside>
      <section className="flex-1 h-full p-4 overflow-y-auto">
        {activeTab === "Utilisateurs" && <HandleUsers />}
        {activeTab === "Statistiques" && <StatsTab />}
      </section>
    </main>
  );
}

export default AdminPanel;
