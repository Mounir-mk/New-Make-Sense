import PropTypes from "prop-types";
import { getDate, convertToFr } from "../services/dateFunctions";
import TimelineSection from "./TimelineSection";

function Timeline({ startDate, endDate }) {
  const { statusDuration, publishDate, durationPercentage } = getDate(
    startDate,
    endDate
  );
  const titles = [
    "Décision débutée",
    "Deadline pour donner son avis",
    "Première décision prise",
    "Deadline pour rentrer en conflit",
    "Décision définitive",
  ];

  const dates = [
    convertToFr(startDate),
    startDate !== "" &&
      convertToFr(
        new Date(publishDate.getTime() + statusDuration).toISOString()
      ),
    startDate !== "" &&
      convertToFr(
        new Date(publishDate.getTime() + statusDuration * 2).toISOString()
      ),
    startDate !== "" &&
      convertToFr(
        new Date(publishDate.getTime() + statusDuration * 3).toISOString()
      ),
    convertToFr(endDate),
  ];
  return (
    <>
      <h1 className="font-bold text-base">Dates à retenir</h1>
      <section className="flex items-center h-[400px] md:h-auto">
        <div className="bg-slate-200 w-3 rounded-xl h-[90%] mr-4">
          <div
            className="relative w-full rounded-xl bg-green-500 z-50"
            style={{
              height: `${
                durationPercentage <= 100 ? durationPercentage : 100
              }%`,
            }}
          />
        </div>

        <div id="timeline">
          <ol className="flex flex-col justify-between">
            {titles.map((title, index) => (
              <TimelineSection key={title} title={title} date={dates[index]} />
            ))}
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
