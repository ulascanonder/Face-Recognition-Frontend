import React from "react";
import Tilt from 'react-parallax-tilt';
import "./Logo.css";
import Brain from "./Brain.png"

const Logo = () =>{
    return(
        <div className="ma4 mt0">
            <Tilt className="br2 shadow-2" style={{ height: '150px', width: "150px" }}>
                <div>
                    <img src={Brain} alt="Brain" width="90%" height="90%" style={{padding: "10px"}}/>
                </div>
            </Tilt>
        </div>
    )

}


export default Logo;