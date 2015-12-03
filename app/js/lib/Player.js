
/**
 * Music Player object, wraps HTML5 audio object + adds some extras
 */
function Player() {
  this.audio = new window.Audio();
  this.song = {};
  this.shuffle = false;
  this.repeat = false;
}

/**
 * Plays song if passed in, or resumes playback of current song
 *
 * @param  {Object} song Song to play
 */
Player.prototype.play = function(song) {
    if (song) {
      this.song = song;
      this.audio.src = song.filePath.replace('#', '%23');
      this.audio.load();
    }
    this.audio.play();
};

/**
 * Wraps Audio.addEventListener()
 *
 * @param  {String}   event    Event to listen to
 * @param  {Function} callback Callback function
 */
Player.prototype.addEventListener = function(event, callback) {
  this.audio.addEventListener(event, callback);
};

/**
 * Pauses currently playing song
 */
Player.prototype.pause = function() {
  this.audio.pause();
};

/**
 * Toggles shuffle
 */
Player.prototype.toggleShuffle = function() {
  this.shuffle = !this.shuffle;
};

/**
 * Toggles repeat
 */
Player.prototype.toggleRepeat = function() {
  this.repeat = !this.repeat;
};

/**
 * Seeks currently playing song to seconds param
 *
 * @param  {Number} seconds No of seconds to set current time to
 */
Player.prototype.seek = function(seconds) {
  this.audio.currentTime = seconds;
};

module.exports = Player;
