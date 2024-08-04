import * as React from "react";
import {useState} from "react";
import {FormPanel} from "../boxes/FormPanel";
import i18n from "../../assets/locales/translate";
import {Box} from "@mui/material";
import {FormInput} from "./FormInput";
import {DefaultButton} from "../buttons/DefaultButton";
import navButtonHandler from "../../utils/navButtonHandler";

/**
 * The NewBookRequestForm component enables user requesting moderator for adding a new book.
 * @returns {JSX.Element} - The rendered NewBookRequestForm component.
 */
const NewBookRequestForm: React.FC = ()
    : JSX.Element => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    return (
        <FormPanel title={i18n.t('add book request') || 'add book request'}
                   sx={{width: 400, mx: "auto", mt: 4}}>
            <FormInput
                sx={{width: "90%"}}
                label={i18n.t('title') || 'title'}
                value={title}
                onChange={(value) => setTitle(value)}/>
            <FormInput
                sx={{width: "90%"}}
                label={i18n.t('request message') || 'message'}
                value={message}
                onChange={(value) => setMessage(value)}/>
            <Box display="flex" marginTop={2}>
                <DefaultButton
                    sx={(theme) => ({color: "primary"})}
                    label={i18n.t('request') || 'request'}
                    handleClick={() => navButtonHandler("request")}
                />
            </Box>
        </FormPanel>
    );
}

export {NewBookRequestForm};