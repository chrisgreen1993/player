var React = require('react');

/**
 * Displays currently playing song and artist
 */
var NowPlaying = React.createClass({

  /**
   * Renders now playing info
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div id="now-playing" className="media navbar-left">
        <div className="media-body">
          <p className="media-heading">{this.props.song.title}</p>
          {this.props.song.artist}
        </div>
      </div>
    );
  }
});

module.exports = NowPlaying;
