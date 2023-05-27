import React from "react";
import Grid from "../layout/grid";
import "../Less/index.css"

export default props => (
    <Grid cols={props.cols}>
        <div className={`small-box bg-${props.color}`}>
            <div className="inner">
                <h3>{props.value}</h3>
                <p>{props.text}</p>
            </div>
            <div className="icon">
                <i className={`fa-solid fa fa-${props.icon} fa-sm`}></i>
            </div>
        </div>
    </Grid>
)