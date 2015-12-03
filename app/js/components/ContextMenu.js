var util = require('util');
var EventEmitter = require('events');
var gui = window.require('nw.gui');

/**
 * Right click context menu, inherits from EventEmitter
 * Emits click event with users selection, use on('click') event listener
 */
function ContextMenu() {
  EventEmitter.call(this);
  this.menu = new gui.Menu();
  this.menu.append(new gui.MenuItem({
    label: 'Play',
    click: this.emit.bind(this, 'click', 'play')
  }));
  this.menu.append(new gui.MenuItem({
    label: 'Add to Queue',
    click: this.emit.bind(this, 'click', 'addToQueue')
  }));
}

util.inherits(ContextMenu, EventEmitter);

/**
 * Opens context menu at specified x and y coordinates
 *
 * @param  {Number} x x coordinate
 * @param  {Number} y y coordinate
 */
ContextMenu.prototype.open = function(x, y) {
  this.menu.popup(x, y);
};

module.exports = ContextMenu;
