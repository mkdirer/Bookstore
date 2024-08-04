import {useState} from "react";
import handleSearch from "../../utils/handleSearch";
import {IconButton, InputAdornment, SxProps, TextField, Theme} from "@mui/material";
import i18n from "../../assets/locales/translate";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({sx}: { sx?: SxProps<Theme> }) => {
    const [toSearch, setToSearch] = useState("")

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") searchFunction();
    }

    const searchFunction = () => handleSearch(toSearch)

    return (
        <TextField
            variant="standard"
            value={toSearch}
            label={i18n.t('search bar label') || 'Search'}
            onChange={(e) => setToSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            sx={[...(Array.isArray(sx) ? sx : [sx])]}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={searchFunction}>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>)
            }}/>
    );
};