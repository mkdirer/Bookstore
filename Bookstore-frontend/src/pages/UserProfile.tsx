import { BlankTile, UserInfoPanel, UserProfilePhoto, UserRatingsPanel } from "../components";
import { Box } from "@mui/material";
import {useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import {getProfile, getUserById, User} from "../utils/fetch/fetch";

const UserProfile = () => {
    const {userId} = useParams();
    const [userData, setUserData] = useState<User>();
    const [profileId, setProfileId] = useState<number>();
    const isProfileFetched = useRef(false);
    const isUserFetched = useRef(false);

    const isOwnProfile = (profileId && userId) ? userId === profileId?.toString() : false;

    const getAvatarFromSession = (): string => {
        const sessionDataString = localStorage.getItem('sessionData');
        if (sessionDataString) {
          const sessionData = JSON.parse(sessionDataString);
          return sessionData.avatar || "none";
        }
        return "none";
      };

    useEffect(() => {
        if (!isUserFetched.current && userId) {
            getUserById(parseInt(userId))
                .then((user) => setUserData(user as User))
                .catch((err) => console.log(err));
        }
    }, []);

    useEffect(() => {
        if (!isProfileFetched.current && userId) {
            getProfile()
                .then((profile) => setProfileId(profile?.id))
                .catch((err) => console.log(err));
        }
    }, []);

    

    return (
        <div id="home">
            <BlankTile sx={{display: "block"}} >
                <Box sx={{display: "flex", justifyContent: "space-between" }}>
                    <UserProfilePhoto name={userData?.fname || ""} surname={userData?.lname || ""} photo={getAvatarFromSession()} />
                    <UserInfoPanel
                        surname={userData?.lname || ""}
                        name={userData?.fname || ""}
                        email={userData?.email || ""}
                        phoneNr={userData?.phone || ""}
                        isOwnProfile={isOwnProfile}
                    />
                </Box>
                <UserRatingsPanel />
            </BlankTile>
        </div>
    );
}

export default UserProfile;