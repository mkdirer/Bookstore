import { render, screen } from '@testing-library/react';
import { RequestCard } from '../RequestCard';
import { RequestList } from '../RequestList';

describe('Request', () => {
    it('<RequestCard />', () => {
        render(<RequestCard title={'random phrase'} user_id={'12'} add_date={'12-12-2023'} message={'happy message'} />);
        const titleBox=screen.getByRole('heading', { level: 5 });
        expect(titleBox).toHaveTextContent("random phrase");
        expect(screen.getByText(/requested by 12, on day 12-12-2023/i)).toBeInTheDocument();
        expect(screen.getByLabelText("show more")).toBeInTheDocument();
    });
    it('<RequestList />', () => {
        render(<RequestList />);
        expect(screen.getAllByRole('heading', { level: 5 })).toHaveLength(5);
        expect(screen.getByText(/requested by user131415, on day 2023-05-16/i)).toBeInTheDocument();
        expect(screen.getByText("Request 5")).toBeInTheDocument();
    });
});