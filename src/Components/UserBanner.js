import React from 'react';
import { Message, Button } from 'rbx';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Welcome = ({ user }) => (
    <Message color="info">
        <Message.Header>
            Welcome, {user.displayName}
            <Button primary onClick={() => firebase.auth().signOut()}>
                Log out
            </Button>
        </Message.Header>
    </Message>
);

const SignIn = () => (
    <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}/>
);

const UserBanner = ({ user }) => {
    return (
        <React.Fragment>
            { user ? <Welcome user={ user } /> : <SignIn /> }
        </React.Fragment>
    )
}

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};

export default UserBanner;