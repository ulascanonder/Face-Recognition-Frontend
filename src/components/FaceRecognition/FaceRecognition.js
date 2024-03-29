import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props) => {
    const imgUrl = props.img;
    const box = props.box;
    const objectName = props.objectName;
    if(!imgUrl){
        return(
            <div>

            </div>
        )
    }

    else{
        return(
            <div className="absolute wrapper center ma w-100">
                <div className=" mt2 absolute">
                    <img src={imgUrl} alt="faceImage" id="inputImage" width="500px" height="auto"/>
                    <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                </div> 
                <div id = 'objectName' style={{top: box.bottom }}>
                    {objectName ? 
                    <div>
                        <h3>That seems to be a {objectName}.</h3> 
                        <button className=" mb3 w-15 grow f4 link ph3 pv1 dib white bg-light-purple"
                        onClick={() => props.onWhatElse()}>What Else?</button> 
                    </div>
                    : <></>}
                    </div>
            </div>
        )
    }
    
}

export default FaceRecognition; 