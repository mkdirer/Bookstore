import { useState } from "react";
import {
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BlankTile } from "../";
import i18n from "../../assets/locales/translate";
import handleOffersSearch from "../../utils/handleOffersSearch";
import { BlankPanel } from "../";

interface OfferSearchBarProps {
  onCheckboxChange: (searchValue: string, offerType: 'free' | 'sale' | 'exchange' | '') => void;
}

const OffersSearchBar: React.FC<OfferSearchBarProps> = ({
  onCheckboxChange,
}): JSX.Element => {
  const [toSearch, setToSearch] = useState("");
  const [offerType, setOfferType] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") searchFunction();
  };

  const searchFunction = () => {
    handleOffersSearch(toSearch, offerType);
    onCheckboxChange(toSearch, offerType as "" | "free" | "sale" | "exchange");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOfferType((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <BlankPanel
        sx={{ mr: 0, mb: 0, color: "black", borderRadius: 0, p: "6px"}}
      >
        <BlankTile sx={{ mb: 0, width: "950px", mx: "auto" }}>
          <Box
            sx={{
              p: 1,
              width: "100%",
              border: "2px solid ",
              borderColor: "primary.main",
              backgroundColor: "white",
              borderRadius: 2,
              pb: 0,
            }}
          >
            <TextField
              variant="standard"
              value={toSearch}
              label={(i18n.t("search bar label") || "SEARCH").toUpperCase()}
              onChange={(e) => setToSearch(e.target.value)}
              onKeyDown={handleKeyPress}
              sx={{ minWidth: "200px", width: "100%" }}
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
          <Box sx={{ display: "flex", width: "100%", mx: "auto", pl: 1 }}>
            <RadioGroup
              name="offerType"
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={handleChange}
              defaultValue={"sale"}
              value={offerType}
              sx={{
                display: "flex",
                flexDirection: "row",
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: '22px',
                letterSpacing: '0.46px',
                color: '#2196F3'
              }}
            >
              <FormControlLabel
                value="free"
                control={<Radio />}
                label={(i18n.t("for free") || "FOR FREE").toUpperCase()}
              />
              <FormControlLabel
                value="sale"
                control={<Radio />}
                label={(i18n.t("sale") || "SALE").toUpperCase()}
              />
              <FormControlLabel
                value="exchange"
                control={<Radio />}
                label={(i18n.t("exchange") || "EXCHANGE").toUpperCase()}
              />
              <FormControlLabel
                value=""
                control={<Radio />}
                label="All"
              />
            </RadioGroup>
          </Box>
      </BlankPanel>
    </>
  );
};

export default OffersSearchBar;
