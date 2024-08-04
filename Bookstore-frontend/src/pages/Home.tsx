import { Box } from "@mui/material";
import "../assets/styles/pageStyle.css"
import {WelcomePanel, MainSearchBar, Recommendation } from "../components";
import { isLoggedIn } from "../utils/session";

const Home = () => {

    return (
        <div id="home">
            <Box  sx={{alignContent: "center"}}>
                <MainSearchBar />
                { isLoggedIn() ? <Recommendation />: <WelcomePanel /> }
            </Box>
        </div>

    );
}

export default Home;