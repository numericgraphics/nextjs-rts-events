import React from 'react';
import { render } from '@testing-library/react';
import TestComponent from '../components/testComponent';

test('Component is in Dom', () => {
    const {baseElement}  = render(<TestComponent />)
    expect(baseElement).toBeInTheDocument()
})

test('Component is in Dom', () => {
    const {getByText}  = render(<TestComponent />)
    const linkElement = getByText(
        /RTS Events/
    )
    expect(linkElement).toBeInTheDocument()
})
