import PropTypes from "prop-types";
import { Progress } from "rsuite";
import { getDate, convertToFr } from "../services/dateFunctions";

function Timeline({ startDate, endDate }) {
  const { statusDuration, publishDate, durationPercentage } = getDate(
    startDate,
    endDate
  );
  return (
    <>
      <div className="flex rotate-180 absolute h-[45%] my-14">
        {durationPercentage <= 100 ? (
          <Progress.Line
            vertical
            percent={durationPercentage}
            strokeColor="#C1E94E"
            showInfo={false}
            status="active"
          />
        ) : (
          <Progress.Line
            vertical
            percent="100"
            strokeColor="#C1E94E"
            showInfo={false}
            status="success"
          />
        )}
      </div>
      <div id="timeline" className="flex flex-col">
        <h1 className="font-bold text-base">Dates à retenir</h1>
        <ol className="p-7">
          <li>
            <div className="flex flex-start items-center pt-2">
              <p className="text-gray-500 text-sm">{convertToFr(startDate)}</p>
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
                      publishDate.getTime() + statusDuration * 2
                    ).toISOString()
                  )}
              </p>
            </div>
            <div className="mt-0.5 ml-4 mb-6">
              <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                Conflit sur la décision
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
                Décision définitive
              </h4>
            </div>
          </li>
          <li>
            <div className="flex flex-start items-center pt-2">
              <p className="text-gray-500 text-sm">{convertToFr(endDate)}</p>
            </div>
            <div className="mt-0.5 ml-4 pb-5">
              <h4 className="text-gray-800 font-semibold text-sm mb-1.5">
                Décision terminée
              </h4>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}

Timeline.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};
export default Timeline;
