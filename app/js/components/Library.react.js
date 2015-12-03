var React = require('react');
var LibraryItem = require('./LibraryItem.react');
var MusicStore = require('../stores/MusicStore');

/**
 * Gets state from MusicStore
 *
 * @return {Object} Object containing music
 */
function getStateFromStores() {
  return {
    music: MusicStore.getAll()
  };
}

/**
 *  Library component, contains table of music from MusicStore
 */
var Library = React.createClass({

  /**
   * Sets initial state for component
   *
   * @return {Object} component state
   */
  getInitialState: function() {
    return getStateFromStores();
  },

  /**
   *  Listen to Store changes on mount
   */
  componentDidMount: function() {
    MusicStore.addChangeListener(this._onChange);
  },

  /**
   *  Remove change listeners on unmount
   */
  componentWillUnmount: function() {
    MusicStore.removeChangeListener(this._onChange);
  },

  /**
   * Table containing music from MusicStore to render
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div id="library" className="container-fluid">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.state.music.map(function(song, i) {
              return (<LibraryItem key={i} song={song} />);
            })}
          </tbody>
        </table>
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

module.exports = Library;
