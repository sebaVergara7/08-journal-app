import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { Sidebar } from "../../../components/journal/Sidebar";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        name: 'Sebastián',
    },
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        notes: [],
        active: null,
    }
};

let store = mockStore(initState);

store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <Sidebar />
    </Provider>
)

describe('Pruebas en Sidebar.test.js', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })
    

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    })

    test('debe de llamar el Logout', () => {

        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();


    })

    test('debe de llamar el startNewNote', () => {

        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();

    })

});