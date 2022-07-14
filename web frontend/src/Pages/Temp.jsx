import ActualValue from "../Components/Cards/ActualValue";
import Statistics from "../Templates/Statistics";
import LinearChart from "../Components/Graphs/Linear";
import { useTemperature } from "../store";
import { temp } from "../chartStyles";

export default function Temp() {
    const temperature = useTemperature((state) => state.value);
    const singleValue = temperature[temperature.length - 1];

    return (
        <main>
            <section>
                <h1>Temperatura</h1>
                <ActualValue title="Temperatura (Grados Celcius)" value={singleValue} />
            </section>
            <section>
                <LinearChart data={temp(temperature)} />
            </section>
            <section>
                <Statistics variable="temperature" />
            </section>
        </main>
    );
}
