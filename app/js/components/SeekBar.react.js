var React = require('react');
var Utils = require('../lib/Utils');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

/**
 * Seekbar component, contains seekbar and durations
 */
var SeekBar = React.createClass({

  /**
   * Renders seekbar
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    var durationTotal = this.props.player.song.duration || 0;
    var durationCurrent = this.props.player.audio.currentTime || 0;
    return (
      <div id="seek-bar">
        <span className="duration-current">{Utils.durationToString(durationCurrent)}</span>
        <input onChange={this._onSeekChange} type="range" value={this.props.player.audio.currentTime} max={this.props.player.song.duration} />
        <span className="duration-total">{Utils.durationToString(durationTotal)}</span>
      </div>
    );
  },

  /**
   * Dispatches seek action to stores when user changes seek location
   *
   * @param  {Object} event Event object
   */
  _onSeekChange: function(event) {
    PlayerActionCreators.seek(event.target.value);
  },

});

module.exports = SeekBar;
