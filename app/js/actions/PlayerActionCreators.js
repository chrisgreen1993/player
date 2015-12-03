var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerConstants = require('../constants/PlayerConstants');

var ActionTypes = PlayerConstants.ActionTypes;
/**
 * Setup Action Creators, used to send actions throughout the app
 *
 * @type {Object}
 */
var PlayerActionCreators = {
  getMusic: function(songs) {
     AppDispatcher.dispatch({
       type: ActionTypes.GET_MUSIC,
       songs: songs
     });
  },
  play: function(song) {
    AppDispatcher.dispatch({
      type: ActionTypes.PLAY,
      song: song
    });
  },
  pause: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.PAUSE
    });
  },
  prev: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.PREV
    });
  },
  next: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.NEXT,
    });
  },
  repeat: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.REPEAT
    });
  },
  shuffle: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.SHUFFLE
    });
  },
  seek: function(seconds) {
    AppDispatcher.dispatch({
      type: ActionTypes.SEEK,
      seconds: seconds
    });
  },
  addToQueue: function(song) {
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_TO_QUEUE,
      song: song
    });
  },
  removeFromQueue: function(index) {
    AppDispatcher.dispatch({
      type: ActionTypes.REMOVE_FROM_QUEUE,
      index: index
    });
  },
  search: function(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.SEARCH,
      text: text
    });
  },
  currentSong: function(song) {
    AppDispatcher.dispatch({
      type: ActionTypes.CURRENT_SONG,
      song: song
    })
  }
};

module.exports = PlayerActionCreators;
