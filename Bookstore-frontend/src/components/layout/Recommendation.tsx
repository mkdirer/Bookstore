/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, useRef } from "react";
import {Link, Typography} from "@mui/material";
import { BlankTile, LoadingPopup } from "..";
import i18n from "../../assets/locales/translate";
import { getRecommendation } from "../../utils/books/getRecommendation";

/**
 * Recomendation panel displays random recomendation.
 * @returns { Promise<JSX.Element> } - The rendered Recomendation.
 */
const Recommendation: React.FC = (): JSX.Element => {
  const [recommendation, setRec] = useState({
    id: -1,
    title: "",
    isbn: "",
    imgURL: "",
  });
  const isFetched = useRef(false);
  
  useEffect(() => {
    console.log("useEffect with ", isFetched);
    const fetchBook = async () => {
      await getRecommendation()
        .then((obj) => {
          setRec(obj);
        })
        .catch((err) => console.log(err));
    };

    if (!isFetched.current) {
      fetchBook();
      isFetched.current = true;
    }
  }, []);

  return (
    <BlankTile sx={{ display: "block", color: "white" }}>
      {isFetched ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }} align="center">
            {(i18n.t("hey header") || "Hey") +
              ", " +
              JSON.parse(
                localStorage.getItem("sessionData") || "{login: 'User'}}"
              ).login}
          </Typography>
          <Typography variant="h6" align="center">
            {i18n.t("hey body") || "hey"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }} align="center">
            {i18n.t("recommendation") || "Recommendation"}
          </Typography>

          <BlankTile
            sx={{ display: "block", color: "black", p: 1, maxWidth: "800px" }}
          >
            <Link href={`/book/${recommendation.id}`}>
              <Typography variant="h5" sx={{ mb: 2 }} align="center">
                {recommendation.title}
              </Typography>
            </Link>
            <img
              src={recommendation.imgURL}
              alt="book image"
              min-height="460px"
              min-width="360px"
              height="460px"
              width="360px"
            />
          </BlankTile>
        </>
      ) : (
        <LoadingPopup />
      )}
    </BlankTile>
  );
};

export { Recommendation };
