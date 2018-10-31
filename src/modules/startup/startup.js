/**
 * Module class
 */

function Module(id) {
  this.id = id;
  this.exports = {};
}

Module.cache = {}

Module.require = function (id) {
  if (Module.cache[id]) {
    return Module.cache[id].exports;
  }
  if (process.builtin_modules.indexOf(id) >= 0) {
    var mod = new Module(id);
    mod.loadBuiltin();
    Module.cache[id] = mod;
    return mod.exports;        
  }
  throw new Error('Failed to load module: ' + id);
}

Module.prototype.loadBuiltin = function () {
  var fn = process.getBuiltinModule(this.id);
  fn(this.exports, Module.require, this);
}

global.require = Module.require;
global.print = global.console.log;

/**
 * Board object
 */

if (process.builtin_modules.indexOf('gpio') > -1) {
  board.gpio = function (pin, mode) {
    var GPIO = Module.require('gpio');
    return new GPIO(pin, mode);
  }
}
