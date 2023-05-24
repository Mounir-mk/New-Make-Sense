import { useAuthUser } from "react-auth-kit";
import useFetch from "../hooks/useFetch";
import DashboardCard from "../components/DecisionCard";
import Loader from "../components/Loader";

function MyDecisionsPage() {
  const auth = useAuthUser();
  const { data: decisions, loading } = useFetch("decisions", "GET", true, true);

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <section id="mydecisions" className="w-2/3 mt-24 mb-20">
        <h1 className="font-bold text-3xl text-blue-dianne pb-12 border-b-2">
          Mes décisions
        </h1>
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          {decisions
            .filter((decision) => decision.id === auth().user.id)
            .map((decision) => (
              <DashboardCard
                key={decision.id}
                avatar={`${import.meta.env.VITE_BACKEND_URL}/${
                  decision.image_url
                }`}
                id={decision.id}
                decisionTitle={decision.title}
                author={`${decision.firstname} ${decision.lastname}`}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

export default MyDecisionsPage;
