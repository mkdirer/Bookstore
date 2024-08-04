import { endSession } from "./sessionActions";
import { logout } from "../fetch/fetch";

const handleLogOut = async () => {
  try {
    const sessionData =
      localStorage.getItem("sessionData") || "NO REFRESH TOKEN";

    const { refreshToken } = JSON.parse(sessionData);
    console.log(refreshToken);

    await logout(refreshToken);
  } catch (error) {
    console.error(error);
  }
  endSession();
  window.location.reload();
};

export { handleLogOut };