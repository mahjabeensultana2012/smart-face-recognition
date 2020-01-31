import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">{`This magic face can detect your face in your picture. Get a try...`}</p>
      <div className="center">
        <div className=" form center pa4 br3 shadow-5">
          <input
            className="f4 p2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="f4 w-30 grow link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Dectect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
