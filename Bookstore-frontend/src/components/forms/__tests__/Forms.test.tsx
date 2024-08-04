import { fireEvent, render, screen } from '@testing-library/react';
import { EditOfferForm } from '../EditOfferForm';
import { NewBookRequestForm } from '../NewBookRequestForm';
import { LogInForm } from '../LogInForm';
import { FormPassword } from '../FormPassword';
import { RegisterForm } from '../RegisterForm';

const handleEditClick = jest.fn();
const handlePasswordClick = jest.fn();
const handleRegisterClick = jest.fn();

describe('Forms', () => {
    it('<EditOfferForm />', () => {
        render(<EditOfferForm isOpen={true} onClose={handleEditClick} comment={'random nonsense'} type={'ice cream'} />);
        expect(screen.getByRole("button", {name: "Save"}));
        const cancelButton=screen.getByRole("button", {name: "Cancel"});
        const inputField=screen.getByRole("textbox");
        expect(inputField).toHaveAttribute("value", "random nonsense");
        expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent("Comment:");
        expect(screen.getByText("Offer type:")).toBeInTheDocument();
        expect(screen.getByText("Edit offer")).toBeInTheDocument();
        fireEvent.click(cancelButton);
        expect(handleEditClick).toHaveBeenCalled();
    });
    it('<NewBookRequestForm />', () => {
        render(<NewBookRequestForm />);
        expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(2);
        expect(screen.getByText("Request for adding a new book")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "request"}));
    });
    it('<LoginForm />', () => {
        render(<LogInForm />);
        expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(2);
        expect(screen.getByRole("button", {name: "Log in"}));
        expect(screen.getByRole("button", {name: "toggle password visibility"}));
        expect(screen.getByText("New user?")).toBeInTheDocument();
        expect(screen.getByText("Create an account")).toBeInTheDocument();
    });
    it('<FormPassword />', () => {
        render(<FormPassword label={'random nonsense'} value={'random value'} onChange={handlePasswordClick} />);
        expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent("random nonsense");
        expect(screen.getByRole("button"));
    });

    it('<RegisterForm />', () => {
        render(<RegisterForm closeFunction={handleRegisterClick}  />);
        expect(screen.getAllByRole('heading', { level: 6 })).toHaveLength(7);
        expect(screen.getByText("Sign up now")).toBeInTheDocument();
        const createAccountButton=screen.getByRole("button", {name: "Create Account"});
        expect(screen.getByText("E-mail:")).toBeInTheDocument();
        expect(screen.getByText("Name:")).toBeInTheDocument();
        expect(screen.getByText("Surname:")).toBeInTheDocument();
        fireEvent.click(createAccountButton);
        expect(handleRegisterClick).toHaveBeenCalled();
    });
});
