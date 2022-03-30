/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fs from 'fs';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING',
    },
    notes: {
        active: {
            id: 'Cn3jFVf5ouAEc3kj7KaS',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);


describe('Pruebas en notes.test.js', () => {

    beforeEach(() => {
        store = mockStore(initState);
    })

    test('debe de crear una nueva nota startNewNote', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            }
        });

        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    })

    test('debe de cargar las notas startLoadingNotes', async () => {
        await store.dispatch(startLoadingNotes('TESTING'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);

    })

    test('debe de actualizar la nota startSaveNote', async () => {

        const note = {
            id: 'Cn3jFVf5ouAEc3kj7KaS',
            title: 'titulo',
            body: 'body',
        }

        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesUpdated,
            payload: {
                id: expect.any(String),
                note: expect.any(Object)
            }
        });

        const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

        expect(docRef.data().title).toBe(note.title);

    });

    test('debe de actualizar el url del entry startUploading', async () => {

        fileUpload.mockReturnValue('https://hola-mundo.com/cosa.jpg');
        fs.writeFileSync('foto.jpg', '');
        const file = fs.readFileSync('foto.jpg');

        await store.dispatch(startUploading(file));

        const docRef = await db.doc(`/TESTING/journal/notes/${initState.notes.active.id}`).get();
        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');

    })


})