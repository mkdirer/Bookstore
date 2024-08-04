import { fireEvent, render, screen } from '@testing-library/react';
import { MainSearchBar } from '../MainSearchBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import CommentBooksSearch from '../CommentBooksSearch';
import { TableBooksSearch } from '../TableBooksSearch';
import OffersSearchBar from '../OffersSearchBar';
import { TableNotifications } from '../TableNotifications';

const handleCheckClick = jest.fn();

describe('Inputs', () => {
    it('<EditOfferForm />', () => {
        render(<CommentBooksSearch/>);
        expect(screen.getAllByRole('option')).toHaveLength(4);
        expect(screen.getByText("Absolutely loved it! Must-read for everyone.")).toBeInTheDocument();
        expect(screen.getByText("2023-05-08")).toBeInTheDocument();
        expect(screen.getByText("Wants more?")).toBeInTheDocument();
        expect(screen.getByText("1-3 of 5")).toBeInTheDocument();
    });
    it('<TableBooksSearch />', () => {
        render(
            <BrowserRouter>
                     <Routes>
                        <Route path="/" element={<TableBooksSearch/>}></Route>
                     </Routes>
                 </BrowserRouter>
            );
        expect(screen.getByRole("button", {name:"Reviewed by user"}));
        expect(screen.getByRole("button", {name:"Reset Filters"}));
        expect(screen.getByText("Drop to group by")).toBeInTheDocument();
        expect(screen.getByText("Rows per page")).toBeInTheDocument();
        expect(screen.getByText("1-7 of 7")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByText("Jane Austen")).toBeInTheDocument();
        expect(screen.getAllByRole("img", {name: "cover"})).toHaveLength(7);
    });
    it('<TableBooksSearch />', () => {
        render(
            <OffersSearchBar onCheckboxChange={handleCheckClick}/>
            );
        const exchangeInput = screen.getByRole('radio', { name: 'EXCHANGE' });
        userEvent.click(exchangeInput);
        expect(exchangeInput).toBeChecked();
        const saleInput = screen.getByRole('radio', { name: 'SALE' });
        userEvent.click(saleInput);
        expect(saleInput).toBeChecked();
        const freeInput = screen.getByRole('radio', { name: 'FOR FREE' });
        userEvent.click(freeInput);
        expect(freeInput).toBeChecked();
        const textInput = screen.getByRole('textbox', { name: 'SEARCH' });
        userEvent.type(textInput, 'Example text');
        expect(textInput).toHaveAttribute("value", "Example text");
    });
    it('<TableNotifications />', () => {
        render(<TableNotifications />);
        expect(screen.getByText("Book Name")).toBeInTheDocument();
        expect(screen.getByText("Search by user or book name")).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Biochemia"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Biologia molekularna"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Fizyka"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Bazy danych"})).toBeInTheDocument();
    });
    it('<MainSearchBar />', () => {
        render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainSearchBar />}></Route>
            </Routes>
        </BrowserRouter>
        );
        const inputBox=screen.getByRole("textbox", {name: "Search"});
        userEvent.type(inputBox, 'Example text');
        const submitButton = screen.getByRole("button");
        fireEvent.click(submitButton);
        expect(screen.queryByRole("textbox", {name: "Search"})).not.toBeInTheDocument();
    });
});
