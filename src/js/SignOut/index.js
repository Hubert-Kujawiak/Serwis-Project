import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut} className="logOutButton">
        Wyloguj
    </button>
);

export default withFirebase(SignOutButton);