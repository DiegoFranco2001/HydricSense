import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import View from "./Pages/View";
import Temp from "./Pages/Temp";
import Turb from "./Pages/Turb";
import PH from "./Pages/PH";
import Menu from "./Templates/Menu";
import New from "./Pages/New";

import { initFirebase } from "./config";
import { getDatabase, ref, onValue } from "firebase/database";
import { usePh, useTemperature, useTurbidity } from "./store";
import DataSet from "./Pages/DataSet";
import { ACIDITY, TEMPERATURE, TURBIDITY } from "./urls";

initFirebase();

const db = getDatabase();
const _ph = ref(db, ACIDITY);
const _te = ref(db, TEMPERATURE);
const _tu = ref(db, TURBIDITY);

function App() {
    const ph = usePh((state) => state.update);
    const temperature = useTemperature((state) => state.update);
    const turbidity = useTurbidity((state) => state.update);

    useEffect(() => {
        onValue(_ph, (snapshot) => {
            ph(snapshot.val());
        });

        onValue(_tu, (snapshot) => {
            turbidity(snapshot.val());
        });

        onValue(_te, (snapshot) => {
            temperature(snapshot.val());
        });
    });

    return (
        <Fragment>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vista" element={<View />} />
                <Route path="/ph/:id" element={<DataSet variable="ph" />} />
                <Route path="/ph" element={<PH />} />
                <Route path="/temperatura/:id" element={<DataSet variable="temperature" />} />
                <Route path="/temperatura" element={<Temp />} />
                <Route path="/turbidez/:id" element={<DataSet variable="turbidity" />} />
                <Route path="/turbidez" element={<Turb />} />
                <Route path="/recoleccion" element={<New />} />
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </Fragment>
    );
}

export default App;
