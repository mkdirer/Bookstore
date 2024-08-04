import { BlankPanel, RegisterForm } from "../";
import { Link, Stack, Typography } from "@mui/material";
import i18n from "../../assets/locales/translate";
import { FormInput } from "./FormInput";
import { DefaultButton, FormWrapper, FormPassword } from "../";
import { handleLogIn } from "../../utils/session";
import React, { useState } from "react";
import {ErrorModal} from "../info/ErrorModal";

/**
 * The LogInForm component displays a form where user can enter login data and login.
 * @returns {JSX.Element} - The rendered component.
 */
const LogInForm: React.FC = (): JSX.Element => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleErrorClose = () => setError(false);

  return (
    <BlankPanel
      sx={{ width: 380, color: "black", textAlign: "left", borderRadius: 3 }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: "bold", ml: 2 }}>
        {i18n.t("login title") || "login title"}
      </Typography>
      <Stack direction="row">
        <Typography sx={{ fontSize: 16, mt: 1.5 }}>
          {i18n.t("new user") || "new user"}
        </Typography>

        <Link
          sx={{ fontSize: 16, mt: 1.5, ml: 1, cursor: "pointer" }}
          onClick={handleOpen}
        >
          {i18n.t("new account") || "new account"}
        </Link>
        <FormWrapper isOpen={open} onClose={handleClose}>
          <RegisterForm closeFunction={setOpen} setError={setError}/>
        </FormWrapper>
        <ErrorModal isOpen={error} onClose={handleErrorClose} errorMessage={i18n.t("sign up error") || "sign up error"}/>
      </Stack>

      <FormInput
        label={i18n.t("user login") || "login"}
        value={login}
        onChange={(value: string) => setLogin(value)}
      />
      <FormPassword
        label={i18n.t("password") || "password"}
        value={password}
        // type="password"
        onChange={(value: string) => setPassword(value)}
      />
      <DefaultButton
        label={i18n.t("login title") || "login title"}
        handleClick={() => handleLogIn(login, password, setError)}
        sx={{ width: 130, ml: "35%" }}
      />
      <ErrorModal isOpen={error} onClose={handleErrorClose} errorMessage={i18n.t("log in error") || "log in error"}/>
    </BlankPanel>
  );
};

export { LogInForm };