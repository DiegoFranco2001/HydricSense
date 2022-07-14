import ActualValue from "../Components/Cards/ActualValue";
import Statistics from "../Templates/Statistics";
import LinearChart from "../Components/Graphs/Linear";
import { usePh } from "../store";
import { ph } from "../chartStyles";

export default function PH() {
    const ph_acid = usePh((state) => state.value);
    const singleValue = ph_acid[ph_acid.length - 1];

    return (
        <main>
            <section>
                <h1>pH - Acidez</h1>
                <ActualValue title="pH - Acidez" value={singleValue} />
            </section>
            <section>
                <LinearChart data={ph(ph_acid)} />
            </section>
            <section>
                <Statistics variable="ph" />
            </section>
        </main>
    );
}
