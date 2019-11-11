import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, 
    signOutFailure, signOutSuccess,
    signUpSuccess, signUpFailure } from './user.actions';


function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        console.log(userSnapshot.data());
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure({error}));
    }
}


function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure({error}));
    }
}


function* signInWithEmail({payload: {email, password}}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        put(signInFailure(error));
    }
}


function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        
        yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    } 
}


function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}


function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}


function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}


function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapShotFromUserAuth(user, additionalData);
}

function* signUp({payload: {email, password, displayName}}) {
    try{
        console.log('reducer start'); 
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);

        yield put(signUpSuccess({user, additionalData: { displayName }}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.signUpSuccess, signInAfterSignUp);
}


export function* userSagas() {
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}