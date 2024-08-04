import {BlankPanel} from "../boxes/BlankPanel";
import {Box, Stack, Typography} from "@mui/material";
import {DefaultButton} from "../buttons/DefaultButton";
import i18n from "i18next";
import {FormInput }from "./FormInput";
import {useState} from "react";
import {SearchBar} from "../inputs/SearchBar";
import {FormCheckbox }from "./FormCheckbox";
import * as React from "react";
import {cancelHandler, saveHandler} from "../../utils/offerFormButtonsHandler";

export default function OfferForm() {
    const [activeButton, setActiveButton] = React.useState("sale_message");
    const [comment, setComment] = useState("");

    return (
        <BlankPanel sx={{width: 380, height: 500, color: "black", textAlign: "left", p: 3}}>
            <Stack sx={{height: "90%"}}>
                <FormCheckbox />
                <Box sx={{
                    p: 1,
                    width: "95%",
                    border: '2px solid ',
                    borderColor: 'primary.main',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    my: 3
                }}>
                    <SearchBar sx={{width: "100%"}}/>
                </Box>
                {activeButton === "sale_message" &&
                    <FormInput
                        label={i18n.t('price') || 'price'}
                        value=""
                        onChange={() => {
                        }}/>
                }
                {activeButton === "exchange_message" &&
                    <>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {i18n.t('bookExchange') || 'book to exchange'}
                        </Typography>
                        <Box sx={{
                            p: 1,
                            width: "95%",
                            border: '2px solid ',
                            borderColor: 'primary.main',
                            backgroundColor: 'lightgray',
                            borderRadius: 2
                        }}>
                            <SearchBar sx={{width: "100%"}}/>
                        </Box>
                    </>
                }
                <FormInput
                    label={i18n.t('comment') || 'comment'}
                    value=""
                    onChange={() => setComment("")}/>
            </Stack>
            <Stack direction="row" display="flex" justifyContent="right">
                <DefaultButton
                    label={i18n.t('cancel') || 'cancel button'}
                    handleClick={() => cancelHandler("cancel")}
                    sx={{px: 2, mr: 4}}
                />
                <DefaultButton
                    label={i18n.t('save') || 'save button'}
                    handleClick={() => saveHandler("save")}
                    sx={{px: 2}}
                />
            </Stack>
        </BlankPanel>
    );
}