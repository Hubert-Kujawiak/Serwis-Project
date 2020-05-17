import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const config = {
    apiKey: "AIzaSyCvheFYNbhlQoz-sn2nyCkRDpOdZRR2Oeo",
    authDomain: "serviceapp-7ab97.firebaseapp.com",
    databaseURL: "https://serviceapp-7ab97.firebaseio.com",
    projectId: "serviceapp-7ab97",
    storageBucket: "serviceapp-7ab97.appspot.com",
    messagingSenderId: "979294650200",
    appId: "1:979294650200:web:6f7fb6b65c5fcbc8992f2d",
    measurementId: "G-B9ZGD31FKC"
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        // this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

}

export default Firebase;