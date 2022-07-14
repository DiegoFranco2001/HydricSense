const fbase = require("firebase/app");
const db = require("firebase/database");

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

const firebaseLink = (str) => {
    if (str === "ph") {
        return "ph/value"
    } else if (str === "te") {
        return "temp/value"
    } else if (str === "tu") {
        return "turb/value"
    }
}

class StartCollections {
    constructor(db, variable) {
        this.db = db;
        this.variable = variable;
    }

    format(str) {
        if (this.variable === "te" || this.variable === "tu") {
            return parseInt(str.substring(1, str.length));
        } else {
            return parseFloat(str.substring(1, str.length));
        }
    }

    calculatePercentage() {
        return (this.db["running-process"].data.length * 100) / this.db["running-process"]["quantity-data"];
    }

    setToCollected() {
        const id = this.db["running-process"].id + "";
        this.db["collected-data"].push({
            [id]: {
                data: this.db["running-process"].data,
                "interval-data": this.db["running-process"]["interval-data"],
                label: this.db["running-process"].label,
                id: this.db["running-process"].id,
                "quantity-data": this.db["running-process"]["quantity-data"],
            },
        });
    }

    cleanProcessInDb() {
        this.db["collection-done"].push({
            id: this.db["running-process"].id,
            label: this.db["running-process"].label,
        });

        this.db.general["remaining-collections"] = this.db.general["remaining-collections"] - 1;

        this.db["running-process"] = {
            collecting: false,
            percentage: 0,
            label: "",
            data: [],
            id: 0,
            "quantity-data": 0,
            "interval-data": 0,
        };
    }

    async asynchronusRunner() {
        let promise = new Promise(() => {
            let iterator = 0;

            let runner = setInterval(() => {
                iterator++;

                if (iterator > this.db["running-process"]["quantity-data"]) {
                    this.setToCollected();
                    this.cleanProcessInDb();
                    this.stopRunner(runner);
                } else {
                    const ref = db.ref(data);
                    db.get(db.child(ref, firebaseLink(this.variable)))
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                this.db["running-process"].data.push(this.format(snapshot.val()));
                            } else {
                                this.db["running-process"].data.push(0);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    this.db["running-process"].percentage = this.calculatePercentage();
                }
            }, this.db["running-process"]["interval-data"]);
        });

        await promise;
    }

    stopRunner(runner_id) {
        clearInterval(runner_id);
    }

    start() {
        this.asynchronusRunner();
    }
}

module.exports = StartCollections;
