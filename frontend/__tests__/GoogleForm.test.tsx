import GoogleForm from '@/components/form/GoogleForm';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AppRouterContextProviderMock } from '../__mocks__/appRouterContextProviderMock';

import '@testing-library/jest-dom';

const renderGoogleForm = ({ isProd = false }: { isProd?: boolean } = {}) => {
  render(
    <AppRouterContextProviderMock>
      <GoogleForm isProd={isProd} />
    </AppRouterContextProviderMock>,
  );
};

describe('Google Form', () => {
  it('should have required fields and submit button', () => {
    renderGoogleForm();

    const roomNumberLabel = screen.getByTestId('room-number-label');
    const roomNumberField = screen.getByTestId('room-number-field');
    const nameLabel = screen.getByTestId('name-label');
    const nameField = screen.getByTestId('name-field');
    const dateLabel = screen.getByTestId('date-label');
    const dateField = screen.getByTestId('date-field');
    const submitButton = screen.getByRole('button');

    expect(roomNumberLabel).toBeInTheDocument();
    expect(roomNumberField).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();
    expect(dateLabel).toBeInTheDocument();
    expect(dateField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should selects the correct form based on the environment', () => {
    // Production form
    renderGoogleForm({ isProd: true });
    const prodForm = screen.getByTestId('prod-form');
    expect(prodForm).toBeInTheDocument();

    // Development test form
    renderGoogleForm();
    const testForm = screen.getByTestId('test-form');
    expect(testForm).toBeInTheDocument();
  });

  it('should enter form successfully', async () => {
    renderGoogleForm();

    const successModal = screen.getByTestId('success-modal');
    expect(successModal).not.toBeVisible();

    const roomNumberField = screen.getByTestId('room-number-field');
    const nameField = screen.getByTestId('name-field');
    const dateField = screen.getByTestId('date-field');
    const submitButton = screen.getByRole('button');

    await act(async () => {
      fireEvent.change(roomNumberField, { target: { value: '123' } });
      fireEvent.change(nameField, { target: { value: 'John Doe' } });
      fireEvent.change(dateField, { target: { value: '2023-08-23' } });
      fireEvent.click(submitButton);
    });

    expect(roomNumberField).toHaveValue('123');
    expect(nameField).toHaveValue('John Doe');
    expect(dateField).toHaveValue('2023-08-23');
  });
});
