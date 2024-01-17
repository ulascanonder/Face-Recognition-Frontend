import React from "react";

const Rank = (props) => {
    return(
        <div>
            <div className="white f3">
                <p>Hello {props.name} Your current Entry count is</p>
            </div>
            <div className="white f1">
                <p style={{marginTop: "0px"}}>#{props.entries}</p>
            </div>
        </div>
    )
}

export default Rank; 