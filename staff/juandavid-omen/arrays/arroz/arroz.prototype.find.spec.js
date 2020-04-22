"use strict";

describe("Arroz.prototype.find", function() {
  it("returns the value of the first element in the provided array that satisfies the provided testing function", function() {
    var array = new Arroz(5, 12, 8, 130, 44);

    var result = array.find(function(element) {
      return element > 10;
    });

    expect(result).toBe(12);
  });

  it("returns undefined if no elements in the provided array satisfy the provided testing function", function() {
    var array = new Arroz(5, 12, 8, 130, 44);

    var result = array.find(function(element) {
      return element > 200;
    });

    expect(result).toBe(undefined);
  });

  it("returns undefined if the length of the array is 0", function() {
    var array = new Arroz();

    var result = array.find(function(element) {
      return element > 0;
    });

    expect(result).toBe(undefined);
  });

  it("Throw an error if the parameter is not a function", function () {
    var array = new Arroz();

    var result = array.find(function (element) {
      return element > 0;
    });

    expect(function() {
      array.find(undefined)
    }).toThrowError(TypeError, 'undefined is not a function');

    expect(function () {
      array.find(2)
    }).toThrowError(TypeError, '2 is not a function');
  });
});
