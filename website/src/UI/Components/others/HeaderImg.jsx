import img from "../../../Images//HydricSenseHeader.png";

export default function HeaderImg() {
    return (
        <div className="w3-center">
            <img
                src={img}
                alt="HydricSense - Un dato erróneo, por pequeño que sea, puede generar acciones erradas."
                className="w3-image"
            ></img>
        </div>
    );
}
