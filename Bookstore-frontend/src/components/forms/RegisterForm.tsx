import React, {Dispatch, SetStateAction, useState} from "react";
import i18n from "../../assets/locales/translate";
import { BlankPanel, FormInput, DefaultButton, FormPassword } from "../";
import { handleSignUp } from "../../utils/session";
import { Stack, Typography } from "@mui/material";

/**
 * The props for the RegisterForm component.
 * @typedef {object} PropsRegisterForm
 * @property {React.Dispatch<React.SetStateAction<boolean>>} label - The label to be displayed on the button.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setError - Function setting state of log in error (true/false).
 */
interface PropsRegisterForm {
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (flag: boolean) => void;
}

/**
 * RegisterForm displays a form where user can enter data to create account.
 * @returns {JSX.Element} - The rendered component.
 */
const RegisterForm: React.FC<PropsRegisterForm > = ({
  closeFunction, setError
}: PropsRegisterForm): JSX.Element => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isLastnameError, setIsLastnameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState("");
  const [lastnameErrorText, setLastnameErrorText] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");

  const setErrorMessage = (value: string, charNum: number) =>
      value.length < charNum ?
          i18n.t("short value" || "value to short") :
          i18n.t("invalid format" || "invalid format");

  const handleNameChange = (value: string) => {
    const isValid = value.match("^[A-Za-z]{3,}$");
    setName(value);
    setIsNameError(!isValid);
    setNameErrorText(setErrorMessage(value, 3));
  }

  const handleLastnameChange = (value: string) => {
    const isValid = value.match("^[A-Za-z]{3,}$");
    setLastname(value);
    setIsLastnameError(!isValid);
    setLastnameErrorText(setErrorMessage(value, 3));
  }

  const handleEmailChange = (value: string) => {
    const isValid = value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
    setEmail(value);
    setIsEmailError(!isValid);
    setEmailErrorText(`${i18n.t("invalid format" || "invalid format")}`);
  }

  const handlePhoneChange = (value: string) => {
    const isValid = value.match("^[\\+]?[0-9]{0,2}[0-9]{9}$");
    setTelephone(value);
    setIsPhoneError(!isValid);
    setPhoneErrorText(setErrorMessage(value, 9));
  }

  return (
    <BlankPanel
      sx={{
        width: "460px",
        color: "black",
        textAlign: "left",
        borderRadius: 3,
      }}
    >
      <Typography sx={{ fontSize: 22, fontWeight: "bold", ml: 2 }}>
        {i18n.t("sign up title") || "sign up title"}
      </Typography>

      <Stack direction="row" gap={2}>
        <FormInput
          label={i18n.t("user name") || "user name"}
          value={name}
          onChange={handleNameChange}
          error={isNameError}
          helperText={isNameError ? nameErrorText : ""}
        />
        <FormInput
          label={i18n.t("user surname") || "user surname"}
          value={lastname}
          onChange={handleLastnameChange}
          error={isLastnameError}
          helperText={isLastnameError ? lastnameErrorText : ""}
        />
        <FormInput
          label={i18n.t("user login") || "user login"}
          value={login}
          onChange={(value: string) => setLogin(value)}
        />
      </Stack>

      <Stack direction="row" gap={4} width="100%">
        <FormInput
          label={i18n.t("user email") || "user email"}
          value={email}
          onChange={handleEmailChange}
          error={isEmailError}
          helperText={isEmailError ? emailErrorText : ""}
        />
        <FormInput
          label={i18n.t("user phone") || "user phone"}
          value={telephone}
          onChange={handlePhoneChange}
          error={isPhoneError}
          helperText={isPhoneError ? phoneErrorText : ""}
        />
      </Stack>

      <Stack direction="row" gap={4} width="100%">
        <FormPassword
          label={i18n.t("password") || "password"}
          value={password}
          onChange={(value: string) => setPassword(value)}
        />
        <FormPassword
          // sx={{ flex: 1 }}
          label={i18n.t("retype password") || " retype password"}
          value={repassword}
          onChange={(value: string) => setRePassword(value)}
        />
      </Stack>

      <DefaultButton
        label={i18n.t("sign up") || "sign up"}
        handleClick={() => {
          handleSignUp(
            name,
            lastname,
            login,
            email,
            telephone,
            password,
            repassword,
            setError
          );
          closeFunction(false);
        }}
        sx={{ width: "37%", left: "33%"}}
      />
    </BlankPanel>
  );
};

export { RegisterForm };
