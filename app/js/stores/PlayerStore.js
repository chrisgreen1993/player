var _ = require('lodash');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Player = require('../lib/Player');
var PlayerConstants = require('../constants/PlayerConstants');
var PlayerActionCreators = require('../actions/PlayerActionCreators');
var QueueStore = require('./QueueStore');
var MusicStore = require('./MusicStore');

var ActionTypes = PlayerConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _player = new Player();
var _previous = [];
// Update current song when new song loaded
_player.addEventListener('loadeddata', function() {
  PlayerActionCreators.currentSong(_player.song);
});
// Update store when time updates (used for seekbar)
_player.addEventListener('timeupdate', function() {
  PlayerStore.emitChange();
});
// When song has ended, loop if we're on repeat, or go to next
_player.addEventListener('ended', function() {
  if (_player.repeat) {
    _player.seek(0);
    _player.play();
  } else {
    PlayerActionCreators.next();
  }
});
// On error try next song
_player.addEventListener('error', function() {
  PlayerActionCreators.next();
});

/**
 * PlayerStore, contains app state relating to the music player
 */
var PlayerStore = assign({}, EventEmitter.prototype, {

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
   * Gets music player state
   */
  get: function() {
    return _player;
  }

});

/*
 *  Listen to events from the dispatcher.
 */
PlayerStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.PLAY:
      _player.play(action.song);
      PlayerStore.emitChange();
      break;
    case ActionTypes.PAUSE:
      _player.pause();
      PlayerStore.emitChange();
      break;
    case ActionTypes.PREV:
      // We seek to start of current song first, then on next PREV, we go to
      // previous song
      if (_player.audio.currentTime === 0 && _player.audio.paused) {
        song = _previous.pop();
        if (song) {
          _player.play(song);
        }
      } else {
        _player.seek(0);
        _player.pause();
      }
      PlayerStore.emitChange();
      break;
    case ActionTypes.NEXT:
      _previous.push(_player.song); // Push current song to previous array
      // Wait for QueueStore to remove song from queue
      AppDispatcher.waitFor([QueueStore.dispatchToken]);
      song = QueueStore.getNext();
      // Fetch from MusicStore if no songs queued
      if (!song) {
        song = MusicStore.getNext(_player.shuffle);
      }
      _player.play(song);
      PlayerStore.emitChange();
      break;
    case ActionTypes.REPEAT:
      _player.toggleRepeat();
      PlayerStore.emitChange();
      break;
    case ActionTypes.SHUFFLE:
      _player.toggleShuffle();
      PlayerStore.emitChange();
      break;
    case ActionTypes.SEEK:
      _player.seek(action.seconds);
      PlayerStore.emitChange();
      break;
    default:
      //nothing
  }
});

module.exports = PlayerStore;
