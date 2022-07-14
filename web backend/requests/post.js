const bodyParser = require("body-parser");
const StartCollections = require("../functions/start");
const ph = require("../database/ph");
const temperature = require("../database/temperature");
const turbidity = require("../database/turbidity");

const createNew = (variable, req, res) => {
    const request = req.body;
    let db;

    if (variable === "ph") {
        db = ph;
    } else if (variable === "te") {
        db = temperature;
    } else if (variable === "tu") {
        db = turbidity;
    }

    db["running-process"].collecting = true;
    db["running-process"].id = db["available-id"];
    db["available-id"] = db["available-id"] + 1;
    db["running-process"]["interval-data"] = request.interval;
    db["running-process"].label = request.label;
    db["running-process"]["quantity-data"] = request.quantity;

    const startCollections = new StartCollections(db, variable);
    startCollections.start();

    res.json({ success: true });
};

function posts(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post("/new/ph", (req, res) => {
        createNew("ph", req, res);
    });

    app.post("/new/temperature", (req, res) => {
        createNew("te", req, res);
    });

    app.post("/new/turbidity", (req, res) => {
        createNew("tu", req, res);
    });
}

module.exports = posts;
