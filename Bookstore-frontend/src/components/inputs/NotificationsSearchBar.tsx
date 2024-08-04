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
import { BlankPanel, BlankTile } from "../";

interface NotificationsSearchBarProps {
  onSearch: (searchValue: string, searchType: 'userName' | 'bookName' | '') => void;
}

const NotificationsSearchBar: React.FC<NotificationsSearchBarProps> = ({
  onSearch,
}): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState('');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") searchFunction();
  };

  const searchFunction = () => {
    onSearch(searchValue, searchType as 'userName' | 'bookName' | '');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType((event.target as HTMLInputElement).value);
  };

  return (
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
        value={searchValue}
        label="Search by user or book name"
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyPress}
        // sx={{ minWidth: "200px", width: "100%" }}
        fullWidth
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
              name="searchType"
              aria-labelledby="demo-radio-buttons-group-label"
              onChange={handleChange}
              defaultValue={"userName"}
              value={searchType}
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
          value="userName"
          control={<Radio />}
          label="User"
        />
        <FormControlLabel
          value="bookName"
          control={<Radio />}
          label="Book Name"
        />
        <FormControlLabel
          value=""
          control={<Radio />}
          label="All"
        />
      </RadioGroup>
    </Box>
    </BlankPanel>
  );
};

export default NotificationsSearchBar;
