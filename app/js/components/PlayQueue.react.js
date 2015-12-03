var React = require('react');
var PlayQueueItem = require('./PlayQueueItem.react');
var QueueStore = require('../stores/QueueStore');

/**
 * Gets state from QueueStore
 *
 * @return {Object} Object containing queued songs
 */
function getStateFromStores() {
  return {
    queue: QueueStore.getAll()
  };
}

/**
 *  PlayQueue component, contains list of currently queued songs from QueueStore
 */
var PlayQueue = React.createClass({

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
    QueueStore.addChangeListener(this._onChange);
  },

  /**
   *  Remove change listeners on unmount
   */
  componentWillUnmount: function() {
    QueueStore.removeChangeListener(this._onChange);
  },

  /**
   * Table containing currently queued songs from QueueStore
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div id="play-queue">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Queue</th>
            </tr>
          </thead>
          <tbody>
            {this.state.queue.map(function(song, i) {
              return <PlayQueueItem key={i} queueIndex={i} song={song} />
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

module.exports = PlayQueue;
