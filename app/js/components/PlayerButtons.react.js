var React = require('react');
var _ = require('lodash');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

/**
 * Displays player buttons, play, shuffle, etc
 */
var PlayerButtons = React.createClass({

  /**
   * Renders player buttons
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div id="player-btns">
        <div className="btn-group navbar-btn">
          <button onClick={this._onPrevClick} className="btn btn-default">
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button onClick={this._onPlayPauseClick} className="btn btn-default">
            <span className={"glyphicon glyphicon-" + (this.props.player.audio.paused ? 'play' : 'pause')}></span>
          </button>
          <button onClick={this._onNextClick} className="btn btn-default">
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
        </div>
        <button onClick={this._onRepeatClick} className="btn btn-default navbar-btn">
          <span className={"glyphicon glyphicon-repeat" + (this.props.player.repeat ? ' active' : '')}></span>
        </button>
        <button onClick={this._onShuffleClick} className="btn btn-default navbar-btn">
          <span className={"glyphicon glyphicon-random" + (this.props.player.shuffle ? ' active' : '')}></span>
        </button>
      </div>
    );
  },

  /**
   * Dispatches prev action to stores when user clicks on prev btn
   */
  _onPrevClick: function() {
    PlayerActionCreators.prev();
  },

  /**
   * Dispatches play or pause action to stores when user clicks play btn, can
   * also dispatch next, if no song playing.
   */
  _onPlayPauseClick: function() {
    if (_.isEmpty(this.props.player.song)) {
      PlayerActionCreators.next();
    } else if (this.props.player.audio.paused) {
      PlayerActionCreators.play();
    } else {
      PlayerActionCreators.pause();
    }
  },

  /**
   * Dispatches next action to stores when user clicks on next btn
   */
  _onNextClick: function() {
    PlayerActionCreators.next();
  },

  /**
   * Dispatches repeat action to stores when user clicks on repeat btn
   */
  _onRepeatClick: function() {
    PlayerActionCreators.repeat();
  },

  /**
   * Dispatches shuffle action to stores when user clicks on shuffle btn
   */
  _onShuffleClick: function() {
    PlayerActionCreators.shuffle();
  }
});

module.exports = PlayerButtons;
