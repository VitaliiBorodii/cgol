import React, { Component } from 'react';
import Canvas from '../components/Canvas';
import { connect } from 'react-redux';
import { windowSizeChanged } from '../actions/size';
import { toggleCell } from '../actions/cells';
import { restoreLife } from '../actions/life';

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

    this.props.dispatch(restoreLife());
  }

  onCanvasClick(coords) {
    this.props.dispatch(toggleCell(coords));
  }

  resizeHandler() {
    const { container } = this.refs;

    this.props.dispatch(
      windowSizeChanged({ // - paddings and borders
        width: container.clientWidth,
        height: container.clientHeight
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
      <div className="mdl-layout__content container-container">
        <div className="page-content container-content" ref="container">
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
      </div>
    )
  }

}

export default connect(mapStateToProps)(Container);
