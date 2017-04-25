import {firebaseAuth, ref} from "../config/constants";

export function auth(user) {
    return firebaseAuth().createUserWithEmailAndPassword(user.email, user.pw).then((u) => saveUser(u.uid, user))
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

export function saveUser(id, user) {
    return ref.child(`users/${id}`).set({
        uid: id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }).then(() => user)
}
