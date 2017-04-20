import {ref, firebaseAuth} from '../config/constants'

export function auth(email, pw) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(saveUser)
}

export function logout() {
    return firebaseAuth().signOut()
}

export function login(email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser(user) {
    return ref.child(`users/${user.uid}/info`)
        .set({
            email: user.email,
            uid: user.uid
        })
        .then(() => user)
}

export function writeUserData(userId, firstName, lastName) {
    let updates = {};
    updates['/users/' + userId + '/firstName'] = 'updatedFN';

    return ref.update(updates);
}

export function getUser() {
    firebaseAuth().onAuthStateChanged(function (user) {
        if (user) {
            console.info(user);
            // writeUserData(user.uid, "test", "name")
        } else {
            console.info("User not found.");
        }
    });
}
