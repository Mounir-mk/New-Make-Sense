import React from "react";
import PropTypes from "prop-types";
import eyeOpen from "../assets/eye.svg";
import eyeClosed from "../assets/eye-off.svg";

function RegisterForm({
  handleSubmit,
  firstnameRef,
  lastnameRef,
  emailRef,
  passwordRef,
  passwordConfirmRef,
  isPasswordVisible,
  setIsPasswordVisible,
  errors,
}) {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label
        htmlFor="fistname"
        className="font-bold after:content-['*'] after:text-red-500 after:ml-1"
      >
        Prénom
      </label>
      <input
        type="fistname"
        name="fistname"
        id="fistname"
        className={`border-2 rounded-lg p-2 ${
          errors.firstname ? "border-red-500" : "border-black"
        }`}
        placeholder="John"
        ref={firstnameRef}
      />
      {errors.firstname && (
        <p className="text-red-500 text-xs">{errors.firstname}</p>
      )}
      <label
        htmlFor="lastname"
        className="font-bold after:content-['*'] after:text-red-500 after:ml-1"
      >
        Nom
      </label>
      <input
        type="lastname"
        name="lastname"
        id="lastname"
        className={`border-2 rounded-lg p-2
                 ${errors.lastname ? "border-red-500" : "border-black"}`}
        placeholder="Doe"
        ref={lastnameRef}
      />
      {errors.lastname && (
        <p className="text-red-500 text-xs">{errors.lastname}</p>
      )}
      <label
        htmlFor="email"
        className="font-bold after:content-['*'] after:text-red-500 after:ml-1"
      >
        Email
      </label>
      <input
        type="text"
        autoComplete="username"
        name="email"
        id="email"
        className={`border-2 rounded-lg p-2 ${
          errors.email ? "border-red-500" : "border-black"
        }`}
        placeholder="johnDoe@email.com"
        ref={emailRef}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
      <label
        htmlFor="password"
        className="font-bold after:content-['*'] after:text-red-500 after:ml-1"
      >
        Mot de passe
      </label>
      <div className="relative w-full">
        <input
          type={isPasswordVisible.password ? "text" : "password"}
          autoComplete="new-password"
          name="password"
          id="password"
          className={`border-2 rounded-lg p-2 w-full ${
            errors.password ? "border-red-500" : "border-black"
          }`}
          placeholder="********"
          ref={passwordRef}
        />
        <button
          type="button"
          className="absolute right-0 mr-2 focus:outline-none translate-y-[40%]"
          onClick={() =>
            setIsPasswordVisible({
              ...isPasswordVisible,
              password: !isPasswordVisible.password,
            })
          }
        >
          <img
            src={isPasswordVisible.password ? eyeClosed : eyeOpen}
            alt="eye"
            className="w-6 h-6"
          />
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password}</p>
      )}
      <label htmlFor="passwordConfirm" className="font-bold">
        Confirmer le mot de passe
      </label>
      <div className="relative w-full">
        <input
          type={isPasswordVisible.passwordConfirm ? "text" : "password"}
          autoComplete="new-password"
          name="passwordConfirm"
          id="passwordConfirm"
          className="border-2 border-black rounded-lg p-2 w-full"
          placeholder="********"
          ref={passwordConfirmRef}
        />
        <button
          type="button"
          className="absolute right-0 mr-2 focus:outline-none translate-y-[40%]"
          onClick={() =>
            setIsPasswordVisible({
              ...isPasswordVisible,
              passwordConfirm: !isPasswordVisible.passwordConfirm,
            })
          }
        >
          <img
            src={isPasswordVisible.passwordConfirm ? eyeClosed : eyeOpen}
            alt="eye"
            className="w-6 h-6"
          />
        </button>
      </div>
      {errors.passwordConfirm && (
        <p className="text-red-500 text-xs">{errors.passwordConfirm}</p>
      )}
      <button
        type="submit"
        className="bg-blue-dianne text-white rounded-lg p-2"
      >
        S'inscrire
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  firstnameRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  lastnameRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  emailRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  passwordRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  passwordConfirmRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
  isPasswordVisible: PropTypes.shape({
    password: PropTypes.bool,
    passwordConfirm: PropTypes.bool,
  }).isRequired,
  setIsPasswordVisible: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
  }).isRequired,
};

export default RegisterForm;
