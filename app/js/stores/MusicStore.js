var assign = require('object-assign');
var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerConstants = require('../constants/PlayerConstants');

var ActionTypes = PlayerConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _currentSong = {};
var _music = {};
var _filtered = [];

/**
 * Sets _music to songs from DB + also add to _filtered + sort
 *
 * @param {Array} songs All songs from DB
 */
function _setMusic(songs) {
  songs.forEach(function(song) {
    _music[song.id] = song;
  });
  _filtered = _.sortByAll(_music, ['artist', 'album', 'track']);
}

/**
 * Filters music, sorts + adds to _filtered, used when user searches
 *
 * @param  {String} searchText Text to filter by
 */
function _filterMusic(searchText) {
  searchText = searchText.toLowerCase();
  var filtered = _.filter(_music, function(song) {
    var matchTitle = song.title.toLowerCase().indexOf(searchText) != -1;
    var matchArtist = song.artist.toLowerCase().indexOf(searchText) != -1;
    var matchAlbum  = song.album.toLowerCase().indexOf(searchText) != -1;
    return (matchTitle || matchArtist || matchAlbum);
  });
  _filtered = _.sortByAll(filtered, ['artist', 'album', 'track']);
}

/**
 * MusicStore, contains app state relating to music library
 */
var MusicStore = assign({}, EventEmitter.prototype, {

  /**
   * Emits CHANGE_EVENT when store updated
   */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * Adds listener for CHANGE_EVENT
   *
   * @param  {Function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Removes listener for CHANGE_EVENT
   *
   * @param  {Function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  /**
   * Gets next song to be played from _filtered array
   *
   * @param  {Boolean} shuffle  Are we in shuffle mode?
   * @return {Object}           Next song to be played
   */
  getNext: function(shuffle) {
    if (shuffle) {
      return _.sample(_filtered);
    }
    if (_.isEmpty(_currentSong)) {
      return _filtered[0];
    }
    var index = _.findIndex(_filtered, function(song) {
      return song.id == _currentSong.id;
    });
    var nextIndex = index + 1;
    if (_filtered.length === nextIndex) {
      return _filtered[0];
    }
    return _filtered[nextIndex];
  },

  /**
   * Gets all music from _filtered, set song.playing of _currentSong in _filtered
   *
   * @return {Array} Array of songs to be displayed
   */
  getAll: function() {
    return _filtered.map(function(song) {
      song.playing = (song.id === _currentSong.id);
      return song;
    });
  }
});

/*
 *  Listen to events from the dispatcher.
 */
MusicStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.GET_MUSIC:
      _setMusic(action.songs);
      MusicStore.emitChange();
      break;
    case ActionTypes.SEARCH:
      _filterMusic(action.text);
      MusicStore.emitChange();
      break;
    case ActionTypes.CURRENT_SONG:
      _currentSong = action.song;
      MusicStore.emitChange();
      break;
    default:
      //nothing
  }
});

module.exports = MusicStore;
