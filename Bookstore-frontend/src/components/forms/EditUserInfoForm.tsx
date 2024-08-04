import * as React from "react";
import {Box} from "@mui/material";
import {DefaultButton, FormWrapper} from "../";
import navButtonHandler from "../../utils/navButtonHandler";
import i18n from "../../assets/locales/translate";
import {FormInput} from "../";
import {FormPanel} from "../boxes/FormPanel";
import {useState} from "react";

interface EditUserInfoFormProps {
    isOpen: boolean;
    onClose: () => void;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNr: string;
}

export default function EditUserInfoForm({
                                             isOpen,
                                             onClose,
                                             firstName,
                                             lastName,
                                             emailAddress,
                                             phoneNr
                                         }: EditUserInfoFormProps) {
    const [name, setName] = useState(firstName);
    const [surname, setSurname] = useState(lastName);
    const [email, setEmail] = useState(emailAddress);
    const [phone, setPhone] = useState(phoneNr);
    const [isNameError, setIsNameError] = useState(false);
    const [isSurnameError, setIsSurnameError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);
    const [nameErrorText, setNameErrorText] = useState("");
    const [surnameErrorText, setSurnameErrorText] = useState("");
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

    const handleSurnameChange = (value: string) => {
        const isValid = value.match("^[A-Za-z]{3,}$");
        setSurname(value);
        setIsSurnameError(!isValid);
        setSurnameErrorText(setErrorMessage(value, 3));
    }

    const handleEmailChange = (value: string) => {
        const isValid = value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
        setEmail(value);
        setIsEmailError(!isValid);
        setEmailErrorText(`${i18n.t("invalid format" || "invalid format")}`);
    }

    const handlePhoneChange = (value: string) => {
        const isValid = value.match("^[\\+]?[0-9]{0,2}[0-9]{9}$");
        setPhone(value);
        setIsPhoneError(!isValid);
        setPhoneErrorText(setErrorMessage(value, 9));
    }

    return (
        <FormWrapper isOpen={isOpen} onClose={onClose}>
            <FormPanel title={i18n.t('edit profile') || 'change your information'}
                       sx={{width: 400, mx: "auto", mt: 4}}>
                <FormInput
                    label={i18n.t('user name') || 'user name'}
                    value={name}
                    onChange={handleNameChange}
                    sx={{width: "80%"}}
                    error={isNameError}
                    helperText={isNameError ? nameErrorText : ""}
                />
                <FormInput
                    label={i18n.t('user surname') || 'user surname'}
                    value={surname}
                    onChange={handleSurnameChange}
                    sx={{width: "80%"}}
                    error={isSurnameError}
                    helperText={isSurnameError ? surnameErrorText : ""}
                />
                <FormInput
                    label={i18n.t('user email') || 'user email'}
                    value={email}
                    onChange={handleEmailChange}
                    sx={{width: "80%"}}
                    error={isEmailError}
                    helperText={isEmailError ? emailErrorText : ""}
                />
                <FormInput
                    label={i18n.t('user phone') || 'user phone'}
                    value={phone}
                    onChange={handlePhoneChange}
                    sx={{width: "80%"}}
                    error={isPhoneError}
                    helperText={isPhoneError ? phoneErrorText : ""}
                />
                <Box display="flex" marginTop={2}>
                    <DefaultButton
                        sx={(theme) => ({color: "error", mr: 3})}
                        label={i18n.t('cancel') || 'cancel'}
                        handleClick={onClose}
                    />
                    <DefaultButton
                        sx={(theme) => ({color: "primary"})}
                        label={i18n.t('save') || 'save'}
                        handleClick={() => navButtonHandler("save")}
                    />
                </Box>
            </FormPanel>
        </FormWrapper>
    );
}
