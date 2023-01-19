import PropTypes from "prop-types";

function Comment({ icon, comment }) {
  return (
    <div className="flex flex-col gap-3 bg-red-50 rounded-lg border-2 md:w-2/3 border-r-2 my-4 mx-4 md:mx-0">
      <div className="flex items-center gap-2 p-2">
        <img src={icon} alt="cat" className="w-12 h-12 rounded-full" />
        <div className="flex flex-col">
          <h3 className="text-sm font-bold">Cat</h3>
          <p className="text-sm">Il y a 2 jours</p>
        </div>
      </div>
      <div
        id="separating-bar"
        className="border-b-2 border-gray-300 w-1/2 flex justify-center items-center"
      />
      <p className="text-sm p-2">{comment}</p>
    </div>
  );
}

Comment.propTypes = {
  icon: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

export default Comment;
