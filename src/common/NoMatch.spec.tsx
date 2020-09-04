import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import NoMatch from './NoMatch';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
        pathname: '/another-route',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
}));

describe('NoMatch component', () => {
    let container: Element | null = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        }
    });

    it('renders with route name', () => {
        if (container) {
            act(() => {
                ReactDOM.render(<NoMatch />, container);
            });
            expect(container.textContent).toBe('No match for /another-route');
        }
    });
});
