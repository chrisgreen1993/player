var React = require('react');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

/**
 * Search component, filters music in Library component
 */
var Search = React.createClass({

  /**
   * Renders search bar
   *
   * @return {ReactElement} DOM tree to render
   */
  render: function() {
    return (
      <form onSubmit={this._onSubmit} id="search" className="navbar-form navbar-left">
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-addon"><span className="glyphicon glyphicon-search"></span></div>
            <input onChange={this._onChange} type="text" className="form-control" placeholder="Search" />
          </div>
        </div>
      </form>
    );
  },

  /**
   * Stop form submit on enter
   *
   * @return {Boolean}
   */
  _onSubmit: function() {
    return false;
  },


  /**
   * Dispatch search action to stores when text entered in search bar
   *
   * @param  {Object} event Event object
   */
  _onChange: function(event) {
    PlayerActionCreators.search(event.target.value);
  }
});

module.exports = Search;
