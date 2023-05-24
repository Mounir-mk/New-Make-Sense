import React, { useState, useRef } from "react";
import RegisterForm from "../components/RegisterForm";
import loginImage from "../assets/login_image.jpg";
import ProfilePicture from "../components/ProfilePicture";
import checkRegisterFormErrors from "../utils/checkRegisterFormErrors";
import useFetch from "../hooks/useFetch";
import useLogin from "../hooks/useLogin";

function Register() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
    passwordConfirm: false,
  });
  const { login } = useLogin();
  const { fetch: createAccount } = useFetch(
    "users",
    "POST",
    false,
    false,
    "multipart/form-data"
  );
  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    const userInformations = {
      avatar: avatarRef.current.files[0],
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const newErrors = {};
    checkRegisterFormErrors(userInformations, newErrors);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      const fields = ["avatar", "firstname", "lastname", "email", "password"];
      fields.forEach((field) => {
        formData.append(field, userInformations[field]);
      });
      await createAccount(formData);
      await login(userInformations.email, userInformations.password);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center md:bg-blue-dianne md:py-0">
      <section className="h-max-full w-[80%] flex gap-2 md:gap-10 flex-col md:flex-row justify-center items-center">
        <article
          id="login_image"
          className="h-full md:w-1/2 pb-4 md:pb-0 hidden md:flex md:justify-center md:items-center"
        >
          <img
            src={loginImage}
            alt="Login"
            className="h-max-full w-auto rounded-2xl"
          />
        </article>
        <article
          id="register"
          className="bg-white h-full md:w-1/3 flex flex-col md:gap-2 md:p-4 rounded-lg justify-evenly"
        >
          <h1 className="text-2xl font-bold text-center">Inscription</h1>
          <ProfilePicture
            avatar={avatar}
            setAvatar={setAvatar}
            avatarRef={avatarRef}
          />
          <RegisterForm
            firstnameRef={firstnameRef}
            lastnameRef={lastnameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            passwordConfirmRef={passwordConfirmRef}
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
            errors={errors}
            handleSubmit={handleSubmit}
          />
        </article>
      </section>
    </main>
  );
}

export default Register;
