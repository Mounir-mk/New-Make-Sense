import DashboardCard from "../components/DecisionCard";

function Dashboard() {
  return (
    <main className="flex justify-center">
      <section id="current-decision" className="w-2/3 mt-24 mb-20">
        <h1 className="font-bold text-3xl text-blue-dianne pb-12 border-b-2">
          Décisions en cours
        </h1>
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          <DashboardCard
            decisionTitle="Déménager hors de paris à printemps 2023 (fin Avril) et tester Milan"
            author="Jane Doe"
          />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
