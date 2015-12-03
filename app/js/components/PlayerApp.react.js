var React = require('react');
var TopBar = require('./TopBar.react');
var PlayQueue = require('./PlayQueue.react');
var Library = require('./Library.react');
var PlayerBar = require('./PlayerBar.react');

/**
 * Top level component, contains everything else
 */
var PlayerApp = React.createClass({

  /**
   * Renders app components
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div>
        <TopBar />
        <PlayQueue />
        <Library />
        <PlayerBar />
      </div>
    );
  }
});

module.exports = PlayerApp;
