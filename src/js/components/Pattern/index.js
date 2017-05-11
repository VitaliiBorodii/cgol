import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pattern extends Component {

  constructor() {
    super(...arguments);
    this.onAddPattern = this.onAddPattern.bind(this);
  }

  onAddPattern() {
    const pattern = this.textarea.value;
    this.textarea.value = '';
    this.props.onAddPattern(pattern);
  }

  render() {
    const { onPlay, onReset, isPlaying } = this.props;

    return (
      <div>
        <div className="pattern-textarea">
        <textarea
          defaultValue={`
          .*...
          *.*.
          *.**
          .*...
          `}
          ref={c => this.textarea = c}
          className="mdl-textfield__input materialize-textarea"
          name="pattern"
          cols="20"
          rows="10"
        />
        </div>
        <div className="logs mdl-list">
          <output className="mdl-list__item">
            Paste a pattern into textarea above.
            Use symbol `*` - to make alive cells.
            Pattern will be inserted at the center of the canvas.
          </output>
          <div className="pattern-inputs">
            <button onClick={this.onAddPattern}
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pattern-inputs-button"
                    id="add-pattern">
              <i className="material-icons">content_paste</i> Add Pattern
            </button>
            <button onClick={onPlay}
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pattern-inputs-button"
                    id="start"><i className="material-icons">{isPlaying ? 'pause' : 'play_arrow'}</i></button>
            <button onClick={onReset}
                    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pattern-inputs-button"
                    id="stop"><i className="material-icons">stop</i></button>
          </div>
        </div>
      </div>
    );
  }
}


Pattern.propTypes = {
  onAddPattern: PropTypes.func,
  onPlay: PropTypes.func,
  isPlaying: PropTypes.bool,
  onReset: PropTypes.func,
};

export default Pattern;

