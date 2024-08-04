import * as React from "react";
import Stack from "@mui/material/Stack";
import {DefaultButton} from "../";
import i18n from "../../assets/locales/translate";
import { handleActiveButton } from "../../utils/handleActiveButton";

/**
 * The FormCheckbox component displays a stack with buttons with offer types.
 * @returns {JSX.Element} - The rendered FormCheckbox component
 */
const FormCheckbox: React.FC = () : JSX.Element => {
  const [activeButton, setActiveButton] = React.useState("");

  return (
    <Stack direction="row" display="flex" justifyContent="space-between">
        <DefaultButton
          sx={(theme) => ({ bgcolor: activeButton === "sale_message" ? "secondary.main" : "", color: "#FFFFFF"})}
          label={i18n.t('sale') || 'sale'}
          handleClick={() => { handleActiveButton("sale_message", setActiveButton); }}
        />
        <DefaultButton
        sx={(theme) => ({ bgcolor: activeButton === "exchange_message" ? "secondary.main" : "", color: "#FFFFFF"})}
        label={i18n.t("exchange") || "exchange"}
        handleClick={() => { handleActiveButton("exchange_message", setActiveButton); }}
        />
        <DefaultButton
        sx={(theme) => ({ bgcolor: activeButton === "for_free_message" ? "secondary.main" : "", color: "#FFFFFF"})}
          label={i18n.t('for free') || 'for free'}  
          handleClick={() => { handleActiveButton("for_free_message", setActiveButton); }}
        />
    </Stack>
  );
}

export {FormCheckbox};