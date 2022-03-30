/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Pruebas en auth.test.js', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test('login y logout deben de crear la acción respectiva', () => {

        const uid = 'TESTING';
        const displayName = 'Sebastián';

        const action = login( uid, displayName );

        expect( action ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        })

        const actionLogout = logout();

        expect( actionLogout ).toEqual({
            type: types.logout
        })

    });

    test('debe de realizar el startLogout', async() => {

        await store.dispatch( startLogout() );

        const actions = store.getActions();
        // console.log( actions );

        expect( actions[0] ).toEqual({
            type: types.logout
        })

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        })
    });
    
    test('debe de iniciar el startLoginEmailPassword', async() => {

        await store.dispatch( startLoginEmailPassword( 'test@testing.com', '123456' ) );

        const actions = store.getActions();
        // console.log( actions );

        expect( actions[0] ).toEqual({
            type: types.uiStartLoading,
        });

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'CYCg1uwMOJQX1l14vEG0FieRcqy1',
                displayName: null
            }
        });

        expect( actions[2] ).toEqual({
            type: types.uiFinishLoading,
        });

    });

});