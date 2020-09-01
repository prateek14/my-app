import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    const { getByText } = render(<App message="test" />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
