import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({onClick}) => {
  return (
    <div className="buttons">
      <div onClick={onClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="draw-chart"><i
        className="material-icons">timeline</i> Draw chart
      </div>
    </div>
  );
};

Chart.propTypes = {
  onClick: PropTypes.func
};

export default Chart;
