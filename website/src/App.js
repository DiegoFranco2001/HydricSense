import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Fragment, useEffect } from "react";

import About from "./UI/Pages/Aplicada/About";
import Statistics from "./UI/Pages/Aplicada/Statistics";
import Graphics from "./UI/Pages/Aplicada/Graphics";

import { initFirebase } from "./config";
import { getDatabase, ref, onValue } from "firebase/database";
import { useValue } from "./store";
import StatsGraph from "./UI/Pages/Aplicada/StatsGraph";

initFirebase();

const db = getDatabase();
const getData = ref(db, "reader");

export default function App() {
    const usevalue = useValue((state) => state.update);

    useEffect(() => {
        onValue(getData, (snapshot) => {
            usevalue(snapshot.val());
        });
    });

    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={About} exact></Route>
                    <Route
                        path="/statistics"
                        exact
                        component={Statistics}
                    ></Route>
                    <Route path="/graphics" exact component={Graphics}></Route>
                    <Route path="/statistics/data" exact component={StatsGraph}></Route>
                </Switch>
            </BrowserRouter>
        </Fragment>
    );
}
