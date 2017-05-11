import React from 'react';
import PropTypes from 'prop-types';

const Frequency = ({frequency, onChange}) => {
  return (
    <div className="slider mdl-list">
      <label htmlFor="timeout-input" className="mdl-list__item">Frequency:
        <div id="timeout-output">{frequency} cycles per minute</div>
      </label>
      <input value={frequency} onChange={e => onChange(Number(e.target.value))}
             className="mdl-list__item mdl-slider mdl-js-slider" id="timeout-input" type="range" max="5000"
             min="1" step="1"/>
    </div>
  );
};

Frequency.propTypes = {
  frequency: PropTypes.number,
  onChange: PropTypes.func,
};

export default Frequency;
