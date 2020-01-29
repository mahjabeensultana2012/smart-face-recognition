import React from 'react';
import Tilt from 'react-tilt';
import face from './face.png';
import './Logo.css';
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt b2 shadow-2"
        options={{ max: 50 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner p3">
          <img style={{ paddingTop: '3px' }} src={face} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
