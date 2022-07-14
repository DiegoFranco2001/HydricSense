const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const fbase = require("firebase/app");
const db = require("firebase/database");
const Sender = require("./send");

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

const firebase = fbase.initializeApp(firebaseConfig);
const data = db.getDatabase(firebase);

app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});

server.listen(3001, () => {
    console.log("listening on *:3001");
    // writeDatabase("p3.25", "ph");

    console.log("Running Simmulator, please, view firebase database console");

    const sender = new Sender(false);
    sender.countph(writeDatabase)
    sender.countte(writeDatabase)
    sender.counttu(writeDatabase)
});

function writeDatabase(value, requiredData) {
    db.set(db.ref(data, requiredData), {
        value: value,
    });
}

function getFromDb(requiredData) {
    const ref = db.ref(data);
    db.get(db.child(ref, requiredData))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("There is not data");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
