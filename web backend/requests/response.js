const available = require("./available");

const ph = require("../database/ph");
const temperature = require("../database/temperature");
const turbidity = require("../database/turbidity");

function search(arr, id) {
    let position = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][id]) {
            position = i;
            break;
        }
    }

    return position;
}

module.exports = function restGet(app) {
    app.get("/", (req, res) => {
        res.send("<h1>Hello World</h1>");
    });

    app.get("/available", (req, res) => {
        res.json(available.available());
    });

    app.get("/ph/inprocess", (req, res) => {
        res.json(available.inprocess("PH"));
    });

    app.get("/ph/collected", (req, res) => {
        res.json(available.collected("PH"));
    });

    app.get("/ph/collected/:id", (req, res) => {
        const id = parseInt(req.params.id);
        res.json(ph["collected-data"][search(ph["collected-data"], id)][id]);
    });

    app.get("/temperature/inprocess", (req, res) => {
        res.json(available.inprocess("TEMPERATURE"));
    });

    app.get("/temperature/collected", (req, res) => {
        res.json(available.collected("TEMPERATURE"));
    });

    app.get("/temperature/collected/:id", (req, res) => {
        const id = parseInt(req.params.id);
        res.json(temperature["collected-data"][search(temperature["collected-data"], id)][id]);
    });

    app.get("/turbidity/inprocess", (req, res) => {
        res.json(available.inprocess("TURBIDITY"));
    });

    app.get("/turbidity/collected", (req, res) => {
        res.json(available.collected("TURBIDITY"));
    });

    app.get("/turbidity/collected/:id", (req, res) => {
        const id = parseInt(req.params.id);
        res.json(turbidity["collected-data"][search(turbidity["collected-data"], id)][id]);
    });
};
