import React from 'react';
import PropTypes from 'prop-types';

const Output = ({aliveCells, cycle, xSize, ySize, error}) => {
  return (
    <div className="logs mdl-list">
      <div className="mdl-list__item logs-item">Cycles: {cycle}</div>
      <div className="mdl-list__item logs-item">Board size: {xSize}x{ySize}</div>
      <div className="mdl-list__item logs-item">Alive cells: {aliveCells}</div>
      <div id="info" className="mdl-list__item logs-item error">{error}</div>
      <div className="mdl-list__item message logs-item">
        You can add or remove cells by clicking on canvas
      </div>
    </div>
  );
};

Output.propTypes = {
  aliveCells: PropTypes.number,
  cycle: PropTypes.number,
  xSize: PropTypes.number,
  ySize: PropTypes.number,
  error: PropTypes.string,
};

export default Output;
