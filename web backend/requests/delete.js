const bodyParser = require("body-parser");
const ph = require("../database/ph");
const temperature = require("../database/temperature");
const turbidity = require("../database/turbidity");

function removeFromCollection(db, id) {
    let collectionIndex = 0;

    for (let i = 0; i < db["collection-done"].length; i++) {
        if (db["collection-done"][i].id === id) {
            collectionIndex = i;
            break;
        }
    }

    for (let i = 0; i < db["collected-data"].length; i++) {
        if (db["collected-data"][i][id]) {
            db["collected-data"].splice(i, 1)
            break;
        }
    }

    db["collection-done"].splice(collectionIndex, 1);
}

function remove(app) {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.delete("/ph/delete/:id", (req, res) => {
        const id = parseInt(req.params.id);
        removeFromCollection(ph, id)
        res.json({ success: true });
    });

    app.delete("/temperature/delete/:id", (req, res) => {
        const id = parseInt(req.params.id);
        removeFromCollection(temperature, id)
        res.json({ success: true });
    });

    app.delete("/turbidity/delete/:id", (req, res) => {
        const id = parseInt(req.params.id);
        removeFromCollection(turbidity, id)
        res.json({ success: true });
    });
}

module.exports = remove;
