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
          className="mdl-textfield__input materialize-textarea pattern-textarea-input"
          name="pattern"
          cols="20"
          rows="5"
        />
        </div>
        <div className="mdl-list">
          <output className="mdl-list__item">
            Paste a pattern into textarea above.
            Use symbol `*` - to make alive cells.
            Pattern will be inserted at the center of the canvas.
          </output>
          <div className="pattern-inputs">
            <div className="buttons">
              <button onClick={this.onAddPattern}
                      className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pattern-inputs-button">
                <i className="material-icons">content_paste</i> Add Pattern
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Pattern.propTypes = {
  onAddPattern: PropTypes.func,
};

export default Pattern;

