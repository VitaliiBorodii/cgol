import React, { Component, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { unformKey, createNeighboursArray, formKey, isEqualObj, isEqualMap } from '../../utils/index';

const colors = {
  white: '#FFF',
  black: '#000',
  grey: '#EEE'
}

const drawCells = (canvasRef, props, filled) => {
  if (!canvasRef.current) {
    return console.warn('canvasRef is not rendered yet');
  }

  const context = canvasRef.current.getContext('2d');
  const { rectSize, xCount, yCount } = props;
  const cells = props.cells.cells;

  filled.forEach(coords => {
    const [x, y] = coords;
    context.fillStyle = colors.white;
    context.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 1, rectSize - 1);
  });

  const filledCells = [];

  cells
    .forEach((cell, key) => {
      const [x, y] = unformKey(key);

      if (cell) { // if cell is alive - check its neighbours
        createNeighboursArray(x, y, xCount, yCount)
          .forEach(neighbour => {
            const [x, y] = neighbour;
            const key = formKey(x, y);
            const c = cells.get(key);
            context.fillStyle = c ? colors.black : colors.white;
            if (c) {
              filledCells.push([x, y])
            }
            context.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 1, rectSize - 1);
          });
          filledCells.push([x, y]);
      }

      context.fillStyle = cell ? colors.black : colors.white;
      context.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 1, rectSize - 1);
    });

  return filledCells;
}

const drawCanvas = (canvasRef, props, filled, updateFilledCells) => {
  if (!canvasRef.current) {
    return console.warn('canvasRef is not rendered yet');
  }
  const { rectSize, width, height } = props;
  const context = canvasRef.current.getContext('2d');

  context.clearRect(0, 0, width, height);
  context.strokeStyle = colors.grey;
  context.beginPath();
  context.globalAlpha = 1;

  for (let i = height; i--;) { //horizontal lines
    context.moveTo(0, rectSize * i);
    context.lineTo(rectSize * width, rectSize * i);
  }

  for (let i = width; i--;) { //vertical lines
    context.moveTo(rectSize * i, 0);
    context.lineTo(rectSize * i, rectSize * height);
  }

  context.lineWidth = 1;
  context.stroke();
  context.closePath();

  return drawCells(canvasRef, props, filled);
}
/**
 * Hook that saves previous value of the props
 * @param  {} value
 */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Canvas = (props) => {
  const { width, height, rectSize, onClick, xCount, yCount, cells } = props;
  const prevProps = usePrevious(props);
  const [filled, updateFilledCells] = useState([]);
  const canvasRef = useRef();

  useEffect(() => {
    const prev = {
      width: prevProps?.width,
      height: prevProps?.height,
      rectSize: prevProps?.rectSize,
      xCount: prevProps?.xCount,
      yCount: prevProps?.yCount
    };
    const next = {
      width: width,
      height: height,
      rectSize: rectSize,
      xCount: xCount,
      yCount: yCount
    };

    if (!isEqualObj(prev, next)) {
      updateFilledCells(drawCanvas(canvasRef, props, filled));
    } else if (!isEqualMap(cells.cells, prevProps.cells.cells)) {
      updateFilledCells(drawCells(canvasRef, props, filled, updateFilledCells));
    }

  }, [width, height, rectSize, xCount, yCount, cells.cells])

  const handleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = Math.floor(offsetX / rectSize);
    const y = Math.floor(offsetY / rectSize);
    onClick({ x, y });
  }


  return (
    <canvas
      className="app-canvas"
      width={width}
      height={height}
      onClick={handleClick}
      ref={canvasRef} />
  );
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  xCount: PropTypes.number,
  yCount: PropTypes.number,
  rectSize: PropTypes.number,
  cells: PropTypes.any,
  onClick: PropTypes.func,
};

export default Canvas;

