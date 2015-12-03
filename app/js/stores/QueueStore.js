var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerConstants = require('../constants/PlayerConstants');

var ActionTypes = PlayerConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _queue = [];
var _next = {};

/**
 * Adds song to queue
 *
 * @param {Object} song Song to add to queue
 */
function _addToQueue(song) {
  _queue.push(song);
}

/**
 * Remove song at index from queue
 *
 * @param  {Number} index Index to remove song at
 */
function _removeFromQueue(index) {
  _queue.splice(index, 1);
}

/**
 * QueueStore, contains songs queued by the user
 */
var QueueStore = assign({}, EventEmitter.prototype, {

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
   * Gets next song to be played
   *
   * @return {Object} Next song to be played
   */
  getNext: function() {
    return _next;
  },

  /**
   * Gets whole queue
   *
   * @return {Array} Array of songs
   */
  getAll: function() {
    return _queue;
  }

});

/*
 *  Listen to events from the dispatcher.
 */
QueueStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.ADD_TO_QUEUE:
      _addToQueue(action.song);
      QueueStore.emitChange();
      break;
    case ActionTypes.REMOVE_FROM_QUEUE:
      _removeFromQueue(action.index);
      QueueStore.emitChange();
      break;
    case ActionTypes.NEXT:
      // User wants next song, move from _queue to _next 
      _next = _queue.shift();
      QueueStore.emitChange();
      break;
    default:
      //nothing
  }
});

module.exports = QueueStore;
