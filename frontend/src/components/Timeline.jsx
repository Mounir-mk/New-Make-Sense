import PropTypes from "prop-types";
import { getDate, convertToFr } from "../services/dateFunctions";

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
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">
                  {convertToFr(startDate)}
                </p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Décision débutée
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">
                  {startDate !== "" &&
                    convertToFr(
                      new Date(
                        publishDate.getTime() + statusDuration
                      ).toISOString()
                    )}
                </p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Deadline pour donner son avis
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">
                  {startDate !== "" &&
                    convertToFr(
                      new Date(
                        publishDate.getTime() + statusDuration * 2
                      ).toISOString()
                    )}
                </p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Première décision prise
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">
                  {startDate !== "" &&
                    convertToFr(
                      new Date(
                        publishDate.getTime() + statusDuration * 3
                      ).toISOString()
                    )}
                </p>
              </div>
              <div className="mt-0.5 ml-4 mb-6">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Deadline pour rentrer en conflit
                </h4>
              </div>
            </li>
            <li>
              <div className="flex flex-start items-center pt-2">
                <p className="text-gray-500 text-sm">{convertToFr(endDate)}</p>
              </div>
              <div className="mt-0.5 ml-4 pb-5">
                <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                  Décision définitive
                </h4>
              </div>
            </li>
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
