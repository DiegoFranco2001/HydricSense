import { initializeApp } from "firebase/app";

const config = {
    apiKey: "AIzaSyCrTmb_TV070Idmu8mux8zmXQxI4hZWvKA",
    authDomain: "aplicada-558c4.firebaseapp.com",
    databaseURL: "https://aplicada-558c4-default-rtdb.firebaseio.com",
    projectId: "aplicada-558c4",
    storageBucket: "aplicada-558c4.appspot.com",
    messagingSenderId: "120359757598",
    appId: "1:120359757598:web:632bebbaed817ab3f40b0f",
};

export function initFirebase() {
    initializeApp(config);
}
