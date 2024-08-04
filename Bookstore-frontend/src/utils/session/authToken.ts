import axios from 'axios';
import { updateSession } from './sessionActions';
import jwt_decode from 'jwt-decode';

/**
 * Function that return token - if it is valid just return it, if it is expired request for a new one
 * @returns { Promise<string>} Token neccesary to authorise
 */
const authToken = async (): Promise<string> => {
  const sessionData = localStorage.getItem('sessionData') || 'NO REFRESH TOKEN';

  const { token, refreshToken, exp } = JSON.parse(sessionData);
  if (new Date().getTime() / 1000 > exp)
    try {
      const response = await axios.post(
        '/auth/refresh',
        {
          "refreshToken": refreshToken
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response) {
        const decodedJwt: object | null = jwt_decode(response.data);
        updateSession("exp", (decodedJwt as any).exp );
        updateSession("token", response.data);
        return response.data
      }
    } catch (error) {
      console.log(error);
    }

  return token;
}

export { authToken }