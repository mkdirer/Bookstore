import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Recommendation } from '../Recommendation';
import { UserInfoPanel } from '../UserInfoPanel';
import { UserNotificationsPanel } from '../UserNotificationsPanel';
import { UserProfilePhoto } from '../UserProfilePhoto';
import { UserRatingsPanel } from '../UserRatingPanel';
import { WelcomePanel } from '../WelcomePanel';

describe('Layout', () => {
    it('<Footer />', () => {
        render(<Footer />);
        expect(screen.getByRole("button", {name: "English"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Polski"})).toBeInTheDocument();

    });
    it('<Header />', () => {
        render(<Header />);
        expect(screen.getByText("Exchange/sale offers")).toBeInTheDocument();
        expect(screen.getByText("Baza danych i oceny")).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
    it('<Recomendation />', () => {
        localStorage.setItem("sessionData", '{"login":"user"}');
        render(<Recommendation />);
        expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent("Hey, user");
        expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(2);
        expect(screen.getByRole("img")).toBeInTheDocument();
        localStorage.clear();
    });
    it('<UserInfoPanel />', () => {
        render(<UserInfoPanel name={'user'} surname={'kowalski'} email={'kowalski@gmail.com'} phoneNr={'696969696'} />);
        expect(screen.getByText("Name:")).toBeInTheDocument();
        expect(screen.getByText("Surname:")).toBeInTheDocument();
        expect(screen.getByText("E-mail:")).toBeInTheDocument();
        expect(screen.getByText("Phone number:")).toBeInTheDocument();
        expect(screen.getByText("Name:")).toBeInTheDocument();
        expect(screen.getByText("user")).toBeInTheDocument();
        expect(screen.getByText("kowalski")).toBeInTheDocument();
        expect(screen.getByText("kowalski@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("696969696")).toBeInTheDocument();
    });
    it('<UserNotificationsPanel />', () => {
        render(<UserNotificationsPanel />);
        expect(screen.getByText("viewAll")).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Biochemia"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Biologia molekularna"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Fizyka"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Bazy danych"})).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent("notifications");
    });
    it('<UserProfilePhoto />', () => {
        render(<UserProfilePhoto name={'user'} surname={'kowalski'} photo={'photo'} />);
        expect(screen.getByText(/user kowalski/i)).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
    it('<UserRatingsPanel />', () => {
        render(<UserRatingsPanel />);
        expect(screen.getByRole("link", {name: "The Manga Guide. Biochemia"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Biologia molekularna"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Fizyka"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "The Manga Guide. Bazy danych"})).toBeInTheDocument();
        expect(screen.getAllByText("Your rating:")).toHaveLength(4);
    });
    it('<UserRatingsPanel />', () => {
        render(<WelcomePanel />);
        expect(screen.getByRole("button", {name: "Log in"})).toBeInTheDocument();
        expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(2);
        expect(screen.getByText("New user?")).toBeInTheDocument();
        expect(screen.getByText("Create an account")).toBeInTheDocument();
        expect(screen.getByText("Discuss")).toBeInTheDocument();
        expect(screen.getByText("Discuss about books with other users and contribute to our great community")).toBeInTheDocument();
        expect(screen.getByText("Rate")).toBeInTheDocument();
        expect(screen.getByText("Rate the books you read and share your opinion with others")).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Share your passion for books with others");
    });
});