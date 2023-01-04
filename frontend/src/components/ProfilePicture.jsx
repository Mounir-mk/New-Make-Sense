import React from "react";
import PropTypes from "prop-types";

function ProfilePicture({ profilePicture, setProfilePicture, imageRef }) {
  return (
    <article
      id="login_image"
      className="h-full md:w-1/2 pb-4 md:pb-0 flex justify-center items-center flex-col gap-4 md:gap-4 self-center"
    >
      <img
        src={profilePicture || "https://via.placeholder.com/150"}
        alt="image2"
        className="h-16 w-16 md:h-20 md:w-20 rounded-full"
      />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="file"
          className="bg-white text-blue-dianne font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          <span className="bg-blue-dianne text-white font-bold py-2 px-4 rounded-lg whitespace-nowrap">
            {profilePicture ? "Changer" : "Ajouter une photo de profil"}
          </span>
        </label>
        <input
          type="file"
          name="file"
          id="file"
          ref={imageRef}
          accept="image/*"
          className="hidden"
          onChange={() => {
            setProfilePicture(URL.createObjectURL(imageRef.current.files[0]));
          }}
        />
      </div>
    </article>
  );
}

ProfilePicture.propTypes = {
  profilePicture: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  imageRef: PropTypes.string.isRequired,
  setProfilePicture: PropTypes.func.isRequired,
};

export default ProfilePicture;
