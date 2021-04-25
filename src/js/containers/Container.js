import React, { useEffect, useRef } from 'react';
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

const Container = ({ size, cells, dispatch }) => {
  const container = useRef(null);

  useEffect(() => {
    dispatch(restoreLife());

    const resizeHandler = () => {
      dispatch(
        windowSizeChanged({ // - paddings and borders
          width: container.current.clientWidth,
          height: container.current.clientHeight
        })
      );
    };
    // set resize listener
    window.addEventListener('resize', resizeHandler);

    resizeHandler();
    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeHandler);
    }
  }, [])

  const onCanvasClick = (coords) => dispatch(toggleCell(coords));

  return (
    <div className="mdl-layout__content container-container">
      <div className="page-content container-content" ref={container}>
        <Canvas
          onClick={onCanvasClick}
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

export default connect(mapStateToProps)(Container);
