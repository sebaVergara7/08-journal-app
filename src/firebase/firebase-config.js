import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

// const firebaseConfigTesting = {
//     apiKey: "AIzaSyADgGVoMH-ztpi42gPFn5yk0O6GFORzBo4",
//     authDomain: "react-app-cursos-qa-214c2.firebaseapp.com",
//     projectId: "react-app-cursos-qa-214c2",
//     storageBucket: "react-app-cursos-qa-214c2.appspot.com",
//     messagingSenderId: "644223546724",
//     appId: "1:644223546724:web:8554a6fada0f92923a3671"
// };

// if (process.env.NODE_ENV === 'test') {
//     firebase.initializeApp(firebaseConfigTesting);
// } else {
//     firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}