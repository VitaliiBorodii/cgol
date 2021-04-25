import React from 'react';
import { connect } from 'react-redux';
import { onAddPattern } from '../actions/cells';
import { nextStep, onFrequencyChange, stopLife, playLife, resetLife, previousStep } from '../actions/life';
import { scaleChanged } from '../actions/size';
import Pattern from '../components/Pattern';
import Buttons from '../components/Buttons';
import Frequency from '../components/Frequency';
import DrawChart from '../components/Chart';
import { drawChart } from '../services/chart';

const mapStateToProps = (state) => {
  return {
    size: state.size,
    interval: state.interval
  };
};

const Controls = ({ interval, dispatch }) => {
  const handleFrequencyChange = (value) => dispatch(onFrequencyChange(value));
  const onBackStep = () => dispatch(previousStep());
  const onNextStep = () => dispatch(nextStep());
  const onReset = () => dispatch(resetLife());
  const onPlay = () => dispatch(interval.running ? stopLife() : playLife());
  const handleAddPattern = (pattern) => dispatch(onAddPattern(pattern));
  const onZoom = (direction) => dispatch(scaleChanged(direction));

  return (
    <div className="controls mdl-layout__drawer">
      <Pattern
        isPlaying={interval.running}
        onAddPattern={handleAddPattern}
      />
      <Buttons
        isPlaying={interval.running}
        onPlay={onPlay}
        onReset={onReset}
        onPrev={onBackStep}
        onZoom={onZoom}
        onNext={onNextStep}
      />
      <Frequency
        onChange={handleFrequencyChange}
        frequency={interval.frequency}
      />
      <DrawChart
        onClick={drawChart}
      />
    </div>
  );
}

export default connect(mapStateToProps)(Controls);
