import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const config = {
    apiKey: "AIzaSyCCx06rq5qiZEpUIJElLfaeiPwTx6RR1dE",
    authDomain: "zaplanujprzeglad-abb92.firebaseapp.com",
    databaseURL: "https://zaplanujprzeglad-abb92.firebaseio.com",
    projectId: "zaplanujprzeglad-abb92",
    storageBucket: "zaplanujprzeglad-abb92.appspot.com",
    messagingSenderId: "49655074857",
    appId: "1:49655074857:web:c2044694a04bba58568c38",
    measurementId: "G-6MK3N6P7C2"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    getCurrentUser = () => this.auth.currentUser?.email
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    doSignOut = () => this.auth.signOut();
}

export default Firebase;