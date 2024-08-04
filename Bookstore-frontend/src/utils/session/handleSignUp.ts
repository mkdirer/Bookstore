import { User, register } from "../fetch/fetch";

/**
 * Function fetching URL POST to sign up with given credentials
 * @param {string} name - User name.
 * @param {string} lastname - User lastname.
 * @param {string} login - User login.
 * @param {string} email - User email.
 * @param {string} telephone - User telephone.
 * @param {string} password - User password.
 * @param {string} repassword - User repassword.
 * @param {function} setError - Function setting state of sign up error (true/false).
 * @returns {boolean} - true if successful otherwise false
 */
const handleSignUp = async (
  name: string,
  lastname: string,
  login: string,
  email: string,
  telephone: string,
  password: string,
  repassword: string,
  setError: (flag: boolean) => void,
) => {
  try {
    const newUser: User = {
      login: login,
      password: password,
      fname: name,
      lname: lastname,
      email: email,
      phone: telephone,
      ismoderator: false,
    };
    await register(newUser, setError);
  } catch (error) {
    setError(true);
    console.log(error);
  }
};

export { handleSignUp };
