import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onAddPattern } from '../actions/cells';
import { nextStep, onFrequencyChange, stopLife, playLife, resetLife, previousStep } from '../actions/life';
import { scaleChanged } from '../actions/size';
import Pattern from '../components/Pattern';
import Buttons from '../components/Buttons';
import Frequency from '../components/Frequency';
import Output from '../components/Output';
import DrawChart from '../components/Chart';
import { drawChart } from '../services/chart';

const mapStateToProps = (state) => {
  return {
    size: state.size,
    cells: state.cells,
    interval: state.interval
  };
};

class Controls extends Component {

  constructor() {
    super(...arguments);
    this.onAddPattern = this.onAddPattern.bind(this);
    this.onNextStep = this.onNextStep.bind(this);
    this.onFrequencyChange = this.onFrequencyChange.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.play = this.play.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onZoom = this.onZoom.bind(this);
    this.onBackStep = this.onBackStep.bind(this);
    this.onDrawChart = this.onDrawChart.bind(this);
  }

  onFrequencyChange(value) {
    this.props.dispatch(onFrequencyChange(value));
  }

  onDrawChart() {
    drawChart();
  }

  onBackStep() {
    return this.props.dispatch(previousStep());
  }

  onNextStep() {
    this.props.dispatch(nextStep());
  }

  play() {
    this.props.dispatch(playLife());
  }

  stop() {
    this.props.dispatch(stopLife());
  }

  onReset() {
    this.props.dispatch(resetLife());
  }

  onPlay() {
    this.props.interval.running ? this.stop() : this.play();
  }

  onAddPattern(pattern) {
    this.props.dispatch(onAddPattern(pattern, {x: this.props.size.xCount, y: this.props.size.yCount}));
  }

  onZoom(direction) {
    this.props.dispatch(scaleChanged(direction))
  }

  render() {
    const { cells, size, interval } = this.props;
    return (
      <div className="controls">
        <Pattern
          isPlaying={interval.running}
          onPlay={this.onPlay}
          onReset={this.onReset}
          onAddPattern={this.onAddPattern}
        />
        <Buttons
          onPrev={this.onBackStep}
          onZoom={this.onZoom}
          onNext={this.onNextStep}
        />
        <Frequency onChange={this.onFrequencyChange} frequency={interval.frequency}/>
        <Output
          error={interval.error}
          xSize={size.xCount}
          ySize={size.yCount}
          aliveCells={cells.cells.size}
          cycle={cells.step}
        />
        <DrawChart
          onClick={this.onDrawChart}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Controls);


