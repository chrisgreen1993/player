// Move some stuff to global, due to way nw.js works
global.document = window.document;
global.navigator = window.navigator;
global.indexedDB = window.indexedDB;
var React = require('react');
var Dexie = require('dexie');
var Utils = require('./js/lib/Utils');
var PlayerApp = require('./js/components/PlayerApp.react');
var PlayerActionCreators = require('./js/actions/PlayerActionCreators');

global.db = db = new Dexie('player');
Dexie.Promise.on('error', function(err) {
  console.log('error: ' + err);
});
// Setup DB schema
db.version(1).stores({
  music: '++id, track, title, artist, album, duration, filePath'
});
// Build db from filesystem or fetch from db
db.on('ready', function() {
  return db.music.count(function(count) {
    if (count === 0) {
      Utils.buildLibrary(process.env.HOME + '/Music', function() {
        db.music.toArray(function(array) {
          PlayerActionCreators.getMusic(array);
        });
      });
    } else {
      db.music.toArray(function(array) {
        PlayerActionCreators.getMusic(array);
      });
    }
  });
});

db.open();
// Kick off React rendering
React.render(<PlayerApp />, document.getElementById('player'));
