import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer.test.js', () => {

    test('debe de realizar el login', () => {
        
        const initState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Sebastián'
            }
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual({
            uid: 'abc',
            name: 'Sebastián'
        })

    })

    test('debe de realizar el logout', () => {
        
        const initState = {
            uid: 'abc',
            name: 'Sebastián' 
        };

        const action = {
            type: types.logout
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual({});

    })

    test('No debe hacer cambios en el state', () => {
        
        const initState = {
            uid: 'abc',
            name: 'Sebastián' 
        };

        const action = {
            type: 'LoQueSea'
        }

        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );

    })

});