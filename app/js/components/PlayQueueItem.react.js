var React = require('react');
var gui = window.require('nw.gui');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

/**
 * Individual Queue table row, containing song
 */
var PlayQueueItem = React.createClass({

  /**
   * Create right-click context Menu when component mounted
   */
  componentWillMount: function() {
    // TODO: Extract into seperate class (maybe mixin?)
    this.menu = new gui.Menu();
    this.menu.append(new gui.MenuItem({
      label: 'Remove from Queue',
      click: function() {
        PlayerActionCreators.removeFromQueue(this.props.queueIndex);
      }.bind(this)
    }));
  },

  /**
   * Renders table row containing one song
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <tr onContextMenu={this._onContextMenu}>
        <td>{this.props.song.title}</td>
      </tr>
    );
  },

  /**
   * Opens context menu when user right clicks on PlayQueueItem
   *
   * @param  {Object} event Event object
   */
  _onContextMenu: function(event) {
    this.menu.popup(event.clientX, event.clientY);
  }

});

module.exports = PlayQueueItem;
