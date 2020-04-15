"use strict";

describe("Arroz.prototype.find-index", function () {
  it("returns the index of the first element in the provided array that satisfies the provided testing function", function () {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.findIndex(function (element) {
      return element > 10;
    });

    expect(result).toBe(1);
  });

  it("returns -1 if no elements in the provided array satisfy the provided testing function", function () {
    var array = new Arroz(5, 12, 8, 130, 44);
    var result = array.findIndex(function (element) {
      element > 200;
    });

    expect(result).toBe(-1);
  });

  it("returns -1 if the length of the array is 0", function () {
    var array = new Arroz();
    var result = array.findIndex(function (element) {
      element > 0;
    });

    expect(result).toBe(-1);
  });
});
