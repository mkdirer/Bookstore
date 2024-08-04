import {BlankPanel} from "../";
import {useState} from "react";
import i18n from "../../assets/locales/translate";
import {Stack, Typography} from "@mui/material";
import {DefaultButton} from "../";
import bookImg from '../../assets/images/book.jpg'
import {getRatings} from "../../utils/getRatings";
import {viewAllHandler} from "../../utils/viewAllHandler";
import {RatingTile} from "../";

/**
 * The UserRatingsPanel component displays BlancPanel with users's ratings.
 * @returns {JSX.Element} - The rendered UserRatingsPanel component.
 */
const UserRatingsPanel: React.FC = (): JSX.Element => {
    const [ratingsList, setRatingsList] = useState(getRatings(4));

    return (
        <BlankPanel sx={{ width: "95%", borderRadius: 4 }}>
            <Typography align="left" sx={{ mx:3, mb: 1, fontWeight: "bold", fontSize: 27 }}>
                {i18n.t('ratings') || 'ratings'}
            </Typography>
            <Stack sx={{ height: "80%"}}>
                {ratingsList.map( rating => (
                    <RatingTile
                        key={rating.key}
                        bookLink={rating?.bookLink || ''}
                        bookCover={bookImg}
                        bookName={rating.bookName}
                        ratingValue={rating.value}
                    />
                ))}
            </Stack>
            <DefaultButton sx={{mt: 2, width: 210}} label={i18n.t('viewAll') || 'viewAll'} handleClick={()=>viewAllHandler("view all")}/>
        </BlankPanel>
    );
}

export {UserRatingsPanel};