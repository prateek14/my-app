import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { AlertComponent } from './Alert';
import { mount } from 'enzyme';
import { AlertBlocContext, AlertBloc } from '../blocs/alertBloc';
const alertBloc = new AlertBloc();

describe('Alert component', () => {
    let container: Element | null = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
        alertBloc.dispatch({ type: 'success', message: 'Success!' });
    });

    afterEach(() => {
        // cleanup on exiting
        if (container) {
            unmountComponentAtNode(container);
            container.remove();
            container = null;
        }
    });

    it('renders with message', () => {
        if (container) {
            const wrapper = mount(
                <AlertBlocContext.Provider value={alertBloc}>
                    <AlertComponent />
                </AlertBlocContext.Provider>,
            );

            expect(wrapper.find(AlertComponent).text());
        }
    });
});
