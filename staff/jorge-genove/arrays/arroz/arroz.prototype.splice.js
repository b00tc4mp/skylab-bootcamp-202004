'use strict'

Object.defineProperty(Arroz.prototype, "splice", {
  value: function (startIndex, deleteCount, addItem) {
    var sliced = [];

    var supportArr = [];

    if (typeof startIndex !== "number") {
      startIndex = 0;
    }
    if (
      typeof deleteCount === "undefined" ||
      deleteCount > this.lenght - startIndex
    ) {
      deleteCount = this.length;
    }
    if (deleteCount + startIndex > this.length) {
      deleteCount = this.length - startIndex;
    }
    if (deleteCount <= 0 || typeof deleteCount !== "number") {
      deleteCount = 0;
    }
    for (var i = startIndex; i < startIndex + deleteCount; i++) {
      sliced[sliced.length] = this[i];
    }
    for (var i = 0; i < startIndex; i++) {
      supportArr[supportArr.length] = this[i];
    }
    if (typeof arguments[2] !== undefined) {
      for (var k = 2; k < arguments.length; k++) {
        supportArr[supportArr.length] = arguments[k];
      }
    }
    for (var j = startIndex + deleteCount; j < this.length; j++) {
      supportArr[supportArr.length] = this[j];
    }

    for (var k = 0; k < supportArr.length; k++) {
      this[k] = supportArr[k];
      this.length = supportArr.length;
    }
    return sliced;
  },
  enumerable: false,
  writable: true,
});
