import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({onNext, onZoom, onPrev}) => {
  return (
    <div className="buttons">
      <button onClick={onPrev} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="step-back"><i
        className="material-icons">skip_previous</i></button>
      <button onClick={onNext} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              id="step-forward"><i
        className="material-icons">skip_next</i></button>
      <button onClick={() => onZoom(+1)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              id="zoom-in"><i
        className="material-icons">zoom_in</i></button>
      <button onClick={() => onZoom(-1)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
              id="zoom-out"><i
        className="material-icons">zoom_out</i></button>
    </div>
  );
};

Buttons.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onZoom: PropTypes.func,
};

export default Buttons;
