var React = require('react');
var gui = window.require('nw.gui');
var Utils = require('../lib/Utils');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

/**
 * Individual Library table row, containing song
 */
var LibraryItem = React.createClass({

  /**
   * Create right-click context Menu when component mounted
   */
  componentWillMount: function() {
    // TODO: Extract into seperate class (maybe mixin?)
    this.menu = new gui.Menu();
    this.menu.append(new gui.MenuItem({
      label: 'Play',
      click: function() {
        PlayerActionCreators.play(this.props.song);
      }.bind(this)
    }));
    this.menu.append(new gui.MenuItem({
      label: 'Add to Queue',
      click: function() {
        PlayerActionCreators.addToQueue(this.props.song);
      }.bind(this)
    }));
  },

  /**
   * Renders table row containing one song
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    var song = this.props.song;
    var className = song.playing ? 'playing' : '';
    return (
      <tr className={className} onContextMenu={this._onContextMenu} onDoubleClick={this._onDoubleClick}>
        <td>{song.track}</td>
        <td>{song.title}</td>
        <td>{song.artist}</td>
        <td>{song.album}</td>
        <td>{Utils.durationToString(song.duration)}</td>
      </tr>
    );
  },

  /**
   * Opens context menu when user right clicks on LibraryItem
   *
   * @param  {Object} event Event object
   */
  _onContextMenu: function(event) {
    this.menu.popup(event.clientX, event.clientY);
  },

  /**
   * Dispatches play event to stores when user double clicks on LibraryItem
   */
  _onDoubleClick: function() {
    PlayerActionCreators.play(this.props.song);
  }

});

module.exports = LibraryItem;
