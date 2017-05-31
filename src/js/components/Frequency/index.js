import React from 'react';
import PropTypes from 'prop-types';

const Frequency = ({frequency, onChange}) => {
  return (
    <div className="slider mdl-list">
      <label htmlFor="timeout-input" className="mdl-list__item slider-label">
        <div className="slider-label-text">Frequency:</div>
        <div className="slider-label-text">{frequency} cycles per minute</div>
      </label>
      <div className="">
        <input value={frequency} onChange={e => onChange(Number(e.target.value))}
               className="mdl-list__item mdl-slider mdl-js-slider" id="timeout-input" type="range" max="5000"
               min="1" step="1"/>
      </div>
    </div>
  );
};

Frequency.propTypes = {
  frequency: PropTypes.number,
  onChange: PropTypes.func,
};

export default Frequency;
