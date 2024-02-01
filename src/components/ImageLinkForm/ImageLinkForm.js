import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = (props) => {
    const inputChange = props.onInputChange;
    const onSubmit = props.onSubmit;
    const word = props.mode === 'face-detection' ? 'face' : 'objects';
    return(
        <div>
            <p className="f3">Put an image link below to detect {word}.</p>
            <div className="pa4 br3 shadow-5 w-70 center form">
                <input placeholder="Put a link for an image" type="text" className="f4 pa2 w-90 center" onChange={inputChange}/>
                <button className="w-10 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm; 