import ActualValue from "../Components/Cards/ActualValue";
import Statistics from "../Templates/Statistics";
import LinearChart from "../Components/Graphs/Linear";
import { useTurbidity } from "../store";
import { turb } from "../chartStyles";

export default function Turb() {
    const turbidity = useTurbidity((state) => state.value);
    const singleValue = turbidity[turbidity.length - 1];

    return (
        <main>
            <section>
                <h1>Turbidez</h1>
                <ActualValue title="Nivel de Turbidez" value={singleValue} />
            </section>
            <section>
                <LinearChart data={turb(turbidity)} />
            </section>
            <section>
                <Statistics variable="turbidity" />
            </section>
        </main>
    );
}
