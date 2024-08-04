import { useState } from "react";
import { TextField, InputAdornment, Box, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BlankTile } from "../";
import i18n from "../../assets/locales/translate";
import { useNavigate } from "react-router-dom";

/**
 * Returns a styled MainSearchBar component.
 * @returns {JSX.Element} - The rendered MainSearchBar component.
 */
const MainSearchBar: React.FC = (): JSX.Element => {
  const [toSearch, setToSearch] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") searchFunction();
  };
  const navigate = useNavigate();

  const searchFunction = () => {
    console.log(toSearch);
    navigate("/database-and-ratings", { state: { title: toSearch } });
  };

  return (
    <BlankTile sx={{ mb: 8, width: "720px", mx: "auto" }}>
      <Box
        sx={{
          p: 1,
          width: "700px",
          border: "2px solid ",
          borderColor: "primary.main",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <TextField
          variant="standard"
          value={toSearch}
          label={i18n.t("search bar label") || "Search"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setToSearch(e.target.value)
          }
          onKeyDown={handleKeyPress}
          sx={{ minWidth: "300px", width: "700px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={searchFunction}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </BlankTile>
  );
};

export { MainSearchBar };
