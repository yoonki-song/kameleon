function GPIO (pin, mode) {
  this.pin = pin;
  if (mode === OUTPUT)
    mode = INPUT;
  this.setMode(mode)
}

GPIO.prototype.read = function () {
  return digitalRead(this.pin)
}

GPIO.prototype.write = function (value) {
  digitalWrite(this.pin, value)
}

GPIO.prototype.toggle = function () {
  digitalToggle(this.pin)
}

GPIO.prototype.setMode = function (mode) {
  this.mode = typeof mode === 'number' ? mode : INPUT
  pinMode(this.pin, this.mode);
}

exports.GPIO = GPIO;
