import PropTypes from "prop-types";

function TimelineSection({ title, date }) {
  return (
    <li>
      <div className="flex flex-start items-center pt-2">
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
      <div className="mt-0.5 ml-4 mb-6">
        <h4 className="text-gray-800 font-semibold text-sm mb-1.5">{title}</h4>
      </div>
    </li>
  );
}
TimelineSection.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
export default TimelineSection;
