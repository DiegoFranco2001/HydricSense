import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";
import HeaderImg from "../others/HeaderImg";
import Menu from "../others/Menu";

const withLayout = (properties) => (WrappedComponent) => {
    return class WithLayout extends Component {
        render() {
            return (
                <Fragment>
                    <HeaderImg></HeaderImg>
                    <Menu links={properties}></Menu>
                    <div className="w3-row w3-padding-64">
                        <div className="w3-col l2 m1">&nbsp; </div>
                        <div className="w3-col l8 m10 w3-padding">
                            <WrappedComponent
                                {...this.props}
                            ></WrappedComponent>
                        </div>
                        <div className="w3-col l2 m1">&nbsp; </div>
                    </div>
                </Fragment>
            );
        }
    };
}

export default withLayout;
