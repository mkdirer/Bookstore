import * as React from "react";
import Box from "@mui/material/Box";
import {BlankPanel} from "./BlankPanel";
import {DefaultButton} from "../buttons/DefaultButton";
import i18n from "../../assets/locales/translate";
import {useNavigate} from "react-router-dom";

/**
 * @typedef {object} PropsSingleOfferTile
 * @property {string} imageSrc - Link to the image source.
 * @property {string} title - Title of the offer.
 * @property {string} offerType -
 * @property {number} weight -
 * @property {string} height -
 */
interface PropsSingleOfferTile {
    id?: number;
    imageSrc: string;
    title: string;
    offerType: string;
    weight?: string;
    height?: string;
}

/**
 * Returns a styled Paper Box component containing rating of the book.
 * @param {PropsSingleOfferTile} props - Props for the component.
 * @returns {JSX.Element} - The rendred SingleOfferTile component.
 */
const SingleOfferTile: React.FC<PropsSingleOfferTile> = ({
                                                             id,
                                                             imageSrc,
                                                             title,
                                                             offerType,
                                                             weight = "230px",
                                                             height = "400px",
                                                         }: PropsSingleOfferTile): JSX.Element => {
    const fontRatio = 30 / 360;
    const fontSize = Math.min(
        parseInt(weight) * fontRatio,
        parseInt(height) * fontRatio
    );
    const navigate = useNavigate();

    return (
        <BlankPanel
            sx={{width: weight, height: height, mr: 0, mb: 0, pb: 6, color: "black"}}
        >
            <Box
                sx={{
                    backgroundColor: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "75%",
                    maxWidth: "100%",
                    maxHeight: "95%",
                }}
            >
                <img
                    src={imageSrc}
                    alt=""
                    style={{maxWidth: "100%", maxHeight: "100%"}}
                />
            </Box>
            <Box
                sx={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: fontSize * 1.3,
                    lineHeight: "100%",
                    letterSpacing: 0.1,
                    py: 1
                }}
            >
                {title.length>20 ? `${title.substring(0,20)}...` : title}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: 800,
                    fontSize: fontSize * 1.3,
                    lineHeight: "90%",
                    textAlign: "left",
                    marginLeft: "16px",
                }}
            >
                {offerType}
            </Box>
            <DefaultButton
                sx={{alignSelf: "center", my: 2}}
                label={i18n.t('view') || 'view'}
                handleClick={() => navigate(`/offer/${id}`)}/>
        </BlankPanel>
    );
};

export type {PropsSingleOfferTile};
export {SingleOfferTile};
