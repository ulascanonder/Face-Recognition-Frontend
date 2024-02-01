import React from "react";

const ModeButtons = (props) => {
    
    return(
        <div style={{ display: 'flex', justifyContent: 'space-around'}}>
            <button className="w-15 grow f4 link ph3 pv2 dib white bg-purple"
            onClick={() => props.onChangeAlgorithmMode('face-detection')}
            style={{fontWeight: props.mode === 'face-detection' ? 'bold' : 'normal'}}>Face Detection</button>

            <button className="w-15 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={() => props.onChangeAlgorithmMode('general-image-recognition')}
            style={{fontWeight: props.mode !== 'face-detection' ? 'bold' : 'normal'}}>Image Recognition</button> 
      </div>
    )
}

export default ModeButtons; 