import "./App.css";
import { theme } from "./assets/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Header } from "./components";
import { Footer } from "./components";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ModeratorPage from "./pages/ModeratorPage";
import DatabaseAndRatings from "./pages/DatabaseAndRatings";
import Offers from "./pages/Offers";
import UserProfile from "./pages/UserProfile";
import BooksList from "./pages/BooksList";
import OfferInfo from "./pages/OfferInfo";
import BookInfo from "./pages/BookInfo";
import TestArea from "./pages/TestArea";
import {
  restoreSession,
  SessionData,
  endSession,
  isLoggedIn,
} from "./utils/session";
import { useEffect } from "react";
import axios from "axios";
import configData from "./config.json";

const App = () => {
  axios.defaults.baseURL = configData.API_URL + "/api";
  // axios.defaults.baseURL = configData.API_URL_SERVER + "/api";

  const sessionData: SessionData | null = restoreSession();

  useEffect(() => {
    const ifSessionTokenExpired = (): boolean => {
      if (sessionData !== null) {
        return sessionData["exp"] <= new Date().getTime() / 1000;
      }
      return true;
    };

    setInterval(() => {
      if (ifSessionTokenExpired() && isLoggedIn()) {
        window.location.reload();
        endSession();
      }
    }, 15*60*1000);
  }, [sessionData]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/database-and-ratings"
              element={<DatabaseAndRatings />}
            />
            <Route path="/offers" element={<Offers />} />
            <Route path="/moderator" element={<ModeratorPage />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/offer/:offerId" element={<OfferInfo />} />
            <Route path="/book/:bookId" element={<BookInfo />} />
            <Route path="/testArea" element={<TestArea />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;