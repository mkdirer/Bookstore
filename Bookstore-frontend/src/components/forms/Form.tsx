import * as React from "react";
import { Box } from "@mui/material";
import {DefaultButton} from "../";
import navButtonHandler from "../../utils/navButtonHandler";
import i18n from "../../assets/locales/translate";
import {FormInput} from "./FormInput";

/**
 * @typedef {object} FormProps
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} phone - User's phone number
 * @property {function} onChangeFirstName - A callback function that will be called when first name is changed
 * @property {function} onChangeLastName - A callback function that will be called when last name is changed
 * @property {function} onChangeEmail - A callback function that will be called when email is changed
 * @property {function} onChangePhone - A callback function that will be called when phone number is changed
 * @property {function} onSave - A callback function that will be called when save button is clicked
 * @property {function} onCancel - A callback function that will be called when cancel button is clicked
 */
interface FormProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    onChangeFirstName: (value: string) => void;
    onChangeLastName: (value: string) => void;
    onChangeEmail: (value: string) => void;
    onChangePhone: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
  }
  
  /**
   * The Form component displays a form where user data can be edited.
   * @param {FormProps} props - The props for the component
   * @returns {JSX.Element} - The rendered Form component
   */
  const Form: React.FC<FormProps> = ({
    firstName,
    lastName,
    email,
    phone,
    onChangeFirstName,
    onChangeLastName,
    onChangeEmail,
    onChangePhone,
    onSave,
    onCancel,
  }: FormProps): JSX.Element => {
    return (
      <Box maxWidth={400} marginX="auto" marginTop={4}>
        <FormInput
          label="FirstName"
          value={firstName}
          onChange={onChangeFirstName}
        />
        <FormInput
          label="LastName"
          value={lastName}
          onChange={onChangeLastName}
        />
        <FormInput label="Email" value={email} onChange={onChangeEmail} />
        <FormInput
          label="Phone"
          value={phone}
          onChange={onChangePhone}
        />
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Box sx={{ mr: 2, mt: 1 }}>
            <DefaultButton
              sx={(theme) => ({ color: "error" })}
              label={i18n.t('cancel') || 'cancel'}
              handleClick={() => navButtonHandler("cancel")}
            />
            <DefaultButton
              sx={(theme) => ({ color: "primary" })}
              label={i18n.t('save') || 'save'}
              handleClick={() => navButtonHandler("save")}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  
  export type {FormProps};
  export {Form};