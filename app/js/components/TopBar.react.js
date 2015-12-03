var React = require('react');
var Search = require('./Search.react');

/**
 * Top bar, contains Search component
 */
var TopBar = React.createClass({

  /**
   * Renders Top bar
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <Search />
        </div>
      </div>
    );
  }
});

module.exports = TopBar;
