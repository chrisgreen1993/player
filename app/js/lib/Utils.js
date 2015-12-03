var fs = require('fs');
var walk = require('walk');
var meta = require('musicmetadata');
var PlayerActionCreators = require('../actions/PlayerActionCreators');

/**
 * Utility functions used throughout app
 *
 * @type {Object}
 */
var Utils = {
  /**
   * Walks filesystem starting from path, gets metadata of mp3 files and inserts
   * them into database
   *
   * @param  {String}   path     path to walk filesystem from
   * @param  {Function} callback
   */
  buildLibrary: function(path, callback) {
    var walker = walk.walk(path);

    walker.on('file', function(root, stats, next) {
      if (stats.name.match('.mp3')) {
        var path = root + '/' + stats.name;
        console.log(path);
        meta(fs.createReadStream(path), {duration: true}, function(err, metadata) {
          if (!err) {
            var song = {
              track: metadata.track.no,
              title: metadata.title || stats.name,
              artist: metadata.artist[0] || 'Unknown',
              album: metadata.album || 'Unknown',
              duration: metadata.duration,
              filePath: path
            };
            db.music.add(song);
          }
        });
      }
      next();
    });

    walker.on('errors', function(root, stats, next) {
      stats.forEach(function(n) {
        console.log(n.error);
      });
      next();
    });

    walker.on('end', function() {
      callback();
    });
  },

  /**
   * Converts song duration (strored as seconds) to M:SS string
   *
   * @param  {Number} duration seconds to convert
   * @return {String}          M:SS formatted string
   */
  durationToString: function(duration) {
    var mins = Math.floor(duration / 60);
    var secs = Math.floor(duration - mins * 60);
    return mins + ':' + (secs < 10 ? "0" : "") + secs;
  }

};

module.exports = Utils;
