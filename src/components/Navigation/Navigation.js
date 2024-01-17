import React from "react";

const Navigation = (props) => {
    const onRouteChange = props.onRouteChange;
    const signedIn = props.signedIn;
    const defaultMode = props.defaultMode;
    if(signedIn){
        return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                { defaultMode
                 ? <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange("signIn")}>Go Back</p>
                 :<p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange("signIn")}>Sign Out</p>
                }
                
            </nav>
        );
    }
    else{
        return(
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange("signIn")}>Sign In</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange("register")}>Register</p>
            </nav>
        );
    }

};


export default Navigation;