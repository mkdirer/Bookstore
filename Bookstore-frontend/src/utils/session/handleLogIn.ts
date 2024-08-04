import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { startSession } from './sessionActions';

/**
 * Function fetching URL POST to log in with given credentials
 * @param {string} email - User email/login.
 * @param {string} password - User password.
 * @param {function} setError - Function setting state of log in error (true/false).
 */
const handleLogIn = async (email: string, password: string, setError: (flag: boolean) => void) => {

  try {
    const response = await axios.post(
      '/auth/login', {
      login: email,
      password: password
    },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );


    const { jwt, refreshToken, userId, avatar } = response.data;

    const decodedJwt: object | null = jwt_decode(jwt);
    if (decodedJwt && (decodedJwt as any).iss === "Book Rating") {
      const sessionData = {
        isModerator: (decodedJwt as any).isModerator,
        login: (decodedJwt as any).login,
        exp: (decodedJwt as any).exp,
        userID: userId,
        token: jwt,
        refreshToken: refreshToken,
        avatar: avatar
      };
      startSession(sessionData);
      window.location.reload();
    }
    else {
      setError(true);
      console.log("Token invalid")
    }

  } catch (error) {
    setError(true);
    console.log(error)
  }
};


export { handleLogIn };
