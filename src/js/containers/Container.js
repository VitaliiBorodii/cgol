import React, { Component } from 'react';
import Canvas from '../components/Canvas';
import { connect } from 'react-redux';
import { windowSizeChanged } from '../actions/size';
import { toggleCell } from '../actions/cells';
import { restoreLife } from '../actions/life';
import db from '../services/db';

const mapStateToProps = (state) => {
  return {
    size: state.size,
    cells: state.cells
  };
};

class Container extends Component {

  constructor() {
    super(...arguments);
    this.resizeHandler = this.resizeHandler.bind(this);
    this.onCanvasClick = this.onCanvasClick.bind(this);

    db.getLast().then(result => {
      result && this.props.dispatch(restoreLife(result));
    })
  }

  onCanvasClick(coords) {
    this.props.dispatch(toggleCell(coords));
  }

  resizeHandler() {
    const { container } = this.refs;

    this.props.dispatch(
      windowSizeChanged({ // - paddings and borders
        width: container.clientWidth - 22,
        height: container.clientHeight - 22
      })
    );
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
    this.resizeHandler = null;
  }

  render() {
    const { size, cells } = this.props;

    return (
      <div className="container" ref="container">
        <Canvas
          onClick={this.onCanvasClick}
          width={size.canvasWidth}
          height={size.canvasHeight}
          xCount={size.xCount}
          yCount={size.yCount}
          rectSize={size.rectSize}
          cells={cells}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(Container);
