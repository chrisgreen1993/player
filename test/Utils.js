var assert = require('chai').assert;
var mock = require('mock-fs');
var Utils = require('../app/js/lib/Utils');

describe('Utils', function() {
  describe('buildLibrary', function() {
    it('does something', function() {
      /*
      mock({
        '/music': {
          'file1.mp3': 'hi',
          'file2.mp3': 'hi'
        }
      });
      Utils.buildLibrary('/music', function() {
        console.log('hi');
        done();
      });
      */
    });
  });
  describe('durationToString', function() {
    it('converts seconds into M:SS formatted string', function() {
      var string = Utils.durationToString(325);
      assert.equal(string, '5:25');
      var string = Utils.durationToString(301);
      assert.equal(string, '5:01');
      var string = Utils.durationToString(659);
      assert.equal(string, '10:59');
      var string = Utils.durationToString(30);
      assert.equal(string, '0:30');
      var string = Utils.durationToString(30.99);
      assert.equal(string, '0:30');
      var string = Utils.durationToString(0);
      assert.equal(string, '0:00');
    });
  })
});
