Boolean.isBoolean = function (b) {
  if (typeof b === 'string' && (b === 'true' || b === 'false')) return true
  if (typeof b === 'number' && (b === 1 || b === 0)) return true
  return typeof b === 'boolean'
}

Boolean.validate = function (b) {
  if (!this.isBoolean(b)) throw new TypeError(`${b} is not boolean`)
}
