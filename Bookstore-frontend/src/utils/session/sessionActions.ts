/**
 * Interface defining the properties that the SessionData object should have.
 * @property {boolean} isModerator - Indicates whether the user is a moderator or not.
 * @property {string} login - The user's login username.
 * @property {string} userID - The user's unique ID.
 * @property {string} refreshToken - The token used to refresh the user's session.
 * @property {string} token - The jwt token 
 * @property {number} exp - Token expiration time 
 */
interface SessionData {
  isModerator: boolean;
  login: string;
  userID: string;
  refreshToken: string;
  token: string;
  exp: number;
  avatar: string;
}

/**
 * Sets the session data in the browser localStorage with the given expiration time.
 * @param {SessionData} sessionData - The session data to be stored in the localStorage.
 */
const startSession = (sessionData: SessionData): void => {
  console.log("Session started")
  const { isModerator, login, userID, refreshToken, token, exp, avatar } = sessionData;
  const data = { isModerator, login, userID, refreshToken, token, exp, avatar };
  console.log( data.exp )
  localStorage.setItem('sessionData', JSON.stringify(data));
};

/**
 * Ends the current session by removing the session data from the browser localStorage
 * and reloading the window.
 */
const endSession = (): void => {
  console.log("Session ended")
  localStorage.removeItem('sessionData');
};

/**
 * Updates the session data with a new value for the given key.
 * @param {keyof SessionData} key - The key of the session data to be updated.
 * @param {boolean|string} value - The new value for the given key.
 */
const updateSession = (key: keyof SessionData, value: boolean | string): void => {
  const sessionData = localStorage.getItem('sessionData');
  if (sessionData) {
    const data = JSON.parse(sessionData);
    data[key] = value;
    localStorage.setItem('sessionData', JSON.stringify(data));
  }
};

/**
 * Restores the session data from the browser localStorage or returns null if the localStorage is empty
 * or if the session has expired.
 * @returns {SessionData | null} - The session data object or null if the localStorage is empty or the session has expired.
 */
const restoreSession = (): SessionData | null => {
  const sessionData = localStorage.getItem('sessionData');
  if (sessionData) {
    const data = JSON.parse(sessionData);
    if (data['exp'] > (new Date().getTime() / 1000)) {
      return data;
    }
  }
  return null;
};

const isLoggedIn = (): boolean => {
  return localStorage.hasOwnProperty("sessionData");
}

export type { SessionData }
export {
  startSession,
  restoreSession,
  updateSession,
  endSession,
  isLoggedIn,
}