import GroupSeparator from "../Components/Menu/GroupSeparator";
import MenuRow from "../Components/Menu/MenuRow";
import { IconAnalytics, IconHome, IconPH, IconTemperature, IconTurbidity } from "../Icons";
import MenuGroup from "../Components/Menu/MenuGroup";
import Panel from "../Components/Menu/Panel";
import ToggleMenu from "../Components/Menu/ToggleMenu";
import { Fragment, useState } from "react";

export default function Menu() {
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen(!open);
        document.getElementById("menu").classList.toggle("hide");
    }

    return (
        <Fragment>
            <Panel>
                <div className="menu">
                    <MenuGroup>
                        <MenuRow icon={<IconHome />} text="Inicio" linkto="/" clickFunction={handleClick} />
                        <MenuRow icon={<IconAnalytics />} text="Vista General" linkto="/vista" clickFunction={handleClick} />
                    </MenuGroup>
                    <GroupSeparator title="Administración" />
                    <MenuGroup>
                        <MenuRow icon={<IconPH />} text="pH - Acidez" linkto="/ph" clickFunction={handleClick} />
                        <MenuRow
                            icon={<IconTemperature />}
                            text="Temperatura"
                            linkto="/temperatura"
                            clickFunction={handleClick}
                        />
                        <MenuRow icon={<IconTurbidity />} text="Turbidez" linkto="/turbidez" clickFunction={handleClick} />
                    </MenuGroup>
                </div>
            </Panel>
            <ToggleMenu open={open} clickFunction={handleClick} />
        </Fragment>
    );
}
