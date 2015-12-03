var React = require('react');

var NavButtons = React.createClass({
  render: function() {
    return (
      <div className="btn-group navbar-btn navbar-left">
        <button className="btn btn-default">
          <span className="glyphicon glyphicon-chevron-left"></span>
        </button>
        <button className="btn btn-default">
          <span className="glyphicon glyphicon-chevron-right"></span>
        </button>
      </div>
    );
  }
});

module.exports = NavButtons;
