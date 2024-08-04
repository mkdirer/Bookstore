import { render, screen } from '@testing-library/react';
import { FormWrapper } from '../FormWrapper';
import { Box } from '@mui/material';
import { OpenFormButton } from '../OpenFormButton';

const handleWrapperClose = jest.fn();

describe('Modal', () => {
    it('<FormWrapper />', () => {
        render(<FormWrapper isOpen={true} onClose={handleWrapperClose} ><Box/></FormWrapper>);
        expect(screen.getByTestId('sentinelStart'));
        expect(screen.getByTestId('sentinelEnd'));

    });
    it('<OpenFormButton />', () => {
        render(<OpenFormButton ><Box/></OpenFormButton>);
        expect(screen.getByTestId('AddIcon'));
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});