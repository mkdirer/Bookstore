import { Rating, Stack, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";

interface PropsRatingField {
  ratingValue?: number;
  ratingsNumber?: number;
  rowDirection?: boolean;
}

const RatingField: React.FC<PropsRatingField> = ({ ratingValue, ratingsNumber, rowDirection }: PropsRatingField):
JSX.Element => {

    return (
        <>
            <Stack sx={{ mt: 0.7 }} direction={rowDirection ? "row" : "column"}>
                <Stack direction="row">
                    <Rating
                        value={ratingValue}
                        precision={0.1}
                        readOnly
                    />
                    <Typography sx={{ ml: 1 }}>{ratingValue}</Typography>
                </Stack>
                <Typography sx={{ mt: rowDirection ? 0 : 1, ml: rowDirection ? 2 : 0 }}>
                    [ {ratingsNumber} {i18n.t('ratingsNumber') || 'ratings'}]
                </Typography>
            </Stack>
        </>
    );
}

export type { PropsRatingField };
export { RatingField };
