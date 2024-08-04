import { LanguageButtons } from '../LanguageButtons';
import { fireEvent, render, screen } from '@testing-library/react';
import { HeaderButton } from '../HeaderButton';
import i18n from '../../../assets/locales/translate';
import { DefaultButton } from '../DefaultButton';

const handleButtonClick = jest.fn();

describe('Buttons', () => {
    it('<DefaultButton/>', () => {
        render(<DefaultButton label={'Test'} handleClick={handleButtonClick}/>);
        const buttonBody=screen.getByRole("button", {name: "Test"});
        fireEvent.click(buttonBody);
        expect(handleButtonClick).toHaveBeenCalled();
    });
    it('<LanguageButton/>', () => {
        render(<LanguageButtons/>);
        expect(screen.getByRole("button", {name: "English"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Polski"})).toBeInTheDocument();
    });
    it('<HeaderButton/> 1', () => {
        render(<HeaderButton
            label={i18n.t("databse and ratings")}
            href="/database-and-ratings"
          />);
        const linkToDatabase = screen.getByRole("link", {name: "Baza danych i oceny"});
        expect(linkToDatabase).toHaveAttribute("href", "/database-and-ratings");
    });
    it('<HeaderButton/> 2', () => {
        render(<HeaderButton label={i18n.t("moderator board")} href="/moderator" />);
        const linkToDatabase = screen.getByRole("link", {name: "Tablica moderatora"});
        expect(linkToDatabase).toHaveAttribute("href", "/moderator");
    });
});
