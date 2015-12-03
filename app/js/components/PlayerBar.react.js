var React = require('react');
var NowPlaying = require('./NowPlaying.react');
var PlayerButtons = require('./PlayerButtons.react');
var SeekBar = require('./SeekBar.react');
var PlayerStore = require('../stores/PlayerStore');

/**
 * Gets state from PlayerStore
 *
 * @return {Object} Player object
 */
function getStateFromStores() {
  return {
    player: PlayerStore.get()
  };
}

/**
 *  PlayerBar component, contains player controls, seekbar etc
 */
var PlayerBar = React.createClass({

  /**
   * Sets initial state for component
   *
   * @return {Object} compoenent state
   */
  getInitialState: function() {
    return getStateFromStores();
  },

  /**
   *  Listen to Store changes on mount
   */
  componentDidMount: function() {
    PlayerStore.addChangeListener(this._onChange);
  },

  /**
   *  Remove change listeners on unmount
   */
  componentWillUnmount: function() {
    PlayerStore.removeChangeListener(this._onChange);
  },

  /**
   * PlayerBar containing now playing song, buttons and seekbar to render +
   * pass state to these nodes
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div className="navbar navbar-default navbar-fixed-bottom">
        <NowPlaying song={this.state.player.song} />
        <PlayerButtons player={this.state.player} />
        <SeekBar player={this.state.player} />
      </div>
    );
  },

  /**
   * Updates component state on change
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = PlayerBar;
