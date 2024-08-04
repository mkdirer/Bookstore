import { render, screen } from '@testing-library/react';
import { UserCard } from '../UserCard';

describe('UserCard', () => {
    it('<UserCard />', () => {
        render(<UserCard NotificationsActive={true}  />);
        expect(screen.getByRole("link",{name: "Your ratings"})).toBeInTheDocument();
        expect(screen.getAllByRole("link",{name: ""})).toHaveLength(3);
    });
});
