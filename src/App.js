import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'd924602a97ab43fd91585703f5cdd881',
});

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    move: {
      enable: true,
      speed: 6,
      attract: {
        rotateX: 600,
        rotateY: 1200,
      },
    },
    Interactivity: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date(),
      },
    };
  }

  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };
  calculationFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = box => {
    console.log(box);
    this.setState({ box: box });
  };
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculationFaceLocation(response))
      )
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (this.state.route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (this.state.route === 'home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ route: route });
    }
  };

  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        ) : route === 'signin' ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
