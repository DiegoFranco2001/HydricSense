module.exports = class Sender {
    constructor(stop) {
        this.stop = stop;

        this.count = this.count.bind(this);
    }

    setStop(value) {
        this.stop = value;
    }

    count(dbWriter) {
        let ph = new Array("p6.8", "p7.0", "p7.2", "p7.4", "p7.6");
        let te = new Array("t28", "t29", "t30", "t31", "t32");
        let tu = new Array("u2500", "u2800", "u3100", "u3400", "u3700");
        let count = 0;

        function fn() {
            dbWriter(ph.at(count), "ph");
            dbWriter(te.at(count), "temp");
            dbWriter(tu.at(count), "turb");

            if (count === 4) {
                count = 0;
            } else {
                count++
            }
        }

        setInterval(() => fn(), 2000);

        // clearInterval(timer);
    }

    countph (dbWriter) {
        let ph = new Array("p7.0", "p7.1", "p7.2", "p7.4", "p7.6", "p7.4");
        let count = 0;

        
        function fn() {
            dbWriter(ph.at(count), "ph");

            if (count === 5) {
                count = 0;
            } else {
                count++
            }
        }

        setInterval(() => fn(), 4200);
    }

    countte (dbWriter) {
        let te = new Array("t29", "t29", "t30", "t31", "t32", "t30");
        let count = 0;

        
        function fn() {
            dbWriter(te.at(count), "temp");

            if (count === 5) {
                count = 0;
            } else {
                count++
            }
        }

        setInterval(() => fn(), 4000);
    }

    counttu (dbWriter) {
        let tu = new Array("u240", "u250", "u260", "u250", "u250", "u240");
        let count = 0;

        
        function fn() {
            dbWriter(tu.at(count), "turb");

            if (count === 5) {
                count = 0;
            } else {
                count++
            }
        }

        setInterval(() => fn(), 4500);
    }
};
