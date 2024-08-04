import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {FormattedMessage} from "react-intl";

const Navbar = () => {
    return (
        <Stack direction="row" spacing={2}>
            <Box alignSelf="right">
                <Button href="/database-and-ratings" color="secondary">
                    <FormattedMessage id="navbar.databaseAndRatings" />
                </Button>
                <Button href="/search" color="secondary">
                    <FormattedMessage id="navbar.search" />
                </Button>
                <Button href="/offers" color="secondary">
                    <FormattedMessage id="navbar.offers" />
                </Button>
                <Button href="/moderator" color="secondary">
                    <FormattedMessage id="navbar.moderator" />
                </Button>
            </Box>
        </Stack>
    )
}

export default Navbar;