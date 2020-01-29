import React from 'react';
import Tilt from 'react-tilt';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt b2 shadow-2"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img src={Logo} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
