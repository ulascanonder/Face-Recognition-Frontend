import './App.css';
import React from 'react';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Rank from "./components/Rank/Rank"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import ParticlesBg from 'particles-bg';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ModeButtons from './components/ModeButtons/ModeButtons';

  
  const PAT = '5bf0475be61641cd88d99f7682dc255e';
  const USER_ID = 'ulas';       
  const APP_ID = 'test';


  const requestFaceDetectionAPI = function(imgUrl){
    const IMAGE_URL = imgUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  }

const initalstate = {
  MODEL_ID: "face-detection",
  defaultMode: false,
  input: "",
  searchField: "",
  imgUrl: "",
  box: {},
  route: "signIn",
  signedIn: false,
  objectName: "",
  user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ""
  }
}


class App extends React.Component{

  constructor(){
    super();
    this.state = initalstate
  }

  loadUser = (data) => {
    this.setState({
      user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onDefaultMode = () =>{
    this.setState({defaultMode: true});
    console.log(this.state.defaultMode);
  }

  onChangeAlgorithmMode = (mode) => {
    if(mode === "face-detection") this.setState({MODEL_ID: 'face-detection'});
    else this.setState({MODEL_ID: 'general-image-detection'});
  }

  onRouteChange = (address) => {
    this.setState({route: address});
    if(address === "signIn") this.setState(initalstate);
    else if(address === "home") this.setState({signedIn: true});
    
  }


  calculateFaceLocations(boundingBox){
    const img = document.getElementById("inputImage");
    const width = Number(img.width);
    const height = Number(img.height);
    return{
      leftCol: boundingBox.left_col.toFixed(3) * width,
      topRow: boundingBox.top_row.toFixed(3) * height,
      rightCol: width - (boundingBox.right_col.toFixed(3) * width),
      bottomRow: height - (boundingBox.bottom_row.toFixed(3) * height),
      bottom: img.height
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }


  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({searchField: event.target.value});
  }

  faceDetect = (result) => {
    const regions = result.outputs[0].data.regions;
    ///
      const region = regions[0];
      const boundingBox = region.region_info.bounding_box;
      const topRow = boundingBox.top_row.toFixed(3);
      const leftCol = boundingBox.left_col.toFixed(3);
      const bottomRow = boundingBox.bottom_row.toFixed(3);
      const rightCol = boundingBox.right_col.toFixed(3);

      this.displayFaceBox(this.calculateFaceLocations(boundingBox));

      region.data.concepts.forEach(concept => {
          // Accessing and rounding the concept value
          const name = concept.name;
          const value = concept.value.toFixed(4);
          
          if(this.state.MODEL_ID === 'general-image-detection')this.setState({objectName: name});
          else this.setState({objectName: ''});
          console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);})

  } 

  onSubmit = () =>{
    if(this.state.searchField === "") return;
    this.setState({imgUrl: this.state.searchField});
    fetch("https://api.clarifai.com/v2/models/" + this.state.MODEL_ID + "/outputs", requestFaceDetectionAPI(this.state.searchField))
    .then(response => response.json())
    .then(result => {
      console.log('Sending put');
      if(!this.state.defaultMode){
            fetch('https://face-recognition-server-a4fe.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.user.id})})
            .then(response => response.json())
            .then(data => this.setState(Object.assign(this.state.user, {entries: data})))
            .catch(console.log)}
      this.faceDetect(result);
      
    })
    .catch(error => console.log('error', error));
  }

  render(){
    return (
      <div className="App">
        <ParticlesBg type='cobweb' bg={true}/>
        <Navigation onRouteChange = {this.onRouteChange} signedIn = {this.state.signedIn} defaultMode = {this.state.defaultMode}/>
        {this.state.route === "home"
        ? <div>
          <Logo/>
          {!this.state.defaultMode
            ?<Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
            :<></>
            }
          <ModeButtons onChangeAlgorithmMode = {this.onChangeAlgorithmMode}/>
          <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
          <FaceRecognition img = {this.state.imgUrl} box = {this.state.box} objectName = {this.state.objectName}/>
        </div>
        : (this.state.route === "signIn"
          ? <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} onDefaultMode = {this.onDefaultMode}/>
          : <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
          )
        }
      </div>
    );
  }

} 


export default App;
