import PropTypes from "prop-types";
import { getDate, convertToFr } from "../services/dateFunctions";
import TimelineSection from "./TimelineSection";

function Timeline({ startDate, endDate }) {
  const { statusDuration, publishDate, durationPercentage } = getDate(
    startDate,
    endDate
  );
  return (
    <>
      <h1 className="font-bold text-base">Dates à retenir</h1>
      <section className="flex items-center h-[400px] md:h-auto">
        <div className="bg-slate-200 w-3 rounded-xl h-[90%] mr-4">
          {durationPercentage <= 100 ? (
            <div
              className="relative w-full rounded-xl bg-green-500 z-50"
              style={{ height: `${durationPercentage}%` }}
            />
          ) : (
            <div
              className="relative w-full rounded-xl bg-green-500 z-50"
              style={{ height: "100%" }}
            />
          )}
        </div>

        <div id="timeline">
          <ol className="flex flex-col justify-between">
            <TimelineSection
              title="Décision débutée"
              date={convertToFr(startDate)}
            />
            <TimelineSection
              title="Deadline pour donner son avis"
              date={
                startDate !== "" &&
                convertToFr(
                  new Date(publishDate.getTime() + statusDuration).toISOString()
                )
              }
            />
            <TimelineSection
              title="Première décision prise"
              date={
                startDate !== "" &&
                convertToFr(
                  new Date(
                    publishDate.getTime() + statusDuration * 2
                  ).toISOString()
                )
              }
            />
            <TimelineSection
              title="Deadline pour rentrer en conflit"
              date={
                startDate !== "" &&
                convertToFr(
                  new Date(
                    publishDate.getTime() + statusDuration * 3
                  ).toISOString()
                )
              }
            />
            <TimelineSection
              title="Décision définitive"
              date={convertToFr(endDate)}
            />
          </ol>
        </div>
      </section>
    </>
  );
}

Timeline.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
export default Timeline;
