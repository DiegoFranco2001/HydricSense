import { IconClose, IconMenu } from "../../Icons";

export default function ToggleMenu({ open, clickFunction }) {
    return (
        <div className="icon-menu" onClick={() => clickFunction()}>
            {open ? <IconClose /> : <IconMenu />}
        </div>
    );
}
