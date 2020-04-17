Arroz.prototype.slice = function (begin, end) {
  slicedValues = [];
  if (begin > this.length) {
    return sliceValues;
  }
  if (typeof begin === "undefined") {
    begin = 0;
  }
  if (begin < 0) {
    begin === slicedValues.length + begin;
  }
  if (end < 0) {
    end === sliceValues.length + end;
  }
  if (end === "undefined" || end > this.length) {
    end = this.length;
  }

  for (var i = begin; i < end - 1; i++) {
    slicedValues[slicedValues.length] = this[i];
  }
  return slicedValues;
};
