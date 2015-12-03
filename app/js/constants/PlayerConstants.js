var keyMirror = require('keymirror');

/**
 * Constants for actions
 *
 * @type {Object}
 */
var PlayerConstants = {
  ActionTypes: keyMirror({
    GET_MUSIC: null,
    PLAY: null,
    PAUSE: null,
    PREV: null,
    NEXT: null,
    REPEAT: null,
    SHUFFLE: null,
    SEEK: null,
    ADD_TO_QUEUE: null,
    REMOVE_FROM_QUEUE: null,
    SEARCH: null,
    CURRENT_SONG: null
  })
};

module.exports = PlayerConstants;
