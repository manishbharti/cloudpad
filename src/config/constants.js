import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCouCJjNnp8o14EMlAsB-oofZy0rVg42gU",
    authDomain: "cloudpad-c677d.firebaseapp.com",
    databaseURL: "https://cloudpad-c677d.firebaseio.com",
    projectId: "cloudpad-c677d",
    storageBucket: "cloudpad-c677d.appspot.com",
    messagingSenderId: "876309484204"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;