import Value from "../Components/Cards/Value";
import LinearChart from "../Components/Graphs/Linear";
import { usePh, useTemperature, useTurbidity } from "../store";
import { all, ph, temp, turb } from "../chartStyles";

export default function View() {
    const ph_acid = usePh((state) => state.value);
    const temperature = useTemperature((state) => state.value);
    const turbidity = useTurbidity((state) => state.value);

    const singleValues = {
        ph: ph_acid[ph_acid.length - 1],
        temp: temperature[temperature.length - 1],
        turb: turbidity[turbidity.length - 1],
    };

    return (
        <main>
            <section>
                <div className="view-cards">
                    <Value title="pH - acidez" value={singleValues.ph} />
                    <Value title="Temperatura" value={singleValues.temp} />
                    <Value title="Turbidez" value={singleValues.turb} />
                </div>
            </section>
            <div>
                <section>
                    <h4>Vista Gráfica General</h4>
                    <p>(La turbidez está dividida en factor de 100)</p>
                    <LinearChart data={all(ph_acid, temperature, turbidity)} />
                </section>
                <section>
                    <h4>pH - Acidez : {singleValues.ph}</h4>
                    <LinearChart data={ph(ph_acid)} />
                </section>
                <section>
                    <h4>Temperatura : {singleValues.temp}°</h4>
                    <LinearChart data={temp(temperature)} />
                </section>
                <section>
                    <h4>Nivel de Turbidez : {singleValues.turb}</h4>
                    <LinearChart data={turb(turbidity)} />
                </section>
            </div>
        </main>
    );
}
