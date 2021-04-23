import React from 'react';
import { connect } from 'react-redux';
import Output from '../components/Output';
import { playLife, stopLife } from '../actions/life';

const mapStateToProps = (state) => {
  return {
    size: state.size,
    cells: state.cells,
    interval: state.interval
  };
};

const Header = ({ dispatch, interval, size, cells }) => {

  const onPlay = () => dispatch(interval.running ? stopLife() : playLife());

  return (
    <div className="mdl-layout__header">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title"></span>
        <div className="mdl-layout-spacer">
          <div className="header-button">
            <button onClick={onPlay}
              className="mdl-button mdl-js-button mdl-button--raised">
              <i
                className="material-icons">{interval.running ? 'pause' : 'play_arrow'}</i></button>
          </div>
        </div>
        <div className="mdl-navigation mdl-layout--large-screen-only">
          <Output
            error={interval.error}
            xSize={size.xCount}
            ySize={size.yCount}
            aliveCells={cells.cells.size}
            cycle={cells.step}
          />
        </div>
      </div>
    </div>
  )
};

export default connect(mapStateToProps)(Header);
