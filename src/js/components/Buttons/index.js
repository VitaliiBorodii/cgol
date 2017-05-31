import React from 'react';
import PropTypes from 'prop-types';

const Buttons = ({onNext, onZoom, onPrev, onReset, onPlay, isPlaying}) => {
  return (
    <div className="buttons">
      <div>
        <button onClick={onPrev} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="step-back"><i
          className="material-icons">skip_previous</i></button>
        <button onClick={onNext} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="step-forward"><i
          className="material-icons">skip_next</i></button>
        <button onClick={onPlay}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          <i
            className="material-icons">{isPlaying ? 'pause' : 'play_arrow'}</i></button>
      </div>
      <div>
        <button onClick={() => onZoom(+1)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="zoom-in"><i
          className="material-icons">zoom_in</i></button>
        <button onClick={() => onZoom(-1)} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                id="zoom-out"><i
          className="material-icons">zoom_out</i></button>
        <button onClick={onReset}
                className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          <i
            className="material-icons">stop</i></button>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  isPlaying: PropTypes.bool,
  onPlay: PropTypes.func,
  onReset: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onZoom: PropTypes.func,
};

export default Buttons;
