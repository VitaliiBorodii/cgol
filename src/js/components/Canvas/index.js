import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unformKey, createNeighboursArray, formKey, isEqualObj, isEqualMap } from '../../utils/index';

class Canvas extends Component {

  constructor() {
    super(...arguments);
    this.onClick = this.onClick.bind(this);
    this.drawCanvas = this.drawCanvas.bind(this);
    this.drawCells = this.drawCells.bind(this);
    this.__update__ = null;
    this.__filled__ = [];
  }

  drawCanvas() {
    const context = this.canvas.getContext('2d');
    const { height, width, rectSize } = this.props;

    context.clearRect(0, 0, width, height);

    context.strokeStyle = "#eee";
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
    this.drawCells();
  }

  drawCells() {
    const context = this.canvas.getContext('2d');

    const { rectSize, xCount, yCount } = this.props;

    const cells = this.props.cells.cells;

    this.__filled__.forEach(coords => {
      const [x, y] = coords;
      context.fillStyle =  '#FFF';
      context.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 1, rectSize - 1);
    });

    this.__filled__ = [];


    cells
      .forEach((cell, key) => {
        const [x, y] = unformKey(key);

        if (cell) { // if cell is alive - check its neighbours
          createNeighboursArray(x, y, xCount, yCount)
            .forEach(neighbour => {
              const [x, y] = neighbour;
              const key = formKey(x, y);
              const cell = cells.get(key);
              context.fillStyle = cell ? '#000' : '#FFF';
              if (cell) {
                this.__filled__.push([x, y])
              }
              context.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 1, rectSize - 1);
            });
        }

        context.fillStyle = cell ? '#000' : '#FFF';
        if (cell) {
          this.__filled__.push([x, y])
        }
        context.fillRect(x * rectSize + 1, y * rectSize + 1, rectSize - 1, rectSize - 1);
      });
  }

  componentWillReceiveProps(nextProps) {
    const prev = {
      ...this.props,
      onClick: null,
      cells: null
    };
    const next = {
      ...nextProps,
      onClick: null,
      cells: null
    };

    if (!isEqualObj(prev, next)) {
      this.__update__ = this.drawCanvas;
    } else if (!isEqualMap(nextProps.cells.cells, this.props.cells.cells)) {
      this.__update__ = this.drawCells;
    }
  }

  onClick(e) {
    const { rectSize, onClick } = this.props;
    const { offsetX, offsetY } = e.nativeEvent;
    const x = Math.floor(offsetX / rectSize);
    const y = Math.floor(offsetY / rectSize);
    onClick({x, y})
  }

  render() {
    return (
      <canvas
        className="app-canvas"
        width={this.props.width}
        height={this.props.height}
        onClick={this.onClick}
        ref={c => this.canvas = c}/>
    );
  }

  componentDidUpdate() {
    if (this.__update__) {
      this.__update__();
      this.__update__ = null;
    }
  }
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  xCount: PropTypes.number,
  yCount: PropTypes.number,
  rectSize: PropTypes.number,
  onClick: PropTypes.func,
};

export default Canvas;

