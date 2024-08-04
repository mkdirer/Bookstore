import {BlankPanel, BlankTile, OpenFormButton, TableBooksSearch, LogInForm} from "../components";
import {NewBookRequestForm} from "../components/forms/NewBookRequestForm";
import {useState} from "react";

const DatabaseAndRatings = () => {
    return (
        <BlankTile>
            <BlankPanel>
                <TableBooksSearch/>
            </BlankPanel>
            <OpenFormButton>
                <NewBookRequestForm />
            </OpenFormButton>
        </BlankTile>
    );
};

export default DatabaseAndRatings;
