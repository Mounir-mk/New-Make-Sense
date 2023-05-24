const checkRegisterFormErrors = (userInformations, passwordConfirm) => {
  const errors = {};

  if (!userInformations.firstname) {
    errors.firstname = "Le prénom est obligatoire";
  } else if (userInformations.firstname.length < 2) {
    errors.firstname = "Le prénom doit faire au moins 2 caractères";
  }
  if (!userInformations.lastname) {
    errors.lastname = "Le nom est obligatoire";
  } else if (userInformations.lastname.length < 2) {
    errors.lastname = "Le nom doit faire au moins 2 caractères";
  }
  if (!userInformations.email) {
    errors.email = "L'email est obligatoire";
  } else if (!/\S+@\S+\.\S+/.test(userInformations.email)) {
    errors.email = "Email is invalid";
  }
  if (!userInformations.password.length) {
    errors.password = "Le mot de passe est obligatoire";
  } else if (userInformations.password.length < 8) {
    errors.password = "Le mot de passe doit faire au moins 8 caractères";
  }
  if (userInformations.password !== passwordConfirm) {
    errors.passwordConfirm = "Les mots de passe ne correspondent pas";
  }

  return errors;
};

export default checkRegisterFormErrors;
