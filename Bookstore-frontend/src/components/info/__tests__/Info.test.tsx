import { render, screen } from '@testing-library/react';
import { LoadingPopup } from '../LoadingPopup';
import { DescriptionAlerts } from '../DescriptionAlerts';
import { WelcomePanelCell } from '../WelcomePanelCell';
import { RatingField } from '../RatingField';

describe('Info', () => {
    it('<LoadingPopup />', () => {
        render(<LoadingPopup  />);
        expect(screen.getByText("LOADING")).toBeInTheDocument();
    });
    it('<DescriptionAlerts />', () => {
        render(<DescriptionAlerts  />);
        expect(screen.getByText("Error")).toBeInTheDocument();
    });
    it('<WelcomePanelCell />', () => {
        render(<WelcomePanelCell title={'exciting title'} iconPath={'/icon/path'} text={'random nonsense'}  />);
        expect(screen.getByText("exciting title")).toBeInTheDocument();
        expect(screen.getByText("random nonsense")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "/icon/path");
    });
    it('<RatingField />', () => {
        render(<RatingField  />);
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByText(/[ratings]/i)).toBeInTheDocument();
    });
});
