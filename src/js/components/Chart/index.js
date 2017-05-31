import React from 'react';
import PropTypes from 'prop-types';

const Chart = ({onClick}) => {
  return (
    <div className="buttons mdl-list">
      <div onClick={onClick} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pattern-inputs-button"><i
        className="material-icons">timeline</i> Draw chart
      </div>
    </div>
  );
};

Chart.propTypes = {
  onClick: PropTypes.func
};

export default Chart;
