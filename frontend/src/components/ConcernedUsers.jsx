import PropTypes from "prop-types";

function ConcernedUsers({ status, concerned }) {
  return (
    <ul className="flex gap-1 flex-wrap self-start">
      {concerned.map(
        (oneOfConcerned) =>
          oneOfConcerned.user_status === status && (
            <li key={oneOfConcerned.id}>
              <img
                className="w-12 h-12 rounded-full"
                src={
                  oneOfConcerned.image_url ||
                  "https://sutter.dr-veterinaire.com/media/original/lil-bub-2013-crop-for-thumb-78296.jpg"
                }
                alt="tab"
              />
            </li>
          )
      )}
    </ul>
  );
}
ConcernedUsers.propTypes = {
  status: PropTypes.string.isRequired,
  concerned: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      image_url: PropTypes.string,
      user_status: PropTypes.string,
    })
  ).isRequired,
};

export default ConcernedUsers;
