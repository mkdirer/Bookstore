import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";
import getLanguages from "../../assets/locales/getLanguages";

/**
 * The LanguageButtons component is a styled MaterialUI Box component with Button inside and appropriate event handling for changing website's language.
 * @returns {JSX.Element} - The rendered button component.
 */
const LanguageButtons: React.FC = (): JSX.Element => {
  const [activeLanguage, setActiveLanguage] = useState<string>(i18n.language);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setActiveLanguage(language);
    window.location.reload();
  };

  return (
    <Box>
      {getLanguages.map((lang) => (
        <Button
          onClick={() => handleLanguageChange(lang.short)}
          sx={{ textTransform: "none", m: 0, py: 1 }}
          color="secondary"
          key={lang.short}
        >
          <Typography
            variant="body1"
            sx={{
              textDecoration:
                activeLanguage === lang.short ? "underline" : "none",
            }}
          >
            {lang.lable}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export { LanguageButtons };
