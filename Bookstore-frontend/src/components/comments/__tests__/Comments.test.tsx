import { fireEvent, render, screen } from '@testing-library/react';
import { CommentInput } from '../CommentInput';
import userEvent from '@testing-library/user-event';
import { CommentsSection } from '../CommentsSection';
import { UserComment } from '../UserComment';
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe('Comments', () => {
    it('<CommentsInput />', () => {
        render(<CommentInput />);
        const addButton=screen.getByRole("button", {name: "Add"});
        const textBox = screen.getByRole("textbox", {name: ""});
        userEvent.type(textBox, 'Example text');
        fireEvent.click(addButton);
        expect(textBox).toBeEmptyDOMElement();
    });
    it('<CommentSection />', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CommentsSection />}></Route>
                </Routes>
            </BrowserRouter>
        );
        const showMoreButton=screen.getByRole("button", {name: "Show more"});
        expect(screen.getByText("Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: "User10"})).not.toBeInTheDocument();
        expect(screen.getByText("2022-03-01")).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
        fireEvent.click(showMoreButton);
        expect(screen.getByRole("button", {name: "User10"})).toBeInTheDocument();
    });
    it('<UserComment />', () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UserComment avatarUrl={'/myavatar/url'} username={'user'} content={'cont'} dataOfPublish={'20-12-2023'} />}></Route>
                </Routes>
            </BrowserRouter>
        );
        const userButton=screen.getByRole("button", {name: "user"});
        expect(screen.getByText("20-12-2023")).toBeInTheDocument();
        expect(screen.getByText("cont")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "/myavatar/url");
        fireEvent.click(userButton);
        expect(screen.queryByText("cont")).not.toBeInTheDocument();
    });
});
